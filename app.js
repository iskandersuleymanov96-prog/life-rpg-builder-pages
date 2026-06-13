const VERSION = "0.2.0";
const STORAGE_KEY = "life-rpg-builder-state-v2";

const icon = {
  dashboard: `<svg viewBox="0 0 24 24"><path d="M4 13h6V4H4v9Zm10 7h6V4h-6v16ZM4 20h6v-4H4v4Z"/></svg>`,
  hero: `<svg viewBox="0 0 24 24"><path d="M12 3l7 4v5c0 4.7-2.7 7.7-7 9-4.3-1.3-7-4.3-7-9V7l7-4Z"/><path d="M9 12l2 2 4-5"/></svg>`,
  quests: `<svg viewBox="0 0 24 24"><path d="M7 4h10l2 3v13H5V7l2-3Z"/><path d="M8 9h8M8 13h8M8 17h5"/></svg>`,
  spheres: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M12 3v18M3 12h18M5.7 5.7l12.6 12.6M18.3 5.7 5.7 18.3"/></svg>`,
  stats: `<svg viewBox="0 0 24 24"><path d="M5 19V9M12 19V5M19 19v-7M3 19h18"/></svg>`,
  transform: `<svg viewBox="0 0 24 24"><path d="M12 3l3 6 6 3-6 3-3 6-3-6-6-3 6-3 3-6Z"/><path d="M19 4v4M21 6h-4"/></svg>`,
  rewards: `<svg viewBox="0 0 24 24"><path d="M5 11h14v10H5V11ZM4 7h16v4H4V7Z"/><path d="M12 7v14M12 7c-2.7 0-4.5-3-2-4 1.7-.7 2.7 1.2 2 4Zm0 0c2.7 0 4.5-3 2-4-1.7-.7-2.7 1.2-2 4Z"/></svg>`,
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
      ["Босс: 7 дней без срыва", "Соблюдать выбранный протокол неделю.", "Босс", "Дисциплина", "Босс", 420, 150, ["Дисциплина"]],
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
  },
  spheres: [],
  stats: [],
  quests: [],
  rewards: [],
  achievements: [],
  completions: [],
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
    return { ...structuredClone(emptyState), ...JSON.parse(stored), version: VERSION };
  } catch {
    return structuredClone(emptyState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function applyTheme() {
  const theme = themes[state.theme] || themes.ice;
  document.documentElement.dataset.theme = state.theme;
  document.documentElement.style.setProperty("--accent", theme.accent);
  document.documentElement.style.setProperty("--accent-2", theme.accent2);
  document.documentElement.style.setProperty("--aura", theme.aura);
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
  toast("Стартовый шаблон импортирован.");
}

function completeQuest(id) {
  const quest = state.quests.find((item) => item.id === id);
  if (!quest || quest.status === "Завершён") return;

  quest.status = "Завершён";
  state.hero.xp += quest.xp;
  state.hero.coins += quest.coins;
  maybeLevel(state.hero);

  const sphere = byName(state.spheres, quest.sphere);
  if (sphere) {
    sphere.xp += quest.xp;
    maybeLevel(sphere);
  }

  quest.stats.forEach((name) => {
    const stat = byName(state.stats, name);
    if (stat) {
      stat.xp += Math.round(quest.xp / quest.stats.length);
      maybeLevel(stat);
    }
  });

  state.completions.unshift({ id: uid(), title: quest.title, xp: quest.xp, coins: quest.coins, date: new Date().toISOString() });
  if (!state.achievements.includes("Первый квест завершён")) state.achievements.push("Первый квест завершён");
  saveState();
  toast(`Квест завершён: +${quest.xp} XP, +${quest.coins} монет`);
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
  reward.status = "Получена";
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

function setupShell(content) {
  return `
    <div class="layout setup-layout">
      ${sidebar()}
      <main class="main">
        <header class="topbar">
          <div>
            <div class="version-line">Life RPG Builder v${VERSION}</div>
            <h2 class="page-title">Создай героя</h2>
            <p class="page-subtitle">Первый запуск: собери свою систему с нуля или импортируй шаблон.</p>
          </div>
          <button class="button ghost" data-action="import-and-finish">Пропустить создание</button>
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
      <button class="button" data-action="setup-prev">Назад</button>
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
  if (useTemplate || !state.quests.length) importTemplate(state.hero.archetype);
  if (!state.rewards.length) {
    state.rewards.push({ id: uid(), title: "Личная награда", cost: 100, category: "Custom", status: "Активна" });
  }
  state.onboardingComplete = true;
  state.route = "dashboard";
  saveState();
  render();
}

function sidebar() {
  const nav = [
    ["dashboard", "Панель", icon.dashboard],
    ["hero", "Герой", icon.hero],
    ["quests", "Квесты", icon.quests],
    ["spheres", "Сферы жизни", icon.spheres],
    ["stats", "Характеристики", icon.stats],
    ["transform", "Трансформация", icon.transform],
    ["rewards", "Награды", icon.rewards],
    ["review", "Обзор", icon.review],
    ["settings", "Настройки", icon.settings],
  ];
  return `
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-mark">LR</div>
        <div>
          <h1 class="brand-title">Life RPG Builder <span>v${VERSION}</span></h1>
          <p class="brand-subtitle">Personal RPG OS</p>
        </div>
      </div>
      <nav class="nav">
        ${nav.map(([route, label, glyph]) => `
          <button class="nav-button ${state.route === route ? "active" : ""}" data-route="${route}" ${!state.onboardingComplete ? "disabled" : ""}>
            <span class="nav-icon">${glyph}</span><span>${label}</span>
          </button>
        `).join("")}
      </nav>
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
            <div class="version-line">Life RPG Builder v${VERSION}</div>
            <h2 class="page-title">${title}</h2>
            <p class="page-subtitle">${subtitle}</p>
          </div>
          <div class="actions">${actions}</div>
        </header>
        ${content}
      </main>
    </div>
  `;
}

function heroCard() {
  const next = xpForNext(state.hero.level);
  const archetype = archetypes.find((item) => item.id === state.hero.archetype)?.label || "Свой класс";
  return `
    <section class="panel hero-card">
      <div class="avatar-orbit"><div class="avatar">${escapeHtml((state.hero.codename || state.hero.name || "?").slice(0, 2).toUpperCase())}</div></div>
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
    "Панель управления",
    "Твой текущий сезон, активные квесты, сферы жизни и экономика наград.",
    `
      <div class="dashboard-grid">
        <div class="grid">
          ${heroCard()}
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
          <section class="panel"><div class="panel-header"><h3 class="panel-title">Характеристики</h3><button class="link-button" data-route="stats">Настроить</button></div><div class="panel-inner mini-grid">${state.stats.slice(0, 6).map(statCard).join("") || empty("Характеристик пока нет.")}</div></section>
          <section class="panel"><div class="panel-header"><h3 class="panel-title">Награды</h3><span class="tag accent">${state.hero.coins} монет</span></div><div class="panel-inner reward-list">${state.rewards.slice(0, 3).map(rewardCard).join("") || empty("Создай личные награды.")}</div></section>
        </div>
      </div>
    `,
    `<button class="button" data-action="import-template">Импорт шаблона</button><button class="button primary" data-route="transform">Трансформация</button>`,
  );
}

function activeQuests() {
  return state.quests.filter((quest) => quest.status === "Активен");
}

function questCard(quest) {
  return `
    <article class="quest-card">
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
        ${quest.status === "Активен" ? `<button class="icon-button" title="Завершить" data-complete="${quest.id}">${icon.check}</button>` : `<span class="tag accent">Завершён</span>`}
        <button class="icon-button subtle" title="Удалить" data-delete-quest="${quest.id}">${icon.x}</button>
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
    <article class="reward-card ${reward.status === "Получена" ? "muted-card" : ""}">
      <div><h4>${escapeHtml(reward.title)}</h4><p>${escapeHtml(reward.category)}</p></div>
      <button class="button" data-redeem="${reward.id}" ${reward.status === "Получена" ? "disabled" : ""}>${reward.cost} · ${reward.status === "Получена" ? "Получена" : "Взять"}</button>
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
      <label class="field"><span class="label">Тип</span><select class="select" name="type">${["Ежедневный", "Еженедельный", "Главный", "Побочный", "Босс"].map((x) => option(x)).join("")}</select></label>
      <label class="field"><span class="label">Сфера</span><select class="select" name="sphere">${state.spheres.map((s) => option(s.name)).join("")}</select></label>
      <label class="field"><span class="label">Сложность</span><select class="select" name="difficulty">${["Лёгкий", "Нормальный", "Сложный", "Босс"].map((x) => option(x)).join("")}</select></label>
      <label class="field"><span class="label">Характеристика</span><select class="select" name="stat">${state.stats.map((s) => option(s.name)).join("")}</select></label>
      <label class="field"><span class="label">XP</span><input class="input" name="xp" type="number" min="1" value="50"></label>
      <label class="field"><span class="label">Монеты</span><input class="input" name="coins" type="number" min="0" value="20"></label>
      <label class="field full"><span class="label">Дедлайн</span><input class="input" name="deadline" placeholder="Сегодня, пятница, 2026-07-01"></label>
      <button class="button primary" type="submit">${icon.plus} Добавить квест</button>
    </form>
  `;
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
          ${list.map((item) => `${isSphere ? sphereCard(item) : statCard(item)}<button class="button danger" data-delete-${isSphere ? "sphere" : "stat"}="${item.id}">Удалить ${escapeHtml(item.name)}</button>`).join("") || empty("Пока пусто.")}
        </div></section>
      </div>
    `,
  );
}

function transformScreen() {
  return shell(
    "Трансформация",
    "Не просто уровни: герой меняет стадию развития и визуальную идентичность.",
    `
      <div class="transform-grid">
        <section class="panel hero-forge compact-forge">
          <div class="forge-figure"><div class="body-silhouette evolved-${state.hero.evolution}"><span>${evolutionName()}</span></div><div class="forge-rings"></div></div>
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
    "Обзор",
    "Сводка прогресса, завершённых действий и слабых зон.",
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
  return shell(
    "Настройки",
    "Управление миром, шаблонами и сбросом.",
    `
      <div class="grid">
        <section class="panel"><div class="panel-header"><h3 class="panel-title">Шаблоны</h3></div><div class="panel-inner"><button class="button" data-action="import-template">Импортировать стартовый шаблон</button></div></section>
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
  };
  document.querySelector("#app").innerHTML = (views[state.route] || dashboard)();
}

document.addEventListener("click", (event) => {
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
    saveState();
    render();
  }

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
  if (action === "import-and-finish") finishSetup(true);
  if (action === "import-template") {
    importTemplate();
    saveState();
    render();
  }
  if (action === "transform") transformHero();
  if (action === "hard-reset") hardReset();

  const complete = event.target.closest("[data-complete]")?.dataset.complete;
  if (complete) completeQuest(complete);

  const redeem = event.target.closest("[data-redeem]")?.dataset.redeem;
  if (redeem) redeemReward(redeem);

  const deleteQuest = event.target.closest("[data-delete-quest]")?.dataset.deleteQuest;
  if (deleteQuest) {
    state.quests = state.quests.filter((quest) => quest.id !== deleteQuest);
    saveState();
    render();
  }

  const deleteSphere = event.target.closest("[data-delete-sphere]")?.dataset.deleteSphere;
  if (deleteSphere) {
    state.spheres = state.spheres.filter((item) => item.id !== deleteSphere);
    saveState();
    render();
  }

  const deleteStat = event.target.closest("[data-delete-stat]")?.dataset.deleteStat;
  if (deleteStat) {
    state.stats = state.stats.filter((item) => item.id !== deleteStat);
    saveState();
    render();
  }
});

document.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;
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
    toast("Квест создан.");
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
});

render();
