import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface DeferredSectionProps {
  /** The actual content that should be rendered once visible */
  children: React.ReactNode;
  /** A stable placeholder (skeleton) that occupies the exact height needed to prevent CLS */
  fallback: React.ReactNode;
  /** Threshold to trigger loading (0 to 1). 0 means as soon as 1 pixel enters viewport, 0.5 means half */
  threshold?: number;
  /** Margin around the root. e.g. "200px" means load 200px before entering viewport */
  rootMargin?: string;
  /** Wrapper classes */
  className?: string;
}

/**
 * Defers rendering of non-critical sections (below the fold) until they are near the viewport.
 * Requires a stable fallback to ensure no CLS happens when the real content mounts.
 */
export function DeferredSection({
  children,
  fallback,
  threshold = 0,
  rootMargin = "200px 0px", // Loads slightly before scrolling into view
  className,
}: DeferredSectionProps) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect(); // Only need to load it once
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold, rootMargin]);

  return (
    <div
      ref={ref}
      className={cn("relative w-full", className)}
      style={{ contentVisibility: "auto", containIntrinsicSize: "auto 700px" }}
    >
      {isIntersecting ? children : fallback}
    </div>
  );
}
