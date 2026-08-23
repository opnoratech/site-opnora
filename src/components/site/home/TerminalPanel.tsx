import { useEffect, useRef, useState } from "react";

type Line =
	| { type: "prompt"; text: string; cmd: string }
	| { type: "out"; text: string }
	| { type: "status"; label: string; value: string; color: string };

const LINES: Line[] = [
	{ type: "prompt", text: "~/opnora $", cmd: "init --system" },
	{ type: "out", text: "Opnora OS v0.1.1: inicializando..." },
	{ type: "out", text: "" },
	{
		type: "status",
		label: "Opnora Build",
		value: "ATIVO",
		color: "text-[#b873ff]",
	},
	{
		type: "status",
		label: "Opnora Intelligence",
		value: "ATIVO",
		color: "text-[#00d8ff]",
	},
	{
		type: "status",
		label: "Opnora Labs",
		value: "EM EVOLUÇÃO",
		color: "text-[#00ff88]",
	},
	{ type: "out", text: "" },
	{ type: "prompt", text: "~/opnora $", cmd: "get mission --brief" },
	{
		type: "out",
		text: "Desenvolver software e transformar desafios em soluções reais.",
	},
	{ type: "out", text: "" },
];

export function TerminalPanel({ startDelay = 400 }: { startDelay?: number }) {
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

				if (line.type === "prompt") delay = 250;
				else if (line.type === "out" && line.text.includes("inicializando"))
					delay = 400;
				else if (line.type === "status") delay = 120;
				else if (line.text === "") delay = 50;

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
						<span className="font-mono text-xs text-slate-400">
							opnora — system/status
						</span>
					</div>
				</div>
				{/* Content */}
				<pre className="m-0 overflow-x-auto whitespace-pre-wrap break-words p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-foreground/90 min-h-[320px]">
					{LINES.slice(0, visibleLines).map((line, i) => {
						if (line.type === "prompt") {
							return (
								<div key={i} className="mt-3 first:mt-0 font-medium">
									<span className="text-[#5eead4]">{line.text}</span>{" "}
									<span className="text-white font-bold">{line.cmd}</span>
								</div>
							);
						}
						if (line.type === "out") {
							if (line.text === "") return <div key={i} className="h-3"></div>;
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
									className="flex items-center gap-3 mt-1.5 animate-in fade-in slide-in-from-bottom-1 duration-300"
								>
									<span className={`text-[9px] ${line.color}`}>●</span>
									<span className={`${line.color} font-medium`}>
										{line.label}
									</span>
									<span className="text-slate-600">·</span>
									<span className={`${line.color} font-bold tracking-wide`}>
										[{line.value}]
									</span>
								</div>
							);
						}
					})}

					{visibleLines < LINES.length ? (
						<div className="mt-1">
							<span className="cursor-blink inline-block h-4 w-2 translate-y-0.5 bg-foreground/80" />
						</div>
					) : (
						<div className="mt-3">
							<span className="text-[#5eead4] font-medium">~/opnora $</span>{" "}
							<span className="cursor-blink inline-block h-4 w-2 translate-y-0.5 bg-foreground/80" />
						</div>
					)}
				</pre>
			</div>
		</div>
	);
}
