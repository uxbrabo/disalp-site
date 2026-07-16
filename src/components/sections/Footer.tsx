import Image from "next/image";
import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import { FaixaEspectro } from "@/components/ui/FaixaEspectro";
import { WhatsAppGlyph, InstagramGlyph } from "@/components/ui/icons";
import { CATEGORIAS } from "@/lib/categorias";
import { WHATSAPP_URL } from "@/lib/contato";

const INSTAGRAM_URL = "https://www.instagram.com/disalpdistribuidora/";

/**
 * Âncoras começam com "/" — só existem na home (ver mesma nota em
 * Header.tsx). Sem isso, clicar nelas a partir de /catalogo não navega.
 */
const NAVEGACAO = [
  { label: "Categorias", href: "/#categorias" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Como funciona", href: "/#rota" },
  { label: "Escala", href: "/#sobre" },
  { label: "Contato", href: "/#contato" },
];

export function Footer() {
  return (
    <footer className="bg-dark-section text-dark-section-foreground">
      <FaixaEspectro />
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-6 py-20 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        {/* Marca + redes */}
        <div>
          <Image
            src="/brand/logo-disalp-white.svg"
            alt="Disalp Distribuidora"
            width={1000}
            height={411}
            className="h-9 w-auto"
          />
          <p className="mt-5 max-w-xs font-sans text-sm leading-relaxed text-primary-100/75">
            Distribuição de hortifruti direto da Ceasa pra redes de varejo,
            hotéis, hospitais, restaurantes e resorts da Região Metropolitana
            do Recife.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp da Disalp"
              className="flex h-9 w-9 items-center justify-center border border-white/15 text-primary-100 transition-[color,border-color,transform] duration-200 hover:border-white/40 hover:text-white motion-safe:hover:-translate-y-0.5"
            >
              <WhatsAppGlyph size={16} />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Disalp"
              className="flex h-9 w-9 items-center justify-center border border-white/15 text-primary-100 transition-[color,border-color,transform] duration-200 hover:border-white/40 hover:text-white motion-safe:hover:-translate-y-0.5"
            >
              <InstagramGlyph size={16} />
            </a>
          </div>
        </div>

        {/* Navegação */}
        <div>
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary-300">
            Navegação
          </span>
          <ul className="mt-4 flex flex-col gap-3">
            {NAVEGACAO.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-block font-sans text-sm text-primary-100/85 transition-[color,transform] duration-200 hover:text-white motion-safe:hover:translate-x-1"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categorias */}
        <div>
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary-300">
            Categorias
          </span>
          <ul className="mt-4 flex flex-col gap-3">
            {CATEGORIAS.map((categoria) => (
              <li key={categoria.id}>
                <Link
                  href="/#categorias"
                  className="inline-block font-sans text-sm text-primary-100/85 transition-[color,transform] duration-200 hover:text-white motion-safe:hover:translate-x-1"
                >
                  {categoria.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contato */}
        <div>
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary-300">
            Contato
          </span>
          <div className="mt-4 flex flex-col gap-3">
            <div className="flex gap-3">
              <MapPin size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-primary-300" />
              <p className="font-sans text-sm leading-relaxed text-primary-100/85">
                Recife, PE — atendimento à Região Metropolitana
              </p>
            </div>
            <div className="flex gap-3">
              <Phone size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-primary-300" />
              <a
                href="tel:+5581988148831"
                className="inline-block font-sans text-sm text-primary-100/85 transition-[color,transform] duration-200 hover:text-white motion-safe:hover:translate-x-1"
              >
                +55 (81) 98814-8831
              </a>
            </div>
            <div className="flex gap-3">
              <Mail size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-primary-300" />
              <a
                href="mailto:comercial@disalp.com.br"
                className="inline-block font-sans text-sm text-primary-100/85 transition-[color,transform] duration-200 hover:text-white motion-safe:hover:translate-x-1"
              >
                comercial@disalp.com.br
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-2 px-6 py-6 text-center font-mono text-xs text-primary-100/60 sm:flex-row sm:justify-between sm:text-left">
          <span>© {new Date().getFullYear()} Disalp Distribuidora — todos os direitos reservados.</span>
          <span>CEASA-PE, Curado — Recife-PE</span>
        </div>
      </div>
    </footer>
  );
}
