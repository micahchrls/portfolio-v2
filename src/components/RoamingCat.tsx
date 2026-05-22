import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const S  = 4;   // CSS pixels per game pixel
const GW = 24;  // game width
const GH = 16;  // game height
const CW = GW * S; // 96px
const CH = GH * S; // 64px
const SPEED    = 1.6;
const FRAME_MS = 150;

type CatState = "walking" | "sitting" | "cleaning";
type Facing   = "left" | "right";
type P        = [number, number, number, number, string];

// ── Palette ──────────────────────────────────────────────────────────────────
const o  = "#e8922a"; // orange body
const d  = "#b06010"; // dark orange (stripes, outline)
const cr = "#fae0a0"; // cream belly
const g  = "#22c55e"; // green eyes
const bk = "#2a1408"; // dark brown (pupils, mouth, outline)
const pk = "#f87171"; // pink nose
const ep = "#ffb0b0"; // ear inner pink
const hl = "#ffffff"; // eye highlight

// ── Pixel helper ─────────────────────────────────────────────────────────────
const px = (pixels: P[]) =>
  pixels.map(([x, y, w, h, c], i) => (
    <rect key={i} x={x*S} y={y*S} width={w*S} height={h*S} fill={c} />
  ));

// ── Walking cat (facing right) ────────────────────────────────────────────────
// Head block: x:0–11, y:3–10 (12×8 game px)
const HEAD: P[] = [
  // Left ear: pointed tip + body + pink inner
  [2,0,1,1,d], [1,1,4,2,d], [2,1,2,1,ep],
  // Right ear (symmetric around x:5.5)
  [9,0,1,1,d], [8,1,4,2,d], [9,1,2,1,ep],
  // Head block
  [0,3,12,8,o],
  // Left eye: green 3×3 + dark pupil + white highlight
  [1,5,3,3,g], [2,6,1,1,bk], [1,5,1,1,hl],
  // Right eye
  [8,5,3,3,g], [9,6,1,1,bk], [8,5,1,1,hl],
  // Nose: inverted T in pink
  [4,9,4,1,pk], [5,10,2,1,pk],
  // Mouth corners
  [3,10,1,1,bk], [8,10,1,1,bk],
  // Whiskers (2 rows per side, drawn over face)
  [0,8,3,1,bk], [9,8,3,1,bk],
  [0,9,3,1,bk], [9,9,3,1,bk],
  // Forehead tabby marks
  [2,3,2,1,d], [6,3,2,1,d],
];

// Body: x:8–21, y:4–10
const BODY: P[] = [
  [8,4,14,7,o],
  // Cream belly
  [11,5,8,5,cr],
  // Tabby stripes
  [9,4,2,3,d],
  [14,4,2,3,d],
  [19,4,2,3,d],
];

// Tail up (frame 0)
const TAIL_UP: P[] = [
  [21,1,3,7,o],
  [22,0,2,3,d],
];

// Tail down (frame 1)
const TAIL_DOWN: P[] = [
  [21,5,3,6,o],
  [22,10,2,2,d],
];

// Legs frame A (front-right + back-left forward)
const LEGS_A: P[] = [
  [10,11,3,5,o], [9,15,4,1,d],
  [14,12,3,4,cr], [13,15,4,1,d],
  [18,11,3,5,o], [17,15,4,1,d],
  [21,12,3,4,cr], [20,15,4,1,d],
];

// Legs frame B (opposite)
const LEGS_B: P[] = [
  [10,12,3,4,cr], [9,15,4,1,d],
  [14,11,3,5,o], [13,15,4,1,d],
  [18,12,3,4,cr], [17,15,4,1,d],
  [21,11,3,5,o], [20,15,4,1,d],
];

// ── Sitting pose ──────────────────────────────────────────────────────────────
const SIT: P[] = [
  // Ears
  [3,0,1,1,d], [2,1,4,2,d], [3,1,2,1,ep],
  [10,0,1,1,d], [9,1,4,2,d], [10,1,2,1,ep],
  // Head (centered)
  [1,3,12,7,o],
  // Eyes (squinting, 3×2)
  [2,5,3,2,g], [3,6,1,1,bk], [2,5,1,1,hl],
  [9,5,3,2,g], [10,6,1,1,bk], [9,5,1,1,hl],
  // Nose
  [5,8,4,1,pk], [6,9,2,1,pk],
  // Mouth
  [4,9,1,1,bk], [9,9,1,1,bk],
  // Whiskers
  [1,8,3,1,bk], [10,8,3,1,bk],
  // Body (upright, round)
  [3,10,10,5,o],
  // Belly
  [5,11,6,3,cr],
  // Haunches
  [1,11,3,4,o], [14,11,3,4,o],
  // Paws
  [4,14,3,2,o], [9,14,3,2,o],
  [4,15,3,1,d], [9,15,3,1,d],
  // Tail curled to side
  [16,11,2,4,o], [15,14,2,2,o], [13,15,3,1,o],
];

