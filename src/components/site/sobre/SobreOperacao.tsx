import { useState } from "react";
import { FaBullseye, FaFlaskVial, FaRocket } from "react-icons/fa6";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

function ProcessCard({
  title,
  desc,
  icon: Icon,
  delay,
  isSelected,
  onClick,
}: {
  title: string;
  desc: string;
  icon: React.ElementType;
  delay: number;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <ScrollReveal delay={delay} className="h-full">
      <div
        onClick={onClick}
        className={`group relative flex h-full flex-col p-8 rounded-sm overflow-hidden transition-all duration-500 ease-out cursor-pointer select-none border ${
          isSelected
            ? "bg-[#181820] border-[#b3a1ff]/40 shadow-[0_8px_30px_rgba(179,161,255,0.15)] -translate-y-1"
            : "bg-[#131318] border-white/5 hover:bg-[#181820] hover:-translate-y-2 hover:border-[#b3a1ff]/20 hover:shadow-[0_8px_30px_rgba(179,161,255,0.08)]"
        }`}
      >
        <div className="relative z-10 flex flex-col h-full">
          <div
            className={`mb-6 h-12 w-12 rounded-full border flex items-center justify-center transition-all duration-500 ease-out ${
              isSelected
                ? "bg-[#181820] border-[#b3a1ff]/40"
                : "bg-[#0e0e12] border-white/5 group-hover:border-white/15"
            }`}
          >
            <Icon
              className={`w-5 h-5 transition-all duration-500 ease ${
                isSelected
                  ? "text-[#b3a1ff] drop-shadow-[0_0_8px_rgba(179,161,255,0.5)]"
                  : "text-slate-400 drop-shadow-[0_0_2px_rgba(255,255,255,0.1)] group-hover:text-[#b3a1ff] group-hover:drop-shadow-[0_0_6px_rgba(179,161,255,0.3)]"
              }`}
            />
          </div>
          <h3
            className={`font-display text-lg sm:text-xl font-bold mb-4 transition-colors duration-500 ease ${
              isSelected ? "text-[#b3a1ff]" : "text-white group-hover:text-[#b3a1ff]"
            }`}
          >
            {title}
          </h3>
          <p className="text-sm text-slate-400 font-light leading-relaxed">{desc}</p>
        </div>
      </div>
    </ScrollReveal>
  );
}

export function SobreOperacao() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const cards = [
    {
      icon: FaBullseye,
      title: "1. Definição",
      desc: "Investigamos o contexto, identificamos necessidades reais e definimos o que precisa ser resolvido antes de decidir como construir.",
    },
    {
      icon: FaFlaskVial,
      title: "2. Experimentação",
      desc: "Criamos protótipos, testamos caminhos e organizamos uma solução técnica que seja funcional, compreensível e viável.",
    },
    {
      icon: FaRocket,
      title: "3. Lançamento",
      desc: "Colocamos a solução em uso, acompanhamos os aprendizados e ajustamos o que for necessário para que ela continue evoluindo.",
    },
  ];

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
            delay={150}
            className="mt-8 text-sm sm:text-base text-slate-400 font-light leading-relaxed max-w-2xl"
          >
            Cada projeto começa com uma necessidade e evolui por etapas claras, da compreensão do
            problema à melhoria contínua da solução.
          </ScrollReveal>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-16">
          {cards.map((card, index) => (
            <ProcessCard
              key={index}
              delay={(index + 1) * 100}
              icon={card.icon}
              title={card.title}
              desc={card.desc}
              isSelected={selectedCard === index}
              onClick={() => setSelectedCard(selectedCard === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
