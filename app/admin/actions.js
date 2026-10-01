'use server';

import { cookies, headers } from 'next/headers';
import crypto from 'node:crypto';
import { createClient } from '@supabase/supabase-js';

const COOKIE_NAME = 'ictflow_admin_session';
const SESSION_TTL = 8 * 60 * 60;
const ADMIN_LOGIN_WINDOW = 15 * 60 * 1000;
const ADMIN_LOGIN_MAX_FAILURES = 10;
const adminLoginAttempts = new Map();

function tokenFor(secret, issuedAt) {
  return `${issuedAt}.${crypto.createHmac('sha256', secret).update(`ictflow-admin-v1:${issuedAt}`).digest('hex')}`;
}

function sameSecret(a, b) {
  const left = Buffer.from(a || '');
  const right = Buffer.from(b || '');
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

export async function loginAdmin(password) {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) {
    return { ok: false, error: 'Admin access is not configured on the server.' };
  }

  const headerStore = await headers();
  const forwarded = headerStore.get('x-forwarded-for') || '';
  const clientIp = forwarded.split(',')[0].trim() || headerStore.get('x-real-ip') || 'unknown';
  const nowMs = Date.now();
  const previous = adminLoginAttempts.get(clientIp);
  const attempt = previous && nowMs - previous.startedAt < ADMIN_LOGIN_WINDOW
    ? previous
    : { startedAt: nowMs, failures: 0 };

  if (attempt.failures >= ADMIN_LOGIN_MAX_FAILURES) {
    return { ok: false, error: 'Too many failed attempts. Try again later.' };
  }

  if (!sameSecret(password, secret)) {
    attempt.failures += 1;
    adminLoginAttempts.set(clientIp, attempt);
    if (adminLoginAttempts.size > 5000) {
      for (const [key, value] of adminLoginAttempts) {
        if (nowMs - value.startedAt >= ADMIN_LOGIN_WINDOW) adminLoginAttempts.delete(key);
      }
    }
    return { ok: false, error: 'Incorrect admin password.' };
  }

  adminLoginAttempts.delete(clientIp);

  const store = await cookies();
  const issuedAt = Math.floor(Date.now() / 1000);
  store.set(COOKIE_NAME, tokenFor(secret, issuedAt), {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL,
  });

  return { ok: true };
}

export async function getAdminSession() {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return { ok: false };

  const store = await cookies();
  const value = store.get(COOKIE_NAME)?.value || '';
  const [issuedAtText, signature] = value.split('.');
  const issuedAt = Number(issuedAtText);
  const now = Math.floor(Date.now() / 1000);
  if (!Number.isSafeInteger(issuedAt) || !signature || issuedAt > now || now - issuedAt > SESSION_TTL) {
    return { ok: false };
  }
  return { ok: sameSecret(value, tokenFor(secret, issuedAt)) };
}

export async function logoutAdmin() {
  const store = await cookies();
  store.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}


function adminDbClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) throw new Error('Supabase admin service is not configured.');
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

async function requireAdmin() {
  const session = await getAdminSession();
  if (!session?.ok) throw new Error('Unauthorized');
}

export async function adminDb(action, payload = {}) {
  await requireAdmin();
  const supabase = adminDbClient();

  switch (action) {
    case 'dashboard': {
      const [{ data: users, error: usersError }, { data: emails, error: emailsError }, { count, error: tradesError }] = await Promise.all([
        supabase.from('profiles').select('*').order('xp', { ascending: false }).limit(500),
        supabase.from('email_signups').select('*').order('created_at', { ascending: false }),
        supabase.from('trades').select('*', { count: 'exact', head: true }),
      ]);
      if (usersError || emailsError || tradesError) throw usersError || emailsError || tradesError;
      return { users: users || [], emails: emails || [], trades: count || 0 };
    }
    case 'profile.togglePro':
      return supabase.from('profiles').update({ is_pro: payload.isPro === true }).eq('id', payload.id);
    case 'profile.resetXP':
      return supabase.from('profiles').update({ xp: 0, streak: 0 }).eq('id', payload.id);
    case 'profile.delete': {
      const userId = typeof payload.id === 'string' ? payload.id.trim() : '';
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(userId)) {
        throw new Error('Invalid user ID.');
      }
      const { error } = await supabase.auth.admin.deleteUser(userId);
      if (error) throw error;
      return { ok: true };
    }
    case 'blog.list':
      return supabase.from('blog_posts').select('*').order('sort_order', { ascending: true });
    case 'blog.save':
      return supabase.from('blog_posts').upsert(payload.form, { onConflict: 'slug' });
    case 'blog.delete':
      return supabase.from('blog_posts').delete().eq('slug', payload.slug);
    case 'blog.togglePublished':
      return supabase.from('blog_posts').update({ published: payload.published === true }).eq('id', payload.id);
    case 'banners.list':
      return supabase.from('banners').select('*').order('created_at', { ascending: false });
    case 'banners.insert':
      return supabase.from('banners').insert(payload.form);
    case 'banners.toggle':
      return supabase.from('banners').update({ active: payload.active === true }).eq('id', payload.id);
    case 'banners.delete':
      return supabase.from('banners').delete().eq('id', payload.id);
    case 'seo.save':
      return supabase.from('site_settings').upsert({ key: 'seo', value: payload.form }, { onConflict: 'key' });
    case 'journal.load': {
      const [{ count, error: countError }, { data: wins, error: winsError }, { data: all, error: allError }, { data: config, error: configError }] = await Promise.all([
        supabase.from('trades').select('*', { count: 'exact', head: true }),
        supabase.from('trades').select('result').eq('result', 'Win'),
        supabase.from('trades').select('user_id'),
        supabase.from('site_settings').select('value').eq('key', 'journal_config').maybeSingle(),
      ]);
      if (countError || winsError || allError || configError) throw countError || winsError || allError || configError;
      return { stats: { total: count || 0, wins: (wins || []).length, users: new Set((all || []).map((t) => t.user_id)).size }, config: config?.value || null };
    }
    case 'journal.save':
      return supabase.from('site_settings').upsert({ key: 'journal_config', value: payload.value }, { onConflict: 'key' });
    default:
      throw new Error('Unsupported admin operation.');
  }
}
