import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import type Lenis from "lenis"

gsap.registerPlugin(ScrollTrigger, SplitText)

export { gsap, ScrollTrigger, SplitText }

let lenis: Lenis | null = null
export const setLenis = (l: Lenis | null) => {
  lenis = l
}
export const getLenis = () => lenis

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

export const isTouch = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: none)").matches

/** Un momento della giornata: colori che la home attraversa scorrendo. */
export type Moment = "alba" | "mezzogiorno" | "tramonto" | "notte"

export const MOMENTS: Record<Moment, {
  bg: string
  fg: string
  muted: string
  accent: string
  line: string
  hour: string
}> = {
  alba: {
    bg: "#F6EDE4",
    fg: "#2A1D17",
    muted: "#8A7468",
    accent: "#E25D3C",
    line: "rgba(42,29,23,.14)",
    hour: "07:12",
  },
  mezzogiorno: {
    bg: "#FBFAF7",
    fg: "#121722",
    muted: "#6B7280",
    accent: "#1F5FA8",
    line: "rgba(18,23,34,.12)",
    hour: "13:30",
  },
  tramonto: {
    bg: "#E9C9A3",
    fg: "#2B1A10",
    muted: "#7A5638",
    accent: "#B4461A",
    line: "rgba(43,26,16,.18)",
    hour: "20:41",
  },
  notte: {
    bg: "#141A2B",
    fg: "#F3EBDD",
    muted: "#8C93A8",
    accent: "#F5C451",
    line: "rgba(243,235,221,.14)",
    hour: "23:58",
  },
}

export const BRAND = "#F7914D"

/** Esegue `cb` quando il preloader ha finito (o subito, se è già finito). */
export function onLoaded(cb: () => void) {
  const root = document.documentElement
  if (root.classList.contains("is-loaded")) {
    cb()
    return () => {}
  }
  const mo = new MutationObserver(() => {
    if (root.classList.contains("is-loaded")) {
      mo.disconnect()
      cb()
    }
  })
  mo.observe(root, { attributes: true, attributeFilter: ["class"] })
  return () => mo.disconnect()
}
