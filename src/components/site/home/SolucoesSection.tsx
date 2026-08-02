import React from "react";
import { FaPenNib, FaGear, FaFlaskVial, FaRocket } from "react-icons/fa6";
import { FadeIn } from "@/components/ui/FadeIn";

type SolucoesSectionProps = {
  bgClass?: string;
  eyebrow?: string;
};

export function SolucoesSection({
  bgClass = "bg-[#0e0e12]",
  eyebrow = "02 / SOLUÇÕES — COMO CONSTRUÍMOS",
}: SolucoesSectionProps = {}) {
  const steps = [
    {
      num: "01",
      title: "Design",
      desc: "Entendemos o cenário, os usuários e os processos antes de definir o que realmente vale construir.",
      icon: FaPenNib,
      color: "#a280ff", // Roxo Vivo
      glow: "rgba(162, 128, 255, 0.40)",
      duration: "4.5s",
      delay: "0s",
    },
    {
      num: "02",
      title: "Construção",
      desc: "Transformamos a sua estratégia em um software funcional, com interfaces claras e uma base técnica preparada para crescer junto com o seu negócio.",
      icon: FaGear,
      color: "#40c4ff", // Azul Vivo
      glow: "rgba(64, 196, 255, 0.40)",
      duration: "5.5s",
      delay: "1.5s",
    },
    {
      num: "03",
      title: "Testes",
      desc: "Testamos, validamos e refinamos cada funcionalidade para entregar uma solução pronta para o seu negócio, visando garantir uma entrega confiável e eficiente.",
      icon: FaFlaskVial,
      color: "#18ffff", // Ciano Vivo
      glow: "rgba(24, 255, 255, 0.40)",
      duration: "4s",
      delay: "0.8s",
    },
    {
      num: "04",
      title: "Lançamento",
      desc: "Colocamos a solução em uso, acompanhamos sua evolução e planejamos os próximos passos com mais clareza.",
      icon: FaRocket,
      color: "#58e5a6", // Verde Vivo
      glow: "rgba(88, 229, 166, 0.40)",
      duration: "5s",
      delay: "2.4s",
    },
  ];

  return (
    <section
      className={`relative min-h-dvh flex flex-col items-center justify-center overflow-hidden border-t border-white/5 py-24 ${bgClass}`}
    >
      <div className="relative z-10 mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-12 flex flex-col items-center">
        {/* Header content wrapped in FadeIn */}
        <FadeIn delay={0} className="flex flex-col items-center">
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan"></div>
            <span className="font-mono text-[10px] sm:text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em]">
              {eyebrow}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-[1.1] mb-4 tracking-tight text-center max-w-none lg:whitespace-nowrap text-white">
            Um jeito diferente de construir tecnologia
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed mb-14 max-w-2xl text-center">
            Começamos pelo problema, entendemos o contexto e transformamos necessidades reais em
            soluções digitais que podem evoluir junto com cada negócio.
          </p>
        </FadeIn>

        {/* Steps Grid */}
        <div className="relative w-full max-w-5xl mt-10">
          {/* Animação para a linha estilo Aurora */}
          <style>{`
            @keyframes aurora-flow {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
            .animate-aurora-flow {
              animation: aurora-flow 5s linear infinite;
            }
          `}</style>
          {/* Continuous horizontal line across steps */}
          <div className="absolute top-[38px] left-[15%] right-[15%] h-[2px] hidden md:block rounded-full bg-white/5 overflow-hidden">
            <div
              className="absolute inset-0 opacity-70 animate-aurora-flow"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(162,128,255,0.8) 25%, rgba(24,255,255,0.8) 50%, rgba(105,240,174,0.8) 75%, transparent 100%)",
                backgroundSize: "200% 100%",
              }}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
            {steps.map((step, i) => (
              <FadeIn key={i} delay={i * 150} className="flex flex-col items-center text-center">
                {/* Circle Icon */}
                <div
                  className="organic-float w-[60px] h-[60px] mt-2 rounded-full flex items-center justify-center border-2 mb-5 bg-[#0c0c0f]"
                  style={{
                    borderColor: step.color,
                    boxShadow: `0 0 12px ${step.glow}`,
                    animationDuration: step.duration,
                    animationDelay: step.delay,
                  }}
                >
                  <step.icon
                    size={28}
                    className="text-white drop-shadow-[0_0_2px_rgba(255,255,255,0.1)] transition-all duration-500"
                  />
                </div>

                {/* Step Title */}
                <h3
                  className="font-display text-base font-bold mb-2 tracking-wide"
                  style={{ color: step.color }}
                >
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-[11px] md:text-xs text-slate-400 leading-relaxed font-light px-2">
                  {step.desc}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
