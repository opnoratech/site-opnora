import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/layout/Header";
import { Footer } from "@/components/site/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { SITE } from "@/config/site";

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#050507] px-4 py-16 sm:py-20 relative overflow-hidden">
      <style>{`
        footer { display: none !important; }
      `}</style>
      
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>
      </div>

      {/* Main Wide Card */}
      <div className="relative z-10 w-full max-w-4xl rounded-3xl border border-white/5 bg-[#0c0c0f]/80 backdrop-blur-xl p-8 sm:p-10 md:p-12 text-center shadow-2xl mt-8 flex flex-col items-center">
        
        <h1 className="font-display text-6xl sm:text-8xl md:text-[100px] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-aurora-violet to-aurora-cyan leading-none mb-4">
          404
        </h1>
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
          Esta Rota Está Ausente
        </h2>
        
        <p className="mt-4 text-sm text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
          O endereço que você digitou não está ativo no momento. Ele pode ter sido renomeado, removido ou digitado incorretamente.
        </p>
        
        <div className="mt-6 mb-8">
          <p className="font-mono text-[10px] sm:text-xs text-aurora-cyan uppercase tracking-[0.2em]">
            Status: Recurso solicitado não encontrado.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-sm bg-gradient-to-r from-aurora-violet to-aurora-cyan px-8 text-[11px] font-mono font-black uppercase tracking-[0.15em] text-white hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(64,196,255,0.3)]"
          >
            Página Inicial
          </Link>
          <Link
            to="/solucoes"
            className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-sm border border-white/10 bg-transparent px-8 text-[11px] font-mono font-black uppercase tracking-[0.15em] text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
          >
            Ver Soluções
          </Link>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"></div>

        <div className="w-full text-center">
          <p className="font-display text-[10px] sm:text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-6">
            Tente uma destas rotas
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: "Início", path: "/" },
              { label: "Sobre", path: "/sobre" },
              { label: "Soluções", path: "/solucoes" },
              { label: "Preços", path: "/precos" },
            ].map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className="rounded-full border border-white/10 bg-[#0e0e12] px-6 py-2.5 text-[11px] font-mono text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
              >
                {route.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#050507] px-4 py-24 sm:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-aurora-violet/10 blur-[120px] rounded-full pointer-events-none"></div>
      </div>

      <div className="relative z-10 w-full max-w-3xl rounded-3xl border border-white/5 bg-[#0c0c0f]/80 backdrop-blur-xl p-6 sm:p-10 md:p-16 text-center shadow-2xl mt-8">
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-aurora-violet to-aurora-cyan mb-6">
          Erro Inesperado
        </h1>
        <h2 className="text-xl sm:text-3xl font-display font-bold text-white tracking-tight">
          Esta página não carregou
        </h2>
        <p className="mt-6 text-sm sm:text-base text-slate-400 font-light max-w-lg mx-auto leading-relaxed">
          Algo deu errado durante a execução. Nossa equipe técnica foi notificada do erro de forma automática.
        </p>
        
        <div className="mt-8 mb-10">
          <p className="font-mono text-[10px] sm:text-xs text-aurora-cyan uppercase tracking-[0.2em]">
            Status: Erro interno de execução.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="cursor-pointer w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-sm bg-gradient-to-r from-aurora-violet to-aurora-cyan px-8 text-[11px] font-mono font-black uppercase tracking-[0.15em] text-white hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(64,196,255,0.3)]"
          >
            Tentar Novamente
          </button>
          <a
            href="/"
            className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-sm border border-white/10 bg-transparent px-8 text-[11px] font-mono font-black uppercase tracking-[0.15em] text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
          >
            Voltar ao Início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#050507" },
      { title: `${SITE.name} — ${SITE.tagline}` },
      { name: "description", content: SITE.description },
      { name: "author", content: SITE.name },
      { property: "og:site_name", content: SITE.name },
      { property: "og:type", content: "website" },
      { property: "og:title", content: `${SITE.name} — desenvolvimento de software sob medida` },
      { property: "og:description", content: SITE.description },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Orbitron:wght@700;800;900&family=Silkscreen:wght@400;700&family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=Outfit:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
      {
        rel: "icon",
        type: "image/png",
        href: "/images/favicon.png",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }`,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    // 2. Read the saved scroll position from the last session
    const savedScroll = sessionStorage.getItem("opnora_scroll_y");
    if (savedScroll) {
      const targetY = parseInt(savedScroll, 10);
      if (targetY > 100) {
        // Force the browser to start at the top immediately 
        window.scrollTo(0, 0);

        // Animate scroll frame-by-frame so IntersectionObserver fires
        // for each element as it enters the viewport — no animation bugs!
        const duration = 900; // ms — total scroll time
        const startTime = performance.now();
        const startY = 0;

        const easeInOutQuad = (t: number) =>
          t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

        const step = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = easeInOutQuad(progress);
          window.scrollTo(0, startY + (targetY - startY) * eased);
          if (progress < 1) requestAnimationFrame(step);
        };

        // small initial delay so the page renders at y=0 first
        setTimeout(() => requestAnimationFrame(step), 80);
      }
    }

    // 4. Continuously save the current scroll position
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      // debounce slightly for performance
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        sessionStorage.setItem("opnora_scroll_y", window.scrollY.toString());
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-dvh flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}
