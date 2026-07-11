import { Link as RouterLink } from "@tanstack/react-router";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function SobreCTA() {
  return (
    <section className="relative flex min-h-[60dvh] w-full flex-col items-center justify-center overflow-hidden bg-[#0c0c0f] py-16 sm:py-20 border-t border-white/5">
      <div className="absolute inset-x-0 top-0 h-px bg-white/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] max-w-[100vw] h-[300px] bg-white/[0.02] blur-[80px] rounded-[100%] pointer-events-none" />

      <div className="mx-auto w-full px-4 text-center z-10 relative">
        <ScrollReveal delay={0}>
          <h2
            className="font-display font-bold tracking-tight w-full mx-auto whitespace-nowrap"
            style={{
              fontSize: "clamp(1.5rem, 2.8vw, 3rem)",
              lineHeight: "1.2",
            }}
          >
            <span className="text-white">
              Tem curiosidade sobre{" "}
            </span>
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(160deg, #a79df0, #82b8f7, #4ed4cf, #58e5a6)",
              }}
            >
              o que estamos construindo?
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <p className="mx-auto mt-6 max-w-2xl text-sm font-light leading-relaxed text-slate-300 sm:text-base md:text-lg">
            A Opnora está em construção. Acompanhe nossos projetos, conheça as frentes que estamos
            desenvolvendo ou entre em contato para conversar sobre uma ideia.
          </p>
        </ScrollReveal>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <ScrollReveal delay={200}>
            <RouterLink
              to="/solucoes"
              className="group inline-flex h-11 md:h-12 w-full sm:w-60 items-center justify-center rounded-sm bg-white px-6 text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em] text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_14px_rgba(255,255,255,0.15)] whitespace-nowrap"
            >
              VER NOSSOS PROJETOS
            </RouterLink>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <RouterLink
              to="/contato"
              className="group inline-flex h-11 md:h-12 w-full sm:w-60 items-center justify-center rounded-sm border border-white/10 bg-transparent px-6 text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/5 hover:border-white/20 whitespace-nowrap"
            >
              FALAR COM A OPNORA
            </RouterLink>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
