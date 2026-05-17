"use client";

import { useState, useRef, useEffect } from "react";
import { SITE_CONFIG } from "@/lib/config";
import type { LeadFormData, PropertyType, HelpType, UrgencyLevel } from "@/types";

const PROPERTY_TYPES: { value: PropertyType; label: string }[] = [
  { value: "single-family", label: "Single-Family Home" },
  { value: "townhouse", label: "Townhouse" },
  { value: "condo", label: "Condo / Apartment" },
  { value: "duplex-multiplex", label: "Duplex / Multi-Unit" },
  { value: "mobile-manufactured", label: "Mobile / Manufactured Home" },
  { value: "commercial", label: "Commercial Property" },
  { value: "other", label: "Other" },
];

const HELP_TYPES: { value: HelpType; label: string }[] = [
  { value: "storm-damage", label: "Storm Damage Assessment" },
  { value: "roof-inspection", label: "Roof Inspection" },
  { value: "roof-repair", label: "Roof Repair" },
  { value: "roof-replacement", label: "Roof Replacement" },
  { value: "hvac-repair", label: "HVAC Repair" },
  { value: "hvac-replacement", label: "HVAC Replacement" },
  { value: "insurance-claim-guidance", label: "Insurance Claim Guidance" },
  { value: "repair-financing", label: "Repair Financing Help" },
  { value: "emergency-repair", label: "Emergency Repair" },
  { value: "general-repair", label: "General Property Repair" },
  { value: "other", label: "Other / Not Sure" },
];

const URGENCY_LEVELS: { value: UrgencyLevel; label: string; description: string }[] = [
  { value: "emergency", label: "Emergency", description: "Active damage or hazard right now" },
  { value: "urgent", label: "Urgent", description: "Need help within 48 hours" },
  { value: "soon", label: "Soon", description: "Within the next 1–2 weeks" },
  { value: "planning", label: "Planning Ahead", description: "No immediate rush" },
];

type FormStatus = "idle" | "submitting" | "success" | "error";

const emptyForm: LeadFormData = {
  fullName: "",
  phone: "",
  email: "",
  zipCode: "",
  city: "",
  propertyType: "single-family",
  helpNeeded: [],
  urgency: "soon",
  description: "",
  preferredLanguage: "en",
  consentGiven: false,
};

