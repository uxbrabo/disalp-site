import type { Metadata } from "next";
import { Topbar } from "@/components/sections/Topbar";
import { Header } from "@/components/sections/Header";
import { CatalogoPedido } from "@/components/sections/CatalogoPedido";
import { Footer } from "@/components/sections/Footer";

const TITULO = "Catálogo";
const DESCRICAO =
  "Monte seu pedido de hortifruti direto da Ceasa e envie pelo WhatsApp para a Disalp.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRICAO,
  alternates: {
    canonical: "/catalogo",
  },
  openGraph: {
    url: "/catalogo",
    title: TITULO,
    description: DESCRICAO,
  },
  twitter: {
    title: TITULO,
    description: DESCRICAO,
  },
};

export default function CatalogoPage() {
  return (
    <>
      <Topbar />
      <Header />
      <main className="flex-1">
        <CatalogoPedido />
      </main>
      <Footer />
    </>
  );
}
