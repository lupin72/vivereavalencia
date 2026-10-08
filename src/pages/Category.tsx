import { useParams, Link } from "react-router";
import { useReveal } from "@/hooks/useReveal";
import CatTag from "@/components/CatTag";
import { C, BG, CAT_LABELS, CAT_DESC, articles, quartieri, meta, excerpt } from "@/data";

export default function Category() {
  useReveal();
  const { cat = "vivere" } = useParams<{ cat: string }>();

  const color  = C[cat] ?? "#888";
  const bg     = BG[cat] ?? "#F8F7F4";
  const label  = CAT_LABELS[cat] ?? cat;
  const desc   = CAT_DESC[cat] ?? "";

  const isQuartieri = cat === "quartieri";

  const filtered = isQuartieri
    ? []
    : articles.filter((a) => a.cat === cat || a.catLabel.toLowerCase().includes(cat));

  const displayArticles = filtered.length >= 3 ? filtered : articles.slice(0, 9);

  return (
    <>
      {/* ── Category hero ── */}
      <section style={{ paddingTop: "88px", background: bg }}>
        <div className="wrap" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
          <div className="reveal" style={{ maxWidth: "760px" }}>
            <div className="s-label" style={{ color, marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "5px", height: "5px", background: color, display: "inline-block" }} />
              {label}
            </div>
            <h1 style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", lineHeight: 1.04, letterSpacing: "-.025em", marginBottom: "28px" }}>
              {label}
            </h1>
            <p style={{ ...excerpt, fontSize: "1rem", maxWidth: "560px" }}>{desc}</p>
          </div>
        </div>
      </section>

      {/* ── Quartieri special layout ── */}
      {isQuartieri && (
        <section style={{ padding: "80px 0" }}>
          <div className="wrap">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "48px" }}>
              {quartieri.map((q, i) => (
                <Link key={q.id} to={`/quartieri/${q.id}`} className={`a-card reveal d${Math.min(i + 1, 3)}`}
                  style={{ display: "block", textDecoration: "none", color: "inherit" }}>
                  <div className="img-z" style={{ height: "320px", background: "#E8E5E0", marginBottom: "24px" }}>
                    <img src={q.img} alt={q.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <CatTag cat={q.tag} label={q.tagLabel} />
                  <h3 style={{ marginTop: "14px", marginBottom: "8px", fontSize: "1.5rem" }}>{q.name}</h3>
                  <p style={{ ...excerpt }}>{q.desc}</p>
                  <div style={{ ...meta, marginTop: "14px", color: C[q.tag] }}>Scopri il quartiere →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Article grid ── */}
      {!isQuartieri && (
        <section style={{ padding: "80px 0" }}>
          <div className="wrap">
            {/* Featured first article */}
            {displayArticles[0] && (
              <Link to={`/articolo/${displayArticles[0].id}`} className="a-card reveal"
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px", textDecoration: "none", color: "inherit", marginBottom: "72px", alignItems: "center" }}>
                <div className="img-z" style={{ height: "420px", background: "#E8E5E0" }}>
                  <img src={displayArticles[0].img} alt={displayArticles[0].title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div>
                  <CatTag cat={displayArticles[0].cat} label={displayArticles[0].catLabel} />
                  <h2 style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)", lineHeight: 1.12, letterSpacing: "-.015em", marginTop: "16px", marginBottom: "16px" }}>
                    {displayArticles[0].title}
                  </h2>
                  <p style={{ ...excerpt, marginBottom: "20px" }}>{displayArticles[0].excerpt}</p>
                  <span style={meta}>{displayArticles[0].author} — {displayArticles[0].date} — {displayArticles[0].readTime} lettura</span>
                </div>
              </Link>
            )}

            {/* Rest in 3-col grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "48px" }}>
              {displayArticles.slice(1).map((art, i) => (
                <Link key={art.id} to={`/articolo/${art.id}`} className={`a-card reveal d${(i % 3) + 1}`}
                  style={{ display: "block", textDecoration: "none", color: "inherit" }}>
                  <div className="img-z" style={{ height: "220px", background: "#E8E5E0", marginBottom: "20px" }}>
                    <img src={art.img} alt={art.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <CatTag cat={art.cat} label={art.catLabel} />
                  <h3 style={{ marginTop: "14px", marginBottom: "8px" }}>{art.title}</h3>
                  <p style={{ ...excerpt, marginBottom: "12px" }}>{art.excerpt}</p>
                  <span style={meta}>{art.author} — {art.date}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Newsletter strip ── */}
      <section style={{ padding: "80px 0", background: bg }}>
        <div className="wrap">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "40px" }}>
            <div>
              <div className="s-label" style={{ color, marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "5px", height: "5px", background: color, display: "inline-block" }} />
                Newsletter
              </div>
              <h3 style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.2rem)", lineHeight: 1.1, letterSpacing: "-.015em" }}>
                Valencia direttamente nella tua inbox
              </h3>
            </div>
            <Link to="/" style={{ flexShrink: 0, fontFamily: "Inter", fontWeight: 500, fontSize: ".65rem", letterSpacing: ".15em", textTransform: "uppercase", padding: "14px 32px", background: "#111", color: "#fff", textDecoration: "none", transition: "opacity .2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = ".6")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}>
              Iscriviti
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
