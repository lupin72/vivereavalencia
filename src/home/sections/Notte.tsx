import { useEffect, useRef } from "react"
import { Link } from "react-router"
import { gsap, SplitText, isTouch } from "../motion"
import { articles, events } from "@/data"
import { it } from "@/i18n/it"

const t = it.notte

// Immagine che compare sotto il cursore passando su ogni evento
const EVENT_IMG = [
  "https://images.unsplash.com/photo-1719401542194-95139aed215c?w=600&h=760&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&h=760&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1698141825633-a34c5f129225?w=600&h=760&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1603803721487-97009eb7f8db?w=600&h=760&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1647693680683-2283c3e386b6?w=600&h=760&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1647693629037-0f153313aeb1?w=600&h=760&fit=crop&auto=format",
]

const TASTE = [
  "paella-vera-ricetta",
  "horchata-fartons-alboraya",
  "calatrava-ciudad-artes",
]
  .map((id) => articles.find((a) => a.id === id))
  .filter((a): a is NonNullable<typeof a> => Boolean(a))

export default function Notte() {
  const root = useRef<HTMLElement>(null)
  const float = useRef<HTMLLIElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = new SplitText(".nt-title", { type: "lines", mask: "lines" })
      gsap.from(title.lines, {
        yPercent: 110,
        duration: 1.3,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".nt-title", start: "top 85%" },
      })

      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".nt-marquee-track", {
          xPercent: -50,
          duration: 40,
          ease: "none",
          repeat: -1,
        })
        gsap.from(".nt-row", {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.07,
          scrollTrigger: { trigger: ".nt-list", start: "top 85%" },
        })
        gsap.from(".nt-card", {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".nt-cards", start: "top 85%" },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  // Immagine che segue il cursore, ma solo dentro la lista eventi:
  // è posizionata nella lista, limitata ai suoi bordi, e sparisce appena il cursore esce
  // (anche quando è la pagina a scorrere sotto un cursore fermo).
  useEffect(() => {
    const f = float.current
    const list = listRef.current
    if (!f || !list || isTouch()) return
    const xTo = gsap.quickTo(f, "x", { duration: 0.6, ease: "power3" })
    const yTo = gsap.quickTo(f, "y", { duration: 0.6, ease: "power3" })
    const rTo = gsap.quickTo(f, "rotation", { duration: 0.8, ease: "power3" })
    let visible = false
    let current = -1
    let lastX = 0
    let px = -1
    let py = -1

    const show = (i: number) => {
      if (i !== current) {
        f.querySelectorAll("img").forEach((img, j) =>
          img.classList.toggle("on", i === j),
        )
        current = i
      }
      if (!visible) {
        visible = true
        gsap.to(f, { scale: 1, opacity: 1, duration: 0.5, ease: "expo.out", overwrite: "auto" })
      }
    }
    const hide = () => {
      if (!visible) return
      visible = false
      gsap.to(f, { scale: 0.6, opacity: 0, duration: 0.25, ease: "power3.out", overwrite: "auto" })
    }
    const place = (snap = false) => {
      const r = list.getBoundingClientRect()
      const w = f.offsetWidth / 2
      const x = gsap.utils.clamp(w, r.width - w, px - r.left)
      const y = gsap.utils.clamp(0, r.height, py - r.top)
      if (snap) {
        gsap.set(f, { x, y })
        xTo(x, x)
        yTo(y, y)
      } else {
        xTo(x)
        yTo(y)
      }
    }
    // quale riga c'è sotto il cursore, se ce n'è una
    const update = (snap = false) => {
      const row = document
        .elementFromPoint(px, py)
        ?.closest<HTMLElement>(".nt-list > li")
      if (!row || !list.contains(row)) return hide()
      if (!visible) snap = true
      place(snap)
      show(Number(row.dataset.i))
    }

    const move = (e: PointerEvent) => {
      px = e.clientX
      py = e.clientY
      rTo(gsap.utils.clamp(-12, 12, (e.clientX - lastX) * 0.6))
      lastX = e.clientX
      update()
    }
    const scroll = () => px >= 0 && update()
    list.addEventListener("pointermove", move)
    list.addEventListener("pointerleave", hide)
    window.addEventListener("scroll", scroll, { passive: true })
    return () => {
      list.removeEventListener("pointermove", move)
      list.removeEventListener("pointerleave", hide)
      window.removeEventListener("scroll", scroll)
    }
  }, [])

  const words = [...t.marquee, ...t.marquee]

  return (
    <section ref={root} className="nt" data-moment="notte">
      <div className="wrapx">
        <span className="eyebrow">{t.eyebrow}</span>
        <h2 className="nt-title">
          {t.title.split("\n").map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </h2>
      </div>

      <div className="nt-marquee" aria-hidden>
        <div className="nt-marquee-track">
          {words.map((w, i) => (
            <span key={i}>
              {w}
              <i>✦</i>
            </span>
          ))}
        </div>
      </div>

      <div className="wrapx">
        <div className="nt-head">
          <h3>{t.eventsTitle}</h3>
          <Link to="/categoria/eventi" className="link-arrow">
            {t.allEvents} <span aria-hidden>→</span>
          </Link>
        </div>
        <ul ref={listRef} className="nt-list">
          {events.map((e, i) => (
            <li key={e.id} data-i={i}>
              <Link to="/categoria/eventi" className="nt-row">
                <span className="nt-date">
                  <strong>{e.day}</strong>
                  {e.month}
                </span>
                <span className="nt-name">{e.title}</span>
                <span className="nt-place">{e.place}</span>
                <span className="nt-cat">{e.catLabel}</span>
              </Link>
            </li>
          ))}
          <li ref={float} className="nt-float" aria-hidden>
            {EVENT_IMG.map((src) => (
              <img key={src} src={src} alt="" loading="lazy" />
            ))}
          </li>
        </ul>

        <h3 className="nt-sub">{t.tasteTitle}</h3>
        <div className="nt-cards">
          {TASTE.map((a) => (
            <Link key={a.id} to={`/articolo/${a.id}`} className="nt-card">
              <div className="nt-card-img">
                <img
                  src={a.img.replace(/w=\d+&h=\d+/, "w=800&h=1000")}
                  alt=""
                  loading="lazy"
                />
              </div>
              <span className="nt-card-cat">{a.catLabel}</span>
              <h4>{a.title}</h4>
              <span className="nt-card-meta">
                {a.readTime} · {a.author}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
