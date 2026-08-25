import { AnimatedNumber } from "@/components/ui/animated-number";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function SobreQuemSomos() {
  return (
    <section className="relative bg-[#0c0c0f] py-24 lg:py-32 border-b border-white/5">
      <div className="relative z-10 mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div className="flex flex-col items-start text-left">
            <ScrollReveal delay={0} className="flex items-center gap-4 mb-8">
              <div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan" />
              <span className="font-display text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                QUEM SOMOS
              </span>
            </ScrollReveal>

            <ScrollReveal
              as="h2"
              delay={100}
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight leading-[1.1]"
            >
              <span className="block text-white">Sistemas inteligentes</span>
              <span className="block text-white">para empresas que</span>
              <span
                className="block text-transparent bg-clip-text w-fit"
                style={{
                  backgroundImage: "linear-gradient(160deg, #a79df0, #82b8f7, #4ed4cf, #58e5a6)",
                }}
              >
                querem crescer.
              </span>
            </ScrollReveal>

            <div className="mt-8 space-y-6 text-sm sm:text-base text-slate-400 font-light leading-relaxed">
              <ScrollReveal delay={200} as="p">
                A <strong>Opnora</strong> tem como principal foco desenvolver software sob medida
                para empresas, projetos e instituições que querem sair do improviso digital e
                evoluir com tecnologia.
              </ScrollReveal>
              <ScrollReveal delay={300} as="p">
                A proposta não é apenas criar sites ou sistemas comuns. O objetivo é entender
                problemas reais, mapear processos, identificar gargalos e construir soluções
                digitais que sejam úteis, inteligentes e preparadas para crescer.
              </ScrollReveal>
              <ScrollReveal delay={400} as="p">
                A inteligência artificial entra como uma das principais frentes de evolução da
                Opnora. Por meio de IA, automação, dados e integrações, criamos sistemas capazes de
                auxiliar no atendimento, organizar informações, gerar insights, automatizar tarefas
                repetitivas e ajudar empresas a tomar decisões melhores.
              </ScrollReveal>
            </div>
          </div>

          <ScrollReveal delay={200} className="h-full flex items-center">
            <div className="grid grid-cols-2 border border-white/5 w-full bg-[#050507]/20 rounded-sm overflow-hidden">
              <ScrollReveal
                delay={300}
                className="p-8 md:p-12 flex flex-col items-center justify-center border-b border-r border-white/5"
              >
                <div className="text-3xl sm:text-4xl font-display font-bold mb-2 bg-gradient-to-r from-[#b3a1ff] to-[#7f94ff] text-transparent bg-clip-text">
                  <AnimatedNumber end={3} duration={2000} />
                </div>
                <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em] mt-2 text-center">
                  FRENTES CONECTADAS
                </div>
              </ScrollReveal>
              <ScrollReveal
                delay={400}
                className="p-8 md:p-12 flex flex-col items-center justify-center border-b border-white/5"
              >
                <div className="text-3xl sm:text-4xl font-display font-bold mb-2 bg-gradient-to-r from-[#b3a1ff] to-[#7f94ff] text-transparent bg-clip-text">
                  <AnimatedNumber end={1} suffix="+" duration={1000} />
                </div>
                <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em] mt-2 text-center">
                  Projetos Ativos
                </div>
              </ScrollReveal>
              <ScrollReveal
                delay={500}
                className="p-8 md:p-12 flex flex-col items-center justify-center border-r border-white/5"
              >
                <div className="text-3xl sm:text-4xl font-display font-bold mb-2 bg-gradient-to-r from-[#b3a1ff] to-[#7f94ff] text-transparent bg-clip-text">
                  <AnimatedNumber end={2026} duration={2000} />
                </div>
                <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em] mt-2 text-center">
                  Fundação
                </div>
              </ScrollReveal>
              <ScrollReveal
                delay={600}
                className="p-8 md:p-12 flex flex-col items-center justify-center"
              >
                <div className="text-3xl sm:text-4xl font-display font-bold mb-2 bg-gradient-to-r from-[#b3a1ff] to-[#7f94ff] text-transparent bg-clip-text">
                  ∞
                </div>
                <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em] mt-2 text-center">
                  POSSIBILIDADES EM ABERTO
                </div>
              </ScrollReveal>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
