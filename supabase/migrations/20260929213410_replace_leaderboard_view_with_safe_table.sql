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

create table public.leaderboard_profiles (
  id uuid primary key references public.profiles(id) on delete cascade,
  username text,
  xp integer not null default 0,
  streak integer not null default 0
);

alter table public.leaderboard_profiles enable row level security;
revoke all on public.leaderboard_profiles from anon, authenticated;
grant select on public.leaderboard_profiles to anon, authenticated;

create policy "Anyone can read leaderboard"
  on public.leaderboard_profiles
  for select
  to anon, authenticated
  using (true);

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create or replace function private.sync_leaderboard_profile()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $function$
begin
  insert into public.leaderboard_profiles (id, username, xp, streak)
  values (
    new.id,
    coalesce(nullif(trim(new.username), ''), nullif(trim(new.name), ''), 'Anonymous'),
    coalesce(new.xp, 0),
    coalesce(new.streak, 0)
  )
  on conflict (id) do update
    set username = excluded.username,
        xp = excluded.xp,
        streak = excluded.streak;
  return new;
end;
$function$;

revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function private.sync_leaderboard_profile() from public, anon, authenticated;

 drop trigger if exists sync_leaderboard_profile on public.profiles;
create trigger sync_leaderboard_profile
after insert or update of username, name, xp, streak
on public.profiles
for each row
execute function private.sync_leaderboard_profile();

insert into public.leaderboard_profiles (id, username, xp, streak)
select
  id,
  coalesce(nullif(trim(username), ''), nullif(trim(name), ''), 'Anonymous'),
  coalesce(xp, 0),
  coalesce(streak, 0)
from public.profiles
on conflict (id) do update
  set username = excluded.username,
      xp = excluded.xp,
      streak = excluded.streak;
