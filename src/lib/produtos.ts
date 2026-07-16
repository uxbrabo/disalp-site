import type { CategoriaId } from "@/lib/categorias";

export type ProdutoBadge = "Promoção" | "Mais vendido" | "Novidade";

export interface Produto {
  id: string;
  categoriaId: CategoriaId;
  categoriaLabel: string;
  nome: string;
  unidade: string;
  preco: number;
  precoAntigo?: number;
  badge?: ProdutoBadge;
}

/**
 * ⚠️ Catálogo ilustrativo — produtos e preços fictícios pra exemplificar o
 * layout. Trocar pelos itens e valores reais da Disalp antes de publicar.
 * Preços em R$, por unidade de venda no atacado (caixa/dúzia/kg), não
 * unidade de varejo.
 */
export const PRODUTOS: Produto[] = [
  {
    id: "manga-tommy",
    categoriaId: "frutas",
    categoriaLabel: "Frutas",
    nome: "Manga Tommy Selecionada",
    unidade: "Caixa 18kg",
    preco: 89.9,
    precoAntigo: 110,
    badge: "Promoção",
  },
  {
    id: "banana-prata",
    categoriaId: "frutas",
    categoriaLabel: "Frutas",
    nome: "Banana Prata AA",
    unidade: "Caixa 20kg",
    preco: 64.9,
  },
  {
    id: "alface-crespa",
    categoriaId: "verduras",
    categoriaLabel: "Verduras",
    nome: "Alface Crespa Hidropônica",
    unidade: "Caixa c/ 12 un.",
    preco: 38.5,
    badge: "Mais vendido",
  },
  {
    id: "rucula-organica",
    categoriaId: "verduras",
    categoriaLabel: "Verduras",
    nome: "Rúcula Orgânica",
    unidade: "Caixa c/ 10 un.",
    preco: 42.0,
  },
  {
    id: "tomate-italiano",
    categoriaId: "legumes",
    categoriaLabel: "Legumes",
    nome: "Tomate Italiano Extra AA",
    unidade: "Caixa 20kg",
    preco: 95.0,
  },
  {
    id: "cenoura-lavada",
    categoriaId: "legumes",
    categoriaLabel: "Legumes",
    nome: "Cenoura Lavada",
    unidade: "Caixa 20kg",
    preco: 58.0,
  },
  {
    id: "ovos-brancos",
    categoriaId: "ovos",
    categoriaLabel: "Ovos",
    nome: "Ovos Brancos Grandes",
    unidade: "Caixa c/ 30 dz.",
    preco: 210.0,
    badge: "Novidade",
  },
  {
    id: "ovos-caipira",
    categoriaId: "ovos",
    categoriaLabel: "Ovos",
    nome: "Ovos Caipira",
    unidade: "Caixa c/ 30 dz.",
    preco: 265.0,
  },
  {
    id: "morango-congelado",
    categoriaId: "refrigerados",
    categoriaLabel: "Refrigerados",
    nome: "Morango Congelado IQF",
    unidade: "Pacote 1kg",
    preco: 24.9,
  },
  {
    id: "polpa-fruta",
    categoriaId: "refrigerados",
    categoriaLabel: "Refrigerados",
    nome: "Polpa de Fruta Mista",
    unidade: "Caixa c/ 12x100g",
    preco: 48.0,
  },
];

export function formatarPreco(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
