import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { FaBullhorn, FaWrench, FaRobot, FaChartLine, FaCheck, FaWhatsapp } from "react-icons/fa6";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CONTACT } from "@/config/site";

interface AdicionalItem {
  name: string;
  price: string;
  desc: string;
  idealPara: string;
  idealParaShort: string;
  badge: string;
  levels?: { name: string; price: string }[];
  features: string[];
  note?: string | null;
  icon: React.ComponentType<{ className?: string }>;
  cta: string;
  ctaSearch: { plano: string };
  theme: {
    bg: string;
    bgSolid: string;
    border: string;
    text: string;
    glow: string;
    iconShadow: string;
  };
}

const ADICIONAIS: AdicionalItem[] = [
  {
    name: "Tráfego pago",
    price: "A partir de R$ 250/mês",
    desc: "Estrutura inicial e gestão contínua de campanhas pagas para empresas que desejam gerar mais oportunidades rápidas e previsibilidade.",
    idealPara:
      "Empresas que querem atrair mais contatos, validar campanhas e criar previsibilidade comercial.",
    idealParaShort: "Gerar leads e previsibilidade",
    badge: "Crescimento",
    levels: [
      { name: "Setup inicial", price: "R$ 350/mês" },
      { name: "Gestão & Escala", price: "R$ 700/mês" },
    ],
    icon: FaBullhorn,
    features: [
      "Meta Ads (Instagram/Facebook)",
      "Google Ads (Pesquisa/Rede)",
      "Pixel e eventos de conversão",
      "Rastreamento de leads inicial",
      "Relatórios de performance",
      "Otimização contínua de anúncios",
    ],
    note: "Verba de anúncios não inclusa.",
    cta: "Solicitar serviço",
    ctaSearch: { plano: "trafego" },
    theme: {
      bg: "bg-[#b3a1ff]/10",
      bgSolid: "bg-[#b3a1ff]",
      border: "border-[#b3a1ff]/20",
      text: "text-[#b3a1ff]",
      glow: "bg-[#b3a1ff]/10",
      iconShadow: "shadow-[0_0_20px_rgba(179,161,255,0.3)]",
    },
  },
  {
    name: "Manutenção mensal",
    price: "R$ 150/mês",
    desc: "Acompanhamento técnico recorrente para manter site, landing page ou sistema funcionando com alta segurança, velocidade e estabilidade.",
    idealPara: "Empresas que querem suporte recorrente, atualizações e pequenas melhorias mensais.",
    idealParaShort: "Segurança e estabilidade",
    badge: "Suporte",
    icon: FaWrench,
    features: [
      "Atualizações de segurança leves",
      "Ajustes de layout pontuais",
      "Correções de bugs simples",
      "Suporte técnico por WhatsApp",
      "Pequenas melhorias de conteúdo",
    ],
    note: null,
    cta: "Solicitar serviço",
    ctaSearch: { plano: "manutencao" },
    theme: {
      bg: "bg-[#8b5cf6]/10",
      bgSolid: "bg-[#8b5cf6]",
      border: "border-[#8b5cf6]/20",
      text: "text-[#8b5cf6]",
      glow: "bg-[#8b5cf6]/10",
      iconShadow: "shadow-[0_0_20px_rgba(139,92,246,0.35)]",
    },
  },
  {
    name: "Automação com IA",
    price: "A partir de R$ 200/mês",
    desc: "Fluxos inteligentes, bots para WhatsApp e integração de sistemas para reduzir tarefas repetitivas e acelerar suas conversões.",
    idealPara:
      "Empresas que querem automatizar atendimento, organizar informações e integrar ferramentas.",
    idealParaShort: "Atendimento inteligente",
    badge: "Evolução",
    levels: [
      { name: "Fluxo básico", price: "R$ 300/mês" },
      { name: "IA Avançada", price: "R$ 600/mês" },
    ],
    icon: FaRobot,
    features: [
      "Automação e fluxos de WhatsApp",
      "Triagem inteligente de mensagens",
      "Integração do site com formulários",
      "Organização de leads em planilhas/CRM",
      "Fluxos com IA aplicada",
      "Automação de processos manuais",
    ],
    note: null,
    cta: "Solicitar serviço",
    ctaSearch: { plano: "automacao" },
    theme: {
      bg: "bg-[#b3a1ff]/10",
      bgSolid: "bg-[#b3a1ff]",
      border: "border-[#b3a1ff]/20",
      text: "text-[#b3a1ff]",
      glow: "bg-[#b3a1ff]/10",
      iconShadow: "shadow-[0_0_20px_rgba(179,161,255,0.3)]",
    },
  },
  {
    name: "Dashboard & Métricas",
    price: "A partir de R$ 200/mês",
    desc: "Painéis e indicadores estratégicos (KPIs) sob medida para acompanhar conversões de campanhas, funil de vendas e a operação.",
    idealPara: "Visualizar métricas reais e tomar decisões baseadas em dados",
    idealParaShort: "Decisões orientadas a dados",
    badge: "Métricas",
    levels: [
      { name: "Painel simples", price: "R$ 200/mês" },
      { name: "Painel avançado", price: "R$ 400/mês" },
    ],
    features: [
      "Centralização de dados do negócio",
      "Indicadores de vendas e leads em tempo real",
      "Visualização clara e intuitiva",
      "Integração com GA4, CRM e Ads",
      "Acompanhamento de ROI e metas",
    ],
    note: null,
    icon: FaChartLine,
    cta: "Solicitar serviço",
    ctaSearch: { plano: "dashboard" },
    theme: {
      bg: "bg-[#58e5a6]/10",
      bgSolid: "bg-[#58e5a6]",
      border: "border-[#58e5a6]/20",
      text: "text-[#58e5a6]",
      glow: "bg-[#58e5a6]/10",
      iconShadow: "shadow-[0_0_20px_rgba(88,229,166,0.3)]",
    },
  },
];

