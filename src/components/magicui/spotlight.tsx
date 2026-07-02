import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Cursor-following radial glow (fixed, behind content). Renders nothing on
 * touch devices and under prefers-reduced-motion.
 */
export function Spotlight() {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });
  const [enabled, setEnabled] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }
    setEnabled(true);
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!enabled || shouldReduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0"
      style={{
        background: `radial-gradient(600px at ${pos.x}px ${pos.y}px, rgba(16, 185, 129, 0.05), transparent 80%)`,
      }}
    />
  );
}
