-- DSA Tutor optional cloud sync
-- Run this in a Supabase project's SQL editor.

create table if not exists public.dsa_tutor_user_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  snapshot jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.dsa_tutor_user_state enable row level security;

drop policy if exists "Users can read own DSA Tutor state" on public.dsa_tutor_user_state;
create policy "Users can read own DSA Tutor state"
on public.dsa_tutor_user_state
for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert own DSA Tutor state" on public.dsa_tutor_user_state;
create policy "Users can insert own DSA Tutor state"
on public.dsa_tutor_user_state
for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update own DSA Tutor state" on public.dsa_tutor_user_state;
create policy "Users can update own DSA Tutor state"
on public.dsa_tutor_user_state
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
