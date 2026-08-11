import { Link as RouterLink } from "@tanstack/react-router";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function SobreHistoria() {
  return (
    <section className="relative py-24 lg:py-32 border-b border-white/5 bg-[#0e0e12]">
      <div className="relative z-10 mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column */}
          <div className="flex flex-col items-start text-left lg:col-span-6">
            <ScrollReveal delay={0} className="flex items-center gap-4 mb-8">
              <div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan" />
              <span className="font-display text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                HISTÓRIA
              </span>
            </ScrollReveal>

            <ScrollReveal
              as="h2"
              delay={100}
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-white leading-[1.1] mb-6"
            >
              Nossa Jornada
            </ScrollReveal>

            <ScrollReveal
              delay={200}
              className="text-sm sm:text-base text-slate-400 font-light leading-relaxed mb-12 max-w-[38rem]"
            >
              <p>
                A Opnora une aprendizado, experimentação e a construção de soluções digitais com uma
                visão de longo prazo.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <RouterLink
                to="/solucoes"
                className="inline-flex items-center justify-center bg-white text-black font-mono text-[11px] sm:text-xs font-black uppercase tracking-[0.15em] px-8 py-4 rounded-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_14px_rgba(255,255,255,0.15)]"
              >
                EXPLORE NOSSAS SOLUÇÕES →
              </RouterLink>
            </ScrollReveal>
          </div>

          {/* Right Column (Timeline) */}
          <div className="lg:col-span-6 mt-8 lg:mt-0 lg:pl-4">
            <div className="relative border-l border-transparent ml-2 md:ml-4 space-y-12 pb-4">
              <ScrollReveal
                delay={100}
                animation="sr-scale-y"
                className="absolute left-[-1px] top-0 bottom-0 w-[1px] bg-white/10 origin-top"
              >
                <div />
              </ScrollReveal>
              {[
                {
                  year: "2026",
                  title: "A Opnora começa",
                  desc: "A Opnora surge como uma proposta de desenvolvimento de software orientada por problemas reais, aprendizado prático e vontade de construir soluções melhores.",
                },
                {
                  year: "2026",
                  title: "Estruturação da identidade",
                  desc: "Definição da marca, das frentes de atuação e de uma linguagem visual que represente tecnologia, abertura de caminhos e evolução.",
                },
                {
                  year: "2026",
                  title: "Projetos, protótipos e validação",
                  desc: "Desenvolvimento do portfólio inicial, protótipos próprios e conversas com possíveis parceiros, professores, empresas e iniciativas.",
                },
                {
                  year: "PRESENTE",
                  title: "Construção em público",
                  desc: "Acompanhamento da evolução da Opnora por meio de projetos, estudos, experimentos e soluções em desenvolvimento.",
                },
              ].map((item, i) => (
                <ScrollReveal
                  key={item.year}
                  delay={200 + i * 150}
                  className="relative pl-8 md:pl-10"
                >
                  {/* Dot */}
                  <div className="absolute top-[4px] -left-[4.5px] w-[8px] h-[8px] rounded-full bg-[#b3a1ff] shadow-[0_0_12px_rgba(179,161,255,0.6)]" />

                  <span className="font-mono text-[#b3a1ff] text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block">
                    {item.year}
                  </span>
                  <h4 className="font-display font-bold text-white text-base md:text-lg mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">{item.desc}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
