"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { IMAGENS } from "@/lib/imagens";
import { ArrowRight, Leaf } from "lucide-react";
import { EASE_OUT, usePrefersReducedMotion } from "@/lib/motion";

const HERO_VIDEO_SRC = "/videos/VIDEO-HERO-01.mp4";
const CROSSFADE_S = 0.6;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: EASE_OUT },
  }),
};

/**
 * Hero — full-bleed com foto de fundo e texto sobreposto à esquerda
 * (referência Rumput). H1 em Plus Jakarta Sans (display), corpo em Inter.
 *
 * Legibilidade: gradiente sutil escuro da esquerda pra direita por cima da
 * foto — garante contraste do texto branco independente da foto usada, sem
 * escurecer a imagem toda (a referência mantém a foto clara à direita).
 *
 * A foto vem de src/lib/imagens.ts (IMAGENS.hero) — trocar lá. Ela também
 * serve de poster/fallback pro vídeo: primeira pintura antes do vídeo
 * carregar, e imagem estática pra quem tem prefers-reduced-motion.
 *
 * Vídeo (public/videos/VIDEO-HERO-01.mp4) só é montado no client, depois de
 * checar matchMedia — assim quem pede menos movimento nunca chega a baixar
 * o arquivo, só vê a foto parada.
 *
 * Motion: cascata de entrada (stagger 0.08s), sem parallax na primeira dobra.
 */
export function Hero() {
  const showVideo = !usePrefersReducedMotion();

  return (
    <section className="relative flex min-h-[560px] items-center overflow-hidden md:min-h-[86vh]">
      {/* Foto/vídeo de fundo */}
      <div className="absolute inset-0 bg-primary-900">
        <Image
          src={IMAGENS.hero.src}
          alt={IMAGENS.hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[56%_32%] md:object-center"
        />
        {showVideo && <HeroVideo src={HERO_VIDEO_SRC} />}
        {/* Gradiente de legibilidade */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(20,24,26,0.82) 0%, rgba(20,24,26,0.55) 38%, rgba(20,24,26,0.15) 68%, rgba(20,24,26,0) 100%)",
          }}
        />
      </div>

      {/* Conteúdo */}
      <div className="relative mx-auto w-full max-w-[1200px] px-6 py-24 md:py-28">
        <motion.div initial="hidden" animate="show" className="max-w-xl">
          <motion.span
            custom={0}
            variants={fadeUp}
            className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-primary-200"
          >
            <Leaf size={15} strokeWidth={2} aria-hidden />
            Distribuição de Hortifruti B2B
          </motion.span>

          <motion.h1
            custom={1}
            variants={fadeUp}
            className="mt-5 font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white md:text-6xl"
          >
            Da Ceasa pra
            <br />
            sua gôndola.
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            className="mt-6 max-w-md font-sans text-base leading-relaxed text-white/85 md:text-lg"
          >
            Compramos direto na Ceasa, selecionamos por ponto de maturação e
            entregamos com cadeia de frio controlada para as principais redes de
            varejo do Grande Recife.
          </motion.p>

          <motion.div custom={3} variants={fadeUp} className="mt-9">
            <ButtonLink
              href="/#sobre"
              size="lg"
              icon={<ArrowRight size={18} strokeWidth={2.5} />}
            >
              Conheça a Disalp
            </ButtonLink>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * HeroVideo — evita o "tremelique" do loop nativo (`loop` faz um corte seco
 * do último frame pro primeiro, visível porque nunca são idênticos). Dois
 * `<video>` sobrepostos, mesmo arquivo: enquanto um termina, o outro já
 * recomeça por baixo e um crossfade de opacidade (CROSSFADE_S) esconde o
 * corte. Como as duas tags apontam pro mesmo arquivo, o segundo play() sai
 * do cache do navegador — não baixa o vídeo de novo.
 */
function HeroVideo({ src }: { src: string }) {
  const refA = useRef<HTMLVideoElement>(null);
  const refB = useRef<HTMLVideoElement>(null);
  const [frenteA, setFrenteA] = useState(true);

  useEffect(() => {
    const frente = frenteA ? refA.current : refB.current;
    const fundo = frenteA ? refB.current : refA.current;
    if (!frente || !fundo) return;

    let trocou = false;

    function aoAtualizar() {
      if (!frente || !fundo || !frente.duration || trocou) return;
      const restante = frente.duration - frente.currentTime;
      if (restante <= CROSSFADE_S) {
        trocou = true;
        fundo.currentTime = 0;
        void fundo.play();
        setFrenteA((v) => !v);
      }
    }

    frente.addEventListener("timeupdate", aoAtualizar);
    return () => frente.removeEventListener("timeupdate", aoAtualizar);
  }, [frenteA]);

  return (
    <>
      <video
        ref={refA}
        autoPlay
        muted
        playsInline
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-[56%_32%] md:object-center"
        style={{ opacity: frenteA ? 1 : 0, transition: `opacity ${CROSSFADE_S}s linear` }}
      >
        <source src={src} type="video/mp4" />
      </video>
      <video
        ref={refB}
        muted
        playsInline
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-[56%_32%] md:object-center"
        style={{ opacity: frenteA ? 0 : 1, transition: `opacity ${CROSSFADE_S}s linear` }}
      >
        <source src={src} type="video/mp4" />
      </video>
    </>
  );
}
