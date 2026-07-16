/**
 * Ícones de marca que o lucide-react 1.24 não tem mais (removeu ícones de
 * redes/apps de terceiros). SVGs próprios, `fill`/`stroke` em currentColor
 * pra herdar cor do contexto onde forem usados.
 */

export function InstagramGlyph({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function WhatsAppGlyph({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.001 2c-5.514 0-9.998 4.484-9.998 9.998 0 1.762.459 3.478 1.334 4.985L2.05 22l5.144-1.352a9.982 9.982 0 0 0 4.807 1.223h.004c5.514 0 9.997-4.484 9.997-9.997C21.999 6.484 17.516 2 12.001 2Zm0 18.24a8.212 8.212 0 0 1-4.19-1.147l-.301-.179-3.116.819.831-3.037-.196-.312a8.195 8.195 0 0 1-1.257-4.386c0-4.532 3.688-8.219 8.226-8.219 4.532 0 8.219 3.688 8.219 8.22 0 4.532-3.687 8.221-8.216 8.221Z" />
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z" />
    </svg>
  );
}
