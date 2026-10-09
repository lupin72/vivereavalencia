import { useEffect, useRef } from "react"
import { Link } from "react-router"
import { gsap, SplitText } from "../motion"
import { it } from "@/i18n/it"

const t = it.storie
const PORTRAIT =
  "https://images.unsplash.com/photo-1759244569220-3cee1243cbb2?w=1100&h=1400&fit=crop&auto=format"

export default function Storie() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const quote = new SplitText(".st-quote", { type: "lines", mask: "lines" })
      gsap.from(quote.lines, {
        yPercent: 105,
        duration: 1.3,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".st-quote", start: "top 80%" },
      })

      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(".st-photo", { clipPath: "inset(100% 0 0 0)" }, {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.6,
          ease: "expo.inOut",
          scrollTrigger: { trigger: ".st-photo", start: "top 80%" },
        })
        gsap.fromTo(".st-photo img", { yPercent: -8, scale: 1.15 }, {
          yPercent: 8,
          scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: ".st-photo",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
        gsap.from(".st-row", {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".st-more", start: "top 85%" },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="st" data-moment="tramonto">
      <div className="wrapx st-grid">
        <div className="st-photo">
          <img src={PORTRAIT} alt={t.who} loading="lazy" />
        </div>
        <div className="st-body">
          <span className="eyebrow">{t.eyebrow}</span>
          <blockquote className="st-quote">“{t.quote}”</blockquote>
          <div className="st-who">
            <strong>{t.who}</strong>
            <span>{t.whoDetail}</span>
          </div>
          <Link to="/articolo/quartieri-dove-vivere" className="link-arrow">
            {t.cta} <span aria-hidden>→</span>
          </Link>

          <div className="st-more">
            <span className="eyebrow small">{t.moreTitle}</span>
            {t.more.map((m) => (
              <Link key={m.title} to={`/articolo/${m.id}`} className="st-row">
                <span className="st-tag">{m.tag}</span>
                <span className="st-row-title">{m.title}</span>
                <span aria-hidden className="st-row-arrow">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
