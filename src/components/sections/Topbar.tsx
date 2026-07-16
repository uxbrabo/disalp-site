import { MapPin, Mail, Phone } from "lucide-react";
import { InstagramGlyph, WhatsAppGlyph } from "@/components/ui/icons";
import { WHATSAPP_URL } from "@/lib/contato";

const INSTAGRAM_URL = "https://www.instagram.com/disalpdistribuidora/";

/**
 * Topbar — barra utilitária verde (referência Rumput), 40px de altura, acima
 * do Header sticky. Rola junto com a página (não é sticky) — some ao dar
 * scroll, quem fica fixo é só o Header abaixo dela.
 *
 * Telefone e e-mail reaproveitam os mesmos dados do Footer/Contato — trocar
 * nos três lugares ao mesmo tempo (ver src/lib/contato.ts).
 */
export function Topbar() {
  return (
    <div className="hidden bg-primary text-primary-foreground sm:block">
      <div className="mx-auto flex h-10 max-w-[1200px] items-center justify-between px-6 font-sans text-xs">
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5">
            <MapPin size={14} strokeWidth={2} aria-hidden />
            Recife, PE — Região Metropolitana
          </span>
          <a href="mailto:comercial@disalp.com.br" className="flex items-center gap-1.5 hover:opacity-80">
            <Mail size={14} strokeWidth={2} aria-hidden />
            comercial@disalp.com.br
          </a>
          <a href="tel:+5581988148831" className="hidden items-center gap-1.5 hover:opacity-80 md:flex">
            <Phone size={14} strokeWidth={2} aria-hidden />
            +55 (81) 98814-8831
          </a>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp da Disalp"
            className="hover:opacity-80"
          >
            <WhatsAppGlyph size={15} />
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram da Disalp"
            className="hover:opacity-80"
          >
            <InstagramGlyph size={15} />
          </a>
        </div>
      </div>
    </div>
  );
}
