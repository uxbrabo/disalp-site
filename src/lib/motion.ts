import { useSyncExternalStore } from "react";
import type { Variants } from "framer-motion";

/**
 * Curva de easing padrão do projeto (ease-out suave, "chega e assenta").
 * Usar esta constante em vez de digitar o array cru — mantém o TS feliz
 * (Framer Motion espera uma tupla, não number[]) e garante consistência
 * de movimento entre seções.
 */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/**
 * Variante de entrada por scroll padrão do projeto: fade + slide-up sutil
 * (16px). Reaproveitada pelas seções estáticas via whileInView.
 *
 * `show` aceita um índice (custom) pra cascata/stagger entre irmãos — passe
 * `custom={i}` no motion element. Sem custom, o índice é 0 (sem atraso).
 *
 * Gate de prefers-reduced-motion NÃO fica aqui: cada componente checa
 * usePrefersReducedMotion() e simplesmente omite initial/whileInView quando
 * o usuário pede menos movimento (o elemento aparece estático, já visível).
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: EASE_OUT },
  }),
};

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
