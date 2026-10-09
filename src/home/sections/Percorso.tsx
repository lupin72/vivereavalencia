import { useEffect, useRef } from "react"
import { Link } from "react-router"
import { gsap, ScrollTrigger, SplitText } from "../motion"
import { it } from "@/i18n/it"

const t = it.percorso

export default function Percorso() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = new SplitText(".px-title", { type: "lines", mask: "lines" })
      gsap.from(title.lines, {
        yPercent: 110,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".px-title", start: "top 85%" },
      })

      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // la linea del percorso si riempie e il sole scende sotto l'orizzonte
        gsap.fromTo(".px-fill", { scaleY: 0 }, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".px-steps",
            start: "top 60%",
            end: "bottom 60%",
            scrub: true,
          },
        })
        gsap.fromTo(".px-sun", { yPercent: -30 }, {
          yPercent: 95,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
        gsap.utils.toArray<HTMLElement>(".px-step").forEach((s) => {
          gsap.from(s, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: s, start: "top 85%" },
          })
          // il punto della tappa si accende quando la linea lo raggiunge
          ScrollTrigger.create({
            trigger: s,
            start: "top 60%",
            onEnter: () => s.classList.add("is-active"),
            onLeaveBack: () => s.classList.remove("is-active"),
          })
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="px" data-moment="tramonto">
      <div className="wrapx px-grid">
        <div className="px-side">
          <div className="px-sticky">
            <span className="eyebrow">{t.eyebrow}</span>
            <h2 className="px-title">
              {t.title.split("\n").map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </h2>
            <p className="lede">{t.intro}</p>
            <div className="px-horizon" aria-hidden>
              <span className="px-sun" />
            </div>
          </div>
        </div>

        <ol className="px-steps">
          <span className="px-line" aria-hidden>
            <span className="px-fill" />
          </span>
          {t.steps.map((s, i) => (
            <li key={s.title} className="px-step">
              <span className="px-dot" aria-hidden />
              <div className="px-step-head">
                <span className="px-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="px-when">{s.when}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <Link to={`/articolo/${s.id}`} className="link-arrow">
                {t.read} <span aria-hidden>→</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
