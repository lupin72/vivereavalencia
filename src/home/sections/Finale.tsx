import { useEffect, useRef, useState, type FormEvent } from "react"
import { Link } from "react-router"
import Mark from "../Mark"
import { gsap, SplitText, getLenis } from "../motion"
import { it } from "@/i18n/it"

const t = it.footer

export default function Finale() {
  const root = useRef<HTMLElement>(null)
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const big = new SplitText(".fn-big .l", { type: "chars", mask: "chars" })
      gsap.from(big.chars, {
        yPercent: 110,
        duration: 1.4,
        ease: "expo.out",
        stagger: 0.03,
        scrollTrigger: { trigger: ".fn-big", start: "top 85%" },
      })
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // la luna (la pennellata) sorge dietro il saluto
        gsap.fromTo(".fn-moon", { yPercent: 60, opacity: 0 }, {
          yPercent: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".fn-big",
            start: "top bottom",
            end: "bottom 60%",
            scrub: true,
          },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (email.includes("@")) setSent(true)
  }

  const toDawn = () => {
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0, { duration: 2.4 })
    else window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer ref={root} className="fn" data-moment="notte">
      <div className="fn-stars" aria-hidden />
      <div className="wrapx">
        <div className="fn-news">
          <div>
            <h3>{t.newsletterTitle}</h3>
            <p>{t.newsletterBody}</p>
          </div>
          {sent ? (
            <p className="fn-thanks" role="status">
              {t.subscribed}
            </p>
          ) : (
            <form onSubmit={submit} className="fn-form">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                aria-label={t.emailPlaceholder}
              />
              <button type="submit">
                {t.subscribe} <span aria-hidden>→</span>
              </button>
            </form>
          )}
        </div>

        <div className="fn-big">
          <Mark className="fn-moon" />
          <span className="l">{t.goodnight}</span>
          <span className="l fn-big-b">{t.goodnightB}</span>
        </div>

        <div className="fn-bottom">
          <nav className="fn-links">
            {it.nav.links.map((l) => (
              <Link key={l.to} to={l.to}>
                {l.label}
              </Link>
            ))}
          </nav>
          <span>{t.made}</span>
          <span>{t.rights}</span>
          <button className="fn-dawn" onClick={toDawn}>
            ↑ {t.backToDawn}
          </button>
        </div>
      </div>
    </footer>
  )
}
