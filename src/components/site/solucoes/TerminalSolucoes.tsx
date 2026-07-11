import { useState, useEffect, useRef } from "react";

type Line =
  | { type: "prompt"; text: string; cmd: string }
  | { type: "out"; text: string }
  | {
      type: "status";
      num: string;
      label: string;
      subLabel: string;
      value: string;
      colorClass: string;
      numColor: string;
      icon: string;
    };

const LINES: Line[] = [
  { type: "prompt", text: "opnora@core:~$", cmd: "status --frentes --live" },
  { type: "out", text: "" },
  {
    type: "status",
    num: "01",
    label: "opnora-build",
    subLabel: "sistemas-digitais-v1",
    value: "BUILDING",
    colorClass: "text-[#4ed4cf] border-[#4ed4cf]/20 bg-[#4ed4cf]/10",
    numColor: "text-[#4ed4cf]",
    icon: "⚙",
  },
  {
    type: "status",
    num: "02",
    label: "opnora-intelligence",
    subLabel: "automacao-dados-ia",
    value: "ACTIVE",
    colorClass: "text-[#58e5a6] border-[#58e5a6]/20 bg-[#58e5a6]/10",
    numColor: "text-[#58e5a6]",
    icon: "●",
  },
  {
    type: "status",
    num: "03",
    label: "opnora-labs",
    subLabel: "pesquisa-prototipos",
    value: "EXPERIMENTING",
    colorClass: "text-[#c084fc] border-[#c084fc]/20 bg-[#c084fc]/10",
    numColor: "text-[#c084fc]",
    icon: "⚗",
  },
  { type: "out", text: "" },
];

export function TerminalSolucoes({ startDelay = 400 }: { startDelay?: number }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isActive = false;
    let hasStarted = false;

    const runAnimation = async () => {
      isActive = true;
      // Pause to let the container animation finish before starting typing
      await new Promise((r) => setTimeout(r, startDelay));
      if (!isActive) return;

      for (let i = 0; i < LINES.length; i++) {
        setVisibleLines(i + 1);

        const line = LINES[i];
        let delay = 60;

        if (line.type === "prompt") delay = 350;
        else if (line.type === "status") delay = 180;
        else if (line.text === "") delay = 80;

        await new Promise((r) => setTimeout(r, delay));
        if (!isActive) break;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasStarted) {
          hasStarted = true;
          runAnimation();
        }
      },
      { threshold: 0.2 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      isActive = false;
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full shadow-2xl">
      <div className="overflow-hidden rounded-xl border border-white/[0.05] bg-[#120c1a]">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-white/[0.05] bg-[#1a1124] px-4 py-3 relative">
          <div className="flex items-center gap-1.5 absolute left-4">
            <span className="size-2.5 rounded-full bg-red-500" />
            <span className="size-2.5 rounded-full bg-yellow-500" />
            <span className="size-2.5 rounded-full bg-green-500" />
          </div>
          <div className="w-full text-center">
            <span className="font-mono text-xs text-slate-400">opnora — system/status</span>
          </div>
        </div>
        {/* Content */}
        <pre className="m-0 overflow-x-auto p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-foreground/90 min-h-[240px]">
          {LINES.slice(0, visibleLines).map((line, i) => {
            if (line.type === "prompt") {
              return (
                <div key={i} className="mt-2 font-medium">
                  <span className="text-[#5eead4]">{line.text}</span>{" "}
                  <span className="text-white font-bold">{line.cmd}</span>
                </div>
              );
            }
            if (line.type === "out") {
              if (line.text === "") return <div key={i} className="h-4"></div>;
              return (
                <div key={i} className="text-[#5eead4]/80 mt-1">
                  {line.text}
                </div>
              );
            }
            if (line.type === "status") {
              return (
                <div
                  key={i}
                  className="flex flex-col sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center py-2.5 border-b border-white/[0.03] animate-in fade-in slide-in-from-bottom-2 duration-300 min-w-max sm:min-w-0 gap-4 sm:gap-0"
                >
                  <div className="flex items-center">
                    <span className={`${line.numColor} font-bold mr-6`}>{line.num}</span>
                    <span className="text-slate-300 font-medium">{line.label}</span>
                  </div>
                  
                  <div className="text-slate-500 font-medium text-left sm:w-[190px]">
                    {line.subLabel}
                  </div>

                  <div className="flex justify-start sm:justify-end">
                    <div
                      className={`px-2 py-1 rounded text-[10px] font-bold border ${line.colorClass} flex items-center justify-center gap-1.5 w-fit`}
                    >
                      <span className={line.icon === "●" ? "text-[8px] -translate-y-[1px]" : ""} >
                        {line.icon}
                      </span>
                      {line.value}
                    </div>
                  </div>
                </div>
              );
            }
          })}

          {visibleLines < LINES.length ? (
            <div className="mt-2">
              <span className="cursor-blink inline-block h-4 w-2 translate-y-0.5 bg-foreground/80" />
            </div>
          ) : (
            <div className="mt-2">
              <span className="text-[#5eead4] font-medium">opnora@core:~$</span>{" "}
              <span className="cursor-blink inline-block h-4 w-2 translate-y-0.5 bg-[#5eead4]" />
            </div>
          )}
        </pre>
      </div>
    </div>
  );
}
