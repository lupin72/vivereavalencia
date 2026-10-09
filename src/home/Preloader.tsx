import { useEffect, useRef, useState } from "react"
import Mark from "./Mark"
import { gsap, prefersReducedMotion } from "./motion"
import { it } from "@/i18n/it"

const KEY = "vav-preloaded"

function alreadySeen() {
  try {
    return sessionStorage.getItem(KEY) === "1"
  } catch {
    return false
  }
}

/** La pennellata si dipinge da sinistra a destra, poi il sipario si alza sull'alba. */
export default function Preloader() {
  const [done, setDone] = useState(
    () => alreadySeen() || prefersReducedMotion(),
  )
  const root = useRef<HTMLDivElement>(null)
  const count = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (done) {
      document.documentElement.classList.add("is-loaded")
      return
    }
    const el = root.current!
    const n = { v: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        try {
          sessionStorage.setItem(KEY, "1")
        } catch {
          /* storage non disponibile */
        }
        setDone(true)
      },
    })
    tl.fromTo(
      el.querySelector(".pre-mark"),
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: 1.5, ease: "power2.inOut" },
    )
      .to(
        n,
        {
          v: 100,
          duration: 1.5,
          ease: "power2.inOut",
          onUpdate: () =>
            count.current &&
            (count.current.textContent = String(Math.round(n.v)).padStart(
              3,
              "0",
            )),
        },
        0,
      )
      .fromTo(
        el.querySelector(".pre-greet"),
        { yPercent: 100 },
        { yPercent: 0, duration: 0.8, ease: "expo.out" },
        0.4,
      )
      .to(
        el.querySelector(".pre-inner"),
        { y: -40, opacity: 0, duration: 0.6, ease: "power3.in" },
        "+=0.25",
      )
      .call(() => document.documentElement.classList.add("is-loaded"))
      .to(
        el,
        { clipPath: "inset(0 0 100% 0)", duration: 1.1, ease: "expo.inOut" },
        "-=0.2",
      )
    return () => {
      tl.kill()
    }
  }, [done])

  if (done) return null

  return (
    <div ref={root} className="pre" aria-hidden>
      <div className="pre-inner">
        <Mark className="pre-mark" />
        <div className="pre-greet-wrap">
          <span className="pre-greet">{it.preloader.greeting}</span>
        </div>
      </div>
      <span className="pre-count" ref={count}>
        000
      </span>
    </div>
  )
}
