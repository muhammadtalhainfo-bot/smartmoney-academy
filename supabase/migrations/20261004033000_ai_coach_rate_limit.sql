-- Persist AI Coach rate-limit state so limits hold across serverless instances.
create table if not exists public.ai_coach_rate_limits (
  user_id uuid primary key references auth.users(id) on delete cascade,
  window_started_at timestamptz not null default now(),
  request_count integer not null default 0
);

alter table public.ai_coach_rate_limits enable row level security;

revoke all on table public.ai_coach_rate_limits from anon, authenticated;

create or replace function public.consume_ai_coach_rate_limit(
  p_user_id uuid,
  p_window_seconds integer default 600,
  p_max_requests integer default 10
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  current_count integer;
begin
  if p_user_id is null
     or p_window_seconds < 1
     or p_window_seconds > 86400
     or p_max_requests < 1
     or p_max_requests > 1000 then
    raise exception 'Invalid rate-limit parameters';
  end if;

  insert into public.ai_coach_rate_limits (
    user_id,
    window_started_at,
    request_count
  )
  values (
    p_user_id,
    now(),
    1
  )
  on conflict (user_id) do update
  set
    window_started_at = case
      when now() - public.ai_coach_rate_limits.window_started_at >= (p_window_seconds * interval '1 second')
        then now()
      else public.ai_coach_rate_limits.window_started_at
    end,
    request_count = case
      when now() - public.ai_coach_rate_limits.window_started_at >= (p_window_seconds * interval '1 second')
        then 1
      else public.ai_coach_rate_limits.request_count + 1
    end
  returning request_count into current_count;

  return current_count <= p_max_requests;
end;
$$;

revoke all on function public.consume_ai_coach_rate_limit(uuid, integer, integer) from public, anon, authenticated;
grant execute on function public.consume_ai_coach_rate_limit(uuid, integer, integer) to service_role;
