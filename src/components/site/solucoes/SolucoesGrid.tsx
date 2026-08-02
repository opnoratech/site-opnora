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
          const sectionBg = idx % 2 === 1 ? "bg-[#0c0c0f]" : "bg-[#0e0e12]";
          const pyClass = idx === 0 ? "pt-8 lg:pt-12 pb-12 lg:pb-16" : "py-12 lg:py-16";
          return (
            <section
              key={section.num}
              className={`relative w-full overflow-hidden ${pyClass} border-b border-white/5 ${sectionBg}`}
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
                        <span
                          className="font-display text-[13rem] sm:text-[16rem] lg:text-[20.5rem] font-bold leading-none select-none transition-all duration-500 group-hover:scale-105"
                          style={{
                            color: section.color,
                            opacity: 0.08,
                            filter: `drop-shadow(0 0 25px rgba(${section.rgb}, 0.35))`,
                          }}
                        >
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
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
                        <div className="flex items-center gap-2.5">
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
                        <span
                          className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] px-3 py-1 rounded-sm border"
                          style={{
                            color: section.color,
                            borderColor: `rgba(${section.rgb}, 0.35)`,
                            backgroundColor: `rgba(${section.rgb}, 0.05)`,
                          }}
                        >
                          {section.badge}
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
