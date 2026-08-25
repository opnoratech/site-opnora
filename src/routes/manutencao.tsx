import { createFileRoute } from "@tanstack/react-router";
import { Terminal } from "lucide-react";

export const Route = createFileRoute("/manutencao")({
  component: ManutencaoPage,
});

function ManutencaoPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#050507] px-4 py-24 sm:py-32 relative overflow-hidden">
      <style>{`
				header, footer { display: none !important; }
			`}</style>
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-aurora-violet/10 blur-[60px] md:blur-[120px] rounded-full pointer-events-none"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl rounded-3xl border border-white/5 bg-[#0c0c0f]/80 backdrop-blur-xl p-8 sm:p-12 text-center shadow-2xl">
        <div className="flex justify-center mb-8">
          <div className="size-16 sm:size-20 bg-aurora-violet/10 rounded-2xl flex items-center justify-center border border-aurora-violet/20">
            <Terminal className="size-8 sm:size-10 text-aurora-violet" />
          </div>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-aurora-violet to-aurora-cyan mb-6">
          Em Manutenção
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-300 font-light max-w-lg mx-auto leading-relaxed">
          Estamos realizando melhorias programadas em nossos sistemas para oferecer uma experiência
          ainda melhor.
        </p>

        <p className="mt-4 text-sm text-slate-500 font-light max-w-lg mx-auto leading-relaxed">
          Voltaremos em breve. Agradecemos sua paciência!
        </p>

        <div className="mt-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <div className="size-2 rounded-full bg-aurora-cyan animate-pulse"></div>
            <span className="text-xs font-mono text-slate-300 uppercase tracking-widest">
              Sistemas em atualização
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
