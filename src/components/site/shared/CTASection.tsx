import { Link } from "@tanstack/react-router";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function CTASection({ className }: { className?: string }) {
  const bgClass = className || "bg-[#0c0c0f]";
  return (
    <section className={`relative flex min-h-[60dvh] w-full flex-col items-center justify-center overflow-hidden py-16 sm:py-20 ${bgClass}`}>
      {/* Linha separadora minimalista no topo */}
      <div className="absolute inset-x-0 top-0 h-px bg-white/5" />
      {/* Large Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] max-w-[100vw] h-[300px] bg-white/[0.02] blur-[80px] rounded-[100%] pointer-events-none" />

      <div className="mx-auto w-full px-4 text-center z-10 relative">
        <ScrollReveal delay={100}>
          <h2
            className="font-display font-bold tracking-tight uppercase mx-auto"
            style={{
              fontSize: "clamp(2rem, 4vw, 4.5rem)",
              lineHeight: "0.95",
            }}
          >
            <span className="whitespace-nowrap text-white">
              SEU PRÓXIMO PROJETO
            </span>
            <br />
            <span
              className="whitespace-nowrap text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(160deg, #a79df0, #82b8f7, #4ed4cf, #58e5a6)",
              }}
            >
              COMEÇA AQUI.
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="mx-auto mt-6 max-w-3xl text-sm font-light leading-relaxed text-slate-300 sm:text-base md:text-lg">
            Conte o que sua empresa precisa resolver. Criamos sites, sistemas e plataformas sob
            medida para organizar processos, melhorar o atendimento e apoiar o crescimento do seu
            negócio.
          </p>
        </ScrollReveal>

        <ScrollReveal
          delay={300}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/contato"
            className="group inline-flex h-11 md:h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-sm bg-white px-8 text-[11px] sm:text-xs font-black uppercase tracking-[0.15em] text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_14px_rgba(255,255,255,0.15)]"
          >
            INICIAR UM PROJETO{" "}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
