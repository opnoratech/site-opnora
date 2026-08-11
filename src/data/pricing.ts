import { IconType } from "react-icons";
import { FaCheck, FaBolt, FaRocket, FaCode, FaFileCode, FaLayerGroup } from "react-icons/fa6";

/* ================================================================
   ESTRUTURAS E CONSTANTES DE DADOS PARA PREÇOS E SIMULADOR
   ================================================================ */

export interface ObjectiveOption {
  id: string;
  label: string;
}

export const OBJECTIVE_OPTIONS: ObjectiveOption[] = [
  { id: "captar", label: "Captar mais contatos e oportunidades" },
  { id: "apresentar", label: "Apresentar a empresa com mais profissionalismo" },
  { id: "organizar", label: "Organizar clientes e vendas" },
  { id: "automatizar", label: "Automatizar tarefas repetitivas" },
  { id: "atendimento", label: "Melhorar o atendimento" },
  { id: "integrar", label: "Integrar sistemas e informações" },
  { id: "dashboard", label: "Acompanhar métricas em um dashboard" },
  { id: "validar", label: "Validar uma nova ideia" },
  { id: "digitalizar", label: "Digitalizar um processo interno" },
  { id: "orientacao", label: "Outro objetivo" },
];

export const SOLUTION_OPTIONS = [
  "Landing page",
  "Site institucional",
  "E-commerce",
  "Sistema web",
  "Plataforma digital",
  "Painel administrativo",
  "Dashboard",
  "CRM ou gestão comercial",
  "Automação",
  "Assistente ou chatbot com IA",
  "Integração entre sistemas",
  "Aplicativo mobile (iOS / Android)",
  "Tráfego pago e estrutura de campanha",
  "Manutenção e evolução",
  "Outra solução",
];

export interface FeatureCategory {
  name: string;
  items: string[];
}

export const FEATURE_CATEGORIES: FeatureCategory[] = [
  {
    name: "Estrutura do projeto",
    items: [
      "Quantidade de páginas",
      "Design personalizado",
      "Animações e interações",
      "Painel administrativo",
      "Múltiplos idiomas",
      "Outro recurso (Descrever no final)",
    ],
  },
  {
    name: "Captação e vendas",
    items: [
      "Formulário de leads",
      "Página de vendas / campanha",
      "Gestão de leads",
      "Funil comercial",
      "Dashboard de vendas",
      "Integração com WhatsApp",
      "Agendamento de reunião",
      "CRM / Histórico de atendimento",
      "Outro recurso (Descrever no final)",
    ],
  },
  {
    name: "Marketing e métricas",
    items: [
      "Otimização SEO",
      "Google Analytics",
      "Pixel e eventos",
      "Estrutura para Ads",
      "Rastreamento de campanhas",
      "Relatórios de desempenho",
      "Outro recurso (Descrever no final)",
    ],
  },
  {
    name: "Sistemas, Automação e IA",
    items: [
      "Login e permissões de usuário",
      "Assinaturas ou pagamentos",
      "Upload de arquivos",
      "Integração externa",
      "APIs e webhooks",
      "Automação de processos e mensagens",
      "Chatbot e Respostas com IA",
      "Outro recurso (Descrever no final)",
    ],
  },
  {
    name: "Operação e evolução",
    items: [
      "Garantia pós-entrega (Inclusa)",
      "Usuários e permissões",
      "Segurança e boas práticas",
      "Documentação",
      "Treinamento",
      "Evolução futura",
      "Outro recurso (Descrever no final)",
    ],
  },
  {
    name: "Serviços Adicionais",
    items: [
      "Tráfego pago e campanhas",
      "Plano mensal de evolução/suporte",
      "Automação com IA (Chatbots/N8N)",
      "Dashboard e Métricas Inteligentes",
      "Outro recurso (Descrever no final)",
    ],
  },
];

export type PlanLevel = Record<string, Record<string, string>>;

