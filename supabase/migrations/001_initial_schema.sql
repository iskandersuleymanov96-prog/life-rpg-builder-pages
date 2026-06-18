-- Life RPG Builder MVP schema for Supabase Postgres.
-- Designed for user-owned data, RLS-first access, event-led XP/coin accounting,
-- and future SaaS expansion into AI, guilds, template packs, and subscriptions.

create extension if not exists "pgcrypto";

create type public.plan_type as enum ('free', 'premium', 'pro', 'guild');
create type public.quest_type as enum ('daily', 'weekly', 'monthly', 'main', 'side', 'boss', 'epic');
create type public.quest_status as enum ('draft', 'active', 'completed', 'failed', 'archived');
create type public.difficulty_type as enum ('easy', 'normal', 'hard', 'boss', 'epic');
create type public.challenge_status as enum ('draft', 'active', 'completed', 'failed', 'archived');
create type public.source_type as enum ('quest', 'challenge', 'achievement', 'reward', 'manual', 'system');

create table public.app_users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  plan public.plan_type not null default 'free',
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.archetypes (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  description text,
  visual_theme jsonb not null default '{}'::jsonb,
  recommended_config jsonb not null default '{}'::jsonb,
  is_system boolean not null default false,
  created_at timestamptz not null default now(),
  constraint archetypes_owner_required_for_custom check (is_system or owner_user_id is not null)
);

create table public.seasons (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  start_date date not null,
  end_date date,
  theme text,
  main_goal text,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table public.hero_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  hero_name text not null,
  avatar_url text,
  archetype_id uuid references public.archetypes(id) on delete set null,
  level integer not null default 1 check (level > 0),
  xp_total integer not null default 0 check (xp_total >= 0),
  coins_balance integer not null default 0 check (coins_balance >= 0),
  current_season_id uuid references public.seasons(id) on delete set null,
  main_mission text,
  motto text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.domains (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  description text,
  icon text,
  color text not null default '#49f2a7',
  level integer not null default 1 check (level > 0),
  xp_total integer not null default 0 check (xp_total >= 0),
  sort_order integer not null default 0,
  is_default boolean not null default false,
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, name)
);

create table public.stats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  description text,
  icon text,
  color text not null default '#55d6ff',
  level integer not null default 1 check (level > 0),
  xp_total integer not null default 0 check (xp_total >= 0),
  sort_order integer not null default 0,
  is_default boolean not null default false,
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, name)
);

create table public.quests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  domain_id uuid references public.domains(id) on delete set null,
  title text not null,
  description text,
  quest_type public.quest_type not null,
  difficulty public.difficulty_type not null default 'normal',
  xp_reward integer not null default 10 check (xp_reward >= 0),
  coin_reward integer not null default 0 check (coin_reward >= 0),
  deadline timestamptz,
  recurrence_rule text,
  status public.quest_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz
);

create table public.quest_stat_rewards (
  id uuid primary key default gen_random_uuid(),
  quest_id uuid not null references public.quests(id) on delete cascade,
  stat_id uuid not null references public.stats(id) on delete cascade,
  xp_amount integer not null default 0 check (xp_amount >= 0),
  unique (quest_id, stat_id)
);

create table public.quest_completions (
  id uuid primary key default gen_random_uuid(),
  quest_id uuid not null references public.quests(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  completed_at timestamptz not null default now(),
  xp_awarded integer not null default 0 check (xp_awarded >= 0),
  coins_awarded integer not null default 0 check (coins_awarded >= 0),
  reflection_text text,
  completion_source text not null default 'manual'
);

create table public.xp_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  source_type public.source_type not null,
  source_id uuid,
  domain_id uuid references public.domains(id) on delete set null,
  stat_id uuid references public.stats(id) on delete set null,
  xp_amount integer not null check (xp_amount <> 0),
  created_at timestamptz not null default now()
);

create table public.coin_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  source_type public.source_type not null,
  source_id uuid,
  amount integer not null check (amount <> 0),
  balance_after integer not null check (balance_after >= 0),
  created_at timestamptz not null default now()
);

