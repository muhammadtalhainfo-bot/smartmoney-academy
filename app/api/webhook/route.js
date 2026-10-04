import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

function noStoreJson(body, init = {}) {
  return Response.json(body, {
    ...init,
    headers: { ...(init.headers || {}), 'Cache-Control': 'no-store' },
  });
}

const WEBHOOK_RECLAIM_AFTER_MS = 5 * 60 * 1000;
const MAX_WEBHOOK_ERROR_LENGTH = 1000;

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
    ['active', 'trialing', 'past_due'].includes(subscription.status)
  );
}

async function findUserByEmail(supabase, email) {
  if (!email) return null;
  const target = email.toLowerCase();
  let page = 1;
  const perPage = 1000;

  while (true) {
    const { data: { users }, error } = await supabase.auth.admin.listUsers({ page, perPage });
    if (error) throw error;

    const match = users?.find((u) => u.email?.toLowerCase() === target);
    if (match) return match;
    if (!users || users.length < perPage) return null;

    page += 1;
  }
}

async function claimWebhookEvent(supabase, event) {
  const now = new Date();
  const { data: inserted, error: insertError } = await supabase
    .from('stripe_webhook_events')
    .insert({
      event_id: event.id,
      event_type: event.type,
      status: 'processing',
      received_at: now.toISOString(),
      processed_at: null,
      last_error: null,
    })
    .select('event_id')
    .maybeSingle();

  if (!insertError && inserted) return { claimed: true };

  if (insertError?.code !== '23505') {
    throw insertError;
  }

  const { data: existing, error: existingError } = await supabase
    .from('stripe_webhook_events')
    .select('event_id,status,received_at')
    .eq('event_id', event.id)
    .maybeSingle();

  if (existingError) throw existingError;
  if (!existing) return { claimed: false, busy: true };

  if (existing.status === 'processed') {
    return { claimed: false, duplicate: true };
  }

  const staleCutoff = new Date(Date.now() - WEBHOOK_RECLAIM_AFTER_MS).toISOString();

  if (existing.status === 'failed') {
    const { data: reclaimed, error: reclaimError } = await supabase
      .from('stripe_webhook_events')
      .update({
        event_type: event.type,
        status: 'processing',
        received_at: now.toISOString(),
        processed_at: null,
        last_error: null,
      })
      .eq('event_id', event.id)
      .eq('status', 'failed')
      .select('event_id');

    if (reclaimError) throw reclaimError;
    return reclaimed?.length ? { claimed: true } : { claimed: false, busy: true };
  }

  if (existing.status === 'processing' && existing.received_at < staleCutoff) {
    const { data: reclaimed, error: reclaimError } = await supabase
      .from('stripe_webhook_events')
      .update({
        event_type: event.type,
        status: 'processing',
        received_at: now.toISOString(),
        processed_at: null,
        last_error: null,
      })
      .eq('event_id', event.id)
      .eq('status', 'processing')
      .lt('received_at', staleCutoff)
      .select('event_id');

    if (reclaimError) throw reclaimError;
    return reclaimed?.length ? { claimed: true } : { claimed: false, busy: true };
  }

  return { claimed: false, busy: true };
}

async function markWebhookProcessed(supabase, eventId) {
  const { error } = await supabase
    .from('stripe_webhook_events')
    .update({
      status: 'processed',
      processed_at: new Date().toISOString(),
      last_error: null,
    })
    .eq('event_id', eventId)
    .eq('status', 'processing');

  if (error) throw error;
}

async function markWebhookFailed(supabase, eventId, error) {
  const message = String(error?.message || error || 'Webhook processing failed')
    .slice(0, MAX_WEBHOOK_ERROR_LENGTH);

  const { error: updateError } = await supabase
    .from('stripe_webhook_events')
    .update({
      status: 'failed',
      last_error: message,
    })
    .eq('event_id', eventId)
    .neq('status', 'processed');

  if (updateError) {
    console.error('Stripe webhook ledger update failed:', updateError);
  }
}

export async function POST(req) {
  let claimedEventId = null;

  try {
    const Stripe = (await import('stripe')).default;
    const secret = process.env.SUPABASE_SERVICE_KEY;

    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET || !process.env.NEXT_PUBLIC_SUPABASE_URL || !secret) {
      return noStoreJson({ error: 'Configuration error' }, { status: 500 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, secret);
    const contentLength = Number(req.headers.get('content-length') || 0);
    if (contentLength > 1_000_000) {
      return noStoreJson({ error: 'Webhook payload too large' }, { status: 413 });
    }
    const body = await req.text();
    if (body.length > 1_000_000) {
      return noStoreJson({ error: 'Webhook payload too large' }, { status: 413 });
    }
    const sig = req.headers.get('stripe-signature');

    if (!sig) return noStoreJson({ error: 'Missing signature' }, { status: 400 });

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch {
      return noStoreJson({ error: 'Webhook signature failed' }, { status: 400 });
    }

    const claim = await claimWebhookEvent(supabase, event);
    if (claim.duplicate) {
      return noStoreJson({ received: true, duplicate: true }, { headers: { 'Cache-Control': 'no-store' } });
    }
    if (claim.busy) {
      return noStoreJson({ error: 'Webhook event is already being processed.' }, { status: 409, headers: { 'Cache-Control': 'no-store' } });
    }
    if (!claim.claimed) {
      return noStoreJson({ error: 'Unable to claim webhook event.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
    }

    claimedEventId = event.id;

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
      if (!user) {
        await markWebhookProcessed(supabase, event.id);
        return noStoreJson({ received: true }, { headers: { 'Cache-Control': 'no-store' } });
      }

      let active = false;
      if (session.subscription) {
        const subscription = await stripe.subscriptions.retrieve(session.subscription);
        active = ['active', 'trialing', 'past_due'].includes(subscription.status);
      }

      const { data: existingProfile, error: profileLookupError } = await supabase
        .from('profiles')
        .select('pro_since')
        .eq('id', user.id)
        .maybeSingle();

      if (profileLookupError) throw profileLookupError;

      const { error: profileError } = await supabase.from('profiles').upsert({
        id: user.id,
        is_pro: active,
        pro_since: active ? (existingProfile?.pro_since || new Date().toISOString()) : null,
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

    await markWebhookProcessed(supabase, event.id);
    return noStoreJson({ received: true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (err) {
    console.error('Stripe webhook error:', err);
    if (claimedEventId) {
      const secret = process.env.SUPABASE_SERVICE_KEY;
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (secret && url) {
        try {
          const supabase = createClient(url, secret);
          await markWebhookFailed(supabase, claimedEventId, err);
        } catch (ledgerError) {
          console.error('Stripe webhook failure ledger error:', ledgerError);
        }
      }
    }
    return noStoreJson({ error: 'Webhook failed' }, { status: 500, headers: { 'Cache-Control': 'no-store' } });
  }
}
