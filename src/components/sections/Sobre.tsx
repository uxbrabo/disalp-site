import Image from "next/image";
import { IMAGENS } from "@/lib/imagens";

/**
 * ⚠️ Números ilustrativos — placeholder de layout. Trocar pelos números
 * operacionais reais da Disalp antes de publicar.
 */
const METRICAS = [
  { valor: "35+", label: "Redes atendidas" },
  { valor: "6x", label: "Entregas / semana" },
  { valor: "98%", label: "Pedidos na janela" },
];

/**
 * Sobre — seção "About Us" no molde Rumput: colagem de imagem em duas camadas
 * à esquerda (imagem grande + imagem menor sobreposta no canto inferior),
 * estatísticas embaixo, e texto à direita.
 *
 * Fotos vêm de src/lib/imagens.ts (IMAGENS.aboutMain / IMAGENS.aboutInset).
 */
export function Sobre() {
  return (
    <section id="sobre" className="scroll-mt-[72px] py-24 md:py-28">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-x-16 gap-y-20 px-6 lg:grid-cols-2">
        {/* Coluna esquerda: colagem + estatísticas */}
        <div>
          <div className="relative">
            {/* Imagem principal — largura total da coluna */}
            <div className="relative aspect-video w-full overflow-hidden bg-primary-100">
              <Image
                src={IMAGENS.aboutMain.src}
                alt={IMAGENS.aboutMain.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Imagem menor — sobreposta ao canto inferior direito, sangrando
                um pouco pra fora da coluna (dentro do vão até o texto).
                Bleed menor no mobile (cabe dentro do px-6 da seção, sem
                estourar a viewport) e maior a partir de lg, quando o grid
                de 2 colunas abre um vão real entre as colunas. */}
            <div className="absolute -bottom-10 -right-4 aspect-[8/5] w-56 overflow-hidden border-4 border-background bg-primary-100 shadow-xl sm:w-64 lg:-right-10">
              <Image
                src={IMAGENS.aboutInset.src}
                alt={IMAGENS.aboutInset.alt}
                fill
                sizes="256px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Estatísticas */}
          <div className="mt-16 flex gap-10">
            {METRICAS.map((m) => (
              <div key={m.label}>
                <span className="font-display text-4xl font-extrabold text-primary md:text-5xl">
                  {m.valor}
                </span>
                <p className="mt-1 font-sans text-xs leading-snug text-muted-foreground">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Coluna direita: texto */}
        <div>
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
            Sobre a Disalp
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.15] text-grafite-500 md:text-5xl">
            Especialistas em cada etapa da cadeia hortifruti.
          </h2>
          <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-muted-foreground">
            Compramos direto na Ceasa, selecionamos por ponto de maturação e
            entregamos com cadeia de frio controlada — do primeiro contato até a
            última gôndola reposta, tudo operado pela mesma equipe.
          </p>
        </div>
      </div>
    </section>
  );
}
