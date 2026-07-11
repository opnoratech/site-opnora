import { FaUser } from "react-icons/fa6";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const EQUIPE = [
  {
    nome: "Nicolas Harnisch",
    cargo: "Fundador e CEO",
    icon: FaUser,
    color: "#a280ff",
    desc: "Atua na construção de interfaces, sistemas e soluções digitais, com foco em transformar ideias em experiências claras e funcionais.",
  },
  {
    nome: "Aariano",
    cargo: "Fundador",
    icon: FaUser,
    color: "#40c4ff",
    desc: "Contribui com pesquisa, organização de produto, desenvolvimento e evolução de soluções em construção.",
  },
  {
    nome: "Prithvi",
    cargo: "Cofundador",
    icon: FaUser,
    color: "#69f0ae",
    desc: "Participa da experimentação técnica, prototipação e desenvolvimento de caminhos para novas possibilidades digitais.",
  },
];

export function SobreEquipe() {
  return (
    <section className="relative min-h-dvh flex flex-col justify-center py-24 lg:py-32 border-b border-white/5 bg-[#0e0e12]">
      <div className="relative z-10 mx-auto w-full max-w-[90rem] px-4 sm:px-6 lg:px-12">
        <div className="mb-20">
          <ScrollReveal className="flex items-center gap-4 mb-8">
            <div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan" />
            <span className="font-display text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              NOSSA EQUIPE
            </span>
          </ScrollReveal>

          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-white leading-[1.1] mb-6">
              As pessoas por trás da
              <br />
              Opnora
            </h2>
            <div className="space-y-2 text-slate-400 font-light text-sm sm:text-base leading-relaxed">
              <p>Uma equipe pequena e focada de construtores, pensadores e fabricantes.</p>
              <p>Cada um de nós aderiu porque queríamos trabalhar em coisas que importam.</p>
            </div>
          </ScrollReveal>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-[75rem] mx-auto">
          {EQUIPE.map((membro, i) => (
            <ScrollReveal
              key={membro.nome}
              delay={300 + i * 120}
              className="h-full"
            >
              <div className="group relative flex h-full w-full flex-col items-center text-center bg-[#131318] border border-white/5 rounded-sm p-8 md:p-10 hover:-translate-y-2 hover:bg-[#181820] hover:border-[#b3a1ff]/20 hover:shadow-[0_8px_30px_rgba(179,161,255,0.08)] motion-reduce:transition-none motion-reduce:hover:transform-none overflow-hidden transition-all duration-700 ease-out">
                {/* Ícone (Avatar placeholder) */}
                <ScrollReveal
                  delay={400 + i * 120}
                  className="relative z-10 w-24 h-24 rounded-full flex items-center justify-center mb-8 border border-white/10 bg-[#0e0e12] transition-colors duration-500 group-hover:border-[#a280ff]/30"
                >
                  <membro.icon
                    className="w-10 h-10 transition-all duration-500 group-hover:scale-110 drop-shadow-[0_0_2px_rgba(255,255,255,0.1)]"
                    style={{ color: membro.color }}
                  />
                </ScrollReveal>

                <h3 className="font-display text-xl font-bold text-white mb-2 relative z-10">
                  {membro.nome}
                </h3>

                <p
                  className="font-mono text-[13px] mb-4 relative z-10"
                  style={{ color: membro.color }}
                >
                  {membro.cargo}
                </p>

                <p className="text-sm text-slate-400 font-light leading-relaxed relative z-10">
                  {membro.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
