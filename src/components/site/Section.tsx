import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLElement>;

export function Section({ className = "", children, ...rest }: Props) {
  return (
    <section
      {...rest}
      className={`relative px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 ${className}`}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
