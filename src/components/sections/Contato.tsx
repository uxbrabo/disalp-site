"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { fadeUp, usePrefersReducedMotion } from "@/lib/motion";
import {
  ENDERECO_CURTO,
  GOOGLE_MAPS_EMBED_SRC,
  GOOGLE_MAPS_URL,
} from "@/lib/contato";

const CONTATOS = [
  {
    icon: Mail,
    label: "E-mail",
    valor: "comercial@disalp.com.br",
    href: "mailto:comercial@disalp.com.br",
  },
  {
    icon: Phone,
    label: "Telefone",
    valor: "+55 (81) 98814-8831",
    href: "tel:+5581988148831",
  },
  {
    icon: MapPin,
    label: "Nosso escritório",
    valor: ENDERECO_CURTO,
    href: GOOGLE_MAPS_URL,
  },
] as const;

const inputClass =
  "mt-2 h-11 w-full rounded-none border border-border bg-background px-4 font-sans text-base text-foreground sm:text-sm " +
  "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

/**
 * Contato — seção "Get in touch": badge + título centralizados, 3 cartões
 * de contato, mapa + formulário lado a lado. Mesma paleta/tipografia do
 * resto do site (sem cantos arredondados, ícones em círculo verde-marca).
 *
 * ⚠️ Formulário sem backend ainda — submit só mostra confirmação local.
 * Ligar numa rota de API / serviço de e-mail quando existir (mesmo status
 * de "placeholder de UI" do botão de play em OQueOferecemos.tsx).
 *
 * Mapa e telefone/endereço vêm de src/lib/contato.ts (fonte única,
 * compartilhada com Topbar e Footer).
 */
export function Contato() {
  const [enviado, setEnviado] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const anim = (i: number) => ({
    variants: fadeUp,
    custom: i,
    initial: reduceMotion ? undefined : "hidden",
    whileInView: reduceMotion ? undefined : "show",
    viewport: { once: true, margin: "-80px" } as const,
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEnviado(true);
  }

  return (
    <section id="contato" className="scroll-mt-[72px] bg-muted py-24 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div {...anim(0)} className="mx-auto max-w-xl text-center">
          <Badge className="border border-border bg-background">Fale conosco</Badge>
          <h2 className="mt-4 text-balance font-display text-4xl font-bold leading-[1.15] text-grafite-500 md:text-5xl">
            Entre em contato, conte como podemos ajudar.
          </h2>
        </motion.div>

        {/* Cartões de contato */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {CONTATOS.map((contato, i) => {
            const Icon = contato.icon;
            const conteudo = (
              <>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary">
                  <Icon size={20} strokeWidth={2} aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="font-sans text-xs text-muted-foreground">{contato.label}</p>
                  <p className="mt-0.5 truncate font-sans text-sm font-semibold text-grafite-500">
                    {contato.valor}
                  </p>
                </div>
              </>
            );
            const externo = contato.href.startsWith("http");
            return (
              <motion.a
                key={contato.label}
                {...anim(i)}
                href={contato.href}
                {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex items-center gap-4 border border-border bg-background p-5 transition-[color,border-color,transform] duration-300 hover:border-primary-200 motion-safe:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {conteudo}
              </motion.a>
            );
          })}
        </div>

        {/* Mapa + formulário */}
        <div className="mt-16 grid grid-cols-1 items-stretch gap-12 lg:grid-cols-2">
          <motion.div {...anim(0)} className="relative aspect-[4/5] w-full overflow-hidden border border-border lg:aspect-auto lg:min-h-[420px]">
            <iframe
              src={GOOGLE_MAPS_EMBED_SRC}
              title="Localização da Disalp — CEASA-PE, Curado, Recife"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
            />
          </motion.div>

          <motion.form {...anim(1)} onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="contato-nome" className="font-sans text-sm font-medium text-grafite-500">
                  Seu nome
                </label>
                <input
                  id="contato-nome"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  placeholder="Seu nome"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="contato-sobrenome" className="font-sans text-sm font-medium text-grafite-500">
                  Sobrenome
                </label>
                <input
                  id="contato-sobrenome"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  placeholder="Seu sobrenome"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="contato-email" className="font-sans text-sm font-medium text-grafite-500">
                E-mail
              </label>
              <input
                id="contato-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                spellCheck={false}
                required
                placeholder="seu@email.com"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="contato-mensagem" className="font-sans text-sm font-medium text-grafite-500">
                Mensagem
              </label>
              <textarea
                id="contato-mensagem"
                name="message"
                required
                rows={5}
                placeholder="Escreva sua mensagem…"
                className="mt-2 w-full resize-none rounded-none border border-border bg-background px-4 py-3 font-sans text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:text-sm"
              />
            </div>

            <Button type="submit" size="lg" disabled={enviado} className="w-full">
              {enviado ? "Mensagem enviada" : "Enviar"}
            </Button>
            {enviado && (
              <p aria-live="polite" className="font-sans text-sm text-primary">
                Recebemos sua mensagem — entraremos em contato em breve.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
