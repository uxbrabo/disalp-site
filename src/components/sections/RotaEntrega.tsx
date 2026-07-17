"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ArrowRight,
  ShoppingCart,
  Leaf,
  Thermometer,
  Route,
  Store,
  type LucideIcon,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { usePrefersReducedMotion } from "@/lib/motion";

interface Etapa {
  numero: string;
  icon: LucideIcon;
  titulo: string;
  descricao: string;
}

/**
 * As mesmas 4 capacidades de OQueOferecemos.tsx (mesmos ícones, de propósito
 * — é a mesma verdade em outra linguagem visual: lá é grid de capacidades,
 * aqui é a jornada cronológica, com início e fim — "da Ceasa pra gôndola").
 * "Reposição na Gôndola" fecha o ciclo que só existe aqui.
 */
const ETAPAS: Etapa[] = [
  {
    numero: "01",
    icon: ShoppingCart,
    titulo: "Ceasa",
    descricao: "Seleção direto no maior centro de abastecimento da região, por ponto de maturação.",
  },
  {
    numero: "02",
    icon: Leaf,
    titulo: "Curadoria",
    descricao: "Cada item passa por triagem de qualidade antes de sair do galpão.",
  },
  {
    numero: "03",
    icon: Thermometer,
    titulo: "Cadeia de Frio",
    descricao: "Temperatura controlada do armazém até a porta do cliente.",
  },
  {
    numero: "04",
    icon: Route,
    titulo: "Roteirização",
    descricao: "Rotas otimizadas, entrega dentro da janela combinada.",
  },
  {
    numero: "05",
    icon: Store,
    titulo: "Reposição na Gôndola",
    descricao: "Produto chega pronto pra ir direto à prateleira.",
  },
];

/** Posição horizontal de cada pontinho na linha reta (% da largura). */
const PONTOS_X = ["1%", "25%", "50%", "75%", "99%"];

const EPS = 0.0005;

function revealPoints(total: number) {
  const passo = 0.9 / (total - 1);
  return Array.from({ length: total }, (_, i) => 0.05 + i * passo);
}

function crescente(pontos: number[]): number[] {
  const out: number[] = [];
  for (const p of pontos) {
    let v = Math.min(Math.max(p, 0), 1);
    if (out.length > 0 && v <= out[out.length - 1]) {
      v = Math.min(out[out.length - 1] + EPS, 1);
    }
    out.push(v);
  }
  return out;
}

/**
 * RotaEntrega — linha reta horizontal com scroll-jacking (pin de 350vh) no
 * desktop: a linha se preenche e um cursor (estilo pino de navegação, com
 * sombra pra dar profundidade) viaja de ponta a ponta conforme o scroll,
 * mudando a cor de cada pontinho ao alcançá-lo.
 *
 * O texto de cada etapa NUNCA sobrepõe outro: em vez de crossfade contínuo,
 * o índice da etapa ativa é um estado React discreto (useMotionValueEvent) e
 * só um <PainelConteudo> é renderizado por vez — trocar de etapa desmonta o
 * anterior e monta o novo, sem overlap possível, nem por uma fração de scroll.
 *
 * Mobile e prefers-reduced-motion caem num fallback estático (mesmo
 * conteúdo, sem prender o scroll) — ver <TimelineEstatica />.
 *
 * ⚠️ useTransform aqui sempre usa clamp:false com domínio cobrindo [0,1]
 * inteiro. Motivo: o useScroll do framer-motion liga automaticamente uma
 * otimização nativa (ScrollTimeline/WAAPI) em transforms derivados de
 * scrollYProgress, que interpreta mal recortes estreitos. clamp:false
 * desliga essa otimização — como scrollYProgress nunca sai de [0,1] e nosso
 * domínio cobre [0,1] inteiro, não há extrapolação real.
 */
export function RotaEntrega() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section id="rota" className="relative scroll-mt-[72px]">
      {!reduceMotion && <TimelineAnimada />}
      <TimelineEstatica oculta={!reduceMotion} />
    </section>
  );
}

function Pitch() {
  return (
    <div>
      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
        Como funciona
      </span>
      <h2 className="mt-4 text-balance font-display text-4xl font-bold leading-[1.15] text-grafite-500 md:text-5xl">
        Uma rota, cinco paradas.
      </h2>
      <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-muted-foreground">
        Cada categoria que a Disalp entrega é uma parada da mesma rota diária,
        da Ceasa até a sua gôndola.
      </p>
      <div className="mt-9">
        <ButtonLink href="/catalogo" size="lg" icon={<ArrowRight size={18} strokeWidth={2.5} />}>
          Pedir tabela
        </ButtonLink>
      </div>
    </div>
  );
}

