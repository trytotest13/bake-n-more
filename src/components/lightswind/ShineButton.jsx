import React from "react";
import { cn } from "@/lib/utils";

/**
 * ShineButton - Lightswind UI Animated Action Button
 * Features a reflective glossy light sweep across the surface.
 */
export const ShineButton = ({
  label,
  onClick,
  className = "",
  size = "md",
  variant = "primary",
  disabled = false,
  children,
  icon,
  ...props
}) => {
  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs font-medium min-h-[36px]",
    md: "px-5 py-2.5 text-sm font-semibold min-h-[44px]",
    lg: "px-7 py-3.5 text-base font-semibold min-h-[50px]",
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-[#6B3E26] via-[#854728] to-[#59321E] text-white shadow-[0_4px_14px_rgba(107,62,38,0.28)] hover:shadow-[0_6px_20px_rgba(107,62,38,0.38)]",
    accent:
      "bg-gradient-to-r from-[#E9783F] via-[#F18B57] to-[#D9662C] text-white shadow-[0_4px_14px_rgba(233,120,63,0.32)] hover:shadow-[0_6px_20px_rgba(233,120,63,0.45)]",
    gold:
      "bg-gradient-to-r from-[#F4C95D] via-[#F7D67C] to-[#E3B33D] text-[#2B211C] shadow-[0_4px_14px_rgba(244,201,93,0.35)] hover:shadow-[0_6px_20px_rgba(244,201,93,0.48)]",
    secondary:
      "bg-[#FFF2E2] text-[#6B3E26] border border-[#EEDCCE] hover:bg-[#FFEAD4] shadow-sm",
    outline:
      "bg-transparent text-[#6B3E26] border-2 border-[#6B3E26] hover:bg-[#6B3E26] hover:text-white",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl",
        "transition-all duration-300 ease-out active:scale-95 cursor-pointer",
        "focus:outline-none focus:ring-2 focus:ring-[#E9783F]/50 focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none",
        sizeStyles[size] || sizeStyles.md,
        variantStyles[variant] || variantStyles.primary,
        className
      )}
      {...props}
    >
      {/* Glossy sweeping light reflection */}
      {!disabled && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-full top-0 block -rotate-45 bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 transition-all duration-1000 group-hover:inset-full group-hover:opacity-100 animate-shine"
        />
      )}

      {icon && <span className="relative z-10 inline-flex items-center">{icon}</span>}
      <span className="relative z-10 inline-flex items-center gap-1.5">{children || label}</span>
    </button>
  );
};

export default ShineButton;
