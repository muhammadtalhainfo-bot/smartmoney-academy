import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const attempts = new Map();

function getClientKey(req) {
  const forwarded = req.headers.get('x-forwarded-for') || '';
  return forwarded.split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown';
}

export async function POST(req) {
  try {
    const contentLength = Number(req.headers.get('content-length') || 0);
    if (contentLength > 2_000) return Response.json({ error: 'Request too large.' }, { status: 413 });

    const key = getClientKey(req);
    const now = Date.now();
    const previous = attempts.get(key);
    const entry = previous && now - previous.startedAt < WINDOW_MS
      ? previous
      : { startedAt: now, count: 0 };

    if (entry.count >= MAX_REQUESTS) {
      return Response.json({ error: 'Too many requests. Try again later.' }, { status: 429 });
    }

    const body = await req.json().catch(() => null);
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    if (!email || email.length > 254 || !email.includes('@')) {
      return Response.json({ error: 'Invalid email.', code: 'invalid_email' }, { status: 400 });
    }

    entry.count += 1;
    attempts.set(key, entry);
    if (attempts.size > 5000) {
      for (const [storedKey, value] of attempts) {
        if (now - value.startedAt >= WINDOW_MS) attempts.delete(storedKey);
      }
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_KEY;
    if (!url || !serviceKey) return Response.json({ error: 'Service unavailable.' }, { status: 500 });

    const supabase = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });
    const { error } = await supabase.from('email_signups').insert({ email });
    if (error?.code === '23505') {
      return Response.json({ ok: true, alreadySubscribed: true });
    }
    if (error) throw error;

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Email capture error:', error);
    return Response.json({ error: 'Unable to subscribe.' }, { status: 500 });
  }
}
