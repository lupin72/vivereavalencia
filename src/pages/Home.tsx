import { useState } from "react";
import { Link } from "react-router";
import { useReveal } from "@/hooks/useReveal";
import CatTag from "@/components/CatTag";
import SH from "@/components/SectionHeader";
import { C, articles, quartieri, events, meta, excerpt } from "@/data";

const guideCards = [
  { num: "01", title: "Trasferirsi a Valencia",  cat: "guide",     catLabel: "Guida completa", desc: "NIE, residenza, conto corrente: tutto il necessario prima di partire.", id: "trasferirsi-valencia" },
  { num: "02", title: "Dove vivere",              cat: "quartieri", catLabel: "Quartieri",       desc: "Confronto tra i quartieri: prezzi, atmosfera, pro e contro.", id: "quartieri-dove-vivere" },
  { num: "03", title: "Costo della vita",         cat: "vivere",    catLabel: "Economia",        desc: "Affitti, spesa, trasporti: quanto costa davvero vivere a Valencia.", id: "costo-vita-valencia" },
  { num: "04", title: "Lavorare a Valencia",      cat: "guide",     catLabel: "Lavoro",          desc: "Contratti, partita IVA spagnola, remote working, opportunità locali.", id: "lavorare-valencia" },
  { num: "05", title: "Sanità e assistenza",      cat: "guide",     catLabel: "Salute",          desc: "Come iscriversi al sistema sanitario pubblico spagnolo.", id: "trasferirsi-valencia" },
  { num: "06", title: "Scuole e università",      cat: "guide",     catLabel: "Istruzione",      desc: "Scuole italiane, internazionali e il sistema educativo spagnolo.", id: "trasferirsi-valencia" },
  { num: "07", title: "Trasporti in città",       cat: "scoprire",  catLabel: "Mobilità",        desc: "Metro, bus, bici e tram: come muoversi senza macchina.", id: "trasferirsi-valencia" },
  { num: "08", title: "Banche e fisco",           cat: "guide",     catLabel: "Finanze",         desc: "Aprire un conto corrente, obblighi fiscali e dichiarazione dei redditi.", id: "trasferirsi-valencia" },
];

const heroSidebar = [
  { cat: "cultura", catLabel: "Architettura", title: "La Città delle Arti e delle Scienze: il futuro costruito da Calatrava", author: "Sofia Bertini", date: "8 Ago", img: "https://images.unsplash.com/photo-1719401542194-95139aed215c?w=300&h=220&fit=crop&auto=format", id: "calatrava-ciudad-artes" },
  { cat: "mangiare", catLabel: "Gastronomia", title: "Paella, tapas e horchata: un'estate di scoperte gastronomiche", author: "Lucia Mancini", date: "3 Ago", img: "https://images.unsplash.com/photo-1780639026821-f680fae0d99d?w=300&h=220&fit=crop&auto=format", id: "tapas-bar-migliori" },
  { cat: "eventi", catLabel: "Agosto in città", title: "Il calendario completo degli eventi di agosto a Valencia", author: "Giovanni Rizzo", date: "1 Ago", img: "https://images.unsplash.com/photo-1647693629037-0f153313aeb1?w=300&h=220&fit=crop&auto=format", id: "fallas-2027-guida" },
];

