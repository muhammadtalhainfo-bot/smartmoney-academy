alter table public.blog_posts
  add column if not exists meta_title text,
  add column if not exists meta_desc text;
