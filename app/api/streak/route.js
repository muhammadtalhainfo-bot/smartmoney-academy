import { createClient as createSupabaseAdmin } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createHash } from 'node:crypto';

const WINDOW_SECONDS = 5 * 60;
const MAX_REQUESTS = 10;

function hashUserKey(userId) {
  const pepper = process.env.RATE_LIMIT_SECRET || process.env.SUPABASE_SERVICE_KEY || 'ictflow-rate-limit';
  return createHash('sha256').update(pepper + ':streak:' + userId).digest('hex');
}

function toLocalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function dateForTimezone(date, timezone) {
  if (!timezone) return toLocalDate(date);

  try {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).formatToParts(date);

    const values = Object.fromEntries(parts
      .filter(({ type }) => ['year', 'month', 'day'].includes(type))
      .map(({ type, value }) => [type, value]));

    if (values.year && values.month && values.day) {
      return `${values.year}-${values.month}-${values.day}`;
    }
  } catch {
    // Invalid or unsupported timezone: fall back to server-local date.
  }

  return toLocalDate(date);
}

function previousDate(dateString) {
  const date = new Date(`${dateString}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() - 1);
  return date.toISOString().slice(0, 10);
}

function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) throw new Error('Supabase server configuration is missing.');
  return createSupabaseAdmin(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function POST(req) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
            } catch {}
          },
        },
      }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const serviceKey = process.env.SUPABASE_SERVICE_KEY;
    if (!serviceKey) return NextResponse.json({ error: 'Server configuration is missing.' }, { status: 503 });

    const admin = adminClient();
    const { data: allowed, error: rateError } = await admin.rpc('consume_api_rate_limit', {
      p_scope: 'streak-update',
      p_key_hash: hashUserKey(user.id),
      p_window_seconds: WINDOW_SECONDS,
      p_max_requests: MAX_REQUESTS,
    });

    if (rateError) {
      console.error('Streak rate-limit error:', rateError);
      return NextResponse.json({ error: 'Service temporarily unavailable.' }, { status: 503 });
    }
    if (allowed !== true) {
      return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429 });
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('streak, longest_streak, last_active')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    const now = new Date();
    const timezone = req.headers.get('x-timezone')?.trim() || '';
    const today = dateForTimezone(now, timezone);

    if (profile.last_active === today) {
      return NextResponse.json({
        streak: profile.streak || 0,
        longest_streak: profile.longest_streak || 0,
        last_active: profile.last_active,
      }, { headers: { 'Cache-Control': 'private, no-store' } });
    }

    const yesterday = previousDate(today);
    const newStreak = profile.last_active === yesterday ? (profile.streak || 0) + 1 : 1;
    const longestStreak = Math.max(newStreak, profile.longest_streak || 0);

    let update = admin
      .from('profiles')
      .update({
        streak: newStreak,
        longest_streak: longestStreak,
        last_active: today,
      })
      .eq('id', user.id);

    update = profile.last_active === null
      ? update.is('last_active', null)
      : update.eq('last_active', profile.last_active);

    const { data: updatedProfile, error: updateError } = await update
      .select('streak, longest_streak, last_active')
      .maybeSingle();

    if (updateError) {
      console.error('Streak update error:', updateError);
      return NextResponse.json({ error: 'Unable to update streak' }, { status: 500 });
    }

    if (!updatedProfile) {
      return NextResponse.json({ error: 'Streak changed concurrently. Refresh and retry.' }, { status: 409 });
    }

    return NextResponse.json({
      streak: updatedProfile.streak || 0,
      longest_streak: updatedProfile.longest_streak || 0,
      last_active: updatedProfile.last_active,
    }, { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) {
    console.error('Streak endpoint error:', error);
    return NextResponse.json({ error: 'Unable to update streak' }, { status: 500 });
  }
}
