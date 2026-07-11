import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { FaMessage, FaEnvelope, FaPaperPlane } from "react-icons/fa6";
import { AuroraBackground } from "@/components/site/backgrounds/AuroraBackground";
import { Section } from "@/components/site/shared/Section";
import { CONTACT } from "@/config/site";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Opnora" },
      {
        name: "description",
        content:
          "Fale com a Opnora. Conte qual problema sua empresa precisa resolver e vamos pensar uma solução digital juntos.",
      },
      { property: "og:title", content: "Fale com a Opnora" },
      { property: "og:description", content: "Vamos construir uma solução juntos." },
      { property: "og:url", content: "/contato" },
    ],
    links: [{ rel: "canonical", href: "/contato" }],
  }),
  component: ContatoPage,
});

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  empresa: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email("E-mail inválido").max(255),
  whatsapp: z.string().trim().max(40).optional().or(z.literal("")),
  tipo: z.string().min(1, "Selecione um tipo de projeto"),
  mensagem: z.string().trim().min(10, "Conte um pouco mais (mín. 10 caracteres)").max(2000),
});

type FormState = z.infer<typeof schema>;

const TIPOS = [
  "Site profissional",
  "Sistema personalizado",
  "Plataforma web",
  "Dashboard / dados",
  "Automação / integração",
  "Evolução de projeto existente",
  "Ainda não sei",
];

function ContatoPage() {
  const [values, setValues] = useState<FormState>({
    nome: "",
    empresa: "",
    email: "",
    whatsapp: "",
    tipo: "",
    mensagem: "",
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
    // Estrutura pronta para integração futura (e-mail, WhatsApp, backend).
    // Por enquanto, confirmação local.
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    toast.success("Mensagem registrada. Em breve entraremos em contato.");
    setValues({ nome: "", empresa: "", email: "", whatsapp: "", tipo: "", mensagem: "" });
  }

  return (
    <>
      <section className="relative overflow-hidden">
        <AuroraBackground />
        <div className="relative mx-auto max-w-5xl px-4 pt-16 pb-10 sm:px-6 sm:pt-20 lg:px-8 lg:pt-28">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-aurora-cyan">
            <span className="mr-2 inline-block h-px w-6 align-middle bg-aurora-cyan/70" />
            contato
          </p>
          <h1 className="font-display mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Vamos construir uma <span className="text-aurora">solução</span> juntos.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Conte qual problema sua empresa precisa resolver. Respondemos cada mensagem
            pessoalmente.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <aside className="space-y-4">
            <div className="card-aurora rounded-2xl p-6">
              <h2 className="font-display text-lg font-semibold">Canais diretos</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Prefere mensagem direta? Use os canais abaixo. Sem fila, sem bot.
              </p>
              <ul className="mt-5 space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <FaEnvelope size={18} className="mt-0.5 text-aurora-cyan" aria-hidden />
                  <a href={`mailto:${CONTACT.email}`} className="text-foreground hover:underline">
                    {CONTACT.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <FaMessage size={18} className="mt-0.5 text-aurora-cyan" aria-hidden />
                  <a
                    href={CONTACT.whatsappUrl || "#"}
                    className="text-foreground hover:underline"
                    aria-disabled={!CONTACT.whatsappUrl}
                  >
                    Falar pelo WhatsApp
                  </a>
                </li>
              </ul>
            </div>

            <div className="card-aurora rounded-2xl p-6">
              <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-aurora-cyan">
                como respondemos
              </h3>
              <ol className="mt-4 space-y-3 text-sm text-foreground/85">
                <li>1. Leitura humana da sua mensagem.</li>
                <li>2. Contato em até 2 dias úteis.</li>
                <li>3. Conversa inicial sem compromisso.</li>
                <li>4. Se fizer sentido, proposta clara e honesta.</li>
              </ol>
            </div>
          </aside>

          <form onSubmit={onSubmit} noValidate className="card-aurora rounded-2xl p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Nome" id="nome" error={errors.nome} required>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  autoComplete="name"
                  value={values.nome}
                  onChange={(e) => update("nome", e.target.value)}
                  className={inputCls(errors.nome)}
                />
              </Field>
              <Field label="Empresa" id="empresa" error={errors.empresa}>
                <input
                  id="empresa"
                  name="empresa"
                  type="text"
                  autoComplete="organization"
                  value={values.empresa}
                  onChange={(e) => update("empresa", e.target.value)}
                  className={inputCls(errors.empresa)}
                />
              </Field>
              <Field label="E-mail" id="email" error={errors.email} required>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={inputCls(errors.email)}
                />
              </Field>
              <Field label="WhatsApp" id="whatsapp" error={errors.whatsapp}>
                <input
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="(00) 00000-0000"
                  value={values.whatsapp}
                  onChange={(e) => update("whatsapp", e.target.value)}
                  className={inputCls(errors.whatsapp)}
                />
              </Field>
              <Field
                label="Tipo de projeto"
                id="tipo"
                error={errors.tipo}
                required
                className="sm:col-span-2"
              >
                <select
                  id="tipo"
                  name="tipo"
                  value={values.tipo}
                  onChange={(e) => update("tipo", e.target.value)}
                  className={inputCls(errors.tipo)}
                >
                  <option value="">Selecione...</option>
                  {TIPOS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>
              <Field
                label="Mensagem"
                id="mensagem"
                error={errors.mensagem}
                required
                className="sm:col-span-2"
              >
                <textarea
                  id="mensagem"
                  name="mensagem"
                  rows={5}
                  value={values.mensagem}
                  onChange={(e) => update("mensagem", e.target.value)}
                  className={inputCls(errors.mensagem) + " resize-y"}
                  placeholder="Conte qual problema sua empresa precisa resolver."
                />
              </Field>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm btn-aurora disabled:opacity-60"
              >
                {submitting ? "Enviando..." : "Enviar mensagem"}
                <FaPaperPlane size={16} />
              </button>
              {CONTACT.whatsappUrl && (
                <a
                  href={CONTACT.whatsappUrl}
                  className="inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm btn-ghost-aurora"
                >
                  <FaMessage size={16} />
                  Falar no WhatsApp
                </a>
              )}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Seus dados são usados apenas para responder esta mensagem.
            </p>
          </form>
        </div>
      </Section>
    </>
  );
}

function inputCls(err?: string) {
  return [
    "w-full rounded-lg border bg-background/60 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70",
    "transition-colors focus:outline-none focus:ring-2 focus:ring-aurora-cyan/60",
    err ? "border-destructive" : "border-border",
  ].join(" ");
}

function Field({
  label,
  id,
  children,
  error,
  required,
  className = "",
}: {
  label: string;
  id: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}{" "}
        {required && (
          <span className="text-aurora-magenta" aria-hidden>
            *
          </span>
        )}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}
