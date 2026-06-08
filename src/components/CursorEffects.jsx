import { useEffect, useRef } from "react";
import { useCursor } from "../context/CursorContext";

const ICON_LAYOUT = [
  { key: "code", top: 0.08, left: 0.12 },
  { key: "terminal", top: 0.18, left: 0.88 },
  { key: "spark", top: 0.55, left: 0.05 },
  { key: "folder", top: 0.62, left: 0.9 },
  { key: "deploy", top: 0.35, left: 0.02 },
  { key: "merge", top: 0.28, left: 0.94 },
  { key: "data", top: 0.75, left: 0.22 },
  { key: "blocks", top: 0.12, left: 0.42 },
  { key: "refresh", top: 0.48, left: 0.96 },
  { key: "pen", top: 0.82, left: 0.72 },
  { key: "search", top: 0.42, left: 0.78 },
  { key: "check", top: 0.68, left: 0.55 },
];

const GLYPH = {
  code: "</>",
  terminal: ">_",
  spark: "✦",
  folder: "▦",
  deploy: "▶",
  merge: "⎇",
  data: "{}",
  check: "✓",
  refresh: "↻",
  blocks: "◇",
  pen: "✎",
  search: "⌕",
};

/** Full-page cursor spotlight + mesh grid */
export function CursorSpotlight() {
  return (
    <div className="cursor-fx-layer" aria-hidden>
      <div className="cursor-spotlight cursor-spotlight--primary" />
      <div className="cursor-spotlight cursor-spotlight--secondary" />
      <div className="cursor-grid" />
      <div className="cursor-ring" />
    </div>
  );
}

/** Hero floating chips that react to pointer position */
export function InteractiveIconField({ className = "" }) {
  const pointer = useCursor();

  return (
    <div className={`interactive-icon-field ${className}`} aria-hidden>
      {ICON_LAYOUT.map((item, i) => (
        <FloatingChip key={item.key} item={item} index={i} pointer={pointer} />
      ))}
      <div className="hero-glow-interactive" />
    </div>
  );
}

function FloatingChip({ item, index, pointer }) {
  const strength = 42 + (index % 3) * 14;
  const dx = (pointer.x - item.left) * strength;
  const dy = (pointer.y - item.top) * strength;
  const dist = Math.hypot(pointer.x - item.left, pointer.y - item.top);
  const near = Math.max(0, 1 - dist * 2.2);
  const scale = 1 + near * 0.18;

  return (
    <div
      className="icon-chip icon-chip--interactive"
      style={{
        top: `${item.top * 100}%`,
        left: `${item.left * 100}%`,
        transform: `translate(calc(-50% + ${-dx}px), calc(-50% + ${-dy}px)) scale(${scale})`,
        borderColor: `rgba(138, 180, 248, ${0.08 + near * 0.5})`,
        boxShadow: `0 4px 24px rgba(0,0,0,0.4), 0 0 ${20 + near * 40}px rgba(138, 180, 248, ${near * 0.35})`,
        zIndex: Math.round(near * 10),
        animationDelay: `${index * -0.35}s`,
      }}
    >
      {GLYPH[item.key] ?? "•"}
    </div>
  );
}

/** 3D tilt + shine on cards when pointer moves over them */
export function TiltCard({ children, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty("--tilt-x", `${y * -10}deg`);
      el.style.setProperty("--tilt-y", `${x * 10}deg`);
      el.style.setProperty("--shine-x", `${(x + 0.5) * 100}%`);
      el.style.setProperty("--shine-y", `${(y + 0.5) * 100}%`);
    };

    const onLeave = () => {
      el.style.setProperty("--tilt-x", "0deg");
      el.style.setProperty("--tilt-y", "0deg");
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={`tilt-card ${className}`}>
      <div className="tilt-card__shine" aria-hidden />
      <div className="tilt-card__inner">{children}</div>
    </div>
  );
}
