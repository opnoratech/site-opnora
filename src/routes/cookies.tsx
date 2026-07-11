import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [{ title: "Política de Cookies — Opnora" }],
  }),
  component: CookiesPage,
});

function CookiesPage() {
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
              COOKIES
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
              <h2 className="font-display text-lg font-bold text-white mb-6">
                1. O que são Cookies?
              </h2>
              <p>
                Utilizamos cookies de maneira mínima. Um cookie é um pequeno arquivo de texto
                armazenado no seu dispositivo quando você visita um site. Eles nos ajudam a fornecer
                funcionalidades essenciais e entender como nosso site é utilizado, mas sem
                comprometer a sua privacidade de forma invasiva.
              </p>
            </div>

            <div className="pb-8 border-b border-white/5">
              <h2 className="font-display text-lg font-bold text-white mb-6">
                2. Como utilizamos Cookies
              </h2>
              <p className="mb-4">
                Atualmente, aplicamos cookies principalmente para fins de funcionalidade:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-4 marker:text-[#38bdf8]">
                <li>
                  <strong className="text-slate-300 font-medium">
                    Preferências e Funcionalidade:
                  </strong>{" "}
                  Para lembrar suas configurações e escolhas dentro do site.
                </li>
                <li>
                  <strong className="text-slate-300 font-medium">Sessão Segura:</strong> Para manter
                  a autenticação de usuários administradores.
                </li>
                <li>
                  <strong className="text-slate-300 font-medium">Análise Anônima:</strong> Dados não
                  identificáveis que nos dizem quais partes do site são mais acessadas, ajudando a
                  melhorar a experiência geral.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-lg font-bold text-white mb-6">
                3. Gerenciamento de Cookies
              </h2>
              <p>
                Você pode instruir o seu navegador para recusar todos os cookies ou para indicar
                quando um cookie está sendo enviado. No entanto, se você não aceitar determinados
                cookies funcionais, algumas partes do nosso site podem não funcionar como esperado.
                Verifique as configurações de privacidade do seu navegador favorito para fazer esse
                controle.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

