import { PortalMark } from "../brand/PortalMark";

type Props = {
  className?: string;
  showWordmark?: boolean;
};

export function Logo({ className = "", showWordmark = true }: Props) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <PortalMark size={28} className="portal-pulse" />
      {showWordmark && (
        <span className="font-display text-lg font-semibold tracking-tight text-foreground">
          Opnora
        </span>
      )}
    </span>
  );
}
