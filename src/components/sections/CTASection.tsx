import Link from "next/link";

interface CTASectionProps {
  heading?: string;
  subheading?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  variant?: "dark" | "accent" | "light";
}

export default function CTASection({
  heading = "Ready to Get Help With Your Property?",
  subheading = "Tell us what's going on and we'll help connect you with the right resources — at no cost to explore.",
  primaryLabel = "Request Help Now",
  primaryHref = "/request-help",
  secondaryLabel = "View Homeowner Guides",
  secondaryHref = "/guides",
  variant = "dark",
}: CTASectionProps) {
  const bg =
    variant === "dark"
      ? "#000000"
      : variant === "accent"
      ? "var(--accent)"
      : "var(--off-white)";

  const textColor = variant === "light" ? "#1a1a1a" : "white";
  const subColor = variant === "light" ? "#444444" : "rgba(255,255,255,0.8)";

  return (
    <section style={{ backgroundColor: bg }} className="py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2
          style={{
            color: textColor,
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            fontWeight: 800,
            marginBottom: "16px",
            lineHeight: 1.3,
          }}
        >
          {heading}
        </h2>
        <p
          style={{
            color: subColor,
            fontSize: "1rem",
            marginBottom: "32px",
            maxWidth: "560px",
            margin: "0 auto 32px",
          }}
        >
          {subheading}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={primaryHref}
            style={{
              display: "inline-block",
              backgroundColor: variant === "accent" ? "white" : "var(--accent)",
              color: variant === "accent" ? "var(--navy)" : "#000000",
              fontWeight: 700,
              fontSize: "1rem",
              padding: "14px 28px",
              borderRadius: "4px",
            }}
            className="hover:opacity-90"
          >
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              style={{
                display: "inline-block",
                backgroundColor: "transparent",
                color: variant === "light" ? "#1a1a1a" : "var(--accent)",
                fontWeight: 600,
                fontSize: "1rem",
                padding: "14px 28px",
                borderRadius: "4px",
                border: `2px solid ${variant === "light" ? "#1a1a1a" : "var(--accent)"}`,
              }}
              className="hover:opacity-80"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
