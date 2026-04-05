"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: "en" | "ar") {
    if (newLocale === locale) return;
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div className="inline-flex items-center gap-1 text-base md:text-lg font-bold">
      <button
        onClick={() => switchLocale("en")}
        className={`min-h-[44px] min-w-[44px] inline-flex items-center justify-center transition-colors duration-200 ${
          locale === "en"
            ? "text-brand-red border-b-2 border-brand-red"
            : "text-zinc-400 hover:text-zinc-600"
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="text-zinc-300 select-none" aria-hidden="true">
        |
      </span>
      <button
        onClick={() => switchLocale("ar")}
        className={`min-h-[44px] min-w-[44px] inline-flex items-center justify-center transition-colors duration-200 ${
          locale === "ar"
            ? "text-brand-red border-b-2 border-brand-red"
            : "text-zinc-400 hover:text-zinc-600"
        }`}
        aria-label="Switch to Arabic"
      >
        AR
      </button>
    </div>
  );
}