// ── Cleaning pose ─────────────────────────────────────────────────────────────
const CLEAN: P[] = [
  // Ears
  [3,0,1,1,d], [2,1,4,2,d], [3,1,2,1,ep],
  [10,0,1,1,d], [9,1,4,2,d], [10,1,2,1,ep],
  // Head
  [1,3,12,7,o],
  // Eyes closed (licking paw)
  [2,6,3,1,bk], [9,6,3,1,bk],
  // Raised paw to face
  [0,4,3,4,o],
  // Nose
  [5,8,4,1,pk], [6,9,2,1,pk],
  // Body
  [3,10,10,5,o],
  [5,11,6,3,cr],
  [1,11,3,4,o], [14,11,3,4,o],
  // Resting paw
  [9,14,3,2,o], [9,15,3,1,d],
  // Tail
  [16,11,2,4,o], [15,14,2,2,o], [13,15,3,1,o],
];

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export default function RoamingCat() {
  const shouldReduce = useReducedMotion();
  const wrapRef    = useRef<HTMLDivElement>(null);
  const rafRef     = useRef(0);
  const xRef       = useRef(rand(80, 300));
  const dxRef      = useRef(Math.random() > 0.5 ? SPEED : -SPEED);
  const nextDir    = useRef(Date.now() + rand(3000, 7000));
  const nextIdle   = useRef(Date.now() + rand(5000, 10000));
  const idleUntil  = useRef(0);
  const frameRef   = useRef(0);
  const stateRef   = useRef<CatState>("walking");
  const facingRef  = useRef<Facing>(dxRef.current > 0 ? "right" : "left");
  const lastFlip   = useRef(Date.now());

  const [, setTick] = useState(0);
  const bump = () => setTick(n => n + 1);

  useEffect(() => {
    if (shouldReduce) return;

    function loop() {
      const now = Date.now();

      // Walk frame flip
      if (now - lastFlip.current >= FRAME_MS) {
        frameRef.current = (frameRef.current + 1) % 2;
        lastFlip.current = now;
        bump();
      }

      // Frozen during idle
      if (now < idleUntil.current) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      // Wake from idle → resume walking
      if (idleUntil.current > 0) {
        idleUntil.current = 0;
        dxRef.current = (Math.random() > 0.5 ? 1 : -1) * SPEED;
        facingRef.current = dxRef.current > 0 ? "right" : "left";
        stateRef.current = "walking";
        bump();
      }

      // Random direction change
      if (now > nextDir.current) {
        dxRef.current = (Math.random() > 0.5 ? 1 : -1) * SPEED;
        facingRef.current = dxRef.current > 0 ? "right" : "left";
        nextDir.current = now + rand(3000, 7000);
        bump();
      }

      // Go idle
      if (now > nextIdle.current) {
        stateRef.current = Math.random() > 0.5 ? "sitting" : "cleaning";
        dxRef.current = 0;
        idleUntil.current = now + rand(2000, 4500);
        nextIdle.current  = now + rand(6000, 12000);
        nextDir.current   = now + rand(7000, 13000);
        bump();
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      // Horizontal movement only
      let x = xRef.current + dxRef.current;
      const maxX = window.innerWidth - CW;

      if (x < 0) {
        x = 0;
        dxRef.current = Math.abs(dxRef.current);
        facingRef.current = "right";
        bump();
      }
      if (x > maxX) {
        x = maxX;
        dxRef.current = -Math.abs(dxRef.current);
        facingRef.current = "left";
        bump();
      }

      xRef.current = x;

      // Y always pinned to bottom of viewport
      const y = window.innerHeight - CH;

      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate(${x}px,${y}px)`;
      }

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [shouldReduce]);

  if (shouldReduce) return null;

  const state  = stateRef.current;
  const frame  = frameRef.current;
  const facing = facingRef.current;

  return (
    <div
      ref={wrapRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: "none",
        willChange: "transform",
        transform: `translate(${xRef.current}px,${window.innerHeight - CH}px)`,
      }}
    >
      <svg
        width={CW}
        height={CH}
        viewBox={`0 0 ${CW} ${CH}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{
          display: "block",
          imageRendering: "pixelated",
          transform: facing === "left" ? "scaleX(-1)" : undefined,
        }}
        aria-hidden="true"
      >
        {state === "walking" && (
          <>
            {px(HEAD)}
            {px(BODY)}
            {px(frame === 0 ? TAIL_UP : TAIL_DOWN)}
            {px(frame === 0 ? LEGS_A  : LEGS_B)}
          </>
        )}
        {state === "sitting"  && px(SIT)}
        {state === "cleaning" && px(CLEAN)}
      </svg>
    </div>
  );
}
