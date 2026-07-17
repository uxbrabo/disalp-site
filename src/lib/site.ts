/**
 * Fonte única de identidade do site pra SEO/metadata (title, OG, canonical,
 * sitemap, robots, JSON-LD). SITE_URL vem de env porque o domínio de
 * produção ainda não está definido — configure NEXT_PUBLIC_SITE_URL no
 * Vercel assim que o domínio real existir. Até lá cai num placeholder
 * óbvio (fácil de notar se vazar pra produção sem configurar).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://disalp.example.com"
).replace(/\/$/, "");

export const SITE_NAME = "Disalp Distribuidora";

export const SITE_TAGLINE = "Hortifruti B2B em Recife";

export const SITE_DESCRIPTION =
  "Distribuição de hortifruti direto da Ceasa pra redes de varejo, hotéis, hospitais, restaurantes e resorts da Região Metropolitana do Recife.";
