type Line =
  | { type: "prompt"; text: string }
  | { type: "out"; text: string }
  | { type: "status"; label: string; value: string };

const LINES: Line[] = [
  { type: "prompt", text: "/opnora $ iniciar --solução" },
  { type: "out", text: "status: entendendo o problema..." },
  { type: "status", label: "software sob medida", value: "ATIVO" },
  { type: "status", label: "sites e plataformas", value: "ATIVO" },
  { type: "status", label: "integrações e automação", value: "ATIVO" },
  { type: "status", label: "dados e evolução contínua", value: "ATIVO" },
  { type: "prompt", text: "/opnora $ missão --breve" },
  { type: "out", text: "transformar problemas reais em soluções digitais que funcionam." },
];

export function TerminalPanel() {
  return (
    <div className="relative">
      {/* glow externo */}
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-3xl opacity-60 blur-2xl"
        style={{ background: "var(--gradient-portal)" }}
      />
      <div className="card-aurora overflow-hidden rounded-2xl">
        <div className="flex items-center justify-between border-b border-border/60 bg-surface-elevated/60 px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-aurora-magenta/80" />
            <span className="size-2.5 rounded-full bg-aurora-cyan/80" />
            <span className="size-2.5 rounded-full bg-aurora-violet/80" />
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            opnora • console
          </span>
        </div>
        <pre className="m-0 overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-foreground/90 sm:p-6 sm:text-sm">
{LINES.map((line, i) => {
  if (line.type === "prompt") {
    return (
      <div key={i} className="mt-3 first:mt-0">
        <span className="text-aurora-cyan">❯</span>{" "}
        <span className="text-foreground">{line.text}</span>
      </div>
    );
  }
  if (line.type === "out") {
    return (
      <div key={i} className="text-muted-foreground">
        {line.text}
      </div>
    );
  }
  return (
    <div key={i} className="flex items-center justify-between gap-4">
      <span className="text-foreground/80">{line.label}:</span>
      <span className="rounded border border-aurora-cyan/40 bg-aurora-cyan/10 px-2 py-0.5 text-[11px] font-semibold tracking-wider text-aurora-cyan">
        [{line.value}]
      </span>
    </div>
  );
})}
          <div className="mt-3">
            <span className="text-aurora-cyan">❯</span>{" "}
            <span className="cursor-blink inline-block h-4 w-2 translate-y-0.5 bg-foreground/80" />
          </div>
        </pre>
      </div>
    </div>
  );
}
