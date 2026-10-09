import { useEffect, useRef, useState } from "react"
import { Link } from "react-router"
import Mark from "./Mark"
import { useAsk } from "./ask/AskContext"
import { gsap, ScrollTrigger, getLenis } from "./motion"
import { it } from "@/i18n/it"

const t = it.nav

// La giornata dura quanto la pagina: dalle 06:40 alle 23:59.
const START = 6 * 60 + 40
const END = 23 * 60 + 59
const fmt = (m: number) =>
  `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(Math.floor(m % 60)).padStart(2, "0")}`
const momentOf = (m: number) =>
  m < 11 * 60
    ? t.moments.alba
    : m < 18 * 60
      ? t.moments.mezzogiorno
      : m < 21 * 60 + 30
        ? t.moments.tramonto
        : t.moments.notte

export default function HomeNav() {
  const { open } = useAsk()
  const [menu, setMenu] = useState(false)
  const clock = useRef<HTMLSpanElement>(null)
  const moment = useRef<HTMLSpanElement>(null)
  const sun = useRef<SVGCircleElement>(null)
  const nav = useRef<HTMLElement>(null)
  const isMac =
    typeof navigator !== "undefined" &&
    /Mac|iPhone|iPad/.test(navigator.platform)

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const m = START + (END - START) * self.progress
        if (clock.current) clock.current.textContent = fmt(m)
        if (moment.current) moment.current.textContent = momentOf(m)
        // il sole percorre un arco e tramonta; dopo le 21 diventa luna
        if (sun.current) {
          const p = Math.min(self.progress / 0.8, 1)
          const a = Math.PI * (1 - p)
          sun.current.setAttribute("cx", String(12 + Math.cos(a) * 9))
          sun.current.setAttribute("cy", String(12 - Math.sin(a) * 9))
          sun.current.classList.toggle("is-moon", self.progress > 0.8)
        }
        nav.current?.classList.toggle("is-scrolled", self.scroll() > 40)
      },
    })
    return () => st.kill()
  }, [])

  useEffect(() => {
    const lenis = getLenis()
    if (menu) {
      lenis?.stop()
      gsap.fromTo(".menu", { clipPath: "inset(0 0 100% 0)" }, {
        clipPath: "inset(0 0 0% 0)",
        duration: 0.9,
        ease: "expo.inOut",
      })
      gsap.fromTo(".menu-link", { yPercent: 110 }, {
        yPercent: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.05,
        delay: 0.35,
      })
    } else {
      lenis?.start()
    }
  }, [menu])

  return (
    <>
      <header ref={nav} className="hnav">
        <Link to="/" className="hnav-logo" aria-label={it.brand.name}>
          <Mark className="hnav-mark" />
          <span className="hnav-word">
            Vivere a <em>Valencia</em>
          </span>
        </Link>

        <div className="hnav-clock" aria-hidden>
          <svg viewBox="0 0 24 14" width="28" height="16">
            <path d="M2 12.5 H22" />
            <circle ref={sun} cx="3" cy="12" r="2.6" />
          </svg>
          <span ref={clock}>06:40</span>
          <span className="hnav-sep">·</span>
          <span ref={moment}>{t.moments.alba}</span>
        </div>

        <div className="hnav-actions">
          <button className="hnav-ask" onClick={() => open()}>
            <span aria-hidden>✦</span> {t.search}
            <kbd>{isMac ? "⌘K" : "Ctrl K"}</kbd>
          </button>
          <button
            className="hnav-menu"
            onClick={() => setMenu((m) => !m)}
            aria-expanded={menu}
          >
            <span className="hnav-burger" data-open={menu} />
            <span className="sr">{menu ? t.close : t.menu}</span>
          </button>
        </div>
      </header>

      {menu && (
        <div
          className="menu"
          role="dialog"
          aria-modal="true"
          aria-label={t.menu}
        >
          <nav>
            {t.links.map((l, i) => (
              <div key={l.to} className="menu-row">
                <Link
                  to={l.to}
                  className="menu-link"
                  onClick={() => setMenu(false)}
                >
                  <small>0{i + 1}</small>
                  {l.label}
                </Link>
              </div>
            ))}
          </nav>
          <Mark className="menu-mark" />
        </div>
      )}
    </>
  )
}
