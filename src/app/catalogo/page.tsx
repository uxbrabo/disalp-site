import type { Metadata } from "next";
import { Topbar } from "@/components/sections/Topbar";
import { Header } from "@/components/sections/Header";
import { CatalogoPedido } from "@/components/sections/CatalogoPedido";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Catálogo — Disalp Distribuidora",
  description:
    "Monte seu pedido de hortifruti direto da Ceasa e envie pelo WhatsApp para a Disalp.",
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