function AdicionalCard({ item, index }: { item: AdicionalItem; index: number }) {
  const [selectedLevelIdx, setSelectedLevelIdx] = useState<number>(0);
  const selectedLvl = item.levels ? item.levels[selectedLevelIdx] : null;

  return (
    <ScrollReveal delay={100 * (index + 1)} className="flex">
      <div className="group relative w-full h-full flex flex-col rounded-lg bg-[#121218] border border-white/10 p-6 sm:p-7 transition-all duration-500 overflow-hidden hover:border-white/15 hover:shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
        {/* Glow de fundo */}
        <div
          className={`absolute -top-20 -right-20 w-48 h-48 rounded-full blur-[60px] pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100 ${item.theme.glow}`}
        />

        {/* Ícone e Badge */}
        <div className="flex items-center justify-between mb-6 flex-shrink-0">
          <div
            className={`w-12 h-12 rounded-lg ${item.theme.bgSolid} flex items-center justify-center ${item.theme.iconShadow} flex-shrink-0`}
          >
            <item.icon className="size-6 text-black transition-transform duration-500 group-hover:scale-110" />
          </div>
          <span className="text-[9px] uppercase font-mono tracking-wider font-bold bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-sm text-slate-400">
            {item.badge}
          </span>
        </div>

        {/* Título */}
        <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-4 h-[64px] flex items-center leading-tight flex-shrink-0">
          {item.name}
        </h3>

        {/* Rótulo 'IDEAL PARA' */}
        <span className="font-mono text-[9px] font-bold uppercase tracking-wider block mb-1.5 flex-shrink-0">
          <span className="text-slate-500">Ideal para:</span>{" "}
          <span className={item.theme.text}>{item.idealParaShort}</span>
        </span>

        {/* Descrição */}
        <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed mb-6 h-[116px] overflow-hidden flex items-start flex-shrink-0">
          {item.desc}
        </p>

        {/* Preço / Níveis Interativos */}
        <div className="mb-6 h-[124px] flex flex-col flex-shrink-0">
          {item.levels && item.levels.length >= 2 ? (
            <div className="flex flex-col justify-start gap-1.5 w-full h-[124px] bg-white/[0.03] p-2.5 rounded-xl border border-white/10">
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-0.5">
                Clique para escolher o nível:
              </span>
              {item.levels.map((lvl, idx) => {
                const isSelected = selectedLevelIdx === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedLevelIdx(idx)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg border text-left transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-aurora-violet/20 border-aurora-violet/50 text-white font-semibold shadow-[0_0_10px_rgba(162,128,255,0.15)]"
                        : "bg-black/20 border-white/5 text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="text-[11px] font-sans truncate">{lvl.name}</span>
                    <span
                      className={`text-xs font-mono font-bold whitespace-nowrap ${
                        isSelected ? "text-aurora-cyan" : "text-slate-300"
                      }`}
                    >
                      {lvl.price}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col justify-center gap-1.5 w-full h-[124px] bg-white/[0.03] p-4 rounded-xl border border-white/10">
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">
                Plano recorrente:
              </span>
              <div className="text-2xl sm:text-3xl font-display font-bold text-white leading-tight">
                {item.price}
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                <FaCheck className="size-2.5" /> Suporte emergencial incluso
              </span>
            </div>
          )}
        </div>

        {/* Botão CTA */}
        <div className="mb-8 h-[48px] flex-shrink-0">
          <Link
            to="/contato"
            search={
              {
                plano: item.ctaSearch.plano,
                nivel: selectedLvl ? selectedLvl.name : undefined,
              } as any
            }
            hash="personalize"
            className="group/btn flex items-center justify-center gap-2.5 text-center w-full h-[48px] rounded-2xl text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 bg-white/5 text-white hover:bg-white hover:text-black border border-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)]"
          >
            <span>{item.cta}</span>
            <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Inclusões */}
        <div className="border-t border-white/5 pt-6 flex-grow flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-4 h-[32px] flex items-center">
              O que está incluso
            </p>
            <ul className="space-y-3.5">
              {item.features.map((feat) => (
                <li
                  key={feat}
                  className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 font-light"
                >
                  <div
                    className={`w-4 h-4 rounded-full ${item.theme.bgSolid} flex items-center justify-center shrink-0 mt-0.5`}
                  >
                    <FaCheck className="size-2.5 text-black" />
                  </div>
                  <span className="leading-relaxed">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {item.note && (
            <div className="text-[10px] font-mono text-slate-500 pt-3 mt-5 border-t border-white/5">
              * {item.note}
            </div>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
}

export function PrecosAdicionais() {
  return (
    <section className="relative w-full bg-[#0e0e12] py-24 border-b border-white/5">
      <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Header da Seção */}
        <div className="max-w-3xl mb-12">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan" />
              <span className="font-mono text-[10px] sm:text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                EXPANSÃO CONTINUADA
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Serviços contínuos para manter, evoluir e escalar.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed">
              Depois de lançar seu projeto, a Opnora continua ao lado da sua empresa com
              acompanhamento mensal de melhorias, tráfego, automações e análise de dados. Esses
              serviços podem ser contratados como complementos pós-entrega ou incorporados
              diretamente à sua operação.
            </p>
          </ScrollReveal>
        </div>

        {/* Grid de Cards Padronizado com Níveis Interativos */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch mb-20">
          {ADICIONAIS.map((item, index) => (
            <AdicionalCard key={item.name} item={item} index={index} />
          ))}
        </div>

        {/* CTA Final da Seção */}
        <ScrollReveal delay={300}>
          <div className="mt-14 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            {/* Efeito Glow Roxo no Fundo */}
            <div className="absolute -right-24 -bottom-24 w-48 h-48 rounded-full bg-aurora-violet/5 blur-[50px] pointer-events-none" />

            <div className="space-y-3 text-center md:text-left max-w-xl">
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                Não sabe qual continuidade faz mais sentido agora?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                A Opnora ajuda a identificar a melhor próxima etapa para manter seu projeto
                saudável, evoluindo e gerando resultado.
              </p>
            </div>

            <div className="flex shrink-0 w-full md:w-auto justify-center md:justify-end">
              <a
                href={`${CONTACT.whatsappUrl}?text=${encodeURIComponent("Olá! Gostaria de falar com um consultor da Opnora sobre o acompanhamento pós-lançamento e a estratégia ideal de continuidade do meu projeto.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-aurora-violet text-white hover:bg-aurora-violet/90 hover:shadow-[0_0_25px_rgba(162,128,255,0.4)] border border-aurora-violet/20 font-display font-bold text-xs uppercase tracking-wider transition-all"
              >
                <FaWhatsapp className="size-4" />
                Falar com especialista
                <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
