import { FaCode, FaDiagramProject, FaShieldHalved } from "react-icons/fa6";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const GRID_FEATURES = [
  {
    title: "Arquitetura limpa e escalável",
    desc: "Cada linha de código é pensada para durar. Não usamos templates inflados. Desenvolvemos com as melhores práticas de engenharia de software para que o sistema cresça sem quebrar.",
    icon: FaCode,
  },
  {
    title: "Integração rápida",
    desc: "Soluções que não vivem isoladas. Conectamos nativamente com Stripe, AWS, Google Cloud, gateways de pagamento, CRMs e qualquer API REST ou GraphQL que seu negócio precisar.",
    icon: FaDiagramProject,
  },
  {
    title: "Segurança de ponta a ponta",
    desc: "Autenticação robusta, proteção de rotas, criptografia de dados sensíveis e prevenção contra vulnerabilidades comuns já embarcadas por padrão em todas as entregas.",
    icon: FaShieldHalved,
  },
];

export function SolucoesDna() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#0c0c0f] border-b border-white/5 overflow-hidden">
      <div className="relative z-10 max-w-[85rem] mx-auto px-6 lg:px-12">
        {/* Top Tag */}
        <ScrollReveal className="flex items-center justify-start gap-4 mb-6">
          <div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan" />
          <span className="font-display text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            DNA DA SOLUÇÃO
          </span>
        </ScrollReveal>

        {/* Title Area */}
        <div className="flex flex-col items-center text-center mb-20 lg:mb-24">
          <ScrollReveal
            delay={100}
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-white leading-[1.1] mb-6"
          >
            Autônomo, conectado, <br className="hidden sm:block" />
            experimental
          </ScrollReveal>
          <ScrollReveal
            delay={200}
            as="p"
            className="text-sm sm:text-base text-slate-400 font-light max-w-2xl leading-relaxed"
          >
            Desenvolvemos software não apenas para funcionar hoje, mas para suportar a escala de
            amanhã. Nossa engenharia foca em pilares sólidos.
          </ScrollReveal>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {GRID_FEATURES.map((feat, i) => (
            <ScrollReveal key={i} delay={i * 150} className="h-full">
              <div className="group h-full flex flex-col bg-[#131318] border border-white/5 rounded-sm p-8 sm:p-10 transition-all duration-700 ease-out hover:-translate-y-2 hover:bg-[#181820] hover:border-[#a280ff]/20 hover:shadow-[0_8px_30px_rgba(162,128,255,0.08)] motion-reduce:transition-none motion-reduce:hover:transform-none">
                <div className="mb-8">
                  <feat.icon className="h-[26px] w-[26px] text-white transition-all duration-500 group-hover:text-[#a280ff] group-hover:drop-shadow-[0_0_8px_rgba(162,128,255,0.5)]" />
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-4">
                  {feat.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
