const VERSION = "0.4.0";
const APP_NAME = "Live RPG";
const APP_TITLE = "Live RPG: Worldwalker";
const APP_TAGLINE = "Personal progress world";
const STORAGE_KEY = "life-rpg-builder-state-v2";
const DAILY_XP_CAP = 200;

const icon = {
  dashboard: `<svg viewBox="0 0 24 24"><path d="M4 13h6V4H4v9Zm10 7h6V4h-6v16ZM4 20h6v-4H4v4Z"/></svg>`,
  hero: `<svg viewBox="0 0 24 24"><path d="M12 3l7 4v5c0 4.7-2.7 7.7-7 9-4.3-1.3-7-4.3-7-9V7l7-4Z"/><path d="M9 12l2 2 4-5"/></svg>`,
  quests: `<svg viewBox="0 0 24 24"><path d="M7 4h10l2 3v13H5V7l2-3Z"/><path d="M8 9h8M8 13h8M8 17h5"/></svg>`,
  spheres: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M12 3v18M3 12h18M5.7 5.7l12.6 12.6M18.3 5.7 5.7 18.3"/></svg>`,
  stats: `<svg viewBox="0 0 24 24"><path d="M5 19V9M12 19V5M19 19v-7M3 19h18"/></svg>`,
  transform: `<svg viewBox="0 0 24 24"><path d="M12 3l3 6 6 3-6 3-3 6-3-6-6-3 6-3 3-6Z"/><path d="M19 4v4M21 6h-4"/></svg>`,
  rewards: `<svg viewBox="0 0 24 24"><path d="M5 11h14v10H5V11ZM4 7h16v4H4V7Z"/><path d="M12 7v14M12 7c-2.7 0-4.5-3-2-4 1.7-.7 2.7 1.2 2 4Zm0 0c2.7 0 4.5-3 2-4-1.7-.7-2.7 1.2-2 4Z"/></svg>`,
  boss: `<svg viewBox="0 0 24 24"><path d="M12 3 4 7v6c0 4.5 3.2 7.3 8 8 4.8-.7 8-3.5 8-8V7l-8-4Z"/><path d="M9 10h.01M15 10h.01M9 15c2 1.4 4 1.4 6 0"/></svg>`,
  achievements: `<svg viewBox="0 0 24 24"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z"/><path d="M7 6H4v2a4 4 0 0 0 4 4M17 6h3v2a4 4 0 0 1-4 4"/></svg>`,
  log: `<svg viewBox="0 0 24 24"><path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>`,
  review: `<svg viewBox="0 0 24 24"><path d="M5 4h14v16H5V4Z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>`,
  settings: `<svg viewBox="0 0 24 24"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2 3.5-.2-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.4h-4v-.4a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.2.1-2-3.5.1-.1A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.5-1H3v-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9L4.2 7l2-3.5.2.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V2h4v.4a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.2-.1 2 3.5-.1.1A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 1.5 1h.1v4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></svg>`,
  plus: `<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>`,
  check: `<svg viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"/></svg>`,
  x: `<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>`,
};

const themes = {
  ice: { label: "Ледяной", accent: "#72b7ff", accent2: "#d7ecff", aura: "rgba(114, 183, 255, 0.16)" },
  gold: { label: "Золотой", accent: "#f2c35d", accent2: "#fff1b8", aura: "rgba(242, 195, 93, 0.14)" },
  crimson: { label: "Багровый", accent: "#ff6b6f", accent2: "#ffd1d3", aura: "rgba(255, 107, 111, 0.14)" },
  violet: { label: "Фиолетовый", accent: "#a98bff", accent2: "#e4d9ff", aura: "rgba(169, 139, 255, 0.14)" },
  steel: { label: "Стальной", accent: "#aeb8c4", accent2: "#f4f7fb", aura: "rgba(174, 184, 196, 0.12)" },
};

const archetypes = [
  { id: "founder", label: "Основатель", path: "Деньги, фокус, система, лидерство" },
  { id: "creator", label: "Создатель", path: "Контент, ремесло, аудитория, стиль" },
  { id: "warrior", label: "Воин", path: "Тело, дисциплина, энергия, воля" },
  { id: "scholar", label: "Учёный", path: "Знания, глубина, ясность, практика" },
  { id: "artist", label: "Артист", path: "Вкус, творчество, выражение, сцена" },
  { id: "custom", label: "Свой класс", path: "Полностью кастомная прогрессия" },
];

const spherePresets = ["Тело", "Разум", "Деньги", "Карьера", "Творчество", "Отношения", "Стиль жизни", "Дисциплина"];
const statPresets = ["Сила", "Фокус", "Дисциплина", "Креативность", "Харизма", "Мудрость", "Капитал", "Мастерство"];

const heroVisuals = [
  { id: "founder", label: "Founder Architect", position: "8% 50%" },
  { id: "creator", label: "Creator Artist", position: "30% 50%" },
  { id: "warrior", label: "Warrior Athlete", position: "50% 50%" },
  { id: "scholar", label: "Scholar Strategist", position: "72% 50%" },
  { id: "explorer", label: "Explorer Visionary", position: "94% 50%" },
];

const backgroundPresets = {
  worldwalker: { label: "Worldwalker", image: 'url("./assets/worldwalker-bg.png")' },
  void: { label: "Deep Void", image: "none" },
  atlas: { label: "Atlas Grid", image: "radial-gradient(circle at 55% 20%, rgba(114, 183, 255, 0.18), transparent 34%), linear-gradient(135deg, rgba(255,255,255,0.04), transparent 45%)" },
  forge: { label: "Hero Forge", image: "radial-gradient(circle at 25% 25%, rgba(242, 195, 93, 0.16), transparent 30%), radial-gradient(circle at 75% 10%, rgba(114, 183, 255, 0.14), transparent 36%)" },
};

const bossTemplates = [
  { id: "boss-public-launch", title: "Public Launch", sphere: "Карьера", risk: "Публичная оценка", reward: "Новая видимость", xp: 900, coins: 260, rewardGroup: "public-launch", steps: ["Опубликовать артефакт", "Собрать реакцию", "Сделать вывод"] },
  { id: "boss-first-client", title: "First Paid Client", sphere: "Деньги", risk: "Отказ и цена", reward: "Деньги начали двигаться", xp: 1400, coins: 420, rewardGroup: "first-client", steps: ["Сформулировать оффер", "Сделать 5 касаний", "Закрыть оплату"] },
  { id: "boss-identity-repack", title: "Identity Repack", sphere: "Творчество", risk: "Старая идентичность рушится", reward: "Новый визуальный авторитет", xp: 1100, coins: 320, rewardGroup: "identity-repack", steps: ["Обновить профиль", "Собрать кейс", "Опубликовать позиционирование"] },
  { id: "boss-new-circle", title: "New Circle", sphere: "Отношения", risk: "Войти в комнату выше уровнем", reward: "Социальный капитал", xp: 850, coins: 240, rewardGroup: "new-circle", steps: ["Найти событие", "Пойти вживую", "Закрепить контакт"] },
  { id: "boss-revenue-standard", title: "$1000 Month", sphere: "Деньги", risk: "Новый стандарт дохода", reward: "Revenue identity", xp: 2500, coins: 700, rewardGroup: "first-1000", steps: ["План продаж", "Еженедельные касания", "Получить оплату"] },
];

const achievementCatalog = [
  { id: "first-quest", title: "Первый квест", category: "Старт", rarity: "common", condition: "Заверши любой квест.", test: (s) => s.progressLog.some((e) => e.type === "quest") },
  { id: "first-boss", title: "Первое испытание пройдено", category: "Trial", rarity: "rare", condition: "Пройди любое крупное испытание.", test: (s) => s.progressLog.some((e) => e.type === "boss") },
  { id: "backup-master", title: "Хранитель сохранения", category: "Система", rarity: "common", condition: "Сделай экспорт прогресса.", test: (s) => s.progressLog.some((e) => e.type === "export") },
  { id: "money-moving", title: "Money Is Moving", category: "Деньги", rarity: "rare", condition: "Набери 500 монет.", test: (s) => s.hero.coins >= 500 },
  { id: "creator-mode", title: "Creative Director Mode", category: "Творчество", rarity: "epic", condition: "Набери 500 XP в творчестве.", test: (s) => (byName(s.spheres, "Творчество")?.xp || 0) >= 500 },
  { id: "apprentice", title: "Трансформация: Подмастерье", category: "Герой", rarity: "rare", condition: "Достигни уровня 5.", test: (s) => s.hero.level >= 5 },
  { id: "warrior-form", title: "Трансформация: Воин", category: "Герой", rarity: "epic", condition: "Достигни уровня 10.", test: (s) => s.hero.level >= 10 },
];

