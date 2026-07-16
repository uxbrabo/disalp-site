import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Categoria } from "@/lib/categorias";

/**
 * Badge de categoria — pill 24px de altura, ícone 14px + label mono 12px.
 * Cor vem sempre do token da categoria (ver src/lib/categorias.ts), nunca hardcoded.
 */
export function CategoriaBadge({ categoria }: { categoria: Categoria }) {
  const Icon = categoria.icon;
  return (
    <span
      className="inline-flex h-6 items-center gap-1.5 rounded-pill border px-2.5 font-mono text-xs font-medium"
      style={{
        borderColor: `var(--color-${categoria.token}-200)`,
        backgroundColor: `var(--color-${categoria.token}-50)`,
        color: `var(--color-${categoria.token}-700)`,
      }}
    >
      <Icon size={14} strokeWidth={2} aria-hidden />
      {categoria.label}
    </span>
  );
}

/** Badge neutro genérico — para status/UI que não é categoria de produto. */
export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1.5 rounded-pill bg-muted px-2.5 font-mono text-xs font-medium text-muted-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}
