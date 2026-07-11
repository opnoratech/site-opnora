import { Link } from "@tanstack/react-router";
import { FaCheck, FaXmark, FaBolt, FaShieldHalved, FaCode, FaRocket } from "react-icons/fa6";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PLANOS = [
  {
    name: "Start",
    desc: "Ideal para tirar sua ideia do papel e validar no mercado.",
    price: "4.500",
    icon: FaRocket,
    theme: {
      bg: "bg-[#b3a1ff]",
      glow: "bg-[#b3a1ff]/10",
      glowHover: "group-hover:bg-[#b3a1ff]/20",
      borderHover: "hover:border-[#b3a1ff]/20",
      shadowHover: "hover:shadow-[0_8px_30px_rgba(179,161,255,0.08)]",
      iconShadow: "shadow-[0_0_20px_rgba(179,161,255,0.3)]",
    },
    features: [
      "Design de Interface (UI/UX) básico",
      "Desenvolvimento de MVP",
      "1 Revisão de escopo",
      "Hospedagem padrão",
      "Suporte em horário comercial",
    ],
    highlight: false,
    cta: "Começar agora",
  },
  {
    name: "Pro",
    desc: "Para empresas que precisam de escala e performance máxima.",
    price: "9.800",
    icon: FaBolt,
    theme: {
      bg: "bg-[#40c4ff]",
      glow: "bg-[#40c4ff]/10",
      glowHover: "group-hover:bg-[#40c4ff]/20",
      borderHover: "hover:border-[#40c4ff]/20",
      shadowHover: "hover:shadow-[0_8px_30px_rgba(64,196,255,0.08)]",
      iconShadow: "shadow-[0_0_20px_rgba(64,196,255,0.3)]",
    },
    features: [
      "Tudo do Start, plus:",
      "Arquitetura escalável customizada",
      "Integrações complexas (APIs)",
      "Design System completo",
      "Painel administrativo nativo",
      "Monitoramento e DevOps avançado",
    ],
    highlight: true,
    cta: "Falar com consultor",
  },
  {
    name: "Enterprise",
    desc: "Soluções robustas sob demanda para operações complexas.",
    price: "Sob consulta",
    icon: FaShieldHalved,
    theme: {
      bg: "bg-[#58e5a6]",
      glow: "bg-[#58e5a6]/10",
      glowHover: "group-hover:bg-[#58e5a6]/20",
      borderHover: "hover:border-[#58e5a6]/20",
      shadowHover: "hover:shadow-[0_8px_30px_rgba(88,229,166,0.08)]",
      iconShadow: "shadow-[0_0_20px_rgba(88,229,166,0.3)]",
    },
    features: [
      "Squad de engenharia dedicado",
      "SLA garantido",
      "Consultoria de segurança avançada",
      "Infraestrutura dedicada (AWS/GCP)",
      "Treinamento do time interno",
    ],
    highlight: false,
    cta: "Agendar reunião",
  },
];

const COMPARISON = [
  {
    feature: "Desenvolvimento de Interface",
    start: "Básico",
    pro: "Avançado",
    enterprise: "Personalizado",
  },
  {
    feature: "Integração de APIs",
    start: false,
    pro: true,
    enterprise: true,
  },
  {
    feature: "Painel Admin (CMS)",
    start: false,
    pro: true,
    enterprise: true,
  },
  {
    feature: "Monitoramento 24/7",
    start: false,
    pro: "Básico",
    enterprise: "Avançado",
  },
  {
    feature: "Suporte Técnico",
    start: "Comercial",
    pro: "Prioritário",
    enterprise: "Dedicado (24/7)",
  },
];

const BENEFITS = [
  {
    icon: FaBolt,
    title: "Alta Performance",
    desc: "Nossos sistemas carregam rápido e entregam uma experiência fluida, fundamental para reter clientes e melhorar SEO.",
  },
  {
    icon: FaShieldHalved,
    title: "Segurança Padrão Banco",
    desc: "Todos os dados são criptografados. Prevenimos vulnerabilidades para garantir que a sua operação e os dados dos usuários estejam seguros.",
  },
  {
    icon: FaCode,
    title: "Código Escalável",
    desc: "Desenvolvemos de olho no futuro. Seu software não vai precisar ser refeito do zero quando a sua empresa triplicar de tamanho.",
  },
  {
    icon: FaRocket,
    title: "Entrega Ágil",
    desc: "Sem enrolação. Processo transparente com entregas contínuas para você acompanhar a evolução do projeto em tempo real.",
  },
];

