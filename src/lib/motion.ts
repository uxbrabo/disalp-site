import { useSyncExternalStore } from "react";

/**
 * Curva de easing padrão do projeto (ease-out suave, "chega e assenta").
 * Usar esta constante em vez de digitar o array cru — mantém o TS feliz
 * (Framer Motion espera uma tupla, não number[]) e garante consistência
 * de movimento entre seções.
 */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/** No servidor não há como saber a preferência — assume reduzido (mais seguro). */
function getServerSnapshot() {
  return true;
}

/**
 * Lê e acompanha prefers-reduced-motion via useSyncExternalStore (seguro pra
 * SSR, reage a mudança ao vivo da preferência, sem setState em efeito).
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
