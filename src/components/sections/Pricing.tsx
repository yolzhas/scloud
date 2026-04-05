"use client";

import { useTranslations } from "next-intl";
import { Check } from "@phosphor-icons/react";
import { PRICING_TIERS } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";

export default function Pricing() {
  const t = useTranslations("pricing");

  return (
    <section id="pricing" className="py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <SectionLabel title={t("title")} subtitle={t("subtitle")} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12 items-start">
          {PRICING_TIERS.map((tier, index) => {
            const isHighlighted = "highlighted" in tier && tier.highlighted;

            return (
              <ScrollReveal key={tier.key} delay={index * 0.1}>
                <div
                  className={`bg-white rounded-2xl border transition-all duration-300 hover:-translate-y-1 flex flex-col ${
                    isHighlighted
                      ? "p-10 lg:p-12 lg:-my-4 border-zinc-200/60 border-t-2 border-t-brand-red shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)]"
                      : "p-8 border-zinc-200/60"
                  }`}
                >
                  {/* Plan name */}
                  <h3
                    className={`font-bold text-zinc-950 mb-2 ${
                      isHighlighted ? "text-2xl" : "text-xl"
                    }`}
                  >
                    {t(`${tier.key}.name`)}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-zinc-500 leading-relaxed mb-8">
                    {t(`${tier.key}.description`)}
                  </p>

                  {/* Features */}
                  <ul className="flex flex-col gap-3 mb-8">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-sm text-zinc-700"
                      >
                        <Check
                          size={18}
                          weight="bold"
                          className="text-brand-red shrink-0"
                        />
                        {t(`${tier.key}.${feature}`)}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="mt-auto">
                    <Button
                      variant="secondary"
                      href="#contact"
                      className="w-full"
                    >
                      {t(`${tier.key}.cta`)}
                    </Button>
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
