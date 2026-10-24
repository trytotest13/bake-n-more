import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * StylishCarousel - Lightswind UI 3D Perspective Fan-out Carousel
 * Features spring physics, swipe navigation, auto-advance, and active glow rings.
 */
export const StylishCarousel = ({
  items = [],
  initialIndex = 0,
  slideSize = "clamp(200px, 60vmin, 360px)",
  rotationDegrees = 18,
  inactiveScale = 0.75,
  yOffsetPercent = 20,
  springBounce = 0.15,
  springDuration = 0.8,
  showArrows = true,
  showDots = true,
  clickToNavigate = true,
  autoPlay = 4500,
  className,
  onIndexChange,
  borderRadius = "1.25rem",
  arrowClassName,
}) => {
  const clampedInitial = Math.max(0, Math.min(initialIndex, items.length - 1));
  const [activeIndex, setActiveIndex] = useState(clampedInitial);
  const autoPlayRef = useRef(null);
  const containerRef = useRef(null);

  const goTo = useCallback(
    (index) => {
      const clamped = Math.max(0, Math.min(index, items.length - 1));
      setActiveIndex(clamped);
      onIndexChange?.(clamped);
    },
    [items.length, onIndexChange]
  );

  const toPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const toNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") toPrev();
      if (e.key === "ArrowRight") toNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [toPrev, toNext]);

  // Touch / swipe
  const touchStartX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      if (delta > 0) {
        if (activeIndex < items.length - 1) toNext();
        else goTo(0);
      } else {
        if (activeIndex > 0) toPrev();
        else goTo(items.length - 1);
      }
    }
    touchStartX.current = null;
  };

  // Auto-play
  useEffect(() => {
    if (!autoPlay) return;
    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = prev + 1 >= items.length ? 0 : prev + 1;
        onIndexChange?.(next);
        return next;
      });
    }, autoPlay);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [autoPlay, items.length, onIndexChange]);

  const spring = {
    type: "spring",
    bounce: springBounce,
    duration: springDuration,
  };

  if (!items.length) return null;

  return (
    <div
      ref={containerRef}
      className={cn("relative flex flex-col items-center select-none w-full py-4", className)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Bakery Showcase Carousel"
      role="region"
    >
      {/* Slides Container */}
      <div
        style={{ width: slideSize, height: slideSize }}
        className="relative my-4 flex items-center justify-center"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {items.map((item, i) => {
            const offset = i - activeIndex;
            const isActive = offset === 0;
            // Only render adjacent slides to maintain high performance
            if (Math.abs(offset) > 2) return null;

            return (
              <motion.div
                key={i}
                style={{
                  width: slideSize,
                  height: slideSize,
                  zIndex: 20 - Math.abs(offset) * 2,
                }}
                className="absolute flex flex-col items-center gap-3 will-change-transform"
                animate={{
                  x: `${offset * 68}%`,
                  rotate: offset * rotationDegrees,
                  scale: isActive ? 1 : inactiveScale,
                  y: `${Math.abs(offset) * yOffsetPercent}%`,
                  opacity: Math.abs(offset) > 1 ? 0.35 : 1,
                }}
                transition={spring}
              >
                {/* Title badge */}
                <AnimatePresence>
                  {item.title && (
                    <motion.div
                      key={`title-${i}`}
                      initial={{ opacity: 0, y: -4 }}
                      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.6, y: -4 }}
                      transition={{ duration: 0.3 }}
                      className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#EEDCCE] shadow-sm text-xs sm:text-sm font-semibold whitespace-nowrap text-[#6B3E26]"
                    >
                      {item.title}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Image card */}
                <div
                  className="relative w-full flex-1 overflow-hidden shadow-[0_12px_32px_rgba(107,62,38,0.18)] rounded-2xl bg-[#FFF9F2] border-2 border-white"
                  style={{ borderRadius }}
                >
                  <img
                    src={item.src}
                    alt={item.alt ?? item.title ?? `Slide ${i + 1}`}
                    draggable={false}
                    onClick={() => clickToNavigate && goTo(i)}
                    className={cn(
                      "w-full h-full object-cover transition-all duration-300",
                      !isActive && "brightness-85 blur-[0.5px]",
                      clickToNavigate && !isActive && "cursor-pointer hover:brightness-95"
                    )}
                    loading="lazy"
                  />

                  {/* Active glow ring */}
                  {isActive && (
                    <div
                      className="pointer-events-none absolute inset-0 rounded-[inherit] border-2 border-[#E9783F] shadow-[inset_0_0_20px_rgba(233,120,63,0.35)]"
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Controls: Arrows & Dots */}
      <div className="mt-8 flex items-center gap-4 px-4 py-2 rounded-full bg-white/85 border border-[#EEDCCE] backdrop-blur-md shadow-md">
        {showArrows && (
          <button
            aria-label="Previous slide"
            onClick={toPrev}
            disabled={activeIndex === 0}
            className={cn(
              "p-2 rounded-full transition-all hover:bg-[#FFF2E2] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer",
              arrowClassName
            )}
          >
            <ChevronLeft className="w-5 h-5 text-[#6B3E26]" />
          </button>
        )}

        {showDots && (
          <div className="flex items-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all duration-300 cursor-pointer",
                  i === activeIndex
                    ? "w-6 bg-[#E9783F]"
                    : "w-2 bg-[#EEDCCE] hover:bg-[#E9783F]/50"
                )}
              />
            ))}
          </div>
        )}

        {showArrows && (
          <button
            aria-label="Next slide"
            onClick={toNext}
            disabled={activeIndex === items.length - 1}
            className={cn(
              "p-2 rounded-full transition-all hover:bg-[#FFF2E2] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer",
              arrowClassName
            )}
          >
            <ChevronRight className="w-5 h-5 text-[#6B3E26]" />
          </button>
        )}
      </div>
    </div>
  );
};

export default StylishCarousel;
