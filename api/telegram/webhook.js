const json = (res, status, body) => res.status(status).json(body);

async function sendMessage(token, chatId, text) {
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({ chat_id:chatId, text }),
  });
  return response.ok;
}

function helpText() {
  return [
    "Life RPG подключён.",
    "",
    "/today — получить задачи на сегодня",
    "/remind — включить короткое напоминание",
    "/ping — проверить связь",
    "/help — команды",
    "",
    "Чтобы отправить реальные текущие квесты, нажми в приложении: Сообщество → Отправить сообщение.",
  ].join("\n");
}

export default async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { ok:false, error:"method_not_allowed" });

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const fallbackChatId = process.env.TELEGRAM_CHAT_ID;
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;

  if (!token) return json(res, 500, { ok:false, error:"telegram_not_configured" });
  if (secret && req.headers["x-telegram-bot-api-secret-token"] !== secret) {
    return json(res, 401, { ok:false, error:"unauthorized" });
  }

  const message = req.body?.message;
  const text = String(message?.text || "").trim();
  const chatId = message?.chat?.id || fallbackChatId;
  if (!chatId) return json(res, 200, { ok:true, ignored:true });

  const command = text.split(/\s+/)[0].toLowerCase();
  let reply = helpText();

  if (command === "/start") {
    reply = [
      "Life RPG подключён.",
      "Теперь бот может принимать команды и получать сообщения из приложения.",
      `Chat ID: ${chatId}`,
      "",
      "Этот Chat ID нужно один раз добавить в Vercel как TELEGRAM_CHAT_ID.",
      "Открой приложение → Сообщество → Отправить сообщение, чтобы прислать текущие квесты.",
    ].join("\n");
  }
  if (command === "/today") {
    reply = [
      "Сегодня в Life RPG:",
      "1. Открой приложение.",
      "2. Проверь активные квесты.",
      "3. Нажми «Отправить сообщение» в Сообществе, чтобы прислать актуальный список задач сюда.",
    ].join("\n");
  }
  if (command === "/remind") reply = "Напоминания включаются в приложении: Сообщество → Включить напоминания.";
  if (command === "/ping") reply = "Связь с Life RPG работает.";

  await sendMessage(token, chatId, reply);
  return json(res, 200, { ok:true });
}
