import { useCallback, useRef, useState } from "react";
import { FaCode, FaDiagramProject, FaFlaskVial } from "react-icons/fa6";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useIsMobile } from "@/hooks/use-mobile";

type CardData = {
  num: string;
  label: string;
  title: string;
  desc: string;
  tags: string[];
  icon: React.ElementType;
  color: string;
  glow: string;
  borderGlow: string;
  span?: boolean;
};

function CardItem({
  card,
  delay = 0,
  isMobile = false,
  isMobileActive = false,
  onMobileTap,
}: {
  card: CardData;
  delay?: number;
  isMobile?: boolean;
  isMobileActive?: boolean;
  onMobileTap?: () => void;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // No mobile, ignorar mousemove para evitar re-renders desnecessários
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (isMobile) return;
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    [isMobile],
  );

  const handleClick = useCallback(() => {
    if (isMobile) {
      onMobileTap?.();
    }
  }, [isMobile, onMobileTap]);

  return (
    <ScrollReveal delay={delay} className={`h-full ${card.span ? "md:col-span-2" : ""}`}>
      <div
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        className={`group relative h-full w-full rounded-sm border transition-all duration-500 ease-out overflow-hidden cursor-pointer select-none ${
          isMobileActive
            ? "bg-[#181820] -translate-y-1"
            : "bg-[#131318] border-white/[0.05] md:hover:bg-[#181820] md:hover:border-[#b3a1ff]/20 md:hover:shadow-[0_8px_30px_rgba(179,161,255,0.08)] md:hover:-translate-y-2"
        }`}
        style={{
          borderColor: isMobileActive ? card.borderGlow.replace("0.65", "0.3") : undefined,
          boxShadow: isMobileActive ? `0 8px 25px ${card.glow}, 0 0 10px ${card.glow}` : undefined,
        }}
      >
        <div className="relative z-10 flex h-full w-full flex-col items-start p-6 sm:p-8 overflow-hidden rounded-sm">
          <ScrollReveal
            as="span"
            animation="sr-fade-in"
            delay={delay + 100}
            className={`pointer-events-none absolute top-3 right-4 select-none font-display text-[5rem] font-bold leading-none transition-all duration-500 md:top-1 md:right-3 md:text-[7rem] ${
              isMobileActive
                ? "text-white/[0.06] scale-105"
                : "text-white/[0.02] md:group-hover:-translate-x-1 md:group-hover:-translate-y-1 md:group-hover:scale-105 md:group-hover:text-white/[0.04]"
            }`}
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            {card.num}
          </ScrollReveal>

          <ScrollReveal delay={delay + 150} animation="sr-fade-up">
            <card.icon
              size={36}
              color={card.color}
              style={{
                filter: `drop-shadow(0 0 ${isMobileActive ? "10px" : "4px"} ${card.color}${isMobileActive ? "80" : "40"})`,
              }}
              className={`mb-6 relative z-10 transition-transform duration-300 ${isMobileActive ? "scale-110" : ""}`}
            />
          </ScrollReveal>

          <ScrollReveal
            as="span"
            delay={delay + 200}
            animation="sr-fade-up"
            className="mb-4 font-display text-[10px] font-bold uppercase tracking-[0.2em] md:text-[11px] relative z-10"
            style={{ color: card.color }}
          >
            {card.label}
          </ScrollReveal>

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

          <ScrollReveal
            delay={delay + 400}
            animation="sr-fade-up"
            className="mt-auto flex flex-wrap gap-1.5 relative z-10"
          >
            {card.tags.map((tag, j) => (
              <span
                key={j}
                className={`inline-flex items-center rounded-sm border px-2 py-1 font-mono text-[9px] uppercase tracking-wider transition-colors md:text-[10px] ${
                  isMobileActive
                    ? "border-white/20 text-slate-200 bg-white/5"
                    : "border-white/5 bg-white/[0.01] text-slate-400 md:group-hover:border-white/10 md:group-hover:text-slate-300"
                }`}
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

type EcosystemSectionProps = {
  eyebrow?: string;
};

export function EcosystemSection({
  eyebrow = "03 / FRENTES DA OPNORA",
}: EcosystemSectionProps = {}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [mobileActiveIndex, setMobileActiveIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const handleMobileCardTap = useCallback((idx: number) => {
    setMobileActiveIndex((prev) => (prev === idx ? null : idx));
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isMobile) return;
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
      color: "#b873ff",
      glow: "rgba(184, 115, 255, 0.18)",
      borderGlow: "rgba(184, 115, 255, 0.65)",
    },
    {
      num: "02",
      label: "OPNORA INTELLIGENCE",
      title: "Inteligência artificial, automação e dados",
      desc: "Uso de inteligência artificial, automação, dados, bots, integrações e fluxos inteligentes para tornar os processos mais eficientes.",
      tags: ["Automação", "Integrações", "Dados", "WhatsApp", "Fluxos digitais"],
      icon: FaDiagramProject,
      color: "#00d8ff",
      glow: "rgba(0, 216, 255, 0.18)",
      borderGlow: "rgba(0, 216, 255, 0.65)",
    },
    {
      num: "03",
      label: "OPNORA LABS",
      title: "Pesquisa, prototipação e experimentação",
      desc: "Pesquisa, prototipação e experimentação de novas ideias, conectando aprendizado, inovação e soluções digitais futuras.",
      tags: ["MVPs", "Protótipos", "Pesquisa", "Experimentação", "Inovação"],
      icon: FaFlaskVial,
      color: "#00ff88",
      glow: "rgba(0, 255, 136, 0.18)",
      borderGlow: "rgba(0, 255, 136, 0.65)",
    },
  ];

  return (
    <section
      className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden bg-[#0c0c0f] border-t border-white/5 py-24 lg:py-32"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      <div className="relative z-10 mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col items-start text-left mb-16 lg:mb-20">
          <ScrollReveal delay={0} className="flex items-center gap-4 mb-6">
            <div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan"></div>
            <span className="font-mono text-[10px] sm:text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em]">
              {eyebrow}
            </span>
          </ScrollReveal>

          <ScrollReveal
            delay={100}
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.3] mb-6 tracking-tight font-display max-w-3xl"
          >
            <span className="text-white">A estrutura </span>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch relative z-20">
          {cards.map((card, idx) => (
            <CardItem
              key={card.num}
              card={card}
              delay={idx * 150}
              isMobile={isMobile}
              isMobileActive={mobileActiveIndex === idx}
              onMobileTap={() => handleMobileCardTap(idx)}
            />
          ))}
        </div>
      </div>

      <div
        className={`pointer-events-none absolute inset-0 z-50 transition-opacity duration-500 hidden md:block ${isHovered ? "opacity-50" : "opacity-0"}`}
        style={{
          background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(162, 128, 255, 0.03), transparent 50%)`,
        }}
      />
    </section>
  );
}