const inEvidenza = [
  { cat: "vivere", catLabel: "Vivere", title: "I migliori quartieri dove vivere a Valencia", excerpt: "Russafa, El Carmen, Benimaclet o Ensanche? Un confronto onesto tra i quartieri più ambiti dagli expat italiani.", author: "Chiara Conti", date: "28 Lug 2026", img: "https://images.unsplash.com/photo-1759244569220-3cee1243cbb2?w=900&h=600&fit=crop&auto=format", id: "quartieri-dove-vivere" },
  { cat: "storia", catLabel: "Storia", title: "El Carmen: il quartiere medievale che vive di notte", excerpt: "Mura romane, chiese barocche, arte di strada e il cuore bohémien di Valencia.", author: "Sofia Bertini", date: "5 Ago 2026", img: "https://images.unsplash.com/photo-1698141825633-a34c5f129225?w=700&h=500&fit=crop&auto=format", id: "el-carmen-quartiere" },
  { cat: "eventi", catLabel: "Eventi", title: "Las Fallas 2027: la guida definitiva per italiani", excerpt: "Patrimonio UNESCO dal 2016, nessun italiano dovrebbe perderle. Date, riti e come sopravvivere alle Mascletà.", author: "Giovanni Rizzo", date: "1 Ago 2026", img: "https://images.unsplash.com/photo-1647693680683-2283c3e386b6?w=700&h=500&fit=crop&auto=format", id: "fallas-2027-guida" },
];

