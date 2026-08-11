import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [{ title: "Política de Cookies | Opnora" }],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <main className="flex-1 bg-[#0e0e12]">
      {/* Header Section */}
      <section
        className="relative pt-32 pb-16 md:pt-40 md:pb-24 min-h-[50vh] md:min-h-[55vh] flex flex-col justify-center overflow-hidden bg-[#0e0e12]"
        style={{
          backgroundImage: "url('/images/cookies_aurora_distinct.png')",
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

            <h1 className="font-display text-[3.2rem] xs:text-[3.8rem] sm:text-[4.4rem] md:text-[5.2rem] lg:text-[6rem] font-black tracking-tight leading-[0.98] uppercase py-2">
              <span className="block text-white">POLÍTICA DE</span>
              <span
                className="inline-block text-transparent bg-clip-text w-fit pt-1 pb-1 mt-0 sm:mt-0.5 drop-shadow-[0_0_35px_rgba(167,157,240,0.45)]"
                style={{
                  backgroundImage: "linear-gradient(160deg, #a79df0, #82b8f7, #4ed4cf, #58e5a6)",
                }}
              >
                COOKIES
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
            {/* 1. O que são Cookies */}
            <div className="pb-8 border-b border-white/5">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-6 tracking-tight">
                1. O que são Cookies?
              </h2>
              <p className="text-slate-300">
                Cookies são pequenos arquivos de texto armazenados no seu dispositivo ao navegar em
                um site. Eles permitem reconhecer as escolhas do usuário e manter o funcionamento
                correto da navegação e dos formulários.
              </p>
            </div>

            {/* 2. Como Utilizamos Cookies */}
            <div className="pb-8 border-b border-white/5">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-6 tracking-tight">
                2. Como Utilizamos Cookies em Nosso Site
              </h2>
              <p className="mb-4 text-slate-300">
                Na Opnora Technologies, prezamos por uma abordagem de privacidade estrita.
                Utilizamos cookies de forma mínima e focada exclusivamente em:
              </p>
              <ul className="list-disc pl-5 space-y-2.5 mt-4 marker:text-white">
                <li>
                  <strong className="text-white font-medium">
                    Garantir a segurança e estabilidade
                  </strong>{" "}
                  da sua navegação e envios de formulários.
                </li>
                <li>
                  <strong className="text-white font-medium">
                    Manter suas preferências visuais
                  </strong>{" "}
                  (como tema escuro).
                </li>
                <li>
                  <strong className="text-white font-medium">
                    Coletar métricas anônimas de tráfego
                  </strong>{" "}
                  para entender o desempenho das páginas sem rastrear sua identidade pessoal.
                </li>
              </ul>
            </div>

            {/* 3. Tipos de Cookies Utilizados */}
            <div className="pb-8 border-b border-white/5 space-y-8">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                3. Tipos de Cookies que Utilizamos
              </h2>

              {/* Tabela A: Cookies Essenciais */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-md bg-[#a280ff]/10 border border-[#a280ff]/30 text-[#a280ff]">
                    ESSENCIAIS
                  </span>
                  <h3 className="text-lg font-bold text-white font-display">
                    Cookies Estritamente Necessários
                  </h3>
                </div>
                <p className="text-sm text-slate-400">
                  Estes cookies são fundamentais para o funcionamento do site e proteção contra
                  envios maliciosos.
                </p>
                <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#131318]/70 backdrop-blur-sm">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#181820] text-white font-mono text-[11px] uppercase tracking-wider border-b border-white/10">
                      <tr>
                        <th className="py-3 px-4">Nome</th>
                        <th className="py-3 px-4">Propósito</th>
                        <th className="py-3 px-4">Duração</th>
                        <th className="py-3 px-4">Provedor</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-slate-300">
                      <tr>
                        <td className="py-3 px-4 font-mono text-[#a280ff]">opnora_session</td>
                        <td className="py-3 px-4">
                          Gerencia o estado de sessão segura e navegação.
                        </td>
                        <td className="py-3 px-4">Sessão</td>
                        <td className="py-3 px-4">Próprio</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-mono text-[#a280ff]">csrf_token</td>
                        <td className="py-3 px-4">
                          Protege formulários contra envios não autorizados (CSRF).
                        </td>
                        <td className="py-3 px-4">Sessão</td>
                        <td className="py-3 px-4">Próprio</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tabela B: Cookies de Métricas e Preferências */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-md bg-[#a280ff]/10 border border-[#a280ff]/30 text-[#a280ff]">
                    PREFERÊNCIAS & MÉTRICAS
                  </span>
                  <h3 className="text-lg font-bold text-white font-display">
                    Cookies de Preferência e Análise
                  </h3>
                </div>
                <p className="text-sm text-slate-400">
                  Registram contagem anônima de acessos e configurações visuais.
                </p>
                <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#131318]/70 backdrop-blur-sm">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#181820] text-white font-mono text-[11px] uppercase tracking-wider border-b border-white/10">
                      <tr>
                        <th className="py-3 px-4">Nome</th>
                        <th className="py-3 px-4">Propósito</th>
                        <th className="py-3 px-4">Duração</th>
                        <th className="py-3 px-4">Provedor</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-slate-300">
                      <tr>
                        <td className="py-3 px-4 font-mono text-[#a280ff]">theme_mode</td>
                        <td className="py-3 px-4">Armazena a preferência de modo escuro/claro.</td>
                        <td className="py-3 px-4">1 ano</td>
                        <td className="py-3 px-4">Próprio</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-mono text-[#a280ff]">_opn_metrics</td>
                        <td className="py-3 px-4">
                          Registra contagem anônima de acessos às páginas.
                        </td>
                        <td className="py-3 px-4">30 dias</td>
                        <td className="py-3 px-4">Próprio/Anônimo</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* 4. Ausência de Rastreamento de Anúncios */}
            <div className="pb-8 border-b border-white/5">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-6 tracking-tight">
                4. Ausência de Rastreamento Comercial
              </h2>
              <p className="text-slate-300">
                A Opnora não utiliza cookies de redes de anúncios, remarketing, corretores de dados
                ou rastreadores de publicidade de terceiros.
              </p>
            </div>

            {/* 5. Como Gerenciar no Navegador */}
            <div className="pb-8 border-b border-white/5">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-6 tracking-tight">
                5. Como Desativar Cookies no Navegador
              </h2>
              <p className="text-slate-300 mb-6">
                Você pode desativar ou excluir cookies através das configurações do seu navegador:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-mono">
                <div className="p-4 rounded-xl bg-[#131318] border border-white/5 space-y-1">
                  <span className="text-[#a280ff] font-bold">Google Chrome</span>
                  <p className="text-slate-400 text-xs font-sans">
                    Configurações &gt; Privacidade e Segurança &gt; Cookies
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#131318] border border-white/5 space-y-1">
                  <span className="text-[#a280ff] font-bold">Mozilla Firefox</span>
                  <p className="text-slate-400 text-xs font-sans">
                    Opções &gt; Privacidade e Segurança &gt; Cookies
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#131318] border border-white/5 space-y-1">
                  <span className="text-[#a280ff] font-bold">Apple Safari</span>
                  <p className="text-slate-400 text-xs font-sans">
                    Preferências &gt; Privacidade &gt; Gerenciar Dados
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#131318] border border-white/5 space-y-1">
                  <span className="text-[#a280ff] font-bold">Microsoft Edge</span>
                  <p className="text-slate-400 text-xs font-sans">
                    Configurações &gt; Permissões de Site &gt; Cookies
                  </p>
                </div>
              </div>
            </div>

            {/* 6. Contato */}
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-6 tracking-tight">
                6. Contato
              </h2>
              <p className="text-slate-300">
                Se tiver dúvidas sobre nossa utilização de cookies, entre em contato através do
                e-mail{" "}
                <a
                  href="mailto:contato@opnora.tech"
                  className="text-[#a280ff] hover:text-[#b3a1ff] font-medium underline transition-colors"
                >
                  contato@opnora.tech
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
