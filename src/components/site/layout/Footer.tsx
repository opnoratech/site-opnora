import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Logo } from "./Logo";
import { trackWhatsAppClick } from "@/lib/analytics";

export function Footer() {
  const { settings } = useSiteSettings();
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-[#0c0c0f] pt-12 pb-8 md:pt-20 md:pb-10 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-x-4 gap-y-10 md:gap-8 grid-cols-2 lg:grid-cols-4">
          <div className="col-span-2 lg:col-span-1">
            <Logo className="h-6 md:h-7" />
            <p className="mt-2 max-w-[280px] text-[13px] leading-relaxed text-slate-400">
              Iniciativa de desenvolvimento de software. Criamos soluções digitais sob medida para
              empresas que querem organizar processos e evoluir com tecnologia.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={settings.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                onClick={() => trackWhatsAppClick("footer_icon")}
                className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-aurora-violet hover:border-aurora-violet/30 hover:bg-aurora-violet/5 transition-all duration-300"
              >
                <FaWhatsapp className="w-4.5 h-4.5" />
              </a>
              <a
                href={`mailto:${settings.email}`}
                aria-label="Email"
                className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-aurora-violet hover:border-aurora-violet/30 hover:bg-aurora-violet/5 transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={settings.linkedin || "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-aurora-violet hover:border-aurora-violet/30 hover:bg-aurora-violet/5 transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={settings.instagram || "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-aurora-violet hover:border-aurora-violet/30 hover:bg-aurora-violet/5 transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="col-span-1 lg:ml-auto">
            <h3 className="font-display text-[12px] font-bold uppercase tracking-[0.15em] text-white mb-3 md:mb-4">
              STARTUP
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/"
                  className="text-[14px] text-slate-400 transition-colors hover:text-aurora-violet"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  to="/sobre"
                  className="text-[14px] text-slate-400 transition-colors hover:text-aurora-violet"
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  to="/solucoes"
                  className="text-[14px] text-slate-400 transition-colors hover:text-aurora-violet"
                >
                  Soluções
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1 lg:ml-auto">
            <h3 className="font-display text-[12px] font-bold uppercase tracking-[0.15em] text-white mb-3 md:mb-4">
              EXPLORAR
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/precos"
                  className="text-[14px] text-slate-400 transition-colors hover:text-aurora-violet"
                >
                  Preços
                </Link>
              </li>
              <li>
                <Link
                  to="/contato"
                  className="text-[14px] text-slate-400 transition-colors hover:text-aurora-violet"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1 lg:col-span-1 lg:ml-auto">
            <h3 className="font-display text-[12px] font-bold uppercase tracking-[0.15em] text-white mb-3 md:mb-4">
              CONECTAR
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={settings.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("footer_link")}
                  className="text-[14px] text-slate-400 transition-colors hover:text-aurora-violet"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="text-[14px] text-slate-400 transition-colors hover:text-aurora-violet"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href={settings.linkedin || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] text-slate-400 transition-colors hover:text-aurora-violet"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={settings.instagram || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] text-slate-400 transition-colors hover:text-aurora-violet"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha divisória que não toca as bordas */}
        <div className="mt-12 pt-6 md:mt-20 md:pt-8 border-t border-white/10 flex flex-col items-center justify-between gap-4 md:flex-row md:items-center">
          <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.1em] text-slate-500 text-center md:text-left">
            © {year} Opnora. Todos os direitos reservados.
          </p>
          <div className="flex justify-center gap-6 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.1em] text-slate-500 w-full md:w-auto">
            <Link to="/privacidade" className="hover:text-aurora-violet transition-colors">
              Privacidade
            </Link>
            <Link to="/termos" className="hover:text-aurora-violet transition-colors">
              Termos
            </Link>
            <Link to="/cookies" className="hover:text-aurora-violet transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>

      {/* Giant Wordmark Background - Desktop only to avoid cluttering mobile */}
      <div className="absolute bottom-0 left-0 right-0 hidden md:flex justify-center pointer-events-none select-none z-0">
        <span className="font-display font-bold text-[16vw] leading-[0.8] tracking-tighter text-white/[0.05] whitespace-nowrap">
          OPNORA
        </span>
      </div>
    </footer>
  );
}
