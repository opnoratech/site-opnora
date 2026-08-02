import { ScrollReveal } from "@/components/ui/ScrollReveal";

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
      <section className="relative py-20 lg:py-28 bg-[#0c0c0f] overflow-hidden border-t border-b border-white/5">
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
    </>
  );
}
