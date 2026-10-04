import { createHash } from 'node:crypto';
import { getAdminSession } from '../../admin/actions';

export const runtime = 'nodejs';

function privateJson(body, init = {}) {
  return Response.json(body, {
    ...init,
    headers: { ...(init.headers || {}), 'Cache-Control': 'private, no-store' },
  });
}

const WINDOW_SECONDS = 5 * 60;
const MAX_REQUESTS = 5;

function hashClientKey(value) {
  const pepper = process.env.RATE_LIMIT_SECRET || process.env.SUPABASE_SERVICE_KEY || 'ictflow-rate-limit';
  return createHash('sha256').update(pepper + ':notify:' + value).digest('hex');
}

function getClientKey(req) {
  const forwarded = req.headers.get('x-forwarded-for') || '';
  return forwarded.split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown';
}

async function consumeRateLimit(req) {
  const session = await getAdminSession();
  if (!session?.ok) return { session, allowed: false };

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !serviceKey) return { session, allowed: true, unavailable: true };

  const { createClient } = await import('@supabase/supabase-js');
  const supabase = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: allowed, error } = await supabase.rpc('consume_api_rate_limit', {
    p_scope: 'admin-notify',
    p_key_hash: hashClientKey(getClientKey(req)),
    p_window_seconds: WINDOW_SECONDS,
    p_max_requests: MAX_REQUESTS,
  });

  if (error) {
    console.error('Notification rate-limit error:', error);
    return { session, allowed: false, rateLimitError: true };
  }
  return { session, allowed: allowed === true };
}

export async function POST(req) {
  try {
    const contentLength = Number(req.headers.get('content-length') || 0);
    if (contentLength > 25_000) {
      return privateJson({ error: 'Request too large.' }, { status: 413 });
    }

    const rate = await consumeRateLimit(req);
    if (!rate.session?.ok) {
      return privateJson({ error: 'Unauthorized' }, { status: 401 });
    }
    if (rate.unavailable) {
      return privateJson({ error: 'Notification service not configured' }, { status: 500 });
    }
    if (rate.rateLimitError) {
      return privateJson({ error: 'Service temporarily unavailable' }, { status: 503 });
    }
    if (!rate.allowed) {
      return privateJson({ error: 'Too many requests. Try again later.' }, { status: 429 });
    }

    if (!process.env.ONESIGNAL_REST_API_KEY) {
      return privateJson({ error: 'Notification service not configured' }, { status: 500 });
    }

    const rawBody = await req.text();
    if (rawBody.length > 25_000) {
      return privateJson({ error: 'Request too large.' }, { status: 413 });
    }

    let body = {};
    try {
      body = rawBody ? JSON.parse(rawBody) : {};
    } catch {
      return privateJson({ error: 'Invalid request.' }, { status: 400 });
    }

    const { title, message } = body;
    const cleanTitle = typeof title === 'string' ? title.trim() : '';
    const cleanMessage = typeof message === 'string' ? message.trim() : '';
    if (!cleanTitle) return privateJson({ error: 'Missing title' }, { status: 400 });
    if (!cleanMessage) return privateJson({ error: 'Missing message' }, { status: 400 });
    if (cleanTitle.length > 100 || cleanMessage.length > 2000) {
      return privateJson({ error: 'Notification content is too long.' }, { status: 413 });
    }

    const response = await fetch('https://api.onesignal.com/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ONESIGNAL_REST_API_KEY}`,
      },
      body: JSON.stringify({
        app_id: '7091f3f0-0cf1-4afa-9587-0c3040b520c7',
        included_segments: ['All'],
        headings: { en: cleanTitle },
        contents: { en: cleanMessage },
        url: 'https://ictflow.com',
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('OneSignal notification error:', response.status, data);
      return privateJson({ error: 'Failed to send notification' }, { status: 502 });
    }
    return privateJson({ success: true, data });
  } catch (err) {
    console.error('Notify error:', err);
    return privateJson({ error: 'Failed to send notification' }, { status: 500 });
  }
}
