import { useState } from "react";
import { FaCode, FaDiagramProject, FaFlaskVial } from "react-icons/fa6";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type CardData = {
  num: string;
  label: string;
  title: string;
  desc: string;
  tags: string[];
  icon: any;
  color: string;
  glow: string;
  borderGlow: string;
  span?: boolean;
};

function CardItem({ card, delay = 0 }: { card: CardData; delay?: number }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <ScrollReveal delay={delay} className={`h-full ${card.span ? "md:col-span-2" : ""}`}>
      <div
        onMouseMove={handleMouseMove}
        className="group relative h-full w-full rounded-sm bg-[#131318] border border-white/[0.05] transition-all duration-700 ease-out hover:bg-[#181820] hover:-translate-y-2"
      >
        {/* Neon Border Glow Overlay (Static Full Border) */}
        <div
          className="absolute -inset-[1px] rounded-sm opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none z-20"
          style={{
            boxShadow: `0 0 10px ${card.glow}`,
            border: `1px solid ${card.color}`,
          }}
        />

        {/* Actual Card Body */}
        <div className="relative z-10 flex h-full w-full flex-col items-start p-6 sm:p-8 overflow-hidden rounded-sm">
          {/* Large Number Background */}
          <ScrollReveal
            as="span"
            animation="sr-fade-in"
            delay={delay + 100}
            className="pointer-events-none absolute top-3 right-4 select-none font-display text-[5rem] font-bold leading-none text-white/[0.02] transition-all duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:scale-105 group-hover:text-white/[0.04] md:top-1 md:right-3 md:text-[7rem]"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            {card.num}
          </ScrollReveal>

          {/* Icon */}
          <ScrollReveal delay={delay + 150} animation="sr-fade-up">
            <card.icon
              size={36}
              color={card.color}
              style={{ filter: `drop-shadow(0 0 4px ${card.color}40)` }}
              className="mb-6 relative z-10"
            />
          </ScrollReveal>

          {/* Label */}
          <ScrollReveal
            as="span"
            delay={delay + 200}
            animation="sr-fade-up"
            className="mb-4 font-display text-[10px] font-bold uppercase tracking-[0.2em] md:text-[11px] relative z-10"
            style={{ color: card.color }}
          >
            {card.label}
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal
            as="h3"
            delay={delay + 250}
            animation="sr-fade-up"
            className="mb-3 font-display text-xl font-bold leading-[1.4] tracking-wide text-white relative z-10"
          >
            {card.title}
          </ScrollReveal>
          <ScrollReveal
            as="p"
            delay={delay + 300}
            animation="sr-fade-up"
            className="mb-10 flex-grow pr-4 text-sm font-light leading-relaxed text-slate-400 lg:pr-8 relative z-10"
          >
            {card.desc}
          </ScrollReveal>

          {/* Tags */}
          <ScrollReveal
            delay={delay + 400}
            animation="sr-fade-up"
            className="mt-auto flex flex-wrap gap-1.5 relative z-10"
          >
            {card.tags.map((tag, j) => (
              <span
                key={j}
                className="inline-flex items-center rounded-sm border border-white/5 bg-white/[0.01] px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-slate-400 transition-colors group-hover:border-white/10 group-hover:text-slate-300 md:text-[10px]"
              >
                {tag}
              </span>
            ))}
          </ScrollReveal>
        </div>
      </div>
    </ScrollReveal>
  );
}

export function EcosystemSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const cards: CardData[] = [
    {
      num: "01",
      label: "OPNORA BUILD",
      title: "Desenvolvimento de software e sistemas digitais",
      desc: "Desenvolvimento de sistemas, plataformas, sites, painéis administrativos e ferramentas digitais sob medida.",
      tags: ["Sistemas web", "Plataformas", "Dashboards", "Portais", "Software sob medida"],
      icon: FaCode,
      color: "#38bdf8", // ciano / azul
      glow: "rgba(56, 189, 248, 0.15)",
      borderGlow: "rgba(56, 189, 248, 0.6)",
    },
    {
      num: "02",
      label: "OPNORA INTELLIGENCE",
      title: "Inteligência artificial, automação e dados",
      desc: "Uso de inteligência artificial, automação, dados, bots, integrações e fluxos inteligentes para tornar os processos mais eficientes.",
      tags: ["Automação", "Integrações", "Dados", "WhatsApp", "Fluxos digitais"],
      icon: FaDiagramProject,
      color: "#34d399", // verde/ciano
      glow: "rgba(52, 211, 153, 0.15)",
      borderGlow: "rgba(52, 211, 153, 0.6)",
    },
    {
      num: "03",
      label: "OPNORA LABS",
      title: "Pesquisa, prototipação e experimentação",
      desc: "Pesquisa, prototipação e experimentação de novas ideias, conectando aprendizado, inovação e soluções digitais futuras.",
      tags: ["MVPs", "Protótipos", "Pesquisa", "Experimentação", "Inovação"],
      icon: FaFlaskVial,
      color: "#a280ff", // violeta
      glow: "rgba(162, 128, 255, 0.15)",
      borderGlow: "rgba(162, 128, 255, 0.6)",
    },
  ];

  return (
    <section
      className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden bg-[#0e0e12] border-t border-white/5 py-24 lg:py-32"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative z-10 mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-12">
        {/* Header - Left Aligned */}
        <div className="flex flex-col items-start text-left mb-16 lg:mb-20">
          <ScrollReveal delay={0} className="flex items-center gap-4 mb-6">
            <div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan"></div>
            <span className="font-mono text-[10px] sm:text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em]">
              03 / FRENTES DA OPNORA
            </span>
          </ScrollReveal>

          <ScrollReveal
            delay={100}
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.3] mb-6 tracking-tight font-display max-w-3xl"
          >
            <span className="text-white">
              O ecossistema {" "}
            </span>
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(160deg, #a79df0, #82b8f7, #4ed4cf, #58e5a6)",
              }}
            >
              Opnora.
            </span>
          </ScrollReveal>

          <ScrollReveal
            delay={200}
            as="p"
            className="text-sm sm:text-base text-slate-400 font-light leading-relaxed max-w-2xl"
          >
            A Opnora atua em três frentes conectadas para criar sistemas mais úteis, organizados e
            preparados para acompanhar a evolução de cada projeto.
          </ScrollReveal>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-20">
          {cards.map((card, idx) => (
            <CardItem key={idx} card={card} delay={idx * 150} />
          ))}
        </div>
      </div>

      {/* Flashlight Effect for the whole section (Over everything) */}
      <div
        className={`pointer-events-none absolute inset-0 z-50 transition-opacity duration-500 ${isHovered ? "opacity-50" : "opacity-0"}`}
        style={{
          background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(162, 128, 255, 0.03), transparent 50%)`,
        }}
      />
    </section>
  );
}

