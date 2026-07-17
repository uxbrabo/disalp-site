/**
 * Fonte única dos dados de contato reais da Disalp — usado por Topbar,
 * Footer, Contato e o botão flutuante do WhatsApp. Trocar aqui, não nos
 * componentes.
 */
export const WHATSAPP_TELEFONE = "5581988148831";

export const WHATSAPP_URL = `https://api.whatsapp.com/send/?phone=${WHATSAPP_TELEFONE}&text&type=phone_number&app_absent=0`;

/** Monta um link do WhatsApp com mensagem pré-preenchida (ver CatalogoPedido.tsx). */
export function montarLinkWhatsApp(mensagem: string) {
  return `https://api.whatsapp.com/send/?phone=${WHATSAPP_TELEFONE}&text=${encodeURIComponent(mensagem)}`;
}

export const ENDERECO_COMPLETO =
  "CEASA-PE - Centro de Abastecimento e Logística de Pernambuco, BR-101 Sul, Km 70, s/n, Nº 550, Curado, Recife - PE, 50790-640, Brasil";

export const ENDERECO_CURTO = "CEASA-PE, Curado · Recife-PE";

export const GOOGLE_MAPS_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(ENDERECO_COMPLETO)}&output=embed`;

export const GOOGLE_MAPS_URL = `https://www.google.com/maps?q=${encodeURIComponent(ENDERECO_COMPLETO)}`;
