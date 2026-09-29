revoke insert on public.profiles from anon, authenticated;
revoke update on public.profiles from anon, authenticated;
grant update (name, last_active, streak, longest_streak) on public.profiles to authenticated;

drop policy if exists "Users can insert own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update activity fields"
  on public.profiles
  for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

revoke insert on public.lesson_completions from anon, authenticated;
drop policy if exists "Users can insert own completions" on public.lesson_completions;
drop policy if exists "Users can view own completions" on public.lesson_completions;
create policy "Users can view own completions"
  on public.lesson_completions
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

revoke all on public.trades from anon;
revoke update (id, user_id) on public.trades from authenticated;

drop policy if exists "Users can manage own trades" on public.trades;
drop policy if exists "Users can delete own trades" on public.trades;
drop policy if exists "Users can insert own trades" on public.trades;
drop policy if exists "Users can select own trades" on public.trades;
drop policy if exists "Users can update own trades" on public.trades;

create policy "Authenticated users can select own trades"
  on public.trades
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Authenticated users can insert own trades"
  on public.trades
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Authenticated users can update own trades"
  on public.trades
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Authenticated users can delete own trades"
  on public.trades
  for delete
  to authenticated
  using ((select auth.uid()) = user_id);
