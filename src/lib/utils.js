import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes and handles conditional classNames
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  amount,
  currency = "INR",
  options
) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
    ...options,
  }).format(amount);
}
