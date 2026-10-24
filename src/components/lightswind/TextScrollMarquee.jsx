import React from "react";
import { cn } from "@/lib/utils";

/**
 * TextScrollMarquee - Lightswind UI Infinite Smooth Marquee
 * Features seamless infinite horizontal scrolling with hover-pause.
 */
export const TextScrollMarquee = ({
  items = [],
  children,
  speed = "normal", // "slow", "normal", "fast"
  pauseOnHover = true,
  reverse = false,
  className = "",
}) => {
  const speedDurations = {
    slow: "45s",
    normal: "28s",
    fast: "18s",
  };

  const duration = speedDurations[speed] || speedDurations.normal;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden whitespace-nowrap py-2.5",
        className
      )}
      style={{
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
        maskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
      }}
    >
      <div
        className={cn(
          "flex w-max items-center gap-8",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          animation: `marquee-scroll ${duration} linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {/* First repetition */}
        <div className="flex shrink-0 items-center gap-8">
          {items.map((item, idx) => (
            <div key={`m1-${idx}`} className="inline-flex items-center gap-3">
              {item}
            </div>
          ))}
          {children}
        </div>

        {/* Second repetition for seamless loop */}
        <div className="flex shrink-0 items-center gap-8" aria-hidden="true">
          {items.map((item, idx) => (
            <div key={`m2-${idx}`} className="inline-flex items-center gap-3">
              {item}
            </div>
          ))}
          {children}
        </div>
      </div>
    </div>
  );
};

export default TextScrollMarquee;
