-- Lock profile activity fields to server-side routes.
-- Browser clients must not be able to fabricate streak/last_active values.
revoke update on table public.profiles from authenticated;
drop policy if exists "Users can update activity fields" on public.profiles;

-- Keep email capture server-only and explicitly deny browser inserts.
drop policy if exists "Anyone can sign up" on public.email_signups;
drop policy if exists "No browser email signup inserts" on public.email_signups;
create policy "No browser email signup inserts"
  on public.email_signups
  for insert
  to anon, authenticated
  with check (false);
revoke insert on table public.email_signups from anon, authenticated;
