-- Pin the SECURITY DEFINER leaderboard trigger to a trusted, empty search path.
-- The function uses schema-qualified table references, so no public search path is needed.
alter function private.sync_leaderboard_profile()
  set search_path = '';
