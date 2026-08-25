import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

const ContatoSimulador = lazy(() =>
  import("@/components/site/contato/ContatoSimulador").then((m) => ({
    default: m.ContatoSimulador,
  })),
);

import {
  FaArrowRight,
  FaBuilding,
  FaCalculator,
  FaCheck,
  FaChevronDown,
  FaCircleInfo,
  FaCircleQuestion,
  FaCoins,
  FaEnvelope,
  FaInstagram,
  FaLinkedin,
  FaPaperPlane,
  FaPhone,
  FaUser,
  FaWhatsapp,
} from "react-icons/fa6";
import { toast } from "sonner";
import { z } from "zod";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export const Route = createFileRoute("/contato")({
  validateSearch: (
    search: Record<string, unknown>,
  ): { plano?: string; expansao?: string; nivel?: string } => {
    return {
      plano: search.plano as string | undefined,
      expansao: search.expansao as string | undefined,
      nivel: search.nivel as string | undefined,
    };
  },

  head: () => ({
    meta: [
      { title: "Contato | Opnora" },
      {
        name: "description",
        content:
          "Fale com a Opnora. Conte qual problema sua empresa precisa resolver e vamos pensar uma solução digital juntos.",
      },
      { property: "og:title", content: "Fale com a Opnora" },
      {
        property: "og:description",
        content: "Vamos construir uma solução juntos.",
      },
      { property: "og:url", content: "/contato" },
    ],
    links: [{ rel: "canonical", href: "/contato" }],
  }),
  component: ContatoPage,
});

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  whatsapp: z.string().trim().max(40).optional().or(z.literal("")),
  empresa: z.string().trim().max(120).optional().or(z.literal("")),
  tipo: z.string().min(1, "Selecione um tipo de contato"),
  mensagem: z.string().trim().min(10, "Conte um pouco mais (mín. 10 caracteres)").max(2000),
});

type FormState = z.infer<typeof schema>;

const TIPOS = [
  "Site profissional",
  "Sob Medida & Consultoria",
  "Plataforma web",
  "Dashboard / dados",
  "Automação / integração",
  "Evolução de projeto existente",
  "Dúvida ou suporte",
  "Outro assunto",
];

const FAQ_ITEMS = [
  {
    q: "Qual o prazo médio de desenvolvimento?",
    a: "O prazo varia de acordo com o escopo: landing pages levam de 1 a 2 semanas, sites institucionais de 2 a 4 semanas, e plataformas ou sistemas sob medida costumam levar a partir de 4 a 6 semanas.",
  },
  {
    q: "Como funciona a manutenção após a entrega?",
    a: "Garantimos o funcionamento do projeto e oferecemos planos de suporte contínuo para pequenas melhorias, atualizações de segurança e otimizações de infraestrutura.",
  },
  {
    q: "Quais são as formas de pagamento?",
    a: "Geralmente trabalhamos com entrada de 50% e os 50% restantes na entrega do projeto, ou parcelamento em até 12x no cartão de crédito diretamente pelo link de pagamento.",
  },
  {
    q: "Posso adicionar novos recursos futuramente?",
    a: "Com certeza. Desenvolvemos o código de forma modular e altamente escalável. Seu site ou sistema pode receber novas integrações, automações e dashboards conforme o seu negócio crescer.",
  },
];

