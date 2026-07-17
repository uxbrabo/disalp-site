"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

interface MobileNavProps {
  items: { label: string; href: string }[];
}

/**
 * MobileNav — substitui o <nav> desktop abaixo de md: botão hamburguer +
 * painel dropdown ancorado no header (sticky, então serve de containing
 * block pro `absolute top-full` do painel — funciona com ou sem Topbar
 * visível acima, sem precisar cravar offset em px).
 */
export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        className="flex h-10 w-10 items-center justify-center text-grafite-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {open ? (
          <X size={22} strokeWidth={2} aria-hidden />
        ) : (
          <Menu size={22} strokeWidth={2} aria-hidden />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              aria-hidden
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-grafite-900/40"
            />
            <motion.div
              id={panelId}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-0 top-full z-40 border-b border-border bg-background"
            >
              <nav aria-label="Navegação principal" className="flex flex-col px-6 py-2">
                {items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-border py-3.5 font-sans text-base font-medium text-grafite-500 last:border-b-0 hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
