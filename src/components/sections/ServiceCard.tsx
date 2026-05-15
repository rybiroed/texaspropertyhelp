import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  icon: string; // SVG path or emoji
}

export default function ServiceCard({ title, description, href, icon }: ServiceCardProps) {
  return (
    <Link
      href={href}
      style={{
        display: "block",
        backgroundColor: "var(--navy-light)",
        border: "1px solid var(--border)",
        borderRadius: "4px",
        padding: "28px 24px",
        textDecoration: "none",
      }}
      className="group hover:shadow-lg hover:border-[var(--accent)] transition-all"
    >
      <div
        style={{
          fontSize: "2rem",
          marginBottom: "12px",
          lineHeight: 1,
        }}
        aria-hidden="true"
      >
        {icon}
      </div>
      <h3
        style={{
          color: "#ffffff",
          fontWeight: 700,
          fontSize: "1.05rem",
          marginBottom: "8px",
        }}
        className="group-hover:text-[var(--accent)]"
      >
        {title}
      </h3>
      <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: "1.6" }}>
        {description}
      </p>
      <span
        style={{
          display: "inline-block",
          marginTop: "16px",
          color: "var(--accent)",
          fontWeight: 600,
          fontSize: "0.875rem",
        }}
      >
        Learn more →
      </span>
    </Link>
  );
}
