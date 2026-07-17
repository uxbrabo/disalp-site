"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { IMAGENS } from "@/lib/imagens";
import { fadeUp, usePrefersReducedMotion } from "@/lib/motion";
import {
  ShoppingCart,
  Thermometer,
  Route,
  Leaf,
  ArrowRight,
} from "lucide-react";

const ITENS = [
  {
    icon: ShoppingCart,
    titulo: "Compra na Ceasa",
    descricao: "Seleção diária direto do maior centro de abastecimento da região.",
  },
  {
    icon: Thermometer,
    titulo: "Cadeia de Frio",
    descricao: "Temperatura controlada do armazém até a porta do cliente.",
  },
  {
    icon: Route,
    titulo: "Roteirização",
    descricao: "Rotas otimizadas, entrega dentro da janela combinada.",
  },
  {
    icon: Leaf,
    titulo: "Curadoria",
    descricao: "Seleção por ponto de maturação, reduz perda na gôndola.",
  },
];

/**
 * OQueOferecemos — seção "What We Offer" no molde Rumput: texto + grid 2x2 à
 * esquerda, foto vertical à direita, sangrando até a borda do viewport no
 * desktop.
 *
 * Foto vem de src/lib/imagens.ts (IMAGENS.offerPanel).
 */
export function OQueOferecemos() {
  const reduceMotion = usePrefersReducedMotion();
  const anim = (i: number) => ({
    variants: fadeUp,
    custom: i,
    initial: reduceMotion ? undefined : "hidden",
    whileInView: reduceMotion ? undefined : "show",
    viewport: { once: true, margin: "-80px" } as const,
  });

  return (
    <section className="relative overflow-hidden bg-primary py-24 md:py-28">
      {/* Foto sangrando na borda direita (desktop) */}
      <div className="absolute inset-y-0 right-0 hidden w-[42%] bg-primary-800 lg:block">
        <Image
          src={IMAGENS.offerPanel.src}
          alt={IMAGENS.offerPanel.alt}
          fill
          sizes="42vw"
          className="object-cover"
        />
      </div>

      <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-6 lg:grid-cols-2">
        {/* Coluna de texto + grid 2x2 */}
        <div>
          <motion.span
            {...anim(0)}
            className="block font-mono text-xs font-semibold uppercase tracking-wider text-lima-300"
          >
            O que oferecemos
          </motion.span>
          <motion.h2
            {...anim(1)}
            className="mt-3 max-w-md font-display text-3xl font-bold leading-tight text-white md:text-4xl"
          >
            Tudo que sua rede precisa, numa única entrega.
          </motion.h2>
          <motion.p
            {...anim(2)}
            className="mt-5 max-w-md font-sans text-base leading-relaxed text-primary-50/85"
          >
            Da compra na Ceasa até a última gôndola reposta, cada etapa operada
            pela mesma equipe, com o mesmo padrão.
          </motion.p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {ITENS.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.titulo}
                  {...anim(i)}
                  className="border border-white/15 bg-white/5 p-6 transition-[background-color,transform] duration-300 hover:bg-white/10 motion-safe:hover:-translate-y-1"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-800">
                    <Icon size={20} strokeWidth={1.75} className="text-white" aria-hidden />
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold text-white">
                    {item.titulo}
                  </h3>
                  <p className="mt-1.5 font-sans text-sm leading-relaxed text-primary-50/75">
                    {item.descricao}
                  </p>
                  <Link
                    href="/#contato"
                    className="mt-4 inline-flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-wide text-lima-300 hover:text-white"
                  >
                    Saiba mais
                    <ArrowRight size={13} strokeWidth={2.5} aria-hidden />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Espaçador para a foto absoluta no desktop; foto estática no mobile */}
        <div className="lg:hidden">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-primary-800">
            <Image
              src={IMAGENS.offerPanel.src}
              alt={IMAGENS.offerPanel.alt}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
