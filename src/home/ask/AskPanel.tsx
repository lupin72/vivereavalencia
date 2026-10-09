import { useEffect, useRef, useState, type FormEvent } from "react"
import { Link } from "react-router"
import { useAsk } from "./AskContext"
import { answer, type Answer } from "./engine"
import WidgetView from "./Widgets"
import { gsap, getLenis, prefersReducedMotion } from "../motion"
import { it } from "@/i18n/it"

const t = it.ask

type Phase = "idle" | "thinking" | "streaming" | "done"

export default function AskPanel() {
  const { isOpen, query, nonce, close } = useAsk()
  const [input, setInput] = useState("")
  const [asked, setAsked] = useState("")
  const [phase, setPhase] = useState<Phase>("idle")
  const [result, setResult] = useState<Answer | null>(null)
  const [shown, setShown] = useState(0) // parole già scritte
  const timers = useRef<number[]>([])
  const root = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id))
    timers.current = []
  }

  const run = (q: string) => {
    const text = q.trim()
    if (!text) return
    clearTimers()
    setAsked(text)
    setInput("")
    setResult(null)
    setShown(0)
    setPhase("thinking")
    inputRef.current?.focus()
    const res = answer(text)
    const full = res.text || t.genericIntro
    const words = full.split(" ")
    const fast = prefersReducedMotion()
    timers.current.push(
      window.setTimeout(
        () => {
          setResult({ ...res, text: full })
          setPhase("streaming")
          if (fast) {
            setShown(words.length)
            setPhase("done")
            return
          }
          words.forEach((_, i) => {
            timers.current.push(
              window.setTimeout(
                () => setShown(i + 1),
                i * 28 + Math.random() * 20,
              ),
            )
          })
          timers.current.push(
            window.setTimeout(() => setPhase("done"), words.length * 28 + 120),
          )
        },
        fast ? 0 : 900,
      ),
    )
  }

  // Apertura e chiusura
  useEffect(() => {
    const el = root.current
    if (!el) return
    const lenis = getLenis()
    if (isOpen) {
      lenis?.stop()
      document.documentElement.classList.add("ask-open")
      gsap.set(el, { display: "flex" })
      gsap.fromTo(el, { opacity: 0 }, {
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
      })
      gsap.fromTo(".ask-sheet", { y: 40, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "expo.out",
      })
      if (query) run(query)
      else {
        setPhase("idle")
        setResult(null)
        setAsked("")
      }
      window.setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      clearTimers()
      lenis?.start()
      document.documentElement.classList.remove("ask-open")
      gsap.to(el, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => void gsap.set(el, { display: "none" }),
      })
    }
    return clearTimers
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, nonce])

  // Tieni in vista la risposta mentre si scrive; a risposta completa torna alla domanda
  useEffect(() => {
    const b = bodyRef.current
    if (!b) return
    if (phase === "streaming")
      b.scrollTo({ top: b.scrollHeight, behavior: "smooth" })
    if (phase === "thinking" || phase === "done")
      b.scrollTo({ top: 0, behavior: "smooth" })
  }, [shown, phase])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    run(input)
  }

  const words = result?.text.split(" ") ?? []

  return (
    <div
      ref={root}
      className="ask"
      role="dialog"
      aria-modal="true"
      aria-label={t.label}
      style={{ display: "none" }}
    >
      <button className="ask-backdrop" aria-label={t.close} onClick={close} />
      <div className="ask-sheet">
        <form className="ask-bar" onSubmit={onSubmit}>
          <span className="ask-spark" aria-hidden>
            ✦
          </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.placeholder}
            aria-label={t.placeholder}
          />
          <span className="ask-demo">{t.demo}</span>
          <button type="button" className="ask-esc" onClick={close}>
            esc
          </button>
        </form>

        <div className="ask-body" ref={bodyRef} data-lenis-prevent>
          {phase === "idle" && (
            <div className="ask-empty">
              <span className="ask-label">{t.empty}</span>
              {it.hero.examples.map((ex) => (
                <button
                  key={ex}
                  className="ask-suggest"
                  onClick={() => run(ex)}
                >
                  {ex}
                  <span aria-hidden>→</span>
                </button>
              ))}
            </div>
          )}

          {phase !== "idle" && (
            <article className="ask-answer">
              <h2 className="ask-q">{asked}</h2>

              {phase === "thinking" && (
                <div className="ask-thinking">
                  <span className="ask-pulse" />
                  {t.thinking}
                  <span className="ask-ellipsis" />
                </div>
              )}

              {result && (
                <p className="ask-text" aria-live="polite">
                  {words.slice(0, shown).map((w, i) => (
                    <span key={i} className="ask-word">
                      {w}{" "}
                    </span>
                  ))}
                  {phase === "streaming" && <span className="ask-caret" />}
                </p>
              )}

              {result && phase === "done" && (
                <>
                  {result.widget && (
                    <WidgetView widget={result.widget} onNavigate={close} />
                  )}

                  <div className="ask-section">
                    <span className="ask-label">{t.sources}</span>
                    <div className="ask-sources">
                      {result.sources.map((s, i) => (
                        <Link
                          key={s.id + i}
                          to={`/articolo/${s.id}`}
                          onClick={close}
                          className="ask-source"
                          style={{ animationDelay: `${i * 70}ms` }}
                        >
                          <img
                            src={s.img.replace(/w=\d+&h=\d+/, "w=160&h=160")}
                            alt=""
                          />
                          <span>
                            <small>
                              [{i + 1}] {s.cat}
                            </small>
                            {s.title}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="ask-section">
                    <span className="ask-label">{t.followUps}</span>
                    <div className="ask-follow">
                      {result.followUps.map((f) => (
                        <button key={f} onClick={() => run(f)}>
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </article>
          )}
        </div>
      </div>
    </div>
  )
}
