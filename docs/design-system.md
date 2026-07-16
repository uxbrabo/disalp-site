# Disalp — Guia de ícones, tamanhos e boas práticas

> Este documento acompanha o projeto `disalp-site/`. Ele existe pra você (ou qualquer
> dev que entrar depois) não precisar adivinhar tamanho de nada — tudo que está
> implementado no código segue exatamente esta tabela.

---

## 1. Ícones

**Biblioteca escolhida: [lucide-react](https://lucide.dev)** — outline, stroke consistente
(2px), MIT license, tree-shakeable (cada ícone é importado individualmente, não carrega
a biblioteca inteira). É o padrão de mercado pra produtos que usam Tailwind + shadcn/ui,
e combina com o traço fino que já existe no ícone da logo.

### 1.1 Escala de tamanho (não usar valor fora daqui)

| Contexto | Tamanho | Stroke | Exemplo no código |
|---|---|---|---|
| Inline com texto pequeno (badge, meta) | 14px | 2 | `CategoriaBadge` |
| Nav, botão pequeno, campo de formulário | 16–18px | 2–2.5 | `Header` CTA |
| Ícone padrão de UI (links, botões grandes) | 20–22px | 2 | Botões do Hero |
| Ícone de destaque (tile de categoria) | 22–24px dentro de container 44px | 2 | `RotaEntrega` |
| Ícone hero/grande (se precisar) | 32–40px | 1.5–2 | reservado, não usado ainda |

### 1.2 Ícones já mapeados por categoria de produto

Esta correspondência é regra do design system — não trocar sem atualizar em todo o site:

| Categoria | Cor (token) | Ícone lucide |
|---|---|---|
| Frutas | `laranja-500` | `Apple` |
| Verduras | `lima-500` | `Salad` |
| Legumes | `verde-500` | `Carrot` |
| Ovos | `terracota-500` | `Egg` |
| Refrigerados | `azul-500` | `Snowflake` |

### 1.3 Ícones de apoio já usados

`Truck` (badge do hero), `ArrowRight` (CTAs), `MapPin`, `Phone`, `Mail` (footer).

---

## 2. Tipografia — papéis e tamanhos

3 famílias, cada uma com uso restrito (regra herdada do design system original —
não usar fonte fora do papel dela):

| Papel | Fonte | Onde |
|---|---|---|
| `font-display` | Plus Jakarta Sans (500–800) | H1, H2, títulos de card |
| `font-sans` | Inter (400–700) | corpo, nav, botões, formulários |
| `font-mono` | IBM Plex Mono (500–600) | badges de categoria, métricas, dados |

| Elemento | Classe Tailwind | Peso |
|---|---|---|
| H1 hero | `text-4xl md:text-6xl font-extrabold` | 800 |
| H2 seção | `text-3xl md:text-4xl font-bold` | 700 |
| H3 card | `text-lg font-bold` | 700 |
| Corpo | `text-base` / `text-sm` | 400 |
| Eyebrow/label | `text-xs font-semibold uppercase tracking-wider` | 600 |
| Número de métrica | `text-5xl font-extrabold` | 800 |

---

## 3. Espaçamento

| Token | Valor | Uso |
|---|---|---|
| `--spacing-section` | 7rem (112px) | padding vertical de seção, desktop |
| `--spacing-section-sm` | 4rem (64px) | padding vertical de seção, mobile |
| Container | `max-w-[1200px]` centralizado | largura máxima de conteúdo |
| Gap de grid | 24–32px (`gap-6`/`gap-8`) | entre cards/colunas |

---

## 4. Componentes — tamanhos padronizados

### Botão (`Button` / `ButtonLink`)
| Tamanho | Altura | Padding horizontal | Uso |
|---|---|---|---|
| `sm` | 36px | 16px | dentro de cards, header |
| `md` | 44px | 24px | padrão |
| `lg` | 52px | 32px | CTA principal de hero |

Variantes: `primary` (fundo verde-500), `secondary` (borda), `ghost` (sem fundo/borda).
Regra: **uma única variante `primary` por dobra de tela** — evita competir visualmente.

### Badge (`Badge` / `CategoriaBadge`)
Altura fixa 24px, ícone 14px, texto `font-mono text-xs`. Cor sempre vem do token da
categoria (`--color-{token}-50/200/700`), nunca hardcoded.

### Raio de borda
`--radius-sm` 6px (inputs pequenos) · `--radius-md` 8px (botões, cards) ·
`--radius-lg` 14px (cards grandes) · `--radius-pill` 999px (badges, barra assinatura).

---

## 5. Motion (Framer Motion)

| Padrão | Onde | Como |
|---|---|---|
| Entrada em cascata | Hero | `variants` com `custom={i}`, delay `i * 0.08s` |
| Reveal ao rolar | Paradas da rota (`RotaEntrega`) | `whileInView`, `once: true`, margem `-80px` |
| Preenchimento por scroll | Espinha vertical (`RotaEntrega`) | `useScroll` + `useTransform` → `scaleY` |
| Contador numérico | Métricas (`Numeros`) | `animate()` imperativo disparado por `useInView` |

Curva de easing única em todo o projeto: `[0.22, 1, 0.36, 1]` (ease-out suave),
centralizada em `src/lib/motion.ts` — não redigitar o array em cada componente.

Todas as animações são de opacidade/posição/escala (nunca layout thrashing) e
`once: true` nos reveals, então não repetem a cada scroll pra cima/baixo — é
intencional, evita a sensação de "site nervoso".

---

## 6. Boas práticas já aplicadas no código

- **Um único componente por responsabilidade** (`Button`, `Badge`, `FaixaEspectro`
  são primitivos; `Header`, `Hero`, `RotaEntrega`, `Numeros`, `Footer` são seções).
- **`cn()` (clsx + tailwind-merge)** em vez de concatenar strings de classe — evita
  classes conflitantes quando um componente recebe `className` de fora.
- **Cor nunca hardcoded em componente de seção** — sempre via token CSS
  (`var(--color-*)`) ou classe Tailwind gerada a partir do `@theme`.
- **Fontes self-hosted via `@fontsource`**, não `next/font/google` — evita
  dependência de rede externa no build e é mais previsível em CI/sandboxes.
- **Acessibilidade**: `aria-hidden` em elementos puramente decorativos (ícones ao
  lado de texto, marcadores da espinha), `alt` descritivo na logo, foco visível
  herdado do Tailwind nos botões (`focus-visible:ring-2`).
- **TypeScript estrito**: build já roda com `next build` limpo (type-check + lint
  passando, sem `any`).

---

## 7. O que falta pra produção (pendências, não bugs)

1. **Versão reversa/mono da logo.** A logo atual só funciona sobre fundo claro
   (o texto "isalp" é preto). No footer (fundo escuro) ela está dentro de um chip
   branco como solução temporária. Ideal: gerar uma versão branca/monocromática a
   partir do arquivo vetorial original pra usar solta em fundos escuros.
2. **Métricas são placeholder** — troque pelos números operacionais reais antes
   de publicar (estão comentadas no código, agora em `Sobre.tsx`).
3. **Fotografia real.** Hero, `Sobre.tsx` e `OQueOferecemos.tsx` agora usam
   slots fotográficos reais (fotos de banco via URL, centralizadas em
   `src/lib/images.ts`). São fotos de hortifruti/operação escolhidas pra bater
   com a composição de cada bloco da referência. Trocar as 4 URLs nesse arquivo
   — ou apontar pra `/public/fotos/*` se gerar imagens próprias (Higgsfield/
   Magnific). Cada container tem fundo verde de fallback, então uma URL que
   saia do ar aparece como bloco verde, não como imagem quebrada.
4. **Links sociais do Topbar** (`Topbar.tsx`) apontam para `#` — atualizar
   quando os perfis de WhatsApp/Instagram forem confirmados.
5. **Botão de play** (`OQueOferecemos.tsx`) é placeholder de UI — ligar a um
   modal/embed quando houver vídeo institucional.

---

## 8. Redesign — referência Rumput (registro da decisão)

A home foi reestruturada pra seguir a anatomia do template de referência
(Rumput — Landscape & Garden): topbar utilitária → header com CTA → hero
full-bleed com foto → faixa de categorias (verde, sobreposta ao hero) → seção
"Sobre" com colagem de imagem + estatísticas → seção de oferta (verde, grid
2×2 + foto com play sangrando na borda).

**Fidelidade fotográfica (2ª passada):** o `RotaEntrega` (espinha vertical com
scroll) foi **mantido intacto a pedido** — é o elemento que fica fora da
fidelidade estrita ao Rumput porque não tem equivalente tão bom no template.
Todas as *demais* seções foram alinhadas à referência, incluindo troca dos
placeholders de ícone por fotografia real (hero com foto de fundo + overlay,
colagem no Sobre, painel com play na oferta).

**Sistema de cor:** escala `--color-primary-*` (verde `#6FA02A`, amostrado por
pixel da referência), desacoplada da escala `--color-verde-*` (reservada só
pra categoria Legumes). `--color-primary`, `--color-primary-hover` e
`--color-dark-section` apontam pra essa escala nova.

**Componentes:** `Topbar`, `FaixaCategorias`, `Sobre`, `OQueOferecemos` (novos);
`Hero` reescrito como full-bleed fotográfico. `Numeros.tsx` saiu da composição
da home — as métricas agora vivem embutidas em `Sobre.tsx`, no molde Rumput.
O arquivo continua no projeto, só não está mais importado.
