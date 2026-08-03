import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from "shaders/react";
import { AntigravityParticleField } from "@/components/site/backgrounds/AntigravityParticleField";

const MARQUEE_LOGOS = [
  {
    name: "React",
    src: "https://cdn.simpleicons.org/react/61DAFB",
    gradient: "from-[#61DAFB] to-[#00B4D8]",
  },
  {
    name: "TypeScript",
    src: "https://cdn.simpleicons.org/typescript/3178C6",
    gradient: "from-[#3178C6] to-[#0052CC]",
  },
  {
    name: "Tailwind",
    src: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
    gradient: "from-[#38B2AC] to-[#0D9488]",
  },
  {
    name: "Vite",
    src: "https://cdn.simpleicons.org/vite/646CFF",
    gradient: "from-[#646CFF] to-[#FFD816]",
  },
  {
    name: "Node.js",
    src: "https://cdn.simpleicons.org/nodedotjs/339933",
    gradient: "from-[#339933] to-[#215732]",
  },
  {
    name: "Framer",
    src: "https://cdn.simpleicons.org/framer/0055FF",
    gradient: "from-[#0055FF] to-[#FF77CC]",
  },
  {
    name: "Prisma",
    src: "https://cdn.simpleicons.org/prisma/white",
    gradient: "from-[#2D3748] to-[#1A202C]",
  },
  {
    name: "Figma",
    src: "https://cdn.simpleicons.org/figma/F24E1E",
    gradient: "from-[#F24E1E] to-[#A259FF]",
  },
];

const MarqueeSection = () => {
  return (
    <section className="relative w-full py-4 md:py-6 overflow-hidden bg-[#0e0e12] border-b border-white/5 select-none">
      {/* Inline styles for the infinite CSS animation */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 1rem)); } 
        }
        .animate-marquee-scroll {
          animation: marquee-scroll 40s linear infinite;
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
      <div className="flex w-max gap-4 md:gap-8 animate-marquee-scroll items-center px-4">
        {[...MARQUEE_LOGOS, ...MARQUEE_LOGOS].map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="group relative h-12 w-28 md:h-20 md:w-44 shrink-0 flex items-center justify-center rounded-full bg-[#131318] border border-white/5 shadow-sm md:hover:border-white/20 transition-all duration-500 overflow-hidden cursor-default md:cursor-pointer [-webkit-tap-highlight-color:transparent]"
          >
            {/* Absolute Gradient Element inside the card */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${logo.gradient} opacity-0 scale-150 md:group-hover:opacity-100 md:group-hover:scale-100 transition-all duration-700 ease-out pointer-events-none`}
            />

            {/* Logo Image */}
            <img
              src={logo.src}
              alt={logo.name}
              className="relative z-10 w-5 h-5 md:w-8 md:h-8 object-contain transition-all duration-500 md:group-hover:brightness-0 md:group-hover:invert pointer-events-none"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

const DesktopShaderBackground = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-[#0c0c10] -z-10" />

      {/* Shaders Stack adaptado para o tema escuro da Opnora - Ativo no Desktop */}
      <div className="absolute inset-0 opacity-100">
        <Shader style={{ width: "100%", height: "100%", display: "block" }}>
          <Swirl colorA="#0a0a0c" colorB="#1a1a24" detail={1.7} />
          <ChromaFlow
            baseColor="#0a0a0c"
            leftColor="#a79df0"
            upColor="#82b8f7"
            rightColor="#4ed4cf"
            downColor="#58e5a6"
            momentum={13}
            radius={isHovered ? 2.4 : 0}
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

      {/* Faint Grid por cima do shader para textura */}
      <div
        className="absolute inset-0 opacity-[0.10]"
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

const MobileHeroBackground = () => {
  return (
    <div className="hero-bg absolute inset-0 overflow-hidden pointer-events-none z-0">
      <AntigravityParticleField />
    </div>
  );
};

export function SolucoesHero() {
  const [isHeroHovered, setIsHeroHovered] = useState(true);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <section
        className="relative min-h-dvh flex items-center justify-center overflow-hidden border-b border-white/5"
        onPointerEnter={() => setIsHeroHovered(true)}
        onPointerLeave={() => setIsHeroHovered(false)}
      >
        <div className="absolute inset-0 bg-[#0e0e12]" />

        {isMobile ? (
          <MobileHeroBackground />
        ) : (
          <DesktopShaderBackground isHovered={isHeroHovered} />
        )}

        <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 pt-36 pb-24 lg:py-0 lg:px-12 flex flex-col items-start justify-center min-h-dvh">
          <div className="flex flex-col items-start pt-10 md:pt-16 lg:pt-20 w-full max-w-4xl">
            <ScrollReveal delay={0}>
              <div className="flex items-center gap-4 mb-1.5">
                <div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan" />
                <span className="font-mono text-[11px] text-[#b3a1ff] uppercase tracking-[0.25em]">
                  NOSSAS SOLUÇÕES
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h1 className="font-display text-[2.1rem] sm:text-[3.0rem] md:text-[4.5rem] lg:text-[6rem] font-black tracking-tight leading-[1.02] uppercase py-2">
                <span className="block text-white">Opnora</span>
                <span
                  className="inline-block text-transparent bg-clip-text w-fit py-4 -my-4"
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


