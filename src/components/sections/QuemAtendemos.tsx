"use client";

import { motion } from "framer-motion";
import { Hotel, Hospital, UtensilsCrossed, Palmtree, Package, Truck } from "lucide-react";
import { fadeUp, usePrefersReducedMotion } from "@/lib/motion";

const SEGMENTOS = [
  { icon: Hotel, label: "Hotéis" },
  { icon: Hospital, label: "Hospitais" },
  { icon: UtensilsCrossed, label: "Restaurantes" },
  { icon: Palmtree, label: "Resorts" },
];

const DESTAQUES = [
  { icon: Package, valor: "+2 mil", label: "itens no catálogo" },
  { icon: Truck, valor: "Frota própria", label: "sem depender de terceiros" },
];

/**
 * QuemAtendemos — ponte entre a faixa de categorias (produto) e o Sobre
 * (empresa): mostra a escala/abrangência da operação antes de contar a
 * história. Badges de segmento + 2 destaques (catálogo e frota), mesmo
 * grid de 2 colunas usado no resto do site.
 */
export function QuemAtendemos() {
  const reduceMotion = usePrefersReducedMotion();
  const anim = (i: number) => ({
    variants: fadeUp,
    custom: i,
    initial: reduceMotion ? undefined : "hidden",
    whileInView: reduceMotion ? undefined : "show",
    viewport: { once: true, margin: "-80px" } as const,
  });

  return (
    <section className="py-24 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div {...anim(0)} className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
            Quem atendemos
          </span>
          <h2 className="mt-4 text-balance font-display text-4xl font-bold leading-[1.15] text-grafite-500 md:text-5xl">
            Especialistas em abastecer grandes operações.
          </h2>
        </motion.div>

        {/* Segmentos atendidos */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {SEGMENTOS.map((segmento, i) => {
            const Icon = segmento.icon;
            return (
              <motion.span
                key={segmento.label}
                {...anim(i)}
                className="inline-flex items-center gap-2 border border-border bg-background px-4 py-2 font-sans text-sm font-medium text-grafite-500 transition-[color,border-color,transform] duration-300 hover:border-primary-200 motion-safe:hover:-translate-y-0.5"
              >
                <Icon size={18} strokeWidth={2} className="text-primary" aria-hidden />
                {segmento.label}
              </motion.span>
            );
          })}
        </div>

        {/* Destaques de escala */}
        <div className="mx-auto mt-16 grid max-w-xl grid-cols-1 gap-8 sm:grid-cols-2">
          {DESTAQUES.map((destaque, i) => {
            const Icon = destaque.icon;
            return (
              <motion.div key={destaque.label} {...anim(i)} className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary">
                  <Icon size={20} strokeWidth={2} aria-hidden />
                </div>
                <div>
                  <p className="font-display text-2xl font-extrabold text-primary">
                    {destaque.valor}
                  </p>
                  <p className="font-sans text-xs text-muted-foreground">{destaque.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
