-- Keep the private Stripe webhook ledger invisible to browser roles.
drop index if exists public.stripe_webhook_events_received_at_idx;

drop policy if exists "Deny browser access to Stripe webhook events" on public.stripe_webhook_events;
create policy "Deny browser access to Stripe webhook events"
  on public.stripe_webhook_events
  for all
  to anon, authenticated
  using (false)
  with check (false);
