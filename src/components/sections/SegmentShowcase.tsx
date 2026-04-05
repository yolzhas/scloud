"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { SEGMENTS } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";

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

            return (
              <a
                key={segment.key}
                href="#contact"
                className="group relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 ease-out block"
                style={{
                  flex: isActive ? 4 : 1,
                }}
                onMouseEnter={() => setActive(index)}
              >
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url(${segment.image})` }}
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-zinc-950/10 to-zinc-950/20" />

                {/* Segment label */}
                <div
                  className={`absolute bottom-6 left-6 right-6 transition-all duration-500 ${
                    isActive
                      ? "translate-y-0 opacity-100"
                      : "translate-y-2 opacity-0"
                  }`}
                >
                  <h3 className="text-2xl font-bold text-white">
                    {t(segment.key)}
                  </h3>
                </div>
              </a>
            );
          })}
        </div>

        {/* Mobile horizontal scroll -- below lg */}
        <div
          className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 -mx-4 px-4 lg:hidden"
          style={{ scrollbarWidth: "none" }}
        >
          {SEGMENTS.map((segment, index) => (
            <ScrollReveal key={segment.key} delay={index * 0.08}>
              <a
                href="#contact"
                className="relative h-[360px] min-w-[260px] flex-shrink-0 snap-center overflow-hidden rounded-2xl block"
                style={{
                  backgroundImage: `url(${segment.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-zinc-950/10 to-zinc-950/20" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-xl font-bold text-white">
                    {t(segment.key)}
                  </h3>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
