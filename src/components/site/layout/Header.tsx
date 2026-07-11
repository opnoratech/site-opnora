import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { FaBars, FaXmark } from "react-icons/fa6";
import { Logo } from "./Logo";
import { NAV } from "@/config/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 pointer-events-none">
      {/* Subtle Aurora Detail top-left */}
      <div className={`pointer-events-none absolute left-0 top-0 h-full w-[200px] bg-gradient-to-r from-[#a280ff]/20 to-transparent opacity-30 blur-[40px] transition-opacity duration-500 ${isScrolled ? 'opacity-0' : 'opacity-30'}`} />

      <div
        className={
          `pointer-events-auto mx-auto grid w-full grid-cols-[1fr_auto_1fr] items-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ` +
          (isScrolled
            ? "max-w-[95%] lg:max-w-5xl h-[60px] lg:h-[64px] rounded-full border border-white/10 bg-[#131318]/80 backdrop-blur-xl shadow-2xl mt-4 px-6 lg:px-8"
            : "max-w-[90rem] h-[68px] lg:h-[84px] rounded-none border-transparent bg-transparent mt-0 px-6 lg:px-12")
        }
      >
        {/* Logo Container */}
        <div className="flex justify-start">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            aria-label="Opnora — Início"
            className="group shrink-0 transition-transform duration-300 hover:scale-[1.02] hover:brightness-110"
          >
            <Logo
              className={`transition-all duration-300 ease-in-out ${isScrolled ? "h-7 md:h-[32px]" : "h-9 md:h-[42px]"}`}
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
              className="group relative py-1 text-[14.5px] font-medium tracking-wide text-slate-400 transition-colors hover:text-[#a280ff] hover:drop-shadow-[0_0_4px_rgba(162,128,255,0.2)] data-[status=active]:text-[#a280ff]"
            >
              <span>{item.label}</span>
              {/* Active Underline Indicator */}
              <span className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-[#a280ff] transition-transform duration-300 ease-out group-data-[status=active]:scale-x-100 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        {/* Right Section: CTA & Mobile Toggle */}
        <div className="flex justify-end items-center gap-4">
          {/* Desktop CTA Button */}
          <Link
            to="/contato"
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-slate-400 transition-colors hover:text-white md:hidden"
          >
            {open ? <FaXmark className="size-5" /> : <FaBars className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {open && (
        <div className="absolute left-0 top-0 pt-[84px] pb-6 w-full border-b border-white/[0.07] bg-[#050507]/95 backdrop-blur-xl md:hidden pointer-events-auto -z-10">
          <nav className="flex flex-col gap-2 px-6" aria-label="Navegação mobile">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                onClick={() => setOpen(false)}
                className="block rounded-md px-4 py-3 text-lg font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white data-[status=active]:bg-white/5 data-[status=active]:text-[#a280ff]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
