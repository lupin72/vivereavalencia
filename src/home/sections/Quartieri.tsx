import { useEffect, useRef } from "react"
import { Link } from "react-router"
import { useAsk } from "../ask/AskContext"
import { gsap, SplitText } from "../motion"
import { quartieri } from "@/data"
import { it } from "@/i18n/it"

const t = it.quartieri

export default function Quartieri() {
  const { open } = useAsk()
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = new SplitText(".qx-title", { type: "lines", mask: "lines" })
      gsap.from(title.lines, {
        yPercent: 110,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".qx-title", start: "top 85%" },
      })

      const mm = gsap.matchMedia()
      mm.add(
        "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
        () => {
          const tr = track.current!
          const distance = () => tr.scrollWidth - window.innerWidth
          // scorrimento orizzontale: la sezione si ferma e i quartieri sfilano
          const move = gsap.to(tr, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: ".qx-pin",
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          })
          gsap.utils.toArray<HTMLElement>(".qcard").forEach((card) => {
            gsap.fromTo(card.querySelector("img"), { xPercent: -8 }, {
              xPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: move,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            })
            gsap.from(card.querySelector(".qcard-name"), {
              yPercent: 60,
              opacity: 0,
              ease: "expo.out",
              duration: 1,
              scrollTrigger: {
                trigger: card,
                containerAnimation: move,
                start: "left 80%",
              },
            })
          })
        },
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="qx" data-moment="mezzogiorno">
      <div className="qx-pin">
        <div className="qx-track" ref={track}>
          <div className="qx-intro">
            <span className="eyebrow">{t.eyebrow}</span>
            <h2 className="qx-title">
              {t.title.split("\n").map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </h2>
            <p className="lede">{t.intro}</p>
          </div>

          {quartieri.map((q, i) => (
            <Link key={q.id} to={`/quartieri/${q.id}`} className="qcard">
              <div className="qcard-img">
                <img src={q.img} alt={q.name} loading="lazy" />
              </div>
              <div className="qcard-head">
                <span className="qcard-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="qcard-tag">{q.tagLabel}</span>
              </div>
              <h3 className="qcard-name">{q.name}</h3>
              <dl className="qcard-facts">
                <div>
                  <dt>{t.rent}</dt>
                  <dd>{q.stats[0]?.value}</dd>
                </div>
                <div>
                  <dt>{t.forWho}</dt>
                  <dd>{t.forWhoById[q.id] ?? q.desc}</dd>
                </div>
              </dl>
              <span className="qcard-cta">
                {t.discover} <span aria-hidden>→</span>
              </span>
            </Link>
          ))}

          <div className="qx-end">
            <h3>{t.endTitle}</h3>
            <button className="pill-btn" onClick={() => open(t.endQuery)}>
              <span aria-hidden>✦</span> {t.endCta}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
