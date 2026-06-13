# Life RPG Builder

Life RPG Builder is a dark-mode MVP for a customizable personal RPG system: hero profile, life spheres, character stats, quests, boss fights, achievements, transformations, coin rewards, import/export, and weekly review.

This repository is intentionally static for the first MVP pass. It runs without a package manager, so it can be opened locally, pushed to GitHub, and deployed to Vercel as a static app immediately.

## What is included

- Version `0.3.0`
- First-run hero creation wizard
- Empty-world start instead of forced demo state
- Generated premium hero visuals with selectable character identity
- Selectable visual themes
- Archetype selection
- Custom life spheres and stats
- Interactive dashboard
- Hero profile and global level progress
- Quest log with daily, weekly, side, main, and boss quests
- Daily quest replay by date instead of permanently locking repeatable habits
- Daily XP cap to prevent progression inflation
- Dedicated Boss Fights screen with template import and one-time reward groups
- Dedicated Achievements screen with unlock logic
- Progress journal for completions, boss wins, reward redemptions, imports, exports, and transformations
- JSON import/export backup
- Quest completion loop with XP, coins, domain XP, stat XP, level-ups, and local activity history
- Life spheres map
- Character stats
- Transformation path
- Builder for custom quests, life spheres, stats, and rewards
- Reward shop with coin redemption
- Weekly review summary
- Local persistence through `localStorage`
- Supabase-ready PostgreSQL schema with RLS in `supabase/migrations/001_initial_schema.sql`

## Local run

No install is required.

```bash
python3 -m http.server 4173
```

Open:

```text
http://localhost:4173
```

## Deployment

The app is static and can be deployed by Vercel from the repository root.

Recommended production settings:

- Framework Preset: Other
- Build Command: empty
- Output Directory: `.`

GitHub Pages is also supported because the app is static.

## Supabase setup

Create a Supabase project and run:

```bash
supabase db push
```

or paste `supabase/migrations/001_initial_schema.sql` into the Supabase SQL editor.

The schema is designed around:

- `auth.users` ownership
- Row Level Security
- event ledgers for XP and coins
- custom domains, stats, quests, challenges, rewards, achievements, archetypes, templates, seasons, and weekly reviews

## Next engineering step

Replace localStorage with Supabase client calls behind a small progression service:

```ts
completeQuest(userId, questId): ProgressionResult
```

That service should be the core deep module. It should atomically create quest completions, XP events, coin events, level changes, achievement unlocks, and review inputs.
