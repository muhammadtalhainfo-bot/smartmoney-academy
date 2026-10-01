import Stripe from 'stripe';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

function getBaseUrl() {
  const configured = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (configured) return configured.replace(/\/$/, '');
  if (process.env.NODE_ENV !== 'production') return 'http://localhost:3000';
  throw new Error('NEXT_PUBLIC_APP_URL is required in production.');
}

function allowedPriceIds() {
  return [
    process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE,
    process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE,
    process.env.STRIPE_MONTHLY_PRICE_ID,
    process.env.STRIPE_YEARLY_PRICE_ID,
  ].filter(Boolean);
}

export async function POST(req) {
  try {
    const contentLength = Number(req.headers.get('content-length') || 0);
    if (contentLength > 20_000) {
      return Response.json({ error: 'Request too large.' }, { status: 413 });
    }
    const body = await req.json().catch(() => ({}));
    const priceId = typeof body.priceId === 'string' ? body.priceId.trim() : '';

    if (!process.env.STRIPE_SECRET_KEY) {
      return Response.json({ error: 'Payment is not configured.' }, { status: 500 });
    }
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return Response.json({ error: 'Authentication is not configured.' }, { status: 500 });
    }
    if (!priceId || !allowedPriceIds().includes(priceId)) {
      return Response.json({ error: 'Invalid subscription plan.' }, { status: 400 });
    }
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
    if (authError || !user?.id || !user.email) {
      return Response.json({ error: 'Please sign in before starting Pro.' }, { status: 401 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id, is_pro')
      .eq('id', user.id)
      .maybeSingle();

    if (profile?.stripe_customer_id) {
      const subscriptions = await stripe.subscriptions.list({
        customer: profile.stripe_customer_id,
        status: 'all',
        limit: 100,
      });
      const hasActiveSubscription = subscriptions.data.some((subscription) =>
        ['active', 'trialing', 'past_due'].includes(subscription.status)
      );
      if (hasActiveSubscription) {
        return Response.json({
          error: 'You already have a Pro subscription. Manage it from Billing instead of starting another subscription.',
          code: 'subscription_exists',
        }, { status: 409 });
      }
    }

    const baseUrl = getBaseUrl();
    const metadata = { user_id: user.id, email: user.email.toLowerCase() };
    const idempotencyKey = `checkout:${user.id}:${priceId}:${Math.floor(Date.now() / 60_000)}`;
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: user.email,
      success_url: `${baseUrl}/dashboard?upgraded=true`,
      cancel_url: `${baseUrl}/pricing?cancelled=true`,
      metadata,
      subscription_data: { metadata },
      allow_promotion_codes: true,
    }, { idempotencyKey });

    return Response.json({ url: session.url, sessionId: session.id }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return Response.json({ error: 'Failed to create checkout session.' }, { status: 500 });
  }
}
