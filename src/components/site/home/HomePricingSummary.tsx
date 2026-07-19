import React from "react";
import { Link } from "@tanstack/react-router";
import { FaRocket, FaBolt, FaCode, FaFileCode, FaArrowRight } from "react-icons/fa6";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const PLANOS_RESUMO = [
  {
    name: "Landing Page",
    badge: "CONVERSÃO",
    desc: "Para divulgar um serviço, captar contatos ou validar uma ideia com uma página focada em conversão.",
    icon: FaFileCode,
    color: "#b3a1ff",
  },
  {
    name: "Essencial",
    badge: "INSTITUCIONAL",
    desc: "Site institucional para apresentar sua empresa, seus serviços e canais de contato com profissionalismo.",
    icon: FaRocket,
    color: "#8b5cf6",
  },
  {
    name: "Profissional",
    badge: "RECOMENDADO",
    desc: "Estrutura digital mais completa, com páginas avançadas, integrações, métricas e possibilidade de evolução.",
    icon: FaBolt,
    color: "#40c4ff",
  },
  {
    name: "Sob medida",
    badge: "SISTEMAS",
    desc: "Arquitetura e design construídos do zero para resolver os desafios únicos da sua operação. Uma solução exclusiva e escalável.",
    icon: FaCode,
    color: "#58e5a6",
  },
];

type HomePricingSummaryProps = {
  eyebrow?: string;
  bgClass?: string;
};

export function HomePricingSummary({
  eyebrow = "03 / PREÇOS — INVESTIMENTO & MODALIDADES",
  bgClass = "bg-[#0c0c0f]",
}: HomePricingSummaryProps = {}) {
  return (
    <section
      className={`relative w-full overflow-hidden ${bgClass} border-t border-white/5 py-24 sm:py-32`}
    >
      <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <ScrollReveal delay={0} className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan"></div>
            <span className="font-mono text-[10px] sm:text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em]">
              {eyebrow}
            </span>
            <div className="h-[2px] w-8 bg-gradient-to-l from-aurora-violet to-aurora-cyan"></div>
          </ScrollReveal>

          <ScrollReveal
            as="h2"
            delay={100}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-[1.15] mb-4 tracking-tight text-center max-w-4xl text-white"
          >
            Modalidades para cada etapa da sua empresa.
          </ScrollReveal>

          <ScrollReveal
            as="p"
            delay={200}
            className="max-w-2xl text-sm sm:text-base text-slate-400 font-light leading-relaxed text-center"
          >
            Conheça as modalidades de projetos que oferecemos. Valores e escopos transparentes, sem
            surpresas no meio do caminho.
          </ScrollReveal>
        </div>

        {/* Grade de 4 Planos Resumidos - Todos Padronizados sem preços */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {PLANOS_RESUMO.map((plano, idx) => {
            const Icon = plano.icon;
            return (
              <ScrollReveal key={plano.name} delay={idx * 100} className="h-full">
                <div className="group relative flex flex-col h-full rounded-2xl p-6 sm:p-7 bg-[#111116] border border-white/10 hover:border-white/20 hover:bg-[#14141c] transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ color: plano.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-sm bg-white/5 text-slate-300 border border-white/10">
                      {plano.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white mb-2.5">
                    {plano.name}
                  </h3>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">
                    {plano.desc}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Botão de Ação Único Centralizado */}
        <div className="mt-12 flex justify-center">
          <Link
            to="/precos"
            hash="planos"
            className="group cursor-pointer inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-mono text-[11px] font-bold uppercase tracking-[0.15em] bg-white text-black hover:bg-slate-200 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:-translate-y-0.5"
          >
            <span>CONHECER PLANOS E PREÇOS</span>
            <FaArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
