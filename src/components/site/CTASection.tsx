import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageSquare } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-8 sm:p-12">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-50"
            style={{ background: "var(--gradient-portal)" }}
          />
          <div className="absolute inset-0 -z-10 bg-background/70 backdrop-blur-2xl" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-aurora-cyan/60 to-transparent" />

          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-aurora-cyan">
              próximo passo
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Pronto para estruturar o{" "}
              <span className="text-aurora">digital da sua empresa</span>?
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Conte qual problema sua empresa precisa resolver. A Opnora ajuda a transformar essa necessidade em uma solução digital clara, funcional e escalável.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/contato"
                className="inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm btn-aurora"
              >
                Falar com a Opnora
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/contato"
                className="inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm btn-ghost-aurora"
              >
                <MessageSquare size={16} />
                Solicitar orçamento
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
