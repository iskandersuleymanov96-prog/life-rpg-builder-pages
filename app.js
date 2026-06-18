// RPG Life v2.2 — Production Build
const VERSION = "2.2.0";
const APP_NAME = "Live RPG";
const STORAGE_KEY = "rpg-life-state-v3";
const DAILY_XP_CAP = 300;
const STREAK_MULT_CAP = 3.0;

// ─── Icons ────────────────────────────────────────────────────────────
const I = {
  dash: `<svg viewBox="0 0 24 24"><path d="M4 13h6V4H4v9Zm10 7h6V4h-6v16ZM4 20h6v-4H4v4Z"/></svg>`,
  hero: `<svg viewBox="0 0 24 24"><path d="M12 3l7 4v5c0 4.7-2.7 7.7-7 9-4.3-1.3-7-4.3-7-9V7l7-4Z"/><path d="M9 12l2 2 4-5"/></svg>`,
  quest: `<svg viewBox="0 0 24 24"><path d="M7 4h10l2 3v13H5V7l2-3Z"/><path d="M8 9h8M8 13h8M8 17h5"/></svg>`,
  habit: `<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z"/><path d="M12 6v6l4 2"/></svg>`,
  badge: `<svg viewBox="0 0 24 24"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z"/><path d="M7 6H4v2a4 4 0 0 0 4 4M17 6h3v2a4 4 0 0 1-4 4"/></svg>`,
  stat: `<svg viewBox="0 0 24 24"><path d="M5 19V9M12 19V5M19 19v-7M3 19h18"/></svg>`,
  tree: `<svg viewBox="0 0 24 24"><path d="M12 3l3 6 6 3-6 3-3 6-3-6-6-3 6-3 3-6Z"/><path d="M19 4v4M21 6h-4"/></svg>`,
  boss: `<svg viewBox="0 0 24 24"><path d="M12 3 4 7v6c0 4.5 3.2 7.3 8 8 4.8-.7 8-3.5 8-8V7l-8-4Z"/><path d="M9 10h.01M15 10h.01M9 15c2 1.4 4 1.4 6 0"/></svg>`,
  log: `<svg viewBox="0 0 24 24"><path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>`,
  setting: `<svg viewBox="0 0 24 24"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2 3.5-.2-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.4h-4v-.4a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.2.1-2-3.5.1-.1A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.5-1H3v-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9L4.2 7l2-3.5.2.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V2h4v.4a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.2-.1 2 3.5-.1.1A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 1.5 1h.1v4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></svg>`,
  plus: `<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>`,
  check: `<svg viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"/></svg>`,
  x: `<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>`,
  sun: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`,
  moon: `<svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/></svg>`,
  sound: `<svg viewBox="0 0 24 24"><path d="M11 5L6 9H2v6h4l5 4V5Z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`,
  mute: `<svg viewBox="0 0 24 24"><path d="M11 5L6 9H2v6h4l5 4V5Z"/><path d="M23 9l-6 6M17 9l6 6"/></svg>`,
};

// ─── Data ─────────────────────────────────────────────────────────────
const THEMES = {
  ice:     { label: "Frost",    accent: "#72b7ff", accent2: "#d7ecff", aura: "rgba(114,183,255,0.16)" },
  gold:    { label: "Gold",     accent: "#f2c35d", accent2: "#fff1b8", aura: "rgba(242,195,93,0.14)" },
  crimson: { label: "Crimson",  accent: "#ff6b6f", accent2: "#ffd1d3", aura: "rgba(255,107,111,0.14)" },
  violet:  { label: "Violet",   accent: "#a98bff", accent2: "#e4d9ff", aura: "rgba(169,139,255,0.14)" },
  steel:   { label: "Steel",    accent: "#aeb8c4", accent2: "#f4f7fb", aura: "rgba(174,184,196,0.12)" },
};

const ARCHETYPES = [
  { id: "founder",  label: "Founder",  desc: "Money, focus, system, leadership" },
  { id: "creator",  label: "Creator",  desc: "Content, craft, audience, style" },
  { id: "warrior",  label: "Warrior",  desc: "Body, discipline, energy, will" },
  { id: "scholar",  label: "Scholar",  desc: "Knowledge, depth, clarity, practice" },
  { id: "artist",   label: "Artist",   desc: "Taste, creativity, expression, stage" },
  { id: "custom",   label: "Custom",   desc: "Fully custom progression" },
];

const HERO_POSITIONS = {
  founder: "7% 50%",
  creator: "30% 50%",
  warrior: "51% 50%",
  scholar: "72% 50%",
  artist: "30% 50%",
  custom: "94% 50%",
};

const SPHERE_PRESETS = ["Тело","Разум","Деньги","Карьера","Творчество","Отношения","Стиль жизни","Дисциплина"];
const STAT_PRESETS   = ["Сила","Фокус","Дисциплина","Креативность","Харизма","Мудрость","Капитал","Мастерство"];

const BOSS_TEMPLATES = [
  { id:"boss-public-launch",   title:"Публичный запуск", sphere:"Карьера", risk:"Публичная оценка", reward:"Новая видимость", xp:900, coins:260, steps:["Опубликовать артефакт","Собрать реакцию","Сделать вывод"] },
  { id:"boss-first-client",    title:"Первый платный клиент", sphere:"Деньги", risk:"Отказ и цена", reward:"Деньги начали двигаться", xp:1400, coins:420, steps:["Сформулировать оффер","Сделать 5 касаний","Закрыть оплату"] },
  { id:"boss-identity-repack", title:"Пересборка идентичности", sphere:"Творчество", risk:"Старая идентичность рушится", reward:"Новый визуальный авторитет", xp:1100, coins:320, steps:["Обновить профиль","Собрать кейс","Опубликовать позиционирование"] },
  { id:"boss-new-circle", title:"Новый круг", sphere:"Отношения", risk:"Войти в комнату выше уровнем", reward:"Социальный капитал", xp:850, coins:240, steps:["Найти событие","Пойти вживую","Закрепить контакт"] },
  { id:"boss-revenue-1k", title:"Месяц на $1000", sphere:"Деньги", risk:"Новый стандарт дохода", reward:"Идентичность дохода", xp:2500, coins:700, steps:["План продаж","Еженедельные касания","Получить оплату"] },
];

const ACHIEVEMENTS = [
  { id:"first-quest",   title:"Первые шаги",         cat:"Старт",      rarity:"common",    cond:"Заверши любой квест.",          test: s => s.progressLog.some(e => e.type === "quest") },
  { id:"first-boss",    title:"Победитель испытаний", cat:"Испытания", rarity:"rare",      cond:"Пройди любое испытание.",       test: s => s.progressLog.some(e => e.type === "boss") },
  { id:"backup-master", title:"Хранитель сохранения", cat:"Система",   rarity:"common",    cond:"Экспортируй прогресс.",         test: s => s.progressLog.some(e => e.type === "export") },
  { id:"money-moving",  title:"Money Is Moving",     cat:"Finance",    rarity:"rare",      cond:"Earn 500 coins.",              test: s => s.hero.coins >= 500 },
  { id:"creator-mode",  title:"Creative Director",   cat:"Creativity", rarity:"epic",       cond:"Earn 500 XP in creativity.",   test: s => ((byName(s.spheres,"Creativity")?.xp||0) + (byName(s.spheres,"Творчество")?.xp||0)) >= 500 },
  { id:"apprentice",    title:"Apprentice",          cat:"Hero",       rarity:"rare",      cond:"Reach level 5.",               test: s => s.hero.level >= 5 },
  { id:"warrior-form",  title:"Warrior",             cat:"Hero",       rarity:"epic",       cond:"Reach level 10.",              test: s => s.hero.level >= 10 },
  { id:"streak-3",      title:"Fire Is Burning",     cat:"Discipline", rarity:"uncommon",  cond:"3 day streak.",                test: s => (s.streak?.current||0) >= 3 },
  { id:"streak-7",      title:"Week Warrior",        cat:"Discipline", rarity:"rare",      cond:"7 day streak.",                test: s => (s.streak?.current||0) >= 7 },
  { id:"streak-30",     title:"Iron Will",           cat:"Discipline", rarity:"epic",       cond:"30 day streak.",               test: s => (s.streak?.current||0) >= 30 },
  { id:"streak-100",    title:"Streak Legend",        cat:"Discipline", rarity:"legendary", cond:"100 day streak.",              test: s => (s.streak?.current||0) >= 100 },
  { id:"level-15",      title:"Master",              cat:"Hero",       rarity:"epic",       cond:"Reach level 15.",              test: s => s.hero.level >= 15 },
  { id:"level-25",      title:"Titan",               cat:"Hero",       rarity:"legendary", cond:"Reach level 25.",              test: s => s.hero.level >= 25 },
  { id:"coins-1000",    title:"Thousand Club",       cat:"Finance",    rarity:"epic",       cond:"Earn 1000 coins.",             test: s => s.hero.coins >= 1000 },
  { id:"prestige-1",    title:"Rebirth",             cat:"Hero",       rarity:"legendary", cond:"Prestige once.",               test: s => (s.prestige?.level||0) >= 1 },
  { id:"habit-master",  title:"Habit Master",        cat:"Discipline", rarity:"rare",      cond:"5 habits in one day.",         test: s => (s.habits||[]).filter(h => h.completedDates?.includes(dateKey())).length >= 5 },
  { id:"quest-50",      title:"Полсотни",            cat:"Старт",      rarity:"rare",      cond:"Заверши 50 квестов.",          test: s => s.completions.length >= 50 },
  { id:"all-spheres-5", title:"Balance",             cat:"Hero",       rarity:"epic",       cond:"All spheres level 5+.",        test: s => s.spheres.length >= 3 && s.spheres.every(sp => sp.level >= 5) },
];

const DAILY_TEMPLATES = [
  { title:"Утренний ритуал",       desc:"Выполни короткий утренний протокол.", sphere:"Дисциплина", xp:25, coins:10, stats:["Дисциплина"] },
  { title:"30 минут фокуса",       desc:"Deep work без отвлечений.",           sphere:"Разум", xp:45, coins:15, stats:["Фокус"] },
  { title:"Физическая активность", desc:"Тренировка, прогулка или растяжка.",  sphere:"Тело", xp:50, coins:18, stats:["Сила","Дисциплина"] },
  { title:"20 минут чтения",       desc:"Прочитай книгу или послушай аудио.",  sphere:"Разум", xp:30, coins:10, stats:["Мудрость"] },
  { title:"Журнал дня",            desc:"Запиши 3 победы и план на завтра.",   sphere:"Дисциплина", xp:20, coins:8, stats:["Фокус","Мудрость"] },
  { title:"Связаться с человеком", desc:"Напиши или позвони важному человеку.", sphere:"Отношения", xp:25, coins:10, stats:["Харизма"] },
  { title:"Творческая практика",   desc:"30 минут практики ремесла.",         sphere:"Творчество", xp:40, coins:15, stats:["Креативность"] },
  { title:"Финансовый обзор",      desc:"Проверь расходы и бюджет.",          sphere:"Деньги", xp:20, coins:12, stats:["Капитал"] },
  { title:"Медитация",             desc:"10 минут дыхания и внимания.",       sphere:"Разум", xp:15, coins:8, stats:["Мудрость","Фокус"] },
  { title:"Холодный душ",          desc:"Заверши душ 30 секундами холода.",   sphere:"Тело", xp:35, coins:12, stats:["Сила","Дисциплина"] },
];

const WEEKLY_TEMPLATES = [
  { title:"7 дней стабильности", desc:"Следуй главной привычке каждый день.", sphere:"Дисциплина", xp:150, coins:60 },
  { title:"Опубликовать контент", desc:"Создай и опубликуй один материал.", sphere:"Творчество", xp:120, coins:50 },
  { title:"5 тренировок", desc:"Потренируйся минимум 5 раз.", sphere:"Тело", xp:160, coins:55 },
  { title:"Новый контакт", desc:"Познакомься или восстанови контакт.", sphere:"Отношения", xp:100, coins:40 },
];

