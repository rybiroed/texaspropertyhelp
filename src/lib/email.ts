import { Resend } from "resend";

const FROM = process.env.RESEND_FROM_EMAIL || "noreply@texaspropertyhelp.com";
const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || "help@texaspropertyhelp.com";

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export interface LeadEmailData {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  zipCode: string;
  propertyType: string;
  helpNeeded: string[];
  urgency: string;
  description?: string;
  preferredLanguage: string;
  sourcePage?: string;
}

const URGENCY_LABEL: Record<string, string> = {
  emergency: "🚨 EMERGENCY",
  urgent: "⚠️ Urgent",
  soon: "Soon",
  planning: "Planning Ahead",
};

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function sendAdminNotification(lead: LeadEmailData): Promise<void> {
  const resend = getResend();
  if (!resend) return;

  const urgency = URGENCY_LABEL[lead.urgency] ?? lead.urgency;
  const helpSummary = lead.helpNeeded.slice(0, 2).join(", ");

  const rows = [
    ["Name", lead.fullName],
    ["Phone", lead.phone],
    ["Email", lead.email],
    ["City / ZIP", `${lead.city}, TX ${lead.zipCode}`],
    ["Property Type", lead.propertyType],
    ["Help Needed", lead.helpNeeded.join(", ")],
    ["Urgency", urgency],
    ["Language", lead.preferredLanguage],
    ["Source Page", lead.sourcePage ?? "—"],
    ...(lead.description ? [["Notes", escapeHtml(lead.description)]] : []),
  ]
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;width:160px;">${k}</td><td style="padding:8px;border-bottom:1px solid #eee;">${v}</td></tr>`
    )
    .join("");

  const html = `
    <h2 style="font-family:sans-serif;">New Lead — Texas Property Help</h2>
    <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px;">${rows}</table>
  `;

  await resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `New Lead [${urgency}]: ${helpSummary} — ${lead.city}, TX`,
    html,
  });
}

export async function sendHomeownerConfirmation(lead: LeadEmailData): Promise<void> {
  const resend = getResend();
  if (!resend) return;

  const isES = lead.preferredLanguage === "es";
  const helpList = lead.helpNeeded.join(", ");

  const html = isES
    ? `<div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a;">
        <h2 style="color:#76b900;">Hola, ${escapeHtml(lead.fullName)}</h2>
        <p>Hemos recibido su solicitud. Nuestro equipo revisará su situación y lo conectaremos con los recursos adecuados para su propiedad en ${escapeHtml(lead.city)}, TX.</p>
        <p><strong>Solicitó ayuda con:</strong> ${helpList}</p>
        <p>Si tiene una emergencia activa, llame al 911 o a su proveedor de seguros de inmediato.</p>
        <p style="color:#555;font-size:12px;margin-top:24px;">Texas Property Help es una plataforma de información y derivación — no somos contratistas, aseguradores ni bufetes de abogados.</p>
      </div>`
    : `<div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a;">
        <h2 style="color:#76b900;">Hi, ${escapeHtml(lead.fullName)}</h2>
        <p>We received your request. Our team will review your situation and connect you with the right resources for your ${escapeHtml(lead.city)}, TX property.</p>
        <p><strong>You requested help with:</strong> ${helpList}</p>
        <p>If you have an active emergency, call 911 or your insurance provider immediately.</p>
        <p style="color:#555;font-size:12px;margin-top:24px;">Texas Property Help is an informational and referral platform — we are not a contractor, insurer, or law firm.</p>
      </div>`;

  await resend.emails.send({
    from: FROM,
    to: lead.email,
    subject: isES
      ? "Recibimos su solicitud — Texas Property Help"
      : "We received your request — Texas Property Help",
    html,
  });
}
