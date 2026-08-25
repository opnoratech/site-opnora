import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Logo } from "@/components/site/layout/Logo";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Turnstile } from "@marsidev/react-turnstile";
import { HeroMedia } from "@/components/performance/HeroMedia";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const { session, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Se já estiver logado, redireciona pro admin
    if (session && !loading) {
      navigate({ to: "/admin" });
    }
  }, [session, loading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!turnstileToken) {
      toast.error("Por favor, valide que você não é um robô.");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
          captchaToken: turnstileToken,
        },
      });

      if (error) {
        toast.error("Erro no login", {
          description:
            error.message === "Invalid login credentials"
              ? "Email ou senha incorretos."
              : error.message,
        });
      } else {
        toast.success("Login efetuado com sucesso!");
        navigate({ to: "/admin" });
      }
    } catch (err) {
      toast.error("Erro inesperado ao tentar fazer login.");
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-[#050507]">
        <Loader2 className="size-8 animate-spin text-aurora-violet" />
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex items-center justify-center bg-[#050507] p-4 relative overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <HeroMedia
          src="/images/aurora_contact_real.webp"
          width={1920}
          height={1080}
          isPriority={true}
          alt="Login Background"
        />
        <div className="absolute inset-0 bg-[#050507]/70 backdrop-blur-md md:backdrop-blur-3xl"></div>
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-aurora-violet/15 blur-[50px] md:blur-[100px] rounded-full pointer-events-none z-0"></div>

      <ScrollReveal delay={100} className="w-full max-w-[440px] relative z-10">
        {/* Form Card */}
        <div className="bg-[#0c0c0f]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col items-center mb-8">
            <div className="mb-6 p-4 rounded-2xl bg-white/[0.03] border border-white/5 shadow-inner">
              <Logo className="w-32" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2 text-center tracking-tight">
              Painel Administrativo
            </h1>
            <p className="text-slate-400 text-sm text-center">
              Faça login para acessar e gerenciar a plataforma.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-2 uppercase tracking-wider font-semibold">
                E-mail
              </label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500 group-focus-within:text-aurora-violet transition-colors">
                  <Mail className="size-4.5" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#121218] border border-white/10 text-white rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-aurora-violet focus:shadow-[0_0_15px_rgba(162,128,255,0.15)] transition-all duration-300 placeholder:text-slate-600"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-2 uppercase tracking-wider font-semibold">
                Senha
              </label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500 group-focus-within:text-aurora-violet transition-colors">
                  <Lock className="size-4.5" />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  required
                  className="w-full bg-[#121218] border border-white/10 text-white rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-aurora-violet focus:shadow-[0_0_15px_rgba(162,128,255,0.15)] transition-all duration-300 placeholder:text-slate-600"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Cloudflare Turnstile */}
            <div className="flex justify-center mt-2">
              <Turnstile
                siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
                onSuccess={(token) => setTurnstileToken(token)}
                options={{
                  theme: "dark",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-aurora-violet via-[#6b8cff] to-aurora-cyan text-black py-4 rounded-xl font-bold uppercase tracking-wider text-xs hover:brightness-110 shadow-[0_0_20px_rgba(162,128,255,0.2)] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none group"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Autenticando...
                </>
              ) : (
                <>
                  Entrar no Painel
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </ScrollReveal>
    </div>
  );
}