const SKILL_TREE = {
  Body:       [{ id:"b1", name:"Endurance", icon:"\uD83C\uDFC3", req:null },{ id:"b2", name:"Strength", icon:"\uD83D\uDCAA", req:"b1" },{ id:"b3", name:"Athleticism", icon:"\u26BD", req:"b2" },{ id:"b4", name:"Body Master", icon:"\uD83D\uDC51", req:"b3" }],
  Mind:       [{ id:"m1", name:"Focus", icon:"\uD83E\uDDE0", req:null },{ id:"m2", name:"Depth", icon:"\uD83D\uDD2E", req:"m1" },{ id:"m3", name:"Clarity", icon:"\uD83D\uDCA1", req:"m2" },{ id:"m4", name:"Sage", icon:"\uD83C\uDF1F", req:"m3" }],
  Finance:    [{ id:"f1", name:"Budget", icon:"\uD83D\uDCB0", req:null },{ id:"f2", name:"Investments", icon:"\uD83D\uDCC8", req:"f1" },{ id:"f3", name:"Flow", icon:"\uD83D\uDE80", req:"f2" },{ id:"f4", name:"Mogul", icon:"\uD83D\uDCB4", req:"f3" }],
  Creativity: [{ id:"c1", name:"Practice", icon:"\uD83C\uDFA8", req:null },{ id:"c2", name:"Style", icon:"\uD83C\uDFAD", req:"c1" },{ id:"c3", name:"Authority", icon:"\uD83C\uDFC6", req:"c2" },{ id:"c4", name:"Genius", icon:"\u2728", req:"c3" }],
  Discipline: [{ id:"d1", name:"Routine", icon:"\u23F0", req:null },{ id:"d2", name:"Streak", icon:"\uD83D\uDD25", req:"d1" },{ id:"d3", name:"Self-Control", icon:"\uD83D\uDEE1\uFE0F", req:"d2" },{ id:"d4", name:"Unstoppable", icon:"\u2694\uFE0F", req:"d3" }],
};

const LOOT_TABLE = [
  { id:"gold-pouch",  name:"Gold Pouch",       icon:"\uD83E\uDE99", rarity:"common",    coins:10,  xp:0 },
  { id:"scroll",      name:"Scroll of Wisdom",  icon:"\uD83D\uDCDC", rarity:"common",    coins:0,   xp:25 },
  { id:"gem",         name:"Precious Gem",      icon:"\uD83D\uDC8E", rarity:"uncommon",  coins:30,  xp:15 },
  { id:"blade-polish",name:"Blade Polish",      icon:"\u2694\uFE0F", rarity:"uncommon",  coins:0,   xp:50 },
  { id:"elixir",      name:"Strength Elixir",   icon:"\uD83E\uDDEA", rarity:"rare",      coins:50,  xp:50 },
  { id:"chest",       name:"Treasure Chest",    icon:"\uD83E\uDDF0", rarity:"rare",      coins:100, xp:30 },
  { id:"dragon-egg",  name:"Dragon Egg",        icon:"\uD83E\uDD5A", rarity:"epic",      coins:150, xp:100 },
  { id:"crown",       name:"Champion's Crown",  icon:"\uD83D\uDC51", rarity:"legendary", coins:300, xp:200 },
];

const QUOTES = [
  { text:"Discipline is the bridge between goals and accomplishment.", author:"Jim Rohn" },
  { text:"We are what we repeatedly do. Excellence is not an act, but a habit.", author:"Aristotle" },
  { text:"Every expert was once a beginner.", author:"Helen Hayes" },
  { text:"The only way to do great work is to love what you do.", author:"Steve Jobs" },
  { text:"Start where you are. Use what you have. Do what you can.", author:"Arthur Ashe" },
  { text:"Heroes don't give up; they take a break and come back stronger.", author:"Unknown" },
  { text:"Your next chapter is not defined by your last.", author:"Unknown" },
  { text:"The body achieves what the mind believes.", author:"Napoleon Hill" },
  { text:"Small daily wins lead to big results.", author:"Unknown" },
  { text:"Never compare your chapter 1 to someone else's chapter 20.", author:"Unknown" },
];

const STARTER = {
  founder: { spheres:["Деньги","Карьера","Дисциплина","Разум"], stats:["Фокус","Дисциплина","Капитал","Мастерство"], quests:[ ["Собрать главный оффер","Опиши кому, какой результат и через какой механизм ты продаёшь.","Main","Карьера","Hard",220,90,["Капитал","Мастерство"]], ["90 минут deep work","Один блок без переключения контекста.","Daily","Дисциплина","Normal",55,20,["Фокус"]] ] },
  creator: { spheres:["Творчество","Карьера","Разум","Дисциплина"], stats:["Креативность","Мастерство","Фокус","Харизма"], quests:[ ["Опубликовать артефакт","Пост, видео, заметка, прототип или работа в портфолио.","Weekly","Творчество","Hard",160,60,["Креативность","Мастерство"]], ["30 минут практики ремесла","Улучшить один конкретный навык.","Daily","Творчество","Normal",45,18,["Мастерство"]] ] },
  warrior: { spheres:["Тело","Дисциплина","Разум","Стиль жизни"], stats:["Сила","Дисциплина","Фокус","Мудрость"], quests:[ ["Тренировка тела","Силовой или кондиционный блок.","Daily","Тело","Normal",60,20,["Сила","Дисциплина"]], ["7 дней без срыва","Соблюдать выбранный протокол неделю.","Boss","Дисциплина","Trial",420,150,["Дисциплина"]] ] },
};

const BACKGROUND_PRESETS = {
  worldwalker: { label:"Worldwalker", image:'url("./assets/worldwalker-bg.png")' },
  void:        { label:"Deep Void",   image:"none" },
  atlas:       { label:"Atlas Grid",  image:"radial-gradient(circle at 55% 20%, rgba(114,183,255,0.18), transparent 34%), linear-gradient(135deg, rgba(255,255,255,0.04), transparent 45%)" },
  forge:       { label:"Hero Forge",  image:"radial-gradient(circle at 25% 25%, rgba(242,195,93,0.16), transparent 30%), radial-gradient(circle at 75% 10%, rgba(114,183,255,0.14), transparent 36%)" },
};

const EVOLUTION_STAGES = [
  { name:"Новичок", level:1, desc:"Ты создаёшь основу мира: сферы, первые квесты, привычки и награды.", reward:"Базовый профиль героя" },
  { name:"Подмастерье", level:5, desc:"Появляется ритм: ежедневные квесты, серии, понятная экономика монет.", reward:"Усиленная аура персонажа" },
  { name:"Воин", level:10, desc:"Ты проходишь крупные испытания и превращаешь слабые зоны в систему действий.", reward:"Боевой контур и новые визуальные эффекты" },
  { name:"Мастер", level:20, desc:"Система становится твоей операционной моделью: цели, прогресс, награды и дисциплина связаны.", reward:"Мастерская форма героя" },
  { name:"Легенда", level:35, desc:"Ты играешь долгими сезонами: создаёшь собственные правила и личную мифологию.", reward:"Легендарный статус и престиж" },
];

// ─── State ────────────────────────────────────────────────────────────
const EMPTY = {
  version: VERSION, route: "setup", setupStep: 0, onboardingComplete: false,
  theme: "ice", darkMode: true, soundEnabled: true,
  hero: { name:"", codename:"", archetype:"", level:1, xp:0, coins:0, season:"Season 01: Foundation", mission:"", motto:"", evolution:0, visual:"creator" },
  appearance: { bgPreset:"worldwalker", customBg:"", bgDim:72, density:"compact" },
  streak: { current:0, best:0, lastCheckIn:"", totalCheckIns:0 },
  habits: [], skillTree: { unlocked:[] }, prestige: { level:0, totalXP:0, bonus:0 },
  activeDetail: null,
  spheres: [], stats: [], quests: [], bossFights: [], rewards: [],
  completions: [], progressLog: [], completedDaily: {}, rewardGroups: {},
  lootHistory: [], lastLoginDate: "", dailyQuestDate: "",
};

let S = load();
applyTheme();

// ─── Persistence ──────────────────────────────────────────────────────
function load() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return structuredClone(EMPTY);
  try { return sanitize(JSON.parse(raw)); } catch { return structuredClone(EMPTY); }
}

function save() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(S)); } catch { toast("Не удалось сохранить. Сделай экспорт JSON."); }
}

function sanitize(raw) {
  const b = structuredClone(EMPTY);
  const n = { ...b, ...(raw||{}), version: VERSION };
  if (n.route === "hero") n.route = "main";
  n.hero = { ...b.hero, ...(raw?.hero||{}) };
  n.appearance = { ...b.appearance, ...(raw?.appearance||{}) };
  n.streak = { ...b.streak, ...(raw?.streak||{}) };
  n.prestige = { ...b.prestige, ...(raw?.prestige||{}) };
  n.skillTree = { ...b.skillTree, ...(raw?.skillTree||{}) };
  n.activeDetail = null;
  n.spheres    = Array.isArray(raw?.spheres)    ? raw.spheres    : [];
  n.stats      = Array.isArray(raw?.stats)      ? raw.stats      : [];
  n.quests     = Array.isArray(raw?.quests)     ? raw.quests     : [];
  n.bossFights = Array.isArray(raw?.bossFights) ? raw.bossFights : [];
  n.rewards    = Array.isArray(raw?.rewards)    ? raw.rewards    : [];
  n.completions    = Array.isArray(raw?.completions)    ? raw.completions    : [];
  n.progressLog    = Array.isArray(raw?.progressLog)    ? raw.progressLog    : n.completions.map(c => ({ ...c, type:"quest", timestamp: c.date||new Date().toISOString() }));
  n.completedDaily = raw?.completedDaily && typeof raw.completedDaily === "object" ? raw.completedDaily : {};
  n.rewardGroups   = raw?.rewardGroups   && typeof raw.rewardGroups   === "object" ? raw.rewardGroups   : {};
  n.lootHistory    = Array.isArray(raw?.lootHistory)    ? raw.lootHistory    : [];
  n.habits         = Array.isArray(raw?.habits)         ? raw.habits         : [];
  n.lastLoginDate  = raw?.lastLoginDate  || "";
  n.dailyQuestDate = raw?.dailyQuestDate || "";
  return finalize(n, false);
}

// ─── Helpers ──────────────────────────────────────────────────────────
function uid()        { return globalThis.crypto?.randomUUID ? crypto.randomUUID() : `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`; }
function dateKey(d=new Date()) { return d.toISOString().slice(0,10); }
function esc(v)       { return String(v??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"); }
function qLabel(v)    { return ({ Daily:"Ежедневный", Weekly:"Еженедельный", Main:"Главный", Side:"Побочный", Boss:"Испытание", Easy:"Лёгкий", Normal:"Нормальный", Hard:"Сложный", Trial:"Испытание" })[v] || v; }
function byName(l,n)  { return l.find(i => i.name === n); }
function xpFor(lv)    { return Math.round(120 * Math.pow(lv, 1.32)); }
function evoName()    { return (EVOLUTION_STAGES[S.hero.evolution]||EVOLUTION_STAGES[0]).name; }
function todayIds()   { return S.completedDaily[dateKey()] || []; }
function todayXp()    { const d=dateKey(); return S.progressLog.filter(e => e.timestamp?.slice(0,10)===d && e.type==="quest").reduce((s,e) => s+Number(e.xp||0),0); }
function weeklyXp()   { const c=Date.now()-7*864e5; return S.progressLog.filter(e => new Date(e.timestamp).getTime()>=c).reduce((s,e) => s+Number(e.xp||0),0); }

function maybeLevel(e) {
  let up = false;
  while (e.xp >= xpFor(e.level)) { e.xp -= xpFor(e.level); e.level++; up = true; }
  return up;
}

function logProgress(entry) {
  S.progressLog.unshift({ id:uid(), timestamp:new Date().toISOString(), title:entry.title, type:entry.type||"quest", xp:Number(entry.xp||0), coins:Number(entry.coins||0), sphere:entry.sphere||"", stats:entry.stats||[], comment:entry.comment||"" });
}

function finalize(next=S, show=true) {
  ACHIEVEMENTS.forEach(a => {
    if (next.unlockedAchievements?.includes(a.id)) return;
    if (!a.test(next)) return;
    if (!next.unlockedAchievements) next.unlockedAchievements = [];
    next.unlockedAchievements.push(a.id);
    next.progressLog.unshift({ id:uid(), timestamp:new Date().toISOString(), title:a.title, type:"achievement", xp:0, coins:0, sphere:a.cat, comment:a.cond });
    if (show) { toast(`Достижение: ${a.title}`); playSound("achievement"); }
  });
  return next;
}

function setRoute(r) { S.route = r === "hero" ? "main" : r; S.activeDetail = null; save(); render(); }

// ─── Toast ────────────────────────────────────────────────────────────
function toast(msg) {
  document.querySelector(".toast")?.remove();
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  document.body.append(el);
  setTimeout(() => el.remove(), 2600);
}

// ─── Theme ────────────────────────────────────────────────────────────
function applyTheme() {
  const t = THEMES[S.theme] || THEMES.ice;
  const a = S.appearance || EMPTY.appearance;
  const preset = BACKGROUND_PRESETS[a.bgPreset] || BACKGROUND_PRESETS.worldwalker;
  const bg = a.customBg ? `url("${a.customBg}")` : preset.image;
  document.documentElement.dataset.theme = S.darkMode ? S.theme : "light";
  document.documentElement.dataset.density = a.density || "compact";
  document.documentElement.style.setProperty("--accent", t.accent);
  document.documentElement.style.setProperty("--accent-2", t.accent2);
  document.documentElement.style.setProperty("--aura", t.aura);
  document.documentElement.style.setProperty("--scene-bg", bg);
  document.documentElement.style.setProperty("--scene-dim", String(Math.min(92,Math.max(35,Number(a.bgDim||72)))/100));
}

// ─── Sound ────────────────────────────────────────────────────────────
let audioCtx = null;
function getAudio() { if (!audioCtx) try { audioCtx = new (window.AudioContext||window.webkitAudioContext)(); } catch { return null; } return audioCtx; }

function playSound(type) {
  if (!S.soundEnabled) return;
  const ctx = getAudio(); if (!ctx) return;
  const osc = ctx.createOscillator(), gain = ctx.createGain();
  osc.connect(gain); gain.connect(ctx.destination);
  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
  osc.type = "sine";
  const freqs = {
    quest:[523,784], levelup:[392,523,659,784], achievement:[659,784,880],
    loot:[440,880], checkin:[440,554], evolution:[262,330,392,523],
    boss:[330,392,523,659,784], reward:[523,392],
  };
  const f = freqs[type] || [440];
  f.forEach((freq, i) => osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1));
  if (type === "levelup" || type === "evolution") gain.gain.setValueAtTime(0.2, ctx.currentTime);
  osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.5);
}

