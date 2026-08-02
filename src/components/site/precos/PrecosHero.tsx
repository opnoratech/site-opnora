import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function PrecosHero() {
  return (
    <section
      className="relative overflow-hidden bg-[#050507] min-h-dvh flex flex-col items-center justify-center border-b border-[#1c1c21]"
      style={{
        backgroundImage: "url('/images/pricing-hero.webp')",
        backgroundSize: "cover",
        backgroundPosition: "right center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Gradiente escuro na esquerda para o texto ficar legível em cima da nebulosa */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050507] via-[#050507]/90 to-transparent z-0"></div>
      {/* Gradiente na base para fundir suavemente com o final da seção */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050507] to-transparent z-0 pointer-events-none"></div>

      <div className="relative mx-auto w-full px-4 md:px-8 lg:pl-[6.5rem] lg:pr-12 z-10 mt-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="max-w-4xl text-left">
            <ScrollReveal delay={0}>
              <div className="flex items-center gap-4 mb-1.5">
                <div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan" />
                <span className="font-mono text-[11px] text-[#b3a1ff] uppercase tracking-[0.25em]">
                  Planos & Preços
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h1 className="font-display text-[2.1rem] sm:text-[3.0rem] md:text-[4.5rem] lg:text-[6rem] font-black tracking-tight leading-[1.02] uppercase py-2">
                <span className="block text-white">NOSSOS</span>
                <span
                  className="inline-block text-transparent bg-clip-text w-fit py-4 -my-4"
                  style={{
                    backgroundImage: "linear-gradient(160deg, #a79df0, #82b8f7, #4ed4cf, #58e5a6)",
                  }}
                >
                  <span className="block">PLANOS.</span>
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="mt-3 max-w-4xl text-sm sm:text-lg text-slate-400 font-light leading-relaxed">
                Desenvolvemos sites institucionais, landing pages, sistemas sob medida, automações,
                IA aplicada, WhatsApp/bots, dashboards e integrações. Uma presença digital
                estruturada, clara e comercial para o seu negócio crescer, com preços acessíveis
                para começar e abertura para soluções totalmente personalizadas.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
