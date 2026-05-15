"use client";

import { useState } from "react";
import type { FAQItem } from "@/types";

interface FAQProps {
  items: FAQItem[];
  heading?: string;
  includeSchema?: boolean;
}

export default function FAQ({ items, heading = "Frequently Asked Questions", includeSchema = true }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section style={{ backgroundColor: "#000000", borderTop: "1px solid #333333" }} className="py-14 px-4">
      {includeSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <div className="max-w-3xl mx-auto">
        <h2
          style={{
            color: "#ffffff",
            fontSize: "clamp(1.4rem, 3vw, 1.75rem)",
            fontWeight: 800,
            marginBottom: "32px",
            textAlign: "center",
          }}
        >
          {heading}
        </h2>
        <div className="space-y-3">
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#1a1a1a",
                border: "1px solid #333333",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "18px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#ffffff",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  lineHeight: "1.4",
                }}
                aria-expanded={openIndex === i}
              >
                <span>{item.question}</span>
                <svg
                  style={{
                    width: "20px",
                    height: "20px",
                    flexShrink: 0,
                    transform: openIndex === i ? "rotate(180deg)" : "none",
                    transition: "transform 0.2s ease",
                    color: "var(--accent)",
                  }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && (
                <div
                  style={{
                    padding: "0 20px 18px",
                    color: "#c0c0c0",
                    fontSize: "0.9rem",
                    lineHeight: "1.7",
                    borderTop: "1px solid #333333",
                    paddingTop: "14px",
                  }}
                >
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