const starterTemplates = {
  founder: {
    spheres: ["Деньги", "Карьера", "Дисциплина", "Разум"],
    stats: ["Фокус", "Дисциплина", "Капитал", "Мастерство"],
    quests: [
      ["Собрать главный оффер", "Опиши кому, какой результат и через какой механизм ты продаёшь.", "Главный", "Карьера", "Сложный", 220, 90, ["Капитал", "Мастерство"]],
      ["90 минут deep work", "Один блок без переключения контекста.", "Ежедневный", "Дисциплина", "Нормальный", 55, 20, ["Фокус"]],
    ],
  },
  creator: {
    spheres: ["Творчество", "Карьера", "Разум", "Дисциплина"],
    stats: ["Креативность", "Мастерство", "Фокус", "Харизма"],
    quests: [
      ["Опубликовать артефакт", "Пост, видео, заметка, прототип или работа в портфолио.", "Еженедельный", "Творчество", "Сложный", 160, 60, ["Креативность", "Мастерство"]],
      ["30 минут практики ремесла", "Улучшить один конкретный навык.", "Ежедневный", "Творчество", "Нормальный", 45, 18, ["Мастерство"]],
    ],
  },
  warrior: {
    spheres: ["Тело", "Дисциплина", "Разум", "Стиль жизни"],
    stats: ["Сила", "Дисциплина", "Фокус", "Мудрость"],
    quests: [
      ["Тренировка тела", "Силовой или кондиционный блок.", "Ежедневный", "Тело", "Нормальный", 60, 20, ["Сила", "Дисциплина"]],
      ["Trial: 7 дней без срыва", "Соблюдать выбранный протокол неделю.", "Босс", "Дисциплина", "Trial", 420, 150, ["Дисциплина"]],
    ],
  },
};

const emptyState = {
  version: VERSION,
  route: "setup",
  setupStep: 0,
  onboardingComplete: false,
  theme: "ice",
  hero: {
    name: "",
    codename: "",
    archetype: "",
    level: 1,
    xp: 0,
    coins: 0,
    season: "Сезон 01: Основа",
    mission: "",
    motto: "",
    evolution: 0,
    visual: "creator",
  },
  appearance: {
    backgroundPreset: "worldwalker",
    customBackground: "",
    backgroundDim: 72,
    density: "compact",
  },
  activeDetail: null,
  spheres: [],
  stats: [],
  quests: [],
  bossFights: [],
  rewards: [],
  achievements: [],
  unlockedAchievements: [],
  completions: [],
  progressLog: [],
  completedDailyByDate: {},
  rewardGroupsPaid: {},
  drafts: {
    sphereInput: "",
    statInput: "",
  },
};

let state = loadState();
applyTheme();

function loadState() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return structuredClone(emptyState);
  try {
    return sanitizeState(JSON.parse(stored));
  } catch {
    return structuredClone(emptyState);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    toast("Не удалось сохранить прогресс. Сделай экспорт JSON.");
  }
}

function sanitizeState(raw) {
  const base = structuredClone(emptyState);
  const next = { ...base, ...(raw || {}), version: VERSION };
  next.hero = { ...base.hero, ...(raw?.hero || {}) };
  next.appearance = { ...base.appearance, ...(raw?.appearance || {}) };
  next.activeDetail = null;
  next.spheres = Array.isArray(raw?.spheres) ? raw.spheres : [];
  next.stats = Array.isArray(raw?.stats) ? raw.stats : [];
  next.quests = Array.isArray(raw?.quests) ? raw.quests : [];
  next.bossFights = Array.isArray(raw?.bossFights) ? raw.bossFights : [];
  next.rewards = Array.isArray(raw?.rewards) ? raw.rewards : [];
  next.achievements = Array.isArray(raw?.achievements) ? raw.achievements : [];
  next.unlockedAchievements = Array.isArray(raw?.unlockedAchievements) ? raw.unlockedAchievements : [];
  next.completions = Array.isArray(raw?.completions) ? raw.completions : [];
  next.progressLog = Array.isArray(raw?.progressLog) ? raw.progressLog : next.completions.map((item) => ({ ...item, type: "quest", timestamp: item.date || new Date().toISOString() }));
  next.completedDailyByDate = raw?.completedDailyByDate && typeof raw.completedDailyByDate === "object" ? raw.completedDailyByDate : {};
  next.rewardGroupsPaid = raw?.rewardGroupsPaid && typeof raw.rewardGroupsPaid === "object" ? raw.rewardGroupsPaid : {};
  return finalizeState(next, false);
}

function finalizeState(next = state, showUnlocks = true) {
  achievementCatalog.forEach((achievement) => {
    if (next.unlockedAchievements.includes(achievement.id)) return;
    if (!achievement.test(next)) return;
    next.unlockedAchievements.push(achievement.id);
    next.achievements.push(achievement.title);
    next.progressLog.unshift({
      id: uid(),
      timestamp: new Date().toISOString(),
      title: achievement.title,
      type: "achievement",
      xp: 0,
      coins: 0,
      sphere: achievement.category,
      comment: achievement.condition,
    });
    if (showUnlocks) toast(`Badge открыт: ${achievement.title}`);
  });
  return next;
}

function applyTheme() {
  const theme = themes[state.theme] || themes.ice;
  const appearance = state.appearance || emptyState.appearance;
  const preset = backgroundPresets[appearance.backgroundPreset] || backgroundPresets.worldwalker;
  const background = appearance.customBackground ? `url("${appearance.customBackground}")` : preset.image;
  document.documentElement.dataset.theme = state.theme;
  document.documentElement.dataset.density = appearance.density || "compact";
  document.documentElement.style.setProperty("--accent", theme.accent);
  document.documentElement.style.setProperty("--accent-2", theme.accent2);
  document.documentElement.style.setProperty("--aura", theme.aura);
  document.documentElement.style.setProperty("--scene-bg", background);
  document.documentElement.style.setProperty("--scene-dim", String(Math.min(92, Math.max(35, Number(appearance.backgroundDim || 72))) / 100));
}

function xpForNext(level) {
  return Math.round(120 * Math.pow(level, 1.32));
}

function byName(list, name) {
  return list.find((item) => item.name === name);
}

function maybeLevel(entity) {
  while (entity.xp >= xpForNext(entity.level)) {
    entity.xp -= xpForNext(entity.level);
    entity.level += 1;
  }
}

function uid() {
  return crypto.randomUUID();
}

function dateKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function todayQuestIds() {
  return state.completedDailyByDate[dateKey()] || [];
}

function todayXp() {
  const today = dateKey();
  return state.progressLog
    .filter((entry) => entry.timestamp?.slice(0, 10) === today && entry.type === "quest")
    .reduce((sum, entry) => sum + Number(entry.xp || 0), 0);
}

function weeklyXp() {
  const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
  return state.progressLog
    .filter((entry) => new Date(entry.timestamp).getTime() >= cutoff)
    .reduce((sum, entry) => sum + Number(entry.xp || 0), 0);
}

