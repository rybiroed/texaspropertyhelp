import Link from "next/link";
import Image from "next/image";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  icon: string;
  image?: string;
  accentColor?: string;
}

export default function ServiceCard({ title, description, href, icon, image, accentColor = "#76b900" }: ServiceCardProps) {
  return (
    <Link
      href={href}
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        overflow: "hidden",
        textDecoration: "none",
        boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      className="group hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image or gradient top */}
      <div style={{ position: "relative", height: "160px", overflow: "hidden", flexShrink: 0 }}>
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, ${accentColor}22 100%)` }} />
        )}
        {/* Overlay gradient */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)" }} />
        {/* Icon badge */}
        <div style={{
          position: "absolute",
          bottom: "12px",
          left: "16px",
          backgroundColor: accentColor,
          color: "#000",
          fontSize: "1.4rem",
          width: "44px",
          height: "44px",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        }}>
          {icon}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "20px 20px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{
          color: "#111827",
          fontWeight: 700,
          fontSize: "1.05rem",
          marginBottom: "8px",
          transition: "color 0.15s",
        }}
          className="group-hover:text-[var(--accent)]"
        >
          {title}
        </h3>
        <p style={{ color: "#4b5563", fontSize: "0.875rem", lineHeight: "1.65", flex: 1 }}>
          {description}
        </p>
        <span style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          marginTop: "16px",
          color: accentColor,
          fontWeight: 700,
          fontSize: "0.875rem",
        }}>
          Learn more →
        </span>
      </div>
    </Link>
  );
}
