"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollCanvas({
  frameCount = 240,
  framePrefix = "/frames/ezgif-frame-",
  frameSuffix = ".png",
  padLength = 3,
  className = "",
  containerHeightClass = "h-[400vh]",
  children,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const currentFrame = (index) => {
    const num = (index + 1).toString().padStart(padLength, "0");
    return `${framePrefix}${num}${frameSuffix}`;
  };

  // 1. LAZY PRELOAD — only starts when section is near viewport
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let started = false;

    const startLoad = () => {
      if (started) return;
      started = true;

      const images = new Array(frameCount).fill(null).map(() => new Image());
      imagesRef.current = images;

      // Load keyframes first (0, 60, 120, 180, 239) so canvas shows immediately
      const keyframes = [0, Math.floor(frameCount * 0.25), Math.floor(frameCount * 0.5), Math.floor(frameCount * 0.75), frameCount - 1];
      let loadedCount = 0;
      let keyframesLoaded = 0;

      const onLoad = () => {
        loadedCount++;
        setLoadProgress(loadedCount / frameCount);
        if (loadedCount === frameCount) setIsLoaded(true);
      };

      // Load keyframes first
      keyframes.forEach((i) => {
        images[i].onload = () => {
          keyframesLoaded++;
          onLoad();
          // Once first keyframe is ready, start filling the rest
          if (keyframesLoaded === 1) {
            for (let j = 0; j < frameCount; j++) {
              if (!keyframes.includes(j)) {
                images[j].onload = onLoad;
                images[j].src = currentFrame(j);
              }
            }
          }
        };
        images[i].src = currentFrame(i);
      });
    };

    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) startLoad(); },
      { rootMargin: "400px" } // start loading 400px before entering viewport
    );
    io.observe(container);

    return () => io.disconnect();
  }, [frameCount, framePrefix, frameSuffix, padLength]);

  // 2. RENDER & SCROLL LOGIC
  useEffect(() => {
    if (!isLoaded) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const context = canvas.getContext("2d", { alpha: false });
    let animationFrameId;
    let currentImageIndex = -1;
    let cachedRect = null;

    const updateDimensions = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap DPR at 2
      cachedRect = canvas.parentElement.getBoundingClientRect();
      canvas.width  = cachedRect.width  * dpr;
      canvas.height = cachedRect.height * dpr;
      context.scale(dpr, dpr);
    };

    updateDimensions();

    const render = (imageIndex) => {
      if (imageIndex === currentImageIndex) return;
      currentImageIndex = imageIndex;
      const img = imagesRef.current[imageIndex];
      if (!img?.complete || !cachedRect) return;

      const hRatio = cachedRect.width  / img.width;
      const vRatio = cachedRect.height / img.height;
      const ratio  = Math.max(hRatio, vRatio);
      const cx = (cachedRect.width  - img.width  * ratio) / 2;
      const cy = (cachedRect.height - img.height * ratio) / 2;

      context.drawImage(img, 0, 0, img.width, img.height, cx, cy, img.width * ratio, img.height * ratio);
    };

    render(0);

    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const handleScroll = () => {
      const scrollPos      = window.scrollY;
      const offsetTop      = container.offsetTop;
      const containerH     = container.offsetHeight;
      const viewportH      = window.innerHeight;

      let frac = (scrollPos - offsetTop) / (containerH - viewportH);
      frac = Math.max(0, Math.min(1, frac));

      let staged;
      if      (frac < 0.25) staged = easeOut(frac / 0.25) * 0.25;
      else if (frac < 0.5)  staged = 0.25 + easeOut((frac - 0.25) / 0.25) * 0.25;
      else if (frac < 0.75) staged = 0.5  + easeOut((frac - 0.5)  / 0.25) * 0.25;
      else                  staged = frac >= 0.95 ? 1.0 : 0.75 + easeOut((frac - 0.75) / 0.25) * 0.25;

      const frameIndex = Math.min(frameCount - 1, Math.floor(staged * frameCount));

      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => render(frameIndex));
    };

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateDimensions();
        currentImageIndex = -1;
        handleScroll();
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isLoaded, frameCount]);

  return (
    <div ref={containerRef} className={`relative w-full ${containerHeightClass} ${className}`}>
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        {!isLoaded && (
          <div className="absolute z-10 flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            <span className="text-white/80 font-mono text-sm tracking-widest uppercase">
              Loading Engine {Math.round(loadProgress * 100)}%
            </span>
          </div>
        )}
        <canvas
          ref={canvasRef}
          className={`w-full h-full block transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          style={{ width: "100%", height: "100%" }}
        />
        <div className="absolute inset-0 pointer-events-none">{children}</div>
      </div>
    </div>
  );
}
