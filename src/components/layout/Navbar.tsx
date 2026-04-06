"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { List, X } from "@phosphor-icons/react";
import { NAV_LINKS } from "@/lib/constants";
import Button from "@/components/ui/Button";
import LanguageToggle from "@/components/ui/LanguageToggle";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const logoSrc = locale === "ar" ? "/logo-ar.png" : "/logo-en.png";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const scrollTo = useCallback(
    (href: string) => {
      const id = href.replace("#", "");
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    },
    [],
  );

  return (
    <>
      <nav
        className={`sticky top-0 z-30 transition-all duration-300 ${
          scrolled
            ? "border-b border-zinc-200/50 bg-white/80 shadow-sm backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 md:h-20 md:px-8">
          {/* Logo */}
          <Image
            src={logoSrc}
            alt="S-Cloud"
            width={120}
            height={52}
            priority
            className="h-10 w-auto"
          />

          {/* Desktop nav links */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map(({ key, href }) => (
              <button
                key={key}
                onClick={() => scrollTo(href)}
                className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950"
              >
                {t(key)}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <LanguageToggle />

            <div className="hidden md:block">
              <Button
                href="#contact"
                variant="primary"
                onClick={() => scrollTo("#contact")}
              >
                {t("requestDemo")}
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-zinc-700 md:hidden"
              aria-label="Open menu"
            >
              <List size={28} weight="bold" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-zinc-950/95 backdrop-blur-md"
          >
            <div className="flex h-full flex-col px-6 py-6">
              {/* Close button */}
              <div className="flex justify-end">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-white"
                  aria-label="Close menu"
                >
                  <X size={28} weight="bold" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="mt-12 flex flex-1 flex-col gap-6">
                {NAV_LINKS.map(({ key, href }) => (
                  <button
                    key={key}
                    onClick={() => scrollTo(href)}
                    className="text-left text-2xl font-bold text-white transition-colors hover:text-zinc-300"
                  >
                    {t(key)}
                  </button>
                ))}
              </nav>

              {/* Bottom actions */}
              <div className="flex flex-col gap-6 pb-8">
                <LanguageToggle />
                <Button
                  href="#contact"
                  variant="primary"
                  className="w-full justify-center"
                  onClick={() => scrollTo("#contact")}
                >
                  {t("requestDemo")}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
