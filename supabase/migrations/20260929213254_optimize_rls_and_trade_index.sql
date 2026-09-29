drop policy if exists "Service role can read" on public.email_signups;
drop policy if exists "Service role full access" on public.blog_posts;

drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
  on public.profiles
  for select
  to authenticated
  using ((select auth.uid()) = id);

create index if not exists trades_user_id_idx
  on public.trades (user_id);
