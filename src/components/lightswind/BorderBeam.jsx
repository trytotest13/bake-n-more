import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * BorderBeam - Lightswind UI Animated Border Beam
 * Creates a glowing particle beam traveling smoothly around the perimeter of an element.
 * SVG-based implementation for 100% cross-browser reliability without mask artifacts.
 */
export const BorderBeam = ({
  className,
  size = 100,
  duration = 6,
  delay = 0,
  colorFrom = "#E9783F",
  colorTo = "#F4C95D",
  borderThickness = 2,
  beamBorderRadius = 24,
  reverse = false,
  initialOffset = 0,
  glowIntensity = 2,
  style,
}) => {
  const gradientId = React.useId().replace(/:/g, "_");

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden z-10",
        className
      )}
      style={style}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colorFrom} stopOpacity="0" />
            <stop offset="50%" stopColor={colorFrom} stopOpacity="1" />
            <stop offset="75%" stopColor={colorTo} stopOpacity="1" />
            <stop offset="100%" stopColor={colorTo} stopOpacity="0" />
          </linearGradient>
          {glowIntensity > 0 && (
            <filter id={`glow-${gradientId}`} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation={glowIntensity * 2} result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          )}
        </defs>
        <motion.rect
          x={borderThickness / 2}
          y={borderThickness / 2}
          width={`calc(100% - ${borderThickness}px)`}
          height={`calc(100% - ${borderThickness}px)`}
          rx={beamBorderRadius}
          ry={beamBorderRadius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={borderThickness}
          pathLength="100"
          strokeDasharray="25 75"
          filter={glowIntensity > 0 ? `url(#glow-${gradientId})` : undefined}
          initial={{ strokeDashoffset: reverse ? -100 + initialOffset : initialOffset }}
          animate={{ strokeDashoffset: reverse ? initialOffset : -100 + initialOffset }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: duration,
            delay: -delay,
          }}
        />
      </svg>
    </div>
  );
};

export default BorderBeam;
