import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [{ title: "Termos de Uso | Opnora" }],
  }),
  component: TermosPage,
});

function TermosPage() {
  return (
    <main className="flex-1 bg-[#0e0e12]">
      {/* Header Section */}
      <section
        className="relative pt-32 pb-16 md:pt-40 md:pb-24 min-h-[50vh] md:min-h-[55vh] flex flex-col justify-center overflow-hidden bg-[#0e0e12]"
        style={{
          backgroundImage: "url('/images/termos_aurora_hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Gradiente escuro focado apenas no lado esquerdo (atrás do texto), estilo Azemble */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e12] via-[#0e0e12]/90 via-40% to-transparent z-0 pointer-events-none" />

        <div className="relative mx-auto w-full px-6 md:px-8 lg:pl-[6.5rem] lg:pr-12 z-10">
          <div className="max-w-4xl text-left">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#a280ff]">
                LEGAL
              </span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight uppercase leading-[0.9]">
              <span className="block text-white">TERMOS DE</span>
              <span
                className="inline-block text-transparent bg-clip-text w-fit"
                style={{
                  backgroundImage: "linear-gradient(160deg, #a79df0, #82b8f7, #4ed4cf, #58e5a6)",
                }}
              >
                USO
              </span>
            </h1>

            <p className="text-slate-500 mt-10 font-mono text-[11px] uppercase tracking-wider">
              Última atualização: Junho de 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-24 bg-[#0e0e12]">
        <div className="mx-auto max-w-4xl px-6 md:px-8 lg:pl-[6.5rem] lg:pr-12">
          <div className="space-y-12 text-slate-400 font-light leading-relaxed text-[14px] sm:text-[15px]">
            {/* 1. Aceitação dos Termos */}
            <div className="pb-8 border-b border-white/5">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-6 tracking-tight">
                1. Aceitação dos Termos
              </h2>
              <p className="text-slate-300">
                Ao navegar no site da Opnora Technologies ("Site") ou utilizar nossos formulários de simulação e contato, você concorda em cumprir estes Termos de Uso. Caso não concorde com estes termos, solicitamos que interrompa a navegação no site.
              </p>
            </div>

            {/* 2. Uso Permitido do Site */}
            <div className="pb-8 border-b border-white/5">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-6 tracking-tight">
                2. Uso Permitido do Site
              </h2>
              <p className="mb-4 text-slate-300">
                Você concorda em utilizar o site apenas para finalidades legítimas de informação e contratação de serviços. É expressamente proibido:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-4 marker:text-white">
                <li>Tentar acessar áreas restritas, servidores ou códigos da plataforma sem autorização.</li>
                <li>Utilizar mecanismos automatizados (bots, scrapers) para extrair dados do site.</li>
                <li>Enviar mensagens maliciosas, spam ou tentativas de invasão através dos formulários.</li>
              </ul>
            </div>

            {/* 3. Propriedade Intelectual */}
            <div className="pb-8 border-b border-white/5">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-6 tracking-tight">
                3. Propriedade Intelectual
              </h2>
              <p className="text-slate-300">
                Todo o conteúdo deste site — incluindo logotipos, marcas, códigos, identidades visuais, textos e estruturas de dados — pertence exclusivamente à Opnora Technologies. É proibida a cópia, reprodução ou engenharia reversa sem autorização prévia por escrito.
              </p>
            </div>

            {/* 4. Orçamentos e Serviços */}
            <div className="pb-8 border-b border-white/5">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-6 tracking-tight">
                4. Simuladores, Orçamentos e Propostas
              </h2>
              <p className="text-slate-300">
                As estimativas de valores e prazos geradas no simulador do site têm caráter puramente informativo e preliminar. A contratação definitiva de desenvolvimento de software é formalizada através de proposta técnica e contrato de prestação de serviços específico.
              </p>
            </div>

            {/* 5. Isenção e Limitação de Responsabilidade */}
            <div className="pb-8 border-b border-white/5">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-6 tracking-tight">
                5. Isenção e Limitação de Responsabilidade
              </h2>
              <p className="text-slate-300">
                Embora nos esforcemos para manter o site continuamente disponível e seguro, a Opnora não se responsabiliza por instabilidades temporárias decorrentes de falhas em redes de terceiros, provedores de conexão ou manutenção de infraestrutura.
              </p>
            </div>

            {/* 6. Links Externos */}
            <div className="pb-8 border-b border-white/5">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-6 tracking-tight">
                6. Links Externos
              </h2>
              <p className="text-slate-300">
                Nosso site pode conter links para serviços ou plataformas externas. A Opnora não exerce controle sobre o conteúdo ou políticas de privacidade de terceiros.
              </p>
            </div>

            {/* 7. Legislação Aplicável e Foro */}
            <div className="pb-8 border-b border-white/5">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-6 tracking-tight">
                7. Legislação Aplicável e Foro
              </h2>
              <p className="text-slate-300">
                Estes Termos são regidos pelas leis da República Federativa do Brasil (incluindo a LGPD e o Marco Civil da Internet). Eventuais controvérsias serão dirimidas no foro da comarca da sede da Opnora.
              </p>
            </div>

            {/* 8. Contato */}
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-6 tracking-tight">
                8. Contato
              </h2>
              <p className="text-slate-300">
                Caso tenha dúvidas sobre estes Termos de Uso, entre em contato através do e-mail{" "}
                <a
                  href="mailto:contato@opnora.tech"
                  className="text-[#a280ff] hover:text-[#b3a1ff] font-medium underline transition-colors"
                >
                  contato@opnora.tech
                </a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
