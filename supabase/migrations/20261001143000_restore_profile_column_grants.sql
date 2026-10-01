-- Restore least-privilege browser updates on profiles.
-- A later table-level grant accidentally re-opened protected columns such as xp and is_pro.

revoke update on table public.profiles from authenticated;
grant update (name, last_active, streak, longest_streak) on table public.profiles to authenticated;
