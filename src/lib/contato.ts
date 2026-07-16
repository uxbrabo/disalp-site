/**
 * Fonte única dos dados de contato reais da Disalp — usado por Topbar,
 * Footer, Contato e o botão flutuante do WhatsApp. Trocar aqui, não nos
 * componentes.
 */
export const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=5581988148831&text&type=phone_number&app_absent=0";

export const ENDERECO_COMPLETO =
  "CEASA-PE - Centro de Abastecimento e Logística de Pernambuco, BR-101 Sul, Km 70, s/n, Nº 550, Curado, Recife - PE, 50790-640, Brasil";

export const ENDERECO_CURTO = "CEASA-PE, Curado — Recife-PE";

export const GOOGLE_MAPS_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(ENDERECO_COMPLETO)}&output=embed`;

export const GOOGLE_MAPS_URL = `https://www.google.com/maps?q=${encodeURIComponent(ENDERECO_COMPLETO)}`;
