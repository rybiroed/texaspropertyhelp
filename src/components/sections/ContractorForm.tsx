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

const RADIUS_OPTIONS = [10, 25, 50, 75, 100, 150, 250, 500] as const;

interface FormState {
  company_name: string;
  contact_name: string;
  phone: string;
  email: string;
  trade: string;
  zip_code: string;
  service_radius_miles: number;
  service_area: string;
  languages: string;
  emergency_available: boolean;
  notes: string;
  website: string;
  years_in_business: string;
  agreement_accepted: boolean;
}

const EMPTY: FormState = {
  company_name: "",
  contact_name: "",
  phone: "",
  email: "",
  trade: "",
  zip_code: "",
  service_radius_miles: 50,
  service_area: "",
  languages: "",
  emergency_available: false,
  notes: "",
  website: "",
  years_in_business: "",
  agreement_accepted: false,
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
    if (!form.zip_code.trim()) next.zip_code = "ZIP code is required.";
    if (!form.agreement_accepted) next.agreement_accepted = "You must agree to the Contractor Network Agreement.";
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

  const hintStyle: React.CSSProperties = {
    fontSize: "0.8125rem",
    color: "var(--content-muted)",
    marginTop: "4px",
  };

  const errBorder = (field: keyof FormState): React.CSSProperties =>
    errors[field] ? { borderColor: "var(--danger)" } : {};

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
            style={{ ...fieldStyle, ...errBorder("company_name") }}
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
            style={{ ...fieldStyle, ...errBorder("phone") }}
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
            style={{ ...fieldStyle, ...errBorder("trade") }}
          >
            <option value="">Select trade…</option>
            {TRADES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.trade && <p style={errorStyle}>{errors.trade}</p>}
        </div>

        {/* ZIP Code */}
        <div>
          <label htmlFor="zip_code" style={labelStyle}>
            ZIP Code <span style={{ color: "var(--danger)" }}>*</span>
          </label>
          <input
            id="zip_code"
            type="text"
            inputMode="numeric"
            value={form.zip_code}
            onChange={(e) => setForm({ ...form, zip_code: e.target.value })}
            style={{ ...fieldStyle, ...errBorder("zip_code") }}
            placeholder="78701"
            maxLength={10}
          />
          {errors.zip_code && <p style={errorStyle}>{errors.zip_code}</p>}
        </div>

        {/* Service Radius */}
        <div style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="service_radius_miles" style={labelStyle}>
            Service Radius
          </label>
          <select
            id="service_radius_miles"
            value={form.service_radius_miles}
            onChange={(e) => setForm({ ...form, service_radius_miles: Number(e.target.value) })}
            style={fieldStyle}
          >
            {RADIUS_OPTIONS.map((r) => (
              <option key={r} value={r}>{r} miles</option>
            ))}
          </select>
          <p style={hintStyle}>How far from your ZIP code are you willing to receive leads?</p>
        </div>

        {/* Service Area */}
        <div style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="service_area" style={labelStyle}>
            Specific Service Cities / Areas
          </label>
          <input
            id="service_area"
            type="text"
            value={form.service_area}
            onChange={(e) => setForm({ ...form, service_area: e.target.value })}
            style={fieldStyle}
            placeholder="e.g. Austin, Killeen, Temple"
          />
          <p style={hintStyle}>Separate multiple areas with commas.</p>
        </div>

        {/* Website */}
        <div>
          <label htmlFor="website" style={labelStyle}>
            Website
          </label>
          <input
            id="website"
            type="url"
            autoComplete="url"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
            style={fieldStyle}
            placeholder="https://yourcompany.com"
          />
        </div>

        {/* Years in Business */}
        <div>
          <label htmlFor="years_in_business" style={labelStyle}>
            Years in Business
          </label>
          <input
            id="years_in_business"
            type="number"
            inputMode="numeric"
            min={0}
            max={100}
            value={form.years_in_business}
            onChange={(e) => setForm({ ...form, years_in_business: e.target.value })}
            style={fieldStyle}
            placeholder="e.g. 5"
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
            placeholder="License numbers, certifications, or anything else useful…"
          />
        </div>

        {/* Agreement */}
        <div style={{ gridColumn: "1 / -1", marginTop: "8px" }}>
          <div
            style={{
              backgroundColor: errors.agreement_accepted ? "#fff5f5" : "#f9fafb",
              border: `1px solid ${errors.agreement_accepted ? "#feb2b2" : "var(--content-border)"}`,
              borderRadius: "6px",
              padding: "14px 16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <input
                id="agreement_accepted"
                type="checkbox"
                checked={form.agreement_accepted}
                onChange={(e) => setForm({ ...form, agreement_accepted: e.target.checked })}
                style={{ width: "18px", height: "18px", accentColor: "var(--accent)", flexShrink: 0, marginTop: "2px" }}
              />
              <label htmlFor="agreement_accepted" style={{ fontSize: "0.875rem", color: "var(--content-primary)", lineHeight: 1.5, cursor: "pointer" }}>
                <span style={{ fontWeight: 700, color: "var(--danger)" }}>* </span>
                I agree to the{" "}
                <strong>Contractor Network Agreement</strong>
                {" "}— I understand that Texas Property Help connects homeowners with independent contractors, does not guarantee work, and may suspend or remove contractors who do not maintain professional standards.
              </label>
            </div>
            {errors.agreement_accepted && <p style={{ ...errorStyle, marginTop: "8px", marginBottom: 0 }}>{errors.agreement_accepted}</p>}
          </div>
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