function logProgress(entry) {
  state.progressLog.unshift({
    id: uid(),
    timestamp: new Date().toISOString(),
    title: entry.title,
    type: entry.type || "quest",
    xp: Number(entry.xp || 0),
    coins: Number(entry.coins || 0),
    sphere: entry.sphere || "",
    stats: entry.stats || [],
    comment: entry.comment || "",
    actionId: entry.actionId || "",
    rewardGroup: entry.rewardGroup || "",
  });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setRoute(route) {
  state.route = route;
  state.activeDetail = null;
  saveState();
  render();
}

function toast(message) {
  document.querySelector(".toast")?.remove();
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = message;
  document.body.append(el);
  window.setTimeout(() => el.remove(), 2600);
}

function createSphere(name, color = null) {
  const clean = name.trim();
  if (!clean || byName(state.spheres, clean)) return;
  state.spheres.push({
    id: uid(),
    name: clean,
    level: 1,
    xp: 0,
    color: color || themes[state.theme].accent,
    active: true,
  });
}

function createStat(name) {
  const clean = name.trim();
  if (!clean || byName(state.stats, clean)) return;
  state.stats.push({ id: uid(), name: clean, level: 1, xp: 0, active: true });
}

function createQuest(data) {
  const title = data.get("title")?.trim();
  if (!title) return;
  if ((data.get("type") || "") === "Босс") {
    state.bossFights.unshift({
      id: uid(),
      title,
      sphere: data.get("sphere") || state.spheres[0]?.name || "Без сферы",
      risk: data.get("description")?.trim() || "Крупный личный барьер, который требует серии реальных действий.",
      reward: "Unlock next identity layer",
      rewardGroup: title.toLowerCase().replace(/[^a-zа-я0-9]+/gi, "-").replace(/^-|-$/g, "") || uid(),
      xp: Number(data.get("xp") || 220),
      coins: Number(data.get("coins") || 120),
      steps: [
        "Сформулировать критерий победы",
        "Сделать первый видимый шаг",
        "Закрыть финальное действие",
      ],
      status: "Активен",
    });
    return;
  }
  state.quests.unshift({
    id: uid(),
    title,
    description: data.get("description")?.trim() || "Реальное действие, которое двигает героя вперёд.",
    type: data.get("type") || "Ежедневный",
    sphere: data.get("sphere") || state.spheres[0]?.name || "Без сферы",
    difficulty: data.get("difficulty") || "Нормальный",
    xp: Number(data.get("xp") || 40),
    coins: Number(data.get("coins") || 15),
    stats: [data.get("stat") || state.stats[0]?.name || "Фокус"],
    status: "Активен",
    deadline: data.get("deadline")?.trim() || "Гибко",
  });
}

function createReward(data) {
  const title = data.get("title")?.trim();
  if (!title) return;
  state.rewards.push({
    id: uid(),
    title,
    cost: Number(data.get("cost") || 100),
    category: data.get("category")?.trim() || "Личное",
    status: "Активна",
  });
}

function importTemplate(archetype = state.hero.archetype || "founder") {
  const template = starterTemplates[archetype] || starterTemplates.founder;
  template.spheres.forEach((item) => createSphere(item));
  template.stats.forEach((item) => createStat(item));
  template.quests.forEach(([title, description, type, sphere, difficulty, xp, coins, stats]) => {
    if (state.quests.some((quest) => quest.title === title)) return;
    state.quests.push({ id: uid(), title, description, type, sphere, difficulty, xp, coins, stats, status: "Активен", deadline: "На этой неделе" });
  });
  if (!state.rewards.length) {
    state.rewards.push(
      { id: uid(), title: "Кофе без спешки", cost: 100, category: "Маленькая награда", status: "Активна" },
      { id: uid(), title: "Кино / вечер вне дома", cost: 500, category: "Опыт", status: "Активна" },
      { id: uid(), title: "Покупка для образа", cost: 1000, category: "Стиль", status: "Активна" },
    );
  }
  importBossTemplates(false);
  toast("Стартовый шаблон импортирован.");
}

function importBossTemplates(showMessage = true) {
  bossTemplates.forEach((boss) => {
    if (state.bossFights.some((item) => item.id === boss.id || item.title === boss.title)) return;
    state.bossFights.push({ ...boss, status: "Активен", completedSteps: [] });
    if (!byName(state.spheres, boss.sphere)) createSphere(boss.sphere);
  });
  if (showMessage) toast("Trials добавлены.");
}

function completeQuest(id) {
  const quest = state.quests.find((item) => item.id === id);
  if (!quest || quest.status === "Завершён") return;
  const isDaily = quest.type === "Ежедневный";
  const todayIds = todayQuestIds();
  if (isDaily && todayIds.includes(quest.id)) {
    toast("Этот daily quest уже закрыт сегодня.");
    return;
  }

  const remainingDailyXp = Math.max(0, DAILY_XP_CAP - todayXp());
  const awardedXp = isDaily ? Math.min(quest.xp, remainingDailyXp) : quest.xp;
  if (isDaily && awardedXp <= 0) {
    toast(`Daily XP cap ${DAILY_XP_CAP} уже достигнут.`);
    return;
  }

  if (isDaily) {
    state.completedDailyByDate[dateKey()] = [...todayIds, quest.id];
  } else if (quest.type !== "Еженедельный") {
    quest.status = "Завершён";
  }

  state.hero.xp += awardedXp;
  state.hero.coins += quest.coins;
  maybeLevel(state.hero);

  const sphere = byName(state.spheres, quest.sphere);
  if (sphere) {
    sphere.xp += awardedXp;
    maybeLevel(sphere);
  }

  quest.stats.forEach((name) => {
    const stat = byName(state.stats, name);
    if (stat) {
      stat.xp += Math.round(awardedXp / quest.stats.length);
      maybeLevel(stat);
    }
  });

  const completion = { id: uid(), title: quest.title, xp: awardedXp, coins: quest.coins, date: new Date().toISOString() };
  state.completions.unshift(completion);
  logProgress({
    title: quest.title,
    type: "quest",
    xp: awardedXp,
    coins: quest.coins,
    sphere: quest.sphere,
    stats: quest.stats,
    comment: awardedXp < quest.xp ? "Daily XP cap applied." : quest.description,
    actionId: quest.id,
  });
  finalizeState(state);
  saveState();
  toast(`Квест завершён: +${awardedXp} XP, +${quest.coins} монет`);
  render();
}

function completeBoss(id) {
  const boss = state.bossFights.find((item) => item.id === id);
  if (!boss || boss.status === "Побеждён") return;
  let awardedXp = boss.xp;
  if (boss.rewardGroup && state.rewardGroupsPaid[boss.rewardGroup]) {
    awardedXp = Math.max(0, boss.xp - state.rewardGroupsPaid[boss.rewardGroup]);
  }
  if (boss.rewardGroup) {
    state.rewardGroupsPaid[boss.rewardGroup] = Math.max(state.rewardGroupsPaid[boss.rewardGroup] || 0, boss.xp);
  }
  boss.status = "Побеждён";
  boss.completedSteps = [...(boss.steps || [])];
  state.hero.xp += awardedXp;
  state.hero.coins += boss.coins;
  maybeLevel(state.hero);
  const sphere = byName(state.spheres, boss.sphere);
  if (sphere) {
    sphere.xp += awardedXp;
    maybeLevel(sphere);
  }
  logProgress({
    title: boss.title,
    type: "boss",
    xp: awardedXp,
    coins: boss.coins,
    sphere: boss.sphere,
    comment: `Risk: ${boss.risk}. Reward: ${boss.reward}.`,
    actionId: boss.id,
    rewardGroup: boss.rewardGroup,
  });
  finalizeState(state);
  saveState();
  toast(`Trial cleared: +${awardedXp} XP`);
  render();
}

function redeemReward(id) {
  const reward = state.rewards.find((item) => item.id === id);
  if (!reward) return;
  if (state.hero.coins < reward.cost) {
    toast("Пока не хватает монет.");
    return;
  }
  state.hero.coins -= reward.cost;
  reward.redemptions = Number(reward.redemptions || 0) + 1;
  logProgress({ title: reward.title, type: "reward", xp: 0, coins: -reward.cost, sphere: reward.category, comment: "Reward redeemed", actionId: reward.id });
  finalizeState(state, false);
  saveState();
  toast(`Награда получена: ${reward.title}`);
  render();
}

function transformHero() {
  const stages = ["Новичок", "Подмастерье", "Воин", "Мастер", "Легенда"];
  const nextStage = Math.min(stages.length - 1, state.hero.evolution + 1);
  const required = [1, 5, 10, 20, 35][nextStage];
  if (state.hero.level < required) {
    toast(`Следующая трансформация откроется на уровне ${required}.`);
    return;
  }
  state.hero.evolution = nextStage;
  state.achievements.push(`Трансформация: ${stages[nextStage]}`);
  saveState();
  toast(`Герой трансформирован: ${stages[nextStage]}`);
  render();
}

function hardReset() {
  if (!confirm("Удалить текущий мир и начать с нуля?")) return;
  state = structuredClone(emptyState);
  localStorage.removeItem(STORAGE_KEY);
  applyTheme();
  render();
}

function exportProgress() {
  const payload = {
    app: APP_TITLE,
    version: VERSION,
    schemaVersion: 3,
    exportedAt: new Date().toISOString(),
    state: finalizeState(structuredClone(state), false),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `life-rpg-builder-progress-${dateKey()}.json`;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
  logProgress({ title: "Export JSON backup", type: "export", xp: 0, coins: 0, comment: "Manual backup created" });
  finalizeState(state);
  saveState();
  toast("JSON backup экспортирован.");
}

function importProgressFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      const imported = parsed.state || parsed;
      state = sanitizeState(imported);
      state.onboardingComplete = true;
      state.route = "dashboard";
      logProgress({ title: "Import JSON backup", type: "import", xp: 0, coins: 0, comment: file.name });
      finalizeState(state, false);
      saveState();
      toast("Прогресс импортирован.");
      render();
    } catch {
      toast("Не удалось импортировать JSON.");
    }
  };
  reader.readAsText(file);
}

function importBackgroundFile(file) {
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    toast("Выбери изображение для фона.");
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    state.appearance.customBackground = String(reader.result);
    state.appearance.backgroundPreset = "custom";
    applyTheme();
    saveState();
    toast("Фон мира обновлён.");
    render();
  };
  reader.readAsDataURL(file);
}

function setBackgroundPreset(preset) {
  if (!backgroundPresets[preset]) return;
  state.appearance.backgroundPreset = preset;
  state.appearance.customBackground = "";
  applyTheme();
  saveState();
  render();
}

function resetAppearance() {
  state.appearance = structuredClone(emptyState.appearance);
  applyTheme();
  saveState();
  toast("Внешний вид сброшен.");
  render();
}

function setupShell(content) {
  return `
    <div class="layout setup-layout">
      ${sidebar()}
      <main class="main">
        <header class="topbar">
          <div>
            <div class="version-line">${APP_TITLE} v${VERSION}</div>
            <h2 class="page-title">Создай героя</h2>
            <p class="page-subtitle">Первый запуск: собери свою систему с нуля или импортируй шаблон.</p>
          </div>
          <button class="button ghost" data-action="empty-and-finish">Старт без шаблона</button>
        </header>
        ${content}
      </main>
    </div>
  `;
}

