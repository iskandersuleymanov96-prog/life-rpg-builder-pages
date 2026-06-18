# Live RPG

Dark premium MVP for a personal life-RPG system. Create a hero, customize the world, complete quests, track habits, earn coins, and evolve your character.

## Features

- **Hero Profile** — Name, codename, archetype, mission, motto, evolution stages
- **Main Character Scene** — Animated full-body RPG character, user logo, and custom background upload
- **XP & Leveling** — Progress through levels with exponential XP curves
- **Quest System** — Daily, Weekly, Main, Side, and Boss (Trial) quests
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
- **Appearance Studio** — Background presets, custom images, dim control
- **Import/Export** — JSON backup and restore
- **Responsive** — Works on desktop, tablet, and mobile
- **Version** — `2.2.0`

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
- localStorage persistence
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
- Templates, seasons, and weekly reviews

## License

Private repository.
