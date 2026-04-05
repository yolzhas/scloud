"use client";

import { useTranslations } from "next-intl";
import {
  DeviceMobile,
  Storefront,
  Car,
  MapTrifold,
  Path,
  Package,
  ShoppingBag,
  UserPlus,
  Gift,
  Cloud,
  ChartBar,
  Code,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { MODULES } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";

const ITEM_ICONS: Record<string, Icon> = {
  consumerApp: DeviceMobile,
  merchantDashboard: Storefront,
  driverApp: Car,
  fleetManagement: MapTrifold,
  routingDispatch: Path,
  orderTracking: Package,
  marketplace: ShoppingBag,
  merchantOnboarding: UserPlus,
  promotionsLoyalty: Gift,
  cloudHosting: Cloud,
  analytics: ChartBar,
  apiSupport: Code,
};

export default function PlatformModules() {
  const t = useTranslations("modules");

  return (
    <section id="modules" className="py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <ScrollReveal>
          <SectionLabel title={t("title")} subtitle={t("subtitle")} />
        </ScrollReveal>

        {/* Primary row -- Core Platform + Operations Engine */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
          {MODULES.primary.map((category, catIndex) => (
            <ScrollReveal key={category.key} delay={catIndex * 0.12}>
              <div className="rounded-2xl border border-zinc-200/60 border-t-2 border-t-brand-red bg-white p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] md:p-10">
                <h3 className="mb-6 text-xl font-bold text-zinc-950 md:text-2xl">
                  {t(`${category.key}.title`)}
                </h3>

                <div className="divide-y divide-zinc-100">
                  {category.items.map((item) => {
                    const IconComponent = ITEM_ICONS[item];

                    return (
                      <div key={item} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                        <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-brand-red/8">
                          <IconComponent
                            size={20}
                            weight="duotone"
                            className="text-brand-red"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-zinc-900">
                            {t(`${category.key}.${item}.title`)}
                          </div>
                          <div className="mt-1 text-sm text-zinc-500">
                            {t(`${category.key}.${item}.description`)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Secondary row -- Commerce Tools + Infrastructure */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.2fr]">
          {MODULES.secondary.map((category, catIndex) => (
            <ScrollReveal key={category.key} delay={catIndex * 0.12}>
              <div className="rounded-2xl border border-zinc-100 bg-white p-6 md:p-8">
                <h3 className="mb-4 text-lg font-bold text-zinc-950">
                  {t(`${category.key}.title`)}
                </h3>

                <div className="divide-y divide-zinc-100">
                  {category.items.map((item) => {
                    const IconComponent = ITEM_ICONS[item];

                    return (
                      <div key={item} className="flex gap-4 py-3.5 first:pt-0 last:pb-0">
                        <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-zinc-100">
                          <IconComponent
                            size={18}
                            weight="duotone"
                            className="text-zinc-500"
                          />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-zinc-900">
                            {t(`${category.key}.${item}.title`)}
                          </div>
                          <div className="mt-0.5 text-sm text-zinc-500">
                            {t(`${category.key}.${item}.description`)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
