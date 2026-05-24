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
  // Lead intelligence
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  referrer?: string | null;
  landingPage?: string | null;
  userAgent?: string | null;
  ipHash?: string | null;
}

// ─── Label maps ───────────────────────────────────────────────────────────────

const URGENCY_CONFIG: Record<string, { badge: string; subject: string; color: string; bg: string }> = {
  emergency: { badge: "🚨 EMERGENCY",    subject: "EMERGENCY",    color: "#ffffff", bg: "#c53030" },
  urgent:    { badge: "⚠️ Urgent",       subject: "URGENT",       color: "#ffffff", bg: "#c05621" },
  soon:      { badge: "📅 Soon",         subject: "SOON",         color: "#ffffff", bg: "#2d7a4f" },
  planning:  { badge: "📋 Planning Ahead", subject: "PLANNING",   color: "#ffffff", bg: "#2b6cb0" },
};

const HELP_LABELS: Record<string, string> = {
  "storm-damage":             "Storm Damage Assessment",
  "roof-inspection":          "Roof Inspection",
  "roof-repair":              "Roof Repair",
  "roof-replacement":         "Roof Replacement",
  "hvac-repair":              "HVAC Repair",
  "hvac-replacement":         "HVAC Replacement",
  "insurance-claim-guidance": "Insurance Claim Guidance",
  "repair-financing":         "Repair Financing Help",
  "emergency-repair":         "Emergency Repair",
  "general-repair":           "General Property Repair",
  "other":                    "Other / Not Sure",
};

const PROPERTY_LABELS: Record<string, string> = {
  "single-family":       "Single-Family Home",
  "townhouse":           "Townhouse",
  "condo":               "Condo / Apartment",
  "duplex-multiplex":    "Duplex / Multi-Unit",
  "mobile-manufactured": "Mobile / Manufactured Home",
  "commercial":          "Commercial Property",
  "other":               "Other",
};

// ─── HTML helpers ─────────────────────────────────────────────────────────────

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

/** Escape and return "—" for null/undefined/empty. */
function e(value: string | null | undefined): string {
  if (!value) return "—";
  return escapeHtml(value);
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 12px;background:#f9f9f9;font-size:11px;font-weight:700;color:#888888;text-transform:uppercase;letter-spacing:0.06em;width:130px;vertical-align:top;border-bottom:1px solid #eeeeee;white-space:nowrap;">${label}</td>
    <td style="padding:8px 12px;font-size:14px;color:#1a1a1a;border-bottom:1px solid #eeeeee;vertical-align:top;word-break:break-word;">${value}</td>
  </tr>`;
}

function sectionHead(title: string): string {
  return `<tr><td colspan="2" style="padding:20px 12px 6px;font-size:10px;font-weight:700;color:#76b900;text-transform:uppercase;letter-spacing:0.1em;border-bottom:2px solid #76b900;">${title}</td></tr>`;
}

// ─── Admin email ──────────────────────────────────────────────────────────────

function buildAdminHtml(lead: LeadEmailData): string {
  const urg = URGENCY_CONFIG[lead.urgency] ?? { badge: lead.urgency, subject: lead.urgency, color: "#fff", bg: "#666" };
  const propertyLabel = PROPERTY_LABELS[lead.propertyType] ?? escapeHtml(lead.propertyType);
  const langLabel = lead.preferredLanguage === "es" ? "Spanish / Español" : "English";

  const helpItems = lead.helpNeeded
    .map((t) => `<li style="margin-bottom:4px;">${HELP_LABELS[t] ?? escapeHtml(t)}</li>`)
    .join("");

  const notesRow = lead.description
    ? row("Notes", `<span style="white-space:pre-wrap;">${escapeHtml(lead.description)}</span>`)
    : "";

  const intelRows = [
    ["Source Page",   e(lead.sourcePage)],
    ["UTM Source",    e(lead.utmSource)],
    ["UTM Medium",    e(lead.utmMedium)],
    ["UTM Campaign",  e(lead.utmCampaign)],
    ["Referrer",      e(lead.referrer)],
    ["Landing Page",  e(lead.landingPage)],
    ["User Agent",    e(lead.userAgent)],
    ["IP Hash",       e(lead.ipHash)],
  ].map(([k, v]) => row(k, v)).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#eeeeee;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#eeeeee;padding:32px 16px;">
  <tr><td align="center">
  <table width="620" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;width:100%;border-radius:4px;overflow:hidden;">

    <!-- Header -->
    <tr>
      <td style="background:#000000;padding:20px 24px;">
        <p style="margin:0 0 4px;font-size:10px;font-weight:700;color:#76b900;text-transform:uppercase;letter-spacing:0.12em;">Texas Property Help</p>
        <p style="margin:0;font-size:20px;font-weight:700;color:#ffffff;">New Lead Notification</p>
      </td>
    </tr>

    <!-- Urgency banner -->
    <tr>
      <td style="background:${urg.bg};padding:10px 24px;">
        <p style="margin:0;font-size:13px;font-weight:700;color:${urg.color};">${urg.badge}</p>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="background:#ffffff;padding:4px 24px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #eeeeee;border-radius:4px;overflow:hidden;margin-top:20px;">
          ${sectionHead("Contact")}
          ${row("Name",     e(lead.fullName))}
          ${row("Phone",    e(lead.phone))}
          ${row("Email",    `<a href="mailto:${escapeHtml(lead.email)}" style="color:#76b900;text-decoration:none;">${escapeHtml(lead.email)}</a>`)}
          ${row("Location", `${e(lead.city)}, TX ${e(lead.zipCode)}`)}
          ${row("Language", langLabel)}

          ${sectionHead("Request")}
          ${row("Help Needed",    `<ul style="margin:0;padding-left:16px;line-height:1.7;">${helpItems}</ul>`)}
          ${row("Property Type",  propertyLabel)}
          ${row("Urgency",        urg.badge)}
          ${notesRow}

          ${sectionHead("Lead Intelligence")}
          ${intelRows}
        </table>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background:#f9f9f9;padding:14px 24px;border-top:1px solid #dddddd;">
        <p style="margin:0;font-size:11px;color:#aaaaaa;">Generated by the Texas Property Help lead capture system. Do not reply to this email.</p>
      </td>
    </tr>

  </table>
  </td></tr>
</table>
</body>
</html>`;
}

