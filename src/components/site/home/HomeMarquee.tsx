export function HomeMarquee() {
	return (
		<div className="w-full overflow-hidden border-t border-white/[0.05] bg-[#0e0e12] py-6 md:py-8 select-none">
			<div
				className="animate-marquee flex whitespace-nowrap"
				style={{ width: "fit-content" }}
			>
				{/* Duplicated for seamless infinite scrolling */}
				{[...Array(2)].map((_, i) => (
					<div
						key={i}
						className="flex items-center gap-10 px-6 text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-slate-400 font-display"
					>
						<span>SOFTWARE SOB MEDIDA</span>
						<span className="h-1 w-1 rounded-full bg-[#a280ff]"></span>
						<span>SISTEMAS WEB</span>
						<span className="h-1 w-1 rounded-full bg-[#a280ff]"></span>
						<span>PLATAFORMAS DIGITAIS</span>
						<span className="h-1 w-1 rounded-full bg-[#a280ff]"></span>
						<span>INTERFACES</span>
						<span className="h-1 w-1 rounded-full bg-[#a280ff]"></span>
						<span>AUTOMAÇÃO</span>
						<span className="h-1 w-1 rounded-full bg-[#a280ff]"></span>
						<span>INTEGRAÇÕES</span>
						<span className="h-1 w-1 rounded-full bg-[#a280ff]"></span>
						<span>DADOS</span>
						<span className="h-1 w-1 rounded-full bg-[#a280ff]"></span>
						<span>PROTÓTIPOS</span>
						<span className="h-1 w-1 rounded-full bg-[#a280ff]"></span>
					</div>
				))}
			</div>
		</div>
	);
}
