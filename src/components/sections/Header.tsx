import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

const NAV = [
  { label: "Categorias", href: "#categorias" },
  { label: "Como funciona", href: "#rota" },
  { label: "Escala", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

/**
 * Header — 72px de altura, fundo branco, sticky.
 * Logo: 40px de altura (área de toque confortável), largura proporcional (auto).
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 h-[72px] border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-6">
        <a href="#" className="flex items-center" aria-label="Disalp — página inicial">
          <Image
            src="/brand/disalp-logo.png"
            alt="Disalp Distribuidora"
            width={252}
            height={112}
            className="h-10 w-auto"
            priority
          />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegação principal">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-sans text-sm font-medium text-grafite-500 transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <ButtonLink href="#contato" size="sm" icon={<ArrowRight size={16} strokeWidth={2.5} />}>
          Pedir tabela
        </ButtonLink>
      </div>
    </header>
  );
}
