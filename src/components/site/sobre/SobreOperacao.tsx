import { FaBullseye, FaFlaskVial, FaRocket } from "react-icons/fa6";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

function ProcessCard({
  title,
  desc,
  icon: Icon,
  delay,
}: {
  title: string;
  desc: string;
  icon: any;
  delay: number;
}) {
  return (
    <ScrollReveal delay={delay} className="h-full">
      <div className="group relative flex h-full flex-col bg-[#131318] hover:bg-[#181820] border border-white/5 p-8 rounded-sm overflow-hidden hover:-translate-y-2 hover:border-[#b3a1ff]/20 hover:shadow-[0_8px_30px_rgba(179,161,255,0.08)] motion-reduce:transition-none motion-reduce:hover:transform-none transition-all duration-700 ease-out">
        <div className="relative z-10 flex flex-col h-full pointer-events-none">
          <ScrollReveal
            delay={delay + 100}
            className="mb-6 h-12 w-12 rounded-full bg-[#0e0e12] border border-white/5 flex items-center justify-center transition-all duration-700 ease-out group-hover:border-white/15"
          >
            <Icon className="w-5 h-5 text-slate-400 drop-shadow-[0_0_2px_rgba(255,255,255,0.1)] transition-all duration-500 ease group-hover:text-[#b3a1ff] group-hover:drop-shadow-[0_0_6px_rgba(179,161,255,0.3)]" />
          </ScrollReveal>
          <ScrollReveal
            delay={delay + 200}
            as="h3"
            className="font-display text-lg sm:text-xl font-bold text-white mb-4 transition-colors duration-500 ease group-hover:text-[#b3a1ff]"
          >
            {title}
          </ScrollReveal>
          <ScrollReveal
            delay={delay + 300}
            as="p"
            className="text-sm text-slate-400 font-light leading-relaxed"
          >
            {desc}
          </ScrollReveal>
        </div>
      </div>
    </ScrollReveal>
  );
}

export function SobreOperacao() {
  return (
    <section className="relative bg-[#0e0e12] py-24 lg:py-32 border-b border-white/5 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col items-start text-left mb-16">
          <ScrollReveal delay={0} className="flex items-center gap-4 mb-8">
            <div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan" />
            <span className="font-display text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              COMO OPERAMOS
            </span>
          </ScrollReveal>

          <ScrollReveal
            as="h2"
            delay={100}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-white leading-[1.1]"
          >
            Da ideia à execução
          </ScrollReveal>

          <ScrollReveal
            delay={200}
            className="mt-8 text-sm sm:text-base text-slate-400 font-light leading-relaxed max-w-2xl"
          >
            Cada projeto começa com uma necessidade e evolui por etapas claras, da
            compreensão do problema à melhoria contínua da solução.
          </ScrollReveal>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-16">
          <ProcessCard
            delay={300}
            icon={FaBullseye}
            title="1. Definição"
            desc="Investigamos o contexto, identificamos necessidades reais e definimos o que precisa ser resolvido antes de decidir como construir."
          />
          <ProcessCard
            delay={420}
            icon={FaFlaskVial}
            title="2. Experimentação"
            desc="Criamos protótipos, testamos caminhos e organizamos uma solução técnica que seja funcional, compreensível e viável."
          />
          <ProcessCard
            delay={540}
            icon={FaRocket}
            title="3. Lançamento"
            desc="Colocamos a solução em uso, acompanhamos os aprendizados e ajustamos o que for necessário para que ela continue evoluindo."
          />
        </div>
      </div>
    </section>
  );
}
