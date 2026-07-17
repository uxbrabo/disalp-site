import type { Metadata, Viewport } from "next";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";
import { WHATSAPP_URL } from "@/lib/contato";
import "./globals.css";

const TITLE_PADRAO = `${SITE_NAME} | ${SITE_TAGLINE}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE_PADRAO,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "hortifruti atacado Recife",
    "distribuidora de hortifruti",
    "fornecedor de frutas e verduras B2B",
    "Ceasa Pernambuco",
    "distribuição de alimentos Recife",
    "fornecedor hortifruti hotéis restaurantes",
  ],
  authors: [{ name: SITE_NAME }],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: SITE_NAME,
    title: TITLE_PADRAO,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE_PADRAO,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#6FA02A",
  colorScheme: "light",
};

/**
 * LocalBusiness (JSON-LD) — dados estruturados pro Google entender que a
 * Disalp é um negócio local real (endereço, telefone, área de atendimento),
 * habilitando rich results de negócio local / painel de conhecimento.
 * Fonte dos dados: src/lib/contato.ts (mesma verdade de Topbar/Footer/Contato).
 */
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/brand/logo-disalp.svg`,
  logo: `${SITE_URL}/brand/logo-disalp.svg`,
  telephone: "+55-81-98814-8831",
  email: "comercial@disalp.com.br",
  address: {
    "@type": "PostalAddress",
    streetAddress: "BR-101 Sul, Km 70, s/n, Nº 550, Curado",
    addressLocality: "Recife",
    addressRegion: "PE",
    postalCode: "50790-640",
    addressCountry: "BR",
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Região Metropolitana do Recife",
  },
  sameAs: [WHATSAPP_URL, "https://www.instagram.com/disalpdistribuidora/"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
