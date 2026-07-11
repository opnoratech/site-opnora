import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function PrecosHero() {
  return (
    <section
      className="relative overflow-hidden bg-[#050507] min-h-dvh flex flex-col items-center justify-center border-b border-[#1c1c21]"
      style={{
        backgroundImage: "url('/pricing-hero.png')",
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
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan" />
                <span className="font-mono text-xs text-[#b3a1ff] uppercase tracking-[0.25em]">
                  Planos & Preços
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h1 className="font-display text-[1.8rem] sm:text-[2.8rem] md:text-[3.8rem] lg:text-[4.7rem] font-black tracking-tighter leading-[0.9] uppercase">
                <span className="block text-white">
                  ESCOLHA SEU
                </span>
                <span
                  className="inline-block text-transparent bg-clip-text w-fit"
                  style={{
                    backgroundImage:
                      "linear-gradient(160deg, #a79df0, #82b8f7, #4ed4cf, #58e5a6)",
                  }}
                >
                  <span className="block pb-1">PLANO DE</span>
                  <span className="block" style={{ lineHeight: "1.1" }}>
                    EXPANSÃO.
                  </span>
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="mt-8 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
                Um parceiro digital hiper-detalhista para startups e scale-ups: UI/UX, plataformas
                web, motores de marketing e sistemas de marca. Construído para ser acessível sem
                abrir mão da qualidade.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
