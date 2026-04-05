"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  ForkKnife,
  ShoppingCart,
  FirstAidKit,
  Lightning,
  Storefront,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { SEGMENTS } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";

const SEGMENT_STYLES: Record<
  string,
  { gradient: string; icon: Icon; accent: string }
> = {
  food: {
    gradient: "from-orange-600 via-red-600 to-rose-700",
    icon: ForkKnife,
    accent: "bg-white/15",
  },
  grocery: {
    gradient: "from-emerald-600 via-green-600 to-teal-700",
    icon: ShoppingCart,
    accent: "bg-white/15",
  },
  pharmacy: {
    gradient: "from-sky-600 via-blue-600 to-indigo-700",
    icon: FirstAidKit,
    accent: "bg-white/15",
  },
  express: {
    gradient: "from-red-600 via-brand-red to-rose-800",
    icon: Lightning,
    accent: "bg-white/15",
  },
  shopping: {
    gradient: "from-violet-600 via-purple-600 to-fuchsia-700",
    icon: Storefront,
    accent: "bg-white/15",
  },
};

export default function SegmentShowcase() {
  const t = useTranslations("segments");
  const [active, setActive] = useState(0);

  return (
    <section id="segments" className="py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <ScrollReveal>
          <SectionLabel title={t("title")} subtitle={t("subtitle")} />
        </ScrollReveal>

        {/* Desktop accordion -- lg+ */}
        <div className="mt-12 hidden h-[500px] gap-3 lg:flex">
          {SEGMENTS.map((segment, index) => {
            const isActive = active === index;
            const style = SEGMENT_STYLES[segment.key];
            const IconComponent = style.icon;

            return (
              <div
                key={segment.key}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br ${style.gradient} transition-all duration-500 ease-out`}
                style={{ flex: isActive ? 4 : 1 }}
                onMouseEnter={() => setActive(index)}
              >
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="h-full w-full"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                      backgroundSize: "32px 32px",
                    }}
                  />
                </div>

                {/* Large background icon */}
                <div
                  className={`absolute transition-all duration-500 ${
                    isActive
                      ? "right-8 top-8 opacity-15"
                      : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20"
                  }`}
                >
                  <IconComponent
                    size={isActive ? 140 : 48}
                    weight="duotone"
                    className="text-white transition-all duration-500"
                  />
                </div>

                {/* Bottom gradient for text readability */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/30 to-transparent" />

                {/* Segment label */}
                <div
                  className={`absolute bottom-6 left-6 right-6 transition-all duration-500 ${
                    isActive
                      ? "translate-y-0 opacity-100"
                      : "translate-y-2 opacity-0"
                  }`}
                >
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 backdrop-blur-sm">
                    <IconComponent
                      size={16}
                      weight="bold"
                      className="text-white"
                    />
                    <span className="text-xs font-medium uppercase tracking-wider text-white/90">
                      {t(segment.key)}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {t(segment.key)}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile horizontal scroll -- below lg */}
        <div
          className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 -mx-4 px-4 lg:hidden"
          style={{ scrollbarWidth: "none" }}
        >
          {SEGMENTS.map((segment, index) => {
            const style = SEGMENT_STYLES[segment.key];
            const IconComponent = style.icon;

            return (
              <ScrollReveal key={segment.key} delay={index * 0.08}>
                <div
                  className={`relative h-[360px] min-w-[280px] flex-shrink-0 snap-center overflow-hidden rounded-2xl bg-gradient-to-br ${style.gradient}`}
                >
                  {/* Pattern overlay */}
                  <div className="absolute inset-0 opacity-10">
                    <div
                      className="h-full w-full"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                        backgroundSize: "32px 32px",
                      }}
                    />
                  </div>

                  {/* Background icon */}
                  <div className="absolute right-6 top-6 opacity-15">
                    <IconComponent
                      size={120}
                      weight="duotone"
                      className="text-white"
                    />
                  </div>

                  {/* Bottom gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/30 to-transparent" />

                  {/* Label */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 backdrop-blur-sm">
                      <IconComponent
                        size={16}
                        weight="bold"
                        className="text-white"
                      />
                      <span className="text-xs font-medium uppercase tracking-wider text-white/90">
                        {t(segment.key)}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {t(segment.key)}
                    </h3>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
