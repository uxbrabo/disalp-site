/**
 * Fonte única das imagens do site.
 *
 * ⚠️ TODAS as imagens abaixo são PLACEHOLDERS gerados (texturas verdes de
 * profundidade), não fotos reais. O layout foi construído pra fotografia — é
 * só trocar cada arquivo em /public/img/ pela foto real da Disalp (mesmo nome
 * de arquivo = zero mudança de código) ou apontar `src` pra uma nova imagem.
 *
 * Proporções pensadas por slot (mantenha parecido ao trocar):
 *  - hero:        paisagem, foco/luz à direita, lado esquerdo mais escuro
 *                 (o texto branco fica à esquerda). ~16:10.
 *  - aboutMain:   paisagem, cena ampla (galpão / Ceasa / rota). ~4:3.
 *  - aboutInset:  retrato/quadrada, detalhe humano (equipe / conferência). ~5:4.
 *  - offerPanel:  vertical, pessoa/produto (recebe o botão de play). ~4:5.
 */
export const IMAGENS = {
  hero: {
    src: "/img/hero.jpg",
    alt: "Operação Disalp: seleção e distribuição de hortifruti",
  },
  aboutMain: {
    src: "/img/about-main.jpg",
    alt: "Central de distribuição da Disalp",
  },
  aboutInset: {
    src: "/img/about-inset.jpg",
    alt: "Equipe da Disalp conferindo a qualidade dos produtos",
  },
  offerPanel: {
    src: "/img/offer-panel.jpg",
    alt: "Produtos hortifruti selecionados pela Disalp",
  },
} as const;
