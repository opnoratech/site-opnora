import { FaCode, FaMicrochip, FaFlaskVial, FaCheck } from "react-icons/fa6";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const CORE_SECTIONS = [
  {
    num: "01",
    title: "Sistemas & Plataformas",
    label: "OPNORA BUILD",
    badge: "DIVISÃO DE SOFTWARE",
    desc: "Desenvolvimento de sistemas, plataformas, sites, painéis administrativos e ferramentas digitais sob medida para sua operação.",
    checks: [
      "Software sob medida que resolve problemas reais",
      "Arquitetura escalável para acompanhar o seu crescimento",
      "Painéis e interfaces construídos para a sua equipe",
      "Sem dependência de soluções engessadas",
    ],
    icon: FaCode,
    reverse: false,
    color: "#b873ff",
    rgb: "184, 115, 255",
  },
  {
    num: "02",
    title: "Automação & Dados",
    label: "OPNORA INTELLIGENCE",
    badge: "DIVISÃO DE AUTOMAÇÃO & IA",
    desc: "Uso de inteligência artificial, automação, dados, bots e integrações para tornar processos mais eficientes e inteligentes.",
    checks: [
      "Automação de processos e tarefas repetitivas",
      "Análise de dados para tomada de decisões",
      "Bots e fluxos de atendimento inteligente",
      "Integrações que conectam todos os seus sistemas",
    ],
    icon: FaMicrochip,
    reverse: true,
    color: "#00d8ff",
    rgb: "0, 216, 255",
  },
  {
    num: "03",
    title: "Experimentação Contínua",
    label: "OPNORA LABS",
    badge: "DIVISÃO DE PESQUISA",
    desc: "Pesquisa, prototipação e experimentação de novas ideias, conectando aprendizado, inovação e soluções digitais futuras.",
    checks: [
      "Pesquisa aplicada a problemas reais",
      "Prototipação rápida de conceitos",
      "Experimentação e provas de conceito",
      "Evolução guiada por descobertas",
    ],
    icon: FaFlaskVial,
    reverse: false,
    color: "#00ff88",
    rgb: "0, 255, 136",
  },
];

export function SolucoesGrid() {
  return (
    <>
      {/* 3. PENSAMOS NO SEU NEGÓCIO (Zig-Zag) */}
      <div className="relative w-full flex flex-col">
        {/* Alternate Items */}
        {CORE_SECTIONS.map((section, idx) => {
          const isReverse = section.reverse;
          const sectionBg = idx % 2 === 1 ? "bg-[#0c0c10]" : "bg-[#0e0e12]";
          const pyClass =
            idx === 0
              ? "pt-12 md:pt-20 lg:pt-28 pb-16 md:pb-24 lg:pb-32"
              : "py-16 md:py-24 lg:py-32";
          return (
            <section
              key={section.num}
              className={`relative w-full overflow-hidden ${pyClass} border-b border-white/5 ${sectionBg}`}
            >
              <div className="max-w-[85rem] mx-auto px-6 lg:px-12 relative z-10">
                <div
                  className={`flex flex-col ${isReverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12 md:gap-16 lg:gap-24`}
                >
                  {/* Image/Visual Side */}
                  <div className="relative w-full lg:w-1/2 flex items-center justify-center min-h-[280px] sm:min-h-[360px] md:min-h-[420px] lg:min-h-[480px] z-10">
                    <ScrollReveal
                      delay={100}
                      className="relative w-full h-full flex items-center justify-center group py-8"
                    >
                      {/* Big Number Background */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-visible">
                        <span
                          className="font-display text-[10rem] sm:text-[14rem] md:text-[18rem] lg:text-[22rem] font-bold leading-none select-none transition-transform duration-700 ease-out group-hover:scale-105"
                          style={{
                            color: section.color,
                            opacity: 0.07,
                            filter: `drop-shadow(0 0 30px rgba(${section.rgb}, 0.35))`,
                          }}
                        >
                          {section.num}
                        </span>
                      </div>

                      {/* Concentric rings */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50 z-1">
                        <div
                          className="absolute w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full border group-hover:scale-110 transition-transform duration-700 ease-out"
                          style={{ borderColor: `rgba(${section.rgb}, 0.45)` }}
                        />
                        <div
                          className="absolute w-36 h-36 sm:w-48 sm:h-48 md:w-60 md:h-60 rounded-full border group-hover:scale-110 transition-transform duration-700 ease-out delay-75"
                          style={{ borderColor: `rgba(${section.rgb}, 0.28)` }}
                        />
                        <div
                          className="absolute w-52 h-52 sm:w-68 sm:h-68 md:w-84 md:h-84 rounded-full border group-hover:scale-110 transition-transform duration-700 ease-out delay-150"
                          style={{ borderColor: `rgba(${section.rgb}, 0.18)` }}
                        />
                        <div
                          className="absolute w-72 h-72 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] rounded-full border group-hover:scale-110 transition-transform duration-700 ease-out delay-200"
                          style={{ borderColor: `rgba(${section.rgb}, 0.08)` }}
                        />
                      </div>

                      {/* Soft background glow */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-1 pointer-events-none">
                        <div
                          className="w-56 h-56 md:w-80 md:h-80 blur-3xl rounded-full"
                          style={{ backgroundColor: `rgba(${section.rgb}, 0.12)` }}
                        />
                      </div>

                      {/* Icon */}
                      <div className="relative z-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 ease-out">
                        <section.icon
                          className="size-14 sm:size-18 md:size-22 lg:size-26"
                          style={{
                            color: section.color,
                            filter: `drop-shadow(0 0 16px rgba(${section.rgb}, 0.4))`,
                          }}
                          strokeWidth={1}
                        />
                      </div>
                    </ScrollReveal>
                  </div>

                  {/* Content Side */}
                  <div className="w-full lg:w-1/2 relative z-20">
                    <ScrollReveal>
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-2.5 h-2.5 rounded-full"
                            style={{
                              backgroundColor: section.color,
                              boxShadow: `0 0 10px ${section.color}`,
                            }}
                          />
                          <span
                            className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em]"
                            style={{ color: section.color }}
                          >
                            {section.label}
                          </span>
                        </div>
                        <span
                          className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.15em] px-3 py-1 rounded-sm border"
                          style={{
                            color: section.color,
                            borderColor: `rgba(${section.rgb}, 0.35)`,
                            backgroundColor: `rgba(${section.rgb}, 0.06)`,
                          }}
                        >
                          {section.badge}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight leading-[1.15]">
                        {section.title}
                      </h3>
                      <p className="text-base sm:text-lg text-slate-300/90 font-light mb-8 leading-relaxed">
                        {section.desc}
                      </p>

                      <ul className="space-y-4">
                        {section.checks.map((check, cIdx) => (
                          <li key={cIdx} className="flex items-start gap-3.5 text-slate-200 text-sm sm:text-base">
                            <FaCheck
                              className="mt-1 shrink-0"
                              size={18}
                              style={{ color: section.color }}
                            />
                            <span className="leading-relaxed font-normal">{check}</span>
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

