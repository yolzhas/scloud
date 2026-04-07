"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "@phosphor-icons/react";

export default function TopBanner() {
  const t = useTranslations("banner");
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden bg-brand-red"
        >
          <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-2.5 md:px-8">
            <p className="text-sm text-white">{t("text")}</p>

            <div className="flex items-center gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-white underline-offset-4 transition-all hover:underline"
              >
                {t("cta")}
                <ArrowRight
                  size={14}
                  weight="bold"
                  className="transition-transform group-hover:translate-x-0.5 rtl:scale-x-[-1]"
                />
              </a>

              <button
                onClick={() => setVisible(false)}
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-white/80 transition-colors hover:text-white"
                aria-label="Dismiss banner"
              >
                <X size={16} weight="bold" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
