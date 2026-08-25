import React, { useEffect, useRef, useState } from "react";
import { FaFlaskVial, FaGear, FaPenNib, FaRocket } from "react-icons/fa6";
import { FadeIn } from "@/components/ui/FadeIn";

type SolucoesSectionProps = {
  bgClass?: string;
  eyebrow?: string;
};

export function SolucoesSection({
  bgClass = "bg-[#0e0e12]",
  eyebrow = "02 / METODOLOGIA DE DESENVOLVIMENTO",
}: SolucoesSectionProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef0 = useRef<HTMLDivElement>(null);
  const iconRef1 = useRef<HTMLDivElement>(null);
  const iconRef2 = useRef<HTMLDivElement>(null);
  const iconRef3 = useRef<HTMLDivElement>(null);

  const [pathD, setPathD] = useState<{
    main: string;
    ribbon1: string;
    ribbon2: string;
    energy: string;
  }>({
    main: "",
    ribbon1: "",
    ribbon2: "",
    energy: "",
  });

  useEffect(() => {
    let animId: number;

    const updatePath = () => {
      if (!containerRef.current) return;
      const cRect = containerRef.current.getBoundingClientRect();
      const time = Date.now() * 0.0018; // Tempo fluído, magestoso e cinemático

      const refs = [iconRef0, iconRef1, iconRef2, iconRef3];
      const pts = refs.map((ref) => {
        if (!ref.current) return null;
        const r = ref.current.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 - cRect.left,
          y: r.top + r.height / 2 - cRect.top,
        };
      });

      if (pts.every((p) => p !== null)) {
        const p = pts as { x: number; y: number }[];

        // Base dos pontos de controle
        const mx0 = p[0].x + (p[1].x - p[0].x) * 0.5;
        const my0 = (p[0].y + p[1].y) * 0.5;
        const mx1 = p[1].x + (p[2].x - p[1].x) * 0.5;
        const my1 = (p[1].y + p[2].y) * 0.5;
        const mx2 = p[2].x + (p[3].x - p[2].x) * 0.5;
        const my2 = (p[2].y + p[3].y) * 0.5;

        // 1. Núcleo Central (Main Core) - Ondulação muito sutil e ancorada
        const m_c0y = my0 + Math.sin(time * 1.2) * 5;
        const m_c1y = my1 + Math.cos(time * 1.4) * 6;
        const m_c2y = my2 + Math.sin(time * 1.6) * 5;
        const main = `M ${p[0].x} ${p[0].y} Q ${mx0} ${m_c0y}, ${p[1].x} ${p[1].y} Q ${mx1} ${m_c1y}, ${p[2].x} ${p[2].y} Q ${mx2} ${m_c2y}, ${p[3].x} ${p[3].y}`;

        // 2. Fita 1 (Ribbon Inferior) - Ondulação expansiva e lenta
        const r1_c0y = my0 + Math.sin(time * 1.5 + 1) * 18;
        const r1_c1y = my1 + Math.cos(time * 1.8 + 2) * 22;
        const r1_c2y = my2 + Math.sin(time * 2.1 + 3) * 18;
        const ribbon1 = `M ${p[0].x} ${p[0].y} Q ${mx0} ${r1_c0y}, ${p[1].x} ${p[1].y} Q ${mx1} ${r1_c1y}, ${p[2].x} ${p[2].y} Q ${mx2} ${r1_c2y}, ${p[3].x} ${p[3].y}`;

        // 3. Fita 2 (Ribbon Superior) - Ondulação expansiva invertida
        const r2_c0y = my0 + Math.sin(time * 1.7 + 4) * -16;
        const r2_c1y = my1 + Math.cos(time * 2.0 + 5) * -20;
        const r2_c2y = my2 + Math.sin(time * 2.3 + 6) * -16;
        const ribbon2 = `M ${p[0].x} ${p[0].y} Q ${mx0} ${r2_c0y}, ${p[1].x} ${p[1].y} Q ${mx1} ${r2_c1y}, ${p[2].x} ${p[2].y} Q ${mx2} ${r2_c2y}, ${p[3].x} ${p[3].y}`;

        // 4. Feixe de Energia (Energy Stream) - Ondulação mais rápida e contida
        const e_c0y = my0 + Math.sin(time * 2.8) * 10;
        const e_c1y = my1 + Math.cos(time * 3.2) * 12;
        const e_c2y = my2 + Math.sin(time * 3.6) * 10;
        const energy = `M ${p[0].x} ${p[0].y} Q ${mx0} ${e_c0y}, ${p[1].x} ${p[1].y} Q ${mx1} ${e_c1y}, ${p[2].x} ${p[2].y} Q ${mx2} ${e_c2y}, ${p[3].x} ${p[3].y}`;

        setPathD({ main, ribbon1, ribbon2, energy });
      }

      animId = requestAnimationFrame(updatePath);
    };

    animId = requestAnimationFrame(updatePath);
    return () => cancelAnimationFrame(animId);
  }, []);

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
      ref: iconRef0,
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
      ref: iconRef1,
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
      ref: iconRef2,
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
      ref: iconRef3,
    },
  ];

  return (
    <section
      className={`relative min-h-dvh flex flex-col items-center justify-center overflow-hidden border-t border-white/5 py-24 lg:py-32 ${bgClass}`}
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
        <div ref={containerRef} className="relative w-full max-w-5xl mt-10">
          {/* SVG Line dinamica que GRUDA no centro de cada ícone em tempo real com efeito de Aurora Boreal de 3 camadas - desktop only */}
          <div className="absolute inset-0 hidden md:block pointer-events-none z-0">
            <svg className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="aurora-dynamic-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a280ff" stopOpacity="0.95" />
                  <stop offset="33%" stopColor="#40c4ff" stopOpacity="0.95" />
                  <stop offset="66%" stopColor="#18ffff" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#58e5a6" stopOpacity="0.95" />
                </linearGradient>
                <linearGradient id="aurora-glow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a280ff" stopOpacity="0.4" />
                  <stop offset="33%" stopColor="#40c4ff" stopOpacity="0.4" />
                  <stop offset="66%" stopColor="#18ffff" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#58e5a6" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {pathD.main && (
                <>
                  {/* Fundo difuso (Aura base grossa) */}
                  <path
                    d={pathD.main}
                    fill="none"
                    stroke="url(#aurora-glow-gradient)"
                    strokeWidth="32"
                    strokeLinecap="round"
                    style={{ filter: "blur(18px)", opacity: 0.4 }}
                  />

                  {/* Fita Superior (Ribbon 2) */}
                  <path
                    d={pathD.ribbon2}
                    fill="none"
                    stroke="url(#aurora-dynamic-gradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    style={{
                      filter: "blur(6px)",
                      opacity: 0.45,
                      mixBlendMode: "screen",
                    }}
                  />
                  <path
                    d={pathD.ribbon2}
                    fill="none"
                    stroke="url(#aurora-dynamic-gradient)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    style={{ opacity: 0.6, mixBlendMode: "screen" }}
                  />

                  {/* Fita Inferior (Ribbon 1) */}
                  <path
                    d={pathD.ribbon1}
                    fill="none"
                    stroke="url(#aurora-dynamic-gradient)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    style={{
                      filter: "blur(8px)",
                      opacity: 0.4,
                      mixBlendMode: "screen",
                    }}
                  />
                  <path
                    d={pathD.ribbon1}
                    fill="none"
                    stroke="url(#aurora-dynamic-gradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={{ opacity: 0.75, mixBlendMode: "screen" }}
                  />

                  {/* Fita de Energia Rápida (Energy Stream) */}
                  <path
                    d={pathD.energy}
                    fill="none"
                    stroke="url(#aurora-dynamic-gradient)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    style={{
                      filter: "blur(3px)",
                      opacity: 0.5,
                      mixBlendMode: "screen",
                    }}
                  />

                  {/* Núcleo Principal (Main Core) */}
                  <path
                    d={pathD.main}
                    fill="none"
                    stroke="url(#aurora-dynamic-gradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    style={{
                      filter: "blur(2px)",
                      opacity: 1,
                      mixBlendMode: "screen",
                    }}
                  />
                  <path
                    d={pathD.main}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    style={{
                      filter: "drop-shadow(0 0 5px rgba(255,255,255,0.9))",
                      opacity: 0.85,
                    }}
                  />
                </>
              )}
            </svg>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-4 relative z-10 items-start">
            {steps.map((step, i) => (
              <FadeIn key={i} delay={i * 150} className="flex flex-col items-center text-center">
                {/* Circle Icon com cada círculo dançando organicamente e a linha grudada no seu centro */}
                <div
                  ref={step.ref}
                  className="organic-float w-12 h-12 md:w-[60px] md:h-[60px] rounded-full flex items-center justify-center border-2 mb-4 md:mb-5 bg-[#0c0c0f] relative z-10 transition-all duration-300 md:hover:scale-110 cursor-pointer"
                  style={{
                    borderColor: step.color,
                    boxShadow: `0 0 16px ${step.glow}`,
                    animationDuration: step.duration,
                    animationDelay: step.delay,
                  }}
                >
                  <step.icon className="size-5 md:size-7 text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.2)] transition-all duration-500" />
                </div>

                {/* Step Title */}
                <h3
                  className="font-display text-sm sm:text-base font-bold mb-1.5 md:mb-2 tracking-wide"
                  style={{ color: step.color }}
                >
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-[11px] md:text-xs text-slate-400 leading-relaxed font-light px-1 md:px-2 max-w-[240px]">
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
