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
  /**
   * Foto do produto em /public/img/produtos/<id>.jpg (proporção 1:1,
   * fundo de feira desfocado, luz dourada — mesma estética do site).
   * Se o arquivo não existir, o cartão volta pro fundo colorido + ícone
   * da categoria (fallback automático via onError).
   */
  imagem: string;
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
    imagem: "/img/produtos/manga-tommy.png",
  },
  {
    id: "banana-prata",
    categoriaId: "frutas",
    categoriaLabel: "Frutas",
    nome: "Banana Prata AA",
    unidade: "Caixa 20kg",
    preco: 64.9,
    imagem: "/img/produtos/banana-prata.png",
  },
  {
    id: "alface-crespa",
    categoriaId: "verduras",
    categoriaLabel: "Verduras",
    nome: "Alface Crespa Hidropônica",
    unidade: "Caixa c/ 12 un.",
    preco: 38.5,
    badge: "Mais vendido",
    imagem: "/img/produtos/alface-crespa.png",
  },
  {
    id: "rucula-organica",
    categoriaId: "verduras",
    categoriaLabel: "Verduras",
    nome: "Rúcula Orgânica",
    unidade: "Caixa c/ 10 un.",
    preco: 42.0,
    imagem: "/img/produtos/rucula-organica.png",
  },
  {
    id: "tomate-italiano",
    categoriaId: "legumes",
    categoriaLabel: "Legumes",
    nome: "Tomate Italiano Extra AA",
    unidade: "Caixa 20kg",
    preco: 95.0,
    imagem: "/img/produtos/tomate-italiano.png",
  },
  {
    id: "cenoura-lavada",
    categoriaId: "legumes",
    categoriaLabel: "Legumes",
    nome: "Cenoura Lavada",
    unidade: "Caixa 20kg",
    preco: 58.0,
    imagem: "/img/produtos/cenoura-lavada.png",
  },
  {
    id: "ovos-brancos",
    categoriaId: "ovos",
    categoriaLabel: "Ovos",
    nome: "Ovos Brancos Grandes",
    unidade: "Caixa c/ 30 dz.",
    preco: 210.0,
    badge: "Novidade",
    imagem: "/img/produtos/ovos-brancos.png",
  },
  {
    id: "ovos-caipira",
    categoriaId: "ovos",
    categoriaLabel: "Ovos",
    nome: "Ovos Caipira",
    unidade: "Caixa c/ 30 dz.",
    preco: 265.0,
    imagem: "/img/produtos/ovos-caipira.png",
  },
  {
    id: "morango-congelado",
    categoriaId: "refrigerados",
    categoriaLabel: "Refrigerados",
    nome: "Morango Congelado IQF",
    unidade: "Pacote 1kg",
    preco: 24.9,
    imagem: "/img/produtos/morango-congelado.png",
  },
  {
    id: "polpa-fruta",
    categoriaId: "refrigerados",
    categoriaLabel: "Refrigerados",
    nome: "Polpa de Fruta Mista",
    unidade: "Caixa c/ 12x100g",
    preco: 48.0,
    imagem: "/img/produtos/polpa-fruta.png",
  },
  {
    id: "abacaxi-perola",
    categoriaId: "frutas",
    categoriaLabel: "Frutas",
    nome: "Abacaxi Pérola",
    unidade: "Caixa c/ 8 un.",
    preco: 72.0,
    badge: "Mais vendido",
    imagem: "/img/produtos/abacaxi-perola.png",
  },
  {
    id: "maca-fuji",
    categoriaId: "frutas",
    categoriaLabel: "Frutas",
    nome: "Maçã Fuji Nacional",
    unidade: "Caixa 18kg",
    preco: 118.0,
    imagem: "/img/produtos/maca-fuji.png",
  },
  {
    id: "couve-manteiga",
    categoriaId: "verduras",
    categoriaLabel: "Verduras",
    nome: "Couve Manteiga",
    unidade: "Caixa c/ 20 maços",
    preco: 45.0,
    imagem: "/img/produtos/couve-manteiga.png",
  },
  {
    id: "batata-lavada",
    categoriaId: "legumes",
    categoriaLabel: "Legumes",
    nome: "Batata Lavada Especial",
    unidade: "Saco 25kg",
    preco: 82.0,
    precoAntigo: 98,
    badge: "Promoção",
    imagem: "/img/produtos/batata-lavada.png",
  },
  {
    id: "cebola-nacional",
    categoriaId: "legumes",
    categoriaLabel: "Legumes",
    nome: "Cebola Nacional",
    unidade: "Saco 20kg",
    preco: 76.0,
    imagem: "/img/produtos/cebola-nacional.png",
  },
  {
    id: "mucarela-fatiada",
    categoriaId: "refrigerados",
    categoriaLabel: "Refrigerados",
    nome: "Muçarela Fatiada",
    unidade: "Peça 4kg",
    preco: 156.0,
    badge: "Novidade",
    imagem: "/img/produtos/mucarela-fatiada.png",
  },
];

export function formatarPreco(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
