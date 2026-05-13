"use client";

import { useEffect, useRef } from "react";

// Seeded deterministic RNG — no hydration mismatch
function seededRand(seed) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export default function AmbientCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let raf, W, H, t = 0;
    let resizeTimer;

    const rand = seededRand(137);
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const isTouch  = window.matchMedia("(pointer: coarse)").matches;

    // ── Soft cursor influence (no custom cursor — uses native) ──────
    const pointer = { x: -9999, y: -9999, active: false };
    const onMouseMove = (e) => { pointer.x = e.clientX; pointer.y = e.clientY; pointer.active = true; };
    const onMouseLeave = () => { pointer.active = false; };
    if (!isTouch) {
      window.addEventListener("mousemove",  onMouseMove,  { passive: true });
      window.addEventListener("mouseleave", onMouseLeave);
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width  = W + "px";
      canvas.style.height = H + "px";
      ctx.scale(dpr, dpr);
    };

    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };

    // ── Sparse star field: much fewer, subtler ───────────────────────
    const STAR_COUNT = isMobile ? 55 : 90;
    const INFLUENCE_RADIUS = 180;
    const INFLUENCE_STRENGTH = 16;

    const STAR_COLORS = [
      "89,32,161",   // primary purple
      "59,64,196",   // secondary blue
      "255,255,255", // white (majority)
      "255,255,255",
      "255,255,255",
    ];

    const stars = Array.from({ length: STAR_COUNT }, () => {
      const colorIndex = Math.floor(rand() * STAR_COLORS.length);
      const r = rand() * 1.4 + 0.3;
      return {
        x: rand(), y: rand(),
        r,
        baseOp: rand() * 0.35 + 0.12,
        twinkleAmp:  rand() * 0.18 + 0.06,
        twinkleFreq: rand() * 0.03 + 0.008,
        twinkleOff:  rand() * Math.PI * 2,
        color: STAR_COLORS[colorIndex],
        // Smooth parallax offset
        ox: 0, oy: 0,
        // Parallax depth (subtle — more distant stars move less)
        depth: rand() * 0.4 + 0.1,
      };
    });

    // ── Minimal ambient nebula glows (2 only) ───────────────────────
    const NEBULAE = [
      { cx: 0.15, cy: 0.1,  rx: 0.28, ry: 0.18, color: "89,32,161",  op: 0.022, driftMult: 0.6 },
      { cx: 0.85, cy: 0.75, rx: 0.25, ry: 0.16, color: "59,64,196",  op: 0.018, driftMult: 0.4 },
    ];

    const LERP = 0.045;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.012;

      // Draw nebulae (very subtle)
      NEBULAE.forEach(n => {
        const gx = n.cx * W + Math.sin(t * 0.12 * n.driftMult) * 18;
        const gy = n.cy * H + Math.cos(t * 0.09 * n.driftMult) * 12;
        const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, n.rx * W);
        g.addColorStop(0,   `rgba(${n.color},${n.op})`);
        g.addColorStop(0.5, `rgba(${n.color},${n.op * 0.4})`);
        g.addColorStop(1,   `rgba(${n.color},0)`);
        ctx.save();
        ctx.scale(1, n.ry / n.rx);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(gx, gy * (n.rx / n.ry), n.rx * W, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw stars with soft cursor influence
      stars.forEach(s => {
        const sx = s.x * W;
        const sy = s.y * H;

        // Cursor-driven gentle drift
        let targetOx = 0, targetOy = 0;
        if (pointer.active) {
          const dx = sx - pointer.x;
          const dy = sy - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < INFLUENCE_RADIUS && dist > 0) {
            const force = (1 - dist / INFLUENCE_RADIUS) * INFLUENCE_STRENGTH * s.depth;
            targetOx = (dx / dist) * force;
            targetOy = (dy / dist) * force;
          }
        }

        // Smooth lerp
        s.ox += (targetOx - s.ox) * LERP;
        s.oy += (targetOy - s.oy) * LERP;

        const rx = sx + s.ox;
        const ry = sy + s.oy;

        const twinkle = s.baseOp + Math.sin(t * s.twinkleFreq * 60 + s.twinkleOff) * s.twinkleAmp;
        const alpha = Math.max(0.05, Math.min(0.7, twinkle));

        ctx.beginPath();
        ctx.arc(rx, ry, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color},${alpha})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", debouncedResize);
    resize();
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", debouncedResize);
      if (!isTouch) {
        window.removeEventListener("mousemove",  onMouseMove);
        window.removeEventListener("mouseleave", onMouseLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
