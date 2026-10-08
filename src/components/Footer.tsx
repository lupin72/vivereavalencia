import { Link } from "react-router";
import { useState } from "react";
import logo from "@/imports/195941231_padded_logo.png";
import { C, navItems } from "@/data";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer style={{ background: "#0D1620", paddingTop: "96px", paddingBottom: "56px" }}>
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: "40px", paddingBottom: "48px" }}>
          <div>
            <img src={logo} alt="Vivere a Valencia"
              style={{ height: "100px", width: "auto", display: "block", marginBottom: "20px", filter: "invert(1) hue-rotate(180deg)", mixBlendMode: "screen" }} />
            <p style={{ fontFamily: "Inter", fontWeight: 400, fontSize: ".87rem", lineHeight: 1.8, color: "rgba(255,255,255,.35)", maxWidth: "240px", marginBottom: "24px" }}>
              Il magazine di riferimento per gli italiani che vivono, lavorano o sognano di trasferirsi a Valencia.
            </p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["Instagram", "TikTok", "YouTube", "Facebook"].map((s) => (
                <a key={s} href="#"
                  style={{ fontFamily: "Inter", fontSize: ".6rem", fontWeight: 500, letterSpacing: ".08em", textTransform: "uppercase", padding: "6px 10px", border: "1px solid rgba(255,255,255,.12)", color: "rgba(255,255,255,.4)", textDecoration: "none", transition: "color .2s, border-color .2s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#fff"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.4)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.4)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.12)"; }}>
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div>
            <span className="foot-label">Sezioni</span>
            {navItems.map((n) => (
              <Link key={n.id} to={`/categoria/${n.id}`} className="foot-link">{n.label}</Link>
            ))}
          </div>

          <div>
            <span className="foot-label">Guide</span>
            {["Trasferirsi", "Trovare casa", "Costo della vita", "Lavorare", "Sanità", "Scuole", "Trasporti"].map((g) => (
              <a key={g} href="#" className="foot-link">{g}</a>
            ))}
          </div>

          <div>
            <span className="foot-label">Il Progetto</span>
            {["Chi siamo", "Scrivi per noi", "Collaborazioni", "Pubblicità", "Contattaci"].map((l) => (
              <a key={l} href="#" className="foot-link">{l}</a>
            ))}
          </div>

          <div>
            <span className="foot-label">Newsletter</span>
            {subscribed ? (
              <p style={{ fontFamily: "Inter", fontSize: ".75rem", color: "rgba(255,255,255,.5)", lineHeight: 1.7 }}>
                ✓ Iscritto — ti aspettiamo domenica
              </p>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="la-tua@email.it" required
                  style={{ fontFamily: "Inter", fontSize: ".82rem", padding: "10px 0", background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,.2)", outline: "none", color: "#fff", width: "100%" }} />
                <button type="submit"
                  style={{ fontFamily: "Inter", fontSize: ".6rem", fontWeight: 500, letterSpacing: ".12em", textTransform: "uppercase", padding: "10px 0", background: "none", border: "1px solid rgba(255,255,255,.2)", color: "rgba(255,255,255,.6)", cursor: "pointer", transition: "all .2s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,.6)"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,.2)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,.6)"; }}>
                  Iscriviti
                </button>
              </form>
            )}
            <div style={{ marginTop: "32px" }}>
              <span className="foot-label">Legale</span>
              {["Privacy policy", "Cookie policy", "Note legali"].map((l) => (
                <a key={l} href="#" className="foot-link">{l}</a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ paddingTop: "28px", borderTop: "1px solid rgba(255,255,255,.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "Inter", fontSize: ".6rem", fontWeight: 400, color: "rgba(255,255,255,.2)" }}>
            © 2026 Vivere a Valencia — Tutti i diritti riservati
          </span>
          <span style={{ fontFamily: "Inter", fontSize: ".6rem", fontWeight: 400, color: "rgba(255,255,255,.15)" }}>
            Fatto con passione da Valencia
          </span>
        </div>
      </div>
    </footer>
  );
}
