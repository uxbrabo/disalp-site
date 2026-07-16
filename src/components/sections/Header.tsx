import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

/**
 * Âncoras (#categorias, #rota, #sobre, #contato) começam com "/" de
 * propósito — só existem na home. Sem o "/" na frente, clicar nelas a partir
 * de outra rota (ex.: /catalogo) não navega a lugar nenhum, só tenta rolar
 * dentro da página atual, que não tem esses elementos.
 */
const NAV = [
  { label: "Categorias", href: "/#categorias" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Como funciona", href: "/#rota" },
  { label: "Escala", href: "/#sobre" },
  { label: "Contato", href: "/#contato" },
];

/**
 * Header — 72px de altura, fundo branco, sticky.
 * Logo: 40px de altura (área de toque confortável), largura proporcional (auto).
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 h-[72px] border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-6">
        <Link href="/" className="flex items-center" aria-label="Disalp — página inicial">
          <Image
            src="/brand/logo-disalp.svg"
            alt="Disalp Distribuidora"
            width={1000}
            height={411}
            className="h-10 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegação principal">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative font-sans text-sm font-medium text-grafite-500 transition-colors hover:text-primary after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:content-[''] motion-safe:hover:after:scale-x-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <ButtonLink href="/catalogo" size="sm" icon={<ArrowRight size={16} strokeWidth={2.5} />}>
          Pedir tabela
        </ButtonLink>
      </div>
    </header>
  );
}
