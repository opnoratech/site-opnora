import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { NAV, CONTACT } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-24 border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Iniciativa de desenvolvimento de software. Criamos sites, sistemas e plataformas sob medida para empresas que querem sair do improviso digital.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Navegação
            </h3>
            <ul className="mt-4 space-y-2">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    activeOptions={{ exact: item.to === "/" }}
                    className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Contato
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-foreground/80">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="hover:text-foreground">
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <Link to="/contato" className="hover:text-foreground">
                  Formulário de contato
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            © {year} Opnora. Iniciativa em construção.
          </p>
          <p className="text-xs text-muted-foreground">Feito com cuidado, em português.</p>
        </div>
      </div>

      {/* wordmark sutil de fundo */}
      <div
        aria-hidden
        className="pointer-events-none select-none overflow-hidden px-4 pb-6 text-center"
      >
        <span className="font-display block bg-clip-text text-[14vw] font-bold leading-none tracking-tight text-transparent [background-image:linear-gradient(180deg,oklch(0.18_0.03_268)_0%,transparent_85%)]">
          OPNORA
        </span>
      </div>
    </footer>
  );
}