function buildAdminText(lead: LeadEmailData): string {
  const urg = URGENCY_CONFIG[lead.urgency]?.subject ?? lead.urgency.toUpperCase();
  const sep = "─".repeat(44);
  const lines = [
    "NEW LEAD — Texas Property Help",
    sep,
    `URGENCY: ${urg}`,
    "",
    "CONTACT",
    `  Name:     ${lead.fullName}`,
    `  Phone:    ${lead.phone}`,
    `  Email:    ${lead.email}`,
    `  Location: ${lead.city}, TX ${lead.zipCode}`,
    `  Language: ${lead.preferredLanguage === "es" ? "Spanish" : "English"}`,
    "",
    "REQUEST",
    `  Help Needed:   ${lead.helpNeeded.map((t) => HELP_LABELS[t] ?? t).join(", ")}`,
    `  Property Type: ${PROPERTY_LABELS[lead.propertyType] ?? lead.propertyType}`,
    `  Urgency:       ${urg}`,
    ...(lead.description ? [`  Notes:         ${lead.description}`] : []),
    "",
    "LEAD INTELLIGENCE",
    `  Source Page:   ${lead.sourcePage ?? "—"}`,
    `  UTM Source:    ${lead.utmSource ?? "—"}`,
    `  UTM Medium:    ${lead.utmMedium ?? "—"}`,
    `  UTM Campaign:  ${lead.utmCampaign ?? "—"}`,
    `  Referrer:      ${lead.referrer ?? "—"}`,
    `  Landing Page:  ${lead.landingPage ?? "—"}`,
    `  User Agent:    ${lead.userAgent ?? "—"}`,
    `  IP Hash:       ${lead.ipHash ?? "—"}`,
  ];
  return lines.join("\n");
}

// ─── Homeowner confirmation email ─────────────────────────────────────────────

