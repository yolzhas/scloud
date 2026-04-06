"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";

const spring = (delay: number) => ({
  type: "spring" as const,
  stiffness: 80,
  damping: 20,
  delay,
});

/* ---- Network constellation node positions ---- */
const NODES = [
  { cx: 140, cy: 80, r: 6, delay: 0.3 },
  { cx: 260, cy: 50, r: 4, delay: 0.4 },
  { cx: 320, cy: 140, r: 7, delay: 0.35 },
  { cx: 180, cy: 200, r: 5, delay: 0.45 },
  { cx: 80, cy: 180, r: 4, delay: 0.5 },
  { cx: 240, cy: 260, r: 6, delay: 0.42 },
  { cx: 360, cy: 240, r: 4, delay: 0.48 },
  { cx: 100, cy: 300, r: 5, delay: 0.38 },
  { cx: 300, cy: 340, r: 7, delay: 0.44 },
  { cx: 200, cy: 360, r: 4, delay: 0.52 },
];

const EDGES = [
  [0, 1], [0, 3], [0, 4], [1, 2], [2, 3],
  [3, 5], [4, 7], [5, 6], [5, 8], [7, 9], [8, 9],
];

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="flex pt-16 pb-12 md:pt-24 md:pb-16 lg:pt-32 lg:pb-20">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-8 px-4 md:px-8 lg:grid-cols-[3fr_2fr] lg:gap-16">
        {/* Left column - content */}
        <div>
          <motion.h1
            className="text-4xl font-black leading-[0.95] tracking-tighter text-zinc-950 md:text-5xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring(0)}
          >
            {t("headline")}
          </motion.h1>

          <motion.p
            className="mt-6 max-w-[55ch] text-base leading-relaxed text-zinc-500 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring(0.15)}
          >
            {t("subtext")}
          </motion.p>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring(0.3)}
          >
            <Button variant="tertiary" href="#modules">
              {t("cta")}
            </Button>
          </motion.div>
        </div>

        {/* Right column - network constellation (desktop only) */}
        <motion.div
          className="hidden lg:flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <svg
            viewBox="0 0 440 420"
            fill="none"
            className="w-full max-w-[400px] h-auto"
          >
            <style>{`
              @keyframes pulse-ring {
                0% { r: var(--r-start); opacity: 0.3; }
                100% { r: var(--r-end); opacity: 0; }
              }
              .pulse { animation: pulse-ring 2.5s ease-out infinite; }
            `}</style>

            {/* Connection lines — static */}
            {EDGES.map(([from, to], i) => (
              <line
                key={`edge-${i}`}
                x1={NODES[from].cx}
                y1={NODES[from].cy}
                x2={NODES[to].cx}
                y2={NODES[to].cy}
                stroke="#D90217"
                strokeOpacity={0.12}
                strokeWidth={1}
              />
            ))}

            {/* Nodes — static */}
            {NODES.map((node, i) => (
              <circle
                key={`node-${i}`}
                cx={node.cx}
                cy={node.cy}
                r={node.r}
                fill="#D90217"
                fillOpacity={i % 3 === 0 ? 0.25 : 0.1}
                stroke="#D90217"
                strokeOpacity={0.2}
                strokeWidth={1}
              />
            ))}

            {/* Pulse rings — CSS animated */}
            {[0, 2, 5, 8].map((idx) => (
              <circle
                key={`pulse-${idx}`}
                cx={NODES[idx].cx}
                cy={NODES[idx].cy}
                fill="none"
                stroke="#D90217"
                strokeWidth={1}
                className="pulse"
                style={{
                  "--r-start": NODES[idx].r,
                  "--r-end": NODES[idx].r + 14,
                  animationDelay: `${idx * 0.4}s`,
                } as React.CSSProperties}
              />
            ))}

            {/* Central hub glow — static */}
            <circle
              cx={NODES[2].cx}
              cy={NODES[2].cy}
              r={18}
              fill="#D90217"
              fillOpacity={0.06}
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
