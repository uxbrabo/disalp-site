"use client";

import { motion } from "framer-motion";
import { CATEGORIAS } from "@/lib/categorias";
import { fadeUp, usePrefersReducedMotion } from "@/lib/motion";

/**
 * FaixaCategorias — cartão verde arredondado, contido na mesma largura do
 * conteúdo (max-w-[1200px]), que se sobrepõe à base do hero (referência
 * Rumput: "faixa de 4 serviços"). Não é full-bleed — sobra respiro branco
 * nas laterais, igual à referência. Ícone de linha branco (sem círculo,
 * como na referência), título branco bold, descrição curta.
 *
 * São 5 colunas porque são as 5 categorias reais da Disalp (a referência tem
 * 4, mas o número vem do conteúdo). Ícone e label reaproveitam CATEGORIAS
 * (src/lib/categorias.ts) — mesma fonte de verdade de RotaEntrega e badges.
 */
export function FaixaCategorias() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section id="categorias" className="relative z-10 -mt-14 scroll-mt-[72px] md:-mt-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 bg-primary px-6 py-12 sm:grid-cols-3 md:grid-cols-5 md:px-10 md:py-14">
          {CATEGORIAS.map((categoria, i) => {
            const Icon = categoria.icon;
            return (
              <motion.div
                key={categoria.id}
                id={`categorias-${categoria.id}`}
                variants={fadeUp}
                custom={i}
                initial={reduceMotion ? undefined : "hidden"}
                whileInView={reduceMotion ? undefined : "show"}
                viewport={{ once: true, margin: "-80px" }}
                className="group flex scroll-mt-[72px] flex-col items-center px-2 text-center"
              >
                <Icon
                  size={40}
                  strokeWidth={1.5}
                  className="text-white transition-transform duration-300 motion-safe:group-hover:scale-110"
                  aria-hidden
                />
                <h2 className="mt-4 font-display text-lg font-bold text-white">
                  {categoria.label}
                </h2>
                <p className="mt-1.5 max-w-[170px] font-sans text-xs leading-relaxed text-primary-50/85">
                  {categoria.descricao}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