// ─── Particles ────────────────────────────────────────────────────────
let pCanvas = null, pFrame = null, pParticles = [];

function startParticles() {
  pCanvas = document.createElement("canvas");
  pCanvas.id = "particle-canvas";
  document.body.append(pCanvas);
  pCanvas.width = innerWidth; pCanvas.height = innerHeight;
  const ctx = pCanvas.getContext("2d");
  pParticles = Array.from({length:60}, () => ({
    x: Math.random()*pCanvas.width, y: pCanvas.height+Math.random()*100,
    vx:(Math.random()-0.5)*4, vy:-(Math.random()*6+3), size:Math.random()*6+2,
    color:`hsl(${Math.random()*60+30},100%,${60+Math.random()*30}%)`,
    life:1, decay:0.005+Math.random()*0.01,
  }));
  (function anim() {
    ctx.clearRect(0,0,pCanvas.width,pCanvas.height);
    pParticles.forEach(p => { p.x+=p.vx; p.y+=p.vy; p.vy+=0.05; p.life-=p.decay;
      if (p.life>0) { ctx.globalAlpha=p.life; ctx.fillStyle=p.color; ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fill(); }
    });
    pParticles = pParticles.filter(p => p.life > 0);
    if (pParticles.length) pFrame = requestAnimationFrame(anim);
  })();
}

function stopParticles() {
  if (pFrame) cancelAnimationFrame(pFrame);
  if (pCanvas) pCanvas.remove();
  pParticles = []; pCanvas = null;
}

// ─── Streak ───────────────────────────────────────────────────────────
function updateStreak() {
  const today = dateKey(), yest = dateKey(new Date(Date.now()-864e5));
  if (S.streak.lastCheckIn === today) return;
  S.streak.current = (S.streak.lastCheckIn === yest) ? S.streak.current + 1 : 1;
  S.streak.lastCheckIn = today;
  S.streak.totalCheckIns++;
  if (S.streak.current > S.streak.best) S.streak.best = S.streak.current;
}

function streakMult() {
  const c = S.streak?.current || 0;
  return c <= 1 ? 1 : Math.min(STREAK_MULT_CAP, 1 + (c-1)*0.15);
}

function checkIn() {
  const today = dateKey();
  if (S.streak.lastCheckIn === today) { toast("Already checked in today!"); return; }
  updateStreak();
  const m = streakMult(), bx = Math.round(20*m), bc = Math.round(5*m);
  S.hero.xp += bx; S.hero.coins += bc;
  const up = maybeLevel(S.hero);
  logProgress({ title:"Daily Check-in", type:"checkin", xp:bx, coins:bc, sphere:"Discipline", comment:`Streak: ${S.streak.current} days. Mult: x${m.toFixed(2)}` });
  finalize(S); save(); playSound("checkin");
  if (up) showCelebration("level");
  toast(`Check-in! Streak: ${S.streak.current} days. +${bx} XP, +${bc} coins`);
  render();
}

// ─── Comeback Bonus ───────────────────────────────────────────────────
function checkComeback() {
  const today = dateKey(), last = S.lastLoginDate;
  if (!last || last === today) { S.lastLoginDate = today; save(); return; }
  const days = Math.floor((Date.now()-new Date(last).getTime())/864e5);
  if (days >= 2) {
    const bonus = Math.min(200, days*15);
    S.hero.coins += bonus; S.hero.xp += Math.round(bonus*0.5);
    maybeLevel(S.hero);
    logProgress({ title:"Comeback Bonus", type:"comeback", xp:Math.round(bonus*0.5), coins:bonus, comment:`${days} days away` });
    save();
    setTimeout(() => {
      const p = document.createElement("div");
      p.className = "popup-overlay";
      p.innerHTML = `<div class="popup-card"><h2>Welcome Back!</h2><p>You were away ${days} days.</p><div class="popup-reward">+${bonus} coins, +${Math.round(bonus*0.5)} XP</div><button class="btn btn-primary" onclick="this.closest('.popup-overlay').remove()">Continue</button></div>`;
      document.body.append(p);
    }, 800);
  }
  S.lastLoginDate = today; save();
}

// ─── Loot ─────────────────────────────────────────────────────────────
function rollLoot() {
  const r = Math.random();
  const rarity = r<0.02?"legendary":r<0.08?"epic":r<0.22?"rare":r<0.50?"uncommon":"common";
  const candidates = LOOT_TABLE.filter(l => l.rarity === rarity);
  const loot = candidates[Math.floor(Math.random()*candidates.length)];
  if (!loot) return null;
  S.hero.coins += loot.coins; S.hero.xp += loot.xp; maybeLevel(S.hero);
  S.lootHistory.push({ id:uid(), lootId:loot.id, name:loot.name, rarity:loot.rarity, date:new Date().toISOString() });
  logProgress({ title:`Loot: ${loot.name}`, type:"loot", xp:loot.xp, coins:loot.coins });
  finalize(S); save(); return loot;
}

// ─── Celebration ──────────────────────────────────────────────────────
function showCelebration(type) {
  const overlay = document.createElement("div");
  overlay.className = "popup-overlay celebration";
  const label = type === "evolution" ? "Evolution!" : "Level Up!";
  const sub = type === "evolution" ? evoName() : `Level ${S.hero.level}`;
  overlay.innerHTML = `<div class="popup-card celebration-card"><span class="celebration-icon">${type==="evolution"?"\u2728":"\uD83C\uDFC6"}</span><h2>${label}</h2><p class="celebration-sub">${sub}</p>${type==="evolution"?`<p class="celebration-reward">+100 bonus XP</p>`:""}<button class="btn btn-primary" id="celebration-close">Continue</button></div>`;
  document.body.append(overlay);
  startParticles();
  if (type === "evolution") { S.hero.xp += 100; maybeLevel(S.hero); save(); }
  overlay.querySelector("#celebration-close").addEventListener("click", () => { overlay.remove(); stopParticles(); });
  setTimeout(() => { overlay.remove(); stopParticles(); }, 6000);
}

// ─── Quest Logic ──────────────────────────────────────────────────────
function createQuest(data) {
  const title = data.get("title")?.trim();
  if (!title) return;
  if ((data.get("type")||"") === "Boss") {
    S.bossFights.unshift({
      id:uid(), title, sphere:data.get("sphere")||S.spheres[0]?.name||"General",
      risk:data.get("description")?.trim()||"Major personal barrier.", reward:"Unlock next identity layer",
      xp:Number(data.get("xp")||220), coins:Number(data.get("coins")||120),
      steps:["Определи критерий победы","Сделай первый видимый шаг","Заверши финальное действие"],
      status:"active", completedSteps:[],
    });
    return;
  }
  S.quests.unshift({
    id:uid(), title,
    description:data.get("description")?.trim()||"Real action that moves the hero forward.",
    type:data.get("type")||"Daily", sphere:data.get("sphere")||S.spheres[0]?.name||"General",
    difficulty:data.get("difficulty")||"Normal",
    xp:Number(data.get("xp")||40), coins:Number(data.get("coins")||15),
    stats:[data.get("stat")||S.stats[0]?.name||"Focus"],
    status:"active", deadline:data.get("deadline")?.trim()||"Flexible",
  });
}

function completeQuest(id) {
  const q = S.quests.find(i => i.id === id);
  if (!q || q.status === "completed") return;
  const isDaily = q.type === "Daily";
  const tids = todayIds();
  if (isDaily && tids.includes(q.id)) { toast("Already completed today."); return; }
  const rem = Math.max(0, DAILY_XP_CAP - todayXp());
  const m = streakMult(), pm = 1+(S.prestige?.bonus||0)/100;
  let xp = isDaily ? Math.min(q.xp, rem) : q.xp;
  xp = Math.round(xp * m * pm);
  if (isDaily && xp <= 0) { toast(`Daily XP cap ${DAILY_XP_CAP} reached.`); return; }
  if (isDaily) { S.completedDaily[dateKey()] = [...tids, q.id]; }
  else if (q.type !== "Weekly") { q.status = "completed"; }
  S.hero.xp += xp; S.hero.coins += q.coins;
  const up = maybeLevel(S.hero);
  const sp = byName(S.spheres, q.sphere);
  if (sp) { sp.xp += xp; maybeLevel(sp); }
  q.stats.forEach(n => { const st = byName(S.stats, n); if (st) { st.xp += Math.round(xp/q.stats.length); maybeLevel(st); } });
  S.completions.unshift({ id:uid(), title:q.title, xp, coins:q.coins, date:new Date().toISOString() });
  logProgress({ title:q.title, type:"quest", xp, coins:q.coins, sphere:q.sphere, stats:q.stats, comment:q.description, actionId:q.id });
  finalize(S); save();
  if (up) { showCelebration("level"); playSound("levelup"); } else { playSound("quest"); }
  const loot = rollLoot();
  if (loot) showLootPopup(loot);
  toast(`Квест: +${xp} XP, +${q.coins} монет`); render();
}

function showLootPopup(loot) {
  setTimeout(() => {
    const p = document.createElement("div");
    p.className = "popup-overlay loot";
    p.innerHTML = `<div class="popup-card loot-card" data-rarity="${loot.rarity}"><span class="loot-icon">${loot.icon}</span><div class="loot-title">${esc(loot.name)}</div><div class="loot-rarity">${loot.rarity.toUpperCase()}</div><button class="btn btn-primary" onclick="this.closest('.popup-overlay').remove()">Claim</button></div>`;
    document.body.append(p); playSound("loot");
    setTimeout(() => p.remove(), 5000);
  }, 400);
}

function completeBoss(id) {
  const b = S.bossFights.find(i => i.id === id);
  if (!b || b.status === "defeated") return;
  let xp = b.xp;
  if (b.rewardGroup && S.rewardGroups[b.rewardGroup]) xp = Math.max(0, b.xp - S.rewardGroups[b.rewardGroup]);
  if (b.rewardGroup) S.rewardGroups[b.rewardGroup] = Math.max(S.rewardGroups[b.rewardGroup]||0, b.xp);
  b.status = "defeated"; b.completedSteps = [...(b.steps||[])];
  S.hero.xp += xp; S.hero.coins += b.coins;
  const up = maybeLevel(S.hero);
  const sp = byName(S.spheres, b.sphere);
  if (sp) { sp.xp += xp; maybeLevel(sp); }
  logProgress({ title:b.title, type:"boss", xp, coins:b.coins, sphere:b.sphere, comment:`Риск: ${b.risk}. Награда: ${b.reward}.`, actionId:b.id });
  finalize(S); save();
  if (up) { showCelebration("level"); playSound("levelup"); } else { playSound("boss"); }
  toast(`Испытание пройдено: +${xp} XP`); render();
}

