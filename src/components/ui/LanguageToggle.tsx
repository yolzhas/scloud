"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";

const LOCALES = [
  { code: "en", flag: "\u{1F1EC}\u{1F1E7}", label: "EN" },
  { code: "ar", flag: "\u{1F1F8}\u{1F1E6}", label: "AR" },
  { code: "fr", flag: "\u{1F1EB}\u{1F1F7}", label: "FR" },
  { code: "es", flag: "\u{1F1EA}\u{1F1F8}", label: "ES" },
  { code: "ru", flag: "\u{1F1F7}\u{1F1FA}", label: "RU" },
] as const;

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function switchLocale(code: string) {
    if (code === locale) {
      setOpen(false);
      return;
    }
    router.replace(pathname, { locale: code });
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-base font-bold transition-colors hover:bg-zinc-100 md:text-lg"
        aria-label="Change language"
      >
        <span className="text-lg leading-none">{current.flag}</span>
        <span className="text-zinc-700">{current.label}</span>
        <svg
          className={`h-3.5 w-3.5 text-zinc-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full mt-1 end-0 z-50 min-w-[140px] overflow-hidden rounded-xl border border-zinc-200 bg-white py-1 shadow-lg">
          {LOCALES.map((l) => (
            <button
              key={l.code}
              onClick={() => switchLocale(l.code)}
              className={`flex w-full items-center gap-2.5 px-3.5 py-2.5 text-sm font-medium transition-colors ${
                l.code === locale
                  ? "bg-zinc-50 text-brand-red"
                  : "text-zinc-700 hover:bg-zinc-50"
              }`}
            >
              <span className="text-base leading-none">{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
