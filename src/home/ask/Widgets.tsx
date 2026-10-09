import { useEffect, useRef } from "react"
import { Link } from "react-router"
import gsap from "gsap"
import type { Widget } from "./engine"
import { it } from "@/i18n/it"

const t = it.ask.widgets

function useEnter() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.from(el, { y: 24, opacity: 0, duration: 0.8, ease: "expo.out" })
      gsap.from("[data-bar]", {
        scaleX: 0,
        transformOrigin: (_: number, bar: Element) =>
          bar.closest(".left") ? "right center" : "left center",
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.06,
        delay: 0.15,
      })
      gsap.from("[data-step]", {
        x: -12,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.09,
        delay: 0.1,
      })
      gsap.from("[data-check]", {
        scale: 0,
        duration: 0.5,
        ease: "back.out(3)",
        stagger: 0.09,
        delay: 0.35,
      })
    }, el)
    return () => ctx.revert()
  }, [])
  return ref
}

function Dots({ value }: { value: number }) {
  return (
    <span className="w-dots" aria-label={`${value} su 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} data-bar className={i < value ? "on" : ""} />
      ))}
    </span>
  )
}

export default function WidgetView({
  widget,
  onNavigate,
}: {
  widget: Widget
  onNavigate: () => void
}) {
  const ref = useEnter()

  if (widget.kind === "neighborhood") {
    return (
      <div ref={ref} className="w-card w-hood">
        <Link
          to={`/quartieri/${widget.id}`}
          onClick={onNavigate}
          className="w-hood-img"
        >
          <img
            src={widget.img.replace("w=1200&h=800", "w=640&h=640")}
            alt={widget.name}
          />
          <span className="w-hood-name">{widget.name}</span>
        </Link>
        <div className="w-hood-body">
          <div className="w-kv">
            <span>{t.rent}</span>
            <strong>{widget.rent}</strong>
          </div>
          <div className="w-kv">
            <span>{t.sea}</span>
            <strong>{widget.sea}</strong>
          </div>
          <div className="w-scores">
            {widget.scores.map((s) => (
              <div key={s.label} className="w-score">
                <span>{s.label}</span>
                <Dots value={s.value} />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (widget.kind === "checklist") {
    return (
      <div ref={ref} className="w-card w-check">
        <div className="w-head">{widget.title}</div>
        <ol>
          {widget.steps.map((s, i) => (
            <li key={s.title} data-step>
              <span className="w-check-dot" data-check>
                {i + 1}
              </span>
              <div>
                <strong>{s.title}</strong>
                <p>{s.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    )
  }

  return (
    <div ref={ref} className="w-card w-compare">
      <div className="w-compare-head">
        <span className="w-tag a">{widget.a}</span>
        <span className="w-head">{t.compare}</span>
        <span className="w-tag b">{widget.b}</span>
      </div>
      {widget.rows.map((r) => (
        <div key={r.label} className="w-row">
          <div className="w-bar left">
            <span data-bar style={{ width: `${r.a * 20}%` }} />
          </div>
          <span className="w-row-label">{r.label}</span>
          <div className="w-bar right">
            <span data-bar style={{ width: `${r.b * 20}%` }} />
          </div>
        </div>
      ))}
      <p className="w-verdict">{widget.verdict}</p>
    </div>
  )
}
