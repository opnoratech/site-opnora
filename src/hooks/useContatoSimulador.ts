import React, { useState, useEffect } from "react";
import {
  OBJECTIVE_OPTIONS,
  INVESTMENT_OPTIONS,
  PLAN_FEATURE_LEVELS,
  PLAN_META,
  PlanKey,
  getIncludedFeatures,
  getAvailableLevels,
  isFeatureIncludedInPlan,
} from "@/data/pricing";

export interface ContactFormData {
  nome: string;
  empresa: string;
  email: string;
  whatsapp: string;
  cidade: string;
  descricao: string;
  prazo: string;
  investimento: string;
  comoConheceu: string;
  evolucao: string;
}

export function useContatoSimulador(defaultPlano?: string) {
  // Controle de Etapas: 1, 2, 3 ou 4
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Estados de Seleções
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>([]);
  const [selectedSolutions, setSelectedSolutions] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  // Estados de Accordion de Recursos (Etapa 3)
  const [openCategories, setOpenCategories] = useState<Set<string>>(() => new Set());

  // Nível customizado por recurso
  const [featureLevels, setFeatureLevels] = useState<Record<string, string>>({});

  // Plano base selecionado como partida
  const [basePlano, setBasePlano] = useState<string>(() => {
    if (defaultPlano && ["landing", "essencial", "profissional"].includes(defaultPlano)) {
      return defaultPlano;
    }
    return "sobmedida";
  });

  // Formulário Cadastral (Etapa 4)
  const [formData, setFormData] = useState<ContactFormData>({
    nome: "",
    empresa: "",
    email: "",
    whatsapp: "",
    cidade: "",
    descricao: "",
    prazo: "",
    investimento: "A definir",
    comoConheceu: "",
    evolucao: "essencial",
  });

  // Controle de Erros de Validação da Etapa 4
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Rastreamento do passo máximo alcançado
  const [maxStepReached, setMaxStepReached] = useState<number>(1);
  const [isPlanLocked, setIsPlanLocked] = useState(
    !!defaultPlano && ["landing", "essencial", "profissional"].includes(defaultPlano)
  );

  // Accordion Mobile do Resumo
  const [mobileResumoOpen, setMobileResumoOpen] = useState(false);

  // Ativo para a tooltip selecionada no Objetivo (para acessibilidade/mobile)
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Controle do dropdown de investimento customizado
  const [isInvestimentoOpen, setIsInvestimentoOpen] = useState(false);
  // Controle do dropdown de como conheceu customizado
  const [isComoConheceuOpen, setIsComoConheceuOpen] = useState(false);

  // Controle de Envio
  const [submitted, setSubmitted] = useState(false);

  // Efeito para preencher via plano padrão e pular para a etapa 4
  useEffect(() => {
    if (defaultPlano) {
      if (defaultPlano === "sobmedida") {
        setBasePlano("sobmedida");
        setCurrentStep(1);
        return;
      }

      let newObjectives: string[] = [];
      let newSolutions: string[] = [];
      let newEvolucao = "essencial";
      let newInvestimento = "A definir";
      let newFeatures: string[] = [];
      let planLevels: Record<string, string> = {};
      let targetStep = 4;

      if (["landing", "essencial", "profissional"].includes(defaultPlano)) {
        setBasePlano(defaultPlano);
        if (defaultPlano === "landing") {
          newObjectives = ["captar"];
          newSolutions = ["Landing page"];
          newInvestimento = "De R$ 500 a R$ 1.000";
        } else if (defaultPlano === "essencial") {
          newObjectives = ["apresentar"];
          newSolutions = ["Site institucional"];
          newInvestimento = "De R$ 1.000 a R$ 2.000";
        } else if (defaultPlano === "profissional") {
          newObjectives = ["apresentar", "captar"];
          newSolutions = ["Site institucional", "Dashboard"];
          newEvolucao = "completa";
          newInvestimento = "De R$ 2.000 a R$ 5.000";
        }
        newFeatures = getIncludedFeatures(defaultPlano);
        planLevels = PLAN_FEATURE_LEVELS[defaultPlano] || {};
      } else {
        setBasePlano("sobmedida");
        targetStep = 1;

        if (defaultPlano === "trafego") {
          newObjectives = ["captar"];
          newSolutions = ["Tráfego pago e estrutura de campanha"];
          newFeatures = ["Tráfego pago e campanhas"];
          planLevels = { "Tráfego pago e campanhas": "Adicional (+ R$ 399/mês)" };
          newInvestimento = "Até R$ 500";
        } else if (defaultPlano === "manutencao") {
          newObjectives = ["digitalizar"];
          newSolutions = ["Manutenção e evolução"];
          newFeatures = ["Manutenção estendida"];
          planLevels = { "Manutenção estendida": "Adicional (+ R$ 149/mês)" };
          newInvestimento = "Até R$ 500";
        } else if (defaultPlano === "automacao") {
          newObjectives = ["automatizar"];
          newSolutions = ["Automação"];
          newFeatures = ["Automação com IA (Chatbots/N8N)"];
          planLevels = { "Automação com IA (Chatbots/N8N)": "Adicional (+ R$ 479/mês)" };
          newInvestimento = "Até R$ 500";
        } else if (defaultPlano === "dashboard") {
          newObjectives = ["dashboard"];
          newSolutions = ["Dashboard"];
          newFeatures = ["Dashboard e Métricas Inteligentes"];
          planLevels = { "Dashboard e Métricas Inteligentes": "Adicional (+ R$ 299)" };
          newInvestimento = "Até R$ 500";
        }
      }

      setSelectedObjectives(newObjectives);
      setSelectedSolutions(newSolutions);
      setSelectedFeatures(newFeatures);
      setFeatureLevels({ ...planLevels });

      setFormData((prev) => ({
        ...prev,
        evolucao: newEvolucao,
        investimento: newInvestimento,
      }));

      setCurrentStep(targetStep);
      setMaxStepReached(targetStep);

      // Scroll suave para o simulador
      setTimeout(() => {
        const el = document.getElementById("personalize");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 500);
    } else {
      setBasePlano("sobmedida");
      setIsPlanLocked(false);
      setCurrentStep(1);
      setMaxStepReached(1);
      setSelectedObjectives([]);
      setSelectedSolutions([]);
      setSelectedFeatures([]);
      setFeatureLevels({});
      setFormData((prev) => ({
        ...prev,
        evolucao: "essencial",
        investimento: "A definir",
      }));
    }
  }, [defaultPlano]);

  /* ---------- Handlers de Seleção ---------- */

  const handleBasePlanoChange = (planoId: string) => {
    setBasePlano(planoId);

    if (planoId === "sobmedida") {
      setIsPlanLocked(false);
      setSelectedObjectives([]);
      setSelectedSolutions([]);
      setSelectedFeatures([]);
      setFeatureLevels({});
      setFormData((prev) => ({
        ...prev,
        evolucao: "essencial",
        investimento: "A definir",
      }));
      return;
    }

    let newObjectives: string[] = [];
    let newSolutions: string[] = [];
    let newEvolucao = "essencial";
    let newInvestimento = "A definir";

    if (planoId === "landing") {
      newObjectives = ["captar"];
      newSolutions = ["Landing page"];
      newInvestimento = "De R$ 500 a R$ 1.000";
    } else if (planoId === "essencial") {
      newObjectives = ["apresentar"];
      newSolutions = ["Site institucional"];
      newInvestimento = "De R$ 1.000 a R$ 2.000";
    } else if (planoId === "profissional") {
      newObjectives = ["apresentar", "captar"];
      newSolutions = ["Site institucional", "Dashboard"];
      newEvolucao = "completa";
      newInvestimento = "De R$ 2.000 a R$ 5.000";
    }

    const newFeatures = getIncludedFeatures(planoId);

    const keepExtraFeatures = selectedFeatures.filter((f) => {
      return (
        !getIncludedFeatures("landing").includes(f) &&
        !getIncludedFeatures("essencial").includes(f) &&
        !getIncludedFeatures("profissional").includes(f)
      );
    });

    setSelectedObjectives(newObjectives);
    setSelectedSolutions(newSolutions);
    setSelectedFeatures([...newFeatures, ...keepExtraFeatures]);

    const planLevels = PLAN_FEATURE_LEVELS[planoId] || {};
    const extraLevels: Record<string, string> = {};
    keepExtraFeatures.forEach((f) => {
      if (featureLevels[f]) extraLevels[f] = featureLevels[f];
    });
    setFeatureLevels({ ...planLevels, ...extraLevels });

    setFormData((prev) => ({
      ...prev,
      evolucao: newEvolucao,
      investimento: newInvestimento,
    }));

    setIsPlanLocked(true);
  };

  const toggleObjective = (id: string) => {
    setSelectedObjectives((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSolution = (sol: string) => {
    setSelectedSolutions((prev) =>
      prev.includes(sol) ? prev.filter((item) => item !== sol) : [...prev, sol]
    );
  };

  const toggleFeature = (feat: string) => {
    const isRemoving = selectedFeatures.includes(feat);
    setSelectedFeatures((prev) =>
      isRemoving ? prev.filter((item) => item !== feat) : [...prev, feat]
    );
    if (!isRemoving) {
      const currentLevel = featureLevels[feat];
      if (!currentLevel || currentLevel.startsWith("Adicional")) {
        const available = getAvailableLevels(feat);
        if (available.length > 0) {
          setFeatureLevels((prev) => ({
            ...prev,
            [feat]: available[0],
          }));
        }
      }
    }
  };

  const handlePagesChange = (amount: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const currentVal = featureLevels["Quantidade de páginas"] || "1 página";
    const match = currentVal.match(/\d+/);
    let currentPages = match ? parseInt(match[0], 10) : 1;
    let newPages = Math.max(1, currentPages + amount);
    setFeatureLevels((prev) => ({
      ...prev,
      "Quantidade de páginas": `${newPages} ${newPages === 1 ? "página" : "páginas"}`,
    }));
    if (!selectedFeatures.includes("Quantidade de páginas")) {
      setSelectedFeatures((prev) => [...prev, "Quantidade de páginas"]);
    }
  };

  const handleIntegrationsChange = (amount: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const currentVal = featureLevels["Integração externa"] || "1 integração";
    const match = currentVal.match(/\d+/);
    let currentCount = match ? parseInt(match[0], 10) : 1;
    let newCount = Math.max(1, currentCount + amount);
    setFeatureLevels((prev) => ({
      ...prev,
      "Integração externa": `${newCount} ${newCount === 1 ? "integração" : "integrações"}`,
    }));
    if (!selectedFeatures.includes("Integração externa")) {
      setSelectedFeatures((prev) => [...prev, "Integração externa"]);
    }
  };

  const toggleCategory = (catName: string) => {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(catName)) next.delete(catName);
      else next.add(catName);
      return next;
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const getProjectClassification = () => {
    const hasAnySelection =
      selectedObjectives.length > 0 || selectedSolutions.length > 0 || selectedFeatures.length > 0;
    if (!hasAnySelection) {
      return {
        label: "Aguardando seleções",
        color: "text-slate-450 border-white/10 bg-white/[0.02] opacity-80",
        desc: "Selecione objetivos, soluções ou recursos para simular o porte do seu projeto.",
      };
    }

    const hasHelpNeeded =
      selectedObjectives.includes("orientacao") ||
      selectedSolutions.includes("Outra solução") ||
      selectedFeatures.includes("Outro recurso (Descrever no final)") ||
      formData.investimento === "A definir" ||
      formData.evolucao === "orientacao";

    if (hasHelpNeeded) {
      return {
        label: "Necessita análise técnica",
        color: "text-amber-450 border-amber-400/20 bg-amber-400/10",
        desc: "Sua solicitação possui opções personalizadas ou dúvidas que nossa equipe analisará detalhadamente para te orientar.",
      };
    }

    const featureCount = selectedFeatures.length;
    const hasComplexSolutions = selectedSolutions.some((sol) =>
      [
        "E-commerce",
        "Sistema web",
        "Plataforma digital",
        "CRM ou gestão comercial",
        "Aplicativo mobile (iOS / Android)",
      ].includes(sol)
    );
    const hasMediumSolutions = selectedSolutions.some((sol) =>
      [
        "Site institucional",
        "Painel administrativo",
        "Dashboard",
        "Automação",
        "Assistente ou chatbot com IA",
        "Integração entre sistemas",
      ].includes(sol)
    );

    let level = "inicial";

    if (hasComplexSolutions || featureCount > 15) {
      level = "completa";
    } else if (hasMediumSolutions || featureCount > 8) {
      level = "intermediario";
    }

    if (isPlanLocked && basePlano !== "sobmedida") {
      if (basePlano === "landing") {
        level = "inicial";
      } else if (basePlano === "essencial") {
        level = "intermediario";
      } else if (basePlano === "profissional") {
        level = "completa";
      }
    }

    if (level === "completa") {
      return {
        label: "Solução mais completa",
        color: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
        desc: "Desenvolvimento avançado envolvendo inteligência artificial, múltiplas automações ou sistemas robustos integrados.",
      };
    }

    if (level === "intermediario") {
      return {
        label: "Projeto intermediário",
        color: "text-purple-400 border-purple-400/30 bg-purple-400/10",
        desc: "Projetos institucionais completos, sistemas comerciais padrão ou fluxos integrados de média escala.",
      };
    }

    return {
      label: "Estrutura inicial",
      color: "text-blue-400 border-blue-400/30 bg-blue-400/10",
      desc: "Indicado para projetos focados em MVP, landing pages simples ou recursos essenciais de partida.",
    };
  };

  const generateWhatsappUrl = () => {
    const objectivesText = selectedObjectives
      .map((id) => OBJECTIVE_OPTIONS.find((o) => o.id === id)?.label)
      .filter(Boolean)
      .join(", ");

    const solutionsText = selectedSolutions.join(", ");
    const featuresText = selectedFeatures.join(", ");

    const lines = [
      `*SOLICITAÇÃO DE PROJETO PERSONALIZADO — OPNORA*`,
      ``,
      `*DADOS DO CLIENTE:*`,
      `• Nome: ${formData.nome}`,
      `• Empresa: ${formData.empresa || "Não informada"}`,
      `• E-mail: ${formData.email}`,
      `• WhatsApp: ${formData.whatsapp}`,
      `• Localização: ${formData.cidade || "Não informada"}`,
      ``,
      `*DETALHES DO PROJETO:*`,
      `• Objetivos: ${objectivesText || "Nenhum selecionado"}`,
      `• Solução imaginada: ${solutionsText || "Nenhuma selecionada"}`,
      `• Recursos selecionados: ${featuresText || "Nenhum selecionado"}`,
      `• Prefere começar menor: ${
        formData.evolucao === "essencial"
          ? "Sim, começar com o essencial"
          : formData.evolucao === "completa"
            ? "Não, solução completa desde o início"
            : "Precisa de orientação"
      }`,
      `• Prazo desejado: ${formData.prazo || "A definir na análise"}`,
      `• Investimento aproximado: ${formData.investimento}`,
      ``,
      `*PROBLEMA OU IDEIA:*`,
      formData.descricao || "Sem descrição informada.",
    ];

    const message = encodeURIComponent(lines.join("\n"));
    return `https://wa.me/5585999973965?text=${message}`;
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      if (nextStep > maxStepReached) {
        setMaxStepReached(nextStep);
      }
      const el = document.getElementById("personalize-form-box");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      const el = document.getElementById("personalize-form-box");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.nome.trim()) errors.nome = "O nome é obrigatório.";
    if (!formData.email.trim()) {
      errors.email = "O e-mail é obrigatório.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "E-mail inválido.";
    }
    if (!formData.whatsapp.trim()) errors.whatsapp = "O WhatsApp é obrigatório.";

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setSubmitted(true);
  };

  const getEstimatedPrice = () => {
    let basePrice = 0;
    let baseName = "";

    if (basePlano === "landing") {
      basePrice = 687;
      baseName = "Landing Page";
    } else if (basePlano === "essencial") {
      basePrice = 906;
      baseName = "Essencial";
    } else if (basePlano === "profissional") {
      basePrice = 1678;
      baseName = "Profissional";
    } else {
      basePrice = 0;
      baseName = "Sob medida";
    }

    let extraMonthly = 0;

    selectedFeatures.forEach((feat) => {
      const currentLevel = featureLevels[feat];
      const isInc = isFeatureIncludedInPlan(basePlano, feat, currentLevel || "");
      if (!isInc) {
        if (feat === "Tráfego pago e campanhas") {
          extraMonthly += 399;
        } else if (feat === "Manutenção estendida") {
          extraMonthly += 149;
        } else if (feat === "Automação com IA (Chatbots/N8N)") {
          extraMonthly += 479;
        } else if (feat === "Dashboard e Métricas Inteligentes") {
          extraMonthly += 299;
        }
      }
    });

    return {
      basePrice,
      baseName,
      extraMonthly,
      totalInitial: basePrice,
      totalMonthly: extraMonthly,
    };
  };

  const classification = getProjectClassification();

  // Recursos padrão do plano base selecionado
  const standardFeatures = basePlano !== "sobmedida" ? getIncludedFeatures(basePlano) : [];
  // Recursos padrão que foram desativados
  const removedFeatures = standardFeatures.filter((f) => !selectedFeatures.includes(f));

  const changeFeatureLevel = (item: string, lvl: string) => {
    setFeatureLevels((prev) => ({
      ...prev,
      [item]: lvl,
    }));
  };

  const resetSimulador = () => {
    setSubmitted(false);
    setCurrentStep(1);
    setMaxStepReached(1);
    setSelectedObjectives([]);
    setSelectedSolutions([]);
    setSelectedFeatures([]);
    setFeatureLevels({});
    setFormData({
      nome: "",
      empresa: "",
      email: "",
      whatsapp: "",
      cidade: "",
      descricao: "",
      prazo: "",
      investimento: "A definir",
      comoConheceu: "",
      evolucao: "essencial",
    });
    setValidationErrors({});
    setIsPlanLocked(false);
  };

  return {
    currentStep,
    setCurrentStep,
    maxStepReached,
    setMaxStepReached,
    selectedObjectives,
    setSelectedObjectives,
    selectedSolutions,
    setSelectedSolutions,
    selectedFeatures,
    setSelectedFeatures,
    featureLevels,
    setFeatureLevels,
    openCategories,
    setOpenCategories,
    basePlano,
    setBasePlano,
    isPlanLocked,
    setIsPlanLocked,
    formData,
    setFormData,
    validationErrors,
    setValidationErrors,
    mobileResumoOpen,
    setMobileResumoOpen,
    activeTooltip,
    setActiveTooltip,
    isInvestimentoOpen,
    setIsInvestimentoOpen,
    isComoConheceuOpen,
    setIsComoConheceuOpen,
    submitted,
    setSubmitted,
    handleBasePlanoChange,
    toggleObjective,
    toggleSolution,
    toggleFeature,
    handlePagesChange,
    handleIntegrationsChange,
    toggleCategory,
    handleChange,
    classification,
    getEstimatedPrice,
    generateWhatsappUrl,
    handleNextStep,
    handlePrevStep,
    handleFormSubmit,
    removedFeatures,
    changeFeatureLevel,
    resetSimulador,
  };
}
