# Live RPG

Dark premium MVP for a personal life-RPG system. Create a hero, customize the world, complete quests, track habits, earn coins, and evolve your character.

## Features

- **Hero Profile** — Name, codename, archetype, mission, motto, evolution stages
- **Main Character Scene** — Animated RPG scene, user logo, custom world background upload, and custom character upload
- **Custom Branding** — Rename the app label, tagline, and sidebar icon from Settings
- **XP & Leveling** — Progress through levels with exponential XP curves
- **Quest System** — Daily, Weekly, Main, Side, and Boss (Trial) quests with autosaved new-quest draft
- **Habit Tracker** — Daily/weekly habits with streak tracking and weekly scores
- **Achievements** — 18 badges with rarity tiers (common → legendary)
- **Skill Trees** — Unlock skills in Body, Mind, Finance, Creativity, Discipline
- **Stats & Spheres** — Track life domains and character attributes
- **Streak System** — Daily check-ins with XP multiplier bonuses
- **Prestige** — Reset at level 30 for permanent XP bonus
- **Loot Drops** — Random rewards on quest completion
- **Comeback Bonus** — Rewards for returning after absences
- **Theme System** — 5 color themes (Frost, Gold, Crimson, Violet, Steel)
- **Dark/Light Mode** — Toggle between themes
- **Appearance Studio** — Background presets, custom images up to 50 MB, character images up to 50 MB, dim control
- **Community Layer** — Public profile preview, editable guilds, editable raids, simple sharing, and Telegram sending through a server endpoint
- **Import/Export** — JSON backup and restore
- **Responsive** — Works on desktop, tablet, and mobile
- **Version** — `2.8.0`

## Local Run

No install required.

```bash
python3 -m http.server 4173
```

Open http://localhost:4173

## Deployment

Static app. Deploy to Vercel from repository root:

- Framework Preset: Other
- Build Command: (empty)
- Output Directory: `.`

## Tech Stack

- Vanilla JavaScript (ES modules)
- CSS custom properties + responsive grid
- localStorage persistence for state
- IndexedDB asset storage for larger character/background images
- Web Audio API for sound effects
- Canvas particle system for celebrations

## Architecture

```
├── index.html          Entry point
├── app.js              Application logic (~700 lines)
├── styles.css          Production styles (~900 lines)
├── assets/             Background images
├── supabase/           Database schema (RLS-ready)
└── vercel.json         Deployment config
```

## Supabase Schema

Optional backend schema in `supabase/migrations/001_initial_schema.sql`:

- Row Level Security on all tables
- Event-ledger accounting for XP and coins
- Custom domains, stats, quests, challenges, rewards, achievements
- Public profiles, guilds, raid participants, community invites, Telegram settings, Telegram events
- Telegram token must live only in backend/serverless env as `TELEGRAM_BOT_TOKEN`; never commit it to the static client
- Templates, seasons, and weekly reviews

## Telegram

The static app can open Telegram and prepare messages. Real bot sending works on Vercel through serverless endpoints:

- Endpoint: `/api/telegram/send`
- Bot webhook: `/api/telegram/webhook`
- Webhook setup: `/api/telegram/setup-webhook`
- Daily reminder cron: `/api/telegram/remind`
- Env vars: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `APP_BASE_URL`
- Optional env vars: `TELEGRAM_WEBHOOK_SECRET`, `LIFE_RPG_WEBHOOK_KEY`

## License

Private repository.
