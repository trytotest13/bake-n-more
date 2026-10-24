import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef(
  ({ className, hoverable = false, bordered = true, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl bg-white/90 backdrop-blur-sm text-[#2B211C] shadow-[0_4px_20px_rgba(107,62,38,0.06)]",
        bordered && "border border-[#EEDCCE]/80",
        hoverable &&
          "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(107,62,38,0.12)] hover:border-[#E9783F]/40",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, as: Tag = "h3", ...props }, ref) => (
  <Tag
    ref={ref}
    className={cn("font-bold text-xl leading-tight tracking-tight text-[#2B211C]", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-[#6E5D53]", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
export default Card;
