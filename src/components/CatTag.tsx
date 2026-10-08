import { C } from "@/data";

export default function CatTag({ cat, label, onDark }: { cat: string; label: string; onDark?: boolean }) {
  const c = onDark ? "rgba(255,255,255,.5)" : (C[cat] ?? "#888");
  return (
    <span className="cat-tag" style={{ color: c }}>
      <span style={{ width: "5px", height: "5px", background: c, display: "inline-block", flexShrink: 0 }} />
      {label}
    </span>
  );
}
