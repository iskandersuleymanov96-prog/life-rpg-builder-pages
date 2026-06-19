export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Life-RPG-Key");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ ok:false, error:"method_not_allowed" });

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const fallbackChatId = process.env.TELEGRAM_CHAT_ID;
  const requiredKey = process.env.LIFE_RPG_WEBHOOK_KEY;
  const requestedChatId = String(req.body?.chatId || fallbackChatId || "").trim();
  const allowedChatIds = String(process.env.TELEGRAM_ALLOWED_CHAT_IDS || fallbackChatId || "")
    .split(",")
    .map(v => v.trim())
    .filter(Boolean);

  if (!token || !requestedChatId) return res.status(500).json({ ok:false, error:"telegram_not_configured" });
  if (allowedChatIds.length && !allowedChatIds.includes(requestedChatId)) {
    return res.status(403).json({ ok:false, error:"chat_not_allowed" });
  }
  if (requiredKey && req.headers["x-life-rpg-key"] !== requiredKey) {
    return res.status(401).json({ ok:false, error:"unauthorized" });
  }

  const text = String(req.body?.text || "").slice(0, 3900);
  if (!text) return res.status(400).json({ ok:false, error:"empty_text" });

  const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({ chat_id:requestedChatId, text }),
  });

  const payload = await tg.json().catch(() => ({}));
  if (!tg.ok) return res.status(502).json({ ok:false, error:"telegram_failed", payload });
  return res.status(200).json({ ok:true });
}
