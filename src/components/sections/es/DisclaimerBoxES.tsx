import { ES } from "@/lib/translations-es";

interface DisclaimerBoxESProps {
  type?: "insurance" | "legal" | "financing" | "general";
  customText?: string;
}

export default function DisclaimerBoxES({ type = "general", customText }: DisclaimerBoxESProps) {
  const text = customText ?? ES.disclaimers[type];
  return (
    <div style={{ backgroundColor: "#fff8f0", border: "1px solid #e8c898", borderLeft: "4px solid var(--accent)", borderRadius: "6px", padding: "16px 20px", marginTop: "24px", marginBottom: "8px" }}>
      <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: "1.6", margin: 0 }}>
        <strong style={{ color: "var(--charcoal)", fontSize: "0.8rem" }}>Aviso Legal: </strong>
        {text}
      </p>
    </div>
  );
}
