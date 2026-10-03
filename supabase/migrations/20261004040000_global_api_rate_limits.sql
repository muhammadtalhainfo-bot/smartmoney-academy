-- Global rate limiting for serverless endpoints.
-- Only service_role can consume rate-limit state; raw client identifiers are hashed by callers.

create table if not exists public.api_rate_limits (
  scope text not null,
  key_hash text not null,
  window_started_at timestamptz not null default now(),
  request_count integer not null default 0,
  primary key (scope, key_hash)
);

alter table public.api_rate_limits enable row level security;

revoke all on table public.api_rate_limits from public, anon, authenticated;

create or replace function public.consume_api_rate_limit(
  p_scope text,
  p_key_hash text,
  p_window_seconds integer,
  p_max_requests integer
)
returns boolean
language plpgsql
security definer
set search_path = public, pg_temp
as $function$
declare
  current_count integer;
begin
  if p_scope is null or length(trim(p_scope)) = 0 or length(p_scope) > 64
     or p_key_hash is null or p_key_hash !~ '^[0-9a-f]{64}$'
     or p_window_seconds < 1 or p_window_seconds > 86400
     or p_max_requests < 1 or p_max_requests > 10000 then
    raise exception 'Invalid rate-limit parameters';
  end if;

  insert into public.api_rate_limits (scope, key_hash, window_started_at, request_count)
  values (trim(p_scope), lower(p_key_hash), now(), 1)
  on conflict (scope, key_hash) do update
  set
    window_started_at = case
      when now() - public.api_rate_limits.window_started_at >= (p_window_seconds * interval '1 second')
        then now()
      else public.api_rate_limits.window_started_at
    end,
    request_count = case
      when now() - public.api_rate_limits.window_started_at >= (p_window_seconds * interval '1 second')
        then 1
      else public.api_rate_limits.request_count + 1
    end
  returning request_count into current_count;

  return current_count <= p_max_requests;
end;
$function$;

revoke all on function public.consume_api_rate_limit(text, text, integer, integer) from public, anon, authenticated;
grant execute on function public.consume_api_rate_limit(text, text, integer, integer) to service_role;