function buildHomeownerHtml(lead: LeadEmailData): string {
  const isES = lead.preferredLanguage === "es";
  const name = e(lead.fullName);
  const city = e(lead.city);
  const isEmergency = lead.urgency === "emergency" || lead.urgency === "urgent";

  const helpItems = lead.helpNeeded
    .map((t) => `<li style="margin-bottom:6px;">${HELP_LABELS[t] ?? escapeHtml(t)}</li>`)
    .join("");

  const emergencyBox = isEmergency
    ? `<tr><td style="padding:0 24px 20px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr><td style="background:#fff5f5;border:1px solid #fc8181;border-left:4px solid #c53030;border-radius:4px;padding:12px 16px;">
            <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#c53030;">${isES ? "⚠️ Emergencia activa" : "⚠️ Active emergency"}</p>
            <p style="margin:0;font-size:13px;color:#333333;line-height:1.5;">${isES ? "Llame al 911 o a su proveedor de seguros de inmediato. No espere nuestra respuesta." : "Call 911 or your insurance provider immediately. Do not wait for our response."}</p>
          </td></tr>
        </table>
      </td></tr>`
    : "";

  const header = isES
    ? `<p style="margin:0 0 2px;font-size:10px;font-weight:700;color:#76b900;text-transform:uppercase;letter-spacing:0.12em;">Texas Property Help</p>
       <p style="margin:0;font-size:15px;color:rgba(255,255,255,0.7);">Confirmación de solicitud</p>`
    : `<p style="margin:0 0 2px;font-size:10px;font-weight:700;color:#76b900;text-transform:uppercase;letter-spacing:0.12em;">Texas Property Help</p>
       <p style="margin:0;font-size:15px;color:rgba(255,255,255,0.7);">Request Confirmation</p>`;

  const bodyContent = isES
    ? `<p style="margin:0 0 16px;font-size:20px;font-weight:700;color:#1a1a1a;">Hola, ${name}</p>
       <p style="margin:0 0 16px;font-size:15px;color:#444444;line-height:1.65;">Hemos recibido su solicitud. Nuestro equipo la revisará y lo conectaremos con los proveedores de servicios o recursos relevantes para su propiedad en <strong>${city}, TX</strong>.</p>
       <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#1a1a1a;text-transform:uppercase;letter-spacing:0.05em;">Solicitó ayuda con:</p>
       <ul style="margin:0 0 20px;padding-left:18px;font-size:14px;color:#444444;line-height:1.7;">${helpItems}</ul>
       <p style="margin:0 0 16px;font-size:15px;color:#444444;line-height:1.65;">Un miembro del equipo revisará su solicitud y lo contactará para discutir los próximos pasos.</p>`
    : `<p style="margin:0 0 16px;font-size:20px;font-weight:700;color:#1a1a1a;">Hi, ${name}</p>
       <p style="margin:0 0 16px;font-size:15px;color:#444444;line-height:1.65;">We&apos;ve received your request. Our team will review your situation and connect you with relevant service providers or resources for your property in <strong>${city}, TX</strong>.</p>
       <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#1a1a1a;text-transform:uppercase;letter-spacing:0.05em;">You requested help with:</p>
       <ul style="margin:0 0 20px;padding-left:18px;font-size:14px;color:#444444;line-height:1.7;">${helpItems}</ul>
       <p style="margin:0 0 16px;font-size:15px;color:#444444;line-height:1.65;">A team member will review your request and be in touch to discuss next steps.</p>`;

  const disclaimer = isES
    ? "Texas Property Help es una plataforma de información y derivación que ayuda a conectar a los propietarios de viviendas en Texas con proveedores de servicios y recursos relevantes. No somos contratistas, aseguradores ni bufetes de abogados, y no garantizamos ningún resultado específico."
    : "Texas Property Help is an informational and referral platform that helps connect Texas homeowners with relevant service providers and resources. We are not a contractor, insurer, or law firm, and we do not guarantee any specific outcome.";

  return `<!DOCTYPE html>
<html lang="${isES ? "es" : "en"}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#eeeeee;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#eeeeee;padding:32px 16px;">
  <tr><td align="center">
  <table width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;border-radius:4px;overflow:hidden;">

    <!-- Header -->
    <tr>
      <td style="background:#000000;padding:20px 24px;">${header}</td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="background:#ffffff;padding:28px 24px 20px;">
        ${bodyContent}
      </td>
    </tr>

    <!-- Emergency box -->
    ${emergencyBox}

    <!-- Disclaimer -->
    <tr>
      <td style="background:#ffffff;padding:0 24px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr><td style="background:#f4f4f4;border-radius:4px;padding:14px 16px;font-size:12px;color:#777777;line-height:1.65;">${disclaimer}</td></tr>
        </table>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background:#f9f9f9;padding:12px 24px;border-top:1px solid #dddddd;">
        <p style="margin:0;font-size:11px;color:#aaaaaa;">&copy; 2026 Texas Property Help &middot; <a href="https://texaspropertyhelp.com/privacy-policy" style="color:#aaaaaa;text-decoration:underline;">${isES ? "Política de privacidad" : "Privacy Policy"}</a></p>
      </td>
    </tr>

  </table>
  </td></tr>
</table>
</body>
</html>`;
}

