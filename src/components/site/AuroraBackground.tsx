type Props = {
  className?: string;
  variant?: "full" | "soft";
};

export function AuroraBackground({ className = "", variant = "full" }: Props) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-aurora-cyan/40 to-transparent" />
      {variant === "full" && <div className="aurora-bg" />}
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/40 to-background" />
    </div>
  );
}