function setupScreen() {
  const steps = ["Идентичность", "Архетип", "Сферы", "Характеристики", "Первый квест", "Награды"];
  return setupShell(`
    <div class="setup-grid">
      <section class="hero-forge panel">
        <div class="forge-figure">
          <div class="body-silhouette">
            <span>${state.hero.name ? state.hero.name.slice(0, 2).toUpperCase() : "?"}</span>
          </div>
          <div class="forge-rings"></div>
        </div>
        <div class="evolution-rail">
          ${["Новичок", "Подмастерье", "Воин", "Мастер", "Легенда"].map((stage, index) => `
            <div class="evolution-node ${index <= state.hero.evolution ? "active" : ""}">
              <span>${index + 1}</span>
              <strong>${stage}</strong>
              <small>Ур. ${[1, 5, 10, 20, 35][index]}</small>
            </div>
          `).join("")}
        </div>
        <div class="forge-copy">
          <h3>Твоё путешествие начинается пустым.</h3>
          <p>Здесь нет навязанного фреймворка. Ты выбираешь класс, сферы жизни, характеристики, квесты и личную экономику.</p>
        </div>
      </section>
      <section class="panel">
        <div class="panel-inner">
          <div class="stepper">
            ${steps.map((step, index) => `<button class="step ${index === state.setupStep ? "active" : ""} ${index < state.setupStep ? "done" : ""}" data-setup-step="${index}"><span>${index + 1}</span>${step}</button>`).join("")}
          </div>
          ${setupStepContent()}
        </div>
      </section>
    </div>
    <div class="setup-footer panel">
      <button class="button" data-action="setup-prev" ${state.setupStep === 0 ? "disabled" : ""}>Назад</button>
      <div class="setup-progress"><span style="width:${((state.setupStep + 1) / steps.length) * 100}%"></span></div>
      <button class="button primary" data-action="setup-next">${state.setupStep === steps.length - 1 ? "Начать сезон" : "Дальше"}</button>
    </div>
  `);
}

function setupStepContent() {
  if (state.setupStep === 0) {
    return `
      <form class="form-grid setup-form" data-form="identity">
        <h3 class="section-title">1. Идентичность</h3>
        <label class="field"><span class="label">Имя героя</span><input class="input" name="name" maxlength="32" value="${escapeHtml(state.hero.name)}" placeholder="Например: Алекс, Виктория, Нова" required></label>
        <label class="field"><span class="label">Кодовое имя</span><input class="input" name="codename" maxlength="32" value="${escapeHtml(state.hero.codename)}" placeholder="Странник, Феникс, Архитектор"></label>
        <label class="field full"><span class="label">Главная миссия</span><textarea class="textarea" name="mission" maxlength="140" placeholder="Зачем ты здесь? Какую трансформацию создаёшь?">${escapeHtml(state.hero.mission)}</textarea></label>
        <div class="theme-grid full">
          ${Object.entries(themes).map(([key, theme]) => `
            <button type="button" class="theme-card ${state.theme === key ? "active" : ""}" data-theme-choice="${key}">
              <span class="theme-gem" style="background:${theme.accent}"></span>
              <strong>${theme.label}</strong>
            </button>
          `).join("")}
        </div>
        <div class="visual-picker full">
          ${heroVisuals.map((visual) => `
            <button type="button" class="visual-card ${state.hero.visual === visual.id ? "active" : ""}" data-hero-visual="${visual.id}">
              <span class="visual-thumb" style="background-position:${visual.position}"></span>
              <strong>${visual.label}</strong>
            </button>
          `).join("")}
        </div>
      </form>
    `;
  }
  if (state.setupStep === 1) {
    return `
      <div class="setup-form">
        <h3 class="section-title">2. Архетип</h3>
        <div class="choice-grid">
          ${archetypes.map((item) => `
            <button class="choice-card ${state.hero.archetype === item.id ? "active" : ""}" data-archetype="${item.id}">
              <strong>${item.label}</strong>
              <span>${item.path}</span>
            </button>
          `).join("")}
        </div>
      </div>
    `;
  }
  if (state.setupStep === 2) {
    return chooserStep("3. Сферы жизни", "Выбери области, которые будут прокачиваться отдельно.", spherePresets, state.spheres, "sphere");
  }
  if (state.setupStep === 3) {
    return chooserStep("4. Характеристики", "Выбери параметры персонажа, которые будут расти от действий.", statPresets, state.stats, "stat");
  }
  if (state.setupStep === 4) {
    return `
      <form class="form-grid setup-form" data-form="first-quest">
        <h3 class="section-title">5. Первый квест</h3>
        <label class="field full"><span class="label">Название</span><input class="input" name="title" placeholder="Например: 60 минут сфокусированной работы"></label>
        <label class="field full"><span class="label">Описание</span><textarea class="textarea" name="description" placeholder="Опиши реальное действие без абстракций."></textarea></label>
        <label class="field"><span class="label">Сфера</span><select class="select" name="sphere">${state.spheres.map((s) => option(s.name)).join("")}</select></label>
        <label class="field"><span class="label">Характеристика</span><select class="select" name="stat">${state.stats.map((s) => option(s.name)).join("")}</select></label>
        <label class="field"><span class="label">XP</span><input class="input" name="xp" type="number" min="1" value="50"></label>
        <label class="field"><span class="label">Монеты</span><input class="input" name="coins" type="number" min="0" value="20"></label>
      </form>
    `;
  }
  return `
    <form class="form-grid setup-form" data-form="first-reward">
      <h3 class="section-title">6. Экономика наград</h3>
      <label class="field"><span class="label">Первая награда</span><input class="input" name="title" placeholder="Кофе, кино, покупка, поездка"></label>
      <label class="field"><span class="label">Стоимость</span><input class="input" name="cost" type="number" min="1" value="100"></label>
      <label class="field full"><span class="label">Категория</span><input class="input" name="category" placeholder="Маленькая награда, опыт, стиль"></label>
      <div class="full info-strip">После старта ты сможешь менять всё: темы, сферы, статы, квесты, награды и трансформации.</div>
    </form>
  `;
}

function chooserStep(title, copy, presets, selected, type) {
  return `
    <div class="setup-form">
      <h3 class="section-title">${title}</h3>
      <p class="muted">${copy}</p>
      <div class="choice-grid compact">
        ${presets.map((item) => `<button class="choice-card ${selected.some((x) => x.name === item) ? "active" : ""}" data-toggle-${type}="${item}"><strong>${item}</strong></button>`).join("")}
      </div>
      <form class="inline-form" data-form="quick-${type}">
        <input class="input" name="name" placeholder="${type === "sphere" ? "Своя сфера" : "Своя характеристика"}">
        <button class="button" type="submit">${icon.plus} Добавить</button>
      </form>
    </div>
  `;
}

function persistVisibleSetupForm() {
  const form = document.querySelector(".setup-form");
  if (!form) return;
  if (!(form instanceof HTMLFormElement)) return;
  const data = new FormData(form);
  if (form.matches('[data-form="identity"]')) {
    state.hero.name = data.get("name")?.trim() || state.hero.name;
    state.hero.codename = data.get("codename")?.trim() || state.hero.codename;
    state.hero.mission = data.get("mission")?.trim() || state.hero.mission;
  }
  if (form.matches('[data-form="first-quest"]') && data.get("title")?.trim()) {
    createQuest(data);
  }
  if (form.matches('[data-form="first-reward"]') && data.get("title")?.trim()) {
    createReward(data);
  }
}

function finishSetup(useTemplate = false) {
  persistVisibleSetupForm();
  if (!state.hero.name) state.hero.name = "Новый герой";
  if (!state.hero.archetype) state.hero.archetype = "custom";
  if (!state.spheres.length) ["Тело", "Разум", "Дисциплина"].forEach((item) => createSphere(item));
  if (!state.stats.length) ["Фокус", "Дисциплина", "Мастерство"].forEach((item) => createStat(item));
  if (useTemplate) importTemplate(state.hero.archetype);
  state.onboardingComplete = true;
  state.route = "dashboard";
  saveState();
  render();
}

