import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function SobreFoco() {
  return (
    <section className="relative bg-[#0c0c0f] py-24 lg:py-32 border-b border-white/5">
      <div className="relative z-10 mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left Column */}
          <div className="flex flex-col items-start text-left">
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
              <span className="block text-white">
                Nosso foco estratégico
              </span>
              <span
                className="inline-block text-transparent bg-clip-text w-fit"
                style={{
                  backgroundImage: "linear-gradient(160deg, #a79df0, #82b8f7, #4ed4cf, #58e5a6)",
                }}
              >
                para o futuro
              </span>
            </ScrollReveal>

            <ScrollReveal
              delay={200}
              className="mt-8 space-y-6 text-sm sm:text-base text-slate-400 font-light leading-relaxed lg:pr-8"
            >
              <p>
                A Opnora quer crescer a partir de problemas reais, parcerias consistentes e
                projetos que gerem aprendizado prático. A tecnologia é o meio; o impacto de uma
                solução útil é o objetivo.
              </p>
            </ScrollReveal>
          </div>

          {/* Right Column: Priority Tracks */}
          <ScrollReveal delay={300} className="h-full flex items-center lg:justify-end">
            <div className="w-full xl:max-w-[38rem] bg-[#131318] border border-white/5 rounded-sm p-8 md:p-12 hover:-translate-y-2 hover:border-[#b3a1ff]/20 hover:shadow-[0_8px_30px_rgba(179,161,255,0.08)] motion-reduce:transition-none motion-reduce:hover:transform-none transition-all duration-700 ease-out">
              <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-8">
                Trilhas de Prioridade
              </h3>
              <ul className="space-y-4 text-sm sm:text-base text-slate-400 font-light leading-relaxed">
                <ScrollReveal as="li" delay={400}>
                  <div className="group flex items-start gap-3 transition-transform duration-700 ease-out hover:translate-x-2 cursor-default">
                    <span className="text-white/30 text-[10px] mt-1.5 transition-colors duration-500 group-hover:text-[#b3a1ff]">
                      ●
                    </span>
                    <span className="transition-colors duration-500 group-hover:text-white">
                      Desenvolver software sob medida para desafios reais
                    </span>
                  </div>
                </ScrollReveal>
                <ScrollReveal as="li" delay={500}>
                  <div className="group flex items-start gap-3 transition-transform duration-700 ease-out hover:translate-x-2 cursor-default">
                    <span className="text-white/30 text-[10px] mt-1.5 transition-colors duration-500 group-hover:text-[#b3a1ff]">
                      ●
                    </span>
                    <span className="transition-colors duration-500 group-hover:text-white">
                      Criar sistemas claros, úteis e preparados para evoluir
                    </span>
                  </div>
                </ScrollReveal>
                <ScrollReveal as="li" delay={600}>
                  <div className="group flex items-start gap-3 transition-transform duration-700 ease-out hover:translate-x-2 cursor-default">
                    <span className="text-white/30 text-[10px] mt-1.5 transition-colors duration-500 group-hover:text-[#b3a1ff]">
                      ●
                    </span>
                    <span className="transition-colors duration-500 group-hover:text-white">
                      Integrar dados, automação e canais de atendimento quando fizer sentido
                    </span>
                  </div>
                </ScrollReveal>
                <ScrollReveal as="li" delay={700}>
                  <div className="group flex items-start gap-3 transition-transform duration-700 ease-out hover:translate-x-2 cursor-default">
                    <span className="text-white/30 text-[10px] mt-1.5 transition-colors duration-500 group-hover:text-[#b3a1ff]">
                      ●
                    </span>
                    <span className="transition-colors duration-500 group-hover:text-white">
                      Construir protótipos e MVPs para validar novas possibilidades
                    </span>
                  </div>
                </ScrollReveal>
                <ScrollReveal as="li" delay={800}>
                  <div className="group flex items-start gap-3 transition-transform duration-700 ease-out hover:translate-x-2 cursor-default">
                    <span className="text-white/30 text-[10px] mt-1.5 transition-colors duration-500 group-hover:text-[#b3a1ff]">
                      ●
                    </span>
                    <span className="transition-colors duration-500 group-hover:text-white">
                      Aproximar a Opnora de projetos, empresas e parceiros da região
                    </span>
                  </div>
                </ScrollReveal>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
