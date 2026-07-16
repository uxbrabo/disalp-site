"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CATEGORIAS } from "@/lib/categorias";
import { EASE_OUT } from "@/lib/motion";

/**
 * RotaEntrega — elemento central do site.
 * A Faixa Espectro (barra assinatura do design system) é girada 90° e vira uma
 * espinha vertical que representa a rota de entrega: cada categoria é uma parada.
 *
 * Motion:
 *  - o preenchimento da linha acompanha o scroll (useScroll + useTransform,
 *    scaleY 0→1 com transform-origin no topo) — não é decorativo, é a leitura
 *    literal de "percorrer a rota".
 *  - cada parada entra com whileInView (uma vez, margem negativa pra disparar
 *    um pouco antes do centro da tela).
 *  - respeita prefers-reduced-motion: ver hook useReducedMotionSafe abaixo.
 */
export function RotaEntrega() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "end 0.35"],
  });

  const fillScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="rota" className="relative scroll-mt-[72px] py-28 md:py-36">
      <div className="mx-auto max-w-[1200px] px-6">
        <header className="mx-auto max-w-xl text-center">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
            Como funciona
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-grafite-500 md:text-4xl">
            Uma rota, cinco paradas.
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-muted-foreground">
            Cada categoria que a Disalp entrega é uma parada da mesma rota
            diária — da Ceasa até a sua gôndola.
          </p>
        </header>

        <div ref={containerRef} className="relative mx-auto mt-20 max-w-3xl">
          {/* trilho estático */}
          <div
            aria-hidden
            className="absolute left-6 top-0 h-full w-[3px] rounded-pill bg-border md:left-1/2 md:-translate-x-1/2"
          />
          {/* trilho preenchido, animado por scroll */}
          <motion.div
            aria-hidden
            style={{ scaleY: fillScale }}
            className="faixa-espectro absolute left-6 top-0 h-full w-[3px] origin-top rounded-pill md:left-1/2 md:-translate-x-1/2"
          />

          <ol className="relative flex flex-col gap-16">
            {CATEGORIAS.map((categoria, i) => {
              const Icon = categoria.icon;
              const isRight = i % 2 === 1;
              return (
                <motion.li
                  key={categoria.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, ease: EASE_OUT }}
                  className={`relative flex items-start gap-5 pl-16 md:w-1/2 md:pl-0 md:pr-16 ${
                    isRight
                      ? "md:ml-auto md:flex-row-reverse md:pl-16 md:pr-0 md:text-right"
                      : ""
                  }`}
                >
                  {/* marcador na espinha */}
                  <span
                    className="absolute left-6 top-1 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full border-2 border-background md:left-auto"
                    style={{
                      backgroundColor: `var(--color-${categoria.token}-500)`,
                      ...(isRight ? { right: "-14px" } : { left: "-14px" }),
                    }}
                  />

                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center"
                    style={{
                      backgroundColor: `var(--color-${categoria.token}-50)`,
                      color: `var(--color-${categoria.token}-600)`,
                    }}
                  >
                    <Icon size={22} strokeWidth={2} aria-hidden />
                  </div>

                  <div>
                    <h3 className="font-display text-lg font-bold text-grafite-500">
                      {categoria.label}
                    </h3>
                    <p className="mt-1 max-w-xs font-sans text-sm leading-relaxed text-muted-foreground">
                      {categoria.descricao}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
