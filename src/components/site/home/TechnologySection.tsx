import { Link } from "@tanstack/react-router";
import type React from "react";
import { useRef, useState } from "react";
import {
  FaBrain,
  FaChartPie,
  FaGears,
  FaLaptopCode,
  FaMobileScreenButton,
  FaServer,
} from "react-icons/fa6";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type TechCard = {
  label: string;
  title: string;
  desc: string;
  badge: string;
  icon: React.ElementType;
};

const TECH_CARDS: TechCard[] = [
  {
    label: "PLATAFORMA DE SOFTWARE",
    title: "Sistemas Inteligentes",
    desc: "Investigamos como dados, automação e inteligência artificial podem tornar sistemas mais úteis quando existe um problema real para resolver.",
    badge: "Core",
    icon: FaBrain,
  },
  {
    label: "EXPERIÊNCIA DO USUÁRIO",
    title: "Plataformas Digitais",
    desc: "Projetamos plataformas que conectam pessoas, processos e informações em experiências digitais mais claras e eficientes.",
    badge: "Design",
    icon: FaLaptopCode,
  },
  {
    label: "INFRAESTRUTURA E ESCALA",
    title: "Arquitetura de Sistemas",
    desc: "Estruturamos bases técnicas organizadas para que cada solução possa crescer sem perder desempenho, clareza ou controle.",
    badge: "Back-end",
    icon: FaServer,
  },
  {
    label: "APLICAÇÕES MÓVEIS",
    title: "Experiências Nativas",
    desc: "Desenvolvemos aplicativos performáticos e fluidos para iOS e Android, focando em usabilidade e engajamento móvel.",
    badge: "Mobile",
    icon: FaMobileScreenButton,
  },
  {
    label: "OTIMIZAÇÃO E PROCESSOS",
    title: "Automação de Negócios",
    desc: "Mapeamos fluxos de trabalho manuais e implementamos integrações e robôs que economizam tempo e reduzem erros operacionais.",
    badge: "Sistemas",
    icon: FaGears,
  },
  {
    label: "ANÁLISE DE DADOS",
    title: "Dashboards Analíticos",
    desc: "Criamos painéis de visualização de dados em tempo real que transformam informações complexas em decisões estratégicas.",
    badge: "Dados",
    icon: FaChartPie,
  },
];

function CardItem({ card, delay = 0 }: { card: TechCard; delay?: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [transform, setTransform] = useState("translateX(0px) translateY(0px)");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Deslocamento 2D intermediário (max 3px)
    const moveX = ((x - centerX) / centerX) * 3;
    const moveY = ((y - centerY) / centerY) * 3;

    // Combina uma elevação intermediária do hover (-6px) com o deslocamento
    setTransform(`translateX(${moveX}px) translateY(calc(-6px + ${moveY}px))`);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform("translateX(0px) translateY(0px)");
  };

  return (
    <ScrollReveal delay={delay} className="h-full">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform,
          transition: "transform 0.3s ease-out, background-color 0.5s ease",
        }}
        className="group relative flex h-full flex-col bg-[#131318] p-8 text-left overflow-hidden rounded-sm border border-white/5 hover:border-aurora-violet/30 will-change-transform z-10 transition-all duration-500"
      >
        {/* Glow Effect on Hover */}
        <div className="absolute inset-x-0 top-0 h-[60px] bg-gradient-to-b from-aurora-violet/5 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100 pointer-events-none z-10" />
        {/* Top Purple Line */}
        <div className="absolute inset-x-0 top-0 h-[4px] bg-aurora-violet/65 transition-all duration-500 group-hover:bg-aurora-violet z-20" />
        <div className="relative z-10 flex flex-col h-full">
          {/* Top Row: Icon & Badge */}
          <div className="flex justify-between items-start mb-6">
            <div
              style={{
                animation: isHovered
                  ? `float-icon ${3 + (delay % 2)}s ease-in-out infinite`
                  : "none",
                animationDelay: `${delay}ms`,
              }}
            >
              <card.icon
                size={28}
                className="text-white drop-shadow-[0_0_2px_rgba(255,255,255,0.2)] group-hover:text-aurora-violet group-hover:drop-shadow-[0_0_6px_rgba(162,128,255,0.4)] transition-all duration-300"
              />
            </div>
            <span className="rounded-[3px] border border-white bg-transparent px-3 py-1.5 font-mono text-[9px] font-bold text-white tracking-widest uppercase">
              {card.badge}
            </span>
          </div>

          {/* Texts */}
          <div className="mt-auto">
            <p className="font-mono text-[10px] text-[#a280ff] uppercase tracking-[0.2em] mb-2 font-bold">
              {card.label}
            </p>
            <h3 className="font-display text-xl font-bold tracking-wide text-white mb-4">
              {card.title}
            </h3>
            <p className="text-[13px] sm:text-sm font-light leading-relaxed text-[#8a8a93]">
              {card.desc}
            </p>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

type TechnologySectionProps = {
  showDetails?: boolean;
  bgClass?: string;
  eyebrow?: string;
};

export function TechnologySection({
  showDetails = true,
  bgClass = "bg-[#0c0c0f]",
  eyebrow = "ENGENHARIA & STACK",
}: TechnologySectionProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isSectionHovered, setIsSectionHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsSectionHovered(true)}
      onMouseLeave={() => setIsSectionHovered(false)}
      className={`relative min-h-dvh flex flex-col items-center justify-center overflow-hidden border-t border-white/5 py-24 lg:py-32 ${bgClass}`}
    >
      <div className="relative z-10 mx-auto w-full max-w-[90rem] px-4 sm:px-6 lg:px-12">
        {/* Header da Seção */}
        <div className="flex flex-col items-start text-left mb-16 lg:mb-20 max-w-3xl">
          <ScrollReveal delay={0} className="flex items-center gap-4 mb-6">
            <div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan"></div>
            <span className="font-mono text-[10px] sm:text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em]">
              {eyebrow}
            </span>
          </ScrollReveal>

          <ScrollReveal
            as="h2"
            delay={50}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-[1.1] mb-6 tracking-tight text-white max-w-4xl"
          >
            Tecnologias que construímos
          </ScrollReveal>
        </div>

        {/* Grid de Cards */}
        {showDetails ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 relative z-10">
            {TECH_CARDS.map((card, idx) => (
              <CardItem key={idx} card={card} delay={idx * 100} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 relative z-10">
            {TECH_CARDS.map((card, idx) => {
              const Icon = card.icon;
              return (
                <ScrollReveal
                  key={idx}
                  delay={idx * 80}
                  className="group relative rounded-sm bg-[#131318] border border-white/[0.05] p-6 sm:p-7 transition-all duration-700 ease-out hover:bg-[#181820] hover:-translate-y-2 overflow-hidden"
                >
                  {/* Conteúdo Horizontal Limpo */}
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-sm bg-gradient-to-br from-[#a280ff]/15 to-white/[0.02] border border-[#a280ff]/25 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-[#a280ff]/50 transition-all duration-300">
                      <Icon className="size-5 sm:size-6 text-[#a280ff]" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-base sm:text-lg font-bold text-white mb-2 group-hover:text-[#c4b3ff] transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        )}
      </div>

      {/* Global Spotlight Effect over the entire section */}
      <div
        className={`pointer-events-none absolute inset-0 z-50 transition-opacity duration-700 ${isSectionHovered ? "opacity-50" : "opacity-0"}`}
        style={{
          background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(162,128,255,0.03), transparent 50%)`,
        }}
      />
    </section>
  );
}
