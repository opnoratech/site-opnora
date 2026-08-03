import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  FaCheck,
  FaBolt,
  FaRocket,
  FaCode,
  FaFileCode,
  FaChevronDown,
  FaChevronUp,
  FaLayerGroup,
  FaBullseye,
  FaChartLine,
  FaPlug,
  FaShieldHalved,
  FaTableColumns,
  FaPlus,
  FaArrowRight,
} from "react-icons/fa6";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

import { PLANOS } from "@/data/pricing";

/* ================================================================
   TABELA COMPARATIVA — Estrutura de dados
   ================================================================ */

type ComparisonValue =
  | boolean
  | string
  | {
      label: string;
      compareKey?: string;
      tone?: "included" | "basic" | "advanced" | "optional" | "custom";
    };

interface ComparisonRow {
  feature: string;
  landing: ComparisonValue;
  essencial: ComparisonValue;
  profissional: ComparisonValue;
}

interface ComparisonCategory {
  name: string;
  icon: typeof FaCheck;
  rows: ComparisonRow[];
}

const PLAN_KEYS = ["landing", "essencial", "profissional"] as const;
type PlanKey = (typeof PLAN_KEYS)[number];

const PLAN_META: Record<PlanKey, { label: string; idealPara: string; color: string }> = {
  landing: {
    label: "Landing Page",
    idealPara: "Campanhas e validação",
    color: "#b3a1ff",
  },
  essencial: {
    label: "Essencial",
    idealPara: "Presença institucional",
    color: "#8b5cf6",
  },
  profissional: {
    label: "Profissional",
    idealPara: "Crescimento e vendas",
    color: "#40c4ff",
  },
};

