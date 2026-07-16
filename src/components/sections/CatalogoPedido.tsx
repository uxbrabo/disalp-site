"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { CATEGORIAS, type CategoriaId } from "@/lib/categorias";
import { PRODUTOS, formatarPreco, type Produto, type ProdutoBadge } from "@/lib/produtos";
import { montarLinkWhatsApp } from "@/lib/contato";
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

function montarMensagem(
  itens: { produto: Produto; quantidade: number }[],
  empresa: string,
  total: number
) {
  const linhas = itens.map(
    ({ produto, quantidade }) =>
      `- ${produto.nome} (${produto.unidade}) x${quantidade} — ${formatarPreco(produto.preco * quantidade)}`
  );
  const partes = [
    "Olá! Gostaria de fazer o seguinte pedido:",
    "",
    ...linhas,
    "",
    `Total estimado: ${formatarPreco(total)}`,
  ];
  if (empresa.trim()) {
    partes.push("", `Empresa: ${empresa.trim()}`);
  }
  return partes.join("\n");
}

/**
 * CatalogoPedido — página /catalogo: grid com todos os produtos, filtro por
 * categoria, seletor de quantidade por item e resumo fixo no rodapé que
 * monta o pedido como texto e abre o WhatsApp real da Disalp já preenchido.
 *
 * ⚠️ Sem backend/carrinho persistente — é a mesma lógica de "pedido via
 * WhatsApp" que pequenos/médios distribuidores já usam de verdade, então o
 * fluxo funciona ponta a ponta sem precisar de e-commerce.
 */
export function CatalogoPedido() {
  const [filtro, setFiltro] = useState<CategoriaId | "todos">("todos");
  const [quantidades, setQuantidades] = useState<Record<string, number>>({});
  const [empresa, setEmpresa] = useState("");

  const produtos =
    filtro === "todos" ? PRODUTOS : PRODUTOS.filter((p) => p.categoriaId === filtro);

  function alterar(id: string, delta: number) {
    setQuantidades((atual) => {
      const proxima = Math.max(0, (atual[id] ?? 0) + delta);
      return { ...atual, [id]: proxima };
    });
  }

  const itensSelecionados = useMemo(
    () =>
      PRODUTOS.filter((p) => (quantidades[p.id] ?? 0) > 0).map((produto) => ({
        produto,
        quantidade: quantidades[produto.id],
      })),
    [quantidades]
  );

  const totalItens = itensSelecionados.reduce((soma, i) => soma + i.quantidade, 0);
  const totalValor = itensSelecionados.reduce(
    (soma, i) => soma + i.quantidade * i.produto.preco,
    0
  );

  const linkPedido = montarLinkWhatsApp(
    montarMensagem(itensSelecionados, empresa, totalValor)
  );

  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 pb-32">
        <div className="max-w-2xl">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
            Catálogo
          </span>
          <h1 className="mt-3 text-balance font-display text-4xl font-bold leading-[1.15] text-grafite-500 md:text-5xl">
            Monte seu pedido.
          </h1>
          <p className="mt-4 font-sans text-base leading-relaxed text-muted-foreground">
            Escolha as quantidades e envie direto pelo WhatsApp — a gente confirma
            disponibilidade e prazo de entrega com você.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
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

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {produtos.map((produto) => {
            const categoria = CATEGORIAS.find((c) => c.id === produto.categoriaId)!;
            const Icon = categoria.icon;
            const quantidade = quantidades[produto.id] ?? 0;

            return (
              <article key={produto.id} className="border border-border bg-background">
                <div
                  className="relative flex aspect-[4/3] items-center justify-center overflow-hidden"
                  style={{ backgroundColor: `var(--color-${categoria.token}-50)` }}
                >
                  <Icon
                    size={48}
                    strokeWidth={1.5}
                    style={{ color: `var(--color-${categoria.token}-500)` }}
                    aria-hidden
                  />
                  <Image
                    src={produto.imagem}
                    alt={produto.nome}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                    className="object-cover"
                  />
                  {produto.badge && (
                    <span
                      className={cn(
                        "absolute left-3 top-3 z-10 px-2.5 py-1 font-sans text-xs font-semibold",
                        BADGE_CLASSE[produto.badge]
                      )}
                    >
                      {produto.badge}
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <p className="font-sans text-xs text-muted-foreground">
                    {produto.categoriaLabel} · {produto.unidade}
                  </p>
                  <h3 className="mt-1 font-display text-base font-bold text-grafite-500">
                    {produto.nome}
                  </h3>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="font-display text-lg font-bold text-grafite-500">
                      {formatarPreco(produto.preco)}
                    </span>
                    {produto.precoAntigo && (
                      <span className="font-sans text-xs text-muted-foreground line-through">
                        {formatarPreco(produto.precoAntigo)}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between border border-border">
                    <button
                      type="button"
                      onClick={() => alterar(produto.id, -1)}
                      disabled={quantidade === 0}
                      aria-label={`Diminuir quantidade de ${produto.nome}`}
                      className="flex h-10 w-10 items-center justify-center text-grafite-500 transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <Minus size={16} strokeWidth={2} aria-hidden />
                    </button>
                    <span className="font-sans text-sm font-semibold text-grafite-500">
                      {quantidade}
                    </span>
                    <button
                      type="button"
                      onClick={() => alterar(produto.id, 1)}
                      aria-label={`Aumentar quantidade de ${produto.nome}`}
                      className="flex h-10 w-10 items-center justify-center text-grafite-500 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <Plus size={16} strokeWidth={2} aria-hidden />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Resumo fixo — só aparece quando há algo selecionado */}
      {totalItens > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-6 py-4 pb-24 sm:flex-row sm:items-center sm:justify-between sm:pb-4 sm:pr-24">
            <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
              <p className="font-sans text-sm text-grafite-500">
                <span className="font-bold">{totalItens}</span>{" "}
                {totalItens === 1 ? "item" : "itens"} ·{" "}
                <span className="font-bold">{formatarPreco(totalValor)}</span>
              </p>
              <input
                type="text"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                placeholder="Nome da sua empresa (opcional)"
                autoComplete="organization"
                className="h-10 w-full max-w-xs border border-border bg-background px-3 font-sans text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
            <ButtonLink
              href={linkPedido}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              className="w-full justify-center sm:w-auto"
            >
              Enviar pedido pelo WhatsApp
            </ButtonLink>
          </div>
        </div>
      )}
    </section>
  );
}
