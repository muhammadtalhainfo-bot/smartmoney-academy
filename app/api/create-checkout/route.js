import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

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
    const body = await req.json().catch(() => ({}));
    const priceId = typeof body.priceId === 'string' ? body.priceId.trim() : '';
    const accessToken = typeof body.accessToken === 'string' ? body.accessToken.trim() : '';

    if (!process.env.STRIPE_SECRET_KEY) {
      return Response.json({ error: 'Payment is not configured.' }, { status: 500 });
    }
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return Response.json({ error: 'Authentication is not configured.' }, { status: 500 });
    }
    if (!priceId || !allowedPriceIds().includes(priceId)) {
      return Response.json({ error: 'Invalid subscription plan.' }, { status: 400 });
    }
    if (!accessToken) {
      return Response.json({ error: 'Please sign in before starting Pro.' }, { status: 401 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (authError || !user?.id || !user.email) {
      return Response.json({ error: 'Your session is invalid. Please sign in again.' }, { status: 401 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const baseUrl = getBaseUrl();
    const metadata = { user_id: user.id, email: user.email.toLowerCase() };
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: user.email,
      success_url: `${baseUrl}/dashboard?upgraded=true`,
      cancel_url: `${baseUrl}/pricing?cancelled=true`,
      metadata,
      subscription_data: { metadata },
      allow_promotion_codes: true,
    });

    return Response.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return Response.json({ error: 'Failed to create checkout session.' }, { status: 500 });
  }
}
