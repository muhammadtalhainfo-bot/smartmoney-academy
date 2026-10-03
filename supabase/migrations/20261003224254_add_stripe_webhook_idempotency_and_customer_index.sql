-- Track Stripe webhook delivery state so retries and concurrent deliveries are safe.
create unique index if not exists profiles_stripe_customer_id_key
  on public.profiles (stripe_customer_id)
  where stripe_customer_id is not null;

create table if not exists public.stripe_webhook_events (
  event_id text primary key,
  event_type text not null,
  status text not null default 'processing'
    check (status in ('processing', 'processed', 'failed')),
  received_at timestamptz not null default now(),
  processed_at timestamptz,
  last_error text
);

create index if not exists stripe_webhook_events_received_at_idx
  on public.stripe_webhook_events (received_at);

alter table public.stripe_webhook_events enable row level security;

revoke all on table public.stripe_webhook_events from anon, authenticated;
revoke all on table public.stripe_webhook_events from public;
grant all on table public.stripe_webhook_events to service_role;