export const PLAN_FEATURE_LEVELS: PlanLevel = {
  landing: {
    "Quantidade de páginas": "1 página",
    "Design personalizado": "Básico (Template)",
    "Animações e interações": "Padrão",
    "Painel administrativo": "Simples",
    "Múltiplos idiomas": "Adicional",
    "Formulário de leads": "Simples",
    "Página de vendas / campanha": "Incluída",
    "Gestão de leads": "Adicional",
    "Funil comercial": "Adicional",
    "Dashboard de vendas": "Adicional",
    "Integração com WhatsApp": "Incluída",
    "Agendamento de reunião": "Adicional",
    "CRM / Histórico de atendimento": "Adicional",
    "Otimização SEO": "Básica",
    "Google Analytics": "Básico",
    "Pixel e eventos": "Pixel Básico",
    "Estrutura para Ads": "Adicional",
    "Rastreamento de campanhas": "Adicional",
    "Relatórios de desempenho": "Adicional",
    "Login e permissões de usuário": "Adicional",
    "Assinaturas ou pagamentos": "Adicional",
    "Upload de arquivos": "Adicional",
    "Integração externa": "Adicional",
    "APIs e webhooks": "Adicional",
    "Automação de processos e mensagens": "Adicional",
    "Chatbot e Respostas com IA": "Adicional",
    "Garantia pós-entrega (Inclusa)": "3 meses",
    "Usuários e permissões": "Adicional",
    "Segurança e boas práticas": "Básica",
    Documentação: "Adicional",
    Treinamento: "Adicional",
    "Evolução futura": "Adicional",
    "Tráfego pago e campanhas": "Adicional (+ R$ 250/mês)",
    "Plano mensal de evolução/suporte": "Adicional (+ R$ 100/mês)",
    "Automação com IA (Chatbots/N8N)": "Adicional (+ R$ 200/mês)",
    "Dashboard e Métricas Inteligentes": "Adicional (+ R$ 150/mês)",
  },
  essencial: {
    "Quantidade de páginas": "Até 5 páginas",
    "Design personalizado": "Completo",
    "Animações e interações": "Fluidas",
    "Painel administrativo": "Básico",
    "Múltiplos idiomas": "Adicional",
    "Formulário de leads": "Avançado",
    "Página de vendas / campanha": "Incluída",
    "Gestão de leads": "Painel Básico",
    "Funil comercial": "Básico",
    "Dashboard de vendas": "Básico",
    "Integração com WhatsApp": "Incluída",
    "Agendamento de reunião": "Adicional",
    "CRM / Histórico de atendimento": "Adicional",
    "Otimização SEO": "Padrão",
    "Google Analytics": "GA4 Padrão",
    "Pixel e eventos": "Eventos Principais",
    "Estrutura para Ads": "Básica",
    "Rastreamento de campanhas": "Adicional",
    "Relatórios de desempenho": "Mensal",
    "Login e permissões de usuário": "Adicional",
    "Assinaturas ou pagamentos": "Adicional",
    "Upload de arquivos": "Adicional",
    "Integração externa": "Até 2 integrações",
    "APIs e webhooks": "Básicos",
    "Automação de processos e mensagens": "E-mail básico",
    "Chatbot e Respostas com IA": "Adicional",
    "Garantia pós-entrega (Inclusa)": "6 meses",
    "Usuários e permissões": "Adicional",
    "Segurança e boas práticas": "Padrão",
    Documentação: "Adicional",
    Treinamento: "Guia Rápido",
    "Evolução futura": "Limitada",
    "Tráfego pago e campanhas": "Adicional (+ R$ 250/mês)",
    "Plano mensal de evolução/suporte": "Adicional (+ R$ 100/mês)",
    "Automação com IA (Chatbots/N8N)": "Adicional (+ R$ 200/mês)",
    "Dashboard e Métricas Inteligentes": "Adicional (+ R$ 150/mês)",
  },
  profissional: {
    "Quantidade de páginas": "Até 10 páginas",
    "Design personalizado": "Avançado",
    "Animações e interações": "Avançadas",
    "Painel administrativo": "Completo",
    "Múltiplos idiomas": "Adicional",
    "Formulário de leads": "Avançado e Dinâmico",
    "Página de vendas / campanha": "Múltiplas",
    "Gestão de leads": "Integração CRM",
    "Funil comercial": "Avançado",
    "Dashboard de vendas": "Avançado",
    "Integração com WhatsApp": "Incluída",
    "Agendamento de reunião": "Incluído",
    "CRM / Histórico de atendimento": "Básico",
    "Otimização SEO": "Avançada",
    "Google Analytics": "GA4 Completo",
    "Pixel e eventos": "Eventos Customizados",
    "Estrutura para Ads": "Completa",
    "Rastreamento de campanhas": "Incluído",
    "Relatórios de desempenho": "Dashboard Online",
    "Login e permissões de usuário": "Incluído",
    "Assinaturas ou pagamentos": "Adicional",
    "Upload de arquivos": "Incluído",
    "Integração externa": "Até 4 integrações",
    "APIs e webhooks": "Avançados",
    "Automação de processos e mensagens": "Fluxo avançado",
    "Chatbot e Respostas com IA": "Adicional",
    "Garantia pós-entrega (Inclusa)": "9 meses",
    "Usuários e permissões": "Múltiplos",
    "Segurança e boas práticas": "Avançada",
    Documentação: "Básica",
    Treinamento: "Vídeo-tutorial",
    "Evolução futura": "Completa",
    "Tráfego pago e campanhas": "Adicional (+ R$ 250/mês)",
    "Plano mensal de evolução/suporte": "Adicional (+ R$ 100/mês)",
    "Automação com IA (Chatbots/N8N)": "Adicional (+ R$ 200/mês)",
    "Dashboard e Métricas Inteligentes": "Adicional (+ R$ 150/mês)",
  },
};

