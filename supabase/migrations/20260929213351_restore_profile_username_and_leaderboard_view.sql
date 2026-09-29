alter table public.profiles add column if not exists username text;

update public.profiles
set username = nullif(trim(name), '')
where username is null;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $function$
begin
  insert into public.profiles (id, name, username)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'username'),
    nullif(trim(new.raw_user_meta_data->>'username'), '')
  );
  return new;
end;
$function$;

create or replace view public.leaderboard_profiles
as
select id, username, xp, streak
from public.profiles;

grant select on public.leaderboard_profiles to anon, authenticated;
