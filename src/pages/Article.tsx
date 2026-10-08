import { useParams, Link } from "react-router";
import { useReveal } from "@/hooks/useReveal";
import CatTag from "@/components/CatTag";
import { C, BG, articles, meta, excerpt } from "@/data";

export default function Article() {
  useReveal();
  const { id } = useParams<{ id: string }>();
  const article = articles.find((a) => a.id === id) ?? articles[0];
  const related = articles.filter((a) => a.id !== article.id && a.cat === article.cat).slice(0, 3);
  const fallback = articles.filter((a) => a.id !== article.id).slice(0, 3);
  const relatedArticles = related.length >= 2 ? related : fallback;

  const bg = BG[article.cat] ?? "#F8F7F4";
  const color = C[article.cat] ?? "#888";

  return (
    <>
      {/* ── Article header ── */}
      <section style={{ paddingTop: "88px", background: bg }}>
        <div className="wrap" style={{ paddingTop: "64px", paddingBottom: "64px" }}>
          <div className="reveal" style={{ maxWidth: "800px" }}>
            {/* Breadcrumb */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "32px" }}>
              <Link to="/" style={{ ...meta, color: "#AAA", textDecoration: "none" }}>Home</Link>
              <span style={{ ...meta, color: "#CCC" }}>→</span>
              <Link to={`/categoria/${article.cat}`} style={{ ...meta, color, textDecoration: "none" }}>{article.catLabel}</Link>
            </div>

            <CatTag cat={article.cat} label={article.catLabel} />
            <h1 style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)", lineHeight: 1.06, letterSpacing: "-.02em", marginTop: "20px", marginBottom: "28px" }}>
              {article.title}
            </h1>
            <p style={{ ...excerpt, fontSize: "1.05rem", maxWidth: "640px", marginBottom: "32px" }}>
              {article.excerpt}
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "20px", paddingTop: "24px", borderTop: "1px solid rgba(0,0,0,.08)" }}>
              <span style={meta}>{article.author}</span>
              <span style={{ color: "#CCC" }}>—</span>
              <span style={meta}>{article.date}</span>
              <span style={{ color: "#CCC" }}>—</span>
              <span style={meta}>{article.readTime} lettura</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Hero image ── */}
      <div className="img-z reveal" style={{ height: "60vh", minHeight: "400px", maxHeight: "680px", background: "#E8E5E0" }}>
        <img src={article.img} alt={article.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      {/* ── Article body ── */}
      <section style={{ padding: "80px 0" }}>
        <div className="wrap">
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            {article.body.map((paragraph, i) => {
              /* Pull quote: second paragraph gets large treatment */
              if (i === 1) {
                return (
                  <div key={i}>
                    <blockquote style={{ fontFamily: "Raleway, sans-serif", fontWeight: 300, fontSize: "clamp(1.4rem, 2.4vw, 2rem)", lineHeight: 1.4, letterSpacing: "-.01em", color: "#333", margin: "48px 0", paddingLeft: "28px", borderLeft: `3px solid ${color}` }}>
                      {paragraph}
                    </blockquote>
                  </div>
                );
              }
              return (
                <p key={i} style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "1.0rem", lineHeight: 1.85, color: "#333", marginBottom: "28px" }}>
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Related articles ── */}
      <section style={{ padding: "80px 0", background: bg }}>
        <div className="wrap">
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "56px" }}>
            <div>
              <div className="s-label" style={{ color, marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "5px", height: "5px", background: color, display: "inline-block" }} />
                Continua a leggere
              </div>
              <h2 style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)", lineHeight: 1.08, letterSpacing: "-.02em" }}>
                Altri articoli
              </h2>
            </div>
            <Link to={`/categoria/${article.cat}`} className="more-link">Tutti →</Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "48px" }}>
            {relatedArticles.map((art, i) => (
              <Link key={art.id} to={`/articolo/${art.id}`} className={`a-card reveal d${i + 1}`}
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
    </>
  );
}
