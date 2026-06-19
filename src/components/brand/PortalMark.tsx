type Props = {
  className?: string;
  size?: number;
  title?: string;
};

/**
 * Símbolo Opnora — portal minimalista com trilha luminosa.
 * Funciona em tamanhos pequenos sem depender de brilho.
 */
export function PortalMark({ className, size = 28, title = "Opnora" }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      role="img"
      aria-label={title}
      className={className}
    >
      <defs>
        <linearGradient id="opnora-portal-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.82 0.16 180)" />
          <stop offset="55%" stopColor="oklch(0.78 0.16 200)" />
          <stop offset="100%" stopColor="oklch(0.68 0.22 295)" />
        </linearGradient>
        <linearGradient id="opnora-portal-trail" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.78 0.16 200)" stopOpacity="0" />
          <stop offset="100%" stopColor="oklch(0.68 0.22 295)" />
        </linearGradient>
      </defs>
      {/* arco do portal */}
      <path
        d="M10 34 V16 a10 10 0 0 1 20 0 V34"
        stroke="url(#opnora-portal-stroke)"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      {/* base / chão */}
      <path
        d="M6 34 H34"
        stroke="url(#opnora-portal-stroke)"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.55"
      />
      {/* trilha luminosa saindo do portal */}
      <path
        d="M20 34 C 18 30, 14 30, 12 26"
        stroke="url(#opnora-portal-trail)"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
