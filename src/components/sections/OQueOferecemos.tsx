import Image from "next/image";
import { IMAGENS } from "@/lib/imagens";
import {
  ShoppingCart,
  Thermometer,
  Route,
  Leaf,
  Play,
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
 * esquerda, foto vertical com botão de play à direita, sangrando até a borda
 * do viewport no desktop.
 *
 * ⚠️ O botão de play é um placeholder de UI (não abre vídeo ainda). Quando
 * houver vídeo institucional, ligar o onClick a um modal/embed.
 *
 * Foto vem de src/lib/imagens.ts (IMAGENS.offerPanel).
 */
export function OQueOferecemos() {
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
        <button
          type="button"
          aria-label="Assistir vídeo institucional da Disalp"
          className="absolute left-16 top-1/2 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-800"
        >
          <Play size={26} strokeWidth={2} fill="currentColor" className="ml-1" aria-hidden />
        </button>
      </div>

      <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-6 lg:grid-cols-2">
        {/* Coluna de texto + grid 2x2 */}
        <div>
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-lima-300">
            O que oferecemos
          </span>
          <h2 className="mt-3 max-w-md font-display text-3xl font-bold leading-tight text-white md:text-4xl">
            Tudo que sua rede precisa, numa única entrega.
          </h2>
          <p className="mt-5 max-w-md font-sans text-base leading-relaxed text-primary-50/85">
            Da compra na Ceasa até a última gôndola reposta — cada etapa operada
            pela mesma equipe, com o mesmo padrão.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {ITENS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.titulo}
                  className="border border-white/15 bg-white/5 p-6 transition-colors hover:bg-white/10"
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
                  <a
                    href="#contato"
                    className="mt-4 inline-flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-wide text-lima-300 hover:text-white"
                  >
                    Saiba mais
                    <ArrowRight size={13} strokeWidth={2.5} aria-hidden />
                  </a>
                </div>
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
            <button
              type="button"
              aria-label="Assistir vídeo institucional da Disalp"
              className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-800"
            >
              <Play size={26} strokeWidth={2} fill="currentColor" className="ml-1" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
