import { useEffect, useState, useRef } from "react";

export function AnimatedNumber({
  end,
  suffix = "",
  duration = 2000,
  className,
}: {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const [currentValue, setCurrentValue] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            // easeOutQuad for a smoother, less abrupt deceleration at the end
            const easeOut = 1 - (1 - progress) * (1 - progress);

            setCurrentValue(Math.floor(easeOut * end));

            if (progress < 1) {
              animationFrameId = window.requestAnimationFrame(step);
            } else {
              setCurrentValue(end);
            }
          };
          animationFrameId = window.requestAnimationFrame(step);
          observer.disconnect(); // Run animation only once
        }
      },
      { threshold: 0.1 },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [end, duration]);

  return (
    <span ref={elementRef} className={className}>
      {currentValue}
      {suffix}
    </span>
  );
}
