export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Life-RPG-Key");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ ok:false, error:"method_not_allowed" });

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const requiredKey = process.env.LIFE_RPG_WEBHOOK_KEY;

  if (!token || !chatId) return res.status(500).json({ ok:false, error:"telegram_not_configured" });
  if (requiredKey && req.headers["x-life-rpg-key"] !== requiredKey) {
    return res.status(401).json({ ok:false, error:"unauthorized" });
  }

  const text = String(req.body?.text || "").slice(0, 3900);
  if (!text) return res.status(400).json({ ok:false, error:"empty_text" });

  const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({ chat_id:chatId, text }),
  });

  const payload = await tg.json().catch(() => ({}));
  if (!tg.ok) return res.status(502).json({ ok:false, error:"telegram_failed", payload });
  return res.status(200).json({ ok:true });
}
