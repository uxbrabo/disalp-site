"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { CATEGORIAS, type CategoriaId } from "@/lib/categorias";
import { PRODUTOS, formatarPreco, type Produto, type ProdutoBadge } from "@/lib/produtos";
import { fadeUp, usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

const FILTROS: { id: CategoriaId | "todos"; label: string }[] = [
  { id: "todos", label: "Todos" },
  ...CATEGORIAS.map((c) => ({ id: c.id, label: c.label })),
];

const BADGE_CLASSE: Record<ProdutoBadge, string> = {
  Promoção: "bg-vermelho-500 text-white",
  "Mais vendido": "bg-primary text-white",
  Novidade: "bg-lima-500 text-grafite-900",
};

const INTERVALO_MS = 3000;

/** 4 cartões no desktop, 2 no tablet, 1 no mobile — nunca um "cortado" na borda. */
function useVisiveis() {
  const [visiveis, setVisiveis] = useState(4);
  useEffect(() => {
    function calcular() {
      const w = window.innerWidth;
      setVisiveis(w < 640 ? 1 : w < 1024 ? 2 : 4);
    }
    calcular();
    window.addEventListener("resize", calcular);
    return () => window.removeEventListener("resize", calcular);
  }, []);
  return visiveis;
}

/**
 * ProdutosCarousel — vitrine de produtos no molde de e-commerce (referência
 * enviada): filtros por categoria, sempre exatamente N cartões inteiros
 * visíveis (nunca um pela metade), avanço automático a cada 3s, setas
 * quadradas. Cartão com placeholder colorido por categoria, badge, preço
 * ("de/por" quando em promoção) e botão que leva pro catálogo (/catalogo).
 * Cantos retos em todo lugar (design system da Disalp) — inclusive no botão
 * de carrinho e nas setas, por pedido explícito (sem exceção de "círculo").
 *
 * Placeholder de imagem: bloco na cor do token da categoria + ícone grande —
 * mesmo raciocínio de src/lib/imagens.ts. Trocar por foto do produto quando
 * tiver. Produtos e preços em src/lib/produtos.ts são ilustrativos.
 */
export function ProdutosCarousel() {
  const [filtro, setFiltro] = useState<CategoriaId | "todos">("todos");
  const [indice, setIndice] = useState(0);
  const visiveis = useVisiveis();
  const reduceMotion = usePrefersReducedMotion();

  const produtos =
    filtro === "todos" ? PRODUTOS : PRODUTOS.filter((p) => p.categoriaId === filtro);
  const maxIndice = Math.max(0, produtos.length - visiveis);
  const podeDeslizar = produtos.length > visiveis;

  // Zera o índice quando filtro/visiveis mudam — ajuste durante o render
  // (padrão recomendado pelo React pra "derivar estado a partir de props",
  // sem precisar de efeito nem risco de cascata de re-render).
  const chaveAtual = `${filtro}-${visiveis}`;
  const [chaveAnterior, setChaveAnterior] = useState(chaveAtual);
  if (chaveAtual !== chaveAnterior) {
    setChaveAnterior(chaveAtual);
    setIndice(0);
  }

  useEffect(() => {
    if (!podeDeslizar) return;
    const id = setInterval(() => {
      setIndice((i) => (i >= maxIndice ? 0 : i + 1));
    }, INTERVALO_MS);
    return () => clearInterval(id);
  }, [podeDeslizar, maxIndice]);

  function mover(delta: 1 | -1) {
    setIndice((i) => {
      const proximo = i + delta;
      if (proximo < 0) return maxIndice;
      if (proximo > maxIndice) return 0;
      return proximo;
    });
  }

  return (
    <section className="py-24 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          variants={fadeUp}
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "show"}
          viewport={{ once: true, margin: "-80px" }}
        >
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
            Nosso catálogo
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-grafite-500 md:text-4xl">
            Direto da Ceasa pra sua prateleira.
          </h2>

          <div className="mt-6 flex flex-wrap gap-2">
            {FILTROS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFiltro(f.id)}
                className={cn(
                  "border px-4 py-2 font-sans text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  filtro === f.id
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-background text-muted-foreground hover:border-primary-200"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="relative mt-10 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${indice * (100 / visiveis)}%)` }}
          >
            {produtos.map((produto) => (
              <div
                key={produto.id}
                className="shrink-0 px-2.5"
                style={{ width: `${100 / visiveis}%` }}
              >
                <ProdutoCard produto={produto} />
              </div>
            ))}
          </div>
        </div>

        {podeDeslizar && (
          <div className="mt-8 flex items-center justify-between gap-6">
            <div className="h-1 w-full max-w-[180px] bg-border">
              <div
                className="h-full bg-primary transition-[width]"
                style={{ width: `${((indice + 1) / (maxIndice + 1)) * 100}%` }}
              />
            </div>
            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                onClick={() => mover(-1)}
                aria-label="Produtos anteriores"
                className="flex h-11 w-11 items-center justify-center border border-border text-grafite-500 transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <ChevronLeft size={18} strokeWidth={2} aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => mover(1)}
                aria-label="Próximos produtos"
                className="flex h-11 w-11 items-center justify-center border border-border text-grafite-500 transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <ChevronRight size={18} strokeWidth={2} aria-hidden />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ProdutoCard({ produto }: { produto: Produto }) {
  const categoria = CATEGORIAS.find((c) => c.id === produto.categoriaId)!;
  const Icon = categoria.icon;

  return (
    <article className="group border border-border bg-background transition-[border-color,box-shadow,transform] duration-300 hover:border-primary-200 hover:shadow-lg motion-safe:hover:-translate-y-1">
      <div
        className="relative flex aspect-square items-center justify-center overflow-hidden"
        style={{ backgroundColor: `var(--color-${categoria.token}-50)` }}
      >
        {produto.badge && (
          <span
            className={cn(
              "absolute left-3 top-3 px-2.5 py-1 font-sans text-xs font-semibold",
              BADGE_CLASSE[produto.badge]
            )}
          >
            {produto.badge}
          </span>
        )}
        <Icon
          size={56}
          strokeWidth={1.5}
          style={{ color: `var(--color-${categoria.token}-500)` }}
          className="transition-transform duration-300 motion-safe:group-hover:scale-110"
          aria-hidden
        />
      </div>

      <div className="p-4">
        <p className="font-sans text-xs text-muted-foreground">
          {produto.categoriaLabel} · {produto.unidade}
        </p>
        <h3 className="mt-1 font-display text-base font-bold text-grafite-500">{produto.nome}</h3>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg font-bold text-grafite-500">
              {formatarPreco(produto.preco)}
            </span>
            {produto.precoAntigo && (
              <span className="font-sans text-xs text-muted-foreground line-through">
                {formatarPreco(produto.precoAntigo)}
              </span>
            )}
          </div>
          <Link
            href="/catalogo"
            aria-label={`Pedir ${produto.nome} no catálogo`}
            className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary text-white transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <ShoppingCart size={16} strokeWidth={2} aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}