function TimelineAnimada() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const pontos = revealPoints(ETAPAS.length);
  const desenho = useTransform(scrollYProgress, [0, 1], [0, 1], { clamp: false });
  const cursorLeft = useTransform(scrollYProgress, [0, 1], ["1%", "99%"], { clamp: false });

  const [ativo, setAtivo] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    let idx = 0;
    for (let i = pontos.length - 1; i >= 0; i--) {
      if (v >= pontos[i]) {
        idx = i;
        break;
      }
    }
    setAtivo(idx);
  });

  return (
    <div ref={trackRef} className="relative hidden h-[350vh] lg:block">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-2 items-center gap-16 px-6">
          <Pitch />

          <div className="relative flex h-[420px] w-full flex-col">
            <div
              aria-hidden
              className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-primary-50 blur-3xl"
            />

            {/* Linha reta horizontal */}
            <div className="relative h-16 w-full shrink-0">
              <div className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-border" />
              <motion.div
                aria-hidden
                style={{ scaleX: desenho }}
                className="absolute left-0 top-1/2 h-[2px] w-full origin-left -translate-y-1/2 bg-primary"
              />

              {ETAPAS.map((etapa, i) => (
                <Ponto
                  key={etapa.numero}
                  numero={etapa.numero}
                  leftPercent={PONTOS_X[i]}
                  progress={scrollYProgress}
                  alcancaEm={i === 0 ? 0 : pontos[i]}
                />
              ))}

              {/* Cursor — "pino" que viaja de ponta a ponta, com sombra pra
                  dar profundidade (efeito 3D, tipo navegação). */}
              <motion.div
                aria-hidden
                style={{ left: cursorLeft }}
                className="absolute top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary-400 to-primary-700 shadow-[0_6px_14px_rgba(40,59,12,0.4)] ring-2 ring-background"
              />
            </div>

            {/* Painel de conteúdo — só a etapa ativa existe no DOM. Trocar de
                etapa desmonta a anterior (key muda) antes de montar a nova:
                nunca há duas ao mesmo tempo. */}
            <div className="relative mt-14 h-[190px] w-full max-w-md">
              <PainelConteudo key={ativo} etapa={ETAPAS[ativo]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Marcador pequeno na linha — sem texto, só preenche/aumenta quando alcançado. */
function Ponto({
  numero,
  leftPercent,
  progress,
  alcancaEm,
}: {
  numero: string;
  leftPercent: string;
  progress: MotionValue<number>;
  alcancaEm: number;
}) {
  // Fica cinza até "alcancaEm", troca rápido (transição de 0.03 de progresso)
  // pra verde+maior, e permanece assim — não é uma rampa lenta.
  const domain = crescente([0, alcancaEm, Math.min(alcancaEm + 0.03, 1), 1]);
  const scale = useTransform(progress, domain, [1, 1, 1.35, 1.35], { clamp: false });
  const cor = useTransform(progress, domain, [0, 0, 1, 1], { clamp: false });
  const background = useTransform(cor, (v) =>
    v > 0.5 ? "var(--color-primary)" : "var(--color-border)"
  );

  return (
    <motion.div
      style={{ left: leftPercent, scale, background }}
      className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-background"
    >
      <span className="sr-only">{numero}</span>
    </motion.div>
  );
}

/** Conteúdo de uma única etapa — sem animação de saída: ao trocar a key, o
 * anterior some instantaneamente e este entra com um fade rápido. */
function PainelConteudo({ etapa }: { etapa: Etapa }) {
  const Icon = etapa.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="absolute inset-0"
    >
      <span
        aria-hidden
        className="pointer-events-none block select-none font-display text-6xl font-extrabold text-primary-100"
      >
        {etapa.numero}
      </span>
      <div className="mt-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-md">
        <Icon size={18} strokeWidth={2} aria-hidden />
      </div>
      <h3 className="mt-3 font-display text-xl font-bold text-grafite-500">{etapa.titulo}</h3>
      <p className="mt-1.5 max-w-sm font-sans text-sm leading-relaxed text-muted-foreground">
        {etapa.descricao}
      </p>
    </motion.div>
  );
}

function TimelineEstatica({ oculta }: { oculta: boolean }) {
  return (
    <div className={oculta ? "lg:hidden" : undefined}>
      <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-28">
        <div className="mx-auto max-w-xl text-center">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
            Como funciona
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-grafite-500 md:text-4xl">
            Uma rota, cinco paradas.
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-muted-foreground">
            Cada categoria que a Disalp entrega é uma parada da mesma rota
            diária, da Ceasa até a sua gôndola.
          </p>
        </div>

        <ol className="relative mx-auto mt-16 flex max-w-2xl flex-col gap-10">
          <div
            aria-hidden
            className="absolute left-5 top-1 h-[calc(100%-8px)] w-[2px] bg-border"
          />
          {ETAPAS.map((etapa) => {
            const Icon = etapa.icon;
            return (
              <li key={etapa.numero} className="relative flex items-start gap-5 pl-0">
                <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                  <Icon size={20} strokeWidth={2} aria-hidden />
                </div>
                <div>
                  <span className="font-mono text-xs font-semibold text-primary">{etapa.numero}</span>
                  <h3 className="font-display text-lg font-bold text-grafite-500">{etapa.titulo}</h3>
                  <p className="mt-1 max-w-sm font-sans text-sm leading-relaxed text-muted-foreground">
                    {etapa.descricao}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
