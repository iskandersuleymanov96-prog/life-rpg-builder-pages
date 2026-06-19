export default async function handler(req, res) {
  if (!["GET", "POST"].includes(req.method)) return res.status(405).json({ ok:false, error:"method_not_allowed" });

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const baseUrl = process.env.APP_BASE_URL || `https://${req.headers.host}`;
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;

  if (!token) return res.status(500).json({ ok:false, error:"telegram_not_configured" });

  const webhookUrl = `${baseUrl.replace(/\/$/, "")}/api/telegram/webhook`;
  const response = await fetch(`https://api.telegram.org/bot${token}/setWebhook`, {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({
      url:webhookUrl,
      secret_token:secret || undefined,
      allowed_updates:["message"],
      drop_pending_updates:false,
    }),
  });

  const payload = await response.json().catch(() => ({}));
  return res.status(response.ok ? 200 : 502).json({ ok:response.ok, webhookUrl, payload });
}
