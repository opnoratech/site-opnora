import { Link } from "@tanstack/react-router";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TerminalSolucoes } from "@/components/site/solucoes/TerminalSolucoes";

const ARCHITECTURE_STEPS = [
  {
    title: "1. Imersão e Descoberta",
    desc: "Mergulhamos no seu negócio para entender os gargalos, desenhar a solução ideal e mapear as tecnologias necessárias para o sucesso do projeto.",
    color: "#a79df0",
    rgb: "167, 157, 240",
    nextColor: "#82b8f7",
  },
  {
    title: "2. Desenvolvimento e Engenharia",
    desc: "Codificamos a plataforma utilizando as melhores práticas do mercado, com foco em performance, segurança e arquitetura escalável.",
    color: "#82b8f7",
    rgb: "130, 184, 247",
    nextColor: "#4ed4cf",
  },
  {
    title: "3. Testes e Validação",
    desc: "Submetemos o sistema a testes rigorosos de carga, segurança e usabilidade antes do lançamento oficial.",
    color: "#4ed4cf",
    rgb: "78, 212, 207",
    nextColor: "#58e5a6",
  },
  {
    title: "4. Deploy e Evolução Contínua",
    desc: "Colocamos o projeto no ar com monitoramento 24/7 e continuamos implementando melhorias baseadas em dados reais de uso.",
    color: "#58e5a6",
    rgb: "88, 229, 166",
    nextColor: "transparent",
  },
];

export function SolucoesProcesso() {
  return (
    <>
      {/* HOW IT WORKS SECTION */}
      <section className="relative py-24 sm:py-32 lg:py-40 bg-[#0e0e12] overflow-hidden border-b border-white/5">
        <div className="max-w-[85rem] mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="flex flex-col items-center text-center mb-20 lg:mb-24">
            <ScrollReveal className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan" />
              <span className="font-display text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                NOSSO PROCESSO
              </span>
            </ScrollReveal>

            <ScrollReveal
              delay={100}
              as="h2"
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-white leading-[1.1] mb-6"
            >
              Como funciona a{" "}
              <span
                className="italic font-light text-transparent bg-clip-text pr-1"
                style={{
                  backgroundImage: "linear-gradient(160deg, #a79df0, #82b8f7, #4ed4cf, #58e5a6)",
                }}
              >
                nossa engenharia
              </span>
            </ScrollReveal>

            <ScrollReveal
              delay={200}
              as="p"
              className="text-sm sm:text-base text-slate-400 font-light max-w-2xl mx-auto leading-relaxed"
            >
              Um processo testado e validado para entregar software de classe mundial.
            </ScrollReveal>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6">
            {ARCHITECTURE_STEPS.map((step, idx) => (
              <ScrollReveal
                key={idx}
                delay={100 + idx * 100}
                className="relative flex flex-col group p-6 lg:p-8 rounded-2xl bg-[#131318]/50 border border-white/5 hover:bg-[#131318] hover:border-white/10 transition-all duration-500 overflow-hidden"
                style={
                  {
                    "--step-color": step.color,
                    "--step-color-rgb": step.rgb,
                  } as React.CSSProperties
                }
              >
                {/* Glow Background on Hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at top right, rgba(var(--step-color-rgb), 0.15), transparent 70%)",
                  }}
                />

                {/* Animated Top Border Line */}
                <div className="absolute top-0 left-0 w-full h-[2px] opacity-20 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--step-color)] to-transparent -translate-x-full group-hover:animate-aurora-beam" />
                </div>

                {/* Header (Number + Title) */}
                <div className="relative z-10 flex flex-col gap-5 mb-5">
                  <div className="flex-shrink-0 size-12 rounded-full bg-[#0a0a0c] border border-white/10 flex items-center justify-center font-mono text-sm font-bold text-slate-500 group-hover:text-[var(--step-color)] group-hover:border-[var(--step-color)]/50 group-hover:shadow-[0_0_20px_rgba(var(--step-color-rgb),0.2)] transition-all duration-500">
                    0{idx + 1}
                  </div>
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-[var(--step-color)] transition-colors duration-300">
                    {step.title.substring(3)}
                  </h3>
                </div>

                {/* Content */}
                <p className="relative z-10 text-sm sm:text-base text-slate-400 font-light leading-relaxed">
                  {step.desc}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE ACTIVITY / TERMINAL SECTION */}
      <section className="relative py-24 sm:py-32 lg:py-40 bg-[#0c0c0f]">
        <div className="relative z-10 max-w-[85rem] mx-auto px-6 lg:px-12">
          <div className="max-w-[65rem]">
            <div className="flex flex-col items-start text-left mb-12">
              <ScrollReveal className="flex items-center gap-4 mb-6">
                <div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan" />
                <span className="font-display text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                  STATUS & MONITORAMENTO
                </span>
              </ScrollReveal>

              <ScrollReveal
                delay={100}
                as="h2"
                className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-white leading-[1.1] mb-4"
              >
                Atividade de divisão ao vivo
              </ScrollReveal>

              <ScrollReveal
                delay={200}
                as="p"
                className="text-sm sm:text-base text-slate-400 font-light leading-relaxed max-w-2xl"
              >
                Os bastidores da Opnora operam de forma contínua. Um retrato em tempo real dos
                processos rodando nas nossas três frentes neste momento.
              </ScrollReveal>
            </div>

            <div className="w-full relative">
              <ScrollReveal delay={300}>
                <TerminalSolucoes startDelay={500} />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION - INTERESSADO EM NOSSO TRABALHO */}
      <section className="relative py-32 sm:py-40 bg-[#0e0e12] border-t border-white/5 text-center overflow-hidden flex flex-col items-center">
        {/* Glow behind the CTA */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#a79df0]/5 blur-[150px] pointer-events-none rounded-t-full" />

        <ScrollReveal
          as="h2"
          className="relative z-10 font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-white leading-[1.1] mb-6"
        >
          Interessado em nosso{" "}
          <span
            className="text-transparent bg-clip-text pr-1"
            style={{
              backgroundImage: "linear-gradient(160deg, #a79df0, #82b8f7, #4ed4cf, #58e5a6)",
            }}
          >
            trabalho?
          </span>
        </ScrollReveal>

        <ScrollReveal
          delay={100}
          as="p"
          className="relative z-10 text-sm sm:text-base text-slate-400 font-light leading-relaxed max-w-xl mx-auto text-center mb-10 px-6"
        >
          Explore nossos produtos, acompanhe nossos experimentos ou junte-se a nós para construir a
          próxima geração de tecnologia.
        </ScrollReveal>

        <ScrollReveal
          delay={200}
          className="relative z-10 flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          {/* Botão Branco - Projetos */}
          <Link
            to="/solucoes"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-[#f4f4f5] px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-black transition-all duration-300 hover:-translate-y-1 hover:bg-white active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_4px_14px_rgba(255,255,255,0.15)] w-full sm:w-auto min-w-[220px]"
          >
            {/* Textura de scanlines bem sutil */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(transparent, transparent 2px, black 2px, black 3px)",
                backgroundSize: "100% 3px",
              }}
            />
            <span className="relative z-10">VER PROJETOS</span>
          </Link>

          {/* Botão Preto - Contato */}
          <Link
            to="/contato"
            className="group relative inline-flex items-center justify-center rounded-md border border-white/10 bg-[#0a0a0c] px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/5 hover:border-white/20 active:scale-95 w-full sm:w-auto min-w-[220px]"
          >
            CONTATO
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
