import {
  FaAtom,
  FaEye,
  FaBolt,
  FaInfinity,
  FaLink,
  FaSeedling,
} from "react-icons/fa6";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const PRINCIPIOS = [
  {
    icon: FaAtom,
    title: "Curiosidade Primeiro",
    description:
      "Exploramos ideias com curiosidade, mas sempre buscando entender onde a tecnologia pode gerar valor de verdade.",
  },
  {
    icon: FaEye,
    title: "Construir em público",
    description:
      "Compartilhamos nosso processo e o aprendizado obtido na prática. Cada projeto é uma oportunidade de testar, ajustar e evoluir.",
  },
  {
    icon: FaBolt,
    title: "Viés para Ação",
    description:
      "Construímos soluções que resolvem necessidades concretas antes de adicionar complexidade.",
  },
  {
    icon: FaInfinity,
    title: "Sem manuais",
    description:
      "Procuramos caminhos alternativos apostando na melhoria contínua e numa tecnologia simples de entender e usar.",
  },
  {
    icon: FaLink,
    title: "Engenharia encontra arte",
    description:
      "Promovemos a integração fluida entre pessoas, processos e sistemas, unindo usabilidade clara com estrutura sólida.",
  },
  {
    icon: FaSeedling,
    title: "Pensamento de longo prazo",
    description:
      "Priorizamos o aprendizado por meio de protótipos e experimentação, validando caminhos antes de escalar.",
  },
];

export function SobrePrincipios() {
  return (
    <section className="relative min-h-dvh py-24 lg:py-32 border-b border-white/5 bg-[#0e0e12]">
      <div className="relative z-10 mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-12">
        <div className="mb-20">
          <ScrollReveal delay={0} className="flex items-center gap-4 mb-8">
            <div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan" />
            <span className="font-display text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              NOSSOS PRINCÍPIOS
            </span>
          </ScrollReveal>

          <div className="text-center max-w-2xl mx-auto">
            <ScrollReveal
              delay={100}
              as="h2"
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-white leading-[1.1] mb-6"
            >
              O que impulsiona tudo o que construímos
            </ScrollReveal>
            <ScrollReveal
              delay={200}
              as="p"
              className="text-sm sm:text-base text-slate-400 font-light leading-relaxed"
            >
              Não temos uma declaração de missão. Temos princípios operacionais — coisas em que
              realmente acreditamos e agimos.
            </ScrollReveal>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRINCIPIOS.map((p, i) => (
            <ScrollReveal
              key={p.title}
              delay={i < 3 ? 300 + i * 100 : 400 + (i - 3) * 100}
              className="h-full"
            >
              <div className="group bg-[#131318] border border-white/5 rounded-sm p-8 md:p-10 flex flex-col h-full hover:-translate-y-2 hover:bg-[#181820] hover:border-[#b3a1ff]/20 hover:shadow-[0_8px_30px_rgba(179,161,255,0.08)] motion-reduce:transition-none motion-reduce:hover:transform-none transition-all duration-700 ease-out">
                <div className="flex items-center gap-3 mb-4">
                  <p.icon className="shrink-0 h-5 w-5 text-white drop-shadow-[0_0_2px_rgba(255,255,255,0.2)] group-hover:text-[#b3a1ff] transition-colors duration-500" />
                  <h3 className="font-display text-lg font-bold text-white">{p.title}</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mt-auto font-light">
                  {p.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
