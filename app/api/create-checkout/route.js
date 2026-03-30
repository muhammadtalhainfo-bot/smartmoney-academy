import Stripe from 'stripe';

export const runtime = 'nodejs';

const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY || '');

export async function POST(req) {
  try {
    const { priceId, email } = await req.json();

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email,
      success_url: 'https://ictflow.com/dashboard?upgraded=true',
      cancel_url: 'https://ictflow.com/pricing',
    });

    return Response.json({ url: session.url });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