function deleteQuest(id) {
  if (!confirm("Delete quest?")) return;
  S.quests = S.quests.filter(q => q.id !== id); save(); render();
}

// ─── Habit Logic ──────────────────────────────────────────────────────
function createHabit(data) {
  const title = data.get("title")?.trim();
  if (!title) return;
  S.habits.push({ id:uid(), title, icon:data.get("icon")?.trim()||"\u2B50", frequency:data.get("frequency")||"daily", sphere:data.get("sphere")||S.spheres[0]?.name||"Discipline", completedDates:[], createdAt:new Date().toISOString() });
}

function completeHabit(id) {
  const h = S.habits.find(i => i.id === id);
  if (!h) return;
  const today = dateKey();
  if (h.completedDates.includes(today)) {
    h.completedDates = h.completedDates.filter(d => d !== today);
    toast("Habit unchecked.");
  } else {
    h.completedDates.push(today);
    S.hero.xp += 15; S.hero.coins += 5; maybeLevel(S.hero);
    logProgress({ title:`Habit: ${h.title}`, type:"habit", xp:15, coins:5, sphere:h.sphere });
    toast(`Habit: +15 XP, +5 coins`); playSound("checkin");
  }
  finalize(S); save(); render();
}

function deleteHabit(id) {
  if (!confirm("Delete habit?")) return;
  S.habits = S.habits.filter(h => h.id !== id); save(); render();
}

function habitStreak(h) {
  let s = 0;
  for (let i = 0; i < 365; i++) {
    const d = dateKey(new Date(Date.now()-i*864e5));
    if (h.completedDates.includes(d)) s++;
    else if (i > 0) break;
  }
  return s;
}

function habitWeekScore() {
  let done = 0, total = 0;
  S.habits.forEach(h => { for (let i=0;i<7;i++) { total++; if (h.completedDates.includes(dateKey(new Date(Date.now()-i*864e5)))) done++; } });
  return total > 0 ? Math.round((done/total)*100) : 0;
}

// ─── Reward Logic ─────────────────────────────────────────────────────
function createReward(data) {
  const title = data.get("title")?.trim();
  if (!title) return;
  S.rewards.push({ id:uid(), title, cost:Number(data.get("cost")||100), category:data.get("category")?.trim()||"Personal", status:"active" });
}

function redeemReward(id) {
  const r = S.rewards.find(i => i.id === id);
  if (!r) return;
  if (S.hero.coins < r.cost) { toast("Пока не хватает монет."); return; }
  S.hero.coins -= r.cost;
  r.redemptions = Number(r.redemptions||0)+1;
  logProgress({ title:r.title, type:"reward", xp:0, coins:-r.cost, sphere:r.category, comment:"Награда получена." });
  finalize(S, false); save(); playSound("reward"); toast(`Награда: ${r.title}`); render();
}

// ─── Transform / Prestige ─────────────────────────────────────────────
function transformHero() {
  const next = Math.min(EVOLUTION_STAGES.length-1, S.hero.evolution+1);
  const req = EVOLUTION_STAGES[next].level;
  if (S.hero.level < req) { toast(`Transform at level ${req}.`); return; }
  S.hero.evolution = next; save();
  showCelebration("evolution"); playSound("evolution");
  toast(`Герой: ${EVOLUTION_STAGES[next].name}`); render();
}

function prestigeUp() {
  if (S.hero.level < 30) { toast("Need level 30+ for prestige."); return; }
  if (!confirm(`Reset to level 1 and gain Prestige ${S.prestige.level+1}?`)) return;
  S.prestige.level++; S.prestige.bonus = S.prestige.level*10;
  S.prestige.totalXP += S.hero.xp + xpFor(S.hero.level)*S.hero.level;
  S.hero.level = 1; S.hero.xp = 0; S.hero.evolution = 0;
  showCelebration("evolution"); playSound("evolution"); save();
  toast(`Prestige ${S.prestige.level}! +${S.prestige.bonus}% XP`); render();
}

// ─── Import / Export ──────────────────────────────────────────────────
function importTemplate(arch) {
  const tpl = STARTER[arch] || STARTER.founder;
  tpl.spheres.forEach(n => { if (!byName(S.spheres,n)) S.spheres.push({id:uid(),name:n,level:1,xp:0,active:true}); });
  tpl.stats.forEach(n => { if (!byName(S.stats,n)) S.stats.push({id:uid(),name:n,level:1,xp:0,active:true}); });
  tpl.quests.forEach(([t,d,tp,sp,df,xp,co,st]) => {
    if (S.quests.some(q => q.title===t)) return;
    S.quests.push({id:uid(),title:t,description:d,type:tp,sphere:sp,difficulty:df,xp,coins:co,stats:st,status:"active",deadline:"This week"});
  });
  if (!S.rewards.length) {
    S.rewards.push(
      {id:uid(),title:"Coffee without rush",cost:100,category:"Small Reward",status:"active"},
      {id:uid(),title:"Movie / evening out",cost:500,category:"Experience",status:"active"},
      {id:uid(),title:"Style purchase",cost:1000,category:"Style",status:"active"},
    );
  }
  BOSS_TEMPLATES.forEach(b => {
    if (S.bossFights.some(i => i.id===b.id||i.title===b.title)) return;
    S.bossFights.push({...b, status:"active", completedSteps:[]});
    if (!byName(S.spheres,b.sphere)) S.spheres.push({id:uid(),name:b.sphere,level:1,xp:0,active:true});
  });
  toast("Шаблон импортирован.");
}

function exportProgress() {
  const payload = { app:APP_NAME, version:VERSION, exportedAt:new Date().toISOString(), state:finalize(structuredClone(S),false) };
  const blob = new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href=url; a.download=`rpg-life-${dateKey()}.json`;
  document.body.append(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  logProgress({ title:"Export JSON", type:"export", xp:0, coins:0 });
  finalize(S); save(); toast("Прогресс экспортирован.");
}

function importFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      S = sanitize(parsed.state || parsed);
      S.onboardingComplete = true; S.route = "main";
      logProgress({ title:"Import JSON", type:"import", xp:0, coins:0, comment:file.name });
      finalize(S, false); save(); toast("Прогресс импортирован."); render();
    } catch { toast("Import failed."); }
  };
  reader.readAsText(file);
}

function importBgFile(file) {
  if (!file||!file.type.startsWith("image/")) { toast("Выбери изображение."); return; }
  if (file.size > 1_000_000) { toast("Фон слишком большой. Выбери изображение до 1 MB."); return; }
  const reader = new FileReader();
  reader.onload = () => { S.appearance.customBg = String(reader.result); S.appearance.bgPreset="custom"; applyTheme(); save(); toast("Фон Main обновлён."); render(); };
  reader.readAsDataURL(file);
}

function hardReset() {
  if (!confirm("Удалить весь прогресс и начать заново?")) return;
  S = structuredClone(EMPTY);
  localStorage.removeItem(STORAGE_KEY); applyTheme(); render();
}

// ─── Skill Tree ───────────────────────────────────────────────────────
function unlockSkill(id) {
  if (S.skillTree.unlocked.includes(id)) return;
  let found = null;
  for (const branch of Object.values(SKILL_TREE)) { found = branch.find(n => n.id===id); if (found) break; }
  if (!found) return;
  if (found.req && !S.skillTree.unlocked.includes(found.req)) { toast("Сначала открой предыдущий навык."); return; }
  S.skillTree.unlocked.push(id); playSound("achievement"); toast(`Навык: ${found.name}`); save(); render();
}

// ─── Setup / Onboarding ──────────────────────────────────────────────
function finishSetup(useTpl=false) {
  const form = document.querySelector(".setup-form");
  if (form instanceof HTMLFormElement) {
    const d = new FormData(form);
    if (form.matches('[data-form="identity"]')) {
      S.hero.name = d.get("name")?.trim() || S.hero.name;
      S.hero.codename = d.get("codename")?.trim() || S.hero.codename;
      S.hero.mission = d.get("mission")?.trim() || S.hero.mission;
    }
    if (form.matches('[data-form="first-quest"]') && d.get("title")?.trim()) createQuest(d);
    if (form.matches('[data-form="first-reward"]') && d.get("title")?.trim()) createReward(d);
  }
  if (!S.hero.name) S.hero.name = "Новый герой";
  if (!S.hero.archetype) S.hero.archetype = "custom";
  if (!S.spheres.length) ["Тело","Разум","Дисциплина"].forEach(n => S.spheres.push({id:uid(),name:n,level:1,xp:0,active:true}));
  if (!S.stats.length) ["Фокус","Дисциплина","Мастерство"].forEach(n => S.stats.push({id:uid(),name:n,level:1,xp:0,active:true}));
  if (useTpl) importTemplate(S.hero.archetype);
  S.onboardingComplete = true; S.route = "main"; S.lastLoginDate = dateKey();
  save(); render();
}

function toggleSphere(name) {
  const f = byName(S.spheres, name);
  S.spheres = f ? S.spheres.filter(s => s.name!==name) : [...S.spheres, {id:uid(),name,level:1,xp:0,active:true}];
  save(); render();
}

function toggleStat(name) {
  const f = byName(S.stats, name);
  S.stats = f ? S.stats.filter(s => s.name!==name) : [...S.stats, {id:uid(),name,level:1,xp:0,active:true}];
  save(); render();
}

// ─── Render Helpers ───────────────────────────────────────────────────
function btn(label, cls="", attrs="") { return `<button class="btn ${cls}" ${attrs}>${label}</button>`; }
function emptyState(text) { return `<div class="empty">${text}</div>`; }
function opt(v, label=v, sel=false) { return `<option value="${esc(v)}" ${sel?"selected":""}>${esc(label)}</option>`; }

function heroCard() {
  const next = xpFor(S.hero.level);
  const arch = ARCHETYPES.find(a => a.id===S.hero.archetype)?.label || "Custom";
  const m = streakMult();
  const avatarSrc = S.hero.archetype ? `./assets/avatar-${S.hero.archetype}.svg` : "";
  const avatarContent = avatarSrc ? `<img src="${avatarSrc}" alt="${esc(arch)}" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'"><span style="display:none">${esc((S.hero.codename||S.hero.name||"?").slice(0,2).toUpperCase())}</span>` : `<span>${esc((S.hero.codename||S.hero.name||"?").slice(0,2).toUpperCase())}</span>`;
  return `
    <section class="panel hero-card">
      <div class="hero-avatar">${avatarContent}</div>
      <div class="hero-info">
        <h3>${esc(S.hero.name || "Новый герой")}</h3>
        <div class="tags">
          <span class="tag tag-accent">${arch}</span>
          <span class="tag">Lv ${S.hero.level}</span>
          <span class="tag">${evoName()}</span>
          ${S.prestige.level>0?`<span class="tag tag-gold">P${S.prestige.level}</span>`:""}
          ${m>1?`<span class="tag tag-xp">x${m.toFixed(1)} XP</span>`:""}
        </div>
        <p class="hero-mission">${esc(S.hero.mission || "Задай миссию героя.")}</p>
      </div>
      <div class="xp-bar-block">
        <div class="xp-bar-top"><span>XP героя</span><span>${S.hero.xp}/${next}</span></div>
        <div class="progress-bar"><span style="width:${Math.min(100,(S.hero.xp/next)*100)}%"></span></div>
      </div>
    </section>`;
}

