declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Envia um evento customizado para o Google Analytics
 */
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  } else {
    // Apenas para debug local, evita erros no console de produção
    if (import.meta.env.DEV) {
      console.log(`[Analytics] GA Event: ${eventName}`, params);
    }
  }
};

/**
 * Registra clique no botão do WhatsApp
 * @param location Onde o botão foi clicado (ex: "footer", "hero", "header")
 */
export const trackWhatsAppClick = (location: string) => {
  trackEvent("whatsapp_click", {
    click_location: location,
  });
};

/**
 * Registra o envio bem-sucedido do formulário de contato
 * @param plan (Opcional) Plano escolhido se for formulário de simulador
 */
export const trackFormSubmit = (plan?: string) => {
  trackEvent("generate_lead", {
    lead_source: "contact_form",
    plan_interest: plan || "nenhum",
  });
};

/**
 * Registra visualização de proposta
 * @param proposalId ID da proposta visualizada
 * @param clientName Nome do cliente que a proposta pertence
 */
export const trackProposalView = (proposalId: string, clientName?: string) => {
  trackEvent("proposal_view", {
    proposal_id: proposalId,
    client_name: clientName || "desconhecido",
  });
};