function buildHomeownerText(lead: LeadEmailData): string {
  const isES = lead.preferredLanguage === "es";
  const isEmergency = lead.urgency === "emergency" || lead.urgency === "urgent";
  const sep = "─".repeat(44);
  const helpList = lead.helpNeeded.map((t) => `  • ${HELP_LABELS[t] ?? t}`);

  if (isES) {
    return [
      "Texas Property Help — Confirmación de solicitud",
      sep,
      "",
      `Hola, ${lead.fullName},`,
      "",
      `Hemos recibido su solicitud de ${lead.city}, TX. Nuestro equipo la revisará`,
      "y lo conectaremos con los proveedores de servicios o recursos relevantes.",
      "",
      "Solicitó ayuda con:",
      ...helpList,
      "",
      ...(isEmergency
        ? [
            "⚠️  EMERGENCIA ACTIVA",
            "Llame al 911 o a su proveedor de seguros de inmediato.",
            "No espere nuestra respuesta.",
            "",
          ]
        : []),
      "Un miembro del equipo revisará su solicitud y lo contactará pronto.",
      "",
      sep,
      "Texas Property Help es una plataforma de información y derivación que ayuda",
      "a conectar a los propietarios de viviendas en Texas con proveedores de",
      "servicios y recursos relevantes. No somos contratistas, aseguradores ni",
      "bufetes de abogados, y no garantizamos ningún resultado específico.",
      "https://texaspropertyhelp.com",
    ].join("\n");
  }

  return [
    "Texas Property Help — Request Confirmation",
    sep,
    "",
    `Hi, ${lead.fullName},`,
    "",
    `We've received your request from ${lead.city}, TX. Our team will review your`,
    "situation and connect you with relevant service providers or resources.",
    "",
    "You requested help with:",
    ...helpList,
    "",
    ...(isEmergency
      ? [
          "⚠️  ACTIVE EMERGENCY",
          "Call 911 or your insurance provider immediately.",
          "Do not wait for our response.",
          "",
        ]
      : []),
    "A team member will review your request and be in touch to discuss next steps.",
    "",
    sep,
    "Texas Property Help is an informational and referral platform that helps",
    "connect Texas homeowners with relevant service providers and resources.",
    "We are not a contractor, insurer, or law firm, and we do not guarantee",
    "any specific outcome.",
    "https://texaspropertyhelp.com",
  ].join("\n");
}

// ─── Contractor admin email ───────────────────────────────────────────────────

export interface ContractorEmailData {
  company_name: string;
  contact_name: string | null;
  phone: string;
  email: string | null;
  trade: string;
  zip_code: string | null;
  service_radius_miles: number;
  service_area: string[];
  languages: string[];
  emergency_available: boolean;
  notes: string | null;
  status: string;
}