export function PrecosPlanos() {
  return (
    <>
      {/* 2. PLANOS DETALHADOS */}
      <section className="relative w-full bg-[#050507] py-24 border-b border-white/5">
        <div className="relative mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-12 z-10">
          {/* Header */}
          <div className="mb-16">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan" />
                <span className="font-mono text-[10px] sm:text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                  PLANOS DE ENGENHARIA
                </span>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={100}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-white mb-6">
                O modelo certo para o seu{" "}
                <span
                  className="text-transparent bg-clip-text inline-block pb-2"
                  style={{
                    backgroundImage: "linear-gradient(160deg, #a79df0, #82b8f7, #4ed4cf, #58e5a6)",
                  }}
                >
                  momento de escala.
                </span>
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={200}>
              <p className="max-w-3xl text-sm sm:text-base text-slate-400 font-light leading-relaxed">
                Nossos planos são desenhados para entregar engenharia de alto nível, desde a concepção do produto até a tração em larga escala. Escolha o que melhor se adapta à sua operação.
              </p>
            </ScrollReveal>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-24 w-full">
            {PLANOS.map((plano, idx) => (
              <ScrollReveal
                key={plano.name}
                delay={100 + idx * 100}
                className={`group relative flex flex-col h-full rounded-sm p-8 md:p-10 transition-all duration-700 ease-out hover:-translate-y-2 hover:bg-[#131318] ${plano.theme.borderHover} ${plano.theme.shadowHover} overflow-hidden ${
                  plano.highlight
                    ? "bg-[#181820] border border-[#40c4ff]/30 shadow-[0_8px_30px_rgba(64,196,255,0.08)] transform md:-translate-y-2"
                    : "bg-[#0e0e12] border border-white/5"
                }`}
              >
                {/* Glow no topo direito */}
                <div className={`absolute -top-16 -right-16 w-56 h-56 ${plano.theme.glow} blur-[50px] rounded-full pointer-events-none transition-opacity duration-700 group-hover:opacity-100 ${plano.theme.glowHover}`} />

                {plano.highlight && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <span className="bg-[#40c4ff]/10 text-[#40c4ff] border border-[#40c4ff]/20 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg backdrop-blur-sm">
                      Recomendado
                    </span>
                  </div>
                )}

                {/* Ícone */}
                <div className={`mb-8 relative z-10 w-14 h-14 rounded-xl ${plano.theme.bg} flex items-center justify-center ${plano.theme.iconShadow}`}>
                  <plano.icon
                    className="size-7 text-black transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-6"
                  />
                </div>

                <h3 className="font-display text-2xl font-bold text-white mb-2 relative z-10">{plano.name}</h3>
                <p className="text-sm text-slate-400 mb-6 min-h-[40px] relative z-10">{plano.desc}</p>

                <div className="mb-8 relative z-10">
                  {plano.price === "Sob consulta" ? (
                    <div className="text-3xl font-display font-bold text-white">Sob consulta</div>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg text-slate-400 font-medium">A partir de R$</span>
                      <span className="text-4xl font-display font-bold text-white">
                        {plano.price}
                      </span>
                    </div>
                  )}
                </div>

                <Link
                  to="/contato"
                  className={`relative z-10 block text-center w-full py-3 px-4 rounded-full text-sm font-medium transition-all mb-8 ${
                    plano.highlight
                      ? "bg-white text-black hover:bg-slate-200"
                      : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {plano.cta}
                </Link>

                <div className="flex-1 relative z-10">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
                    O que está incluso
                  </p>
                  <ul className="space-y-4">
                    {plano.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-slate-300 font-light">
                        <div className={`w-4 h-4 rounded-full ${plano.theme.bg} flex items-center justify-center shrink-0`}>
                          <FaCheck className="size-3 text-black" />
                        </div>
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="relative py-24 border-t border-white/5">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#38bdf8]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 z-10">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Compare os planos
            </h2>
            <p className="text-slate-400">
              Veja em detalhes qual opção atende melhor a sua necessidade.
            </p>
          </ScrollReveal>

          <ScrollReveal className="overflow-x-auto">
            <div className="min-w-[700px] rounded-2xl border border-white/5 bg-[#0a0a0c] overflow-hidden">
              <Table>
                <TableHeader className="bg-white/[0.02]">
                  <TableRow className="border-white/5 hover:bg-transparent">
                    <TableHead className="w-[40%] text-white font-bold h-14 px-6">
                      Funcionalidades
                    </TableHead>
                    <TableHead className="text-center font-bold text-white h-14">Start</TableHead>
                    <TableHead className="text-center font-bold text-[#a280ff] h-14 relative">
                      Pro
                    </TableHead>
                    <TableHead className="text-center font-bold text-white h-14">
                      Enterprise
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {COMPARISON.map((row, idx) => (
                    <TableRow
                      key={idx}
                      className="border-white/5 hover:bg-white/[0.02] transition-colors"
                    >
                      <TableCell className="font-medium text-slate-300 px-6 py-4">
                        {row.feature}
                      </TableCell>

                      <TableCell className="text-center py-4">
                        {typeof row.start === "boolean" ? (
                          row.start ? (
                            <FaCheck className="w-5 h-5 text-emerald-400 mx-auto" />
                          ) : (
                            <FaXmark className="w-5 h-5 text-slate-600 mx-auto" />
                          )
                        ) : (
                          <span className="text-sm text-slate-400">{row.start}</span>
                        )}
                      </TableCell>

                      <TableCell className="text-center py-4 bg-[#a280ff]/[0.02]">
                        {typeof row.pro === "boolean" ? (
                          row.pro ? (
                            <FaCheck className="w-5 h-5 text-[#a280ff] mx-auto" />
                          ) : (
                            <FaXmark className="w-5 h-5 text-slate-600 mx-auto" />
                          )
                        ) : (
                          <span className="text-sm font-medium text-[#a280ff]">{row.pro}</span>
                        )}
                      </TableCell>

                      <TableCell className="text-center py-4">
                        {typeof row.enterprise === "boolean" ? (
                          row.enterprise ? (
                            <FaCheck className="w-5 h-5 text-emerald-400 mx-auto" />
                          ) : (
                            <FaXmark className="w-5 h-5 text-slate-600 mx-auto" />
                          )
                        ) : (
                          <span className="text-sm text-slate-400">{row.enterprise}</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 border-t border-white/5 bg-[#030304]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Planos que dão retorno para o seu negócio
            </h2>
            <p className="text-slate-400">
              Na Opnora, engenharia de software é investimento, não despesa.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {BENEFITS.map((benefit, idx) => (
              <ScrollReveal
                key={idx}
                delay={idx * 100}
                className="group p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-[#a280ff]/10 text-[#a280ff] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{benefit.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
