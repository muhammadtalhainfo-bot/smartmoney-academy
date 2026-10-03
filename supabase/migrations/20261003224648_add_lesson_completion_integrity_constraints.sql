alter table public.lesson_completions
  add constraint lesson_completions_module_matches_lesson
  check (module_id = lesson_id);

alter table public.lesson_completions
  add constraint lesson_completions_quiz_score_range
  check (quiz_score is null or (quiz_score >= 0 and quiz_score <= 100));
