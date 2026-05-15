interface DisclaimerBoxProps {
  type?: "insurance" | "legal" | "financing" | "general";
  customText?: string;
}

const defaultText: Record<string, string> = {
  insurance:
    "Texas Property Help is a homeowner assistance and referral platform. We are not an insurance company, insurance agent, or public adjuster. We do not guarantee claim approval, coverage amounts, or outcomes. All insurance decisions are made solely by your insurance company. Consult a licensed public adjuster or attorney for formal claims assistance.",
  legal:
    "Nothing on this website constitutes legal advice. If you have legal questions about your insurance policy, contractor dispute, or property rights, please consult a licensed attorney in Texas.",
  financing:
    "Texas Property Help does not guarantee financing approval, interest rates, or loan terms. All financing decisions are made by independent lenders. Not all homeowners will qualify for all programs. Review all terms carefully before entering any financial agreement.",
  general:
    "Texas Property Help connects homeowners with information and service provider referrals. We are not a contractor, insurance company, or financial institution. Final hiring, coverage, and financing decisions are the homeowner's responsibility.",
};

export default function DisclaimerBox({ type = "general", customText }: DisclaimerBoxProps) {
  const text = customText ?? defaultText[type];

  return (
    <div
      style={{
        backgroundColor: "var(--navy-light)",
        border: "1px solid var(--border)",
        borderLeft: "4px solid var(--accent)",
        borderRadius: "4px",
        padding: "16px 20px",
        marginTop: "24px",
        marginBottom: "8px",
      }}
    >
      <p
        style={{
          fontSize: "0.8rem",
          color: "var(--text-secondary)",
          lineHeight: "1.6",
          margin: 0,
        }}
      >
        <strong style={{ color: "#ffffff", fontSize: "0.8rem" }}>Disclaimer: </strong>
        {text}
      </p>
    </div>
  );
}
