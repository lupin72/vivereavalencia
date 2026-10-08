import { useParams, Link } from "react-router";
import { useReveal } from "@/hooks/useReveal";
import CatTag from "@/components/CatTag";
import { C, BG, quartieri, articles, meta, excerpt } from "@/data";

export default function QuartiereDetail() {
  useReveal();
  const { id } = useParams<{ id: string }>();
  const q = quartieri.find((q) => q.id === id) ?? quartieri[0];
  const color = C[q.tag] ?? "#888";
  const bg = BG[q.tag] ?? "#F8F7F4";
  const related = quartieri.filter((x) => x.id !== q.id).slice(0, 3);
  const relatedArticles = articles.slice(0, 3);

  return (
    <>
      {/* ── Full-bleed hero ── */}
      <div style={{ position: "relative", height: "85vh", minHeight: "520px", overflow: "hidden" }}>
        <img src={q.img} alt={q.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        {/* Gradient overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.72) 0%, rgba(0,0,0,.2) 50%, rgba(0,0,0,.05) 100%)" }} />
        {/* Content */}
        <div className="wrap" style={{ position: "absolute", bottom: "64px", left: "50%", transform: "translateX(-50%)", width: "100%" }}>
          <CatTag cat={q.tag} label={q.tagLabel} onDark />
          <h1 style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400, fontSize: "clamp(3.5rem, 8vw, 7rem)", lineHeight: 1.02, letterSpacing: "-.03em", color: "#fff", marginTop: "16px", marginBottom: "0" }}>
            {q.name}
          </h1>
        </div>
        {/* Nav overlay */}
        <div style={{ position: "absolute", top: "88px", left: "50%", transform: "translateX(-50%)", width: "100%" }}>
          <div className="wrap">
            <Link to="/" style={{ ...meta, color: "rgba(255,255,255,.5)", textDecoration: "none" }}>Home</Link>
            <span style={{ ...meta, color: "rgba(255,255,255,.3)", margin: "0 8px" }}>→</span>
            <Link to="/categoria/quartieri" style={{ ...meta, color: "rgba(255,255,255,.5)", textDecoration: "none" }}>Quartieri</Link>
            <span style={{ ...meta, color: "rgba(255,255,255,.3)", margin: "0 8px" }}>→</span>
            <span style={{ ...meta, color: "rgba(255,255,255,.8)" }}>{q.name}</span>
          </div>
        </div>
      </div>

      {/* ── Description + stats ── */}
      <section style={{ padding: "96px 0" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "80px", alignItems: "start" }}>
            <div className="reveal">
              <div className="s-label" style={{ color, marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "5px", height: "5px", background: color, display: "inline-block" }} />
                Il quartiere
              </div>
              <p style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "1.1rem", lineHeight: 1.85, color: "#333", marginBottom: "28px" }}>
                {q.longDesc}
              </p>
              <Link to={`/categoria/quartieri`} className="more-link">Esplora tutti i quartieri →</Link>
            </div>

            {/* Stats */}
            <div className="reveal d2" style={{ background: bg, padding: "40px 36px" }}>
              <div className="s-label" style={{ color, marginBottom: "28px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "5px", height: "5px", background: color, display: "inline-block" }} />
                Numeri utili
              </div>
              {q.stats.map((s) => (
                <div key={s.label} style={{ marginBottom: "24px", paddingBottom: "24px", borderBottom: "1px solid var(--c-rule)" }}>
                  <div style={{ fontFamily: "Inter", fontSize: ".6rem", fontWeight: 500, letterSpacing: ".12em", textTransform: "uppercase", color: "#AAA", marginBottom: "6px" }}>
                    {s.label}
                  </div>
                  <div style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400, fontSize: "1.5rem", letterSpacing: "-.02em", color: "#111" }}>
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Photo gallery ── */}
      <section style={{ padding: "0 0 96px" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: "12px" }}>
            {q.gallery.map((img, i) => (
              <div key={i} className="img-z reveal" style={{ height: i === 0 ? "440px" : "214px", background: "#E8E5E0" }}>
                <img src={img} alt={`${q.name} ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Other quartieri ── */}
      <section style={{ padding: "80px 0", background: bg }}>
        <div className="wrap">
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "56px" }}>
            <h2 style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)", lineHeight: 1.08, letterSpacing: "-.02em" }}>
              Esplora gli altri quartieri
            </h2>
            <Link to="/categoria/quartieri" className="more-link">Tutti →</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
            {related.map((rq, i) => (
              <Link key={rq.id} to={`/quartieri/${rq.id}`} className={`q-card reveal d${i + 1}`}
                style={{ display: "block", textDecoration: "none", color: "inherit" }}>
                <div className="q-card-img" style={{ height: "280px", background: "#E8E5E0" }}>
                  <img src={rq.img} alt={rq.name} />
                </div>
                <div style={{ paddingTop: "16px" }}>
                  <CatTag cat={rq.tag} label={rq.tagLabel} />
                  <div style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400, fontSize: "1.25rem", marginTop: "10px", marginBottom: "6px" }}>{rq.name}</div>
                  <p style={{ fontFamily: "Inter", fontSize: ".85rem", lineHeight: 1.6, color: "#888" }}>{rq.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related articles ── */}
      <section style={{ padding: "80px 0" }}>
        <div className="wrap">
          <div style={{ marginBottom: "56px" }}>
            <div className="s-label" style={{ color, marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "5px", height: "5px", background: color, display: "inline-block" }} />
              Leggi anche
            </div>
            <h2 style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)", lineHeight: 1.08, letterSpacing: "-.02em" }}>
              Articoli su Valencia
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "48px" }}>
            {relatedArticles.map((art, i) => (
              <Link key={art.id} to={`/articolo/${art.id}`} className={`a-card reveal d${i + 1}`}
                style={{ display: "block", textDecoration: "none", color: "inherit" }}>
                <div className="img-z" style={{ height: "200px", background: "#E8E5E0", marginBottom: "20px" }}>
                  <img src={art.img} alt={art.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <CatTag cat={art.cat} label={art.catLabel} />
                <h3 style={{ marginTop: "14px", marginBottom: "8px", fontSize: "1.2rem" }}>{art.title}</h3>
                <span style={meta}>{art.author} — {art.date}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
