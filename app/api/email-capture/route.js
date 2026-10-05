import { createClient } from '@supabase/supabase-js';
import { createHash } from 'node:crypto';

export const runtime = 'nodejs';

const WINDOW_SECONDS = 10 * 60;
const MAX_REQUESTS = 5;

function noStoreJson(body, init = {}) {
  return Response.json(body, {
    ...init,
    headers: { ...(init.headers || {}), 'Cache-Control': 'no-store' },
  });
}

function getClientKey(req) {
  const forwarded = req.headers.get('x-forwarded-for') || '';
  return forwarded.split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown';
}

function hashClientKey(value) {
  const pepper = process.env.RATE_LIMIT_SECRET || process.env.SUPABASE_SERVICE_KEY || 'ictflow-rate-limit';
  return createHash('sha256').update(pepper + ':' + value).digest('hex');
}

export async function POST(req) {
  try {
    const contentLength = Number(req.headers.get('content-length') || 0);
    if (contentLength > 2_000) return noStoreJson({ error: 'Request too large.' }, { status: 413 });

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_KEY;
    if (!url || !serviceKey) return noStoreJson({ error: 'Service unavailable.' }, { status: 500 });

    const supabase = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });
    const { data: allowed, error: rateError } = await supabase.rpc('consume_api_rate_limit', {
      p_scope: 'email-capture',
      p_key_hash: hashClientKey(getClientKey(req)),
      p_window_seconds: WINDOW_SECONDS,
      p_max_requests: MAX_REQUESTS,
    });

    if (rateError) {
      console.error('Email capture rate-limit error:', rateError);
      return noStoreJson({ error: 'Service temporarily unavailable.' }, { status: 503 });
    }

    if (allowed !== true) {
      return noStoreJson({ error: 'Too many requests. Try again later.' }, { status: 429 });
    }

    const rawBody = await req.text();
    if (rawBody.length > 2_000) return noStoreJson({ error: 'Request too large.' }, { status: 413 });

    let body = null;
    try {
      body = rawBody ? JSON.parse(rawBody) : null;
    } catch {
      return noStoreJson({ error: 'Invalid request.', code: 'invalid_json' }, { status: 400 });
    }

    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (
      !email ||
      email.length > 254 ||
      !emailPattern.test(email) ||
      email.split('@')[0].length > 64
    ) {
      return noStoreJson({ error: 'Invalid email.', code: 'invalid_email' }, { status: 400 });
    }


    const { error } = await supabase.from('email_signups').insert({ email });
    if (error?.code === '23505') {
      return noStoreJson({ ok: true, alreadySubscribed: true }, { headers: { 'Cache-Control': 'no-store' } });
    }
    if (error) throw error;

    return noStoreJson({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Email capture error:', error);
    return noStoreJson({ error: 'Unable to subscribe.' }, { status: 500 });
  }
}
