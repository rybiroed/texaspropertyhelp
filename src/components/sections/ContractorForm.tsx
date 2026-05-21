"use client";

import { useState, useRef } from "react";

const TRADES = [
  "Roofing",
  "HVAC",
  "Storm Damage / Restoration",
  "General Contractor",
  "Insurance Claim Specialist",
  "Plumbing",
  "Electrical",
  "Painting",
  "Other",
];

interface FormState {
  company_name: string;
  contact_name: string;
  phone: string;
  email: string;
  trade: string;
  service_area: string;
  languages: string;
  emergency_available: boolean;
  notes: string;
}

const EMPTY: FormState = {
  company_name: "",
  contact_name: "",
  phone: "",
  email: "",
  trade: "",
  service_area: "",
  languages: "",
  emergency_available: false,
  notes: "",
};

export default function ContractorForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const firstErrorRef = useRef<HTMLDivElement>(null);

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.company_name.trim()) next.company_name = "Company name is required.";
    if (!form.phone.trim()) next.phone = "Phone number is required.";
    if (!form.trade) next.trade = "Please select your trade.";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setTimeout(() => firstErrorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
      return false;
    }
    return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/contractors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerError(data.message ?? "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div
        style={{
          backgroundColor: "#f0fdf4",
          border: "1px solid #86efac",
          borderRadius: "10px",
          padding: "32px 28px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "2rem", marginBottom: "12px" }}>✓</div>
        <h3 style={{ color: "var(--success)", fontWeight: 700, fontSize: "1.1rem", marginBottom: "12px" }}>
          Application Received
        </h3>
        <p style={{ color: "var(--content-secondary)", fontSize: "0.9375rem", lineHeight: 1.7, margin: 0 }}>
          Thanks. We received your contractor application. We will review your service area and contact you before sending leads.
        </p>
      </div>
    );
  }

  const fieldStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid var(--content-border)",
    borderRadius: "6px",
    fontSize: "0.9375rem",
    color: "var(--content-primary)",
    backgroundColor: "white",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontWeight: 600,
    fontSize: "0.875rem",
    color: "var(--content-primary)",
    marginBottom: "6px",
  };

  const errorStyle: React.CSSProperties = {
    color: "var(--danger)",
    fontSize: "0.8125rem",
    marginTop: "4px",
  };

  const fieldWrap = (hasError: boolean): React.CSSProperties => ({
    ...(hasError ? { borderColor: "var(--danger)" } : {}),
  });

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div ref={firstErrorRef} />

      {serverError && (
        <div
          style={{
            backgroundColor: "#fff5f5",
            border: "1px solid #feb2b2",
            borderRadius: "6px",
            padding: "12px 16px",
            color: "var(--danger)",
            fontSize: "0.875rem",
            marginBottom: "20px",
          }}
        >
          {serverError}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ marginBottom: "16px" }}>
        {/* Company Name */}
        <div style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="company_name" style={labelStyle}>
            Company Name <span style={{ color: "var(--danger)" }}>*</span>
          </label>
          <input
            id="company_name"
            type="text"
            autoComplete="organization"
            value={form.company_name}
            onChange={(e) => setForm({ ...form, company_name: e.target.value })}
            style={{ ...fieldStyle, ...fieldWrap(!!errors.company_name) }}
            placeholder="Your business name"
          />
          {errors.company_name && <p style={errorStyle}>{errors.company_name}</p>}
        </div>

        {/* Contact Name */}
        <div>
          <label htmlFor="contact_name" style={labelStyle}>
            Contact Name
          </label>
          <input
            id="contact_name"
            type="text"
            autoComplete="name"
            value={form.contact_name}
            onChange={(e) => setForm({ ...form, contact_name: e.target.value })}
            style={fieldStyle}
            placeholder="Your name"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" style={labelStyle}>
            Phone <span style={{ color: "var(--danger)" }}>*</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            style={{ ...fieldStyle, ...fieldWrap(!!errors.phone) }}
            placeholder="(512) 555-0100"
          />
          {errors.phone && <p style={errorStyle}>{errors.phone}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" style={labelStyle}>
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={fieldStyle}
            placeholder="you@company.com"
          />
        </div>

        {/* Trade */}
        <div>
          <label htmlFor="trade" style={labelStyle}>
            Trade / Specialty <span style={{ color: "var(--danger)" }}>*</span>
          </label>
          <select
            id="trade"
            value={form.trade}
            onChange={(e) => setForm({ ...form, trade: e.target.value })}
            style={{ ...fieldStyle, ...fieldWrap(!!errors.trade) }}
          >
            <option value="">Select trade…</option>
            {TRADES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.trade && <p style={errorStyle}>{errors.trade}</p>}
        </div>

        {/* Service Area */}
        <div style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="service_area" style={labelStyle}>
            Service Area
          </label>
          <input
            id="service_area"
            type="text"
            value={form.service_area}
            onChange={(e) => setForm({ ...form, service_area: e.target.value })}
            style={fieldStyle}
            placeholder="e.g. Austin, Houston, DFW"
          />
        </div>

        {/* Languages */}
        <div>
          <label htmlFor="languages" style={labelStyle}>
            Languages Spoken
          </label>
          <input
            id="languages"
            type="text"
            value={form.languages}
            onChange={(e) => setForm({ ...form, languages: e.target.value })}
            style={fieldStyle}
            placeholder="e.g. English, Spanish"
          />
        </div>

        {/* Emergency Available */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingTop: "24px" }}>
          <input
            id="emergency_available"
            type="checkbox"
            checked={form.emergency_available}
            onChange={(e) => setForm({ ...form, emergency_available: e.target.checked })}
            style={{ width: "18px", height: "18px", accentColor: "var(--accent)", flexShrink: 0 }}
          />
          <label htmlFor="emergency_available" style={{ ...labelStyle, marginBottom: 0, fontWeight: 500 }}>
            Available for emergency calls
          </label>
        </div>

        {/* Notes */}
        <div style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="notes" style={labelStyle}>
            Additional Notes
          </label>
          <textarea
            id="notes"
            rows={4}
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            style={{ ...fieldStyle, resize: "vertical" }}
            placeholder="License numbers, certifications, years in business, or anything else useful…"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        style={{
          width: "100%",
          padding: "14px",
          backgroundColor: submitting ? "#aaa" : "var(--accent)",
          color: "#000000",
          fontWeight: 700,
          fontSize: "1rem",
          borderRadius: "6px",
          border: "none",
          cursor: submitting ? "not-allowed" : "pointer",
          marginTop: "8px",
        }}
      >
        {submitting ? "Submitting…" : "Submit Contractor Application"}
      </button>

      <p style={{ fontSize: "0.8125rem", color: "var(--content-muted)", marginTop: "12px", textAlign: "center" }}>
        We review applications manually. Submitting does not guarantee lead assignment.
      </p>
    </form>
  );
}
