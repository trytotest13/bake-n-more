import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * CountUp - Lightswind UI Animated Number Counter
 * Automatically triggers when scrolled into view.
 */
export const CountUp = ({
  to,
  from = 0,
  duration = 2,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
  separator: _separator = ",",
}) => {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    let animationFrame;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Ease out quad
      const easedProgress = 1 - (1 - progress) * (1 - progress);
      const currentVal = from + (to - from) * easedProgress;

      setCount(currentVal);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      } else {
        setCount(to);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, from, to, duration]);

  const formattedCount = decimals > 0
    ? count.toFixed(decimals)
    : Math.floor(count).toLocaleString();

  return (
    <span ref={ref} className={cn("inline-flex items-baseline font-bold tracking-tight", className)}>
      {prefix && <span>{prefix}</span>}
      <span>{formattedCount}</span>
      {suffix && <span>{suffix}</span>}
    </span>
  );
};

export default CountUp;
