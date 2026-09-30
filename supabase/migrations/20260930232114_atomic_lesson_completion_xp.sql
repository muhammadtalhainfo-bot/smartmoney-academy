create schema if not exists private;

create or replace function private.complete_lesson_and_award_xp(
  p_user_id uuid,
  p_lesson_id integer,
  p_quiz_score integer,
  p_xp_earned integer
)
returns table (
  inserted boolean,
  xp integer
)
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_completion_id uuid;
  v_xp integer;
begin
  if p_user_id is null
     or p_lesson_id is null
     or p_quiz_score is null
     or p_quiz_score < 0
     or p_quiz_score > 100
     or p_xp_earned not in (20, 70) then
    raise exception 'Invalid lesson completion arguments';
  end if;

  insert into public.lesson_completions (user_id, lesson_id, quiz_score)
  values (p_user_id, p_lesson_id, p_quiz_score)
  on conflict (user_id, lesson_id) do nothing
  returning id into v_completion_id;

  if v_completion_id is null then
    select coalesce(p.xp, 0) into v_xp
      from public.profiles p
     where p.id = p_user_id;

    if not found then
      raise exception 'Profile not found';
    end if;

    return query select false, v_xp;
    return;
  end if;

  update public.profiles
     set xp = coalesce(xp, 0) + p_xp_earned
   where id = p_user_id
  returning xp into v_xp;

  if not found then
    raise exception 'Profile not found';
  end if;

  return query select true, v_xp;
end;
$function$;

revoke execute on function private.complete_lesson_and_award_xp(uuid, integer, integer, integer) from public;
revoke execute on function private.complete_lesson_and_award_xp(uuid, integer, integer, integer) from anon;
revoke execute on function private.complete_lesson_and_award_xp(uuid, integer, integer, integer) from authenticated;
grant execute on function private.complete_lesson_and_award_xp(uuid, integer, integer, integer) to service_role;
