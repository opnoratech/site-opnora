import { useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function SobreFoco() {
  const [selectedTrack, setSelectedTrack] = useState<number | null>(null);

  const tracks = [
    "Software sob medida",
    "Automação e Inteligência Artificial",
    "Protótipos e MVPs",
    "Integração de sistemas e APIs",
    "Produtos digitais escaláveis",
    "Parcerias de inovação",
  ];

  return (
    <section className="relative bg-[#0c0c0f] py-24 lg:py-32 border-b border-white/5">
      <div className="relative z-10 mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column */}
          <div className="flex flex-col items-start text-left lg:col-span-6">
            <ScrollReveal delay={0} className="flex items-center gap-4 mb-8">
              <div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan" />
              <span className="font-display text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                FOCO ATUAL
              </span>
            </ScrollReveal>

            <ScrollReveal
              as="h2"
              delay={100}
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight leading-[1.1]"
            >
              <span className="block text-white">Construindo as bases</span>
              <span
                className="inline-block text-transparent bg-clip-text w-fit"
                style={{
                  backgroundImage: "linear-gradient(160deg, #a79df0, #82b8f7, #4ed4cf, #58e5a6)",
                }}
              >
                do futuro
              </span>
            </ScrollReveal>

            <ScrollReveal
              delay={200}
              className="mt-6 space-y-4 text-sm sm:text-base text-slate-400 font-light leading-relaxed max-w-[38rem]"
            >
              <p>
                Na fase atual, focamos em validar ideias com rapidez, desenvolver arquiteturas
                sólidas e resolver problemas reais de ponta a ponta.
              </p>
              <p>
                Nosso objetivo não é apenas entregar código, mas criar ecossistemas digitais
                inteligentes e escaláveis que geram valor contínuo.
              </p>
            </ScrollReveal>
          </div>

          {/* Right Column: Priority Tracks */}
          <ScrollReveal
            delay={300}
            className="h-full flex items-center lg:col-span-6 lg:justify-start lg:pl-4"
          >
            <div className="w-full lg:max-w-[36rem] bg-[#131318] border border-white/5 rounded-sm p-7 md:p-9 hover:-translate-y-2 hover:border-aurora-violet/20 hover:shadow-[0_8px_30px_rgba(162,128,255,0.08)] motion-reduce:transition-none motion-reduce:hover:transform-none transition-all duration-700 ease-out">
              <h3 className="font-display text-base sm:text-lg font-bold text-white mb-5">
                Trilhas prioritárias
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-400 font-light leading-relaxed select-none">
                {tracks.map((track, index) => {
                  const isSelected = selectedTrack === index;
                  return (
                    <ScrollReveal key={index} as="li" delay={150 + index * 50}>
                      <div
                        onClick={() => setSelectedTrack(isSelected ? null : index)}
                        className={`group flex items-center gap-3 transition-transform duration-500 ease-out cursor-pointer ${
                          isSelected ? "translate-x-2" : "hover:translate-x-2"
                        }`}
                      >
                        <span
                          className={`text-[10px] transition-colors duration-500 ${
                            isSelected
                              ? "text-aurora-violet"
                              : "text-white/30 group-hover:text-aurora-violet"
                          }`}
                        >
                          ●
                        </span>
                        <span
                          className={`transition-colors duration-500 ${
                            isSelected
                              ? "text-aurora-violet font-normal"
                              : "group-hover:text-aurora-violet"
                          }`}
                        >
                          {track}
                        </span>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
