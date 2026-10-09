import { useEffect } from "react"
import Hero from "@/home/sections/Hero"
import Manifesto from "@/home/sections/Manifesto"
import PrimaPagina from "@/home/sections/PrimaPagina"
import Quartieri from "@/home/sections/Quartieri"
import Rubriche from "@/home/sections/Rubriche"
import Percorso from "@/home/sections/Percorso"
import Storie from "@/home/sections/Storie"
import Notte from "@/home/sections/Notte"
import Finale from "@/home/sections/Finale"
import { gsap, ScrollTrigger, MOMENTS, type Moment } from "@/home/motion"

/** Scorrendo, la pagina attraversa la giornata: ogni sezione dichiara il suo momento. */
function useMoments() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".vh")
    if (!root) return
    const apply = (m: Moment, instant = false) => {
      const c = MOMENTS[m]
      root.dataset.moment = m
      gsap.to(root, {
        "--bg": c.bg,
        "--fg": c.fg,
        "--muted": c.muted,
        "--accent": c.accent,
        "--line": c.line,
        duration: instant ? 0 : 1.1,
        ease: "power2.inOut",
        overwrite: true,
      })
    }
    apply("alba", true)

    const triggers = Array.from(
      document.querySelectorAll<HTMLElement>("[data-moment]"),
    )
      .filter((el) => el !== root)
      .map((el) => {
        const m = el.dataset.moment as Moment
        return ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onEnter: () => apply(m),
          onEnterBack: () => apply(m),
        })
      })

    // i pin cambiano le altezze: ricalcola quando immagini e font sono pronti
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener("load", refresh)
    document.fonts?.ready.then(refresh)

    return () => {
      triggers.forEach((t) => t.kill())
      window.removeEventListener("load", refresh)
    }
  }, [])
}

export default function Home() {
  useMoments()
  return (
    <>
      <Hero />
      <Manifesto />
      <PrimaPagina />
      <Quartieri />
      <Rubriche />
      <Percorso />
      <Storie />
      <Notte />
      <Finale />
    </>
  )
}
