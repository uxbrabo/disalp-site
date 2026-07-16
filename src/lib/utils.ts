import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names safely (last conflicting utility wins).
 * Padrão usado em todo o projeto — sempre componha classes com cn(), nunca template string solta.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
