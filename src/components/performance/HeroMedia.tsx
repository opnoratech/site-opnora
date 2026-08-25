import React from "react";
import { cn } from "@/lib/utils";

interface HeroMediaProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** URL of the desktop image */
  src: string;
  /** Optional URL for mobile image. If not provided, src is used for both. */
  mobileSrc?: string;
  /** Essential for CLS prevention. e.g. 1920 */
  width: number;
  /** Essential for CLS prevention. e.g. 1080 */
  height: number;
  /** Set to true ONLY if this image is the Largest Contentful Paint (LCP) element */
  isPriority?: boolean;
  /** How the image should fit its container. Default is "cover" */
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  /** Focal point of the image. Default is "center" */
  objectPosition?: string;
}

/**
 * A highly optimized image component for Hero sections.
 * Automatically handles fetchPriority, lazy loading prevention for LCP, and <picture> tag for responsive images.
 */
export function HeroMedia({
  src,
  mobileSrc,
  width,
  height,
  isPriority = false,
  objectFit = "cover",
  objectPosition = "center",
  className,
  alt = "",
  ...props
}: HeroMediaProps) {
  return (
    <picture className="absolute inset-0 w-full h-full">
      {/* Load mobile specific image for screens < 768px if provided */}
      {mobileSrc && <source media="(max-width: 767px)" srcSet={mobileSrc} />}

      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        // LCP elements must be prioritized and never lazy-loaded
        fetchPriority={isPriority ? "high" : "auto"}
        loading={isPriority ? "eager" : "lazy"}
        // Async decoding doesn't block the main thread
        decoding="async"
        style={{ objectFit, objectPosition }}
        className={cn("w-full h-full", className)}
        {...props}
      />
    </picture>
  );
}
