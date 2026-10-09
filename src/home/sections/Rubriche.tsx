import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Link } from "react-router"
import { gsap, SplitText, prefersReducedMotion } from "../motion"
import { articles, CAT_DESC, CAT_LABELS } from "@/data"
import { it } from "@/i18n/it"

const t = it.rubriche
const ALL = "all"

const size = (src: string, w: number, h: number) =>
  src.replace(/w=\d+&h=\d+/, `w=${w}&h=${h}`)

/** Le rubriche del portale: si sceglie una sezione e la griglia si ricompone. */
export default function Rubriche() {
  const root = useRef<HTMLElement>(null)
  const grid = useRef<HTMLDivElement>(null)
  const [cat, setCat] = useState(ALL)
  const shown = useRef(cat)

  const list = (
    // in "Tutte" l'apertura della prima pagina non si ripete
    cat === ALL ? articles.filter((a) => !a.featured) : articles.filter((a) => a.cat === cat)
  ).slice(0, 5)
  const count = (c: string) =>
    c === ALL ? articles.length : articles.filter((a) => a.cat === c).length

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = new SplitText(".rb-title", { type: "lines", mask: "lines" })
      gsap.from(title.lines, {
        yPercent: 110,
        duration: 1.3,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".rb-title", start: "top 85%" },
      })
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".rb-tabs button", {
          y: 20,
          opacity: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.05,
          scrollTrigger: { trigger: ".rb-tabs", start: "top 88%" },
        })
        gsap.from(".rb-card", {
          y: 50,
          opacity: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".rb-grid", start: "top 80%" },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  // a ogni cambio di rubrica le schede rientrano
  useLayoutEffect(() => {
    // solo quando la rubrica cambia davvero (StrictMode esegue l'effetto due volte)
    if (shown.current === cat) return
    shown.current = cat
    if (!grid.current || prefersReducedMotion()) return
    const cards = grid.current.querySelectorAll(".rb-card")
    gsap.fromTo(cards, { y: 30, opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "expo.out",
      stagger: 0.06,
      overwrite: true,
    })
    gsap.fromTo(grid.current.querySelectorAll(".rb-card-img"), {
      clipPath: "inset(0 0 100% 0)",
    }, {
      clipPath: "inset(0 0 0% 0)",
      duration: 1,
      ease: "expo.inOut",
      stagger: 0.06,
    })
  }, [cat])

  return (
    <section ref={root} className="rb" data-moment="mezzogiorno">
      <div className="wrapx">
        <div className="rb-head">
          <div>
            <span className="eyebrow">{t.eyebrow}</span>
            <h2 className="rb-title">
              {t.title.split("\n").map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </h2>
          </div>
          <p className="lede rb-desc">
            {cat === ALL ? t.allDesc : CAT_DESC[cat]}
          </p>
        </div>

        <div className="rb-tabs" role="tablist" aria-label={t.label}>
          {[ALL, ...t.tabs].map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={cat === c}
              className={cat === c ? "is-on" : ""}
              onClick={() => setCat(c)}
            >
              {c === ALL ? t.all : CAT_LABELS[c]}
              <sup>{count(c)}</sup>
            </button>
          ))}
        </div>

        <div ref={grid} className="rb-grid" role="tabpanel">
          {list.map((a, i) => (
            <Link
              key={a.id}
              to={`/articolo/${a.id}`}
              className={`rb-card${i === 0 ? " is-big" : ""}`}
            >
              <div className="rb-card-img">
                <img
                  src={i === 0 ? size(a.img, 1200, 1200) : size(a.img, 700, 520)}
                  alt=""
                  loading="lazy"
                />
              </div>
              <span className="pp-cat">
                {CAT_LABELS[a.cat]} · {a.catLabel}
              </span>
              <h3>{a.title}</h3>
              {i === 0 && <p className="pp-excerpt">{a.excerpt}</p>}
              <span className="pp-by">
                {a.author} · {a.readTime}
              </span>
            </Link>
          ))}
        </div>

        <div className="rb-foot">
          <Link
            to={`/categoria/${cat === ALL ? "guide" : cat}`}
            className="pill-btn"
          >
            {cat === ALL ? it.primaPagina.allArticles : `${t.seeAll}: ${CAT_LABELS[cat]}`}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
