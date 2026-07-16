"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

/**
 * ⚠️ Números ilustrativos — placeholder de layout.
 * Trocar pelos números operacionais reais da Disalp antes de publicar
 * (ver "dados e decisões pendentes" no prompt de build do projeto).
 */
const METRICAS = [
  { valor: 35, sufixo: "+", label: "Redes de varejo atendidas" },
  { valor: 6, sufixo: "x", label: "Entregas por semana, por rota" },
  { valor: 98, sufixo: "%", label: "Pedidos entregues na janela combinada" },
];

function Contador({ valor, sufixo }: { valor: number; sufixo: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, valor, {
      duration: 1.1,
      ease: EASE_OUT,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, valor]);

  return (
    <span ref={ref} className="font-display text-5xl font-extrabold text-primary-foreground">
      {display}
      {sufixo}
    </span>
  );
}

export function Numeros() {
  return (
    <section
      id="numeros"
      className="bg-dark-section py-24 text-dark-section-foreground md:py-28"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-6 sm:grid-cols-3">
        {METRICAS.map((m) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="text-center sm:text-left"
          >
            <Contador valor={m.valor} sufixo={m.sufixo} />
            <p className="mt-2 font-sans text-sm text-verde-100/80">{m.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
