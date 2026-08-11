import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from "shaders/react";
import { AntigravityParticleField } from "@/components/site/backgrounds/AntigravityParticleField";
import { FaAws } from "react-icons/fa6";
import { TbBrandOpenai } from "react-icons/tb";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiOpenjdk,
  SiDotnet,
  SiPhp,
  SiNodedotjs,
  SiTailwindcss,
  SiVuedotjs,
  SiAngular,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiGooglecloud,
  SiKubernetes,
  SiGraphql,
  SiFlutter,
  SiSwift,
  SiKotlin,
  SiRedis,
  SiVite,
  SiGo,
  SiRust,
  SiPrisma,
  SiSupabase,
  SiFramer,
  SiFigma,
  SiGit,
} from "react-icons/si";

type MarqueeLogo = {
  name: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
};

const MARQUEE_LOGOS: MarqueeLogo[] = [
  { name: "React", icon: SiReact, color: "#61DAFB", gradient: "from-[#61DAFB] to-[#00B4D8]" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff", gradient: "from-[#ffffff] to-[#71717a]" },
  {
    name: "TypeScript",
    icon: SiTypescript,
    color: "#3178C6",
    gradient: "from-[#3178C6] to-[#0052CC]",
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
    color: "#F7DF1E",
    gradient: "from-[#F7DF1E] to-[#D6BA00]",
  },
  { name: "Python", icon: SiPython, color: "#3776AB", gradient: "from-[#3776AB] to-[#FFD43B]" },
  { name: "Java", icon: SiOpenjdk, color: "#E76F00", gradient: "from-[#5382A1] to-[#E76F00]" },
  { name: "C#", icon: SiDotnet, color: "#512BD4", gradient: "from-[#512BD4] to-[#178600]" },
  { name: "PHP", icon: SiPhp, color: "#777BB4", gradient: "from-[#777BB4] to-[#4F5B93]" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E", gradient: "from-[#339933] to-[#215732]" },
  {
    name: "OpenAI",
    icon: TbBrandOpenai,
    color: "#10A37F",
    gradient: "from-[#10A37F] to-[#00A67E]",
  },
  {
    name: "Tailwind",
    icon: SiTailwindcss,
    color: "#06B6D4",
    gradient: "from-[#38B2AC] to-[#0D9488]",
  },
  { name: "Vue.js", icon: SiVuedotjs, color: "#4FC08D", gradient: "from-[#4FC08D] to-[#35495E]" },
  { name: "Angular", icon: SiAngular, color: "#DD0031", gradient: "from-[#DD0031] to-[#C3002F]" },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    color: "#4169E1",
    gradient: "from-[#4169E1] to-[#2F4F4F]",
  },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248", gradient: "from-[#47A248] to-[#116149]" },
  { name: "Docker", icon: SiDocker, color: "#2496ED", gradient: "from-[#2496ED] to-[#0DB7ED]" },
  { name: "AWS", icon: FaAws, color: "#FF9900", gradient: "from-[#FF9900] to-[#E47911]" },
  {
    name: "Google Cloud",
    icon: SiGooglecloud,
    color: "#4285F4",
    gradient: "from-[#4285F4] to-[#34A853]",
  },
  {
    name: "Kubernetes",
    icon: SiKubernetes,
    color: "#326CE5",
    gradient: "from-[#326CE5] to-[#1D4ED8]",
  },
  { name: "GraphQL", icon: SiGraphql, color: "#E10098", gradient: "from-[#E10098] to-[#C7007D]" },
  { name: "Flutter", icon: SiFlutter, color: "#02569B", gradient: "from-[#02569B] to-[#0175C2]" },
  { name: "Swift", icon: SiSwift, color: "#F05138", gradient: "from-[#F05138] to-[#D83B24]" },
  { name: "Kotlin", icon: SiKotlin, color: "#7F52FF", gradient: "from-[#7F52FF] to-[#C711E1]" },
  { name: "Redis", icon: SiRedis, color: "#DC382D", gradient: "from-[#DC382D] to-[#A32015]" },
  { name: "Vite", icon: SiVite, color: "#646CFF", gradient: "from-[#646CFF] to-[#FFD816]" },
  { name: "Go", icon: SiGo, color: "#00ADD8", gradient: "from-[#00ADD8] to-[#007D9C]" },
  { name: "Rust", icon: SiRust, color: "#DEA584", gradient: "from-[#DEA584] to-[#000000]" },
  { name: "Prisma", icon: SiPrisma, color: "#ffffff", gradient: "from-[#2D3748] to-[#1A202C]" },
  { name: "Supabase", icon: SiSupabase, color: "#3FCF8E", gradient: "from-[#3FCF8E] to-[#1F7A52]" },
  { name: "Framer", icon: SiFramer, color: "#0055FF", gradient: "from-[#0055FF] to-[#FF77CC]" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E", gradient: "from-[#F24E1E] to-[#A259FF]" },
  { name: "Git", icon: SiGit, color: "#F05032", gradient: "from-[#F05032] to-[#C93C22]" },
];

const MarqueeSection = () => {
  const [activeLogoIndex, setActiveLogoIndex] = useState<number | null>(null);

  const handlePillClick = (index: number) => {
    setActiveLogoIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="relative w-full py-5 md:py-6 overflow-hidden bg-[#0e0e12] border-b border-white/5 select-none">
      {/* Inline styles for the infinite CSS animation */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } 
        }
        .animate-marquee-scroll {
          animation: marquee-scroll 60s linear infinite;
        }
        @media (hover: hover) and (pointer: fine) {
          .animate-marquee-scroll:hover {
            animation-play-state: paused;
          }
        }
      `,
        }}
      />

      {/* Gradient masks for seamless fading on edges */}
      <div className="absolute inset-y-0 left-0 w-12 md:w-40 bg-gradient-to-r from-[#0e0e12] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-12 md:w-40 bg-gradient-to-l from-[#0e0e12] to-transparent z-10 pointer-events-none" />

      {/* Scroll Track */}
      <div
        className="flex w-max gap-3.5 md:gap-7 animate-marquee-scroll items-center px-4 md:px-8"
        style={{
          animationPlayState: activeLogoIndex !== null ? "paused" : undefined,
        }}
      >
        {[...MARQUEE_LOGOS, ...MARQUEE_LOGOS].map((logo, index) => {
          const Icon = logo.icon;
          const isActive = activeLogoIndex === index;

          return (
            <button
              type="button"
              key={`${logo.name}-${index}`}
              onClick={() => handlePillClick(index)}
              className={`group relative h-11 w-28 md:h-15 md:w-36 shrink-0 flex items-center justify-center rounded-full bg-[#131318] border shadow-sm transition-all duration-500 overflow-hidden cursor-pointer [-webkit-tap-highlight-color:transparent] outline-none ${
                isActive
                  ? "border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                  : "border-white/5 md:hover:border-white/20"
              }`}
            >
              {/* Absolute Gradient Element inside the card */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${logo.gradient} transition-all duration-500 ease-out pointer-events-none ${
                  isActive
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-150 md:group-hover:opacity-100 md:group-hover:scale-100"
                }`}
              />

              {/* Vector Icon */}
              <Icon
                style={{ color: isActive ? "#ffffff" : logo.color }}
                className={`relative z-10 size-[22px] md:size-[30px] transition-all duration-500 pointer-events-none shrink-0 ${
                  isActive ? "text-white scale-110" : "md:group-hover:text-white"
                }`}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
};

const CSSFlutedGlassFallback = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#0c0c10]">
      {/* Aurora Ambient Glows */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 20% 30%, rgba(167, 157, 240, 0.18), transparent 70%),
            radial-gradient(ellipse 50% 60% at 80% 70%, rgba(78, 212, 207, 0.15), transparent 70%),
            radial-gradient(ellipse 40% 40% at 50% 50%, rgba(130, 184, 247, 0.12), transparent 70%)
          `,
        }}
      />

      {/* Fluted Glass Diagonal Lines Texture */}
      <div
        className="absolute inset-0 opacity-35 mix-blend-screen"
        style={{
          backgroundImage: `repeating-linear-gradient(
            125deg,
            rgba(255, 255, 255, 0.06) 0px,
            rgba(255, 255, 255, 0.06) 2px,
            transparent 2px,
            transparent 28px
          )`,
        }}
      />

      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          backgroundPosition: "center center",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />
    </div>
  );
};

const DesktopShaderBackground = ({ isHovered }: { isHovered: boolean }) => {
  const [hasWebGl, setHasWebGl] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      setHasWebGl(!!gl);
    } catch {
      setHasWebGl(false);
    }
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Camada de Fallback CSS com Textura Fluted Glass (sempre ativa como segurança) */}
      <CSSFlutedGlassFallback />

      {/* Camada WebGL Shader (se o navegador suportar WebGL) */}
      {hasWebGl && (
        <div className="absolute inset-0 opacity-100 transition-opacity duration-1000">
          <Shader style={{ width: "100%", height: "100%", display: "block" }}>
            <Swirl colorA="#0a0a0c" colorB="#1a1a24" detail={1.7} />
            <ChromaFlow
              baseColor="#0a0a0c"
              leftColor="#a79df0"
              upColor="#82b8f7"
              rightColor="#4ed4cf"
              downColor="#58e5a6"
              momentum={13}
              radius={isHovered ? 2.4 : 1.6}
            />
            <FlutedGlass
              aberration={0.61}
              angle={31}
              frequency={10}
              highlight={0.25}
              highlightSoftness={0.2}
              lightAngle={-90}
              refraction={4}
              softness={1}
              speed={0.15}
            />
            <FilmGrain strength={0.05} />
          </Shader>
        </div>
      )}
    </div>
  );
};

const MobileHeroBackground = () => {
  return (
    <div className="hero-bg absolute inset-0 overflow-hidden pointer-events-none z-0">
      <CSSFlutedGlassFallback />
      <AntigravityParticleField />
    </div>
  );
};

export function SolucoesHero() {
  const [isHeroHovered, setIsHeroHovered] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(() => {
    if (typeof window !== "undefined") {
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 1024;
      return isTouch || isSmallScreen;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 1024;
      setIsMobileOrTablet(isTouch || isSmallScreen);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <>
      <section
        className={`${
          isMobileOrTablet ? "hero-bg" : "bg-[#0e0e12]"
        } group relative min-h-dvh flex items-center justify-center overflow-hidden border-b border-white/5`}
        onMouseMove={handleMouseMove}
        onPointerEnter={() => setIsHeroHovered(true)}
        onPointerLeave={() => setIsHeroHovered(false)}
        style={
          {
            "--mouse-x": `${mousePos.x}px`,
            "--mouse-y": `${mousePos.y}px`,
          } as React.CSSProperties
        }
      >
        {isMobileOrTablet ? (
          <MobileHeroBackground />
        ) : (
          <DesktopShaderBackground isHovered={isHeroHovered} />
        )}

        <div className="relative z-10 w-full max-w-[90rem] mx-auto px-5 sm:px-6 pt-28 pb-20 lg:py-0 lg:px-12 flex flex-col items-start justify-center min-h-dvh">
          <div className="flex flex-col items-start pt-4 md:pt-16 lg:pt-20 w-full max-w-4xl">
            <ScrollReveal delay={0}>
              <div className="flex items-center gap-4 mb-2">
                <div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan" />
                <span className="font-mono text-[11px] sm:text-xs text-[#b3a1ff] uppercase tracking-[0.25em]">
                  NOSSAS SOLUÇÕES
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h1 className="font-display text-[3.2rem] xs:text-[3.8rem] sm:text-[4.4rem] md:text-[5.2rem] lg:text-[6rem] font-black tracking-tight leading-[0.98] uppercase py-2">
                <span className="block text-white">Opnora</span>
                <span
                  className="inline-block text-transparent bg-clip-text w-fit pt-1 pb-1 mt-0 sm:mt-0.5 drop-shadow-[0_0_35px_rgba(167,157,240,0.45)]"
                  style={{
                    backgroundImage: "linear-gradient(160deg, #a79df0, #82b8f7, #4ed4cf, #58e5a6)",
                  }}
                >
                  SOLUÇÕES.
                </span>
              </h1>
            </ScrollReveal>
          </div>
        </div>
        {/* Scroll Down Indicator */}
        <div className="absolute bottom-3 sm:bottom-5 md:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 md:gap-2 z-10 pointer-events-none">
          <span className="font-mono text-[9px] sm:text-[11px] font-medium uppercase tracking-[0.3em] text-slate-300/90 select-none">
            SCROLL
          </span>
          <div className="w-[1.5px] h-8 md:h-12 relative overflow-hidden">
            <style>{`
              @keyframes scroll-line-flow {
                0% {
                  transform: translateY(-100%);
                  opacity: 0;
                }
                25% {
                  opacity: 1;
                }
                75% {
                  opacity: 1;
                }
                100% {
                  transform: translateY(100%);
                  opacity: 0;
                }
              }
              .animate-scroll-line {
                animation: scroll-line-flow 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
              }
            `}</style>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#a280ff] to-transparent animate-scroll-line" />
          </div>
        </div>
      </section>

      <MarqueeSection />
    </>
  );
}