// ─── Screens ──────────────────────────────────────────────────────────
function setupScreen() {
  const steps = ["Идентичность","Архетип","Сферы","Статы","Первый квест","Награды"];
  return `
    <div class="layout setup-layout">
      ${sidebar()}
      <main class="main">
        <header class="topbar"><div><h2 class="page-title">Создай героя</h2><p class="page-sub">Выбери класс, сферы, статы, квесты и награды.</p></div>${btn("Пропустить","ghost","data-action=\"skip-setup\"")}</header>
        <div class="setup-grid">
          <section class="panel hero-forge">
            <div class="forge-figure"><div class="body-silhouette">${S.hero.archetype?`<img src="./assets/avatar-${S.hero.archetype}.svg" alt="${esc(ARCHETYPES.find(a=>a.id===S.hero.archetype)?.label||"Hero")}" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'"><span style="display:none">${S.hero.name?S.hero.name.slice(0,2).toUpperCase():"?"}</span>`:`<span>${S.hero.name?S.hero.name.slice(0,2).toUpperCase():"?"}</span>`}</div></div>
            <div class="forge-copy"><h3>Путешествие начинается.</h3><p>Выбери класс, сферы, характеристики и первый квест.</p></div>
            <div class="stepper">${steps.map((s,i) => `<button class="step ${i===S.setupStep?"active":""} ${i<S.setupStep?"done":""}" data-setup-step="${i}"><span>${i+1}</span>${s}</button>`).join("")}</div>
          </section>
          <section class="panel"><div class="panel-inner">${setupStepContent()}</div></section>
        </div>
        <div class="setup-footer panel">
          ${btn("Назад","","data-action=\"setup-prev\""+(S.setupStep===0?" disabled":""))}
          <div class="setup-progress"><span style="width:${((S.setupStep+1)/steps.length)*100}%"></span></div>
          ${S.setupStep===steps.length-1?btn("Начать сезон","btn-primary","data-action=\"setup-finish\""):btn("Дальше","btn-primary","data-action=\"setup-next\"")}
        </div>
      </main>
    </div>`;
}

function setupStepContent() {
  if (S.setupStep===0) return `
    <form class="form-grid setup-form" data-form="identity">
      <h3 class="section-title">1. Идентичность</h3>
      <label class="field"><span class="label">Имя героя</span><input class="input" name="name" maxlength="32" value="${esc(S.hero.name)}" placeholder="Искандер, Nova, Phoenix" required></label>
      <label class="field"><span class="label">Кодовое имя</span><input class="input" name="codename" maxlength="32" value="${esc(S.hero.codename)}" placeholder="World Warrior, Architect"></label>
      <label class="field full"><span class="label">Миссия</span><textarea class="textarea" name="mission" maxlength="140" placeholder="Зачем ты создаёшь этот мир?">${esc(S.hero.mission)}</textarea></label>
      <div class="theme-grid full">${Object.entries(THEMES).map(([k,t]) => `<button type="button" class="theme-card ${S.theme===k?"active":""}" data-theme-choice="${k}"><span class="theme-gem" style="background:${t.accent}"></span><strong>${t.label}</strong></button>`).join("")}</div>
    </form>`;
  if (S.setupStep===1) return `<div class="setup-form"><h3 class="section-title">2. Архетип</h3><div class="choice-grid">${ARCHETYPES.map(a => `<button type="button" class="choice-card ${S.hero.archetype===a.id?"active":""}" data-archetype="${a.id}"><strong>${a.label}</strong><span>${a.desc}</span></button>`).join("")}</div></div>`;
  if (S.setupStep===2) return chooserStep("3. Сферы жизни","Выбери свои домены.",SPHERE_PRESETS,S.spheres,"sphere");
  if (S.setupStep===3) return chooserStep("4. Статы","Выбери характеристики персонажа.",STAT_PRESETS,S.stats,"stat");
  if (S.setupStep===4) return `
    <form class="form-grid setup-form" data-form="first-quest">
      <h3 class="section-title">5. Первый квест</h3>
      <label class="field full"><span class="label">Название</span><input class="input" name="title" placeholder="90 минут deep work"></label>
      <label class="field full"><span class="label">Описание</span><textarea class="textarea" name="description" placeholder="Что сделать?"></textarea></label>
      <label class="field"><span class="label">Сфера</span><select class="select" name="sphere">${S.spheres.map(s => opt(s.name)).join("")}</select></label>
      <label class="field"><span class="label">Стат</span><select class="select" name="stat">${S.stats.map(s => opt(s.name)).join("")}</select></label>
      <label class="field"><span class="label">XP</span><input class="input" name="xp" type="number" min="1" value="50"></label>
      <label class="field"><span class="label">Монеты</span><input class="input" name="coins" type="number" min="0" value="20"></label>
    </form>`;
  return `
    <form class="form-grid setup-form" data-form="first-reward">
      <h3 class="section-title">6. Награды</h3>
      <label class="field"><span class="label">Первая награда</span><input class="input" name="title" placeholder="Кофе, кино, покупка"></label>
      <label class="field"><span class="label">Стоимость</span><input class="input" name="cost" type="number" min="1" value="100"></label>
      <label class="field full"><span class="label">Category</span><input class="input" name="category" placeholder="Small reward, experience"></label>
      <div class="full info-strip">You can change everything after starting.</div>
    </form>`;
}

function chooserStep(title, copy, presets, selected, type) {
  return `
    <div class="setup-form">
      <h3 class="section-title">${title}</h3><p class="muted">${copy}</p>
      <div class="choice-grid compact">${presets.map(p => `<button type="button" class="choice-card ${selected.some(x => x.name===p)?"active":""}" data-toggle-${type}="${p}"><strong>${p}</strong></button>`).join("")}</div>
      <form class="inline-form" data-form="quick-${type}"><input class="input" name="name" placeholder="Custom ${type}"><button class="btn" type="submit">${I.plus} Add</button></form>
    </div>`;
}

function shell(title, subtitle, content, actions="") {
  return `
    <div class="layout">${sidebar()}<main class="main">
      <header class="topbar"><div><h2 class="page-title">${title}</h2><p class="page-sub">${subtitle}</p></div><div class="actions">${actions}</div></header>
      ${content}${detailSheet()}
    </main></div>`;
}

function sidebar() {
  const primary = [["main","Main",I.hero],["dashboard","Сегодня",I.dash],["quests","Квесты",I.quest],["progress","Прогресс",I.log],["rewards","Награды",I.badge],["settings","Настройки",I.setting]];
  const secondary = [["habits","Привычки",I.habit],["trials","Испытания",I.boss],["badges","Достижения",I.badge],["evolution","Эволюция",I.tree],["stats","Статы",I.stat],["log","Журнал",I.log]];
  const navBtn = ([route,label,icon], compact=false) => `<button class="nav-btn ${compact?"nav-compact":""} ${S.route===route?"active":""}" data-route="${route}" title="${esc(label)}" ${!S.onboardingComplete?"disabled":""}><span class="nav-icon">${icon}</span><span>${label}</span></button>`;
  return `
    <aside class="sidebar">
      <div class="brand"><div class="brand-mark image-mark"><img src="./assets/brand-logo.jpeg" alt=""></div><div><h1 class="brand-title">${APP_NAME} <span>v${VERSION}</span></h1><p class="brand-sub">Персональный RPG-мир</p></div></div>
      <nav class="nav">${primary.map(n => navBtn(n)).join("")}</nav>
      <div class="nav-rail">${secondary.map(n => navBtn(n,true)).join("")}</div>
      <div class="sidebar-footer"><div class="season-label">Текущий сезон</div><div class="season-name">${esc(S.hero.season)}</div></div>
    </aside>`;
}

function detailSheet() {
  if (!S.activeDetail) return "";
  const isQ = S.activeDetail.type === "quest";
  const item = isQ ? S.quests.find(q => q.id===S.activeDetail.id) : S.bossFights.find(b => b.id===S.activeDetail.id);
  if (!item) return "";
  const title = item.title, typeLabel = isQ ? item.type : "Испытание";
  const copy = isQ ? item.description : item.risk;
  const reward = isQ ? `+${item.xp} XP / +${item.coins} coins` : `+${item.xp} XP / +${item.coins} coins / ${item.reward}`;
  const action = isQ
    ? (item.status==="active"&&!(item.type==="Daily"&&todayIds().includes(item.id)) ? `<button class="btn btn-primary" data-complete="${item.id}">${I.check} Завершить</button>` : `<span class="tag tag-accent">Готово</span>`)
    : (item.status==="defeated" ? `<span class="tag tag-accent">Пройдено</span>` : `<button class="btn btn-primary" data-complete-boss="${item.id}">${I.check} Пройти</button>`);
  return `
    <div class="sheet-backdrop" data-action="close-detail"><aside class="detail-sheet" role="dialog" aria-modal="true" onclick="event.stopPropagation()">
      <div class="panel-header"><div><h3 class="panel-title">${esc(title)}</h3><p class="panel-note">${esc(typeLabel)} / ${esc(item.sphere||"Общее")}</p></div><button class="icon-btn" data-action="close-detail">${I.x}</button></div>
      <div class="panel-inner detail-body"><p>${esc(copy||"Описание пока не задано.")}</p>${!isQ&&item.steps?.length?`<ol class="trial-steps">${item.steps.map(s => `<li>${esc(s)}</li>`).join("")}</ol>`:""}<div class="reward-line">${esc(reward)}</div><div class="actions">${action}<button class="btn" data-route="${isQ?"quests":"trials"}">Открыть раздел</button></div></div>
    </aside></div>`;
}

// ─── Main ─────────────────────────────────────────────────────────────
function mainScreen() {
  const archetype = ARCHETYPES.find(a => a.id === S.hero.archetype)?.label || "Custom";
  const position = HERO_POSITIONS[S.hero.archetype] || HERO_POSITIONS.custom;
  const next = xpFor(S.hero.level);
  const topStats = [...S.stats].sort((a,b) => b.level-a.level || b.xp-a.xp).slice(0,6);
  return shell("Main", "Главная RPG-сцена: персонаж, фон мира, уровень, статы и краткий редактор героя.", `
    <div class="main-grid">
      <section class="panel main-stage-panel">
        <div class="main-stage">
          <div class="scene-controls"><label class="icon-btn scene-upload" title="Загрузить свой фон">${I.plus}<input type="file" accept="image/*" data-background-file></label></div>
          <div class="stage-ring"></div><div class="stage-floor"></div>
          <div class="fullbody-character" style="background-position:${position}"></div>
        </div>
        <div class="panel-inner main-caption">
          <div><h3>${esc(S.hero.name || "Новый герой")}</h3><p>${esc(S.hero.mission || "Добавь миссию героя, чтобы Main стал твоей личной RPG-сценой.")}</p></div>
          <button class="btn" data-route="settings">Сменить фон</button>
        </div>
      </section>
      <div class="grid">
        <section class="panel"><div class="panel-header"><h3 class="panel-title">Профиль персонажа</h3><span class="tag tag-accent">${esc(evoName())}</span></div><div class="panel-inner profile-stack">
          <div class="profile-title"><strong>${esc(S.hero.name || "Новый герой")}</strong><span>${esc(archetype)} / Уровень ${S.hero.level}</span></div>
          <div class="xp-bar-top"><span>XP героя</span><span>${S.hero.xp}/${next}</span></div><div class="progress-bar"><span style="width:${Math.min(100,(S.hero.xp/next)*100)}%"></span></div>
          <div class="metric-row compact-metrics"><div class="metric"><strong>${S.hero.coins}</strong><span>Монеты</span></div><div class="metric"><strong>${S.streak.current}</strong><span>Серия</span></div><div class="metric"><strong>${S.quests.length}</strong><span>Квесты</span></div><div class="metric"><strong>${(S.unlockedAchievements||[]).length}</strong><span>Достижения</span></div></div>
        </div></section>
        <section class="panel"><div class="panel-header"><h3 class="panel-title">Характеристики</h3><button class="link-btn" data-route="stats">Настроить</button></div><div class="panel-inner mini-grid">${topStats.map(statCard).join("") || emptyState("Характеристик пока нет.")}</div></section>
        <section class="panel"><div class="panel-header"><h3 class="panel-title">Редактор героя</h3></div><div class="panel-inner">
          <form class="form-grid compact-form" data-form="hero-edit">
            <label class="field"><span class="label">Имя</span><input class="input" name="name" value="${esc(S.hero.name)}"></label>
            <label class="field"><span class="label">Кодовое имя</span><input class="input" name="codename" value="${esc(S.hero.codename)}"></label>
            <label class="field"><span class="label">Архетип</span><select class="select" name="archetype">${ARCHETYPES.map(a => opt(a.id,a.label,S.hero.archetype===a.id)).join("")}</select></label>
            <label class="field full"><span class="label">Миссия</span><textarea class="textarea" name="mission">${esc(S.hero.mission)}</textarea></label>
            <button class="btn btn-primary" type="submit">Сохранить героя</button>
          </form>
        </div></section>
      </div>
    </div>`);
}

// ─── Dashboard ────────────────────────────────────────────────────────
function dashboardScreen() {
  const quote = QUOTES[(new Date().getDate()+new Date().getMonth())%QUOTES.length];
  const sd = []; for(let i=6;i>=0;i--){ const d=dateKey(new Date(Date.now()-i*864e5)); sd.push({d, active: S.streak.lastCheckIn===d||(S.completedDaily[d]?.length>0)}); }
  const m = streakMult();
  const todayChecked = S.streak.lastCheckIn === dateKey();
  return shell("Сегодня", "Текущий сезон, активные квесты, привычки, сферы жизни и экономика наград.", `
    <div class="dashboard-grid"><div class="grid">
      ${heroCard()}
      <div class="streak-bar">
        <span class="streak-flame">\uD83D\uDD25</span>
        <div class="streak-info"><div class="streak-count">${S.streak.current} дней</div><div class="streak-label">Сейчас / рекорд: ${S.streak.best}</div><div class="streak-days">${sd.map(d => `<div class="streak-dot ${d.active?"active":""}"></div>`).join("")}</div></div>
        ${m>1?`<span class="streak-mult">x${m.toFixed(1)} XP</span>`:""}
        <button class="checkin-btn ${todayChecked?"done":""}" data-action="check-in" ${todayChecked?"disabled":""}>${todayChecked?"Готово ✓":"Отметиться"}</button>
      </div>
      <div class="quote-banner"><div class="quote-text">"${esc(quote.text)}"</div><div class="quote-author">\u2014 ${esc(quote.author)}</div></div>
      <section class="panel"><div class="panel-inner metric-row">
        <div class="metric"><strong>${todayXp()}</strong><span>XP сегодня</span></div>
        <div class="metric"><strong>${weeklyXp()}</strong><span>XP за 7 дней</span></div>
        <div class="metric"><strong>${S.bossFights.filter(b => b.status==="active").length}</strong><span>Испытания</span></div>
        <div class="metric"><strong>${(S.unlockedAchievements||[]).length}/${ACHIEVEMENTS.length}</strong><span>Достижения</span></div>
      </div></section>
      <section class="panel"><div class="panel-header"><div><h3 class="panel-title">Активные квесты</h3><p class="panel-note">Каждое действие меняет героя.</p></div><button class="btn btn-primary" data-route="quests">${I.plus} Новый квест</button></div><div class="panel-inner quest-list">${S.quests.filter(q => q.status==="active").slice(0,6).map(questCard).join("")||emptyState("Создай первый квест.")}</div></section>
    </div><div class="grid">
      <section class="panel"><div class="panel-header"><h3 class="panel-title">Сферы жизни</h3><button class="link-btn" data-route="stats">Управлять</button></div><div class="panel-inner mini-grid">${S.spheres.slice(0,6).map(sphereCard).join("")||emptyState("Сфер пока нет.")}</div></section>
      <section class="panel"><div class="panel-header"><h3 class="panel-title">Испытания</h3><button class="link-btn" data-route="trials">Открыть</button></div><div class="panel-inner quest-list">${S.bossFights.slice(0,2).map(bossCard).join("")||emptyState("Испытаний пока нет.")}</div></section>
      <section class="panel"><div class="panel-header"><h3 class="panel-title">Статы</h3></div><div class="panel-inner mini-grid">${S.stats.slice(0,6).map(statCard).join("")||emptyState("Пока пусто.")}</div></section>
      <section class="panel"><div class="panel-header"><h3 class="panel-title">Награды</h3><span class="tag tag-accent">${S.hero.coins} монет</span></div><div class="panel-inner reward-list">${S.rewards.slice(0,3).map(rewardCard).join("")||emptyState("Создай награды.")}</div></section>
    </div></div>`,
    `${btn("Стартовый шаблон","","data-action=\"import-template\"")}${btn("Журнал","","data-route=\"log\"")}${btn("Эволюция","btn-primary","data-route=\"evolution\"")}`);
}

// ─── Card Renderers ───────────────────────────────────────────────────
function questCard(q) {
  const done = q.type==="Daily" && todayIds().includes(q.id);
  const tc = q.type==="Daily"?"q-daily":q.type==="Weekly"?"q-weekly":q.type==="Boss"?"q-boss":q.type==="Side"?"q-side":"q-main";
  return `
    <article class="quest-card clickable" data-open-quest="${q.id}" tabindex="0">
      <div><h4>${esc(q.title)}</h4><p>${esc(q.description)}</p>
        <div class="tags"><span class="tag ${tc}">${esc(qLabel(q.type))}</span><span class="tag">${esc(q.sphere)}</span><span class="tag">${esc(qLabel(q.difficulty))}</span></div>
        <div class="reward-line">+${q.xp} XP / +${q.coins} монет / ${q.stats.map(esc).join(", ")}</div>
      </div>
      <div class="card-actions">
        ${q.status==="active"&&!done?`<button class="icon-btn" title="Завершить" data-complete="${q.id}">${I.check}</button>`:`<span class="tag tag-accent">${done?"Сегодня закрыт":"Завершён"}</span>`}
        <button class="icon-btn icon-btn-subtle" title="Удалить" data-delete-quest="${q.id}">${I.x}</button>
      </div>
    </article>`;
}

function bossCard(b) {
  return `
    <article class="boss-card clickable" data-open-boss="${b.id}" tabindex="0">
      <div><h4>${esc(b.title)}</h4><p>${esc(b.steps?.join(" \u2192 ")||"Квест высокого риска")}</p>
        <div class="tags"><span class="tag tag-accent">${esc(b.sphere)}</span><span class="tag">Риск: ${esc(b.risk)}</span></div>
        <div class="reward-line">+${b.xp} XP / +${b.coins} монет</div>
      </div>
      <div class="card-actions">${b.status==="defeated"?`<span class="tag tag-accent">Пройдено</span>`:`<button class="btn btn-primary" data-complete-boss="${b.id}">Пройти</button>`}</div>
    </article>`;
}

function sphereCard(s) {
  const next = xpFor(s.level);
  return `<article class="small-card"><div class="card-top"><strong>${esc(s.name)}</strong><span>Lv ${s.level}</span></div><div class="progress-bar progress-sm"><span style="width:${Math.min(100,(s.xp/next)*100)}%"></span></div><small>${s.xp}/${next} XP</small></article>`;
}

function statCard(s) {
  const next = xpFor(s.level);
  return `<article class="small-card"><div class="card-top"><strong>${esc(s.name)}</strong><span>Lv ${s.level}</span></div><div class="progress-bar progress-sm"><span style="width:${Math.min(100,(s.xp/next)*100)}%"></span></div><small>${s.xp}/${next} XP</small></article>`;
}

function rewardCard(r) {
  return `<article class="reward-card"><div><h4>${esc(r.title)}</h4><p>${esc(r.category)}${r.redemptions?` \u00b7 ${r.redemptions}x`:""}</p></div><button class="btn" data-redeem="${r.id}">${r.cost} \u00b7 Получить</button></article>`;
}

function achievementCard(a) {
  const unlocked = (S.unlockedAchievements||[]).includes(a.id);
  return `<article class="achievement-card ${unlocked?"unlocked":""}"><div class="achievement-medal">${unlocked?"✓":"?"}</div><div><h4>${esc(a.title)}</h4><p>${esc(a.cond)}</p><div class="tags"><span class="tag">${esc(a.cat)}</span><span class="tag tag-accent">${esc(a.rarity)}</span></div></div></article>`;
}

// ─── Screen Functions ─────────────────────────────────────────────────
function heroScreen() {
  return shell("Hero","Edit identity, mission, season and theme.",`
    <div class="split">${heroCard()}<section class="panel"><div class="panel-header"><h3 class="panel-title">Hero Editor</h3></div><div class="panel-inner">
      <form class="form-grid" data-form="hero-edit">
        <label class="field"><span class="label">Name</span><input class="input" name="name" value="${esc(S.hero.name)}"></label>
        <label class="field"><span class="label">Codename</span><input class="input" name="codename" value="${esc(S.hero.codename)}"></label>
        <label class="field"><span class="label">Season</span><input class="input" name="season" value="${esc(S.hero.season)}"></label>
        <label class="field"><span class="label">Archetype</span><select class="select" name="archetype">${ARCHETYPES.map(a => opt(a.id,a.label,S.hero.archetype===a.id)).join("")}</select></label>
        <label class="field full"><span class="label">Mission</span><textarea class="textarea" name="mission">${esc(S.hero.mission)}</textarea></label>
        <label class="field full"><span class="label">Motto</span><input class="input" name="motto" value="${esc(S.hero.motto)}"></label>
        <div class="theme-grid full">${Object.entries(THEMES).map(([k,t]) => `<button type="button" class="theme-card ${S.theme===k?"active":""}" data-theme-choice="${k}"><span class="theme-gem" style="background:${t.accent}"></span><strong>${t.label}</strong></button>`).join("")}</div>
        <button class="btn btn-primary" type="submit">Save Hero</button>
      </form>
    </div></section></div>`);
}

function questsScreen() {
  return shell("Квесты","Создавай действия для XP, монет и роста персонажа.",`
    <div class="split">
      <section class="panel"><div class="panel-header"><h3 class="panel-title">Новый квест</h3></div><div class="panel-inner">
        <form class="form-grid" data-form="quest">
          <label class="field full"><span class="label">Название</span><input class="input" name="title" required placeholder="90 минут deep work"></label>
          <label class="field full"><span class="label">Описание</span><textarea class="textarea" name="description" placeholder="Что именно нужно сделать?"></textarea></label>
          <label class="field"><span class="label">Тип</span><select class="select" name="type">${["Daily","Weekly","Main","Side","Boss"].map(x => opt(x,qLabel(x))).join("")}</select></label>
          <label class="field"><span class="label">Сфера</span><select class="select" name="sphere">${S.spheres.map(s => opt(s.name)).join("")}</select></label>
          <label class="field"><span class="label">Сложность</span><select class="select" name="difficulty">${["Easy","Normal","Hard","Trial"].map(x => opt(x,qLabel(x))).join("")}</select></label>
          <label class="field"><span class="label">Стат</span><select class="select" name="stat">${S.stats.map(s => opt(s.name)).join("")}</select></label>
          <label class="field"><span class="label">XP</span><input class="input" name="xp" type="number" min="1" value="50"></label>
          <label class="field"><span class="label">Монеты</span><input class="input" name="coins" type="number" min="0" value="20"></label>
          <label class="field full"><span class="label">Дедлайн</span><input class="input" name="deadline" placeholder="Сегодня, пятница"></label>
          <button class="btn btn-primary" type="submit">${I.plus} Добавить квест</button>
        </form>
      </div></section>
      <section class="panel"><div class="panel-header"><h3 class="panel-title">Журнал квестов</h3><span class="tag">${S.quests.length}</span></div><div class="panel-inner quest-list">${S.quests.map(questCard).join("")||emptyState("Квестов пока нет.")}</div></section>
    </div>`);
}

function habitsScreen() {
  const ws = habitWeekScore();
  const todayH = S.habits.filter(h => h.completedDates.includes(dateKey()));
  return shell("Habits","Build habits, track streaks and watch progress.",`
    <div class="grid"><div class="split">
      <section class="panel"><div class="panel-header"><h3 class="panel-title">New Habit</h3></div><div class="panel-inner">
        <form class="form-grid" data-form="habit">
          <label class="field full"><span class="label">Title</span><input class="input" name="title" required placeholder="Meditation, workout, reading..."></label>
          <label class="field"><span class="label">Icon</span><input class="input" name="icon" value="\u2B50" maxlength="4"></label>
          <label class="field"><span class="label">Frequency</span><select class="select" name="frequency"><option value="daily">Daily</option><option value="weekdays">Weekdays</option><option value="weekly">Weekly</option></select></label>
          <label class="field"><span class="label">Sphere</span><select class="select" name="sphere">${S.spheres.map(s => opt(s.name)).join("")}</select></label>
          <button class="btn btn-primary" type="submit">${I.plus} Add</button>
        </form>
      </div></section>
      <section class="panel"><div class="panel-header"><h3 class="panel-title">Today</h3><span class="tag tag-accent">${todayH.length}/${S.habits.length}</span></div><div class="panel-inner habit-list">
        ${S.habits.length===0?emptyState("Create your first habit."):S.habits.map(h => {
          const done = h.completedDates.includes(dateKey());
          const hs = habitStreak(h);
          const wd = []; for(let i=6;i>=0;i--){ const d=dateKey(new Date(Date.now()-i*864e5)); wd.push({d,done:h.completedDates.includes(d),today:i===0}); }
          return `<div class="habit-card ${done?"completed":""}">
            <div class="habit-icon">${h.icon}</div>
            <div class="habit-info"><h4>${esc(h.title)}</h4><p>${esc(h.sphere)} / ${h.frequency}</p><div class="habit-week">${wd.map(d => `<div class="habit-day ${d.done?"done":""} ${d.today?"today":""}"></div>`).join("")}</div></div>
            <div class="habit-actions">${hs>0?`<div class="habit-streak"><span class="fire">\uD83D\uDD25</span> ${hs}</div>`:""}<button class="btn ${done?"":"btn-primary"}" data-complete-habit="${h.id}">${done?"Undo":"Done"}</button><button class="btn btn-danger" data-delete-habit="${h.id}" style="font-size:11px;min-height:28px;padding:0 8px;">Delete</button></div>
          </div>`;
        }).join("")}
      </div></section>
    </div>
    <div class="grid">
      <div class="habit-score-bar"><div><div class="score">${ws}%</div><div class="label">Weekly Score</div></div><div class="progress-bar" style="flex:1;margin-top:0;height:12px;"><span style="width:${ws}%"></span></div></div>
    </div></div>`);
}

function trialsScreen() {
  return shell("Испытания","Высокий риск, высокая награда.",`
    <div class="grid">
      <section class="panel"><div class="panel-header"><h3 class="panel-title">Шаблоны испытаний</h3></div><div class="panel-inner mini-grid">${BOSS_TEMPLATES.map(b => `<article class="small-card"><strong>${esc(b.title)}</strong><small>${esc(b.risk)} / +${b.xp} XP</small></article>`).join("")}</div></section>
      <section class="panel"><div class="panel-header"><h3 class="panel-title">Активные испытания</h3><span class="tag">${S.bossFights.length}</span></div><div class="panel-inner quest-list">${S.bossFights.map(bossCard).join("")||emptyState("Испытаний пока нет.")}</div></section>
    </div>`);
}

function badgesScreen() {
  const rarities = ["legendary","epic","rare","uncommon","common"];
  return shell("Достижения","Значимые события героя с редкостью и условиями открытия.",`
    <section class="panel"><div class="panel-header"><h3 class="panel-title">Достижения</h3><span class="tag tag-accent">${(S.unlockedAchievements||[]).length}/${ACHIEVEMENTS.length}</span></div>
    <div class="panel-inner"><div class="tags" style="margin-bottom:12px;">${rarities.map(r => `<span class="tag" style="font-size:10px;">${r}: ${ACHIEVEMENTS.filter(a => a.rarity===r).length}</span>`).join("")}</div>
    <div class="achievement-grid">${ACHIEVEMENTS.map(achievementCard).join("")}</div></div></section>`);
}

function evolutionScreen() {
  return shell("Эволюция","Путь развития героя: стадии, визуальная идентичность и будущие формы.",`
    <div class="transform-grid">
      <section class="panel hero-forge compact-forge">
        <div class="forge-figure"><div class="body-silhouette">${S.hero.archetype?`<img src="./assets/avatar-${S.hero.archetype}.svg" alt="${esc(evoName())}" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'"><span style="display:none">${evoName()}</span>`:`<span>${evoName()}</span>`}</div></div>
        <button class="btn btn-primary" data-action="transform">Трансформировать героя</button>
      </section>
      <div class="grid">
        <section class="panel"><div class="panel-header"><h3 class="panel-title">Путь эволюции</h3></div><div class="panel-inner evolution-list">${EVOLUTION_STAGES.map((s,i) => `<div class="evolution-row ${i<=S.hero.evolution?"active":""}"><span class="evolution-index">${i+1}</span><div><strong>${s.name}</strong><p>${esc(s.desc)}</p><small>Награда: ${esc(s.reward)}</small></div><span class="tag">Ур. ${s.level}</span></div>`).join("")}</div></section>
        ${S.hero.level>=30?`<section class="panel"><div class="panel-header"><h3 class="panel-title">Prestige</h3><span class="tag tag-gold">Lv ${S.prestige.level}</span></div><div class="panel-inner"><div class="prestige-banner"><h3>Prestige ${S.prestige.level+1}</h3><p>Reset to level 1 and gain +10% XP permanently.</p><br><button class="btn btn-primary" data-action="prestige">Start Prestige</button></div></div></section>`:""}
        ${Object.keys(SKILL_TREE).some(b => S.spheres.some(s => s.name===b))?`<section class="panel"><div class="panel-header"><h3 class="panel-title">Skill Tree</h3></div><div class="panel-inner"><div class="skill-tree">${Object.entries(SKILL_TREE).filter(([b]) => S.spheres.some(s => s.name===b)).map(([b,nodes]) => `<div class="skill-branch"><h4>${esc(b)}</h4><div class="skill-nodes">${nodes.map(n => `<div class="skill-node ${S.skillTree.unlocked.includes(n.id)?"unlocked":""}" data-unlock-skill="${n.id}"><span class="skill-icon">${n.icon}</span><div class="skill-name">${esc(n.name)}</div>${n.req?`<div class="skill-req">Requires: ${nodes.find(x => x.id===n.req)?.name||"?"}</div>`:""}</div>`).join("")}</div></div>`).join("")}</div></div></section>`:""}
      </div>
    </div>`);
}

function rewardsScreen() {
  return shell("Награды", "Своя экономика: монеты превращаются в личные призы и отдых.", `
    <div class="split">
      <section class="panel"><div class="panel-header"><h3 class="panel-title">Создать награду</h3><span class="tag tag-accent">${S.hero.coins} монет</span></div><div class="panel-inner">
        <form class="form-grid" data-form="reward">
          <label class="field"><span class="label">Название</span><input class="input" name="title" required placeholder="Кофе, кино, одежда, поездка"></label>
          <label class="field"><span class="label">Стоимость</span><input class="input" name="cost" type="number" min="1" value="100"></label>
          <label class="field full"><span class="label">Категория</span><input class="input" name="category" placeholder="Опыт, стиль, отдых"></label>
          <button class="btn btn-primary" type="submit">${I.plus} Добавить</button>
        </form>
      </div></section>
      <section class="panel"><div class="panel-header"><h3 class="panel-title">Магазин наград</h3></div><div class="panel-inner reward-list">${S.rewards.map(rewardCard).join("") || emptyState("Наград пока нет.")}</div></section>
    </div>`);
}

function statsScreen() {
  return shell("Stats & Spheres","Manage your life domains and character attributes.",`
    <div class="split">
      <section class="panel"><div class="panel-header"><h3 class="panel-title">Add Sphere</h3></div><div class="panel-inner"><form class="inline-form" data-form="sphere"><input class="input" name="name" placeholder="Music, Sleep, Business" required><button class="btn btn-primary" type="submit">${I.plus} Add</button></form></div></section>
      <section class="panel"><div class="panel-header"><h3 class="panel-title">Spheres</h3><span class="tag">${S.spheres.length}</span></div><div class="panel-inner mini-grid">${S.spheres.map(s => `<div class="builder-item">${sphereCard(s)}<button class="btn btn-danger" data-delete-sphere="${s.id}">Delete ${esc(s.name)}</button></div>`).join("")||emptyState("Add your first sphere.")}</div></section>
      <section class="panel"><div class="panel-header"><h3 class="panel-title">Add Stat</h3></div><div class="panel-inner"><form class="inline-form" data-form="stat"><input class="input" name="name" placeholder="Leadership, Stage Presence" required><button class="btn btn-primary" type="submit">${I.plus} Add</button></form></div></section>
      <section class="panel"><div class="panel-header"><h3 class="panel-title">Stats</h3><span class="tag">${S.stats.length}</span></div><div class="panel-inner mini-grid">${S.stats.map(s => `<div class="builder-item">${statCard(s)}<button class="btn btn-danger" data-delete-stat="${s.id}">Delete ${esc(s.name)}</button></div>`).join("")||emptyState("Add your first stat.")}</div></section>
    </div>`);
}

function logScreen() {
  const entries = S.progressLog.slice(0,80);
  return shell("Журнал","История событий, квестов, наград, достижений и импорта.",`
    <section class="panel"><div class="panel-header"><div><h3 class="panel-title">Журнал событий</h3><p class="panel-note">Всего: ${S.progressLog.length} записей.</p></div><button class="btn" data-action="export-progress">Экспорт JSON</button></div>
    <div class="panel-inner review-list">${entries.map(e => `<article class="review-item"><span>${new Date(e.timestamp).toLocaleDateString()}</span><strong>${esc(e.title)}</strong><small>${esc(e.type)} / ${e.xp>=0?"+":""}${e.xp} XP / ${e.coins>=0?"+":""}${e.coins} монет / ${esc(e.sphere||"")}</small></article>`).join("")||emptyState("Журнал пуст.")}</div></section>`);
}

function progressScreen() {
  const xp = S.completions.reduce((s,i) => s+i.xp, 0);
  const coins = S.completions.reduce((s,i) => s+i.coins, 0);
  const weak = [...S.spheres].sort((a,b) => a.level-b.level||a.xp-b.xp)[0];
  return shell("Прогресс","Сводка, история действий и временная линия.",`
    <div class="grid">
      <section class="panel"><div class="panel-inner metric-row">
        <div class="metric"><strong>${xp}</strong><span>XP получено</span></div>
        <div class="metric"><strong>${coins}</strong><span>Монеты</span></div>
        <div class="metric"><strong>${S.completions.length}</strong><span>Квестов закрыто</span></div>
        <div class="metric"><strong>${weak?.name||"\u2014"}</strong><span>Нужен фокус</span></div>
      </div></section>
      <div class="split">
        <section class="panel"><div class="panel-header"><h3 class="panel-title">История</h3></div><div class="panel-inner review-list">${S.completions.slice(0,20).map(i => `<article class="review-item"><span>${new Date(i.date).toLocaleDateString()}</span><strong>${esc(i.title)}</strong><small>+${i.xp} XP / +${i.coins} монет</small></article>`).join("")||emptyState("История появится после квестов.")}</div></section>
        <section class="panel"><div class="panel-header"><h3 class="panel-title">Таймлайн</h3></div><div class="panel-inner"><div class="timeline">${S.progressLog.slice(0,12).map(e => `<div class="timeline-item"><div class="tl-date">${new Date(e.timestamp).toLocaleDateString()} ${new Date(e.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</div><div class="tl-title">${esc(e.title)}</div><div class="tl-detail">${esc(e.type)} / +${e.xp} XP / ${e.coins>=0?"+":""}${e.coins} монет</div></div>`).join("")||emptyState("Пока пусто.")}</div></div></section>
      </div>
    </div>`);
}

function settingsScreen() {
  const a = S.appearance || EMPTY.appearance;
  return shell("Настройки","Внешний вид, данные, звук и системные действия.",`
    <div class="grid">
      <section class="panel"><div class="panel-header"><h3 class="panel-title">Внешний вид</h3><span class="tag tag-accent">${BACKGROUND_PRESETS[a.bgPreset]?.label||"Свой фон"}</span></div><div class="panel-inner control-grid">
        <div><h4>Фон</h4><p class="muted">Выбери сцену или загрузи своё изображение.</p><div class="preset-row">${Object.entries(BACKGROUND_PRESETS).map(([k,p]) => `<button class="theme-card ${a.bgPreset===k&&!a.customBg?"active":""}" data-bg-preset="${k}"><strong>${p.label}</strong></button>`).join("")}</div><label class="btn file-btn">Загрузить<input type="file" accept="image/*" data-background-file></label></div>
        <div><h4>Формат экрана</h4><p class="muted">Затемнение и плотность интерфейса.</p><label class="field"><span class="label">Затемнение фона</span><input class="input" type="range" min="35" max="92" value="${a.bgDim}" data-background-dim></label><label class="field"><span class="label">Плотность</span><select class="select" data-density><option value="compact" ${a.density==="compact"?"selected":""}>Компактно</option><option value="comfortable" ${a.density==="comfortable"?"selected":""}>Свободно</option></select></label><button class="btn" data-action="reset-appearance">Сбросить</button></div>
      </div></section>
      <div class="split">
        <section class="panel"><div class="panel-header"><h3 class="panel-title">Звук и тема</h3></div><div class="panel-inner" style="display:grid;gap:14px;">
          <div style="display:flex;align-items:center;justify-content:space-between;"><span style="font-weight:800;font-size:13px;">Звуковые эффекты</span><button class="toggle ${S.soundEnabled?"on":""}" data-action="toggle-sound">${S.soundEnabled?I.sound:I.mute}</button></div>
          <div style="display:flex;align-items:center;justify-content:space-between;"><span style="font-weight:800;font-size:13px;">Светлая тема</span><button class="toggle ${!S.darkMode?"on":""}" data-action="toggle-dark">${!S.darkMode?I.sun:I.moon}</button></div>
        </div></section>
        <section class="panel"><div class="panel-header"><h3 class="panel-title">Серия</h3></div><div class="panel-inner" style="text-align:center;">
          <div style="font-size:48px;animation:flame-pulse 1.2s ease-in-out infinite;display:inline-block;">\uD83D\uDD25</div>
          <div style="font-size:28px;font-weight:800;margin:8px 0;">${S.streak.current} дней</div>
          <div style="color:var(--muted);font-size:12px;">Рекорд: ${S.streak.best} / Всего: ${S.streak.totalCheckIns}</div>
        </div></section>
      </div>
      <section class="panel"><div class="panel-header"><h3 class="panel-title">Резервная копия</h3></div><div class="panel-inner control-grid">
        <div><h4>Экспорт JSON</h4><p class="muted">Сохраняет весь прогресс.</p><button class="btn btn-primary" data-action="export-progress">Экспорт</button></div>
        <div><h4>Импорт JSON</h4><p class="muted">Восстанавливает backup.</p><label class="btn file-btn">Импорт<input type="file" accept="application/json,.json" data-import-file></label></div>
      </div></section>
      <section class="panel"><div class="panel-header"><h3 class="panel-title">Стартовые шаблоны</h3></div><div class="panel-inner actions">${btn("Импортировать шаблон","","data-action=\"import-template\"")}</div></section>
      <section class="panel"><div class="panel-header"><h3 class="panel-title">Опасная зона</h3></div><div class="panel-inner">${btn("Удалить мир","btn-danger","data-action=\"hard-reset\"")}</div></section>
    </div>`);
}

// ─── Render ───────────────────────────────────────────────────────────
function render() {
  applyTheme();
  if (!S.onboardingComplete || S.route==="setup") { document.querySelector("#app").innerHTML = setupScreen(); return; }
  generateDaily();
  const views = { main:mainScreen, dashboard:dashboardScreen, hero:mainScreen, quests:questsScreen, habits:habitsScreen, progress:progressScreen, rewards:rewardsScreen, settings:settingsScreen, trials:trialsScreen, badges:badgesScreen, evolution:evolutionScreen, stats:statsScreen, log:logScreen };
  document.querySelector("#app").innerHTML = (views[S.route]||mainScreen)();
}

// ─── Daily Quest Generation ───────────────────────────────────────────
function generateDaily() {
  const today = dateKey();
  if (S.dailyQuestDate === today) return;
  S.dailyQuestDate = today;
  const templates = [...DAILY_TEMPLATES].sort(() => Math.random()-0.5).slice(0,3);
  templates.forEach(t => {
    if (S.quests.some(q => q.title===t.title && q.type==="Daily")) return;
    S.quests.push({
      id:uid(), title:t.title, description:t.desc, type:"Daily",
      sphere:byName(S.spheres,t.sphere)?t.sphere:(S.spheres[0]?.name||"Дисциплина"),
      difficulty:"Normal", xp:t.xp, coins:t.coins,
      stats:t.stats.filter(s => byName(S.stats,s)||S.stats.length>0).slice(0,1),
      status:"active", deadline:"Сегодня",
    });
  });
  const weekNum = Math.floor(Date.now()/(7*864e5));
  if (weekNum%2===0 && !S.quests.some(q => q.title.includes("Weekly Challenge"))) {
    const w = WEEKLY_TEMPLATES[Math.floor(Math.random()*WEEKLY_TEMPLATES.length)];
    S.quests.push({
      id:uid(), title:w.title, description:w.desc, type:"Weekly",
      sphere:byName(S.spheres,w.sphere)?w.sphere:(S.spheres[0]?.name||"Дисциплина"),
      difficulty:"Hard", xp:w.xp, coins:w.coins,
      stats:[S.stats[0]?.name||"Фокус"], status:"active", deadline:"На этой неделе",
    });
  }
  save();
}

// ─── Event Handlers ───────────────────────────────────────────────────
document.addEventListener("click", e => {
  const sb = e.target.closest('button[type="submit"]');
  if (sb?.form?.dataset.form) { e.preventDefault(); handleForm(sb.form); return; }

  const route = e.target.closest("[data-route]")?.dataset.route;
  if (route && S.onboardingComplete) setRoute(route);

  const setupStep = e.target.closest("[data-setup-step]")?.dataset.setupStep;
  if (setupStep!==undefined) { S.setupStep=Number(setupStep); save(); render(); }

  const themeChoice = e.target.closest("[data-theme-choice]")?.dataset.themeChoice;
  if (themeChoice) { S.theme=themeChoice; save(); render(); }

  const archetype = e.target.closest("[data-archetype]")?.dataset.archetype;
  if (archetype) { S.hero.archetype=archetype; save(); render(); }

  const bgPreset = e.target.closest("[data-bg-preset]")?.dataset.bgPreset;
  if (bgPreset) { S.appearance.bgPreset=bgPreset; S.appearance.customBg=""; applyTheme(); save(); render(); }

  const toggleSphere = e.target.closest("[data-toggle-sphere]")?.dataset.toggleSphere;
  if (toggleSphere) toggleSphere(toggleSphere);

  const toggleStat = e.target.closest("[data-toggle-stat]")?.dataset.toggleStat;
  if (toggleStat) toggleStat(toggleStat);

  const action = e.target.closest("[data-action]")?.dataset.action;
  if (action==="setup-next") { if (S.setupStep>=5) finishSetup(false); else { S.setupStep++; save(); render(); } }
  if (action==="setup-prev") { S.setupStep=Math.max(0,S.setupStep-1); save(); render(); }
  if (action==="skip-setup"||action==="setup-finish") finishSetup(false);
  if (action==="import-template") { importTemplate(); save(); render(); }
  if (action==="export-progress") { exportProgress(); render(); }
  if (action==="reset-appearance") { S.appearance=structuredClone(EMPTY.appearance); applyTheme(); save(); render(); }
  if (action==="close-detail") { S.activeDetail=null; save(); render(); }
  if (action==="transform") transformHero();
  if (action==="hard-reset") hardReset();
  if (action==="check-in") checkIn();
  if (action==="toggle-sound") { S.soundEnabled=!S.soundEnabled; save(); render(); toast(S.soundEnabled?"Звук включён":"Звук выключен"); }
  if (action==="toggle-dark") { S.darkMode=!S.darkMode; applyTheme(); save(); render(); }
  if (action==="prestige") prestigeUp();

  const qd = e.target.closest("[data-open-quest]")?.dataset.openQuest;
  if (qd && !e.target.closest("button,input,select,textarea,label,a")) { S.activeDetail={type:"quest",id:qd}; save(); render(); }
  const bd = e.target.closest("[data-open-boss]")?.dataset.openBoss;
  if (bd && !e.target.closest("button,input,select,textarea,label,a")) { S.activeDetail={type:"boss",id:bd}; save(); render(); }

  const complete = e.target.closest("[data-complete]")?.dataset.complete;
  if (complete) completeQuest(complete);
  const completeBoss = e.target.closest("[data-complete-boss]")?.dataset.completeBoss;
  if (completeBoss) completeBoss(completeBoss);
  const redeem = e.target.closest("[data-redeem]")?.dataset.redeem;
  if (redeem) redeemReward(redeem);
  const dq = e.target.closest("[data-delete-quest]")?.dataset.deleteQuest;
  if (dq) deleteQuest(dq);
  const ds = e.target.closest("[data-delete-sphere]")?.dataset.deleteSphere;
  if (ds) { const sp=S.spheres.find(s=>s.id===ds); if(sp&&(S.quests.some(q=>q.sphere===sp.name)||S.bossFights.some(b=>b.sphere===sp.name))){toast("Sphere in use.");return;} if(!confirm("Delete sphere?"))return; S.spheres=S.spheres.filter(s=>s.id!==ds); save(); render(); }
  const dst = e.target.closest("[data-delete-stat]")?.dataset.deleteStat;
  if (dst) { const st=S.stats.find(s=>s.id===dst); if(st&&S.quests.some(q=>q.stats.includes(st.name))){toast("Stat in use.");return;} if(!confirm("Delete stat?"))return; S.stats=S.stats.filter(s=>s.id!==dst); save(); render(); }
  const hc = e.target.closest("[data-complete-habit]")?.dataset.completeHabit;
  if (hc) completeHabit(hc);
  const hd = e.target.closest("[data-delete-habit]")?.dataset.deleteHabit;
  if (hd) deleteHabit(hd);
  const us = e.target.closest("[data-unlock-skill]")?.dataset.unlockSkill;
  if (us) unlockSkill(us);
});

document.addEventListener("change", e => {
  const fi = e.target.closest("[data-import-file]");
  if (fi?.files?.[0]) { importFile(fi.files[0]); fi.value=""; return; }
  const bi = e.target.closest("[data-background-file]");
  if (bi?.files?.[0]) { importBgFile(bi.files[0]); bi.value=""; return; }
  const dim = e.target.closest("[data-background-dim]");
  if (dim) { S.appearance.bgDim=Number(dim.value); applyTheme(); save(); return; }
  const den = e.target.closest("[data-density]");
  if (den) { S.appearance.density=den.value; applyTheme(); save(); render(); }
});

document.addEventListener("keydown", e => {
  if (e.key==="Escape"&&S.activeDetail) { S.activeDetail=null; save(); render(); return; }
  if (!["Enter"," "].includes(e.key)) return;
  const q = document.activeElement?.closest?.("[data-open-quest]");
  const b = document.activeElement?.closest?.("[data-open-boss]");
  if (q) { e.preventDefault(); S.activeDetail={type:"quest",id:q.dataset.openQuest}; save(); render(); }
  if (b) { e.preventDefault(); S.activeDetail={type:"boss",id:b.dataset.openBoss}; save(); render(); }
});

document.addEventListener("submit", e => { e.preventDefault(); handleForm(e.target); });

function handleForm(form) {
  if (!(form instanceof HTMLFormElement)||!form.checkValidity()) { form.reportValidity?.(); return; }
  const d = new FormData(form);
  if (form.matches('[data-form="quick-sphere"],[data-form="sphere"]')) { const n=d.get("name")?.trim(); if(n&&!byName(S.spheres,n)) S.spheres.push({id:uid(),name:n,level:1,xp:0,active:true}); toast("Сфера добавлена."); }
  if (form.matches('[data-form="quick-stat"],[data-form="stat"]')) { const n=d.get("name")?.trim(); if(n&&!byName(S.stats,n)) S.stats.push({id:uid(),name:n,level:1,xp:0,active:true}); toast("Стат добавлен."); }
  if (form.matches('[data-form="quest"]')) { createQuest(d); toast("Квест создан."); }
  if (form.matches('[data-form="reward"]')) { createReward(d); toast("Награда создана."); }
  if (form.matches('[data-form="hero-edit"]')) {
    S.hero.name=d.get("name")?.trim()||S.hero.name; S.hero.codename=d.get("codename")?.trim()||"";
    S.hero.season=d.get("season")?.trim()||S.hero.season; S.hero.archetype=d.get("archetype")||S.hero.archetype;
    S.hero.mission=d.get("mission")?.trim()||""; S.hero.motto=d.get("motto")?.trim()||""; toast("Герой сохранён.");
  }
  if (form.matches('[data-form="habit"]')) { createHabit(d); toast("Привычка создана."); }
  form.reset(); save(); render();
}

// ─── Init ─────────────────────────────────────────────────────────────
checkComeback();
render();
