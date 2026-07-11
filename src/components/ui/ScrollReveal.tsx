import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

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
    hidden: { opacity: 0, y: 30 },
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
  duration = 900,
  className,
  children,
  as: Component = "div",
  once = true,
  ...props
}: ScrollRevealProps) {
  // O motion() cria componentes animados nativos do Framer Motion a partir de tags HTML padrão.
  const MotionComponent = (motion as any)[Component as string] || motion.div;
  
  // Convertendo delay e duration (ms) para segundos (s)
  const delaySec = delay / 1000;
  const durationSec = duration / 1000;

  const selectedVariant = variants[animation] || variants["sr-fade-up"];

  return (
    <MotionComponent
      className={cn("relative", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.1, margin: "100px 0px -50px 0px" }}
      variants={selectedVariant}
      transition={{
        duration: durationSec,
        delay: delaySec,
        ease: [0.2, 0.8, 0.2, 1], // ease out cubic, igual o CSS anterior
      }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
