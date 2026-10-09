import mark from "@/assets/vav-mark.png"

/** La pennellata "vav" del logo, usata come maschera: prende il colore di `currentColor`. */
export default function Mark({
  className = "",
  label,
}: {
  className?: string
  label?: string
}) {
  return (
    <span
      className={`mark ${className}`}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{ WebkitMaskImage: `url(${mark})`, maskImage: `url(${mark})` }}
    />
  )
}