export default function LeadForm({ pageSource = "request-help" }: { pageSource?: string }) {
  const [form, setForm] = useState<LeadFormData>(emptyForm);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const honeypotRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (errorMessage && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [errorMessage]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  function handleHelpTypeToggle(value: HelpType) {
    setForm((prev) => ({
      ...prev,
      helpNeeded: prev.helpNeeded.includes(value)
        ? prev.helpNeeded.filter((h) => h !== value)
        : [...prev.helpNeeded, value],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("[LeadForm] handleSubmit fired");

    if (!form.consentGiven) {
      console.error("[LeadForm] Blocked: consent not given");
      setErrorMessage("Please check the consent box to continue.");
      return;
    }
    if (form.helpNeeded.length === 0) {
      console.error("[LeadForm] Blocked: no help type selected");
      setErrorMessage("Please select at least one type of help needed.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    const payload = {
      ...form,
      submittedAt: new Date().toISOString(),
      pageSource,
      _hp: honeypotRef.current?.value || "",
    };

    const url = SITE_CONFIG.leadApiUrl;
    console.log("[LeadForm] POSTing to:", url);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        console.error("[LeadForm] Response not ok — status:", response.status, "body:", data);
        throw new Error(data.message || "Submission failed. Please try again.");
      }

      setStatus("success");
      setForm(emptyForm);
    } catch (err: unknown) {
      console.error("[LeadForm] Submit error:", err);
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again or contact us directly."
      );
    }
  }

  if (status === "success") {
    return (
      <div
        style={{
          backgroundColor: "#f0faf4",
          border: "2px solid var(--success)",
          borderRadius: "10px",
          padding: "40px 32px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>✅</div>
        <h3 style={{ color: "#1a1a1a", fontSize: "1.4rem", fontWeight: 700, marginBottom: "12px" }}>
          Request Received
        </h3>
        <p style={{ color: "#444444", lineHeight: "1.6" }}>
          Thank you for reaching out. We&apos;ve received your information and will be in touch shortly to help connect you with the right resources.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Honeypot — hidden from real users, traps bots */}
      <input
        ref={honeypotRef}
        type="text"
        name="website_url"
        tabIndex={-1}
        autoComplete="off"
        style={{ position: "absolute", width: "1px", height: "1px", opacity: 0, pointerEvents: "none" }}
        aria-hidden="true"
      />
      {/* Personal Info */}
      <div>
        <h3 style={{ color: "#1a1a1a", fontWeight: 700, fontSize: "1rem", marginBottom: "16px", paddingBottom: "8px", borderBottom: "1px solid #dddddd" }}>
          Your Contact Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fullName" style={labelStyle}>Full Name *</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={form.fullName}
              onChange={handleChange}
              placeholder="Jane Smith"
              style={inputStyle}
              autoComplete="name"
            />
          </div>
          <div>
            <label htmlFor="phone" style={labelStyle}>Phone Number *</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={form.phone}
              onChange={handleChange}
              placeholder="(512) 555-0100"
              style={inputStyle}
              autoComplete="tel"
            />
          </div>
          <div>
            <label htmlFor="email" style={labelStyle}>Email Address *</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="jane@example.com"
              style={inputStyle}
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="zipCode" style={labelStyle}>ZIP Code *</label>
            <input
              id="zipCode"
              name="zipCode"
              type="text"
              required
              value={form.zipCode}
              onChange={handleChange}
              placeholder="78701"
              style={inputStyle}
              maxLength={10}
              pattern="[0-9]{5}"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="city" style={labelStyle}>City *</label>
            <input
              id="city"
              name="city"
              type="text"
              required
              value={form.city}
              onChange={handleChange}
              placeholder="Austin"
              style={inputStyle}
              autoComplete="address-level2"
            />
          </div>
        </div>
      </div>

      {/* Property Info */}
      <div>
        <h3 style={{ color: "#1a1a1a", fontWeight: 700, fontSize: "1rem", marginBottom: "16px", paddingBottom: "8px", borderBottom: "1px solid #dddddd" }}>
          Property & Help Needed
        </h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="propertyType" style={labelStyle}>Property Type *</label>
            <select
              id="propertyType"
              name="propertyType"
              required
              value={form.propertyType}
              onChange={handleChange}
              style={inputStyle}
            >
              {PROPERTY_TYPES.map((pt) => (
                <option key={pt.value} value={pt.value}>{pt.label}</option>
              ))}
            </select>
          </div>

          <div>
            <fieldset>
              <legend style={labelStyle}>Type of Help Needed * (select all that apply)</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {HELP_TYPES.map((ht) => (
                  <label
                    key={ht.value}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px 14px",
                      border: `1px solid ${form.helpNeeded.includes(ht.value) ? "var(--accent)" : "#cccccc"}`,
                      borderRadius: "6px",
                      cursor: "pointer",
                      backgroundColor: form.helpNeeded.includes(ht.value) ? "#e8f5c0" : "white",
                      fontSize: "0.875rem",
                      color: "#1a1a1a",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={form.helpNeeded.includes(ht.value)}
                      onChange={() => handleHelpTypeToggle(ht.value)}
                      style={{ width: "16px", height: "16px", accentColor: "var(--accent)" }}
                    />
                    {ht.label}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <div>
            <fieldset>
              <legend style={labelStyle}>Urgency Level *</legend>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                {URGENCY_LEVELS.map((ul) => (
                  <label
                    key={ul.value}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "12px 10px",
                      border: `2px solid ${form.urgency === ul.value ? "var(--accent)" : "var(--border)"}`,
                      borderRadius: "8px",
                      cursor: "pointer",
                      backgroundColor: form.urgency === ul.value ? "#e8f5c0" : "white",
                      textAlign: "center",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <input
                      type="radio"
                      name="urgency"
                      value={ul.value}
                      checked={form.urgency === ul.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span style={{ fontWeight: 600, fontSize: "0.875rem", color: "#1a1a1a", marginBottom: "4px" }}>
                      {ul.label}
                    </span>
                    <span style={{ fontSize: "0.7rem", color: "#666666", lineHeight: "1.3" }}>
                      {ul.description}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <div>
            <label htmlFor="description" style={labelStyle}>Describe Your Situation</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us about your property issue — what happened, when, and any relevant details..."
              style={{ ...inputStyle, resize: "vertical", minHeight: "100px" }}
            />
          </div>

          <div>
            <label htmlFor="preferredLanguage" style={labelStyle}>Preferred Language</label>
            <select
              id="preferredLanguage"
              name="preferredLanguage"
              value={form.preferredLanguage}
              onChange={handleChange}
              style={{ ...inputStyle, maxWidth: "240px" }}
            >
              <option value="en">English</option>
              <option value="es">Español (Spanish)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Consent */}
      <div
        style={{
          backgroundColor: "#f4f4f4",
          border: "1px solid #dddddd",
          borderRadius: "8px",
          padding: "16px 20px",
        }}
      >
        <label style={{ display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer" }}>
          <input
            type="checkbox"
            name="consentGiven"
            checked={form.consentGiven}
            onChange={handleChange}
            style={{ width: "18px", height: "18px", marginTop: "2px", flexShrink: 0, accentColor: "var(--accent)" }}
            required
          />
          <span style={{ fontSize: "0.8rem", color: "#444444", lineHeight: "1.6" }}>
            I consent to being contacted by Texas Property Help and its service provider partners regarding my property inquiry. I understand that Texas Property Help is a referral and assistance platform, not a contractor, insurer, or lender, and does not guarantee any specific outcome. I may be contacted by phone, email, or text.
          </span>
        </label>
      </div>

      {/* Error message */}
      {(status === "error" || errorMessage) && (
        <div
          ref={errorRef}
          role="alert"
          style={{
            backgroundColor: "#fff5f5",
            border: "1px solid #fc8181",
            borderRadius: "6px",
            padding: "12px 16px",
            fontSize: "0.875rem",
            color: "var(--danger)",
          }}
        >
          {errorMessage || "Something went wrong. Please try again."}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "submitting"}
        style={{
          width: "100%",
          backgroundColor: status === "submitting" ? "#aaa" : "var(--accent)",
          color: "#000000",
          fontWeight: 700,
          fontSize: "1rem",
          padding: "16px 24px",
          borderRadius: "4px",
          border: "none",
          cursor: status === "submitting" ? "not-allowed" : "pointer",
        }}
        className="hover:opacity-90"
      >
        {status === "submitting" ? "Submitting..." : "Submit My Request →"}
      </button>

      <p style={{ fontSize: "0.75rem", color: "#888888", textAlign: "center" }}>
        By submitting, you agree to our terms. Texas Property Help does not sell your personal information.
      </p>
    </form>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.875rem",
  fontWeight: 600,
  color: "#1a1a1a",
  marginBottom: "6px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  border: "1px solid #cccccc",
  borderRadius: "6px",
  fontSize: "0.9rem",
  color: "#1a1a1a",
  backgroundColor: "white",
  outline: "none",
};
