import { Link } from "react-router";

export default function NotFound() {
  return (
    <section style={{ paddingTop: "88px", minHeight: "70vh", display: "flex", alignItems: "center" }}>
      <div className="wrap">
        <div style={{ maxWidth: "560px" }}>
          <div style={{ fontFamily: "Raleway, sans-serif", fontWeight: 300, fontSize: "8rem", lineHeight: 1, letterSpacing: "-.06em", color: "#E8E5E0", marginBottom: "16px" }}>
            404
          </div>
          <h1 style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", lineHeight: 1.1, letterSpacing: "-.02em", marginBottom: "20px" }}>
            Pagina non trovata
          </h1>
          <p style={{ fontFamily: "Inter", fontSize: ".95rem", lineHeight: 1.75, color: "#666", marginBottom: "36px" }}>
            La pagina che cerchi non esiste o è stata spostata. Torna alla homepage per continuare a esplorare Valencia.
          </p>
          <Link to="/" style={{ fontFamily: "Inter", fontWeight: 500, fontSize: ".65rem", letterSpacing: ".15em", textTransform: "uppercase", padding: "14px 32px", background: "#111", color: "#fff", textDecoration: "none", display: "inline-block", transition: "opacity .2s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = ".6")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}>
            Torna alla home
          </Link>
        </div>
      </div>
    </section>
  );
}
