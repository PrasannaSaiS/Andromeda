"use client";

import { useEffect, useRef } from "react";

export default function AnimatedCounter({
  target,
  suffix = "",
  duration = 2000,
  className = "",
}) {
  const ref = useRef(null);
  const hasAnimated = useRef(false); // ref, not state — no re-renders

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;
        observer.disconnect();

        const start = performance.now();
        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = eased * target;
          el.textContent = `${target % 1 === 0 ? Math.floor(current) : current.toFixed(1)}${suffix}`;
          if (progress < 1) requestAnimationFrame(tick);
          else el.textContent = `${target % 1 === 0 ? Math.floor(target) : target.toFixed(1)}${suffix}`;
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix, duration]); // stable deps, no hasAnimated

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