function sidebar() {
  const primaryNav = [
    ["dashboard", "Today", icon.dashboard],
    ["hero", "Hero", icon.hero],
    ["quests", "Quests", icon.quests],
    ["review", "Progress", icon.review],
    ["settings", "Settings", icon.settings],
  ];
  const secondaryNav = [
    ["boss", "Trials", icon.boss],
    ["achievements", "Badges", icon.achievements],
    ["transform", "Evolution", icon.transform],
    ["rewards", "Rewards", icon.rewards],
    ["spheres", "World", icon.spheres],
    ["stats", "Stats", icon.stats],
    ["log", "Ledger", icon.log],
  ];
  const navButton = ([route, label, glyph], compact = false) => `
    <button class="nav-button ${compact ? "compact-nav" : ""} ${state.route === route ? "active" : ""}" data-route="${route}" title="${escapeHtml(label)}" aria-label="${escapeHtml(label)}" ${state.route === route ? 'aria-current="page"' : ""} ${!state.onboardingComplete ? "disabled" : ""}>
      <span class="nav-icon">${glyph}</span><span>${label}</span>
    </button>
  `;
  return `
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-mark">LR</div>
        <div>
          <h1 class="brand-title">${APP_NAME} <span>v${VERSION}</span></h1>
          <p class="brand-subtitle">${APP_TAGLINE}</p>
        </div>
      </div>
      <nav class="nav">
        ${primaryNav.map((item) => navButton(item)).join("")}
      </nav>
      <div class="nav-rail">${secondaryNav.map((item) => navButton(item, true)).join("")}</div>
      <div class="sidebar-footer">
        <div class="season-label">Текущий сезон</div>
        <div class="season-name">${escapeHtml(state.hero.season)}</div>
      </div>
    </aside>
  `;
}

function shell(title, subtitle, content, actions = "") {
  return `
    <div class="layout">
      ${sidebar()}
      <main class="main">
        <header class="topbar">
          <div>
            <div class="version-line">${APP_TITLE} v${VERSION}</div>
            <h2 class="page-title">${title}</h2>
            <p class="page-subtitle">${subtitle}</p>
          </div>
          <div class="actions">${actions}</div>
        </header>
        ${content}
        ${detailSheet()}
      </main>
    </div>
  `;
}

