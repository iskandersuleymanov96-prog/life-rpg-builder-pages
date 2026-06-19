export default async function handler(req, res) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return res.status(500).json({ ok:false, error:"telegram_not_configured" });

  const text = [
    "Life RPG reminder",
    "",
    "Открой приложение, выбери главный квест дня и отметь прогресс.",
    "Если хочешь прислать точный список задач сюда: Сообщество → Отправить сообщение.",
  ].join("\n");

  const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({ chat_id:chatId, text }),
  });
  const payload = await tg.json().catch(() => ({}));
  return res.status(tg.ok ? 200 : 502).json({ ok:tg.ok, payload });
}