export const ADDITIONAL_PRICES: Record<string, string> = {
  "Tráfego pago e campanhas": "+ R$ 350/mês",
  "Plano mensal de evolução/suporte": "+ R$ 150/mês",
  "Automação com IA (Chatbots/N8N)": "+ R$ 300/mês",
  "Dashboard e Métricas Inteligentes": "+ R$ 200/mês",
};

export const INVESTMENT_OPTIONS = [
  "Até R$ 500",
  "De R$ 500 a R$ 1.000",
  "De R$ 1.000 a R$ 2.000",
  "De R$ 2.000 a R$ 5.000",
  "Acima de R$ 5.000",
  "A definir",
];

export const EVOLUTION_OPTIONS = [
  { value: "essencial", label: "Sim, quero começar com o essencial" },
  { value: "completa", label: "Quero uma solução mais completa desde o início" },
  { value: "orientacao", label: "Preciso de orientação" },
];

export const COMO_CONHECEU_OPTIONS = [
  "Indicação de parceiro/amigo",
  "Pesquisa no Google",
  "LinkedIn",
  "Instagram",
  "WhatsApp / Prospecção",
  "Outro canal",
];

export const PLAN_KEYS = ["landing", "essencial", "profissional"] as const;
export type PlanKey = (typeof PLAN_KEYS)[number];

export interface PlanData {
  name: string;
  idealPara: string;
  desc: string;
  price: string;
  icon: IconType;
  theme: {
    bg: string;
    text: string;
    glow: string;
    glowHover: string;
    borderHover: string;
    iconShadow: string;
  };
  featuresTitle: string;
  features: string[];
  highlight: boolean;
  badge: string | null;
  cta: string;
  ctaLink: string;
  ctaSearch: { plano: string };
}

