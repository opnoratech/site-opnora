import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verificar se já existe consentimento salvo
    const storedConsent = localStorage.getItem("opnora_consent");
    if (!storedConsent) {
      // Pequeno atraso para não atrapalhar o carregamento inicial (LCP)
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (acceptAll: boolean) => {
    const consent = {
      ad_storage: acceptAll ? "granted" : "denied",
      ad_user_data: acceptAll ? "granted" : "denied",
      ad_personalization: acceptAll ? "granted" : "denied",
      analytics_storage: acceptAll ? "granted" : "denied",
    };

    // Salvar localmente
    localStorage.setItem("opnora_consent", JSON.stringify(consent));

    // Ocultar banner
    setIsVisible(false);

    // Enviar atualização para o Google Analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", consent);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-0 right-0 z-[100] px-4 flex justify-center animate-in fade-in slide-in-from-bottom-5 duration-700 pointer-events-none">
      <div className="bg-[#0c0c14]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl w-full max-w-[850px] relative overflow-hidden pointer-events-auto">
        {/* Glow sutil */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/15 blur-[40px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 justify-between">
          <p className="text-[14px] text-slate-300 leading-relaxed flex-1">
            A gente usa cookies pra melhorar sua experiência e medir a performance da página. Você escolhe. A Opnora é a controladora dos dados (LGPD).{" "}
            <Link
              to="/privacidade"
              className="text-[#a280ff] hover:text-[#b498ff] underline underline-offset-2 decoration-[#a280ff]/40 hover:decoration-[#a280ff] transition-colors whitespace-nowrap"
            >
              Saiba mais.
            </Link>
          </p>

          <div className="flex gap-3 w-full md:w-auto shrink-0 justify-end mt-2 md:mt-0">
            <button
              className="flex-1 md:flex-none px-5 py-2.5 rounded-full text-[13px] font-medium text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white transition-colors"
              onClick={() => handleConsent(false)}
            >
              Só essenciais
            </button>
            <button
              className="flex-1 md:flex-none px-6 py-2.5 rounded-full text-[13px] font-bold text-black bg-[#a280ff] hover:bg-[#9066ff] transition-colors uppercase tracking-wide"
              onClick={() => handleConsent(true)}
            >
              ACEITAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
