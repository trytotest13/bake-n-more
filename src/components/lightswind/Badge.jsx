import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#6B3E26] text-white shadow-sm",
        accent:
          "border-transparent bg-[#E9783F] text-white shadow-sm",
        gold:
          "border-[#F4C95D]/40 bg-[#FFF7D9] text-[#7A5410]",
        secondary:
          "border-[#EEDCCE] bg-[#FFF2E2] text-[#6B3E26]",
        outline:
          "border-[#6B3E26]/30 bg-white/70 text-[#6B3E26]",
        success:
          "border-transparent bg-emerald-600 text-white",
        veg:
          "border-emerald-600/40 bg-emerald-50 text-emerald-700",
      },
      size: {
        sm: "px-2 py-0.5 text-[11px]",
        default: "px-2.5 py-0.5 text-xs",
        lg: "px-3.5 py-1 text-sm font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export function Badge({
  className,
  variant,
  size,
  withDot,
  dotColor = "currentColor",
  interactive,
  children,
  ...props
}) {
  return (
    <div
      className={cn(
        badgeVariants({ variant, size }),
        interactive && "cursor-pointer hover:opacity-85 active:scale-95",
        className
      )}
      {...props}
    >
      {withDot && (
        <span
          className="h-1.5 w-1.5 rounded-full inline-block animate-pulse"
          style={{ backgroundColor: dotColor }}
        />
      )}
      {children}
    </div>
  );
}

export default Badge;
