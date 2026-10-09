import { useEffect } from "react"
import { Outlet } from "react-router"
import Lenis from "lenis"
import "lenis/dist/lenis.css"
import "./home.css"
import { AskProvider } from "./ask/AskContext"
import AskPanel from "./ask/AskPanel"
import HomeNav from "./HomeNav"
import Preloader from "./Preloader"
import {
  gsap,
  ScrollTrigger,
  setLenis,
  prefersReducedMotion,
  onLoaded,
} from "./motion"

export default function HomeShell() {
  useEffect(() => {
    // la giornata comincia sempre all'alba: niente ripristino della posizione al reload
    const restoration = history.scrollRestoration
    history.scrollRestoration = "manual"
    window.scrollTo(0, 0)
    if (prefersReducedMotion())
      return () => void (history.scrollRestoration = restoration)

    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 })
    setLenis(lenis)
    lenis.on("scroll", ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    // niente scroll finché il preloader non ha alzato il sipario
    lenis.stop()
    const stopWaiting = onLoaded(() => lenis.start())

    return () => {
      stopWaiting()
      history.scrollRestoration = restoration
      gsap.ticker.remove(raf)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  return (
    <AskProvider>
      <div className="vh">
        <Preloader />
        <HomeNav />
        <main>
          <Outlet />
        </main>
        <AskPanel />
      </div>
    </AskProvider>
  )
}
