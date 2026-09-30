-- Defense-in-depth: expose only the table privileges required by the browser roles.
-- RLS remains the row-level authorization layer.

revoke all on table public.blog_posts from anon, authenticated;
grant select on table public.blog_posts to anon, authenticated;

revoke all on table public.email_signups from anon, authenticated;
grant insert on table public.email_signups to anon;

revoke all on table public.leaderboard_profiles from anon, authenticated;
grant select on table public.leaderboard_profiles to anon, authenticated;

revoke all on table public.lesson_completions from anon, authenticated;
grant select on table public.lesson_completions to authenticated;

revoke all on table public.profiles from anon, authenticated;
grant select, update on table public.profiles to authenticated;

revoke all on table public.trades from anon, authenticated;
grant select, insert, update, delete on table public.trades to authenticated;
