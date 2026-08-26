import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, ShieldCheck } from "lucide-react";
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
    <div className="fixed bottom-4 left-4 z-[100] w-[calc(100%-2rem)] sm:w-[340px] animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="bg-[#0A0A0F]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
        {/* Glow sutil */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/10 blur-[40px] pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-1">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-purple-400" />
              <span className="text-white text-sm font-display font-medium tracking-wide">
                Privacidade
              </span>
            </div>
            <button
              onClick={() => handleConsent(false)}
              className="text-slate-500 hover:text-white transition-colors"
              aria-label="Fechar"
            >
              <X className="size-4" />
            </button>
          </div>

          <p className="text-[13px] text-slate-400 leading-relaxed mb-4">
            Utilizamos cookies para melhorar o site e suas campanhas. Você pode acessar nossa{" "}
            <Link
              to="/privacidade"
              className="text-slate-200 hover:text-white underline underline-offset-2 decoration-white/20 hover:decoration-white/50 transition-colors"
            >
              Política de Privacidade
            </Link>{" "}
            para detalhes.
          </p>

          <div className="flex gap-2 w-full mt-1">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-9 text-[11px] font-mono uppercase tracking-wider bg-transparent border-white/10 text-slate-400 hover:bg-white/5 hover:text-white"
              onClick={() => handleConsent(false)}
            >
              Recusar
            </Button>
            <Button
              size="sm"
              className="flex-1 h-9 text-[11px] font-mono font-bold uppercase tracking-wider bg-white text-black hover:bg-slate-200"
              onClick={() => handleConsent(true)}
            >
              Aceitar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
