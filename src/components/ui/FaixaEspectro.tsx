import { cn } from "@/lib/utils";

/**
 * Faixa Espectro — elemento assinatura da marca Disalp.
 * As 5 cores vêm das pétalas do ícone da logo e mapeiam categorias de produto
 * (laranja→frutas, vermelho→acento, verde→legumes, lima→verduras, azul→refrigerados).
 *
 * Regra do design system: usar como barra fina (acento) ou como espinha vertical
 * (ver RotaEntrega.tsx). Nunca como fundo de tela cheia — dilui o significado funcional da cor.
 */
export function FaixaEspectro({ className }: { className?: string }) {
  return (
    <div
      role="presentation"
      className={cn("faixa-espectro h-1 w-full rounded-pill", className)}
    />
  );
}