const COMPARISON_CATEGORIES: ComparisonCategory[] = [
  {
    name: "Estrutura do projeto",
    icon: FaLayerGroup,
    rows: [
      {
        feature: "Quantidade de páginas",
        landing: "1 página",
        essencial: "Até 5 páginas",
        profissional: "Até 10 páginas",
      },
      {
        feature: "Design personalizado",
        landing: "Básico (Template)",
        essencial: "Completo",
        profissional: "Avançado",
      },
      {
        feature: "Animações e interações",
        landing: "Padrão",
        essencial: "Fluidas",
        profissional: "Avançadas",
      },
      {
        feature: "Painel administrativo",
        landing: "Simples",
        essencial: "Básico",
        profissional: "Completo",
      },
      {
        feature: "Múltiplos idiomas",
        landing: "Adicional",
        essencial: "Adicional",
        profissional: "Adicional",
      },
    ],
  },
  {
    name: "Captação e vendas",
    icon: FaBullseye,
    rows: [
      {
        feature: "Formulário de leads",
        landing: "Simples",
        essencial: "Avançado",
        profissional: "Avançado e Dinâmico",
      },
      {
        feature: "Página de vendas / campanha",
        landing: "Incluída",
        essencial: "Incluída",
        profissional: "Múltiplas",
      },
      {
        feature: "Gestão de leads",
        landing: "Adicional",
        essencial: "Painel Básico",
        profissional: "Integração CRM",
      },
      {
        feature: "Funil comercial",
        landing: "Adicional",
        essencial: "Básico",
        profissional: "Avançado",
      },
      {
        feature: "Dashboard de vendas",
        landing: "Adicional",
        essencial: "Básico",
        profissional: "Avançado",
      },
      {
        feature: "Integração com WhatsApp",
        landing: "Incluída",
        essencial: "Incluída",
        profissional: "Incluída",
      },
      {
        feature: "Agendamento de reunião",
        landing: "Adicional",
        essencial: "Adicional",
        profissional: "Incluído",
      },
      {
        feature: "CRM / Histórico de atendimento",
        landing: "Adicional",
        essencial: "Adicional",
        profissional: "Básico",
      },
    ],
  },
  {
    name: "Marketing e métricas",
    icon: FaChartLine,
    rows: [
      {
        feature: "Otimização SEO",
        landing: "Básica",
        essencial: "Padrão",
        profissional: "Avançada",
      },
      {
        feature: "Google Analytics",
        landing: "Básico",
        essencial: "GA4 Padrão",
        profissional: "GA4 Completo",
      },
      {
        feature: "Pixel e eventos",
        landing: "Pixel Básico",
        essencial: "Eventos Principais",
        profissional: "Eventos Customizados",
      },
      {
        feature: "Estrutura para Ads",
        landing: "Adicional",
        essencial: "Básica",
        profissional: "Completa",
      },
      {
        feature: "Rastreamento de campanhas",
        landing: "Adicional",
        essencial: "Adicional",
        profissional: "Incluído",
      },
      {
        feature: "Relatórios de desempenho",
        landing: "Adicional",
        essencial: "Mensal",
        profissional: "Dashboard Online",
      },
    ],
  },
  {
    name: "Sistemas, Automação e IA",
    icon: FaPlug,
    rows: [
      {
        feature: "Login e permissões de usuário",
        landing: "Adicional",
        essencial: "Adicional",
        profissional: "Incluído",
      },
      {
        feature: "Assinaturas ou pagamentos",
        landing: "Adicional",
        essencial: "Adicional",
        profissional: "Adicional",
      },
      {
        feature: "Upload de arquivos",
        landing: "Adicional",
        essencial: "Adicional",
        profissional: "Incluído",
      },
      {
        feature: "Integração externa",
        landing: "Adicional",
        essencial: "Até 2 integrações",
        profissional: "Até 4 integrações",
      },
      {
        feature: "APIs e webhooks",
        landing: "Adicional",
        essencial: "Básicos",
        profissional: "Avançados",
      },
      {
        feature: "Automação de processos e mensagens",
        landing: "Adicional",
        essencial: "E-mail básico",
        profissional: "Fluxo avançado",
      },
      {
        feature: "Chatbot e Respostas com IA",
        landing: "Adicional",
        essencial: "Adicional",
        profissional: "Adicional",
      },
    ],
  },
  {
    name: "Operação e evolução",
    icon: FaShieldHalved,
    rows: [
      {
        feature: "Garantia pós-entrega (Inclusa)",
        landing: "3 meses",
        essencial: "6 meses",
        profissional: "9 meses",
      },
      {
        feature: "Usuários e permissões",
        landing: "Adicional",
        essencial: "Adicional",
        profissional: "Múltiplos",
      },
      {
        feature: "Segurança e boas práticas",
        landing: "Básica",
        essencial: "Padrão",
        profissional: "Avançada",
      },
      {
        feature: "Documentação",
        landing: "Adicional",
        essencial: "Adicional",
        profissional: "Básica",
      },
      {
        feature: "Treinamento",
        landing: "Adicional",
        essencial: "Guia Rápido",
        profissional: "Vídeo-tutorial",
      },
      {
        feature: "Evolução futura",
        landing: "Adicional",
        essencial: "Limitada",
        profissional: "Completa",
      },
    ],
  },
  {
    name: "Serviços Adicionais",
    icon: FaPlus,
    rows: [
      {
        feature: "Tráfego pago e campanhas",
        landing: "Adicional (+ R$ 499/mês)",
        essencial: "Adicional (+ R$ 499/mês)",
        profissional: "Adicional (+ R$ 499/mês)",
      },
      {
        feature: "Plano mensal de evolução/suporte",
        landing: "Adicional (+ R$ 199/mês)",
        essencial: "Adicional (+ R$ 199/mês)",
        profissional: "Adicional (+ R$ 199/mês)",
      },
      {
        feature: "Automação com IA (Chatbots/N8N)",
        landing: "Adicional (+ R$ 599/mês)",
        essencial: "Adicional (+ R$ 599/mês)",
        profissional: "Adicional (+ R$ 599/mês)",
      },
      {
        feature: "Dashboard e Métricas Inteligentes",
        landing: "Adicional (+ R$ 349/mês)",
        essencial: "Adicional (+ R$ 349/mês)",
        profissional: "Adicional (+ R$ 349/mês)",
      },
    ],
  },
];

/* ================================================================
   COMPONENTE
   ================================================================ */

