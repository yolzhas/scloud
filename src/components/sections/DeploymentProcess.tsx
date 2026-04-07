"use client";

import { useTranslations } from "next-intl";
import { DEPLOYMENT_STEPS } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function DeploymentProcess() {
  const t = useTranslations("deployment");

  return (
    <section id="deployment" className="py-20 md:py-28 bg-zinc-950 text-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <SectionLabel
          title={t("title")}
          subtitle={t("subtitle")}
          className="[&_h2]:text-white [&_p]:text-zinc-400"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {DEPLOYMENT_STEPS.map((step, index) => (
            <ScrollReveal key={step.key} delay={index * 0.12}>
              <div
                className={`relative p-8 border-t pt-8 ${
                  index === 1
                    ? "border-brand-red md:scale-[1.02]"
                    : "border-zinc-800"
                }`}
              >
                {/* Large watermark number */}
                <span className="text-[120px] font-black text-white/[0.03] absolute -top-4 -left-2 leading-none select-none pointer-events-none">
                  {step.number}
                </span>

                {/* Step number badge */}
                <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-4">
                  {t("stepLabel", { number: step.number })}
                </p>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {t(`${step.key}.title`)}
                </h3>

                {/* Description */}
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {t(`${step.key}.description`)}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
