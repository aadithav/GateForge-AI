create extension if not exists "uuid-ossp";

create type task_status as enum ('pending', 'completed', 'missed');
create type difficulty_level as enum ('Easy', 'Medium', 'Hard');
create type study_mode as enum ('learn', 'practice', 'revision', 'mock', 'placement');
create type revision_stage as enum ('first', 'second', 'third');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  college text,
  target_exam text not null default 'GATE CS 2027',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.subjects (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  name text not null,
  track text not null check (track in ('gate', 'placement')),
  weightage text,
  sort_order int not null default 0
);

create table public.topics (
  id uuid primary key default uuid_generate_v4(),
  subject_id uuid not null references public.subjects(id) on delete cascade,
  slug text not null,
  name text not null,
  subtopics jsonb not null default '[]'::jsonb,
  notes text not null default '',
  formulas jsonb not null default '[]'::jsonb,
  pyqs jsonb not null default '[]'::jsonb,
  resources jsonb not null default '[]'::jsonb,
  weightage text,
  difficulty difficulty_level not null default 'Medium',
  estimated_hours int not null default 0,
  unique(subject_id, slug)
);

create table public.topic_progress (
  user_id uuid not null references public.profiles(id) on delete cascade,
  topic_id uuid not null references public.topics(id) on delete cascade,
  progress int not null default 0 check (progress between 0 and 100),
  completed_at timestamptz,
  last_revised_at timestamptz,
  revision_count int not null default 0,
  first_revision_at timestamptz,
  second_revision_at timestamptz,
  third_revision_at timestamptz,
  primary key (user_id, topic_id)
);

create table public.study_tasks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  topic_id uuid references public.topics(id) on delete set null,
  title text not null,
  task_date date not null,
  mode study_mode not null default 'learn',
  revision_stage revision_stage,
  minutes int not null check (minutes > 0),
  priority text not null check (priority in ('Low', 'Medium', 'High')),
  status task_status not null default 'pending',
  generated_reason text,
  rescheduled_from uuid references public.study_tasks(id) on delete set null,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.revision_queue (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  topic_id uuid not null references public.topics(id) on delete cascade,
  stage revision_stage not null,
  due_date date not null,
  spacing_days int not null,
  status task_status not null default 'pending',
  created_at timestamptz not null default now(),
  unique(user_id, topic_id, stage)
);

create table public.weekly_goals (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  week_start date not null,
  target_value int not null,
  current_value int not null default 0,
  created_at timestamptz not null default now()
);

create table public.placement_daily_sets (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  set_date date not null,
  easy_target int not null default 2,
  medium_target int not null default 2,
  hard_target int not null default 1,
  solved_count int not null default 0,
  accuracy numeric(5,2) not null default 0,
  streak_day int not null default 0,
  unique(user_id, set_date)
);

create table public.dsa_problem_assignments (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  set_id uuid references public.placement_daily_sets(id) on delete cascade,
  problem_name text not null,
  problem_link text not null,
  difficulty difficulty_level not null,
  topic text not null,
  status text not null default 'unsolved' check (status in ('unsolved', 'solved', 'skipped')),
  generated_reason text not null default '',
  solved_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.placement_topic_performance (
  user_id uuid not null references public.profiles(id) on delete cascade,
  topic text not null,
  solved_count int not null default 0,
  attempted_count int not null default 0,
  accuracy numeric(5,2) not null default 0,
  progress int not null default 0 check (progress between 0 and 100),
  updated_at timestamptz not null default now(),
  primary key (user_id, topic)
);

create table public.placement_activity (
  user_id uuid not null references public.profiles(id) on delete cascade,
  activity_date date not null,
  solved_count int not null default 0,
  accuracy numeric(5,2) not null default 0,
  primary key (user_id, activity_date)
);

create table public.mock_tests (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  track text not null check (track in ('gate', 'placement')),
  score numeric(6,2) not null,
  max_score numeric(6,2) not null,
  attempted_at timestamptz not null default now(),
  analysis jsonb not null default '{}'::jsonb
);

create table public.mentor_recommendations (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  topic_id uuid references public.topics(id) on delete set null,
  recommendation_type text not null,
  subject_name text,
  topic_name text,
  revision_schedule jsonb not null default '{}'::jsonb,
  dsa_recommendations jsonb not null default '[]'::jsonb,
  project_recommendation jsonb not null default '{}'::jsonb,
  github_plan jsonb not null default '{}'::jsonb,
  resume_bullets jsonb not null default '[]'::jsonb,
  linkedin_post text,
  next_topic text,
  recovery_plan jsonb not null default '[]'::jsonb,
  analytics jsonb not null default '{}'::jsonb,
  payload jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.topic_progress enable row level security;
alter table public.study_tasks enable row level security;
alter table public.weekly_goals enable row level security;
alter table public.revision_queue enable row level security;
alter table public.placement_daily_sets enable row level security;
alter table public.dsa_problem_assignments enable row level security;
alter table public.placement_topic_performance enable row level security;
alter table public.placement_activity enable row level security;
alter table public.mock_tests enable row level security;
alter table public.mentor_recommendations enable row level security;

create policy "Profiles are self-owned"
  on public.profiles for all
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Users own topic progress"
  on public.topic_progress for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users own study tasks"
  on public.study_tasks for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users own weekly goals"
  on public.weekly_goals for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users own revision queue"
  on public.revision_queue for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users own placement sets"
  on public.placement_daily_sets for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users own DSA problem assignments"
  on public.dsa_problem_assignments for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users own placement topic performance"
  on public.placement_topic_performance for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users own placement activity"
  on public.placement_activity for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users own mock tests"
  on public.mock_tests for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users own mentor recommendations"
  on public.mentor_recommendations for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Subjects are readable"
  on public.subjects for select
  using (true);

create policy "Topics are readable"
  on public.topics for select
  using (true);
