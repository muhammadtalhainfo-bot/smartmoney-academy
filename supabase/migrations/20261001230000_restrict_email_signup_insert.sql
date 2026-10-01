-- Email capture is handled by the server-side API with the service role.
-- Do not allow browser clients to bypass API validation/rate limiting via PostgREST.
revoke all on table public.email_signups from anon, authenticated;
