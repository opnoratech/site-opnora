type Props = {
  className?: string;
  showSubtitle?: boolean;
  showIcon?: boolean;
};

export function Logo({ className = "", showSubtitle = false, showIcon = true }: Props) {
  return (
    <span className={`inline-flex items-center gap-2.5 md:gap-3 select-none ${className}`}>
      {showIcon && (
        <span className="flex items-center justify-center shrink-0 h-full aspect-square scale-125 sm:scale-150 -mx-0.5 transition-transform duration-300 group-hover:scale-[1.58]">
          <img
            src="/images/opnora-icon-transparente.png"
            alt="Opnora — Aurora Icon"
            className="h-full w-full object-contain pointer-events-none"
          />
        </span>
      )}
      <span className="flex flex-col justify-center leading-none">
        <span className="font-display font-[800] text-white text-xl md:text-2xl tracking-[0.12em] transition-colors duration-300 group-hover:text-aurora-cyan">
          OPNORA
        </span>
        {showSubtitle && (
          <span className="font-sans font-medium text-[8px] md:text-[9.5px] uppercase tracking-[0.22em] text-slate-400 mt-0.5">
            TECNOLOGIAS
          </span>
        )}
      </span>
    </span>
  );
}
