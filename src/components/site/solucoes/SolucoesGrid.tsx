import { FaCode, FaMicrochip, FaFlaskVial, FaCheck } from "react-icons/fa6";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const CORE_SECTIONS = [
  {
    num: "01",
    title: "Sistemas & Plataformas",
    label: "OPNORA BUILD",
    desc: "Desenvolvimento de sistemas, plataformas, sites, painéis administrativos e ferramentas digitais sob medida para sua operação.",
    checks: [
      "Software sob medida que resolve problemas reais",
      "Arquitetura escalável para acompanhar o seu crescimento",
      "Painéis e interfaces construídos para a sua equipe",
      "Sem dependência de soluções engessadas",
    ],
    icon: FaCode,
    reverse: false,
    color: "#a280ff",
    rgb: "162, 128, 255",
  },
  {
    num: "02",
    title: "Automação & Dados",
    label: "OPNORA INTELLIGENCE",
    desc: "Uso de inteligência artificial, automação, dados, bots e integrações para tornar processos mais eficientes e inteligentes.",
    checks: [
      "Automação de processos e tarefas repetitivas",
      "Análise de dados para tomada de decisões",
      "Bots e fluxos de atendimento inteligente",
      "Integrações que conectam todos os seus sistemas",
    ],
    icon: FaMicrochip,
    reverse: true,
    color: "#40c4ff",
    rgb: "64, 196, 255",
  },
  {
    num: "03",
    title: "Experimentação Contínua",
    label: "OPNORA LABS",
    desc: "Pesquisa, prototipação e experimentação de novas ideias, conectando aprendizado, inovação e soluções digitais futuras.",
    checks: [
      "Pesquisa aplicada a problemas reais",
      "Prototipação rápida de conceitos",
      "Experimentação e provas de conceito",
      "Evolução guiada por descobertas",
    ],
    icon: FaFlaskVial,
    reverse: false,
    color: "#69f0ae",
    rgb: "105, 240, 174",
  },
];


export function SolucoesGrid() {
  return (
    <>
      {/* 3. PENSAMOS NO SEU NEGÓCIO (Zig-Zag) */}
      <div className="relative w-full flex flex-col">
        {/* Header Block */}
        <section className="relative w-full overflow-hidden bg-[#0e0e12] pt-24 lg:pt-32 pb-4 lg:pb-4">
          <div className="max-w-[85rem] mx-auto px-6 lg:px-12 flex flex-col items-center">
            <ScrollReveal className="text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan" />
                <span className="font-display text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                  NOSSOS SERVIÇOS
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-white leading-[1.1] mb-6">
                Soluções que acompanham seu negócio
              </h2>
              <p className="text-sm sm:text-base text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
                Desenhamos ecossistemas digitais sob medida para escalar a sua operação e acelerar
                seus resultados.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Alternate Items */}
        {CORE_SECTIONS.map((section, idx) => {
          const isReverse = section.reverse;
          const sectionBg = idx % 2 === 1 ? "bg-[#0c0c0f]" : "bg-[#0e0e12]";
          return (
            <section
              key={section.num}
              className={`relative w-full overflow-hidden py-12 lg:py-16 border-b border-white/5 ${sectionBg}`}
            >
              <div className="max-w-[85rem] mx-auto px-6 lg:px-12">
                <div
                  className={`flex flex-col ${isReverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12 lg:gap-20`}
                >
                  {/* Image/Visual Side */}
                  <div className="relative w-full lg:w-1/2 flex items-center justify-center min-h-[350px] lg:min-h-[450px]">
                    <ScrollReveal
                      delay={100}
                      className="relative w-full h-full flex items-center justify-center group"
                    >
                      {/* Big Number Background */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-visible">
                        <span className="font-display text-[14rem] sm:text-[18rem] lg:text-[24rem] font-bold text-white/[0.03] leading-none select-none">
                          {section.num}
                        </span>
                      </div>

                      {/* Concentric rings */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-60 z-0">
                        <div
                          className="absolute w-32 h-32 rounded-full border group-hover:scale-110 transition-transform duration-700"
                          style={{ borderColor: `rgba(${section.rgb}, 0.5)` }}
                        />
                        <div
                          className="absolute w-48 h-48 rounded-full border group-hover:scale-110 transition-transform duration-700 delay-75"
                          style={{ borderColor: `rgba(${section.rgb}, 0.3)` }}
                        />
                        <div
                          className="absolute w-72 h-72 rounded-full border group-hover:scale-110 transition-transform duration-700 delay-150"
                          style={{ borderColor: `rgba(${section.rgb}, 0.2)` }}
                        />
                        <div
                          className="absolute w-96 h-96 rounded-full border group-hover:scale-110 transition-transform duration-700 delay-200"
                          style={{ borderColor: `rgba(${section.rgb}, 0.1)` }}
                        />
                      </div>

                      {/* Soft background glow */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0">
                        <div
                          className="w-64 h-64 blur-3xl rounded-full"
                          style={{ backgroundColor: `rgba(${section.rgb}, 0.1)` }}
                        />
                      </div>

                      {/* Icon */}
                      <div className="relative z-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <section.icon
                          className="size-20 lg:size-24"
                          style={{
                            color: section.color,
                            filter: `drop-shadow(0 0 10px rgba(${section.rgb}, 0.2))`,
                          }}
                          strokeWidth={1}
                        />
                      </div>
                    </ScrollReveal>
                  </div>

                  {/* Content Side */}
                  <div className="w-full lg:w-1/2">
                    <ScrollReveal>
                      <div className="flex items-center gap-3 mb-6">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: section.color,
                            boxShadow: `0 0 8px ${section.color}`,
                          }}
                        />
                        <span
                          className="font-mono text-[11px] font-bold uppercase tracking-[0.2em]"
                          style={{ color: section.color }}
                        >
                          {section.label}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-6">
                        {section.title}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-400 font-light mb-8 leading-relaxed">
                        {section.desc}
                      </p>

                      <ul className="space-y-4">
                        {section.checks.map((check, cIdx) => (
                          <li key={cIdx} className="flex items-start gap-3 text-slate-300">
                            <FaCheck
                              className="mt-1 shrink-0"
                              size={18}
                              style={{ color: section.color }}
                            />
                            <span className="leading-snug">{check}</span>
                          </li>
                        ))}
                      </ul>
                    </ScrollReveal>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>


    </>
  );
}
