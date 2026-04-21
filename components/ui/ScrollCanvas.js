"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ScrollCanvas — A highly optimized scroll-controlled image sequence player.
 * 
 * Features:
 * - Preloads all frames to prevent UI blocking
 * - Uses Canvas API for performant rendering (avoids massive DOM tree of <img>)
 * - requestAnimationFrame for 60fps scrolling
 * - Sticky layout with scroll progress mapping
 * - Responsive with object-fit: cover logic and DPI scaling
 */
export default function ScrollCanvas({
  frameCount = 240,
  framePrefix = "/frames/ezgif-frame-",
  frameSuffix = ".png",
  padLength = 3,
  className = "",
  containerHeightClass = "h-[400vh]", // Increased height for text pacing
  children,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Helper: Format frame numbers (e.g., 1 -> 001)
  const currentFrame = (index) => {
    const num = (index + 1).toString().padStart(padLength, "0");
    return `${framePrefix}${num}${frameSuffix}`;
  };

  // 1. PRELOAD SYSTEM
  useEffect(() => {
    let loadedCount = 0;
    const images = [];

    const loadImages = () => {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        
        // When each image loads, increment count and update progress
        img.onload = () => {
          loadedCount++;
          setLoadProgress(loadedCount / frameCount);
          if (loadedCount === frameCount) {
            setIsLoaded(true);
          }
        };
        images.push(img);
      }
    };

    loadImages();
    imagesRef.current = images;
  }, [frameCount, framePrefix, frameSuffix, padLength]);

  // 2. RENDER & SCROLL LOGIC
  useEffect(() => {
    // Only bind scrolling and rendering if all frames are ready
    if (!isLoaded) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const context = canvas.getContext("2d", { alpha: false }); // alpha: false optimizes rendering if frames have no transparency
    let animationFrameId;
    let currentImageIndex = -1; // Tracks last rendered frame to prevent redundant repaints
    let cachedRect = null;

    // Cache dimensions to prevent layout thrashing
    const updateDimensions = () => {
      const dpr = window.devicePixelRatio || 1;
      cachedRect = canvas.parentElement.getBoundingClientRect();
      canvas.width = cachedRect.width * dpr;
      canvas.height = cachedRect.height * dpr;
      context.scale(dpr, dpr);
    };

    updateDimensions();

    // 3. CANVAS RENDERING
    const render = (imageIndex) => {
      if (imageIndex === currentImageIndex) return;
      currentImageIndex = imageIndex;

      const img = imagesRef.current[imageIndex];
      if (!img || !cachedRect) return;

      // Calculate aspect ratio for 'object-fit: cover' behavior
      const hRatio = cachedRect.width / img.width;
      const vRatio = cachedRect.height / img.height;
      const ratio = Math.max(hRatio, vRatio); 
      
      // Center the image
      const centerShift_x = (cachedRect.width - img.width * ratio) / 2;
      const centerShift_y = (cachedRect.height - img.height * ratio) / 2;

      // clearRect removed: drawImage covers the whole canvas, saving GPU cycles
      context.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShift_x,
        centerShift_y,
        img.width * ratio,
        img.height * ratio
      );
    };

    // Initial draw
    render(0);

    // 4. SCROLL MAPPING
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const offsetTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate progress of the sticky container (0.0 to 1.0)
      let scrollFraction = (scrollPos - offsetTop) / (containerHeight - viewportHeight);
      scrollFraction = Math.max(0, Math.min(1, scrollFraction));

      // Map progress to exact frame index
      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
      );

      // PERFORMANCE: requestAnimationFrame ensures we only render on optimal screen refreshes
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => render(frameIndex));
    };

    // RESPONSIVENESS: Reset dimensions and re-render on resize
    const handleResize = () => {
      updateDimensions();
      currentImageIndex = -1; // Invalidate cache
      handleScroll();         // Recalculate and draw
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isLoaded, frameCount]);

  return (
    <div ref={containerRef} className={`relative w-full ${containerHeightClass} ${className}`}>
      {/* Sticky container holds the canvas in view while parent scrolls */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        
        {/* Preloader UI */}
        {!isLoaded && (
          <div className="absolute z-10 flex flex-col items-center justify-center space-y-4">
             <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin" />
             <span className="text-white/80 font-mono text-sm tracking-widest uppercase">
               Loading Engine {Math.round(loadProgress * 100)}%
             </span>
          </div>
        )}

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className={`w-full h-full block transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />

        {/* Text overlays and children passed from parent */}
        <div className="absolute inset-0 pointer-events-none">
          {children}
        </div>
      </div>
    </div>
  );
}
