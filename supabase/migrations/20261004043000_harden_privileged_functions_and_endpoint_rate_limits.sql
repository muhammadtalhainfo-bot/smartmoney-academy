-- Harden privileged function execution and document endpoint rate-limit usage.
revoke execute on function public.validate_trade_row() from public;

alter function public.consume_ai_coach_rate_limit(uuid, integer, integer)
  set search_path = public, pg_temp;
