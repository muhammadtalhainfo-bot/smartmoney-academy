import Stripe from 'stripe';

export const runtime = 'nodejs';

const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY || '');

function getBaseUrl(req) {
  const forwardedProto = req.headers.get('x-forwarded-proto');
  const forwardedHost = req.headers.get('x-forwarded-host');
  if (forwardedProto && forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`;
  }

  const host = req.headers.get('host');
  if (host) {
    const protocol = host.includes('localhost') ? 'http' : 'https';
    return `${protocol}://${host}`;
  }

  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
}

export async function POST(req) {
  try {
    const { priceId, email } = await req.json();

    if (!process.env.STRIPE_SECRET_KEY) {
      return Response.json({ error: 'Stripe is not configured on the server.' }, { status: 500 });
    }

    if (!priceId) {
      return Response.json({ error: 'Missing Stripe price ID.' }, { status: 400 });
    }

    const baseUrl = getBaseUrl(req);

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email,
      success_url: `${baseUrl}/dashboard?upgraded=true`,
      cancel_url: `${baseUrl}/pricing`,
    });

    return Response.json({ url: session.url });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
