import Stripe from 'stripe';

export const runtime = 'nodejs';

function getBaseUrl(req) {
  const proto = req.headers.get('x-forwarded-proto') || 'https';
  const host = req.headers.get('x-forwarded-host') || req.headers.get('host');
  if (host) return `${proto}://${host}`;
  return 'https://ictflow.com';
}

export async function POST(req) {
  try {
    const { priceId, email } = await req.json();

    if (!priceId) return Response.json({ error: 'Missing priceId' }, { status: 400 });
    if (!email || !email.includes('@')) return Response.json({ error: 'Invalid email' }, { status: 400 });
    if (!process.env.STRIPE_SECRET_KEY) return Response.json({ error: 'Payment not configured' }, { status: 500 });

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const baseUrl = getBaseUrl(req);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email.toLowerCase().trim(),
      success_url: `${baseUrl}/dashboard?upgraded=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/pricing?cancelled=true`,
      metadata: { email: email.toLowerCase().trim() },
    });

    return Response.json({ url: session.url, sessionId: session.id });
  } catch (err) {
    console.error('Checkout error:', err);
    return Response.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
