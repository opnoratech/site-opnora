import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [{ title: "Política de Privacidade — Opnora" }],
  }),
  component: PrivacidadePage,
});

function PrivacidadePage() {
  return (
    <main className="flex-1 bg-[#050507]">
      {/* Header Section */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden border-b border-white/5">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-gradient-to-l from-[#a280ff]/10 to-[#38bdf8]/5 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/2 pointer-events-none" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#a280ff]">
              LEGAL
            </span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight uppercase leading-[0.9]">
            <span className="block text-white">
              POLÍTICA DE
            </span>
            <span
              className="inline-block text-transparent bg-clip-text w-fit"
              style={{
                backgroundImage: "linear-gradient(160deg, #a79df0, #82b8f7, #4ed4cf, #58e5a6)",
              }}
            >
              PRIVACIDADE
            </span>
          </h1>

          <p className="text-slate-500 mt-10 font-mono text-[11px] uppercase tracking-wider">
            Última atualização: Junho de 2026
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 text-slate-400 font-light leading-relaxed text-[14px] sm:text-[15px]">
            <div className="pb-8 border-b border-white/5">
              <h2 className="font-display text-lg font-bold text-white mb-6">1. Introdução</h2>
              <p className="mb-4">
                Coletamos informações que você nos fornece diretamente, incluindo:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-4 marker:text-[#38bdf8]">
                <li>
                  <strong className="text-slate-300 font-medium">Formulários de contato:</strong>{" "}
                  Nome, e-mail e conteúdo da mensagem quando você entra em contato conosco.
                </li>
                <li>
                  <strong className="text-slate-300 font-medium">Detalhes do projeto:</strong>{" "}
                  Informações técnicas e requisitos que você compartilha para podermos orçar e
                  desenvolver sua solução.
                </li>
              </ul>
            </div>

            <div className="pb-8 border-b border-white/5">
              <h2 className="font-display text-lg font-bold text-white mb-6">
                2. Informações Coletadas Automaticamente
              </h2>
              <p className="mb-4">
                Quando você visita nosso site, podemos coletar automaticamente:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-4 marker:text-[#38bdf8]">
                <li>
                  Visualizações de página, eventos de clique e padrões de navegação (análises
                  anônimas).
                </li>
                <li>Tipo de navegador, tipo de dispositivo e resolução de tela.</li>
                <li>Origem de referência e região geográfica aproximada.</li>
              </ul>
              <p className="mt-6 text-sm">
                Não utilizamos serviços de análise de terceiros que vendem dados. Todas as métricas
                de tráfego são tratadas com total respeito à sua privacidade.
              </p>
            </div>

            <div className="pb-8 border-b border-white/5">
              <h2 className="font-display text-lg font-bold text-white mb-6">
                3. Como Usamos Suas Informações
              </h2>
              <ul className="list-disc pl-5 space-y-2 marker:text-[#38bdf8]">
                <li>Para responder às suas dúvidas e processar solicitações de propostas.</li>
                <li>Para enviar atualizações sobre o projeto em andamento.</li>
                <li>Para melhorar nosso site, produtos e serviços.</li>
                <li>Para monitorar e prevenir abusos ou spam.</li>
              </ul>
            </div>

            <div className="pb-8 border-b border-white/5">
              <h2 className="font-display text-lg font-bold text-white mb-6">
                4. Compartilhamento de Dados
              </h2>
              <p className="mb-4">
                Nós não vendemos, trocamos ou alugamos suas informações pessoais para terceiros.
                Podemos compartilhar dados apenas:
              </p>
              <ul className="list-disc pl-5 space-y-2 marker:text-[#38bdf8]">
                <li>Quando exigido por lei ou processo legal válido.</li>
                <li>
                  Com provedores de serviços que nos ajudam a operar nosso negócio (hospedagem,
                  envio de e-mails), sob rígidos acordos de confidencialidade.
                </li>
              </ul>
            </div>

            <div className="pb-8 border-b border-white/5">
              <h2 className="font-display text-lg font-bold text-white mb-6">
                5. Retenção de Dados
              </h2>
              <p>
                Retemos seus dados pessoais apenas pelo tempo necessário para os fins descritos
                nesta política ou conforme exigido por lei. Projetos concluídos e históricos de
                comunicação são arquivados com segurança.
              </p>
            </div>

            <div>
              <h2 className="font-display text-lg font-bold text-white mb-6">6. Contato</h2>
              <p>
                Se você tiver dúvidas sobre esta política de privacidade ou sobre seus dados, entre
                em contato conosco enviando um e-mail.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

