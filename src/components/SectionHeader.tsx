import { Link } from "react-router";
import { C } from "@/data";

interface Props {
  cat: string;
  label: string;
  title: string;
  href?: string;
  to?: string;
}

export default function SH({ cat, label, title, href, to }: Props) {
  return (
    <div className="reveal" style={{ marginBottom: "80px" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "16px" }}>
        <div style={{ minWidth: 0 }}>
          <div className="s-label" style={{ color: C[cat], marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "5px", height: "5px", background: C[cat], display: "inline-block", flexShrink: 0 }} />
            {label}
          </div>
          <h2 style={{ fontSize: "clamp(2.4rem, 4vw, 3.6rem)", lineHeight: 1.06, letterSpacing: "-.02em" }}>
            {title}
          </h2>
        </div>
        {to ? (
          <Link to={to} className="more-link hidden sm:block" style={{ marginBottom: "6px", flexShrink: 0, whiteSpace: "nowrap" }}>Tutti →</Link>
        ) : href ? (
          <a href={href} className="more-link hidden sm:block" style={{ marginBottom: "6px", flexShrink: 0, whiteSpace: "nowrap" }}>Tutti →</a>
        ) : null}
      </div>
    </div>
  );
}
