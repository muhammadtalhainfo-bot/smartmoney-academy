-- Explicitly deny browser roles access to private rate-limit tables.
-- service_role bypasses RLS and remains the only granted execution path.

create policy "No browser access to AI Coach rate limits"
  on public.ai_coach_rate_limits
  for all
  to anon, authenticated
  using (false)
  with check (false);

create policy "No browser access to API rate limits"
  on public.api_rate_limits
  for all
  to anon, authenticated
  using (false)
  with check (false);