const gastronomy = [
  { cat: "mangiare", catLabel: "Gastronomia", title: "La vera paella valenciana: origini e segreti", excerpt: "Pollo, coniglio, fagioli e riso bomba. La guida definitiva alla paella autentica.", img: "https://images.unsplash.com/photo-1588276552401-30058a0fe57b?w=700&h=480&fit=crop&auto=format", date: "10 Ago 2026", id: "paella-vera-ricetta" },
  { cat: "mangiare", catLabel: "Bevande", title: "Horchata e fartons: la colazione valenciana", excerpt: "La bevanda di chufa è un rito mattutino locale. Dove berla ad Alboraya.", img: "https://images.unsplash.com/photo-1603803721487-97009eb7f8db?w=700&h=480&fit=crop&auto=format", date: "5 Ago 2026", id: "horchata-fartons-alboraya" },
  { cat: "mangiare", catLabel: "Mercati", title: "Mercato Centrale: la spesa come un valenciano", excerpt: "Uno dei mercati coperti più belli d'Europa: verdure, pesce fresco e frutti di stagione.", img: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=700&h=480&fit=crop&auto=format", date: "1 Ago 2026", id: "mercado-central-guida" },
];

const storieFeatured = [
  { cat: "vivere", catLabel: "Storie", title: "\"Sono arrivata con una valigia. Oggi ho un appartamento, un lavoro e 200 amici\"", excerpt: "Valentina, 31 anni, da Milano a Valencia. Tre anni dopo: come è cambiata la sua vita.", author: "Sofia Bertini", img: "https://images.unsplash.com/photo-1759244569220-3cee1243cbb2?w=900&h=600&fit=crop&auto=format", id: "quartieri-dove-vivere" },
  { cat: "cultura", catLabel: "Architettura", title: "La Città delle Arti e delle Scienze: come Calatrava ha reinventato Valencia", excerpt: "Il complesso futuristico che trasformò una città industriale in una capitale culturale mediterranea.", author: "Marco Ferretti", img: "https://images.unsplash.com/photo-1719401542194-95139aed215c?w=900&h=600&fit=crop&auto=format", id: "calatrava-ciudad-artes" },
];

const storieCompact = [
  { cat: "quartieri", catLabel: "Quartieri", title: "Cabanyal: il quartiere dei pescatori che rinasce", date: "7 Ago", id: "quartieri-dove-vivere" },
  { cat: "cultura", catLabel: "Arte", title: "IVAM: guida al museo di arte moderna di Valencia", date: "4 Ago", id: "calatrava-ciudad-artes" },
  { cat: "vivere", catLabel: "Community", title: "Il gruppo Telegram degli italiani a Valencia: 4.000 iscritti", date: "2 Ago", id: "nie-guida-passo-passo" },
];

export default function Home() {
  useReveal();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <>
      {/* ══ HERO ══ */}
      <section style={{ paddingTop: "88px" }}>
        <div className="wrap" style={{ paddingTop: "32px", paddingBottom: "16px", borderBottom: "1px solid var(--c-rule)" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
            <span style={{ ...meta, color: "#AAA" }}>vivereavalencia.it</span>
            <span style={{ ...meta, color: "#AAA" }}>Agosto 2026 — N. 12</span>
            <span style={{ ...meta, color: "#AAA" }}>Il portale degli italiani a Valencia</span>
          </div>
        </div>

        <div className="wrap" style={{ paddingTop: "56px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "56px" }}>
            <div style={{ paddingBottom: "72px" }} className="reveal">
              <CatTag cat="guide" label="Guida Essenziale" />
              <h1 style={{ fontSize: "clamp(2.6rem, 5vw, 4.5rem)", lineHeight: 1.06, letterSpacing: "-.02em", marginTop: "24px", marginBottom: "32px" }}>
                <span style={{ fontWeight: 500 }}>Trasferirsi a <span style={{ color: "var(--c-vivere)" }}>Valencia</span>:</span><br />
                <span style={{ fontWeight: 300 }}>tutto quello che devi sapere prima di partire</span>
              </h1>
              <p style={{ ...excerpt, maxWidth: "520px", marginBottom: "28px" }}>
                Quartieri, documenti, costo della vita, lavoro e consigli pratici di chi ci vive. La guida più completa in italiano per cominciare una nuova vita in città.
              </p>
              <div style={{ marginBottom: "24px" }} />
              <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "40px" }}>
                <span style={meta}>Marco Ferretti</span>
                <span style={{ color: "#CCC" }}>—</span>
                <span style={meta}>15 Agosto 2026</span>
                <span style={{ color: "#CCC" }}>—</span>
                <span style={meta}>12 min lettura</span>
              </div>
              <Link to="/articolo/trasferirsi-valencia" className="img-z" style={{ display: "block", height: "500px", background: "#E8E5E0" }}>
                <img src="https://images.unsplash.com/photo-1759250453212-be3b0f40da72?w=1200&h=700&fit=crop&auto=format" alt="Piazza di Valencia"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </Link>
            </div>

            <div>
              {heroSidebar.map((art, i, arr) => (
                <Link key={i} to={`/articolo/${art.id}`} className="a-card reveal" style={{ display: "block", textDecoration: "none", color: "inherit", paddingBottom: "32px", marginBottom: "32px", borderBottom: i < arr.length - 1 ? "1px solid var(--c-rule)" : "none" }}>
                  <div className="img-z" style={{ height: "160px", background: "#E8E5E0", marginBottom: "14px" }}>
                    <img src={art.img} alt={art.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <CatTag cat={art.cat} label={art.catLabel} />
                  <h3 style={{ marginTop: "14px", marginBottom: "10px" }}>{art.title}</h3>
                  <span style={meta}>{art.author} — {art.date}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ IN EVIDENZA ══ */}
      <section id="scoprire" style={{ padding: "120px 0" }}>
        <div className="wrap">
          <SH cat="vivere" label="In evidenza" title="Articoli da non perdere" to="/categoria/vivere" />
          <div style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr 1fr", gap: "56px", alignItems: "start" }}>
            {inEvidenza.map((art, i) => (
              <Link key={i} to={`/articolo/${art.id}`} className={`a-card reveal d${i + 1}`} style={{ display: "block", textDecoration: "none", color: "inherit" }}>
                <div className="img-z" style={{ height: i === 0 ? "400px" : "200px", background: "#E8E5E0", marginBottom: "24px" }}>
                  <img src={art.img} alt={art.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <CatTag cat={art.cat} label={art.catLabel} />
                <h3 style={{ marginTop: "14px", marginBottom: "10px", fontSize: i === 0 ? "1.55rem" : "1.25rem" }}>{art.title}</h3>
                <p style={{ ...excerpt, marginBottom: "14px", fontSize: i === 0 ? ".92rem" : ".85rem" }}>{art.excerpt}</p>
                <span style={meta}>{art.author} — {art.date}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ VIVERE A VALENCIA ══ */}
      <section id="vivere" style={{ padding: "120px 0", background: "var(--bg-vivere)" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 480px", gap: "80px", alignItems: "start" }}>
            <div>
              <div className="s-label mb-5 reveal" style={{ color: C.vivere, display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "5px", height: "5px", background: C.vivere, display: "inline-block", flexShrink: 0 }} />
                Vivere a Valencia
              </div>
              <h2 className="reveal d1" style={{ fontSize: "clamp(2rem, 3.5vw, 3.2rem)", lineHeight: 1.08, letterSpacing: "-.02em", marginBottom: "24px" }}>
                La guida pratica per chi<br />vuole trasferirsi
              </h2>
              <p className="reveal d2" style={{ ...excerpt, marginBottom: "40px", maxWidth: "420px" }}>
                Tutto quello che serve prima, durante e dopo il trasloco. Documenti, casa, lavoro, sanità — spiegati in italiano, da chi ci è passato.
              </p>
              <div className="reveal d3" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {[
                  { icon: "📄", label: "NIE e documenti" }, { icon: "🏠", label: "Trovare casa" },
                  { icon: "💼", label: "Lavoro" },           { icon: "🏥", label: "Sanità" },
                  { icon: "🏫", label: "Scuole" },           { icon: "🚇", label: "Trasporti" },
                  { icon: "💰", label: "Costo della vita" }, { icon: "🏦", label: "Banche" },
                ].map((t) => (
                  <button key={t.label} className="t-pill">
                    <span style={{ fontSize: ".85rem" }}>{t.icon}</span>
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <Link to="/articolo/nie-guida-passo-passo" className="a-card reveal d2" style={{ display: "block", textDecoration: "none", color: "inherit" }}>
              <div className="img-z" style={{ height: "280px", background: "#E8E5E0", marginBottom: "20px" }}>
                <img src="https://images.unsplash.com/photo-1759244567408-9bc3ed2f4af6?w=800&h=500&fit=crop&auto=format" alt="Vivere a Valencia"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <CatTag cat="guide" label="Guida completa" />
              <h3 style={{ marginTop: "14px", marginBottom: "10px" }}>Come ottenere il NIE: la guida passo per passo per italiani</h3>
              <p style={{ ...excerpt, marginBottom: "16px" }}>Il Número de Identidad de Extranjero è il primo documento da richiedere appena arrivati in Spagna. Ecco la procedura completa.</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={meta}>Marco Ferretti — 15 Ago 2026</span>
                <span className="more-link">Leggi →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ QUARTIERI ══ */}
      <section id="quartieri" style={{ padding: "120px 0" }}>
        <div className="wrap">
          <SH cat="quartieri" label="Esplora per quartiere" title="Ogni quartiere ha la sua anima" to="/categoria/quartieri" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "20px" }}>
            {quartieri.map((q, i) => (
              <Link key={q.id} to={`/quartieri/${q.id}`} className={`q-card reveal d${Math.min(i + 1, 6)}`} style={{ display: "block", textDecoration: "none", color: "inherit" }}>
                <div className="q-card-img" style={{ height: "360px", background: "#E8E5E0" }}>
                  <img src={q.img} alt={q.name} />
                </div>
                <div style={{ paddingTop: "16px" }}>
                  <CatTag cat={q.tag} label={q.tagLabel} />
                  <div style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400, fontSize: "1.15rem", marginTop: "10px", marginBottom: "8px" }}>{q.name}</div>
                  <p style={{ fontFamily: "Inter", fontWeight: 400, fontSize: ".82rem", lineHeight: 1.6, color: "#888" }}>{q.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ EVENTI ══ */}
      <section id="eventi" style={{ padding: "120px 0", background: "var(--bg-eventi)" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px" }}>
            <div>
              <SH cat="eventi" label="Agenda" title="Questa settimana a Valencia" to="/categoria/eventi" />
              {events.map((ev, i) => (
                <div key={i} className={`ev-card reveal d${(i % 3) + 1}`}>
                  <div>
                    <div className="ev-day" style={{ color: C[ev.cat] }}>{ev.day}</div>
                    <div className="ev-month">{ev.month}</div>
                  </div>
                  <div>
                    <CatTag cat={ev.cat} label={ev.catLabel} />
                    <div className="ev-title" style={{ marginTop: "6px" }}>{ev.title}</div>
                    <div style={{ ...meta, color: "#AAA", marginTop: "4px", display: "flex", alignItems: "center", gap: "5px", textTransform: "none", letterSpacing: 0, fontSize: ".8rem" }}>
                      {ev.place}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="reveal d2">
              <div style={{ marginBottom: "20px" }}>
                <div className="s-label mb-5" style={{ color: C.eventi, display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "5px", height: "5px", background: C.eventi, display: "inline-block", flexShrink: 0 }} />
                  Imperdibile
                </div>
                <h2 style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)", lineHeight: 1.08, letterSpacing: "-.02em", marginBottom: "16px" }}>Las Fallas 2027</h2>
              </div>
              <Link to="/articolo/fallas-2027-guida" className="img-z" style={{ display: "block", height: "260px", background: "#E8E5E0", marginBottom: "20px" }}>
                <img src="https://images.unsplash.com/photo-1647693629037-0f153313aeb1?w=800&h=500&fit=crop&auto=format" alt="Las Fallas"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </Link>
              <p style={{ ...excerpt, marginBottom: "20px" }}>
                Ogni anno a marzo Valencia brucia. Oltre 700 sculture in cartapesta costruite per mesi, poi bruciate in una sola notte. Patrimonio UNESCO dal 2016.
              </p>
              <Link to="/articolo/fallas-2027-guida" className="more-link">La guida completa →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ GASTRONOMIA ══ */}
      <section id="mangiare" style={{ padding: "120px 0" }}>
        <div className="wrap">
          <SH cat="mangiare" label="Mangiare a Valencia" title="La cucina valenciana, spiegata agli italiani" to="/categoria/mangiare" />
          <Link to="/articolo/tapas-bar-migliori" className="a-card reveal" style={{ display: "block", textDecoration: "none", color: "inherit", marginBottom: "48px" }}>
            <div className="img-z" style={{ height: "480px", background: "#E8E5E0", position: "relative" }}>
              <img src="https://images.unsplash.com/photo-1780639026821-f680fae0d99d?w=1400&h=700&fit=crop&auto=format" alt="Tapas bar valenciano"
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", bottom: "28px", left: "32px" }}>
                <CatTag cat="mangiare" label="Tapas & Pintxos" onDark />
                <div style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400, fontSize: "clamp(1.5rem, 2.8vw, 2.4rem)", color: "#fff", marginTop: "10px", lineHeight: 1.15, letterSpacing: "-.01em" }}>
                  I migliori tapas bar di Valencia: la mappa definitiva
                </div>
              </div>
            </div>
          </Link>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "48px" }}>
            {gastronomy.map((art, i) => (
              <Link key={i} to={`/articolo/${art.id}`} className={`a-card reveal d${i + 1}`} style={{ display: "block", textDecoration: "none", color: "inherit" }}>
                <div className="img-z" style={{ height: "240px", background: "#E8E5E0", marginBottom: "24px" }}>
                  <img src={art.img} alt={art.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <CatTag cat={art.cat} label={art.catLabel} />
                <h3 style={{ marginTop: "14px", marginBottom: "10px" }}>{art.title}</h3>
                <p style={{ ...excerpt, marginBottom: "12px" }}>{art.excerpt}</p>
                <span style={meta}>{art.date}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ GUIDE ══ */}
      <section id="guide" style={{ padding: "120px 0", background: "var(--bg-guide)" }}>
        <div className="wrap">
          <SH cat="guide" label="Strumenti" title="Guide essenziali" to="/categoria/guide" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0" }}>
            {guideCards.map((g, i) => (
              <Link key={i} to={`/articolo/${g.id}`} className={`g-card reveal d${(i % 2) + 1}`} style={{ display: "block", textDecoration: "none", color: "inherit" }}>
                <div className="g-num">{g.num}</div>
                <CatTag cat={g.cat} label={g.catLabel} />
                <h3 style={{ marginTop: "12px", marginBottom: "8px" }}>{g.title}</h3>
                <p style={{ fontFamily: "Inter", fontWeight: 400, fontSize: ".87rem", lineHeight: 1.7, color: "#555" }}>{g.desc}</p>
                <div style={{ fontFamily: "Inter", fontSize: ".6rem", fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", color: C[g.cat], marginTop: "16px" }}>
                  Leggi la guida →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STORIE ══ */}
      <section id="cultura" style={{ paddingTop: "120px" }}>
        <div className="wrap" style={{ marginBottom: "72px" }}>
          <SH cat="cultura" label="Storie da Valencia" title="Persone, luoghi, narrazioni" to="/categoria/cultura" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px" }}>
            {storieFeatured.map((art, i) => (
              <Link key={i} to={`/articolo/${art.id}`} className={`a-card reveal d${i + 1}`} style={{ display: "block", textDecoration: "none", color: "inherit" }}>
                <div className="img-z" style={{ height: "360px", background: "#E8E5E0", marginBottom: "28px" }}>
                  <img src={art.img} alt={art.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <CatTag cat={art.cat} label={art.catLabel} />
                <h3 style={{ marginTop: "14px", marginBottom: "10px" }}>{art.title}</h3>
                <p style={{ ...excerpt, marginBottom: "16px" }}>{art.excerpt}</p>
                <span style={meta}>{art.author}</span>
              </Link>
            ))}
          </div>
        </div>

        <div style={{ background: "var(--bg-cultura)" }}>
          <div className="wrap" style={{ paddingTop: "52px", paddingBottom: "64px" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "36px" }}>
              <span className="s-label" style={{ color: C.cultura, display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "5px", height: "5px", background: C.cultura, display: "inline-block", flexShrink: 0 }} />
                Anche questa settimana
              </span>
              <Link to="/categoria/cultura" className="more-link">Tutte le storie →</Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "48px" }}>
              {storieCompact.map((art, i) => (
                <Link key={i} to={`/articolo/${art.id}`} className={`a-card reveal d${i + 1}`} style={{ display: "block", textDecoration: "none", color: "inherit" }}>
                  <CatTag cat={art.cat} label={art.catLabel} />
                  <h4 style={{ marginTop: "10px", marginBottom: "8px" }}>{art.title}</h4>
                  <span style={meta}>{art.date} Ago 2026</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ NEWSLETTER ══ */}
      <section id="newsletter" style={{ padding: "140px 0", background: "var(--bg-vivere)" }}>
        <div className="wrap">
          <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }} className="reveal">
            <div className="s-label mb-8" style={{ color: C.vivere, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              <span style={{ width: "5px", height: "5px", background: C.vivere, display: "inline-block" }} />
              Newsletter settimanale
            </div>
            <h2 style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.6rem)", lineHeight: 1.06, letterSpacing: "-.02em", marginBottom: "24px" }}>
              Valencia,<br />direttamente nella tua inbox.
            </h2>
            <p style={{ ...excerpt, marginBottom: "44px" }}>
              Eventi, nuovi posti, guide e storie dalla città. Una volta alla settimana — niente spam, solo Valencia.
            </p>
            {subscribed ? (
              <div style={{ fontFamily: "Inter", fontSize: ".75rem", fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", color: C.scoprire }}>
                ✓ Iscritto — ti aspettiamo domenica
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }}
                style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "380px", margin: "0 auto" }}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="la-tua@email.it" required className="nl-input" style={{ textAlign: "center" }} />
                <button type="submit"
                  style={{ fontFamily: "Inter", fontWeight: 500, fontSize: ".65rem", letterSpacing: ".15em", textTransform: "uppercase", padding: "14px 32px", background: "#111", color: "#fff", border: "none", cursor: "pointer", transition: "opacity .2s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = ".6")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}>
                  Iscriviti alla newsletter
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
