import { useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from "shaders/react";

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
    <section className="relative w-full py-6 overflow-hidden bg-[#0e0e12] border-b border-white/5">
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
        .animate-marquee-scroll:hover {
          animation-play-state: paused;
        }
      `,
        }}
      />

      {/* Gradient masks for seamless fading on edges */}
      <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#0e0e12] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#0e0e12] to-transparent z-10 pointer-events-none" />

      {/* Scroll Track */}
      <div className="flex w-max gap-8 animate-marquee-scroll items-center px-4">
        {[...MARQUEE_LOGOS, ...MARQUEE_LOGOS].map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="group relative h-20 w-44 shrink-0 flex items-center justify-center rounded-full bg-[#131318] border border-white/5 shadow-sm hover:border-white/20 transition-all duration-500 overflow-hidden cursor-pointer"
          >
            {/* Absolute Gradient Element inside the card */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${logo.gradient} opacity-0 scale-150 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 ease-out`}
            />

            {/* Logo Image */}
            <img
              src={logo.src}
              alt={logo.name}
              className="relative z-10 w-8 h-8 object-contain transition-all duration-500 group-hover:brightness-0 group-hover:invert"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

const ShaderBackground = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Shaders Stack adapted to Opnora's dark theme */}
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

      {/* Faint Grid on top of the shader for extra texture */}
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

export function SolucoesHero() {
  const [isHeroHovered, setIsHeroHovered] = useState(true);

  return (
    <>
      <section
        className="relative min-h-dvh flex items-center justify-center overflow-hidden border-b border-white/5 py-20 lg:py-0"
        onPointerEnter={() => setIsHeroHovered(true)}
        onPointerLeave={() => setIsHeroHovered(false)}
      >
        <div className="absolute inset-0 bg-[#0e0e12]" />

        <ShaderBackground isHovered={isHeroHovered} />

        <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 lg:px-12 flex flex-col items-start justify-center pt-24 lg:pt-0">
          <div className="flex flex-col items-start lg:py-0 w-full max-w-4xl">
            <ScrollReveal delay={0}>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan" />
                <span className="font-mono text-xs text-[#b3a1ff] uppercase tracking-[0.25em]">
                  NOSSAS SOLUÇÕES
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h1 className="font-display text-[1.8rem] sm:text-[2.8rem] md:text-[3.8rem] lg:text-[4.7rem] font-black tracking-tighter leading-[0.9] uppercase mb-6">
                <span className="block text-white">
                  Opnora
                </span>
                <span
                  className="inline-block text-transparent bg-clip-text w-fit pb-2 leading-[1.15]"
                  style={{
                    backgroundImage: "linear-gradient(160deg, #a79df0, #82b8f7, #4ed4cf, #58e5a6)",
                  }}
                >
                  SOLUÇÕES.
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal
              delay={200}
              as="p"
              className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-xl mb-12"
            >
              Software sob medida, inteligência artificial e visão de negócio. Nossas três frentes — Build, Intelligence e Labs — trabalham juntas para criar soluções que ajudam empresas a evoluir.
            </ScrollReveal>
          </div>
        </div>
      </section>

      <MarqueeSection />
    </>
  );
}
