export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ ok:false, error:"method_not_allowed" });
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return res.status(500).json({ ok:false, error:"telegram_not_configured" });
  const tg = await fetch(`https://api.telegram.org/bot${token}/getMe`);
  const payload = await tg.json().catch(() => ({}));
  return res.status(tg.ok ? 200 : 502).json(payload);
}
