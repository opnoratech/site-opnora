import { type HTMLMotionProps, m } from "framer-motion";
import type React from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps extends Omit<HTMLMotionProps<"div">, "as"> {
  animation?: "sr-fade-up" | "sr-fade-in" | "sr-scale-x" | "sr-scale-y";
  delay?: number;
  duration?: number;
  children: React.ReactNode;
  as?: React.ElementType;
  once?: boolean;
}

const variants = {
  "sr-fade-up": {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
  },
  "sr-fade-in": {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  "sr-scale-x": {
    hidden: { opacity: 0, scaleX: 0 },
    visible: { opacity: 1, scaleX: 1 },
  },
  "sr-scale-y": {
    hidden: { opacity: 0, scaleY: 0 },
    visible: { opacity: 1, scaleY: 1 },
  },
};

export function ScrollReveal({
  animation = "sr-fade-up",
  delay = 0,
  duration = 350,
  className,
  children,
  as: Component = "div",
  once = true,
  ...props
}: ScrollRevealProps) {
  // O m() cria componentes animados nativos do Framer Motion a partir de tags HTML padrão com LazyMotion.
  const MotionComponent: React.ElementType = m[Component as keyof typeof m] || m.div;

  // Convertendo delay e duration (ms) para segundos (s)
  const delaySec = delay / 1000;
  const durationSec = duration / 1000;

  const selectedVariant = variants[animation] || variants["sr-fade-up"];

  return (
    <MotionComponent
      className={cn("relative", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
      variants={selectedVariant}
      transition={{
        duration: durationSec,
        delay: delaySec,
        ease: [0, 0, 0.15, 1], // ease-out suave — sem hesitação no início
      }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
