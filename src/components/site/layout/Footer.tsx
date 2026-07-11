import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { CONTACT } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-[#0c0c0f] pt-20 pb-10 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-12 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo className="h-8" />
            <p className="mt-6 max-w-[280px] text-[14px] leading-relaxed text-slate-400">
              Iniciativa de desenvolvimento de software. Criamos soluções digitais sob medida para
              empresas que querem organizar processos e evoluir com tecnologia.
            </p>
          </div>

          <div className="lg:ml-auto">
            <h3 className="font-display text-[12px] font-bold uppercase tracking-[0.15em] text-white mb-6">
              NAVEGAÇÃO
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="text-[14px] text-slate-400 transition-colors hover:text-white"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  to="/sobre"
                  className="text-[14px] text-slate-400 transition-colors hover:text-white"
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  to="/precos"
                  className="text-[14px] text-slate-400 transition-colors hover:text-white"
                >
                  Preços
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:ml-auto">
            <h3 className="font-display text-[12px] font-bold uppercase tracking-[0.15em] text-white mb-6">
              EXPLORAR
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/solucoes"
                  className="text-[14px] text-slate-400 transition-colors hover:text-white"
                >
                  Soluções
                </Link>
              </li>
              <li>
                <Link
                  to="/contato"
                  className="text-[14px] text-slate-400 transition-colors hover:text-white"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:ml-auto">
            <h3 className="font-display text-[12px] font-bold uppercase tracking-[0.15em] text-white mb-6">
              CONECTAR
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-[14px] text-slate-400 transition-colors hover:text-white"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[14px] text-slate-400 transition-colors hover:text-white"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[14px] text-slate-400 transition-colors hover:text-white"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-28 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-slate-500">
            © {year} Opnora. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 font-mono text-[11px] uppercase tracking-[0.1em] text-slate-500">
            <Link to="/privacidade" className="hover:text-slate-300 transition-colors">
              Privacidade
            </Link>
            <Link to="/termos" className="hover:text-slate-300 transition-colors">
              Termos
            </Link>
            <Link to="/cookies" className="hover:text-slate-300 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>

      {/* Giant Wordmark Background */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none select-none z-0">
        <span className="font-display font-bold text-[20vw] leading-[0.8] tracking-tighter text-white/[0.05] whitespace-nowrap">
          OPNORA
        </span>
      </div>
    </footer>
  );
}
