import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import { NAV } from "@/config/site";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Bloqueia rolagem do body no mobile quando o menu está aberto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Evita a pílula flutuante e mantém largura total se o menu mobile estiver aberto
  const showFloatingHeader = isScrolled && !open;

  return (
    <>
      {/* Backdrop para fechar o menu mobile ao clicar fora e bloquear cliques na página abaixo */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(false);
        }}
        aria-hidden="true"
      />

      <header className="fixed top-0 left-0 w-full z-50 pointer-events-none">
        {/* Subtle Aurora Detail top-left */}
        <div
          className={`pointer-events-none absolute left-0 top-0 h-full w-[200px] bg-gradient-to-r from-[#a280ff]/20 to-transparent opacity-30 blur-[20px] md:blur-[40px] transition-opacity duration-500 ${showFloatingHeader ? "opacity-0" : "opacity-30"}`}
        />

        <div
          className={
            `pointer-events-auto mx-auto flex w-full items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ` +
            (showFloatingHeader
              ? "max-w-[95%] lg:max-w-5xl h-[60px] lg:h-[64px] rounded-full border border-white/10 bg-[#0c0c0f]/95 md:bg-[#131318]/80 backdrop-blur-none md:backdrop-blur-xl shadow-2xl mt-4 px-6 lg:px-8"
              : "max-w-[90rem] h-[68px] lg:h-[84px] rounded-none border-transparent bg-transparent mt-0 px-6 lg:px-12")
          }
        >
          {/* Logo Container */}
          <div className="flex justify-start">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              aria-label="Página inicial da Opnora"
              className="group shrink-0 transition-transform duration-300 hover:scale-[1.02] hover:brightness-110"
            >
              <Logo
                className={`transition-all duration-300 ease-in-out ${showFloatingHeader ? "h-[20px] md:h-[28px]" : "h-[26px] md:h-[36px]"}`}
              />
            </Link>
          </div>

          {/* Navigation - Centered */}
          <nav
            className="hidden items-center justify-center gap-8 md:flex"
            aria-label="Navegação principal"
          >
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="group relative py-1 text-[14.5px] font-medium tracking-wide text-slate-400 transition-colors hover:text-aurora-violet data-[status=active]:text-aurora-violet"
              >
                <span>{item.label}</span>
                {/* Active Underline Indicator */}
                <span className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-aurora-violet shadow-[0_0_6px_1px_rgba(162,128,255,0.35)] transition-transform duration-300 ease-out group-data-[status=active]:scale-x-100 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          {/* Right Section: CTA & Mobile Toggle */}
          <div className="flex justify-end items-center gap-4">
            {/* Desktop CTA Button */}
            <Link
              to="/contato"
              hash="formulario-contato"
              className="hidden md:inline-flex items-center justify-center px-6 py-2.5 text-[13px] font-bold uppercase tracking-wider text-[#050507] bg-white hover:bg-slate-200 rounded-full transition-colors duration-300"
            >
              Iniciar Projeto
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md text-slate-400 transition-colors hover:text-white md:hidden cursor-pointer"
            >
              {open ? <FaXmark className="size-5" /> : <FaBars className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <div
          className={`absolute left-0 top-0 pt-[84px] pb-6 w-full border-b border-white/10 bg-[#050507]/92 backdrop-blur-md md:backdrop-blur-2xl md:hidden pointer-events-auto -z-10 transition-all duration-300 ease-in-out shadow-[0_20px_50px_rgba(0,0,0,0.8)] ${
            open ? "translate-y-0 opacity-100 visible" : "-translate-y-4 opacity-0 invisible"
          }`}
        >
          {/* Top edge subtle glow line */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-aurora-violet/30 to-transparent" />

          <nav className="flex flex-col gap-2 px-6 pt-4" aria-label="Navegação mobile">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 text-[15px] font-display font-medium tracking-wide text-slate-400 transition-all duration-300 hover:text-white hover:bg-white/[0.02] data-[status=active]:text-white data-[status=active]:bg-aurora-violet/[0.07] data-[status=active]:border-l-2 data-[status=active]:border-aurora-violet data-[status=active]:pl-5 data-[status=active]:rounded-l-none"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
