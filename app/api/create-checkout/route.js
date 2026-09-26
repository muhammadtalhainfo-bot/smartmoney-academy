import Stripe from 'stripe';

export const runtime = 'nodejs';

function getBaseUrl(req) {
  const proto = req.headers.get('x-forwarded-proto') || 'http';
  const host = req.headers.get('x-forwarded-host') || req.headers.get('host');
  if (host) return `${proto.split(',')[0].trim()}://${host.split(',')[0].trim()}`;
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
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
    const body = await req.json();
    const priceId = typeof body.priceId === 'string' ? body.priceId.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';

    if (!process.env.STRIPE_SECRET_KEY) {
      return Response.json({ error: 'Payment is not configured.' }, { status: 500 });
    }
    if (!priceId || !allowedPriceIds().includes(priceId)) {
      return Response.json({ error: 'Invalid subscription plan.' }, { status: 400 });
    }
    if (!email || !email.includes('@')) {
      return Response.json({ error: 'Invalid email.' }, { status: 400 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const baseUrl = getBaseUrl(req);
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email,
      success_url: `${baseUrl}/dashboard?upgraded=true`,
      cancel_url: `${baseUrl}/pricing?cancelled=true`,
      metadata: { email },
      subscription_data: { metadata: { email } },
      allow_promotion_codes: true,
    });

    return Response.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return Response.json({ error: 'Failed to create checkout session.' }, { status: 500 });
  }
}
