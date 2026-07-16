import Image from "next/image";
import { MapPin, Mail, Phone } from "lucide-react";
import { FaixaEspectro } from "@/components/ui/FaixaEspectro";

/**
 * ⚠️ A logo atual só existe em versão colorida sobre fundo claro (o "isalp" é
 * preto e não sobrevive num fundo escuro). Por isso ela aparece aqui dentro de
 * um chip branco, em vez de solta sobre o fundo escuro. Assim que você tiver
 * o arquivo vetorial original, vale gerar um lockup reverso (branco/mono) só
 * pra uso em fundo escuro — troque este chip pela versão reversa quando tiver.
 */
export function Footer() {
  return (
    <footer className="bg-dark-section text-dark-section-foreground">
      <FaixaEspectro />
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-6 py-20 md:grid-cols-[auto_1fr]">
        <div className="bg-white p-3 w-fit">
          <Image
            src="/brand/disalp-logo.png"
            alt="Disalp Distribuidora"
            width={252}
            height={112}
            className="h-9 w-auto"
          />
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="flex gap-3">
            <MapPin size={20} strokeWidth={2} className="mt-0.5 shrink-0 text-primary-300" />
            <p className="font-sans text-sm leading-relaxed text-primary-100/85">
              Recife, PE — atendimento à Região Metropolitana
            </p>
          </div>
          <div className="flex gap-3">
            <Phone size={20} strokeWidth={2} className="mt-0.5 shrink-0 text-primary-300" />
            <a href="tel:+5581988148831" className="font-sans text-sm text-primary-100/85 hover:text-white">
              +55 (81) 98814-8831
            </a>
          </div>
          <div className="flex gap-3">
            <Mail size={20} strokeWidth={2} className="mt-0.5 shrink-0 text-primary-300" />
            <a href="mailto:comercial@disalp.com.br" className="font-sans text-sm text-primary-100/85 hover:text-white">
              comercial@disalp.com.br
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center font-mono text-xs text-primary-100/60">
        © {new Date().getFullYear()} Disalp Distribuidora — todos os direitos reservados.
      </div>
    </footer>
  );
}
