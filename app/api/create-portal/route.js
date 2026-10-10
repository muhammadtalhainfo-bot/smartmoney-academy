import Stripe from 'stripe';
import { createHash } from 'node:crypto';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

function privateJson(body, init = {}) {
  return NextResponse.json(body, {
    ...init,
    headers: { ...(init.headers || {}), 'Cache-Control': 'private, no-store' },
  });
}

const WINDOW_SECONDS = 10 * 60;
const MAX_REQUESTS = 5;

function hashUserKey(userId) {
  const pepper = process.env.RATE_LIMIT_SECRET || process.env.SUPABASE_SERVICE_KEY || 'ictflow-rate-limit';
  return createHash('sha256').update(pepper + ':portal:' + userId).digest('hex');
}

export async function POST(req) {
  try {
    if (!process.env.STRIPE_SECRET_KEY || !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return privateJson({ error: 'Payment service is not configured.' }, { status: 503 });
    }

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
    if (authError || !user) {
      return privateJson({ error: 'Authentication required.' }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id, is_pro')
      .eq('id', user.id)
      .maybeSingle();

    // Billing access must not depend on the local Pro entitlement flag: the webhook
    // intentionally clears is_pro for past_due subscriptions, but those customers
    // still need the Stripe portal to update payment methods or recover service.
    if (!profile?.stripe_customer_id) {
      return privateJson({ error: 'No billing account is linked to this user.' }, { status: 403 });
    }

    const serviceKey = process.env.SUPABASE_SERVICE_KEY;
    if (!serviceKey) {
      return privateJson({ error: 'Payment service is not configured.' }, { status: 503 });
    }

    const { createClient } = await import('@supabase/supabase-js');
    const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    const { data: allowed, error: rateError } = await admin.rpc('consume_api_rate_limit', {
      p_scope: 'stripe-portal',
      p_key_hash: hashUserKey(user.id),
      p_window_seconds: WINDOW_SECONDS,
      p_max_requests: MAX_REQUESTS,
    });

    if (rateError) {
      console.error('Stripe portal rate-limit error:', rateError);
      return privateJson({ error: 'Payment service temporarily unavailable.' }, { status: 503 });
    }
    if (allowed !== true) {
      return privateJson({ error: 'Too many requests. Try again later.' }, { status: 429 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { timeout: 20_000 });
    const configuredOrigin = process.env.NEXT_PUBLIC_APP_URL?.trim()?.replace(/\/$/, '');
    const origin = configuredOrigin || (
      process.env.NODE_ENV === 'production'
        ? 'https://ictflow.com'
        : new URL(req.url).origin
    );
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${origin}/dashboard`,
    });

    return privateJson({ url: portalSession.url }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Stripe portal error:', error);
    return privateJson({ error: 'Unable to open billing portal.' }, { status: 502, headers: { 'Cache-Control': 'no-store' } });
  }
}
