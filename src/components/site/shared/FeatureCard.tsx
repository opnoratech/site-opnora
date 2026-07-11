import type { IconType } from "react-icons";

type Props = {
  icon: IconType;
  title: string;
  description: string;
  meta?: string;
};

export function FeatureCard({ icon: Icon, title, description, meta }: Props) {
  return (
    <article className="card-aurora group relative flex h-full flex-col rounded-2xl p-6">
      <div className="flex items-center gap-3">
        <span className="inline-flex size-10 items-center justify-center rounded-xl border border-aurora-cyan/30 bg-aurora-cyan/5 text-aurora-cyan">
          <Icon size={20} aria-hidden />
        </span>
        {meta && (
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {meta}
          </span>
        )}
      </div>
      <h3 className="font-display mt-5 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </article>
  );
}
