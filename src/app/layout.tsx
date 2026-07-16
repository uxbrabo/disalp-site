import type { Metadata } from "next";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import "./globals.css";

export const metadata: Metadata = {
  title: "Disalp Distribuidora — Hortifruti B2B em Recife",
  description:
    "Da Ceasa até a gôndola: distribuição de hortifruti para redes de varejo da Região Metropolitana do Recife.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