function detailSheet() {
  if (!state.activeDetail) return "";
  const isQuest = state.activeDetail.type === "quest";
  const item = isQuest
    ? state.quests.find((quest) => quest.id === state.activeDetail.id)
    : state.bossFights.find((boss) => boss.id === state.activeDetail.id);
  if (!item) return "";
  const title = isQuest ? item.title : item.title;
  const typeLabel = isQuest ? item.type : "Trial";
  const copy = isQuest ? item.description : item.risk;
  const reward = isQuest ? `+${item.xp} XP · +${item.coins} монет · ${item.stats?.join(" / ") || ""}` : `+${item.xp} XP · +${item.coins} монет · ${item.reward}`;
  const action = isQuest
    ? (item.status === "Активен" && !(item.type === "Ежедневный" && todayQuestIds().includes(item.id)) ? `<button class="button primary" data-complete="${item.id}">${icon.check} Complete</button>` : `<span class="tag accent">Completed</span>`)
    : (item.status === "Побеждён" ? `<span class="tag accent">Cleared</span>` : `<button class="button primary" data-complete-boss="${item.id}">${icon.check} Clear trial</button>`);
  return `
    <div class="sheet-backdrop" data-action="close-detail">
      <aside class="detail-sheet" role="dialog" aria-modal="true" aria-label="${escapeHtml(title)}" onclick="event.stopPropagation()">
        <div class="panel-header">
          <div><h3 class="panel-title">${escapeHtml(title)}</h3><p class="panel-note">${escapeHtml(typeLabel)} · ${escapeHtml(item.sphere || "World")}</p></div>
          <button class="icon-button subtle" data-action="close-detail" aria-label="Close">${icon.x}</button>
        </div>
        <div class="panel-inner detail-body">
          <p>${escapeHtml(copy || "No description yet.")}</p>
          ${!isQuest && item.steps?.length ? `<ol class="trial-steps">${item.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>` : ""}
          <div class="reward-line">${escapeHtml(reward)}</div>
          <div class="actions">${action}<button class="button" data-route="${isQuest ? "quests" : "boss"}">Open screen</button></div>
        </div>
      </aside>
    </div>
  `;
}

function heroCard() {
  const next = xpForNext(state.hero.level);
  const archetype = archetypes.find((item) => item.id === state.hero.archetype)?.label || "Свой класс";
  const visual = heroVisuals.find((item) => item.id === state.hero.visual) || heroVisuals[0];
  return `
    <section class="panel hero-card">
      <div class="avatar-orbit"><div class="avatar hero-avatar-art" style="background-position:${visual.position}"><span>${escapeHtml((state.hero.codename || state.hero.name || "?").slice(0, 2).toUpperCase())}</span></div></div>
      <div class="hero-copy">
        <h3>${escapeHtml(state.hero.name || "Безымянный герой")}</h3>
        <div class="meta-row">
          <span class="tag accent">${archetype}</span>
          <span class="tag">Уровень ${state.hero.level}</span>
          <span class="tag">${evolutionName()}</span>
        </div>
        <p>${escapeHtml(state.hero.mission || "Миссия ещё не задана.")}</p>
      </div>
      <div class="level-block">
        <div class="level-top"><span>XP героя</span><span>${state.hero.xp}/${next}</span></div>
        <div class="progress"><span style="width:${Math.min(100, (state.hero.xp / next) * 100)}%"></span></div>
      </div>
    </section>
  `;
}

function evolutionName() {
  return ["Новичок", "Подмастерье", "Воин", "Мастер", "Легенда"][state.hero.evolution] || "Новичок";
}

function dashboard() {
  return shell(
    "Today",
    "Твой текущий сезон, активные квесты, сферы жизни и экономика наград.",
    `
      <div class="dashboard-grid">
        <div class="grid">
          ${heroCard()}
          <section class="panel"><div class="panel-inner metric-row">
            <div class="metric"><strong>${todayXp()}</strong><span>XP сегодня</span></div>
            <div class="metric"><strong>${weeklyXp()}</strong><span>XP за 7 дней</span></div>
            <div class="metric"><strong>${state.bossFights.filter((b) => b.status === "Активен").length}</strong><span>Trials</span></div>
            <div class="metric"><strong>${state.unlockedAchievements.length}/${achievementCatalog.length}</strong><span>Badges</span></div>
          </div></section>
          <section class="panel">
            <div class="panel-header">
              <div><h3 class="panel-title">Активные квесты</h3><p class="panel-note">Каждое действие меняет героя и систему.</p></div>
              <button class="button primary" data-route="quests">${icon.plus} Новый квест</button>
            </div>
            <div class="panel-inner quest-list">${activeQuests().slice(0, 6).map(questCard).join("") || empty("Создай первый квест в разделе Квесты.")}</div>
          </section>
        </div>
        <div class="grid">
          <section class="panel"><div class="panel-header"><h3 class="panel-title">Сферы жизни</h3><button class="link-button" data-route="spheres">Управлять</button></div><div class="panel-inner mini-grid">${state.spheres.slice(0, 6).map(sphereCard).join("") || empty("Сфер пока нет.")}</div></section>
          <section class="panel"><div class="panel-header"><h3 class="panel-title">Trials</h3><button class="link-button" data-route="boss">Открыть</button></div><div class="panel-inner quest-list">${state.bossFights.slice(0, 2).map(bossCard).join("") || emptyAction("Испытаний пока нет.", "Добавить шаблоны", "import-bosses")}</div></section>
          <section class="panel"><div class="panel-header"><h3 class="panel-title">Характеристики</h3><button class="link-button" data-route="stats">Настроить</button></div><div class="panel-inner mini-grid">${state.stats.slice(0, 6).map(statCard).join("") || empty("Характеристик пока нет.")}</div></section>
          <section class="panel"><div class="panel-header"><h3 class="panel-title">Награды</h3><span class="tag accent">${state.hero.coins} монет</span></div><div class="panel-inner reward-list">${state.rewards.slice(0, 3).map(rewardCard).join("") || empty("Создай личные награды.")}</div></section>
        </div>
      </div>
    `,
    `<button class="button" data-action="import-template">Starter pack</button><button class="button" data-route="log">Ledger</button><button class="button primary" data-route="transform">Evolution</button>`,
  );
}

function activeQuests() {
  return state.quests.filter((quest) => quest.status === "Активен");
}

function questCard(quest) {
  const doneToday = quest.type === "Ежедневный" && todayQuestIds().includes(quest.id);
  return `
    <article class="quest-card clickable-card" data-open-quest="${quest.id}" tabindex="0" role="button" aria-label="${escapeHtml(quest.title)}">
      <div>
        <h4>${escapeHtml(quest.title)}</h4>
        <p>${escapeHtml(quest.description)}</p>
        <div class="meta-row">
          <span class="tag">${escapeHtml(quest.type)}</span>
          <span class="tag">${escapeHtml(quest.sphere)}</span>
          <span class="tag">${escapeHtml(quest.difficulty)}</span>
          <span class="tag">${escapeHtml(quest.deadline)}</span>
        </div>
        <div class="reward-line">+${quest.xp} XP · +${quest.coins} монет · ${quest.stats.map(escapeHtml).join(" / ")}</div>
      </div>
      <div class="card-actions">
        ${quest.status === "Активен" && !doneToday ? `<button class="icon-button" title="Завершить" data-complete="${quest.id}">${icon.check}</button>` : `<span class="tag accent">${doneToday ? "Сегодня закрыт" : "Завершён"}</span>`}
        <button class="icon-button subtle" title="Удалить" data-delete-quest="${quest.id}">${icon.x}</button>
      </div>
    </article>
  `;
}

function bossCard(boss) {
  return `
    <article class="quest-card boss-card clickable-card" data-open-boss="${boss.id}" tabindex="0" role="button" aria-label="${escapeHtml(boss.title)}">
      <div>
        <h4>${escapeHtml(boss.title)}</h4>
        <p>${escapeHtml(boss.steps?.join(" → ") || "High-risk quest")}</p>
        <div class="meta-row">
          <span class="tag accent">${escapeHtml(boss.sphere)}</span>
          <span class="tag">Risk: ${escapeHtml(boss.risk)}</span>
          <span class="tag">Reward: ${escapeHtml(boss.reward)}</span>
        </div>
        <div class="reward-line">+${boss.xp} XP · +${boss.coins} монет${boss.rewardGroup ? ` · ${escapeHtml(boss.rewardGroup)}` : ""}</div>
      </div>
      <div class="card-actions">
        ${boss.status === "Побеждён" ? `<span class="tag accent">Cleared</span>` : `<button class="button primary" data-complete-boss="${boss.id}">Clear</button>`}
      </div>
    </article>
  `;
}

function achievementCard(achievement) {
  const unlocked = state.unlockedAchievements.includes(achievement.id);
  return `
    <article class="achievement-card ${unlocked ? "unlocked" : ""}">
      <div class="achievement-medal">${unlocked ? "✓" : "?"}</div>
      <div>
        <h4>${escapeHtml(achievement.title)}</h4>
        <p>${escapeHtml(achievement.condition)}</p>
        <div class="meta-row">
          <span class="tag">${escapeHtml(achievement.category)}</span>
          <span class="tag accent">${escapeHtml(achievement.rarity)}</span>
          <span class="tag">${unlocked ? "Открыта" : "Закрыта"}</span>
        </div>
      </div>
    </article>
  `;
}

function sphereCard(sphere) {
  const next = xpForNext(sphere.level);
  return `
    <article class="small-card">
      <div class="card-top"><strong>${escapeHtml(sphere.name)}</strong><span>Lv ${sphere.level}</span></div>
      <div class="progress small-progress"><span style="width:${Math.min(100, (sphere.xp / next) * 100)}%"></span></div>
      <small>${sphere.xp}/${next} XP</small>
    </article>
  `;
}

function statCard(stat) {
  const next = xpForNext(stat.level);
  return `
    <article class="small-card">
      <div class="card-top"><strong>${escapeHtml(stat.name)}</strong><span>Lv ${stat.level}</span></div>
      <div class="progress small-progress"><span style="width:${Math.min(100, (stat.xp / next) * 100)}%"></span></div>
      <small>${stat.xp}/${next} XP</small>
    </article>
  `;
}

function rewardCard(reward) {
  return `
    <article class="reward-card">
      <div><h4>${escapeHtml(reward.title)}</h4><p>${escapeHtml(reward.category)}${reward.redemptions ? ` · ${reward.redemptions}x` : ""}</p></div>
      <button class="button" data-redeem="${reward.id}">${reward.cost} · Взять</button>
    </article>
  `;
}

function heroScreen() {
  return shell(
    "Герой",
    "Редактируй идентичность, миссию, сезон и визуальную тему.",
    `
      <div class="split">
        ${heroCard()}
        <section class="panel"><div class="panel-header"><h3 class="panel-title">Редактор героя</h3></div><div class="panel-inner">${heroEditor()}</div></section>
      </div>
    `,
  );
}

function heroEditor() {
  return `
    <form class="form-grid" data-form="hero-edit">
      <label class="field"><span class="label">Имя</span><input class="input" name="name" value="${escapeHtml(state.hero.name)}"></label>
      <label class="field"><span class="label">Кодовое имя</span><input class="input" name="codename" value="${escapeHtml(state.hero.codename)}"></label>
      <label class="field"><span class="label">Сезон</span><input class="input" name="season" value="${escapeHtml(state.hero.season)}"></label>
      <label class="field"><span class="label">Архетип</span><select class="select" name="archetype">${archetypes.map((a) => option(a.id, a.label, state.hero.archetype === a.id)).join("")}</select></label>
      <label class="field full"><span class="label">Миссия</span><textarea class="textarea" name="mission">${escapeHtml(state.hero.mission)}</textarea></label>
      <label class="field full"><span class="label">Девиз</span><input class="input" name="motto" value="${escapeHtml(state.hero.motto)}"></label>
      <div class="theme-grid full">${Object.entries(themes).map(([key, theme]) => `<button type="button" class="theme-card ${state.theme === key ? "active" : ""}" data-theme-choice="${key}"><span class="theme-gem" style="background:${theme.accent}"></span><strong>${theme.label}</strong></button>`).join("")}</div>
      <div class="visual-picker full">${heroVisuals.map((visual) => `<button type="button" class="visual-card ${state.hero.visual === visual.id ? "active" : ""}" data-hero-visual="${visual.id}"><span class="visual-thumb" style="background-position:${visual.position}"></span><strong>${visual.label}</strong></button>`).join("")}</div>
      <button class="button primary" type="submit">Сохранить героя</button>
    </form>
  `;
}

function questsScreen() {
  return shell(
    "Квесты",
    "Создавай действия, которые начисляют XP, монеты и рост характеристик.",
    `
      <div class="split">
        <section class="panel"><div class="panel-header"><h3 class="panel-title">Новый квест</h3></div><div class="panel-inner">${questForm()}</div></section>
        <section class="panel"><div class="panel-header"><h3 class="panel-title">Журнал квестов</h3><span class="tag">${state.quests.length}</span></div><div class="panel-inner quest-list">${state.quests.map(questCard).join("") || empty("Квестов пока нет.")}</div></section>
      </div>
    `,
  );
}

function questForm() {
  return `
    <form class="form-grid" data-form="quest">
      <label class="field full"><span class="label">Название</span><input class="input" name="title" required placeholder="Например: 90 минут deep work"></label>
      <label class="field full"><span class="label">Описание</span><textarea class="textarea" name="description" placeholder="Что именно нужно сделать?"></textarea></label>
      <label class="field"><span class="label">Тип</span><select class="select" name="type">${["Ежедневный", "Еженедельный", "Главный", "Побочный", "Босс"].map((x) => option(x, x === "Босс" ? "Trial" : x)).join("")}</select></label>
      <label class="field"><span class="label">Сфера</span><select class="select" name="sphere">${state.spheres.map((s) => option(s.name)).join("")}</select></label>
      <label class="field"><span class="label">Сложность</span><select class="select" name="difficulty">${["Лёгкий", "Нормальный", "Сложный", "Trial"].map((x) => option(x)).join("")}</select></label>
      <label class="field"><span class="label">Характеристика</span><select class="select" name="stat">${state.stats.map((s) => option(s.name)).join("")}</select></label>
      <label class="field"><span class="label">XP</span><input class="input" name="xp" type="number" min="1" value="50"></label>
      <label class="field"><span class="label">Монеты</span><input class="input" name="coins" type="number" min="0" value="20"></label>
      <label class="field full"><span class="label">Дедлайн</span><input class="input" name="deadline" placeholder="Сегодня, пятница, 2026-07-01"></label>
      <button class="button primary" type="submit">${icon.plus} Добавить квест</button>
    </form>
  `;
}

function bossScreen() {
  return shell(
    "Trials",
    "Высокий риск, высокая награда: отдельные испытания, которые меняют идентичность героя.",
    `
      <div class="grid">
        <section class="panel"><div class="panel-header"><h3 class="panel-title">Trial templates</h3><button class="button" data-action="import-bosses">Добавить шаблоны</button></div>
          <div class="panel-inner mini-grid">
            ${bossTemplates.map((boss) => `<article class="small-card"><strong>${escapeHtml(boss.title)}</strong><small>${escapeHtml(boss.risk)} · +${boss.xp} XP</small></article>`).join("")}
          </div>
        </section>
        <section class="panel"><div class="panel-header"><h3 class="panel-title">Активные испытания</h3><span class="tag">${state.bossFights.length}</span></div>
          <div class="panel-inner quest-list">${state.bossFights.map(bossCard).join("") || emptyAction("Испытаний пока нет.", "Добавить шаблоны", "import-bosses")}</div>
        </section>
      </div>
    `,
  );
}

function achievementsScreen() {
  return shell(
    "Badges",
    "Значимые события героя: locked, ready и unlocked состояния.",
    `
      <section class="panel">
        <div class="panel-header"><h3 class="panel-title">Badges</h3><span class="tag accent">${state.unlockedAchievements.length}/${achievementCatalog.length}</span></div>
        <div class="panel-inner achievement-grid">${achievementCatalog.map(achievementCard).join("")}</div>
      </section>
    `,
  );
}

function logScreen() {
  const entries = state.progressLog.slice(0, 80);
  const types = [...new Set(state.progressLog.map((entry) => entry.type))];
  return shell(
    "Ledger",
    "Event ledger: квесты, испытания, награды, badges, импорт и экспорт.",
    `
      <section class="panel">
        <div class="panel-header">
          <div><h3 class="panel-title">Ledger</h3><p class="panel-note">Всего событий: ${state.progressLog.length}. Типы: ${types.join(", ") || "—"}.</p></div>
          <button class="button" data-action="export-progress">Export JSON</button>
        </div>
        <div class="panel-inner review-list">
          ${entries.map((entry) => `<article class="review-item"><span>${new Date(entry.timestamp).toLocaleDateString()}</span><strong>${escapeHtml(entry.title)}</strong><small>${escapeHtml(entry.type)} · ${entry.xp >= 0 ? "+" : ""}${entry.xp} XP · ${entry.coins >= 0 ? "+" : ""}${entry.coins} монет · ${escapeHtml(entry.sphere || "")}</small></article>`).join("") || empty("Журнал пуст. Заверши квест или trial.")}
        </div>
      </section>
    `,
  );
}

function builderListScreen(kind) {
  const isSphere = kind === "spheres";
  const list = isSphere ? state.spheres : state.stats;
  const title = isSphere ? "Сферы жизни" : "Характеристики";
  const subtitle = isSphere ? "Твои реальные области жизни: тело, деньги, творчество, отношения или любые свои направления." : "Параметры персонажа, которые растут от квестов.";
  return shell(
    title,
    subtitle,
    `
      <div class="split">
        <section class="panel"><div class="panel-header"><h3 class="panel-title">Добавить</h3></div><div class="panel-inner">
          <form class="inline-form" data-form="${isSphere ? "sphere" : "stat"}">
            <input class="input" name="name" placeholder="${isSphere ? "Например: Музыка, Сон, Бизнес" : "Например: Лидерство, Сцена"}" required>
            <button class="button primary" type="submit">${icon.plus} Добавить</button>
          </form>
        </div></section>
        <section class="panel"><div class="panel-header"><h3 class="panel-title">${title}</h3><span class="tag">${list.length}</span></div><div class="panel-inner mini-grid">
          ${list.map((item) => `<div class="builder-item">${isSphere ? sphereCard(item) : statCard(item)}<button class="button danger" data-delete-${isSphere ? "sphere" : "stat"}="${item.id}">Удалить ${escapeHtml(item.name)}</button></div>`).join("") || empty("Пока пусто. Добавь первый элемент через форму слева.")}
        </div></section>
      </div>
    `,
  );
}

function transformScreen() {
  const visual = heroVisuals.find((item) => item.id === state.hero.visual) || heroVisuals[0];
  return shell(
    "Трансформация",
    "Не просто уровни: герой меняет стадию развития и визуальную идентичность.",
    `
      <div class="transform-grid">
        <section class="panel hero-forge compact-forge">
          <div class="forge-figure"><div class="body-silhouette evolved-${state.hero.evolution}" style="background-position:${visual.position}"><span>${evolutionName()}</span></div><div class="forge-rings"></div></div>
          <button class="button primary" data-action="transform">Трансформировать героя</button>
        </section>
        <section class="panel"><div class="panel-header"><h3 class="panel-title">Путь эволюции</h3></div><div class="panel-inner evolution-list">
          ${["Новичок", "Подмастерье", "Воин", "Мастер", "Легенда"].map((stage, index) => `<div class="evolution-row ${index <= state.hero.evolution ? "active" : ""}"><strong>${stage}</strong><span>Уровень ${[1, 5, 10, 20, 35][index]}</span></div>`).join("")}
        </div></section>
      </div>
    `,
  );
}

function rewardsScreen() {
  return shell(
    "Награды",
    "Своя экономика: монеты превращаются в личные награды.",
    `
      <div class="split">
        <section class="panel"><div class="panel-header"><h3 class="panel-title">Создать награду</h3><span class="tag accent">${state.hero.coins} монет</span></div><div class="panel-inner">
          <form class="form-grid" data-form="reward">
            <label class="field"><span class="label">Название</span><input class="input" name="title" required placeholder="Кино, одежда, поездка"></label>
            <label class="field"><span class="label">Стоимость</span><input class="input" name="cost" type="number" min="1" value="100"></label>
            <label class="field full"><span class="label">Категория</span><input class="input" name="category" placeholder="Опыт, стиль, отдых"></label>
            <button class="button primary" type="submit">${icon.plus} Добавить</button>
          </form>
        </div></section>
        <section class="panel"><div class="panel-header"><h3 class="panel-title">Магазин</h3></div><div class="panel-inner reward-list">${state.rewards.map(rewardCard).join("") || empty("Наград пока нет.")}</div></section>
      </div>
    `,
  );
}

function reviewScreen() {
  const xp = state.completions.reduce((sum, item) => sum + item.xp, 0);
  const coins = state.completions.reduce((sum, item) => sum + item.coins, 0);
  return shell(
    "Progress",
    "Сводка прогресса, завершённых действий, badges и слабых зон.",
    `
      <div class="grid">
        <section class="panel"><div class="panel-inner metric-row">
          <div class="metric"><strong>${xp}</strong><span>XP получено</span></div>
          <div class="metric"><strong>${coins}</strong><span>Монет получено</span></div>
          <div class="metric"><strong>${state.completions.length}</strong><span>Квестов закрыто</span></div>
          <div class="metric"><strong>${weakestSphere()?.name || "—"}</strong><span>Нужен фокус</span></div>
        </div></section>
        <section class="panel"><div class="panel-header"><h3 class="panel-title">История</h3></div><div class="panel-inner review-list">
          ${state.completions.map((item) => `<article class="review-item"><span>${new Date(item.date).toLocaleDateString()}</span><strong>${escapeHtml(item.title)}</strong><small>+${item.xp} XP · +${item.coins} монет</small></article>`).join("") || empty("История появится после завершения квестов.")}
        </div></section>
      </div>
    `,
  );
}

function settingsScreen() {
  const appearance = state.appearance || emptyState.appearance;
  return shell(
    "Настройки",
    "Appearance, data, starter packs and world reset.",
    `
      <div class="grid">
        <section class="panel"><div class="panel-header"><h3 class="panel-title">Appearance Studio</h3><span class="tag accent">${backgroundPresets[appearance.backgroundPreset]?.label || "Custom"}</span></div><div class="panel-inner control-grid">
          <div><h4>World background</h4><p class="muted">Выбери встроенную сцену или загрузи свой фон.</p><div class="preset-row">${Object.entries(backgroundPresets).map(([key, preset]) => `<button class="theme-card ${appearance.backgroundPreset === key && !appearance.customBackground ? "active" : ""}" data-bg-preset="${key}"><strong>${preset.label}</strong></button>`).join("")}</div><label class="button file-button">Upload image<input type="file" accept="image/*" data-background-file></label></div>
          <div><h4>Screen fit</h4><p class="muted">Dim регулирует читаемость на фоне. Density помогает уместить UI на MacBook.</p><label class="field"><span class="label">Background dim</span><input class="input" type="range" min="35" max="92" value="${appearance.backgroundDim}" data-background-dim></label><label class="field"><span class="label">Density</span><select class="select" data-density><option value="compact" ${appearance.density === "compact" ? "selected" : ""}>Compact</option><option value="comfortable" ${appearance.density === "comfortable" ? "selected" : ""}>Comfortable</option></select></label><button class="button" data-action="reset-appearance">Reset appearance</button></div>
        </div></section>
        <section class="panel"><div class="panel-header"><h3 class="panel-title">Backup</h3></div><div class="panel-inner control-grid">
          <div><h4>Export JSON</h4><p class="muted">Сохраняет героя, квесты, trials, badges, награды и журнал прогресса.</p><button class="button primary" data-action="export-progress">Export backup</button></div>
          <div><h4>Import JSON</h4><p class="muted">Восстанавливает сохранение и пересчитывает badges.</p><label class="button file-button">Import backup<input type="file" accept="application/json,.json" data-import-file></label></div>
        </div></section>
        <section class="panel"><div class="panel-header"><h3 class="panel-title">Starter packs</h3></div><div class="panel-inner actions"><button class="button" data-action="import-template">Импортировать стартовый шаблон</button><button class="button" data-action="import-bosses">Добавить trials</button></div></section>
        <section class="panel"><div class="panel-header"><h3 class="panel-title">Опасная зона</h3></div><div class="panel-inner"><button class="button danger" data-action="hard-reset">Удалить мир и начать с нуля</button></div></section>
      </div>
    `,
  );
}

function weakestSphere() {
  return [...state.spheres].sort((a, b) => a.level - b.level || a.xp - b.xp)[0];
}

function empty(text) {
  return `<div class="empty">${text}</div>`;
}

function emptyAction(text, label, action) {
  return `<div class="empty empty-action"><span>${text}</span><button class="button" data-action="${action}">${label}</button></div>`;
}

function option(value, label = value, selected = false) {
  return `<option value="${escapeHtml(value)}" ${selected ? "selected" : ""}>${escapeHtml(label)}</option>`;
}

function render() {
  applyTheme();
  if (!state.onboardingComplete || state.route === "setup") {
    document.querySelector("#app").innerHTML = setupScreen();
    return;
  }
  const views = {
    dashboard,
    hero: heroScreen,
    quests: questsScreen,
    spheres: () => builderListScreen("spheres"),
    stats: () => builderListScreen("stats"),
    transform: transformScreen,
    rewards: rewardsScreen,
    review: reviewScreen,
    settings: settingsScreen,
    boss: bossScreen,
    achievements: achievementsScreen,
    log: logScreen,
  };
  document.querySelector("#app").innerHTML = (views[state.route] || dashboard)();
}

document.addEventListener("click", (event) => {
  const submitButton = event.target.closest('button[type="submit"]');
  if (submitButton?.form?.dataset.form) {
    event.preventDefault();
    handleFormSubmit(submitButton.form);
    return;
  }

  const route = event.target.closest("[data-route]")?.dataset.route;
  if (route && state.onboardingComplete) setRoute(route);

  const setupStep = event.target.closest("[data-setup-step]")?.dataset.setupStep;
  if (setupStep !== undefined) {
    persistVisibleSetupForm();
    state.setupStep = Number(setupStep);
    saveState();
    render();
  }

  const themeChoice = event.target.closest("[data-theme-choice]")?.dataset.themeChoice;
  if (themeChoice) {
    persistVisibleSetupForm();
    state.theme = themeChoice;
    saveState();
    render();
  }

  const archetype = event.target.closest("[data-archetype]")?.dataset.archetype;
  if (archetype) {
    persistVisibleSetupForm();
    state.hero.archetype = archetype;
    if (heroVisuals.some((visual) => visual.id === archetype)) state.hero.visual = archetype;
    saveState();
    render();
  }

  const heroVisual = event.target.closest("[data-hero-visual]")?.dataset.heroVisual;
  if (heroVisual) {
    persistVisibleSetupForm();
    state.hero.visual = heroVisual;
    saveState();
    render();
  }

  const backgroundPreset = event.target.closest("[data-bg-preset]")?.dataset.bgPreset;
  if (backgroundPreset) setBackgroundPreset(backgroundPreset);

  const sphere = event.target.closest("[data-toggle-sphere]")?.dataset.toggleSphere;
  if (sphere) {
    persistVisibleSetupForm();
    const found = byName(state.spheres, sphere);
    state.spheres = found ? state.spheres.filter((item) => item.name !== sphere) : [...state.spheres, { id: uid(), name: sphere, level: 1, xp: 0, color: themes[state.theme].accent, active: true }];
    saveState();
    render();
  }

  const stat = event.target.closest("[data-toggle-stat]")?.dataset.toggleStat;
  if (stat) {
    persistVisibleSetupForm();
    const found = byName(state.stats, stat);
    state.stats = found ? state.stats.filter((item) => item.name !== stat) : [...state.stats, { id: uid(), name: stat, level: 1, xp: 0, active: true }];
    saveState();
    render();
  }

  const action = event.target.closest("[data-action]")?.dataset.action;
  if (action === "setup-next") {
    if (state.setupStep >= 5) finishSetup(false);
    else {
      persistVisibleSetupForm();
      state.setupStep += 1;
      saveState();
      render();
    }
  }
  if (action === "setup-prev") {
    persistVisibleSetupForm();
    state.setupStep = Math.max(0, state.setupStep - 1);
    saveState();
    render();
  }
  if (action === "empty-and-finish") finishSetup(false);
  if (action === "import-template") {
    importTemplate();
    saveState();
    render();
  }
  if (action === "import-bosses") {
    importBossTemplates();
    saveState();
    render();
  }
  if (action === "export-progress") {
    exportProgress();
    saveState();
    render();
  }
  if (action === "reset-appearance") resetAppearance();
  if (action === "close-detail") {
    state.activeDetail = null;
    saveState();
    render();
  }
  if (action === "transform") transformHero();
  if (action === "hard-reset") hardReset();

  const questDetail = event.target.closest("[data-open-quest]")?.dataset.openQuest;
  if (questDetail && !event.target.closest("button, input, select, textarea, label, a")) {
    state.activeDetail = { type: "quest", id: questDetail };
    saveState();
    render();
  }

  const bossDetail = event.target.closest("[data-open-boss]")?.dataset.openBoss;
  if (bossDetail && !event.target.closest("button, input, select, textarea, label, a")) {
    state.activeDetail = { type: "boss", id: bossDetail };
    saveState();
    render();
  }

  const complete = event.target.closest("[data-complete]")?.dataset.complete;
  if (complete) completeQuest(complete);

  const completeBossId = event.target.closest("[data-complete-boss]")?.dataset.completeBoss;
  if (completeBossId) completeBoss(completeBossId);

  const redeem = event.target.closest("[data-redeem]")?.dataset.redeem;
  if (redeem) redeemReward(redeem);

  const deleteQuest = event.target.closest("[data-delete-quest]")?.dataset.deleteQuest;
  if (deleteQuest) {
    if (!confirm("Удалить этот квест?")) return;
    state.quests = state.quests.filter((quest) => quest.id !== deleteQuest);
    saveState();
    render();
  }

  const deleteSphere = event.target.closest("[data-delete-sphere]")?.dataset.deleteSphere;
  if (deleteSphere) {
    const sphere = state.spheres.find((item) => item.id === deleteSphere);
    const isReferenced = sphere && (
      state.quests.some((quest) => quest.sphere === sphere.name) ||
      state.bossFights.some((boss) => boss.sphere === sphere.name)
    );
    if (isReferenced) {
      toast("Сфера используется в квестах или trials.");
      return;
    }
    if (!confirm("Удалить эту сферу?")) return;
    state.spheres = state.spheres.filter((item) => item.id !== deleteSphere);
    saveState();
    render();
  }

  const deleteStat = event.target.closest("[data-delete-stat]")?.dataset.deleteStat;
  if (deleteStat) {
    const stat = state.stats.find((item) => item.id === deleteStat);
    const isReferenced = stat && state.quests.some((quest) => quest.stats.includes(stat.name));
    if (isReferenced) {
      toast("Характеристика используется в квестах.");
      return;
    }
    if (!confirm("Удалить эту характеристику?")) return;
    state.stats = state.stats.filter((item) => item.id !== deleteStat);
    saveState();
    render();
  }
});

document.addEventListener("change", (event) => {
  const input = event.target.closest("[data-import-file]");
  if (input?.files?.[0]) {
    importProgressFile(input.files[0]);
    input.value = "";
    return;
  }
  const backgroundInput = event.target.closest("[data-background-file]");
  if (backgroundInput?.files?.[0]) {
    importBackgroundFile(backgroundInput.files[0]);
    backgroundInput.value = "";
    return;
  }
  const dim = event.target.closest("[data-background-dim]");
  if (dim) {
    state.appearance.backgroundDim = Number(dim.value);
    applyTheme();
    saveState();
    return;
  }
  const density = event.target.closest("[data-density]");
  if (density) {
    state.appearance.density = density.value;
    applyTheme();
    saveState();
    render();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && state.activeDetail) {
    state.activeDetail = null;
    saveState();
    render();
    return;
  }
  if (!["Enter", " "].includes(event.key)) return;
  const quest = document.activeElement?.closest?.("[data-open-quest]");
  const boss = document.activeElement?.closest?.("[data-open-boss]");
  if (quest) {
    event.preventDefault();
    state.activeDetail = { type: "quest", id: quest.dataset.openQuest };
    saveState();
    render();
  }
  if (boss) {
    event.preventDefault();
    state.activeDetail = { type: "boss", id: boss.dataset.openBoss };
    saveState();
    render();
  }
});

document.addEventListener("submit", (event) => {
  event.preventDefault();
  handleFormSubmit(event.target);
});

function handleFormSubmit(form) {
  if (!(form instanceof HTMLFormElement)) return;
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  const data = new FormData(form);
  if (form.matches('[data-form="quick-sphere"], [data-form="sphere"]')) {
    createSphere(data.get("name"));
    toast("Сфера добавлена.");
  }
  if (form.matches('[data-form="quick-stat"], [data-form="stat"]')) {
    createStat(data.get("name"));
    toast("Характеристика добавлена.");
  }
  if (form.matches('[data-form="quest"]')) {
    createQuest(data);
    toast(data.get("type") === "Босс" ? "Trial создан." : "Квест создан.");
  }
  if (form.matches('[data-form="reward"]')) {
    createReward(data);
    toast("Награда создана.");
  }
  if (form.matches('[data-form="hero-edit"]')) {
    state.hero.name = data.get("name")?.trim() || state.hero.name;
    state.hero.codename = data.get("codename")?.trim() || "";
    state.hero.season = data.get("season")?.trim() || state.hero.season;
    state.hero.archetype = data.get("archetype") || state.hero.archetype;
    state.hero.mission = data.get("mission")?.trim() || "";
    state.hero.motto = data.get("motto")?.trim() || "";
    toast("Герой сохранён.");
  }
  form.reset();
  saveState();
  render();
}

render();
