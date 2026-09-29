import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

async function findProfileByCustomer(supabase, customerId) {
  if (!customerId) return null;
  const { data } = await supabase
    .from('profiles')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .maybeSingle();
  return data || null;
}

async function customerHasActiveSubscription(stripe, customerId) {
  if (!customerId) return false;
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: 'all',
    limit: 100,
  });
  return subscriptions.data.some((subscription) =>
    ['active', 'trialing'].includes(subscription.status)
  );
}

async function findUserByEmail(supabase, email) {
  if (!email) return null;
  const { data: { users }, error } = await supabase.auth.admin.listUsers();
  if (error) throw error;
  return users?.find((u) => u.email?.toLowerCase() === email.toLowerCase()) || null;
}

export async function POST(req) {
  try {
    const Stripe = (await import('stripe')).default;
    const secret = process.env.SUPABASE_SERVICE_KEY;

    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET || !process.env.NEXT_PUBLIC_SUPABASE_URL || !secret) {
      return Response.json({ error: 'Configuration error' }, { status: 500 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, secret);
    const contentLength = Number(req.headers.get('content-length') || 0);
    if (contentLength > 1_000_000) {
      return Response.json({ error: 'Webhook payload too large' }, { status: 413 });
    }
    const body = await req.text();
    if (body.length > 1_000_000) {
      return Response.json({ error: 'Webhook payload too large' }, { status: 413 });
    }
    const sig = req.headers.get('stripe-signature');

    if (!sig) return Response.json({ error: 'Missing signature' }, { status: 400 });

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch {
      return Response.json({ error: 'Webhook signature failed' }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const email = session.customer_email || session.customer_details?.email || session.metadata?.email;
      const metadataUserId = session.metadata?.user_id;

      let user = null;
      if (metadataUserId) {
        user = await supabase.auth.admin.getUserById(metadataUserId).then(({ data, error }) => {
          if (error) throw error;
          return data?.user || null;
        });
      }

      if (!user && email) {
        user = await findUserByEmail(supabase, email);
      }
      if (!user) return Response.json({ received: true });

      let active = true;
      if (session.subscription) {
        const subscription = await stripe.subscriptions.retrieve(session.subscription);
        active = ['active', 'trialing'].includes(subscription.status);
      }

      const { error: profileError } = await supabase.from('profiles').upsert({
        id: user.id,
        is_pro: active,
        pro_since: active ? new Date().toISOString() : null,
        stripe_customer_id: typeof session.customer === 'string' ? session.customer : session.customer?.id || null,
      }, { onConflict: 'id' });
      if (profileError) throw profileError;
    }

    if (
      event.type === 'customer.subscription.created' ||
      event.type === 'customer.subscription.updated' ||
      event.type === 'customer.subscription.deleted'
    ) {
      const subscription = event.data.object;
      const customerId = typeof subscription.customer === 'string'
        ? subscription.customer
        : subscription.customer?.id;
      const profile = await findProfileByCustomer(supabase, customerId);
      if (profile) {
        // Recompute from the customer's current Stripe state so an old
        // subscription cannot revoke Pro while another subscription is active.
        const active = await customerHasActiveSubscription(stripe, customerId);
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ is_pro: active })
          .eq('id', profile.id);
        if (profileError) throw profileError;
      }
    }

    return Response.json({ received: true });
  } catch (err) {
    console.error('Stripe webhook error:', err);
    return Response.json({ error: 'Webhook failed' }, { status: 500 });
  }
}
