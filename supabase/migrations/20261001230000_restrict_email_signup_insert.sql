-- Email capture is handled by the server-side API with the service role.
-- Do not allow browser clients to bypass API validation/rate limiting via PostgREST.
drop policy if exists "Anyone can sign up" on public.email_signups;
revoke all on table public.email_signups from anon, authenticated;
