"use client";

import { useState } from "react";
import { SITE_CONFIG } from "@/lib/config";
import { ES } from "@/lib/translations-es";
import type { LeadFormData, PropertyType, HelpType, UrgencyLevel } from "@/types";

type FormStatus = "idle" | "submitting" | "success" | "error";

const emptyForm: LeadFormData = {
  fullName: "", phone: "", email: "", zipCode: "", city: "",
  propertyType: "single-family", helpNeeded: [], urgency: "soon",
  description: "", preferredLanguage: "es", consentGiven: false,
};

export default function LeadFormES({ pageSource = "request-help-es" }: { pageSource?: string }) {
  const [form, setForm] = useState<LeadFormData>(emptyForm);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const f = ES.form;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  function handleHelpToggle(value: HelpType) {
    setForm((prev) => ({
      ...prev,
      helpNeeded: prev.helpNeeded.includes(value)
        ? prev.helpNeeded.filter((h) => h !== value)
        : [...prev.helpNeeded, value],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.consentGiven) { setErrorMessage("Por favor marque la casilla de consentimiento para continuar."); return; }
    if (form.helpNeeded.length === 0) { setErrorMessage("Por favor seleccione al menos un tipo de ayuda necesaria."); return; }
    setStatus("submitting"); setErrorMessage("");

    try {
      const response = await fetch(SITE_CONFIG.leadApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, submittedAt: new Date().toISOString(), pageSource }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || f.errorDefault);
      }
      setStatus("success");
      setForm(emptyForm);
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : f.errorDefault);
    }
  }

  if (status === "success") {
    return (
      <div style={{ backgroundColor: "#f0faf4", border: "2px solid #2d7a4f", borderRadius: "10px", padding: "40px 32px", textAlign: "center" }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>✅</div>
        <h3 style={{ color: "#1a1a1a", fontSize: "1.4rem", fontWeight: 700, marginBottom: "12px" }}>{f.successTitle}</h3>
        <p style={{ color: "#444444", lineHeight: "1.6" }}>{f.successText}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div>
        <h3 style={sectionHead}>{f.sectionContact}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label htmlFor="fullName" style={label}>{f.fields.fullName}</label><input id="fullName" name="fullName" type="text" required value={form.fullName} onChange={handleChange} placeholder={f.fields.fullNamePlaceholder} style={input} /></div>
          <div><label htmlFor="phone" style={label}>{f.fields.phone}</label><input id="phone" name="phone" type="tel" required value={form.phone} onChange={handleChange} placeholder={f.fields.phonePlaceholder} style={input} /></div>
          <div><label htmlFor="email" style={label}>{f.fields.email}</label><input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder={f.fields.emailPlaceholder} style={input} /></div>
          <div><label htmlFor="zipCode" style={label}>{f.fields.zipCode}</label><input id="zipCode" name="zipCode" type="text" required value={form.zipCode} onChange={handleChange} placeholder="78701" style={input} maxLength={10} /></div>
          <div className="sm:col-span-2"><label htmlFor="city" style={label}>{f.fields.city}</label><input id="city" name="city" type="text" required value={form.city} onChange={handleChange} placeholder={f.fields.cityPlaceholder} style={input} /></div>
        </div>
      </div>

      <div>
        <h3 style={sectionHead}>{f.sectionProperty}</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="propertyType" style={label}>{f.fields.propertyType}</label>
            <select id="propertyType" name="propertyType" value={form.propertyType} onChange={handleChange} style={input}>
              {f.propertyTypes.map((pt) => <option key={pt.value} value={pt.value}>{pt.label}</option>)}
            </select>
          </div>

          <div>
            <fieldset><legend style={label}>{f.fields.helpNeeded}</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {f.helpTypes.map((ht) => (
                  <label key={ht.value} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", border: `1px solid ${form.helpNeeded.includes(ht.value as HelpType) ? "var(--accent)" : "#cccccc"}`, borderRadius: "6px", cursor: "pointer", backgroundColor: form.helpNeeded.includes(ht.value as HelpType) ? "#e8f5c0" : "white", fontSize: "0.875rem", color: "#1a1a1a" }}>
                    <input type="checkbox" checked={form.helpNeeded.includes(ht.value as HelpType)} onChange={() => handleHelpToggle(ht.value as HelpType)} style={{ width: "16px", height: "16px", accentColor: "var(--accent)" }} />
                    {ht.label}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <div>
            <fieldset><legend style={label}>{f.fields.urgency}</legend>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                {f.urgencyLevels.map((ul) => (
                  <label key={ul.value} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "12px 10px", border: `2px solid ${form.urgency === ul.value ? "var(--accent)" : "#cccccc"}`, borderRadius: "4px", cursor: "pointer", backgroundColor: form.urgency === ul.value ? "#e8f5c0" : "white", textAlign: "center" }}>
                    <input type="radio" name="urgency" value={ul.value} checked={form.urgency === ul.value} onChange={handleChange} className="sr-only" />
                    <span style={{ fontWeight: 600, fontSize: "0.875rem", color: "#1a1a1a", marginBottom: "4px" }}>{ul.label}</span>
                    <span style={{ fontSize: "0.7rem", color: "#666666", lineHeight: "1.3" }}>{ul.description}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <div>
            <label htmlFor="description" style={label}>{f.fields.description}</label>
            <textarea id="description" name="description" value={form.description} onChange={handleChange} rows={4} placeholder={f.fields.descriptionPlaceholder} style={{ ...input, resize: "vertical", minHeight: "100px" }} />
          </div>

          <div>
            <label htmlFor="preferredLanguage" style={label}>{f.fields.preferredLanguage}</label>
            <select id="preferredLanguage" name="preferredLanguage" value={form.preferredLanguage} onChange={handleChange} style={{ ...input, maxWidth: "240px" }}>
              {f.languages.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: "#f4f4f4", border: "1px solid #dddddd", borderRadius: "4px", padding: "16px 20px" }}>
        <label style={{ display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer" }}>
          <input type="checkbox" name="consentGiven" checked={form.consentGiven} onChange={handleChange} style={{ width: "18px", height: "18px", marginTop: "2px", flexShrink: 0, accentColor: "var(--accent)" }} required />
          <span style={{ fontSize: "0.8rem", color: "#444444", lineHeight: "1.6" }}>{f.consentText}</span>
        </label>
      </div>

      {(status === "error" || errorMessage) && (
        <div style={{ backgroundColor: "#fff5f5", border: "1px solid #fc8181", borderRadius: "6px", padding: "12px 16px", fontSize: "0.875rem", color: "#c53030" }}>
          {errorMessage}
        </div>
      )}

      <button type="submit" disabled={status === "submitting"} style={{ width: "100%", backgroundColor: status === "submitting" ? "#aaa" : "var(--accent)", color: "#000000", fontWeight: 700, fontSize: "1rem", padding: "16px 24px", borderRadius: "4px", border: "none", cursor: status === "submitting" ? "not-allowed" : "pointer" }} className="hover:opacity-90">
        {status === "submitting" ? f.submitting : f.submitBtn}
      </button>
      <p style={{ fontSize: "0.75rem", color: "#888888", textAlign: "center" }}>{f.privacyNote}</p>
    </form>
  );
}

const sectionHead: React.CSSProperties = { color: "#1a1a1a", fontWeight: 700, fontSize: "1rem", marginBottom: "16px", paddingBottom: "8px", borderBottom: "1px solid #dddddd" };
const label: React.CSSProperties = { display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#1a1a1a", marginBottom: "6px" };
const input: React.CSSProperties = { width: "100%", padding: "10px 14px", border: "1px solid #cccccc", borderRadius: "6px", fontSize: "0.9rem", color: "#1a1a1a", backgroundColor: "white" };
