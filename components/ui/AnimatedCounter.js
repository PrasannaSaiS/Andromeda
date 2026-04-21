"use client";

import { useEffect, useRef, useState } from "react";

/**
 * AnimatedCounter — counts up from 0 to target value.
 * Triggers when element enters viewport.
 * Uses requestAnimationFrame for smooth 60fps rendering.
 */
export default function AnimatedCounter({
  target,
  suffix = "",
  duration = 2000,
  className = "",
}) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCount();
        }
      },
      { threshold: 0.3 }
    );

    const el = ref.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasAnimated, target, suffix, duration]);

  function animateCount() {
    const start = performance.now();
    const el = ref.current;
    if (!el) return;

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out expo curve
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target * 10) / 10;
      
      const displayValue = target % 1 === 0 ? Math.floor(current) : current.toFixed(1);
      el.textContent = `${displayValue}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        const finalValue = target % 1 === 0 ? Math.floor(target) : target.toFixed(1);
        el.textContent = `${finalValue}${suffix}`;
      }
    }

    requestAnimationFrame(tick);
  }

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