export const PLANOS: PlanData[] = [
  {
    name: "Landing Page",
    idealPara: "Validar ideias e serviços",
    desc: "Ideal para experimentar, ter sua primeira página no ar e validar seu serviço com o básico necessário.",
    price: "550",
    icon: FaFileCode,
    theme: {
      bg: "bg-[#b3a1ff]",
      text: "text-[#b3a1ff]",
      glow: "bg-[#b3a1ff]/10",
      glowHover: "group-hover:bg-[#b3a1ff]/20",
      borderHover: "hover:border-[#b3a1ff]/30",
      iconShadow: "shadow-[0_0_20px_rgba(179,161,255,0.3)]",
    },
    featuresTitle: "O que está incluso",
    features: [
      "Página única de alta conversão",
      "Formulário de captação simples",
      "Design moderno 100% responsivo",
      "3 meses de garantia inclusa",
    ],
    highlight: false,
    badge: null,
    cta: "Começar projeto",
    ctaLink: "/contato",
    ctaSearch: { plano: "landing" },
  },
  {
    name: "Essencial",
    idealPara: "Empresas e profissionais",
    desc: "O padrão ideal para estruturar a presença da sua empresa. Resolve suas demandas de apresentação com design profissional.",
    price: "1.100",
    icon: FaRocket,
    theme: {
      bg: "bg-[#8b5cf6]",
      text: "text-[#b3a1ff]",
      glow: "bg-[#8b5cf6]/10",
      glowHover: "group-hover:bg-[#8b5cf6]/20",
      borderHover: "hover:border-[#8b5cf6]/30",
      iconShadow: "shadow-[0_0_20px_rgba(139,92,246,0.35)]",
    },
    featuresTitle: "O que muda em relação à LP:",
    features: [
      "Até 5 páginas estruturadas",
      "Menu de navegação e páginas institucionais",
      "SEO básico configurado por página",
      "6 meses de garantia inclusa",
    ],
    highlight: false,
    badge: null,
    cta: "Começar projeto",
    ctaLink: "/contato",
    ctaSearch: { plano: "essencial" },
  },
  {
    name: "Profissional",
    idealPara: "Negócios em crescimento",
    desc: "A solução completa para trabalhar com tranquilidade. Tudo que seu negócio precisa para crescer sem limitações técnicas.",
    price: "2.000",
    icon: FaBolt,
    theme: {
      bg: "bg-[#40c4ff]",
      text: "text-[#b3a1ff]",
      glow: "bg-[#40c4ff]/15",
      glowHover: "group-hover:bg-[#40c4ff]/25",
      borderHover: "hover:border-[#40c4ff]/40",
      iconShadow: "shadow-[0_0_20px_rgba(64,196,255,0.4)]",
    },
    featuresTitle: "O que muda em relação ao Essencial:",
    features: [
      "Até 10 páginas estruturadas",
      "Formulários e interações avançadas",
      "Métricas prontas (Pixel/Analytics)",
      "9 meses de garantia inclusa",
    ],
    highlight: false,
    badge: null,
    cta: "Começar projeto",
    ctaLink: "/contato",
    ctaSearch: { plano: "profissional" },
  },
  {
    name: "Sob medida",
    idealPara: "Sistemas personalizados",
    desc: "Arquitetura e design construídos do zero para resolver os desafios únicos da sua operação. Uma solução exclusiva e escalável.",
    price: "Orçamento personalizado",
    icon: FaCode,
    theme: {
      bg: "bg-[#58e5a6]",
      text: "text-[#58e5a6]",
      glow: "bg-[#58e5a6]/10",
      glowHover: "group-hover:bg-[#58e5a6]/20",
      borderHover: "hover:border-[#58e5a6]/30",
      iconShadow: "shadow-[0_0_20px_rgba(88,229,166,0.3)]",
    },
    featuresTitle: "O que torna exclusivo:",
    features: [
      "Software 100% moldado ao seu processo",
      "Arquitetura e Design (UI/UX) únicos",
      "Escalabilidade e integrações sem limites",
      "Suporte e manutenção dedicados",
    ],
    highlight: false,
    badge: null,
    cta: "Solicitar análise",
    ctaLink: "/contato",
    ctaSearch: { plano: "sobmedida" },
  },
];

