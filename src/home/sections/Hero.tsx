import { useEffect, useRef, useState, type FormEvent } from "react"
import HeroGL from "../HeroGL"
import { useAsk } from "../ask/AskContext"
import { gsap, SplitText, onLoaded, prefersReducedMotion } from "../motion"
import { it } from "@/i18n/it"

const t = it.hero
// Ruzafa al mattino (segnaposto Unsplash, da sostituire con foto originali)
const IMG =
  "https://images.unsplash.com/photo-1694347592859-6879e6b70d2c?w=2200&q=80&auto=format"

function useTypewriter(lines: string[], paused: boolean) {
  const [text, setText] = useState("")
  useEffect(() => {
    if (paused) return
    if (prefersReducedMotion()) {
      setText(lines[0])
      return
    }
    let line = 0
    let i = 0
    let deleting = false
    let id = 0
    const step = () => {
      const full = lines[line]
      if (!deleting) {
        i++
        setText(full.slice(0, i))
        if (i === full.length) {
          deleting = true
          id = window.setTimeout(step, 1800)
          return
        }
        id = window.setTimeout(step, 38 + Math.random() * 40)
      } else {
        i--
        setText(full.slice(0, i))
        if (i === 0) {
          deleting = false
          line = (line + 1) % lines.length
          id = window.setTimeout(step, 350)
          return
        }
        id = window.setTimeout(step, 18)
      }
    }
    id = window.setTimeout(step, 900)
    return () => window.clearTimeout(id)
  }, [lines, paused])
  return text
}

