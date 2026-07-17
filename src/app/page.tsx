import { Topbar } from "@/components/sections/Topbar";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { FaixaCategorias } from "@/components/sections/FaixaCategorias";
import { QuemAtendemos } from "@/components/sections/QuemAtendemos";
import { Sobre } from "@/components/sections/Sobre";
import { RotaEntrega } from "@/components/sections/RotaEntrega";
import { ProdutosCarousel } from "@/components/sections/ProdutosCarousel";
import { Contato } from "@/components/sections/Contato";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Topbar />
      <Header />
      <main className="flex-1">
        <Hero />
        <FaixaCategorias />
        <QuemAtendemos />
        <Sobre />
        <RotaEntrega />
        <ProdutosCarousel />
        <Contato />
      </main>
      <Footer />
    </>
  );
}
