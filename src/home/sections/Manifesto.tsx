import { useEffect, useRef } from "react"
import { gsap, SplitText } from "../motion"
import { it } from "@/i18n/it"

const t = it.manifesto

export default function Manifesto() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const split = new SplitText(".mf-text", { type: "words" })
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // le parole si accendono una alla volta, come la luce che entra in una stanza
        gsap.fromTo(split.words, { opacity: 0.12 }, {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: ".mf-text",
            start: "top 80%",
            end: "bottom 45%",
            scrub: true,
          },
        })
        gsap.utils.toArray<HTMLElement>(".mf-num").forEach((n) => {
          const target = Number(n.dataset.value)
          const o = { v: 0 }
          gsap.to(o, {
            v: target,
            duration: 2,
            ease: "expo.out",
            scrollTrigger: { trigger: n, start: "top 85%" },
            onUpdate: () => (n.textContent = String(Math.round(o.v))),
          })
        })
        gsap.from(".mf-stat", {
          y: 40,
          opacity: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".mf-stats", start: "top 85%" },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="mf" data-moment="alba">
      <div className="wrapx">
        <span className="eyebrow">{t.eyebrow}</span>
        <p className="mf-text">{t.text}</p>
        <div className="mf-stats">
          {t.stats.map((s) => (
            <div key={s.label} className="mf-stat">
              <div className="mf-big">
                <span className="mf-num" data-value={s.value}>
                  {s.value}
                </span>
                <span className="mf-suffix">{s.suffix}</span>
              </div>
              <span className="mf-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
