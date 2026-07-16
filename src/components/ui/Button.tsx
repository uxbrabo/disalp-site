import { forwardRef } from "react";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Escala de botão (padrão do projeto, não inventar tamanho fora daqui):
 *  sm  → h-9  (36px) px-4  text-sm   — dentro de cards, tabelas, toolbars
 *  md  → h-11 (44px) px-6  text-sm   — padrão da maior parte da UI (default)
 *  lg  → h-13 (52px) px-8  text-base — CTA principal de hero / seção final
 *
 * Variantes:
 *  primary   → fundo verde-500, texto branco. Uma única por seção/dobra.
 *  secondary → borda grafite-200, texto grafite-500. Ação de apoio.
 *  ghost     → sem fundo/borda, usado em nav e links inline com ícone.
 */

const sizes = {
  sm: "h-9 px-4 text-sm gap-1.5",
  md: "h-11 px-6 text-sm gap-2",
  lg: "h-[52px] px-8 text-base gap-2.5",
} as const;

const variants = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-700",
  secondary:
    "bg-transparent text-foreground border border-border hover:border-grafite-300 hover:bg-muted",
  ghost:
    "bg-transparent text-foreground hover:bg-muted",
} as const;

type Size = keyof typeof sizes;
type Variant = keyof typeof variants;

interface BaseProps {
  size?: Size;
  variant?: Variant;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  children: ReactNode;
  className?: string;
}

const base =
  "inline-flex items-center justify-center font-sans font-semibold " +
  "transition-[color,background-color,border-color,transform] duration-200 disabled:opacity-50 disabled:pointer-events-none " +
  "motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.98] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export const Button = forwardRef<
  HTMLButtonElement,
  BaseProps & ButtonHTMLAttributes<HTMLButtonElement>
>(function Button(
  { size = "md", variant = "primary", icon, iconPosition = "right", children, className, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(base, sizes[size], variants[variant], className)}
      {...props}
    >
      {icon && iconPosition === "left" ? icon : null}
      {children}
      {icon && iconPosition === "right" ? icon : null}
    </button>
  );
});

export const ButtonLink = forwardRef<
  HTMLAnchorElement,
  BaseProps & AnchorHTMLAttributes<HTMLAnchorElement>
>(function ButtonLink(
  { size = "md", variant = "primary", icon, iconPosition = "right", children, className, ...props },
  ref
) {
  return (
    <a
      ref={ref}
      className={cn(base, sizes[size], variants[variant], className)}
      {...props}
    >
      {icon && iconPosition === "left" ? icon : null}
      {children}
      {icon && iconPosition === "right" ? icon : null}
    </a>
  );
});
