import React, { Suspense } from "react";
import { cn } from "@/lib/utils";

interface StableSuspenseProps {
  /** The exact height of the fallback shell, if a fixed height is needed, e.g. "h-[700px]" */
  fallbackClassName?: string;
  /** The static outer shell or skeleton that renders immediately */
  fallback: React.ReactNode;
  /** The heavy async component */
  children: React.ReactNode;
  /** Optional wrapper class for the Suspense container */
  className?: string;
}

/**
 * StableSuspense prevents CLS (Cumulative Layout Shift) by requiring a structurally sound fallback.
 * Instead of just setting an arbitrary min-height, the fallback should mirror the actual layout
 * (header, sidebar, borders) of the loaded component.
 */
export function StableSuspense({
  fallback,
  children,
  fallbackClassName,
  className,
}: StableSuspenseProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <Suspense fallback={<div className={cn("w-full h-full", fallbackClassName)}>{fallback}</div>}>
        {children}
      </Suspense>
    </div>
  );
}
