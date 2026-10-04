'use server';

import { cookies, headers } from 'next/headers';
import crypto from 'node:crypto';
import { createClient } from '@supabase/supabase-js';
import { POSTS } from '@/app/blog/posts';

const COOKIE_NAME = 'ictflow_admin_session';
const SESSION_TTL = 8 * 60 * 60;
const ADMIN_LOGIN_WINDOW_SECONDS = 15 * 60;
const ADMIN_LOGIN_MAX_FAILURES = 10;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function requireUuid(value, label = 'user ID') {
  const normalized = typeof value === 'string' ? value.trim() : '';
  if (!UUID_RE.test(normalized)) throw new Error(`Invalid ${label}.`);
  return normalized;
}
const MAX_BLOG_FIELD_LENGTHS = { slug: 160, title: 200, description: 500, category: 80, read_time: 80, date: 40, image: 2048, meta_title: 200, meta_desc: 500, content: 200_000 };

function validateBlogForm(form) {
  if (!form || typeof form !== 'object') throw new Error('Invalid blog post data.');
  for (const [field, max] of Object.entries(MAX_BLOG_FIELD_LENGTHS)) {
    if (field === 'content' || field === 'image' || field === 'slug' || field === 'title' || field === 'description' || field === 'category' || field === 'read_time' || field === 'date' || field === 'meta_title' || field === 'meta_desc') {
      if (form[field] != null && typeof form[field] !== 'string') throw new Error(`Invalid ${field}.`);
      if (typeof form[field] === 'string' && form[field].length > max) throw new Error(`${field} is too long.`);
    }
  }
  if (form.id != null && form.id !== '' && !UUID_RE.test(String(form.id).trim())) throw new Error('Invalid blog ID.');
  const slug = typeof form.slug === 'string' ? form.slug.trim() : '';
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('Invalid blog slug.');
  if (!String(form.title || '').trim()) throw new Error('Blog title is required.');
  if (form.image && !/^https?:\\/\\//i.test(form.image.trim()) && !form.image.trim().startsWith('/')) throw new Error('Invalid blog image URL.');
  return { ...form, slug };
}

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
  const pepper = process.env.RATE_LIMIT_SECRET || secret;
  const clientKeyHash = crypto.createHash('sha256').update(pepper + ':' + clientIp).digest('hex');

  let rateAllowed;
  try {
    const admin = adminDbClient();
    const { data, error } = await admin.rpc('consume_api_rate_limit', {
      p_scope: 'admin-login',
      p_key_hash: clientKeyHash,
      p_window_seconds: ADMIN_LOGIN_WINDOW_SECONDS,
      p_max_requests: ADMIN_LOGIN_MAX_FAILURES,
    });
    if (error) throw error;
    rateAllowed = data === true;
  } catch (error) {
    console.error('Admin login rate-limit check failed:', error);
    return { ok: false, error: 'Admin access is temporarily unavailable.' };
  }

  if (!rateAllowed) {
    return { ok: false, error: 'Too many login attempts. Try again later.' };
  }

  if (!sameSecret(password, secret)) {
    return { ok: false, error: 'Incorrect admin password.' };
  }

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

function editorText(content) {
  if (typeof content === 'string') return content;
  if (!Array.isArray(content)) return '';
  return content.map((block) => {
    if (!block) return '';
    if (block.type === 'list' && Array.isArray(block.items)) return block.items.join('\n');
    return block.text || '';
  }).filter(Boolean).join('\n\n');
}

async function loadAdminBlogPosts(supabase) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('id,slug,title,description,category,read_time,date,image,image_url,featured,published,sort_order,content,content_json,meta_title,meta_desc,created_at')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });
  if (error) throw error;

  const dbBySlug = new Map((data || []).filter((row) => row?.slug).map((row) => [row.slug, row]));
  const merged = POSTS.map((post, index) => {
    const row = dbBySlug.get(post.slug);
    if (!row) {
      return {
        ...post,
        id: null,
        read_time: post.readTime || '5 min read',
        published: true,
        sort_order: index,
        content: editorText(post.content),
        meta_title: '',
        meta_desc: '',
      };
    }
    dbBySlug.delete(post.slug);
    return {
      ...post,
      ...row,
      read_time: row.read_time || post.readTime || '5 min read',
      image: row.image || row.image_url || post.image || '',
      content: row.content || editorText(post.content),
      meta_title: row.meta_title || '',
      meta_desc: row.meta_desc || '',
    };
  });

  for (const row of dbBySlug.values()) {
    merged.push({
      ...row,
      read_time: row.read_time || '5 min read',
      image: row.image || row.image_url || '',
      content: row.content || editorText(row.content_json),
      meta_title: row.meta_title || '',
      meta_desc: row.meta_desc || '',
    });
  }

  return merged;
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
      const [
        { data: profileRows, error: profilesError },
        { data: emails, error: emailsError },
        { count, error: tradesError },
        { data: authPage, error: authUsersError },
      ] = await Promise.all([
        supabase
          .from('profiles')
          .select('id,username,xp,streak,is_pro,joined_at')
          .order('xp', { ascending: false })
          .limit(1000),
        supabase.from('email_signups').select('email,created_at').order('created_at', { ascending: false }),
        supabase.from('trades').select('id', { count: 'exact', head: true }),
        supabase.auth.admin.listUsers({ page: 1, perPage: 1000 }),
      ]);

      if (profilesError || emailsError || tradesError || authUsersError) {
        throw profilesError || emailsError || tradesError || authUsersError;
      }

      const authById = new Map((authPage?.users || []).map((authUser) => [authUser.id, authUser]));
      const users = (profileRows || []).map((profile) => {
        const authUser = authById.get(profile.id);
        return {
          ...profile,
          email: authUser?.email || '',
          created_at: authUser?.created_at || profile.joined_at || null,
        };
      });

      return { users, emails: emails || [], trades: count || 0 };
    }
    case 'profile.togglePro': {
      const userId = requireUuid(payload.id);
      const { error } = await supabase
        .from('profiles')
        .update({ is_pro: payload.isPro === true })
        .eq('id', userId);
      if (error) throw error;
      return { ok: true };
    }
    case 'profile.resetXP': {
      const userId = requireUuid(payload.id);
      const { error } = await supabase
        .from('profiles')
        .update({ xp: 0, total_xp: 0, streak: 0 })
        .eq('id', userId);
      if (error) throw error;
      return { ok: true };
    }
    case 'profile.delete': {
      const userId = requireUuid(payload.id);
      const { error } = await supabase.auth.admin.deleteUser(userId);
      if (error) throw error;
      return { ok: true };
    }
    case 'blog.list':
      return { data: await loadAdminBlogPosts(supabase) };
    case 'blog.save': {
      const form = validateBlogForm(payload.form || {});
      const row = {
        slug: form.slug,
        title: form.title,
        description: form.description || '',
        category: form.category || 'Beginner',
        read_time: form.read_time || '5 min read',
        date: form.date || '',
        image: form.image || '',
        featured: form.featured === true,
        published: form.published !== false,
        sort_order: Number.isFinite(Number(form.sort_order)) ? Number(form.sort_order) : 0,
        content: typeof form.content === 'string' ? form.content : '',
        meta_title: form.meta_title || '',
        meta_desc: form.meta_desc || '',
      };
      if (typeof form.id === 'string' && form.id) row.id = form.id;
      const { error } = await supabase.from('blog_posts').upsert(row, { onConflict: 'slug' });
      if (error) throw error;
      return { ok: true };
    }
    case 'blog.delete': {
      if (payload.id) {
        const postId = requireUuid(payload.id, 'blog ID');
        const { error } = await supabase.from('blog_posts').delete().eq('id', postId);
        if (error) throw error;
        return { ok: true };
      }
      const post = validateBlogForm(payload.post || {});
      if (!post.slug) throw new Error('Invalid blog post.');
      const { error } = await supabase.from('blog_posts').upsert({
        slug: post.slug,
        title: post.title || post.slug,
        description: post.description || '',
        category: post.category || 'Beginner',
        read_time: post.read_time || '5 min read',
        date: post.date || '',
        image: post.image || '',
        featured: post.featured === true,
        published: false,
        sort_order: Number.isFinite(Number(post.sort_order)) ? Number(post.sort_order) : 0,
        content: typeof post.content === 'string' ? post.content : '',
        meta_title: post.meta_title || '',
        meta_desc: post.meta_desc || '',
      }, { onConflict: 'slug' });
      if (error) throw error;
      return { ok: true };
    }
    case 'blog.togglePublished': {
      const published = payload.published === true;
      if (payload.id) {
        const postId = requireUuid(payload.id, 'blog ID');
        const { error } = await supabase.from('blog_posts').update({ published }).eq('id', postId);
        if (error) throw error;
        return { ok: true };
      }
      const post = validateBlogForm(payload.post || {});
      if (!post.slug) throw new Error('Invalid blog post.');
      const { error } = await supabase.from('blog_posts').upsert({
        slug: post.slug,
        title: post.title || post.slug,
        description: post.description || '',
        category: post.category || 'Beginner',
        read_time: post.read_time || '5 min read',
        date: post.date || '',
        image: post.image || '',
        featured: post.featured === true,
        published,
        sort_order: Number.isFinite(Number(post.sort_order)) ? Number(post.sort_order) : 0,
        content: typeof post.content === 'string' ? post.content : '',
        meta_title: post.meta_title || '',
        meta_desc: post.meta_desc || '',
      }, { onConflict: 'slug' });
      if (error) throw error;
      return { ok: true };
    }
    case 'journal.load': {
      const [{ count, error: countError }, { data: wins, error: winsError }, { data: all, error: allError }] = await Promise.all([
        supabase.from('trades').select('*', { count: 'exact', head: true }),
        supabase.from('trades').select('result').eq('result', 'Win'),
        supabase.from('trades').select('user_id'),
      ]);
      if (countError || winsError || allError) throw countError || winsError || allError;
      return {
        stats: {
          total: count || 0,
          wins: (wins || []).length,
          users: new Set((all || []).map((t) => t.user_id)).size,
        },
        config: null,
      };
    }
    default:
      throw new Error('Unsupported admin operation.');
  }
}
