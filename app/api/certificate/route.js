import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { createClient as createSupabaseAdmin } from '@supabase/supabase-js';
import { createHash } from 'node:crypto';
import { MODULES } from '@/lib/curriculum';

export const runtime = 'nodejs';

const RATE_WINDOW_SECONDS = 5 * 60;
const RATE_LIMIT = 10;

function hashUserKey(userId) {
  const pepper = process.env.RATE_LIMIT_SECRET || process.env.SUPABASE_SERVICE_KEY || 'ictflow-rate-limit';
  return createHash('sha256').update(pepper + ':certificate:' + userId).digest('hex');
}

function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) throw new Error('Supabase server configuration is missing.');
  return createSupabaseAdmin(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

function noStore(data, status = 200) {
  return Response.json(data, {
    status,
    headers: { 'Cache-Control': 'private, no-store' },
  });
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
            } catch {}
          },
        },
      }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return noStore({ error: 'Unauthorized' }, 401);

    const serviceKey = process.env.SUPABASE_SERVICE_KEY;
    if (!serviceKey) return noStore({ error: 'Service temporarily unavailable.' }, 503);

    const admin = adminClient();
    const { data: allowed, error: rateError } = await admin.rpc('consume_api_rate_limit', {
      p_scope: 'certificate',
      p_key_hash: hashUserKey(user.id),
      p_window_seconds: RATE_WINDOW_SECONDS,
      p_max_requests: RATE_LIMIT,
    });
    if (rateError) {
      console.error('Certificate rate-limit error:', rateError);
      return noStore({ error: 'Service temporarily unavailable.' }, 503);
    }
    if (allowed !== true) return noStore({ error: 'Too many requests. Try again later.' }, 429);

    const requiredModuleIds = MODULES.map((module) => module.id);
    const [{ data: completions, error: completionError }, { data: profile, error: profileError }] = await Promise.all([
      supabase.from('lesson_completions').select('lesson_id, completed_at, quiz_score').eq('user_id', user.id),
      supabase.from('profiles').select('name, username, xp, is_pro').eq('id', user.id).maybeSingle(),
    ]);

    if (completionError || profileError) {
      console.error('Certificate data error:', completionError || profileError);
      return noStore({ error: 'Unable to load certificate data.' }, 500);
    }

    if (profile?.is_pro !== true) return noStore({ error: 'Pro membership required.' }, 403);

    const passedCompletions = (completions || []).filter((row) => Number(row.quiz_score) >= 70);
    const completedIds = new Set(passedCompletions.map((row) => Number(row.lesson_id)));
    const completedModuleIds = requiredModuleIds.filter((id) => completedIds.has(id));
    const eligible = completedModuleIds.length === requiredModuleIds.length;

    const latestCompletion = (completions || [])
       .filter((row) => completedIds.has(Number(row.lesson_id)) && row.completed_at)
      .map((row) => new Date(row.completed_at).getTime())
      .filter(Number.isFinite)
      .reduce((latest, value) => Math.max(latest, value), 0);

    const issuedAt = eligible && latestCompletion ? new Date(latestCompletion).toISOString() : null;
    const credentialId = eligible ? `ICTF-${user.id.toUpperCase()}` : null;

    return noStore({
      eligible,
      completedCount: completedModuleIds.length,
      totalModules: requiredModuleIds.length,
      totalLessons: MODULES.reduce((sum, module) => sum + Number(module.lessons || 0), 0),
      completedModuleIds,
      name: profile?.name || profile?.username || user.email?.split('@')[0] || 'Trader',
      username: profile?.username || null,
      xp: Number(profile?.xp || 0),
      issuedAt,
      credentialId,
      verificationUrl: credentialId ? `https://ictflow.com/verify/${credentialId}` : null,
    });
  } catch (error) {
    console.error('Certificate endpoint error:', error);
    return noStore({ error: 'Unable to load certificate data.' }, 500);
  }
}
