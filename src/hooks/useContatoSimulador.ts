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
}

export function useContatoSimulador(defaultPlano?: string, defaultNivel?: string) {
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
  });

  // Controle de Erros de Validação da Etapa 4
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Rastreamento do passo máximo alcançado
  const [maxStepReached, setMaxStepReached] = useState<number>(1);
  const [isPlanLocked, setIsPlanLocked] = useState(
    !!defaultPlano && ["landing", "essencial", "profissional"].includes(defaultPlano),
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

  // Efeito para preencher via plano padrão e navegar para a etapa adequada
  useEffect(() => {
    if (defaultPlano) {
      if (defaultPlano === "sobmedida") {
        setBasePlano("sobmedida");
        setCurrentStep(1);
        return;
      }

      let newObjectives: string[] = [];
      let newSolutions: string[] = [];
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
          newInvestimento = "De R$ 2.000 a R$ 5.000";
        }
        newFeatures = getIncludedFeatures(defaultPlano);
        planLevels = PLAN_FEATURE_LEVELS[defaultPlano] || {};
      } else {
        setBasePlano("sobmedida");
        targetStep = 3; // Redireciona diretamente para Etapa 3 (RECURSOS & NÍVEIS)
        setOpenCategories(new Set(["Serviços Adicionais"]));

        if (defaultPlano === "trafego") {
          newObjectives = ["captar"];
          newSolutions = ["Tráfego pago e estrutura de campanha"];
          newFeatures = ["Tráfego pago e campanhas"];
          const isEscala =
            defaultNivel?.toLowerCase().includes("escala") ||
            defaultNivel?.toLowerCase().includes("gestão") ||
            defaultNivel?.toLowerCase().includes("700");
          planLevels = {
            "Tráfego pago e campanhas": isEscala
              ? "Gestão de tráfego + Escala"
              : "Setup de campanha inicial",
          };
          newInvestimento = isEscala ? "De R$ 500 a R$ 1.000" : "Até R$ 500";
        } else if (defaultPlano === "manutencao") {
          newObjectives = ["digitalizar"];
          newSolutions = ["Manutenção e evolução"];
          newFeatures = ["Plano mensal de evolução/suporte"];
          planLevels = { "Plano mensal de evolução/suporte": "1 mês" };
          newInvestimento = "Até R$ 500";
        } else if (defaultPlano === "automacao") {
          newObjectives = ["automatizar"];
          newSolutions = ["Automação"];
          newFeatures = ["Automação com IA (Chatbots/N8N)"];
          const isAvancada =
            defaultNivel?.toLowerCase().includes("avançad") ||
            defaultNivel?.toLowerCase().includes("ia") ||
            defaultNivel?.toLowerCase().includes("600");
          planLevels = {
            "Automação com IA (Chatbots/N8N)": isAvancada
              ? "Automação avançada com IA"
              : "Fluxo básico de leads",
          };
          newInvestimento = isAvancada ? "De R$ 500 a R$ 1.000" : "Até R$ 500";
        } else if (defaultPlano === "dashboard") {
          newObjectives = ["dashboard"];
          newSolutions = ["Dashboard"];
          newFeatures = ["Dashboard e Métricas Inteligentes"];
          const isAvancado =
            defaultNivel?.toLowerCase().includes("avança") ||
            defaultNivel?.toLowerCase().includes("400");
          planLevels = {
            "Dashboard e Métricas Inteligentes": isAvancado
              ? "Dashboard avançado"
              : "Dashboard simples",
          };
          newInvestimento = "Até R$ 500";
        }
      }

      setSelectedObjectives(newObjectives);
      setSelectedSolutions(newSolutions);
      setSelectedFeatures(newFeatures);
      setFeatureLevels({ ...planLevels });

      setFormData((prev) => ({
        ...prev,
        investimento: newInvestimento,
      }));

      setCurrentStep(targetStep);
      setMaxStepReached(targetStep);

      // Scroll suave para o simulador
      setTimeout(() => {
        const el = document.getElementById("personalize");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
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
        investimento: "A definir",
      }));
    }
  }, [defaultPlano, defaultNivel]);

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
        investimento: "A definir",
      }));
      if (typeof window !== "undefined" && window.location.search.includes("plano=")) {
        window.history.replaceState({}, "", window.location.pathname);
      }
      return;
    }

    let newObjectives: string[] = [];
    let newSolutions: string[] = [];
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
      investimento: newInvestimento,
    }));

    setIsPlanLocked(true);
  };

  const toggleObjective = (id: string) => {
    setSelectedObjectives((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleSolution = (sol: string) => {
    setSelectedSolutions((prev) =>
      prev.includes(sol) ? prev.filter((item) => item !== sol) : [...prev, sol],
    );
  };

  const toggleFeature = (feat: string) => {
    const isRemoving = selectedFeatures.includes(feat);
    setSelectedFeatures((prev) =>
      isRemoving ? prev.filter((item) => item !== feat) : [...prev, feat],
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
    const currentPages = match ? parseInt(match[0], 10) : 1;
    const newPages = Math.max(1, currentPages + amount);
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
    const currentCount = match ? parseInt(match[0], 10) : 1;
    const newCount = Math.max(1, currentCount + amount);
    setFeatureLevels((prev) => ({
      ...prev,
      "Integração externa": `${newCount} ${newCount === 1 ? "integração" : "integrações"}`,
    }));
    if (!selectedFeatures.includes("Integração externa")) {
      setSelectedFeatures((prev) => [...prev, "Integração externa"]);
    }
  };

  const handleSupportMonthsChange = (amount: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const currentVal = featureLevels["Plano mensal de evolução/suporte"] || "1 mês";
    const match = currentVal.match(/\d+/);
    const currentCount = match ? parseInt(match[0], 10) : 1;
    const newCount = Math.max(1, currentCount + amount);
    setFeatureLevels((prev) => ({
      ...prev,
      "Plano mensal de evolução/suporte": `${newCount} ${newCount === 1 ? "mês" : "meses"}`,
    }));
    if (!selectedFeatures.includes("Plano mensal de evolução/suporte")) {
      setSelectedFeatures((prev) => [...prev, "Plano mensal de evolução/suporte"]);
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
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
      formData.investimento === "A definir";

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
      ].includes(sol),
    );
    const hasMediumSolutions = selectedSolutions.some((sol) =>
      [
        "Site institucional",
        "Painel administrativo",
        "Dashboard",
        "Automação",
        "Assistente ou chatbot com IA",
        "Integração entre sistemas",
      ].includes(sol),
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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.nome.trim()) errors.nome = "O nome é obrigatório.";
    if (!formData.email.trim()) {
      errors.email = "O e-mail é obrigatório.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "E-mail inválido.";
    }
    if (!formData.comoConheceu.trim()) {
      errors.comoConheceu = "Selecione uma opção.";
    }
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      const pricingEstimate = getEstimatedPrice();
      const objectivesText = selectedObjectives
        .map((id) => `• ${OBJECTIVE_OPTIONS.find((o) => o.id === id)?.label}`)
        .filter(Boolean)
        .join("<br />");
      const solutionsText = selectedSolutions
        .map((sol) => `• ${sol}`)
        .join("<br />");
      const featuresText = selectedFeatures
        .map((feat) => `• ${feat} (${featureLevels[feat] || "Padrão"})`)
        .join("<br />");

      const basePlanoLabel =
        basePlano === "landing"
          ? "Landing Page"
          : basePlano === "essencial"
            ? "Essencial"
            : basePlano === "profissional"
              ? "Profissional"
              : "Sob medida";

      const estimativaPrecoText =
        pricingEstimate.basePrice > 0 || pricingEstimate.extraMonthly > 0
          ? `R$ ${pricingEstimate.basePrice} (Inicial) + R$ ${pricingEstimate.extraMonthly}/mês`
          : "Sob consulta";

      // Disparar envio de email via API serverless
      await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "simulador",
          nome: formData.nome,
          empresa: formData.empresa,
          email: formData.email,
          whatsapp: formData.whatsapp,
          cidade: formData.cidade,
          descricao: formData.descricao,
          prazo: formData.prazo,
          investimento: formData.investimento,
          objectives: objectivesText,
          solutions: solutionsText,
          features: featuresText,
          basePlanoLabel,
          estimativaPreco: estimativaPrecoText,
        }),
      });
    } catch (err) {
      console.error("Erro ao registrar e-mail no simulador:", err);
    }

    setSubmitted(true);
    setTimeout(() => {
      const el = document.getElementById("personalize");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const getEstimatedPrice = () => {
    let basePrice = 0;
    let baseName = "";

    if (basePlano === "landing") {
      basePrice = 700;
      baseName = "Landing Page";
    } else if (basePlano === "essencial") {
      basePrice = 1200;
      baseName = "Essencial";
    } else if (basePlano === "profissional") {
      basePrice = 2000;
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
          extraMonthly += currentLevel === "Gestão de tráfego + Escala" ? 700 : 350;
        } else if (feat === "Plano mensal de evolução/suporte") {
          const match = currentLevel ? currentLevel.match(/\d+/) : null;
          const months = match ? parseInt(match[0], 10) : 1;
          extraMonthly += 150 * months;
        } else if (feat === "Automação com IA (Chatbots/N8N)") {
          extraMonthly += currentLevel === "Automação avançada com IA" ? 600 : 300;
        } else if (feat === "Dashboard e Métricas Inteligentes") {
          extraMonthly += currentLevel === "Dashboard avançado" ? 400 : 200;
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
    });
    setValidationErrors({});
    setIsPlanLocked(false);
    setBasePlano("sobmedida");
    if (typeof window !== "undefined" && window.location.search.includes("plano=")) {
      window.history.replaceState({}, "", window.location.pathname);
    }
    setTimeout(() => {
      const el = document.getElementById("personalize");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
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
    handleSupportMonthsChange,
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
