"use client";

import { useTranslations } from "next-intl";
import {
  UsersThree,
  SquaresFour,
  Timer,
  GlobeHemisphereWest,
} from "@phosphor-icons/react";
import { STATS } from "@/lib/constants";
import CountUp from "@/components/ui/CountUp";
import ScrollReveal from "@/components/ui/ScrollReveal";

const STAT_ICONS = [UsersThree, SquaresFour, Timer, GlobeHemisphereWest];

export default function Stats() {
  const t = useTranslations("stats");

  return (
    <section className="py-12 md:py-16 bg-zinc-50/80">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {STATS.map((stat, index) => {
            const Icon = STAT_ICONS[index];

            return (
              <ScrollReveal key={stat.key} delay={index * 0.08}>
                <div className="flex flex-col rounded-2xl border border-zinc-200/60 bg-white px-6 py-8 md:px-8 md:py-10">
                  <div className="mb-6">
                    <Icon size={32} weight="light" className="text-zinc-950" />
                  </div>

                  <div className="text-3xl font-black tracking-tight text-zinc-950 md:text-4xl">
                    {"isText" in stat && stat.isText ? (
                      t("multiMarket")
                    ) : (
                      <CountUp
                        target={stat.value}
                        suffix={stat.suffix}
                        prefix={"prefix" in stat ? stat.prefix : ""}
                      />
                    )}
                  </div>

                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                    {"isText" in stat && stat.isText
                      ? t("multiMarketLabel")
                      : t(stat.key)}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