export function PrecosPlanos() {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [selectedMobilePlan, setSelectedMobilePlan] = useState<PlanKey>("profissional");
  const [mobileOpenCats, setMobileOpenCats] = useState<Set<string>>(
    () => new Set(["Estrutura do projeto"]),
  );
  const [showMobileFullTable, setShowMobileFullTable] = useState(false);
  const [compMode, setCompMode] = useState<"rapido" | "tabela">("rapido");
  const [compPlanA, setCompPlanA] = useState<PlanKey>("landing");
  const [compPlanB, setCompPlanB] = useState<PlanKey>("essencial");

  const getRawValueString = (value: ComparisonValue): string => {
    if (value === null || value === undefined) return "";
    if (typeof value === "boolean") return value ? "true" : "false";
    if (typeof value === "object" && "label" in value) return String(value.label);
    return String(value);
  };

  // Lista completa de categorias para exibição direta (sem filtros).
  const filteredCategories = COMPARISON_CATEGORIES;

  /* ---------- Helpers de célula ---------- */

  const getCellColorClass = (value: ComparisonValue): string => {
    let v = "";
    if (typeof value === "string") {
      v = value.toLowerCase();
    } else if (value && typeof value === "object" && "label" in value) {
      v = value.label.toLowerCase();
    } else {
      return "text-slate-300";
    }

    if (v.includes("opcional") || v.includes("adicional") || v.includes("sob análise"))
      return "text-amber-400/80";
    if (v.includes("personalizado") || v.includes("conforme") || v.includes("incluído em proposta"))
      return "text-emerald-400/70";
    return "text-slate-300";
  };

  const renderCell = (value: ComparisonValue, centered = true) => {
    let val: boolean | string = "";
    let tone: string | undefined = undefined;

    if (value && typeof value === "object" && "label" in value) {
      val = value.label;
      tone = value.tone;
    } else {
      val = value as boolean | string;
    }

    if (typeof val === "boolean") {
      if (!val) return <span className="text-slate-600">—</span>;
      const icon = <FaCheck className="size-3.5 text-[#58e5a6]" />;
      return centered ? <div className="flex justify-center items-center">{icon}</div> : icon;
    }

    let colorClass = "text-slate-300";
    if (tone) {
      if (tone === "optional") colorClass = "text-amber-400/80";
      else if (tone === "custom") colorClass = "text-emerald-400/70";
      else if (tone === "advanced") colorClass = "text-[#40c4ff]";
      else if (tone === "included") colorClass = "text-[#58e5a6]";
    } else {
      colorClass = getCellColorClass(value);
    }

    return <span className={`font-normal text-sm leading-snug ${colorClass}`}>{val}</span>;
  };

  /* ---------- Mobile: acordeão de categorias ---------- */

  const toggleMobileCat = (name: string) => {
    setMobileOpenCats((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  /* ---------- Tabela reutilizável (desktop + "comparar todos") ---------- */

  const renderComparisonTable = () => (
    <div className="min-w-[900px]">
      {/* Cabeçalho: nomes dos planos + ideal para */}
      <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] bg-white/[0.03] border-b border-white/10 text-center">
        <div className="py-11 px-5 flex items-start text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Funcionalidade
          </span>
        </div>
        {PLAN_KEYS.map((key) => {
          const meta = PLAN_META[key];
          return (
            <div key={key} className="py-8 px-4 flex flex-col justify-start items-center">
              <div className="flex flex-col items-center gap-1">
                <span className="text-sm font-bold text-white">{meta.label}</span>
                <span className="text-[10px] text-slate-500">{meta.idealPara}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Categorias + linhas */}
      {filteredCategories.map((cat) => (
        <div key={cat.name}>
          {/* Header da categoria */}
          <div className="bg-white/[0.04] border-b border-white/5">
            <div className="flex items-center gap-3 py-3 px-5">
              <cat.icon className="size-3.5 text-slate-500" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                {cat.name}
              </span>
            </div>
          </div>

          {/* Linhas da categoria */}
          {cat.rows.map((row, idx) => (
            <div
              key={row.feature}
              className={`grid grid-cols-[1.4fr_1fr_1fr_1fr] items-center border-b border-white/5 transition-colors hover:bg-white/[0.02] ${
                idx % 2 === 0 ? "bg-transparent" : "bg-white/[0.01]"
              }`}
            >
              <div className="py-3.5 px-5 text-sm font-medium text-slate-200">{row.feature}</div>
              {PLAN_KEYS.map((planKey) => {
                return (
                  <div key={planKey} className="py-3.5 px-4 text-center">
                    {renderCell(row[planKey])}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  /* ---------- Legenda ---------- */

  const renderLegend = () => (
    <div className="border-t border-white/5 px-5 sm:px-8 py-5">
      <div className="flex flex-wrap gap-x-6 gap-y-2.5 text-[11px]">
        <div className="flex items-center gap-2 text-slate-500">
          <span>
            <strong className="text-slate-400">Incluída</strong> (faz parte do valor inicial)
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-500">
          <span>
            <strong className="text-amber-400/80">Adicional</strong> (pode ser contratado
            separadamente
          </span>
        </div>
      </div>
    </div>
  );

  /* ================================================================
     RENDER
     ================================================================ */

  return (
    <section id="planos" className="relative w-full bg-[#0c0c0f] py-24 border-b border-white/5">
      <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-12">
        {/* ===== Header dos Planos ===== */}
        <div className="max-w-3xl mb-16">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan" />
              <span className="font-mono text-[10px] sm:text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                MODALIDADES &amp; INVESTIMENTO
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-white mb-6">
              Planos desenhados para o seu momento
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed">
              Comece com uma landing page para validar rápido ou estruture um ecossistema digital
              completo com software, IA e automação.
            </p>
          </ScrollReveal>
        </div>

        {/* ===== Grid dos 4 Planos ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch mb-24">
          {PLANOS.map((plano, idx) => (
            <ScrollReveal key={plano.name} delay={100 * (idx + 1)} className="flex">
              <div className="group relative w-full h-full flex flex-col rounded-lg bg-[#121218] border border-white/10 p-6 sm:p-7 transition-all duration-500 overflow-hidden hover:border-white/15 hover:shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
                {/* Glow de fundo */}
                <div
                  className={`absolute -top-20 -right-20 w-48 h-48 rounded-full blur-[60px] pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100 ${plano.theme.glow}`}
                />

                {/* Ícone */}
                <div
                  className={`mb-6 w-12 h-12 rounded-lg ${plano.theme.bg} flex items-center justify-center ${plano.theme.iconShadow} flex-shrink-0`}
                >
                  <plano.icon className="size-6 text-black transition-transform duration-500 group-hover:scale-110" />
                </div>

                {/* Título */}
                <h3 className="font-display text-2xl font-bold text-white mb-4 h-[32px] flex items-center flex-shrink-0">
                  {plano.name}
                </h3>

                {/* Rótulo 'IDEAL PARA' */}
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider block mb-1.5 flex-shrink-0">
                  <span className="text-slate-500">Ideal para:</span>{" "}
                  <span className={plano.theme.text}>{plano.idealPara}</span>
                </span>

                {/* Descrição curta */}
                <p className="text-sm text-slate-400 font-light leading-relaxed mb-6 h-auto md:h-[120px] lg:h-[96px] xl:h-[96px] flex items-start flex-shrink-0">
                  {plano.desc}
                </p>

                {/* Preço */}
                <div className="mb-6 h-[72px] flex items-center flex-shrink-0">
                  {plano.price === "Orçamento personalizado" ? (
                    <div className="text-xl sm:text-2xl font-display font-bold text-white leading-tight">
                      Orçamento personalizado
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm text-slate-400 font-medium">A partir de R$</span>
                      <span className="text-3xl sm:text-4xl font-display font-bold text-white">
                        {plano.price}
                      </span>
                    </div>
                  )}
                </div>

                {/* Botão CTA */}
                <div className="mb-8 h-[48px] flex-shrink-0">
                  {plano.ctaLink.startsWith("#") ? (
                    <a
                      href={plano.ctaLink}
                      onClick={(e) => {
                        e.preventDefault();
                        const target = document.querySelector(plano.ctaLink);
                        if (target) {
                          target.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                      }}
                      className="group/btn flex items-center justify-center gap-2.5 text-center w-full h-[48px] rounded-2xl text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 bg-white/5 text-white hover:bg-white hover:text-black border border-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                    >
                      <span>{plano.cta}</span>
                      <FaArrowRight className="w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </a>
                  ) : (
                    <Link
                      to={plano.ctaLink}
                      search={plano.ctaSearch as { plano: string }}
                      hash="personalize"
                      className="group/btn flex items-center justify-center gap-2.5 text-center w-full h-[48px] rounded-2xl text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 bg-white/5 text-white hover:bg-white hover:text-black border border-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                    >
                      <span>{plano.cta}</span>
                      <FaArrowRight className="w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Link>
                  )}
                </div>

                {/* Inclusões */}
                <div className="border-t border-white/5 pt-6 flex-grow flex flex-col justify-between">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-4 h-[32px] flex items-center">
                      {plano.featuresTitle}
                    </p>
                    <ul className="space-y-3.5">
                      {plano.features.map((feat, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 font-light"
                        >
                          <div
                            className={`w-4 h-4 rounded-full ${plano.name === "Sob medida" ? "bg-[#58e5a6]" : "bg-[#b3a1ff]"} flex items-center justify-center shrink-0 mt-0.5`}
                          >
                            <FaCheck className="size-2.5 text-black" />
                          </div>
                          <span className="leading-relaxed">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Link: Comparar todas as diferenças */}
                  {idx !== 3 && (
                    <div className="mt-5 pt-3.5 border-t border-white/5 flex items-center">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveAccordion("tabela");
                          setCompMode("rapido");
                          const currentKey = idx === 0 ? "landing" : "essencial";
                          const nextKey = idx === 0 ? "essencial" : "profissional";
                          setCompPlanA(currentKey);
                          setCompPlanB(nextKey);
                          setActiveAccordion("tabela");
                          setTimeout(() => {
                            const element = document.getElementById("comparativo-detalhado");
                            if (element) {
                              element.scrollIntoView({ behavior: "smooth", block: "start" });
                            }
                          }, 120);
                        }}
                        className={`text-xs font-semibold ${plano.theme.text} hover:text-white flex items-center gap-1.5 transition-colors group/link`}
                      >
                        Comparar todas as diferenças
                        <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">
                          →
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* ===== Acordeão: Comparativo Detalhado ===== */}
        <ScrollReveal delay={200}>
          <div
            id="comparativo-detalhado"
            className="rounded-lg bg-[#121218] border border-white/10 overflow-hidden"
          >
            {/* Botão do acordeão */}
            <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 bg-transparent">
              {/* Lado esquerdo: título e subtítulo clicáveis para abrir/fechar */}
              <button
                type="button"
                onClick={() => setActiveAccordion(activeAccordion === "tabela" ? null : "tabela")}
                className="flex flex-1 items-center gap-4 text-left hover:opacity-80 transition-opacity"
              >
                <div className="w-10 h-10 rounded-lg bg-aurora-violet/10 flex items-center justify-center text-aurora-violet shrink-0">
                  <FaTableColumns className="size-4.5" />
                </div>
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                    Comparativo detalhado de funcionalidades
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 font-light mt-0.5">
                    Veja lado a lado o que cada plano oferece
                  </p>
                </div>
              </button>

              {/* Lado direito: controles destacados e chevron */}
              <div
                className="flex items-center justify-end shrink-0 gap-4"
                onClick={(e) => e.stopPropagation()}
              >
                {activeAccordion === "tabela" && (
                  <div className="flex p-1 bg-white/[0.04] border border-white/10 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setCompMode("rapido")}
                      className={`py-2 px-5 rounded-xl text-[11px] sm:text-xs font-bold tracking-wider transition-all uppercase ${
                        compMode === "rapido"
                          ? "bg-white text-black shadow-lg"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Apenas Diferenças
                    </button>
                    <button
                      type="button"
                      onClick={() => setCompMode("tabela")}
                      className={`py-2 px-5 rounded-xl text-[11px] sm:text-xs font-bold tracking-wider transition-all uppercase ${
                        compMode === "tabela"
                          ? "bg-white text-black shadow-lg"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Ver Tudo
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setActiveAccordion(activeAccordion === "tabela" ? null : "tabela")}
                  className="text-slate-400 hover:text-white p-2 transition-colors shrink-0"
                >
                  {activeAccordion === "tabela" ? (
                    <FaChevronUp className="size-4" />
                  ) : (
                    <FaChevronDown className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Conteúdo expandido */}
            {activeAccordion === "tabela" && (
              <div className="border-t border-white/10">
                {compMode === "rapido" ? (
                  /* Interface do comparador rápido */
                  <div className="p-4 sm:p-8">
                    {/* Cabeçalho de Seleção */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {/* Plano A */}
                      <div className="flex flex-col gap-2.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                          Plano de Origem:
                        </span>
                        <div className="grid grid-cols-3 gap-2">
                          {PLAN_KEYS.map((k) => {
                            const active = compPlanA === k;
                            const colors: Record<
                              PlanKey,
                              { bg: string; text: string; shadow: string }
                            > = {
                              landing: {
                                bg: "bg-[#b3a1ff]",
                                text: "text-black",
                                shadow: "shadow-[0_0_15px_rgba(179,161,255,0.35)]",
                              },
                              essencial: {
                                bg: "bg-[#b3a1ff]",
                                text: "text-black",
                                shadow: "shadow-[0_0_15px_rgba(179,161,255,0.35)]",
                              },
                              profissional: {
                                bg: "bg-[#b3a1ff]",
                                text: "text-black",
                                shadow: "shadow-[0_0_15px_rgba(179,161,255,0.35)]",
                              },
                            };
                            return (
                              <button
                                key={k}
                                type="button"
                                onClick={() => setCompPlanA(k)}
                                disabled={compPlanB === k}
                                className={`py-2 px-2.5 rounded-sm text-center text-xs font-bold transition-all disabled:opacity-35 disabled:pointer-events-none ${
                                  active
                                    ? `${colors[k].bg} ${colors[k].text} ${colors[k].shadow} border-none`
                                    : "bg-white/[0.02] text-slate-400 border border-white/5 hover:text-white hover:bg-white/[0.06] hover:border-white/15"
                                }`}
                              >
                                {PLAN_META[k].label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Plano B */}
                      <div className="flex flex-col gap-2.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                          Plano de Comparação:
                        </span>
                        <div className="grid grid-cols-3 gap-2">
                          {PLAN_KEYS.map((k) => {
                            const active = compPlanB === k;
                            const colors: Record<
                              PlanKey,
                              { bg: string; text: string; shadow: string }
                            > = {
                              landing: {
                                bg: "bg-[#b3a1ff]",
                                text: "text-black",
                                shadow: "shadow-[0_0_15px_rgba(179,161,255,0.35)]",
                              },
                              essencial: {
                                bg: "bg-[#b3a1ff]",
                                text: "text-black",
                                shadow: "shadow-[0_0_15px_rgba(179,161,255,0.35)]",
                              },
                              profissional: {
                                bg: "bg-[#b3a1ff]",
                                text: "text-black",
                                shadow: "shadow-[0_0_15px_rgba(179,161,255,0.35)]",
                              },
                            };
                            return (
                              <button
                                key={k}
                                type="button"
                                onClick={() => setCompPlanB(k)}
                                disabled={compPlanA === k}
                                className={`py-2 px-2.5 rounded-sm text-center text-xs font-bold transition-all disabled:opacity-35 disabled:pointer-events-none ${
                                  active
                                    ? `${colors[k].bg} ${colors[k].text} ${colors[k].shadow} border-none`
                                    : "bg-white/[0.02] text-slate-400 border border-white/5 hover:text-white hover:bg-white/[0.06] hover:border-white/15"
                                }`}
                              >
                                {PLAN_META[k].label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Exibição das diferenças reais */}
                    {compPlanA === compPlanB ? (
                      <div className="text-center py-12 border border-dashed border-white/10 rounded-lg bg-white/[0.01]">
                        <p className="text-sm text-slate-400 font-light">
                          Selecione dois planos diferentes nos botões acima para comparar o que muda
                          entre eles.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {COMPARISON_CATEGORIES.map((cat) => {
                          const diffRows = cat.rows.filter(
                            (row) =>
                              getRawValueString(row[compPlanA]) !==
                              getRawValueString(row[compPlanB]),
                          );

                          if (diffRows.length === 0) return null;

                          return (
                            <div
                              key={cat.name}
                              className="rounded-lg border border-white/10 bg-white/[0.02] overflow-hidden"
                            >
                              {/* Nome Categoria */}
                              <div className="bg-white/[0.03] border-b border-white/5 px-4 py-3 flex items-center gap-2">
                                <cat.icon className="size-3.5 text-slate-400" />
                                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                                  {cat.name}
                                </span>
                              </div>

                              {/* Linhas de Diferenças */}
                              <div className="divide-y divide-white/5">
                                {diffRows.map((row) => (
                                  <div
                                    key={row.feature}
                                    className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 px-4 py-4 items-center"
                                  >
                                    <div className="text-xs sm:text-sm font-semibold text-slate-200">
                                      {row.feature}
                                    </div>

                                    {/* Plano A */}
                                    <div className="flex items-center gap-2">
                                      <span className="text-[10px] font-mono text-slate-500 uppercase md:hidden mr-1">
                                        {PLAN_META[compPlanA].label}:
                                      </span>
                                      <span className="text-xs text-slate-400">
                                        {renderCell(row[compPlanA], false)}
                                      </span>
                                    </div>

                                    {/* Plano B */}
                                    <div className="flex items-center gap-2 border-t border-white/5 pt-2 md:pt-0 md:border-none">
                                      <span className="text-[10px] font-mono text-slate-500 uppercase md:hidden mr-1">
                                        {PLAN_META[compPlanB].label}:
                                      </span>
                                      <span className="text-xs font-semibold text-white">
                                        {renderCell(row[compPlanB], false)}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  /* Modo tabela completa (original) */
                  <>
                    {/* Desktop: tabela completa (lg+) */}
                    <div className="hidden lg:block overflow-x-auto">{renderComparisonTable()}</div>

                    {/* Mobile: visão por plano ou tabela completa (<lg) */}
                    <div className="lg:hidden">
                      {showMobileFullTable ? (
                        /* Tabela completa com scroll horizontal */
                        <div>
                          <div className="px-4 py-3 border-b border-white/5">
                            <button
                              type="button"
                              onClick={() => setShowMobileFullTable(false)}
                              className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                            >
                              ← Voltar para visão por plano
                            </button>
                          </div>
                          <div className="overflow-x-auto">{renderComparisonTable()}</div>
                        </div>
                      ) : (
                        /* Visão por plano: seletor + acordeões */
                        <div className="p-4 sm:p-6">
                          {/* Seletor de plano */}
                          <div className="flex gap-2 mb-5 overflow-x-auto pb-1 -mx-1 px-1">
                            {PLAN_KEYS.map((key) => {
                              const meta = PLAN_META[key];
                              const isActive = selectedMobilePlan === key;
                              return (
                                <button
                                  key={key}
                                  type="button"
                                  onClick={() => setSelectedMobilePlan(key)}
                                  className={`shrink-0 px-4 py-2 rounded-sm text-xs font-semibold transition-all border ${
                                    isActive
                                      ? "border-current text-white"
                                      : "text-slate-500 border-white/10 hover:text-slate-300 hover:border-white/20"
                                  }`}
                                  style={
                                    isActive
                                      ? {
                                          color: meta.color,
                                          borderColor: meta.color,
                                          backgroundColor: `${meta.color}15`,
                                        }
                                      : {}
                                  }
                                >
                                  {meta.label}
                                </button>
                              );
                            })}
                          </div>

                          {/* Ideal para (plano selecionado) */}
                          <div className="mb-6 text-center">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                              Ideal para:{" "}
                            </span>
                            <span
                              className="text-[10px] font-mono uppercase tracking-wider font-bold"
                              style={{
                                color: PLAN_META[selectedMobilePlan].color,
                              }}
                            >
                              {PLAN_META[selectedMobilePlan].idealPara}
                            </span>
                          </div>

                          {/* Categorias em acordeão */}
                          <div className="space-y-3">
                            {filteredCategories.map((cat) => {
                              const isOpen = mobileOpenCats.has(cat.name);
                              return (
                                <div
                                  key={cat.name}
                                  className="rounded-lg bg-white/[0.03] border border-white/5 overflow-hidden"
                                >
                                  <button
                                    type="button"
                                    onClick={() => toggleMobileCat(cat.name)}
                                    className="w-full flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors"
                                  >
                                    <div className="flex items-center gap-2.5">
                                      <cat.icon className="size-3.5 text-slate-500" />
                                      <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                                        {cat.name}
                                      </span>
                                    </div>
                                    {isOpen ? (
                                      <FaChevronUp className="size-3 text-slate-500" />
                                    ) : (
                                      <FaChevronDown className="size-3 text-slate-500" />
                                    )}
                                  </button>

                                  {isOpen && (
                                    <div className="border-t border-white/5 px-4 py-3 space-y-3">
                                      {cat.rows.map((row) => {
                                        const value = row[selectedMobilePlan];
                                        return (
                                          <div
                                            key={row.feature}
                                            className="flex items-center justify-between gap-4 py-1"
                                          >
                                            <span className="text-sm text-slate-300 font-light">
                                              {row.feature}
                                            </span>
                                            <span className="text-right shrink-0">
                                              {renderCell(value, false)}
                                            </span>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          {/* Botão: Comparar todos */}
                          <button
                            type="button"
                            onClick={() => setShowMobileFullTable(true)}
                            className="mt-6 w-full text-center text-xs text-slate-500 hover:text-slate-300 transition-colors py-3 border border-white/5 rounded-sm hover:border-white/10"
                          >
                            Comparar todos os planos lado a lado →
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* Legenda */}
                {renderLegend()}
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
