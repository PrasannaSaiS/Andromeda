"use client";

import { useEffect, useRef } from "react";

const C = {
  primary:   "89,32,161",
  secondary: "59,64,196",
  accent:    "239,90,152",
  white:     "255,255,255",
};

function seededRand(seed) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export default function CosmicCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf, W, H, t = 0;

    const rand = seededRand(42);

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = document.documentElement.scrollHeight;
    };

    // ── Stars ─────────────────────────────────────────────────────
    const STAR_COUNT = 300;
    const stars = Array.from({ length: STAR_COUNT }, () => {
      const r = rand() * 2.2 + 0.4;
      const pick = rand();
      const hue = pick < 0.18 ? C.primary
                : pick < 0.32 ? C.secondary
                : pick < 0.40 ? C.accent
                : C.white;
      return {
        x: rand(), y: rand(),
        r,
        baseOpacity: rand() * 0.55 + 0.25,
        twinkleAmp:  rand() * 0.35 + 0.15,
        twinkleFreq: rand() * 0.06 + 0.02,
        twinkleOff:  rand() * Math.PI * 2,
        hue,
        glowMult: r > 1.6 ? rand() * 6 + 5 : 0,
      };
    });

    // ── Constellation edges ────────────────────────────────────────
    const EDGES = [
      [0,4],[4,9],[9,14],[14,0],[14,19],
      [2,7],[7,12],[12,17],[17,2],
      [1,6],[6,11],[11,16],[16,21],
      [3,8],[8,13],[13,18],[18,3],
      [5,10],[10,15],[15,20],[20,5],
      [22,27],[27,32],[32,37],[37,42],
      [25,30],[30,35],[35,40],[40,45],
      [50,55],[55,60],[60,65],
    ].filter(([a,b]) => a < STAR_COUNT && b < STAR_COUNT);

    // ── Nebulae ────────────────────────────────────────────────────
    const NEBULAE = [
      { cx:0.12, cy:0.06, rx:0.32, ry:0.14, color:C.primary,   op:0.055, driftX:0.00008, driftY:0.00004 },
      { cx:0.88, cy:0.18, rx:0.26, ry:0.12, color:C.secondary, op:0.048, driftX:-0.00006,driftY:0.00005 },
      { cx:0.50, cy:0.45, rx:0.40, ry:0.16, color:C.primary,   op:0.038, driftX:0.00005, driftY:-0.00003},
      { cx:0.08, cy:0.70, rx:0.24, ry:0.11, color:C.accent,    op:0.042, driftX:0.00007, driftY:0.00006 },
      { cx:0.92, cy:0.62, rx:0.28, ry:0.13, color:C.secondary, op:0.045, driftX:-0.00005,driftY:-0.00004},
      { cx:0.52, cy:0.85, rx:0.34, ry:0.12, color:C.primary,   op:0.040, driftX:0.00004, driftY:0.00007 },
      { cx:0.30, cy:0.30, rx:0.20, ry:0.09, color:C.accent,    op:0.030, driftX:-0.00007,driftY:0.00003 },
    ];

    // ── Shooting stars ─────────────────────────────────────────────
    const SHOOT_INTERVAL = 3200; // ms between shots
    let lastShoot = 0;
    const shoots = [];

    function spawnShoot(now) {
      const r2 = seededRand(now % 9999);
      shoots.push({
        x: r2() * W,
        y: r2() * H * 0.5,
        len: r2() * 180 + 80,
        speed: r2() * 6 + 8,
        angle: Math.PI / 5 + r2() * 0.3,
        life: 1,
        decay: r2() * 0.018 + 0.012,
        color: r2() < 0.4 ? C.accent : C.white,
      });
    }

    // ── Draw ───────────────────────────────────────────────────────
    const draw = (timestamp) => {
      ctx.clearRect(0, 0, W, H);
      t += 0.016;

      // Nebulae (drifting slowly)
      NEBULAE.forEach(n => {
        const ox = Math.sin(t * n.driftX * 60) * 0.03;
        const oy = Math.cos(t * n.driftY * 60) * 0.02;
        const gx = (n.cx + ox) * W;
        const gy = (n.cy + oy) * H;
        const pulse = 1 + Math.sin(t * 0.4 + n.cx * 10) * 0.08;
        const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, n.rx * W * pulse);
        g.addColorStop(0,   `rgba(${n.color},${n.op})`);
        g.addColorStop(0.45,`rgba(${n.color},${n.op * 0.45})`);
        g.addColorStop(1,   `rgba(${n.color},0)`);
        ctx.save();
        ctx.scale(1, (n.ry / n.rx) * pulse);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(gx, gy * (n.rx / n.ry) / pulse, n.rx * W * pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Constellation lines — pulsing opacity
      EDGES.forEach(([a, b]) => {
        const sa = stars[a], sb = stars[b];
        const dist = Math.hypot(sa.x - sb.x, sa.y - sb.y);
        if (dist > 0.32) return;
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.8 + a * 0.3);
        const alpha = (1 - dist / 0.32) * 0.22 * pulse;
        ctx.lineWidth = 0.8;
        ctx.strokeStyle = `rgba(${C.primary},${alpha})`;
        ctx.beginPath();
        ctx.moveTo(sa.x * W, sa.y * H);
        ctx.lineTo(sb.x * W, sb.y * H);
        ctx.stroke();
      });

      // Stars
      stars.forEach(s => {
        const twinkle = s.baseOpacity + Math.sin(t * s.twinkleFreq * 60 + s.twinkleOff) * s.twinkleAmp;
        const alpha = Math.max(0.08, Math.min(0.95, twinkle));
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.hue},${alpha})`;
        ctx.fill();

        if (s.glowMult > 0) {
          const gr = ctx.createRadialGradient(s.x*W, s.y*H, 0, s.x*W, s.y*H, s.r * s.glowMult);
          gr.addColorStop(0, `rgba(${s.hue},${alpha * 0.45})`);
          gr.addColorStop(1, `rgba(${s.hue},0)`);
          ctx.beginPath();
          ctx.arc(s.x*W, s.y*H, s.r * s.glowMult, 0, Math.PI * 2);
          ctx.fillStyle = gr;
          ctx.fill();
        }
      });

      // Shooting stars
      if (timestamp - lastShoot > SHOOT_INTERVAL) {
        spawnShoot(timestamp);
        lastShoot = timestamp;
      }
      for (let i = shoots.length - 1; i >= 0; i--) {
        const sh = shoots[i];
        const tx = sh.x + Math.cos(sh.angle) * sh.len;
        const ty = sh.y + Math.sin(sh.angle) * sh.len;
        const g = ctx.createLinearGradient(sh.x, sh.y, tx, ty);
        g.addColorStop(0, `rgba(${sh.color},0)`);
        g.addColorStop(0.6, `rgba(${sh.color},${sh.life * 0.9})`);
        g.addColorStop(1, `rgba(${sh.color},0)`);
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = g;
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();
        sh.x += Math.cos(sh.angle) * sh.speed;
        sh.y += Math.sin(sh.angle) * sh.speed;
        sh.life -= sh.decay;
        if (sh.life <= 0) shoots.splice(i, 1);
      }

      raf = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 w-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