function CustomSelect({
  value,
  onChange,
  options,
  error,
}: {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  error?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
        className={`w-full text-left bg-[#0c0c10] border ${
          error
            ? "border-red-500/50"
            : "border-white/10 focus:border-aurora-violet focus:shadow-[0_0_15px_rgba(162,128,255,0.1)]"
        } rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none transition-all duration-300 flex items-center justify-between`}
      >
        <span className={value ? "text-white" : "text-slate-500"}>
          {value || "Selecione uma opção"}
        </span>
        <FaChevronDown
          className={`size-3.5 text-slate-500 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute z-50 w-full mt-2 bg-[#121218] border border-white/10 rounded-xl shadow-[0_15px_50px_rgba(0,0,0,0.6)] overflow-hidden py-1">
          {options.map((opt) => {
            const isSelected = value === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors duration-200 ${
                  isSelected
                    ? "bg-aurora-violet/10 text-aurora-violet font-semibold"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span>{opt}</span>
                {isSelected && <FaCheck className="size-3" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ContatoPage() {
  const { settings } = useSiteSettings();
  const search = Route.useSearch();
  const planoKey = search.plano;
  const expansaoKey = search.expansao;
  const nivelKey = search.nivel;
  const defaultMensagem = "";

  const [values, setValues] = useState<FormState>({
    nome: "",
    email: "",
    whatsapp: "",
    empresa: "",
    tipo: "",
    mensagem: defaultMensagem,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof FormState>(k: K, v: FormState[K]) {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = schema.safeParse(values);
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      for (const issue of result.error.issues) {
        const k = issue.path[0] as keyof FormState;
        if (!fieldErrors[k]) fieldErrors[k] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error("Verifique os campos destacados.");
      return;
    }

    setSubmitting(true);
    try {
      // 1. Salvar no Supabase
      const { error: supabaseError } = await supabase.from("leads").insert([
        {
          nome: values.nome,
          email: values.email,
          whatsapp: values.whatsapp || null,
          empresa: values.empresa || null,
          tipo: values.tipo,
          mensagem: values.mensagem,
        },
      ]);

      if (supabaseError) {
        console.error("Erro Supabase:", supabaseError);
        // Mesmo com erro no supabase, tentamos enviar o email
      }

      // 2. Chamar a API existente (EmailJS/Resend, etc)
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contato",
          nome: values.nome,
          email: values.email,
          whatsapp: values.whatsapp,
          empresa: values.empresa,
          tipoContato: values.tipo,
          mensagem: values.mensagem,
        }),
      });

      if (!res.ok) {
        throw new Error("Erro no envio da API");
      }

      toast.success("Mensagem enviada com sucesso! Entraremos em contato.");
      setValues({
        nome: "",
        email: "",
        whatsapp: "",
        empresa: "",
        tipo: "",
        mensagem: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Erro ao enviar mensagem. Tente novamente ou fale no WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-[#08080b] min-h-screen text-white">
      {/* ===== SEÇÃO 1: HERO ===== */}
      <section
        className="relative overflow-hidden bg-[#050507] min-h-dvh flex flex-col items-center justify-center border-b border-[#1c1c21]"
        style={{
          backgroundImage: "url('/images/aurora_contact_real.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Gradiente escuro no mobile (vertical) e desktop (horizontal) para garantir contraste total sem apagar a aurora */}
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-[#050507]/85 via-[#050507]/65 md:via-[#050507]/75 to-transparent z-0 pointer-events-none"></div>
        {/* Gradiente na base para fundir suavemente com o final da seção */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050507] to-transparent z-0 pointer-events-none"></div>

        <div className="relative mx-auto w-full px-4 md:px-8 lg:pl-[6.5rem] lg:pr-12 z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="max-w-4xl text-left">
              <ScrollReveal delay={0}>
                <div className="flex items-center gap-4 mb-1.5">
                  <div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan" />
                  <span className="font-mono text-[11px] text-[#b3a1ff] uppercase tracking-[0.25em]">
                    Contato Direto
                  </span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <h1 className="font-display text-[3.2rem] xs:text-[3.8rem] sm:text-[4.4rem] md:text-[5.2rem] lg:text-[6rem] font-black tracking-tight leading-[0.98] uppercase py-2">
                  <span className="block text-white">OPNORA</span>
                  <span
                    className="inline-block text-transparent bg-clip-text w-fit pt-1 pb-1 mt-0 sm:mt-0.5"
                    style={{
                      backgroundImage:
                        "linear-gradient(160deg, #a79df0, #82b8f7, #4ed4cf, #58e5a6)",
                    }}
                  >
                    <span className="block">CONTATOS.</span>
                  </span>
                </h1>
              </ScrollReveal>
            </div>
          </div>
        </div>
        {/* Scroll Down Indicator */}
        <div className="absolute bottom-3 sm:bottom-5 md:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 md:gap-2 z-10 pointer-events-none">
          <span className="font-mono text-[9px] sm:text-[11px] font-medium uppercase tracking-[0.3em] text-slate-300/90 select-none">
            SCROLL
          </span>
          <div className="w-[1.5px] h-8 md:h-12 relative overflow-hidden">
            <style>{`
                @keyframes scroll-line-flow {
                  0% {
                    transform: translateY(-100%);
                    opacity: 0;
                  }
                  25% {
                    opacity: 1;
                  }
                  75% {
                    opacity: 1;
                  }
                  100% {
                    transform: translateY(100%);
                    opacity: 0;
                  }
                }
                .animate-scroll-line {
                  animation: scroll-line-flow 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                }
              `}</style>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#a280ff] to-transparent animate-scroll-line" />
          </div>
        </div>
      </section>

      {/* ===== SEÇÃO 2: FORMULÁRIO & INFORMAÇÕES DE CONTATO ===== */}
      <section
        id="formulario-contato"
        className="relative py-20 border-b border-white/5 bg-[#08080b]"
      >
        <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
            {/* Lado Esquerdo: Info de Contato & Redes */}
            <div className="space-y-8 lg:pr-4">
              <ScrollReveal>
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan" />
                    <span className="font-mono text-[10px] sm:text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                      FALE CONOSCO
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-white mb-6">
                    Vamos construir juntos?
                  </h2>
                  <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed">
                    A Opnora é construída em torno de trabalho significativo e colaboração próxima.
                    Se você tem uma ideia para debater, um projeto para desenvolver ou deseja tirar
                    dúvidas sobre nossas soluções, envie sua mensagem. Analisamos cada proposta com
                    atenção e responderemos o mais rápido possível.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <div className="space-y-3 pt-3">
                  {/* Item E-mail */}
                  <a
                    href={`mailto:${settings.email}`}
                    className="flex items-center gap-3.5 group py-2.5 px-3.5 rounded-lg bg-[#121218]/50 border border-white/5 hover:border-white/15 hover:bg-[#121218] transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-aurora-violet/10 flex items-center justify-center text-aurora-violet shrink-0 border border-aurora-violet/20 group-hover:scale-105 transition-transform">
                      <FaEnvelope className="size-4" />
                    </div>
                    <div>
                      <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">
                        E-MAIL
                      </p>
                      <p className="text-xs sm:text-sm font-medium text-white group-hover:text-aurora-violet transition-colors">
                        {settings.email}
                      </p>
                    </div>
                  </a>

                  {/* Item WhatsApp */}
                  <a
                    href={settings.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 group py-2.5 px-3.5 rounded-lg bg-[#121218]/50 border border-white/5 hover:border-white/15 hover:bg-[#121218] transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-aurora-violet/10 flex items-center justify-center text-aurora-violet shrink-0 border border-aurora-violet/20 group-hover:scale-105 transition-transform">
                      <FaWhatsapp className="size-4.5" />
                    </div>
                    <div>
                      <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">
                        WHATSAPP
                      </p>
                      <p className="text-xs sm:text-sm font-medium text-white group-hover:text-aurora-violet transition-colors">
                        {settings.whatsappFormatted}
                      </p>
                    </div>
                  </a>

                  {/* Item LinkedIn */}
                  <a
                    href={settings.linkedin || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 group py-2.5 px-3.5 rounded-lg bg-[#121218]/50 border border-white/5 hover:border-white/15 hover:bg-[#121218] transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-aurora-violet/10 flex items-center justify-center text-aurora-violet shrink-0 border border-aurora-violet/20 group-hover:scale-105 transition-transform">
                      <FaLinkedin className="size-4" />
                    </div>
                    <div>
                      <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">
                        LINKEDIN
                      </p>
                      <p className="text-xs sm:text-sm font-medium text-white group-hover:text-aurora-violet transition-colors">
                        LinkedIn Opnora
                      </p>
                    </div>
                  </a>

                  {/* Item Instagram */}
                  <a
                    href={settings.instagram || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 group py-2.5 px-3.5 rounded-lg bg-[#121218]/50 border border-white/5 hover:border-white/15 hover:bg-[#121218] transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-aurora-violet/10 flex items-center justify-center text-aurora-violet shrink-0 border border-aurora-violet/20 group-hover:scale-105 transition-transform">
                      <FaInstagram className="size-4" />
                    </div>
                    <div>
                      <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">
                        INSTAGRAM
                      </p>
                      <p className="text-xs sm:text-sm font-medium text-white group-hover:text-aurora-violet transition-colors">
                        Instagram Opnora
                      </p>
                    </div>
                  </a>
                </div>
              </ScrollReveal>
            </div>

            {/* Lado Direito: Formulário no Bloco */}
            <ScrollReveal delay={80} className="w-full">
              <form
                onSubmit={onSubmit}
                noValidate
                className="rounded-lg bg-[#121218] border border-white/10 p-6 sm:p-10 shadow-[0_15px_50px_rgba(0,0,0,0.6)] relative overflow-hidden space-y-6"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Campo Nome */}
                  <div>
                    <label
                      htmlFor="nome"
                      className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider"
                    >
                      Nome *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                        <FaUser className="size-3.5" />
                      </span>
                      <input
                        id="nome"
                        type="text"
                        value={values.nome}
                        onChange={(e) => update("nome", e.target.value)}
                        className={`w-full bg-[#0c0c10] border ${errors.nome ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-aurora-violet focus:shadow-[0_0_15px_rgba(162,128,255,0.1)]"} rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-all duration-300`}
                        placeholder="Seu nome"
                      />
                    </div>
                    {errors.nome && (
                      <p className="text-[11px] text-red-400 mt-1 font-light">{errors.nome}</p>
                    )}
                  </div>

                  {/* Campo E-mail */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider"
                    >
                      E-mail *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                        <FaEnvelope className="size-3.5" />
                      </span>
                      <input
                        id="email"
                        type="email"
                        value={values.email}
                        onChange={(e) => update("email", e.target.value)}
                        className={`w-full bg-[#0c0c10] border ${errors.email ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-aurora-violet focus:shadow-[0_0_15px_rgba(162,128,255,0.1)]"} rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-all duration-300`}
                        placeholder="exemplo@empresa.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-[11px] text-red-400 mt-1 font-light">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Campo Tipo de contato */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Assunto *
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none z-10">
                      <FaCircleInfo className="size-3.5" />
                    </span>
                    <CustomSelect
                      value={values.tipo}
                      onChange={(val) => update("tipo", val)}
                      options={TIPOS}
                      error={!!errors.tipo}
                    />
                  </div>
                  {errors.tipo && (
                    <p className="text-[11px] text-red-400 mt-1 font-light">{errors.tipo}</p>
                  )}
                </div>

                {/* WhatsApp + Empresa / Projeto */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="whatsapp"
                      className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider"
                    >
                      WhatsApp
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                        <FaPhone className="size-3.5" />
                      </span>
                      <input
                        id="whatsapp"
                        type="tel"
                        value={values.whatsapp}
                        onChange={(e) => update("whatsapp", e.target.value)}
                        className="w-full bg-[#0c0c10] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-aurora-violet focus:shadow-[0_0_15px_rgba(162,128,255,0.1)] transition-all duration-300"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="empresa"
                      className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider"
                    >
                      Empresa / Projeto
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                        <FaBuilding className="size-3.5" />
                      </span>
                      <input
                        id="empresa"
                        type="text"
                        value={values.empresa}
                        onChange={(e) => update("empresa", e.target.value)}
                        className="w-full bg-[#0c0c10] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-aurora-violet focus:shadow-[0_0_15px_rgba(162,128,255,0.1)] transition-all duration-300"
                        placeholder="Nome da empresa ou projeto"
                      />
                    </div>
                  </div>
                </div>

                {/* Campo Mensagem */}
                <div>
                  <label
                    htmlFor="mensagem"
                    className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider"
                  >
                    Mensagem *
                  </label>
                  <div className="relative">
                    <textarea
                      id="mensagem"
                      rows={5}
                      value={values.mensagem}
                      onChange={(e) => update("mensagem", e.target.value)}
                      className={`w-full bg-[#0c0c10] border ${errors.mensagem ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-aurora-violet focus:shadow-[0_0_15px_rgba(162,128,255,0.1)]"} rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-all duration-300 resize-y min-h-[120px]`}
                      placeholder="Conte-nos sobre seu projeto, pergunta ou ideia."
                    />
                  </div>
                  {errors.mensagem && (
                    <p className="text-[11px] text-red-400 mt-1 font-light">{errors.mensagem}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-aurora-violet via-[#6b8cff] to-aurora-cyan text-black font-display font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-[0_0_20px_rgba(162,128,255,0.25)] transition-all duration-300 disabled:opacity-60 disabled:pointer-events-none mt-2"
                >
                  <span>{submitting ? "ENVIANDO..." : "ENVIAR MENSAGEM"}</span>
                  <FaPaperPlane className="size-3.5" />
                </button>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== SEÇÃO 3: SOB MEDIDA & CONSULTORIA (SIMULADOR) ===== */}
      <Suspense
        fallback={
          <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-12 py-24">
            <div className="max-w-3xl mb-16 animate-pulse">
              <div className="h-4 w-48 bg-white/5 rounded mb-4"></div>
              <div className="h-10 w-96 bg-white/5 rounded mb-6"></div>
              <div className="h-6 w-[500px] bg-white/5 rounded"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-8 items-start animate-pulse">
              <div className="bg-[#121218] border border-white/5 rounded-2xl p-6 sm:p-8 space-y-8 h-[400px]"></div>
              <div className="bg-[#121218] border border-white/5 rounded-2xl p-6 sm:p-8 h-[250px] sticky top-24"></div>
            </div>
          </div>
        }
      >
        <ContatoSimulador defaultPlano={planoKey || expansaoKey} defaultNivel={nivelKey} />
      </Suspense>

      {/* ===== SEÇÃO 4: CHOOSE THE BEST PLACE TO START ===== */}
      <section className="relative py-20 border-b border-white/5 bg-[#0e0e12]">
        <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-12 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan" />
                <span className="font-mono text-[10px] sm:text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                  PONTO DE PARTIDA
                </span>
                <div className="h-[2px] w-8 bg-gradient-to-r from-aurora-cyan to-aurora-violet" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-white mb-4">
                Escolha o melhor lugar para{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: "linear-gradient(160deg, #a79df0, #82b8f7, #4ed4cf, #58e5a6)",
                  }}
                >
                  começar.
                </span>
              </h2>
              <p className="text-slate-400 text-sm sm:text-base font-light">
                Prefere simular antes de enviar, entender os valores ou ir direto para o WhatsApp?
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Simulador */}
            <ScrollReveal delay={100} className="flex">
              <div className="group relative w-full h-full flex flex-col justify-start rounded-lg bg-[#121218] border border-white/10 p-6 sm:p-7 hover:-translate-y-1 hover:bg-[#181820] hover:border-white/15 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out">
                <div className="space-y-4">
                  <h3 className="font-display text-lg font-bold text-white">Simular orçamento</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                    Quer ter uma estimativa de investimento sob medida agora? Responda a algumas
                    perguntas rápidas no nosso simulador de projetos.
                  </p>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      document
                        .getElementById("personalize")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-xs font-semibold text-aurora-violet hover:text-white flex items-center gap-1.5 transition-colors group/link cursor-pointer"
                  >
                    Simular orçamento
                    <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">
                      →
                    </span>
                  </button>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 2: Planos */}
            <ScrollReveal delay={200} className="flex">
              <div className="group relative w-full h-full flex flex-col justify-start rounded-lg bg-[#121218] border border-white/10 p-6 sm:p-7 hover:-translate-y-1 hover:bg-[#181820] hover:border-white/15 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out">
                <div className="space-y-4">
                  <h3 className="font-display text-lg font-bold text-white">
                    Planos & Investimento
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                    Veja os planos prontos da Opnora e descubra o que cada escopo inclui, valores
                    ideais de partida e as principais modalidades de projeto.
                  </p>
                </div>
                <div className="mt-4">
                  <Link
                    to="/precos"
                    hash="planos"
                    className="text-xs font-semibold text-aurora-violet hover:text-white flex items-center gap-1.5 transition-colors group/link cursor-pointer"
                  >
                    Ver planos e preços
                    <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 3: WhatsApp */}
            <ScrollReveal delay={300} className="flex">
              <div className="group relative w-full h-full flex flex-col justify-start rounded-lg bg-[#121218] border border-white/10 p-6 sm:p-7 hover:-translate-y-1 hover:bg-[#181820] hover:border-white/15 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out">
                <div className="space-y-4">
                  <h3 className="font-display text-lg font-bold text-white">Conversa imediata</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                    Sem fila, sem formulários. Prefere falar diretamente com nosso especialista por
                    WhatsApp para tirar suas dúvidas de forma rápida?
                  </p>
                </div>
                <div className="mt-4">
                  <a
                    href={settings.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-aurora-violet hover:text-white flex items-center gap-1.5 transition-colors group/link cursor-pointer"
                  >
                    Falar no WhatsApp
                    <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== SEÇÃO 4: O QUE ACONTECE DEPOIS DO CONTATO ===== */}
      <section className="relative py-20 border-b border-white/5 bg-[#0c0c0f]">
        <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.00fr_1.00fr] gap-12 lg:gap-10 items-start">
            {/* Lado Esquerdo */}
            <div className="space-y-4 max-w-2xl">
              <ScrollReveal>
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan" />
                  <span className="font-mono text-[10px] sm:text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                    PRÓXIMAS ETAPAS
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-white mb-4">
                  O que acontece depois que você entra em{" "}
                  <span
                    className="text-transparent bg-clip-text"
                    style={{
                      backgroundImage:
                        "linear-gradient(160deg, #a79df0, #82b8f7, #4ed4cf, #58e5a6)",
                    }}
                  >
                    contato conosco?
                  </span>
                </h2>
                <p className="text-slate-400 text-sm sm:text-base font-light leading-relaxed">
                  Prezamos por uma comunicação transparente e direta desde o primeiro segundo. Aqui
                  está o passo a passo de como trabalhamos.
                </p>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={80}>
              <div className="rounded-lg bg-[#121218] border border-white/10 p-5 sm:p-6 space-y-4 hover:-translate-y-1 hover:bg-[#181820] hover:border-white/15 transition-all duration-300 ease-out shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <ol className="space-y-4">
                  <li className="flex items-start gap-3.5">
                    <span className="flex-shrink-0 size-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-mono text-xs font-semibold text-slate-400">
                      1
                    </span>
                    <div>
                      <h4 className="text-sm font-display font-bold text-white mb-0.5">
                        Análise interna
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                        Avaliamos sua mensagem para entender as necessidades técnicas do seu
                        negócio.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="flex-shrink-0 size-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-mono text-xs font-semibold text-slate-400">
                      2
                    </span>
                    <div>
                      <h4 className="text-sm font-display font-bold text-white mb-0.5">
                        Contato rápido
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                        Retornamos em até 24 horas úteis via WhatsApp ou E-mail para alinhar os
                        detalhes.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="flex-shrink-0 size-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-mono text-xs font-semibold text-slate-400">
                      3
                    </span>
                    <div>
                      <h4 className="text-sm font-display font-bold text-white mb-0.5">
                        Escopo ideal
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                        Alinhamos o que você precisa para otimizar o investimento sem desperdícios.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="flex-shrink-0 size-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-mono text-xs font-semibold text-slate-400">
                      4
                    </span>
                    <div>
                      <h4 className="text-sm font-display font-bold text-white mb-0.5">
                        Proposta comercial
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                        Enviamos a proposta com escopo detalhado, valores fixos e prazos definidos.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== SEÇÃO 5: PERGUNTAS FREQUENTES ===== */}
      <section className="relative py-24 border-t border-white/5 bg-[#0e0e12]">
        <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-12 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan" />
                <span className="font-mono text-[10px] sm:text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                  FAQ
                </span>
                <div className="h-[2px] w-8 bg-gradient-to-r from-aurora-cyan to-aurora-violet" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-white mb-4">
                Perguntas Frequentes
              </h2>
              <p className="text-slate-400 text-sm sm:text-base font-light">
                Tire suas dúvidas rápidas sobre como criamos sites, sistemas e automações na Opnora.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FAQ_ITEMS.map((item, idx) => (
              <ScrollReveal key={item.q} delay={100 * (idx + 1)}>
                <div className="group relative rounded-lg border border-white/10 bg-[#121218] p-6 sm:p-7 hover:-translate-y-1 hover:bg-[#181820] hover:border-white/15 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <h4 className="text-sm font-display font-bold text-white">{item.q}</h4>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                      {item.a}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
