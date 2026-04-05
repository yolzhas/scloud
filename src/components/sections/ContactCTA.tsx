"use client";

import { useTranslations } from "next-intl";
import { Check } from "@phosphor-icons/react";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ContactForm from "@/components/ui/ContactForm";

export default function ContactCTA() {
  const t = useTranslations("contact");

  const trustSignals = ["trust1", "trust2", "trust3"] as const;

  return (
    <section id="contact" className="py-20 md:py-28 bg-zinc-50">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16">
          {/* Left column */}
          <ScrollReveal delay={0}>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-950 leading-tight">
                {t("title")}
              </h2>
              <p className="text-base text-zinc-500 leading-relaxed mt-4 max-w-[45ch]">
                {t("subtitle")}
              </p>

              {/* Trust signals */}
              <div className="flex flex-col gap-3 mt-8">
                {trustSignals.map((key) => (
                  <div key={key} className="flex items-center gap-3">
                    <Check
                      size={20}
                      weight="bold"
                      className="text-brand-red shrink-0"
                    />
                    <span className="text-sm text-zinc-600 font-medium">
                      {t(key)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right column */}
          <ScrollReveal delay={0.15}>
            <div className="bg-white rounded-2xl border border-zinc-200/60 p-6 md:p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
              <ContactForm />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
