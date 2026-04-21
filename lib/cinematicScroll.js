/**
 * cinematicScroll — animates window scroll with a custom cubic-bezier curve.
 * Feels snappy: fast start, smooth deceleration — like Apple's scroll physics.
 *
 * @param {number} targetY   - destination scrollY in pixels
 * @param {number} duration  - animation duration in ms (default 900)
 */
export function cinematicScroll(targetY, duration = 900) {
  const startY = window.scrollY;
  const delta  = targetY - startY;
  if (Math.abs(delta) < 2) return;

  let startTime = null;
  let rafId;

  // Cubic-bezier approximation: ease-out-expo feel
  // t in [0,1] → eased value in [0,1]
  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed  = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = easeOutExpo(progress);

    window.scrollTo(0, startY + delta * eased);

    if (progress < 1) {
      rafId = requestAnimationFrame(step);
    }
  }

  // Cancel any in-progress native smooth scroll
  window.scrollTo({ top: window.scrollY });
  rafId = requestAnimationFrame(step);

  // Return cancel function
  return () => cancelAnimationFrame(rafId);
}