export const PLAN_META: Record<PlanKey, { label: string; idealPara: string; color: string }> = {
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

/* ================================================================
   FUNÇÕES AUXILIARES DE CÁLCULO
   ================================================================ */

export function getIncludedFeatures(plano: string): string[] {
  const levels = PLAN_FEATURE_LEVELS[plano];
  if (!levels) return [];
  return Object.entries(levels)
    .filter(([, level]) => !level.startsWith("Adicional"))
    .map(([feature]) => feature);
}

export function getAvailableLevels(feature: string): string[] {
  if (feature.startsWith("Outro recurso")) {
    return [];
  }

  const customLevels: Record<string, string[]> = {
    "Múltiplos idiomas": ["Até 2 idiomas", "Multilíngue avançado"],
    "Automação com IA (Chatbots/N8N)": ["Fluxo básico de leads", "Automação avançada com IA"],
    "Chatbot e Respostas com IA": ["Fluxo básico de leads", "Automação avançada com IA"],
    "Tráfego pago e campanhas": ["Setup de campanha inicial", "Gestão de tráfego + Escala"],
    "Garantia pós-entrega (Inclusa)": ["3 meses", "6 meses", "9 meses"],
    "Plano mensal de evolução/suporte": ["1 mês", "3 meses", "6 meses", "12 meses"],
    "Dashboard e Métricas Inteligentes": ["Dashboard simples", "Dashboard avançado"],
  };

  if (customLevels[feature]) {
    return customLevels[feature];
  }

  const levels: string[] = [];
  for (const plano of Object.keys(PLAN_FEATURE_LEVELS)) {
    const level = PLAN_FEATURE_LEVELS[plano][feature];
    if (level && !level.startsWith("Adicional") && !levels.includes(level)) {
      levels.push(level);
    }
  }

  if (levels.length === 0) {
    return ["Básico", "Completo", "Avançado"];
  }

  return levels;
}

export function isFeatureIncludedInPlan(
  plano: string | undefined,
  feature: string,
  currentLevel: string,
): boolean {
  if (!plano) return false;
  const planLevels = PLAN_FEATURE_LEVELS[plano];
  if (!planLevels) return false;

  const baseLevel = planLevels[feature];
  if (!baseLevel) return false;

  if (baseLevel.startsWith("Adicional")) return false;
  if (baseLevel === currentLevel) return true;

  if (feature === "Quantidade de páginas") {
    const matchBase = baseLevel.match(/\d+/);
    const matchCurrent = currentLevel.match(/\d+/);
    const baseNum = matchBase ? parseInt(matchBase[0], 10) : 1;
    const currentNum = matchCurrent ? parseInt(matchCurrent[0], 10) : 1;
    return currentNum <= baseNum;
  }

  if (feature === "Integração externa") {
    if (plano === "essencial") {
      const matchCurrent = currentLevel.match(/\d+/);
      const currentNum = matchCurrent ? parseInt(matchCurrent[0], 10) : 1;
      return currentNum <= 2;
    }
    if (plano === "profissional") {
      const matchCurrent = currentLevel.match(/\d+/);
      const currentNum = matchCurrent ? parseInt(matchCurrent[0], 10) : 1;
      return currentNum <= 4;
    }
    return false;
  }

  const getWeight = (lvl: string): number => {
    if (lvl.startsWith("Adicional") || lvl.startsWith("Sem plano mensal")) return 0;
    if (lvl.startsWith("Simples") || lvl === "Pixel Básico" || lvl === "Básico (Template)")
      return 1;
    if (
      lvl.startsWith("Básic") ||
      lvl === "Painel Básico" ||
      lvl === "E-mail básico" ||
      lvl === "Guia Rápido" ||
      lvl === "Limitada" ||
      lvl === "Mensal" ||
      lvl === "Eventos Principais"
    )
      return 2;
    if (lvl.startsWith("Padrão") || lvl === "Fluidas" || lvl === "GA4 Padrão") return 3;
    if (
      lvl.startsWith("Incluíd") ||
      lvl === "Incluído" ||
      lvl === "Completo" ||
      lvl === "Completa" ||
      lvl === "Múltiplas" ||
      lvl === "Múltiplos" ||
      lvl === "Integração CRM" ||
      lvl === "Dashboard Online" ||
      lvl === "Fluxo avançado" ||
      lvl === "Vídeo-tutorial"
    )
      return 4;
    if (
      lvl.startsWith("Avançad") ||
      lvl === "GA4 Completo" ||
      lvl === "Eventos Customizados" ||
      lvl === "Avançado e Dinâmico"
    )
      return 5;
    return 3;
  };

  return getWeight(currentLevel) <= getWeight(baseLevel);
}
