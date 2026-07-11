import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [{ title: "Termos de Uso — Opnora" }],
  }),
  component: TermosPage,
});

function TermosPage() {
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
              TERMOS DE
            </span>
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
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 text-slate-400 font-light leading-relaxed text-[14px] sm:text-[15px]">
            <div className="pb-8 border-b border-white/5">
              <h2 className="font-display text-lg font-bold text-white mb-6">
                1. Aceitação dos Termos
              </h2>
              <p>
                Ao acessar nosso site e interagir com nossos serviços de desenvolvimento e
                consultoria, você concorda em se vincular a estes Termos de Uso, bem como a todas as
                leis e regulamentos aplicáveis. Se você não concordar com algum destes termos, está
                proibido de usar este site.
              </p>
            </div>

            <div className="pb-8 border-b border-white/5">
              <h2 className="font-display text-lg font-bold text-white mb-6">2. Uso de Licença</h2>
              <p className="mb-4">
                É concedida permissão para baixar temporariamente uma cópia dos materiais
                (informações ou software) no site da Opnora, apenas para visualização transitória
                pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de
                título, e sob esta licença você não pode:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-4 marker:text-[#38bdf8]">
                <li>Modificar ou copiar os materiais;</li>
                <li>
                  Usar os materiais para qualquer finalidade comercial ou para exibição pública
                  (comercial ou não comercial);
                </li>
                <li>
                  Tentar descompilar ou fazer engenharia reversa de qualquer software contido no
                  site;
                </li>
                <li>
                  Remover quaisquer direitos autorais ou outras notações de propriedade dos
                  materiais.
                </li>
              </ul>
            </div>

            <div className="pb-8 border-b border-white/5">
              <h2 className="font-display text-lg font-bold text-white mb-6">
                3. Isenção de Responsabilidade
              </h2>
              <p>
                Os materiais no site da Opnora são fornecidos "como estão". A Opnora não oferece
                garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras
                garantias, incluindo, sem limitação, garantias implícitas ou condições de
                comercialização, adequação a um fim específico ou não violação de propriedade
                intelectual ou outra violação de direitos.
              </p>
            </div>

            <div className="pb-8 border-b border-white/5">
              <h2 className="font-display text-lg font-bold text-white mb-6">4. Limitações</h2>
              <p>
                Em nenhum caso a Opnora ou seus fornecedores serão responsáveis por quaisquer danos
                (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção
                dos negócios) decorrentes do uso ou da incapacidade de usar os materiais no nosso
                site.
              </p>
            </div>

            <div>
              <h2 className="font-display text-lg font-bold text-white mb-6">
                5. Precisão dos Materiais
              </h2>
              <p>
                Os materiais exibidos no site podem incluir erros técnicos, tipográficos ou
                fotográficos. Não garantimos que qualquer material no site seja preciso, completo ou
                atual. Podemos fazer alterações nos materiais contidos no site a qualquer momento,
                sem aviso prévio.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

