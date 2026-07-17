import { Apple, Salad, Carrot, Egg, Snowflake, type LucideIcon } from "lucide-react";

/**
 * Mapeamento categoria → cor → ícone.
 * Esta correspondência é parte do design system (disalp-tokens.css) — não trocar.
 * Fonte da cor: --color-{token}-500 definido em globals.css.
 */
export type CategoriaId =
  | "frutas"
  | "verduras"
  | "legumes"
  | "ovos"
  | "refrigerados";

export interface Categoria {
  id: CategoriaId;
  label: string;
  token: "laranja" | "lima" | "verde" | "terracota" | "azul";
  icon: LucideIcon;
  descricao: string;
}

export const CATEGORIAS: Categoria[] = [
  {
    id: "frutas",
    label: "Frutas",
    token: "laranja",
    icon: Apple,
    descricao: "Selecionamos os melhores produtos.",
  },
  {
    id: "verduras",
    label: "Verduras",
    token: "lima",
    icon: Salad,
    descricao: "Folhas com cadeia de frio curta, colhidas na janela certa.",
  },
  {
    id: "legumes",
    label: "Legumes",
    token: "verde",
    icon: Carrot,
    descricao: "Volume constante para reposição diária de gôndola.",
  },
  {
    id: "ovos",
    label: "Ovos",
    token: "terracota",
    icon: Egg,
    descricao: "Classificação e rastreabilidade por lote de granja.",
  },
  {
    id: "refrigerados",
    label: "Refrigerados",
    token: "azul",
    icon: Snowflake,
    descricao: "Congelados e resfriados com controle de temperatura ponta a ponta.",
  },
];