export default function Hero() {
  const { open } = useAsk()
  const root = useRef<HTMLElement>(null)
  const day = useRef(0)
  const [value, setValue] = useState("")
  const [focused, setFocused] = useState(false)
  const typed = useTypewriter(t.examples, focused || value.length > 0)
  const gl = !prefersReducedMotion()

  useEffect(() => {
    const el = root.current!
    const ctx = gsap.context(
      () => {
        const title = new SplitText(".hero-title .ht", {
          type: "lines,chars",
          mask: "lines",
        })
        const reveal = new SplitText(".hero-reveal", { type: "words" })

        // stato iniziale, prima del preloader
        gsap.set(title.chars, { yPercent: 115 })
        gsap.set([".hero-ask", ".hero-chips", ".hero-meta", ".hero-scroll"], {
          opacity: 0,
          y: 16,
        })
        gsap.set(reveal.words, { opacity: 0, y: 20 })

        const mm = gsap.matchMedia()
        mm.add(
          {
            desktop: "(min-width: 900px)",
            mobile: "(max-width: 899px)",
            reduce: "(prefers-reduced-motion: reduce)",
          },
          (c) => {
            const { mobile, reduce } = c.conditions as Record<string, boolean>
            // tutto in px e con lo stesso numero di valori, così GSAP interpola pulito
            const inset = (
              t: number,
              r: number,
              b: number,
              l: number,
              rad: number,
            ) =>
              `inset(${t}px ${r}px ${b}px ${l}px round ${rad}px)`
            const W = window.innerWidth
            const H = window.innerHeight
            const frame = mobile
              ? inset(H * 0.17, W * 0.07, H * 0.34, W * 0.07, 4)
              : inset(H * 0.13, W * 0.35, H * 0.2, W * 0.35, 4)
            const closed = inset(H / 2, W / 2, H / 2, W / 2, 0)
            const full = inset(0, 0, 0, 0, 0)
            gsap.set(".hero-window", { clipPath: closed })

            const intro = gsap.timeline({ paused: true })
            intro
              .fromTo(".hero-window", { clipPath: closed }, {
                clipPath: frame,
                duration: reduce ? 0 : 1.3,
                ease: "expo.inOut",
              })
              .to(
                title.chars,
                {
                  yPercent: 0,
                  duration: reduce ? 0 : 1.2,
                  ease: "expo.out",
                  stagger: 0.03,
                },
                reduce ? 0 : 0.35,
              )
              .to(
                [".hero-meta", ".hero-ask", ".hero-chips", ".hero-scroll"],
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.9,
                  ease: "expo.out",
                  stagger: 0.08,
                },
                reduce ? 0 : 0.8,
              )
            const stop = onLoaded(() => intro.play())

            if (reduce) return () => stop()

            // Scorrendo, la finestra si apre e il sole sale.
            // Il pin esiste da subito (l'altezza della pagina resta giusta), ma le animazioni
            // si aggiungono solo a intro finita: così partono dallo stato reale degli elementi.
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: el,
                start: "top top",
                end: "+=130%",
                pin: ".hero-pin",
                scrub: 1,
                onUpdate: (self) => {
                  day.current = self.progress
                },
              },
            })
            intro.eventCallback("onComplete", () => {
              // sempre entrambi gli estremi: il browser compatta il clip-path calcolato e GSAP accoppierebbe male i valori
              tl.fromTo(".hero-window", { clipPath: frame }, {
                clipPath: full,
                ease: "power2.inOut",
                duration: 1,
                immediateRender: false,
              })
                .to(
                  ".ht-a",
                  {
                    xPercent: -60,
                    opacity: 0,
                    ease: "power2.in",
                    duration: 0.7,
                  },
                  0,
                )
                .to(
                  ".ht-b",
                  {
                    xPercent: 60,
                    opacity: 0,
                    ease: "power2.in",
                    duration: 0.7,
                  },
                  0,
                )
                .to(
                  ".hero-ui",
                  { opacity: 0, y: -30, duration: 0.3, ease: "power2.in" },
                  0,
                )
                .to(
                  reveal.words,
                  {
                    opacity: 1,
                    y: 0,
                    stagger: 0.04,
                    duration: 0.3,
                    ease: "power2.out",
                  },
                  0.65,
                )
                .to({}, { duration: 0.25 })
              tl.progress(tl.scrollTrigger?.progress ?? 0)
            })

            return () => stop()
          },
        )
      },
      el,
    )
    return () => ctx.revert()
  }, [])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    open(value.trim() || t.examples[0])
    setValue("")
  }

  return (
    <section ref={root} className="hero" data-moment="alba">
      <div className="hero-pin">
        <div className="hero-window">
          <img
            className="hero-fallback"
            src={IMG.replace("w=2200", "w=1600")}
            alt=""
          />
          {gl && <HeroGL src={IMG} dayRef={day} />}
          <div className="hero-shade" />
          <p className="hero-reveal">{t.reveal}</p>
        </div>

        <h1 className="hero-title" aria-label={`${t.titleA} ${t.titleB}`}>
          <span className="ht ht-a" aria-hidden>
            {t.titleA}
          </span>
          <span className="ht ht-b" aria-hidden>
            {t.titleB}
          </span>
        </h1>

        <div className="hero-ui">
          <div className="hero-meta">
            <span>{t.coords}</span>
            <span>{t.place}</span>
          </div>
          <form className="hero-ask" onSubmit={submit}>
            <span className="hero-ask-spark" aria-hidden>
              ✦
            </span>
            <label className="hero-ask-field">
              <span className="sr">{t.placeholderLead}</span>
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder={focused ? t.placeholderLead : ""}
              />
              {!focused && !value && (
                <span className="hero-ask-typed" aria-hidden>
                  {typed}
                  <i className="hero-caret" />
                </span>
              )}
            </label>
            <button type="submit" className="hero-ask-go">
              {t.submit}
              <span aria-hidden>→</span>
            </button>
          </form>

          <div className="hero-chips">
            {t.suggestions.map((s) => (
              <button key={s} onClick={() => open(s)}>
                {s}
              </button>
            ))}
          </div>

          <div className="hero-scroll">
            <span className="hero-scroll-line" />
            {t.scroll}
          </div>
        </div>
      </div>
    </section>
  )
}
