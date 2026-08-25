import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { HeroMedia } from "@/components/performance/HeroMedia";

export function PrecosHero() {
  return (
    <section className="relative overflow-hidden bg-[#050507] min-h-dvh flex flex-col items-center justify-center border-b border-[#1c1c21]">
      <HeroMedia
        src="/images/pricing_hero_real.webp"
        width={1920}
        height={1080}
        isPriority={true}
        alt="Planos e Preços"
      />
      {/* Gradiente escuro na esquerda para o texto ficar legível em cima da nebulosa */}
      <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-[#050507]/85 via-[#050507]/65 md:via-[#050507]/75 to-transparent z-0 pointer-events-none"></div>
      {/* Gradiente na base para fundir suavemente com o final da seção */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050507] to-transparent z-0 pointer-events-none"></div>

      <div className="relative mx-auto w-full px-4 md:px-8 lg:pl-[6.5rem] lg:pr-12 z-10">
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
              <h1 className="font-display text-[3.2rem] xs:text-[3.8rem] sm:text-[4.4rem] md:text-[5.2rem] lg:text-[6rem] font-black tracking-tight leading-[0.98] uppercase py-2">
                <span className="block text-white">NOSSOS</span>
                <span
                  className="inline-block text-transparent bg-clip-text w-fit pt-1 pb-1 mt-0 sm:mt-0.5"
                  style={{
                    backgroundImage: "linear-gradient(160deg, #a79df0, #82b8f7, #4ed4cf, #58e5a6)",
                  }}
                >
                  <span className="block">PLANOS.</span>
                </span>
              </h1>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-3 sm:bottom-5 md:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 md:gap-2 z-10 pointer-events-none">
        <span className="font-mono text-[9px] sm:text-[11px] font-medium uppercase tracking-[0.3em] text-slate-300/90 select-none">
          SCROLL
        </span>
        <div className="w-[1.5px] h-8 md:h-12 relative overflow-hidden">
          <style>{`
            @keyframes scroll-line-flow {
              0% {
                transform: translateY(-100%);
                opacity: 0;
              }
              25% {
                opacity: 1;
              }
              75% {
                opacity: 1;
              }
              100% {
                transform: translateY(100%);
                opacity: 0;
              }
            }
            .animate-scroll-line {
              animation: scroll-line-flow 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            }
          `}</style>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#a280ff] to-transparent animate-scroll-line" />
        </div>
      </div>
    </section>
  );
}
