import { useEffect, useRef } from "react"
import { Renderer, Program, Mesh, Triangle, Texture } from "ogl"

const vertex = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

// Foto con "luce dell'alba": gradazione calda che si neutralizza salendo (uDay),
// alone di luce che segue il cursore, leggera ondulazione e grana.
const fragment = /* glsl */ `
  precision highp float;
  uniform sampler2D tMap;
  uniform vec2 uRes;
  uniform vec2 uImg;
  uniform vec2 uMouse;
  uniform float uTime;
  uniform float uDay;
  uniform float uHover;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

  void main() {
    // object-fit: cover
    vec2 ratio = vec2(
      min((uRes.x / uRes.y) / (uImg.x / uImg.y), 1.0),
      min((uRes.y / uRes.x) / (uImg.y / uImg.x), 1.0)
    );
    vec2 uv = vec2(vUv.x * ratio.x + (1.0 - ratio.x) * 0.5, vUv.y * ratio.y + (1.0 - ratio.y) * 0.5);

    vec2 aspect = vec2(uRes.x / uRes.y, 1.0);
    float d = distance(vUv * aspect, uMouse * aspect);
    float ring = smoothstep(0.55, 0.0, d);

    // calore che ondeggia vicino al cursore
    uv += vec2(sin(uv.y * 18.0 + uTime * 1.4), cos(uv.x * 14.0 + uTime * 1.1)) * 0.0035 * ring * uHover;
    // zoom lentissimo, come il sole che sale
    uv = (uv - 0.5) * (1.0 - 0.04 * uDay) + 0.5;

    vec3 col = texture2D(tMap, uv).rgb;

    // gradazione alba: ombre rosate, luci pesca
    float luma = dot(col, vec3(0.299, 0.587, 0.114));
    vec3 dawn = mix(vec3(0.42, 0.22, 0.30), vec3(1.0, 0.80, 0.62), luma);
    col = mix(col, col * 0.55 + dawn * 0.55, 0.65 * (1.0 - uDay));

    // sole basso dall'angolo in alto a destra
    float sun = smoothstep(1.2, 0.0, distance(vUv * aspect, vec2(0.9, 0.95) * aspect));
    col += vec3(1.0, 0.55, 0.3) * sun * 0.22 * (1.0 - uDay * 0.6);

    // luce del cursore
    col += vec3(1.0, 0.62, 0.38) * ring * ring * 0.28 * uHover;

    // grana
    col += (hash(vUv * uRes + fract(uTime)) - 0.5) * 0.06;

    gl_FragColor = vec4(col, 1.0);
  }
`

type Props = { src: string; dayRef: React.MutableRefObject<number> }

export default function HeroGL({ src, dayRef }: Props) {
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = host.current
    if (!el) return

    let renderer: Renderer
    try {
      renderer = new Renderer({
        dpr: Math.min(window.devicePixelRatio, 1.75),
        alpha: false,
      })
    } catch {
      return // niente WebGL: resta l'<img> di riserva
    }
    const gl = renderer.gl
    gl.canvas.classList.add("hero-gl-canvas")
    el.appendChild(gl.canvas)

    const texture = new Texture(gl, { generateMipmaps: false })
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      texture.image = img
      program.uniforms.uImg.value = [img.naturalWidth, img.naturalHeight]
      el.classList.add("is-ready")
    }
    img.src = src

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        tMap: { value: texture },
        uRes: { value: [1, 1] },
        uImg: { value: [1, 1] },
        uMouse: { value: [0.62, 0.55] },
        uTime: { value: 0 },
        uDay: { value: 0 },
        uHover: { value: 0 },
      },
    })
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program })

    const resize = () => {
      const { width, height } = el.getBoundingClientRect()
      renderer.setSize(width, height)
      program.uniforms.uRes.value = [width, height]
    }
    const ro = new ResizeObserver(resize)
    ro.observe(el)
    resize()

    const target = { x: 0.62, y: 0.55, h: 0 }
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      target.x = (e.clientX - r.left) / r.width
      target.y = 1 - (e.clientY - r.top) / r.height
      target.h = 1
    }
    const onLeave = () => {
      target.h = 0
    }
    window.addEventListener("pointermove", onMove)
    document.addEventListener("pointerleave", onLeave)

    let visible = true
    const io = new IntersectionObserver(
      ([entry]) => (visible = entry.isIntersecting),
    )
    io.observe(el)

    let raf = 0
    const tick = (time: number) => {
      raf = requestAnimationFrame(tick)
      if (!visible) return
      const u = program.uniforms
      const m = u.uMouse.value as number[]
      m[0] += (target.x - m[0]) * 0.06
      m[1] += (target.y - m[1]) * 0.06
      u.uHover.value += (target.h - u.uHover.value) * 0.04
      u.uDay.value += (dayRef.current - u.uDay.value) * 0.1
      u.uTime.value = time * 0.001
      renderer.render({ scene: mesh })
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerleave", onLeave)
      gl.getExtension("WEBGL_lose_context")?.loseContext()
      gl.canvas.remove()
    }
  }, [src, dayRef])

  return <div ref={host} className="hero-gl" aria-hidden />
}
