"use client";

import { motion } from "framer-motion";
import { WhatsAppGlyph } from "@/components/ui/icons";
import { usePrefersReducedMotion } from "@/lib/motion";
import { WHATSAPP_URL } from "@/lib/contato";

/**
 * Botão flutuante do WhatsApp — fixo no canto inferior direito, em todas as
 * páginas (renderizado no layout raiz).
 *
 * Verde oficial do WhatsApp (#25D366), não o verde-marca da Disalp: aqui o
 * reconhecimento imediato do canal importa mais que a paleta do site — é o
 * mesmo padrão visual usado por qualquer negócio com atendimento via WhatsApp.
 *
 * Pulso suave e contínuo pra chamar atenção sem ser agressivo; desliga
 * sozinho pra quem tem prefers-reduced-motion.
 */
export function FloatingWhatsApp() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Disalp no WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
      animate={reduceMotion ? undefined : { scale: [1, 1.08, 1] }}
      transition={
        reduceMotion ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
      }
      whileHover={{ scale: 1.1 }}
    >
      <WhatsAppGlyph size={30} />
    </motion.a>
  );
}