create table public.challenges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  challenge_type text not null,
  start_date date,
  end_date date,
  duration_days integer not null check (duration_days > 0),
  status public.challenge_status not null default 'draft',
  reward_xp integer not null default 0 check (reward_xp >= 0),
  reward_coins integer not null default 0 check (reward_coins >= 0),
  completion_rule jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.challenge_quests (
  id uuid primary key default gen_random_uuid(),
  challenge_id uuid not null references public.challenges(id) on delete cascade,
  quest_id uuid not null references public.quests(id) on delete cascade,
  unique (challenge_id, quest_id)
);

create table public.achievements (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  description text,
  category text not null,
  badge_icon text,
  rarity text not null default 'common',
  trigger_type text not null,
  trigger_config jsonb not null default '{}'::jsonb,
  is_hidden boolean not null default false,
  is_system boolean not null default false,
  created_at timestamptz not null default now(),
  constraint achievements_owner_required_for_custom check (is_system or owner_user_id is not null)
);

create table public.user_achievements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  achievement_id uuid not null references public.achievements(id) on delete cascade,
  unlocked_at timestamptz not null default now(),
  source_type public.source_type,
  source_id uuid,
  unique (user_id, achievement_id)
);

create table public.rewards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  coin_cost integer not null check (coin_cost > 0),
  category text,
  icon text,
  image_url text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.reward_redemptions (
  id uuid primary key default gen_random_uuid(),
  reward_id uuid not null references public.rewards(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  coin_cost integer not null check (coin_cost > 0),
  redeemed_at timestamptz not null default now(),
  notes text
);

create table public.templates (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  name text not null,
  description text,
  target_archetype text,
  config jsonb not null default '{}'::jsonb,
  is_premium boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.weekly_reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  week_start date not null,
  week_end date not null,
  xp_gained integer not null default 0,
  quests_completed integer not null default 0,
  quests_failed integer not null default 0,
  strongest_domain_id uuid references public.domains(id) on delete set null,
  weakest_domain_id uuid references public.domains(id) on delete set null,
  summary_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (user_id, week_start)
);

create index domains_user_active_idx on public.domains(user_id, sort_order) where archived_at is null;
create index stats_user_active_idx on public.stats(user_id, sort_order) where archived_at is null;
create index quests_user_status_deadline_idx on public.quests(user_id, status, deadline);
create index quests_user_type_idx on public.quests(user_id, quest_type);
create index quest_completions_user_completed_at_idx on public.quest_completions(user_id, completed_at desc);
create index xp_events_user_created_idx on public.xp_events(user_id, created_at desc);
create index coin_events_user_created_idx on public.coin_events(user_id, created_at desc);
create index challenges_user_status_idx on public.challenges(user_id, status);
create index rewards_user_active_idx on public.rewards(user_id) where active = true;
create index weekly_reviews_user_week_idx on public.weekly_reviews(user_id, week_start desc);

alter table public.app_users enable row level security;
alter table public.archetypes enable row level security;
alter table public.seasons enable row level security;
alter table public.hero_profiles enable row level security;
alter table public.domains enable row level security;
alter table public.stats enable row level security;
alter table public.quests enable row level security;
alter table public.quest_stat_rewards enable row level security;
alter table public.quest_completions enable row level security;
alter table public.xp_events enable row level security;
alter table public.coin_events enable row level security;
alter table public.challenges enable row level security;
alter table public.challenge_quests enable row level security;
alter table public.achievements enable row level security;
alter table public.user_achievements enable row level security;
alter table public.rewards enable row level security;
alter table public.reward_redemptions enable row level security;
alter table public.templates enable row level security;
alter table public.weekly_reviews enable row level security;

create policy "Users manage own app user"
  on public.app_users for all
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Users read system or own archetypes"
  on public.archetypes for select
  using (is_system or auth.uid() = owner_user_id);

create policy "Users manage own archetypes"
  on public.archetypes for all
  using (auth.uid() = owner_user_id)
  with check (auth.uid() = owner_user_id);

create policy "Users read system or own achievements"
  on public.achievements for select
  using (is_system or auth.uid() = owner_user_id);

create policy "Users manage own achievements"
  on public.achievements for all
  using (auth.uid() = owner_user_id)
  with check (auth.uid() = owner_user_id);

create policy "Anyone authenticated can read templates"
  on public.templates for select
  to authenticated
  using (true);

create policy "Users manage own seasons"
  on public.seasons for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users manage own hero profiles"
  on public.hero_profiles for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users manage own domains"
  on public.domains for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users manage own stats"
  on public.stats for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users manage own quests"
  on public.quests for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users manage stat rewards through owned quests"
  on public.quest_stat_rewards for all
  using (
    exists (
      select 1 from public.quests
      where quests.id = quest_stat_rewards.quest_id
        and quests.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.quests
      where quests.id = quest_stat_rewards.quest_id
        and quests.user_id = auth.uid()
    )
  );

create policy "Users manage own quest completions"
  on public.quest_completions for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users manage own xp events"
  on public.xp_events for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users manage own coin events"
  on public.coin_events for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users manage own challenges"
  on public.challenges for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users manage challenge quests through owned challenges"
  on public.challenge_quests for all
  using (
    exists (
      select 1 from public.challenges
      where challenges.id = challenge_quests.challenge_id
        and challenges.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.challenges
      where challenges.id = challenge_quests.challenge_id
        and challenges.user_id = auth.uid()
    )
  );

create policy "Users manage own unlocked achievements"
  on public.user_achievements for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users manage own rewards"
  on public.rewards for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users manage own reward redemptions"
  on public.reward_redemptions for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users manage own weekly reviews"
  on public.weekly_reviews for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Social launch layer.
create table public.public_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  slug text not null unique,
  display_name text not null,
  headline text,
  avatar_url text,
  public_enabled boolean not null default true,
  stats_snapshot jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table public.guilds (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid references auth.users(id) on delete set null,
  name text not null,
  focus text,
  motto text,
  visibility text not null default 'public',
  member_count integer not null default 0 check (member_count >= 0),
  created_at timestamptz not null default now()
);

create table public.guild_members (
  guild_id uuid not null references public.guilds(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member',
  joined_at timestamptz not null default now(),
  primary key (guild_id, user_id)
);

create table public.raids (
  id uuid primary key default gen_random_uuid(),
  guild_id uuid references public.guilds(id) on delete set null,
  title text not null,
  description text,
  duration_days integer not null check (duration_days > 0),
  reward_xp integer not null default 0 check (reward_xp >= 0),
  reward_coins integer not null default 0 check (reward_coins >= 0),
  status text not null default 'open',
  starts_on date,
  ends_on date,
  created_at timestamptz not null default now()
);

create table public.raid_participants (
  raid_id uuid not null references public.raids(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  progress_days integer not null default 0 check (progress_days >= 0),
  joined_at timestamptz not null default now(),
  last_checkin_at timestamptz,
  primary key (raid_id, user_id)
);

create table public.telegram_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  telegram_handle text,
  chat_id text,
  reminders_enabled boolean not null default false,
  daily_report_time text not null default '21:00',
  updated_at timestamptz not null default now()
);

alter table public.public_profiles enable row level security;
alter table public.guilds enable row level security;
alter table public.guild_members enable row level security;
alter table public.raids enable row level security;
alter table public.raid_participants enable row level security;
alter table public.telegram_settings enable row level security;

create policy "Public profiles are readable when enabled"
  on public.public_profiles for select
  using (public_enabled);

create policy "Users manage own public profile"
  on public.public_profiles for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Public guilds are readable"
  on public.guilds for select
  using (visibility = 'public');

create policy "Guild owners manage guilds"
  on public.guilds for all
  using (auth.uid() = owner_user_id)
  with check (auth.uid() = owner_user_id);

create policy "Users manage own guild membership"
  on public.guild_members for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Open raids are readable"
  on public.raids for select
  using (status in ('open', 'active', 'completed'));

create policy "Users manage own raid participation"
  on public.raid_participants for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users manage own Telegram settings"
  on public.telegram_settings for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
