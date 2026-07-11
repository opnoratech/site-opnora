import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: Props) {
  const isCenter = align === "center";
  return (
    <div className={`${isCenter ? "mx-auto max-w-2xl text-center" : "max-w-3xl"} ${className}`}>
      {eyebrow && (
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-aurora-cyan">
          <span className="mr-2 inline-block h-px w-6 align-middle bg-aurora-cyan/70" />
          {eyebrow}
        </p>
      )}
      <h2 className="font-display mt-3 text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">{description}</p>
      )}
    </div>
  );
}
