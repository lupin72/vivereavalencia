import { useEffect, useRef } from "react"
import { Link } from "react-router"
import { gsap, SplitText } from "../motion"
import { articles, type Article } from "@/data"
import { it } from "@/i18n/it"

const t = it.primaPagina

const pick = (ids: string[]) =>
  ids
    .map((id) => articles.find((a) => a.id === id))
    .filter((a): a is Article => Boolean(a))

const LEAD = articles.find((a) => a.featured) ?? articles[0]
const SECONDARY = pick(["costo-vita-valencia", "fallas-2027-guida"])
const MOST_READ = pick([
  "nie-guida-passo-passo",
  "quartieri-dove-vivere",
  "paella-vera-ricetta",
  "lavorare-valencia",
  "mercado-central-guida",
])

const size = (src: string, w: number, h: number) =>
  src.replace(/w=\d+&h=\d+/, `w=${w}&h=${h}`)

const today = new Intl.DateTimeFormat("it-IT", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
}).format(new Date())

/** La "prima pagina" del giorno: un'apertura, due notizie di spalla e le più lette. */
export default function PrimaPagina() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = new SplitText(".pp-lead h3", { type: "lines", mask: "lines" })
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // le righe del giornale si tracciano da sinistra
        gsap.from(".pp-rule", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.4,
          ease: "expo.inOut",
          stagger: 0.1,
          scrollTrigger: { trigger: ".pp-mast", start: "top 85%" },
        })
        gsap.from(".pp-mast > *", {
          y: 24,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".pp-mast", start: "top 85%" },
        })
        gsap.fromTo(".pp-lead-img", { clipPath: "inset(0 0 100% 0)" }, {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.5,
          ease: "expo.inOut",
          scrollTrigger: { trigger: ".pp-lead", start: "top 80%" },
        })
        gsap.fromTo(".pp-lead-img img", { yPercent: -6, scale: 1.12 }, {
          yPercent: 6,
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: ".pp-lead-img",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
        gsap.from(title.lines, {
          yPercent: 105,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.07,
          scrollTrigger: { trigger: ".pp-lead h3", start: "top 88%" },
        })
        gsap.from([".pp-side-item", ".pp-top li"], {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.06,
          scrollTrigger: { trigger: ".pp-grid", start: "top 70%" },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="pp" data-moment="alba">
      <div className="wrapx">
        <header className="pp-mast">
          <span className="eyebrow">{t.eyebrow}</span>
          <h2>{t.title}</h2>
          <span className="pp-date">
            <span>{today}</span> · {t.edition}
          </span>
        </header>
        <div className="pp-rule" />
        <div className="pp-rule thin" />

        <div className="pp-grid">
          <Link to={`/articolo/${LEAD.id}`} className="pp-lead">
            <div className="pp-lead-img">
              <img src={size(LEAD.img, 1600, 1000)} alt="" loading="lazy" />
            </div>
            <span className="pp-cat">{LEAD.catLabel}</span>
            <h3>{LEAD.title}</h3>
            <p className="pp-excerpt">{LEAD.excerpt}</p>
            <span className="pp-by">
              {t.by} {LEAD.author} · {LEAD.readTime}
            </span>
          </Link>

          <div className="pp-side">
            {SECONDARY.map((a) => (
              <Link key={a.id} to={`/articolo/${a.id}`} className="pp-side-item">
                <div className="pp-side-img">
                  <img src={size(a.img, 800, 540)} alt="" loading="lazy" />
                </div>
                <span className="pp-cat">{a.catLabel}</span>
                <h4>{a.title}</h4>
                <span className="pp-by">
                  {a.date} · {a.readTime}
                </span>
              </Link>
            ))}
          </div>

          <aside className="pp-top">
            <span className="eyebrow small">{t.mostRead}</span>
            <ol>
              {MOST_READ.map((a, i) => (
                <li key={a.id}>
                  <Link to={`/articolo/${a.id}`}>
                    <span className="pp-n">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="pp-cat">{a.catLabel}</span>
                      <span className="pp-top-title">{a.title}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
            <Link to="/categoria/guide" className="link-arrow">
              {t.allArticles} <span aria-hidden>→</span>
            </Link>
          </aside>
        </div>
      </div>
    </section>
  )
}
