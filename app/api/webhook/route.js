import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://abmvklthhjvvehijdqil.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export async function POST(req) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return Response.json({ error: 'Webhook signature failed' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const email = session.customer_email || session.customer_details?.email;

    if (email) {
      // Find user by email and update to pro
      const { data: { users } } = await supabase.auth.admin.listUsers();
      const user = users?.find(u => u.email === email);

      if (user) {
        await supabase.from('profiles').upsert({
          id: user.id,
          is_pro: true,
          pro_since: new Date().toISOString(),
          stripe_customer_id: session.customer,
        }, { onConflict: 'id' });
      }
    }
  }

  return Response.json({ received: true });
}
