-- Remove writable/public schemas from SECURITY DEFINER search paths.
-- All affected function object references are schema-qualified, so an empty
-- search_path is safe and avoids accidental name resolution through pg_temp.

alter function public.consume_api_rate_limit(text, text, integer, integer)
  set search_path = '';

alter function public.consume_ai_coach_rate_limit(uuid, integer, integer)
  set search_path = '';

alter function public.handle_new_user()
  set search_path = '';
