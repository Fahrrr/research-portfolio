import { useEffect, useRef, useState } from "react";

const LERP = 0.09;

function lerp(a, b, t) {
  return a + (b - a) * t;
}

/**
 * Smooth pointer position (0–1 viewport) for cursor-driven animations.
 */
export function useSmoothPointer(enabled = true) {
  const target = useRef({ x: 0.5, y: 0.5 });
  const smooth = useRef({ x: 0.5, y: 0.5 });
  const [pos, setPos] = useState({ x: 0.5, y: 0.5, px: 0, py: 0 });
  const raf = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e) => {
      target.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    const tick = () => {
      smooth.current.x = lerp(smooth.current.x, target.current.x, LERP);
      smooth.current.y = lerp(smooth.current.y, target.current.y, LERP);

      const px = smooth.current.x * window.innerWidth;
      const py = smooth.current.y * window.innerHeight;

      document.documentElement.style.setProperty("--cursor-x", String(smooth.current.x));
      document.documentElement.style.setProperty("--cursor-y", String(smooth.current.y));
      document.documentElement.style.setProperty("--cursor-px", `${px}px`);
      document.documentElement.style.setProperty("--cursor-py", `${py}px`);

      const nx = smooth.current.x;
      const ny = smooth.current.y;
      setPos((prev) => {
        if (
          Math.abs(prev.x - nx) < 0.001 &&
          Math.abs(prev.y - ny) < 0.001
        ) {
          return prev;
        }
        return { x: nx, y: ny, px, py };
      });
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, [enabled]);

  return pos;
}
