"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

type CountUpProps = {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
};

function formatNumber(value: number, target: number): string {
  if (target >= 1_000_000) {
    return (value / 1_000_000).toFixed(1);
  }
  if (target >= 1_000) {
    return Math.round(value).toLocaleString();
  }
  if (target % 1 !== 0) {
    return value.toFixed(1);
  }
  return Math.round(value).toString();
}

export default function CountUp({
  target,
  suffix = "",
  prefix = "",
  duration = 2,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(formatNumber(0, target));
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate(value) {
        setDisplay(formatNumber(value, target));
      },
    });

    return () => controls.stop();
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