function buildContractorAdminHtml(d: ContractorEmailData): string {
  const areaStr = d.service_area.length > 0 ? escapeHtml(d.service_area.join(", ")) : "—";
  const langStr = d.languages.length > 0 ? escapeHtml(d.languages.join(", ")) : "—";
  const emailCell = d.email
    ? `<a href="mailto:${escapeHtml(d.email)}" style="color:#76b900;text-decoration:none;">${escapeHtml(d.email)}</a>`
    : "—";

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#eeeeee;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#eeeeee;padding:32px 16px;">
  <tr><td align="center">
  <table width="620" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;width:100%;border-radius:4px;overflow:hidden;">
    <tr>
      <td style="background:#000000;padding:20px 24px;">
        <p style="margin:0 0 4px;font-size:10px;font-weight:700;color:#76b900;text-transform:uppercase;letter-spacing:0.12em;">Texas Property Help</p>
        <p style="margin:0;font-size:20px;font-weight:700;color:#ffffff;">New Contractor Application</p>
      </td>
    </tr>
    <tr>
      <td style="background:#ffffff;padding:4px 24px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #eeeeee;border-radius:4px;overflow:hidden;margin-top:20px;">
          ${sectionHead("Company")}
          ${row("Company",  e(d.company_name))}
          ${row("Contact",  e(d.contact_name))}
          ${row("Phone",    e(d.phone))}
          ${row("Email",    emailCell)}
          ${sectionHead("Service Profile")}
          ${row("Trade",            e(d.trade))}
          ${row("ZIP Code",         e(d.zip_code))}
          ${row("Service Radius",   `${d.service_radius_miles} miles`)}
          ${row("Service Area",     areaStr)}
          ${row("Languages",        langStr)}
          ${row("Emergency Calls",  d.emergency_available ? "Yes" : "No")}
          ${d.notes ? row("Notes", `<span style="white-space:pre-wrap;">${escapeHtml(d.notes)}</span>`) : ""}
          ${sectionHead("Application")}
          ${row("Status", e(d.status))}
        </table>
      </td>
    </tr>
    <tr>
      <td style="background:#f9f9f9;padding:14px 24px;border-top:1px solid #dddddd;">
        <p style="margin:0;font-size:11px;color:#aaaaaa;">Generated by the Texas Property Help contractor intake system. Do not reply to this email.</p>
      </td>
    </tr>
  </table>
  </td></tr>
</table>
</body>
</html>`;
}

function buildContractorAdminText(d: ContractorEmailData): string {
  const sep = "─".repeat(44);
  const areaStr = d.service_area.length > 0 ? d.service_area.join(", ") : "—";
  const langStr = d.languages.length > 0 ? d.languages.join(", ") : "—";
  return [
    "NEW CONTRACTOR APPLICATION — Texas Property Help",
    sep,
    "",
    "COMPANY",
    `  Company:  ${d.company_name}`,
    `  Contact:  ${d.contact_name ?? "—"}`,
    `  Phone:    ${d.phone}`,
    `  Email:    ${d.email ?? "—"}`,
    "",
    "SERVICE PROFILE",
    `  Trade:           ${d.trade}`,
    `  ZIP Code:        ${d.zip_code ?? "—"}`,
    `  Service Radius:  ${d.service_radius_miles} miles`,
    `  Service Area:    ${areaStr}`,
    `  Languages:       ${langStr}`,
    `  Emergency Calls: ${d.emergency_available ? "Yes" : "No"}`,
    ...(d.notes ? [`  Notes:           ${d.notes}`] : []),
    "",
    "APPLICATION",
    `  Status: ${d.status}`,
  ].join("\n");
}

export async function sendContractorAdminNotification(
  data: ContractorEmailData,
  recipientEmail: string,
): Promise<void> {
  const resend = getResend();
  if (!resend) return;

  await resend.emails.send({
    from: FROM,
    to: recipientEmail,
    subject: `New Contractor Application — Texas Property Help`,
    html: buildContractorAdminHtml(data),
    text: buildContractorAdminText(data),
  });
}

// ─── Contractor lead dispatch email ──────────────────────────────────────────

export interface ContractorDispatchEmailData {
  // Homeowner contact
  homeowner_name: string;
  homeowner_phone: string;
  homeowner_email: string;
  // Property
  city: string;
  zip_code: string;
  // Request details
  issue_types: string[];
  urgency: string;
  insurance_claim_opened: boolean;
  notes: string | null;
  // Assignment context
  contractor_company_name: string;
  assigned_at: string;
  lead_id: string;
}

const DISPATCH_ISSUE_LABELS: Record<string, string> = {
  "storm-damage":             "Storm Damage Assessment",
  "roof-inspection":          "Roof Inspection",
  "roof-repair":              "Roof Repair",
  "roof-replacement":         "Roof Replacement",
  "hvac-repair":              "HVAC Repair",
  "hvac-replacement":         "HVAC Replacement",
  "insurance-claim-guidance": "Insurance Claim Guidance",
  "repair-financing":         "Repair Financing",
  "emergency-repair":         "Emergency Repair",
  "general-repair":           "General Property Repair",
  "other":                    "Other / Not Sure",
};

const DISPATCH_URGENCY_LABEL: Record<string, string> = {
  emergency: "🚨 Emergency",
  urgent:    "⚠️ Urgent",
  soon:      "Needed Soon",
  planning:  "Planning Ahead",
};

function buildDispatchHtml(d: ContractorDispatchEmailData): string {
  const issueList = d.issue_types
    .map((t) => `<li style="margin-bottom:4px;">${DISPATCH_ISSUE_LABELS[t] ?? escapeHtml(t)}</li>`)
    .join("");
  const urgencyLabel = DISPATCH_URGENCY_LABEL[d.urgency] ?? escapeHtml(d.urgency);
  const assignedDate = new Date(d.assigned_at).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  // Placeholder CTA links — accept/decline logic not yet implemented.
  const acceptUrl = `https://texaspropertyhelp.com/contractor/respond?action=accept&lead=${d.lead_id}`;
  const declineUrl = `https://texaspropertyhelp.com/contractor/respond?action=decline&lead=${d.lead_id}`;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#eeeeee;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#eeeeee;padding:32px 16px;">
  <tr><td align="center">
  <table width="620" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;width:100%;border-radius:4px;overflow:hidden;">

    <tr>
      <td style="background:#000000;padding:20px 24px;">
        <p style="margin:0 0 4px;font-size:10px;font-weight:700;color:#76b900;text-transform:uppercase;letter-spacing:0.12em;">Texas Property Help</p>
        <p style="margin:0;font-size:20px;font-weight:700;color:#ffffff;">New Lead Available</p>
      </td>
    </tr>

    <tr>
      <td style="background:#ffffff;padding:20px 24px 8px;">
        <p style="margin:0 0 4px;font-size:14px;color:#374151;">Hello <strong>${escapeHtml(d.contractor_company_name)}</strong>,</p>
        <p style="margin:8px 0 0;font-size:14px;color:#374151;line-height:1.6;">
          A homeowner in <strong>${escapeHtml(d.city)}, TX</strong> is looking for help.
          Their contact information is below. Please reach out directly at your earliest convenience.
        </p>
      </td>
    </tr>

    <tr>
      <td style="background:#ffffff;padding:4px 24px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #eeeeee;border-radius:4px;overflow:hidden;margin-top:12px;">

          ${sectionHead("Homeowner Contact")}
          ${row("Name",  e(d.homeowner_name))}
          ${row("Phone", `<a href="tel:${escapeHtml(d.homeowner_phone)}" style="color:#76b900;font-weight:700;">${escapeHtml(d.homeowner_phone)}</a>`)}
          ${row("Email", `<a href="mailto:${escapeHtml(d.homeowner_email)}" style="color:#76b900;">${escapeHtml(d.homeowner_email)}</a>`)}

          ${sectionHead("Property")}
          ${row("City",     e(d.city))}
          ${row("ZIP Code", e(d.zip_code))}

          ${sectionHead("Request")}
          ${row("Help Needed",    `<ul style="margin:0;padding-left:16px;line-height:1.7;">${issueList}</ul>`)}
          ${row("Urgency",        urgencyLabel)}
          ${row("Insurance Claim", d.insurance_claim_opened ? "Yes — claim already opened" : "No")}
          ${d.notes ? row("Message", `<span style="white-space:pre-wrap;">${escapeHtml(d.notes)}</span>`) : ""}

          ${sectionHead("Assignment")}
          ${row("Assigned To", e(d.contractor_company_name))}
          ${row("Sent At",     assignedDate)}

        </table>
      </td>
    </tr>

    <!-- CTA buttons -->
    <tr>
      <td style="background:#ffffff;padding:0 24px 28px;text-align:center;">
        <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
          <tr>
            <td style="padding-right:12px;">
              <a href="${acceptUrl}" style="display:inline-block;background:#76b900;color:#000000;font-weight:700;font-size:14px;padding:12px 24px;border-radius:5px;text-decoration:none;">
                Accept Lead
              </a>
            </td>
            <td>
              <a href="${declineUrl}" style="display:inline-block;background:#f3f4f6;color:#374151;font-weight:600;font-size:14px;padding:12px 24px;border-radius:5px;text-decoration:none;">
                Decline Lead
              </a>
            </td>
          </tr>
        </table>
        <p style="margin:14px 0 0;font-size:11px;color:#9ca3af;">
          You may also contact the homeowner directly using the information above.
        </p>
      </td>
    </tr>

    <tr>
      <td style="background:#f9f9f9;padding:14px 24px;border-top:1px solid #dddddd;">
        <p style="margin:0;font-size:11px;color:#aaaaaa;">
          Texas Property Help is a referral and intake platform. We are not a contractor, insurer, or lender.
          This lead was matched to you based on your trade and service area.
        </p>
      </td>
    </tr>

  </table>
  </td></tr>
</table>
</body>
</html>`;
}

function buildDispatchText(d: ContractorDispatchEmailData): string {
  const sep = "─".repeat(44);
  const issueStr = d.issue_types.map((t) => DISPATCH_ISSUE_LABELS[t] ?? t).join(", ");
  const urgencyLabel = DISPATCH_URGENCY_LABEL[d.urgency] ?? d.urgency;
  const assignedDate = new Date(d.assigned_at).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  return [
    "NEW LEAD AVAILABLE — Texas Property Help",
    sep,
    "",
    `Hello ${d.contractor_company_name},`,
    "",
    `A homeowner in ${d.city}, TX is looking for help.`,
    "Please reach out directly at your earliest convenience.",
    "",
    "HOMEOWNER CONTACT",
    `  Name:  ${d.homeowner_name}`,
    `  Phone: ${d.homeowner_phone}`,
    `  Email: ${d.homeowner_email}`,
    "",
    "PROPERTY",
    `  City:    ${d.city}, TX`,
    `  ZIP:     ${d.zip_code}`,
    "",
    "REQUEST",
    `  Help Needed:    ${issueStr}`,
    `  Urgency:        ${urgencyLabel}`,
    `  Insurance Claim: ${d.insurance_claim_opened ? "Yes" : "No"}`,
    ...(d.notes ? [`  Message:        ${d.notes}`] : []),
    "",
    "ASSIGNMENT",
    `  Assigned To: ${d.contractor_company_name}`,
    `  Sent At:     ${assignedDate}`,
    "",
    sep,
    "Texas Property Help is a referral and intake platform.",
    "We are not a contractor, insurer, or lender.",
    "https://texaspropertyhelp.com",
  ].join("\n");
}

export async function sendContractorDispatch(
  data: ContractorDispatchEmailData,
  recipientEmail: string,
): Promise<void> {
  const resend = getResend();
  if (!resend) return;

  await resend.emails.send({
    from: FROM,
    to: recipientEmail,
    subject: "New Lead Available — Texas Property Help",
    html: buildDispatchHtml(data),
    text: buildDispatchText(data),
  });
}

// ─── Public send functions ────────────────────────────────────────────────────

export async function sendAdminNotification(lead: LeadEmailData): Promise<void> {
  const resend = getResend();
  if (!resend) return;

  const urg = URGENCY_CONFIG[lead.urgency] ?? { subject: lead.urgency.toUpperCase() };
  const helpSummary = lead.helpNeeded
    .slice(0, 2)
    .map((t) => HELP_LABELS[t] ?? t)
    .join(", ");
  const subject = `New Lead [${urg.subject}]: ${helpSummary} — ${lead.city}, TX`;

  await resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject,
    html: buildAdminHtml(lead),
    text: buildAdminText(lead),
  });
}

export async function sendHomeownerConfirmation(lead: LeadEmailData): Promise<void> {
  const resend = getResend();
  if (!resend) return;

  const isES = lead.preferredLanguage === "es";
  const subject = isES
    ? "Recibimos su solicitud — Texas Property Help"
    : "We received your request — Texas Property Help";

  await resend.emails.send({
    from: FROM,
    to: lead.email,
    subject,
    html: buildHomeownerHtml(lead),
    text: buildHomeownerText(lead),
  });
}
