import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * MagicCard - Lightswind UI Interactive Card
 * Tracks mouse position to create a warm radial glow spotlight on hover.
 */
export const MagicCard = ({
  children,
  className = "",
  glowColor = "rgba(233, 120, 63, 0.2)",
  borderColor = "rgba(233, 120, 63, 0.4)",
  onClick,
  ...props
}) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-3xl transition-all duration-300",
        className
      )}
      {...props}
    >
      {/* Interactive mouse radial spotlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20"
        style={{
          background: isHovered
            ? `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 65%)`
            : "transparent",
        }}
      />
      {/* Border glow highlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20"
        style={{
          boxShadow: isHovered ? `inset 0 0 0 2px ${borderColor}` : "none",
        }}
      />
      {children}
    </div>
  );
};

export default MagicCard;
