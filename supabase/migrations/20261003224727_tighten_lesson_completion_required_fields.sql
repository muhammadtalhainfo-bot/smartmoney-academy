alter table public.lesson_completions
  alter column user_id set not null,
  alter column quiz_score set not null,
  alter column completed_at set not null;
