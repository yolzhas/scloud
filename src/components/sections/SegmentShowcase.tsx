"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { X, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { SEGMENTS } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function SegmentShowcase() {
  const t = useTranslations("segments");
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = () => setIsDesktop(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const openLightbox = (index: number) => setLightbox(index);
  const closeLightbox = () => setLightbox(null);

  const goNext = useCallback(() => {
    if (lightbox === null) return;
    setLightbox((lightbox + 1) % SEGMENTS.length);
  }, [lightbox]);

  const goPrev = useCallback(() => {
    if (lightbox === null) return;
    setLightbox((lightbox - 1 + SEGMENTS.length) % SEGMENTS.length);
  }, [lightbox]);

  useEffect(() => {
    if (lightbox === null) return;
    document.body.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, goNext, goPrev]);

  return (
    <>
      <section id="segments" className="py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <ScrollReveal>
            <SectionLabel title={t("title")} subtitle={t("subtitle")} />
          </ScrollReveal>

          {/* Desktop accordion -- lg+ */}
          {isDesktop !== false && <div className={`mt-12 h-[500px] gap-3 ${isDesktop === null ? "hidden lg:flex" : "flex"}`}>
            {SEGMENTS.map((segment, index) => {
              const isActive = active === index;

              return (
                <button
                  key={segment.key}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 ease-out block text-left"
                  style={{ flex: isActive ? 4 : 1 }}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => openLightbox(index)}
                >
                  {/* Background image - zoomed out to show more of screenshot */}
                  <div
                    className="absolute inset-0 bg-cover bg-top bg-no-repeat transition-transform duration-700 ease-out scale-[0.85] group-hover:scale-90"
                    style={{ backgroundImage: `url(${segment.image})` }}
                  />

                  {/* Subtle vignette background behind the zoomed-out image */}
                  <div className="absolute inset-0 bg-zinc-100 -z-10" />

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />

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
                </button>
              );
            })}
          </div>}

          {/* Mobile horizontal scroll -- below lg */}
          {isDesktop !== true && <div
            className={`mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 -mx-4 px-4 ${isDesktop === null ? "lg:hidden" : ""}`}
            style={{ scrollbarWidth: "none" }}
          >
            {SEGMENTS.map((segment, index) => (
              <ScrollReveal key={segment.key} delay={index * 0.08}>
                <button
                  onClick={() => openLightbox(index)}
                  className="relative h-[360px] min-w-[260px] flex-shrink-0 snap-center overflow-hidden rounded-2xl block text-left bg-zinc-100"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-top bg-no-repeat scale-[0.85]"
                    style={{ backgroundImage: `url(${segment.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-xl font-bold text-white">
                      {t(segment.key)}
                    </h3>
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>}
        </div>
      </section>

      {/* Lightbox gallery */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-zinc-950/90 backdrop-blur-sm"
              onClick={closeLightbox}
            />

            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Close"
            >
              <X size={24} weight="bold" />
            </button>

            {/* Title */}
            <div className="absolute top-6 left-6 z-10">
              <p className="text-white/60 text-sm font-medium">
                {lightbox + 1} / {SEGMENTS.length}
              </p>
              <h3 className="text-white text-xl font-bold mt-1">
                {t(SEGMENTS[lightbox].key)}
              </h3>
            </div>

            {/* Previous button */}
            <button
              onClick={goPrev}
              className="absolute left-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Previous"
            >
              <CaretLeft size={24} weight="bold" />
            </button>

            {/* Image */}
            <motion.div
              key={lightbox}
              className="relative z-10 max-h-[85vh] max-w-[440px] w-full mx-16"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: "spring" as const, stiffness: 200, damping: 25 }}
            >
              <img
                src={SEGMENTS[lightbox].image}
                alt={t(SEGMENTS[lightbox].key)}
                className="w-full h-auto rounded-2xl shadow-2xl"
                draggable={false}
              />
            </motion.div>

            {/* Next button */}
            <button
              onClick={goNext}
              className="absolute right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Next"
            >
              <CaretRight size={24} weight="bold" />
            </button>

            {/* Thumbnail strip */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
              {SEGMENTS.map((segment, index) => (
                <button
                  key={segment.key}
                  onClick={() => setLightbox(index)}
                  className={`h-12 w-12 rounded-lg overflow-hidden border-2 transition-all ${
                    index === lightbox
                      ? "border-white scale-110"
                      : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                >
                  <img
                    src={segment.image}
                    alt={t(segment.key)}
                    className="h-full w-full object-cover object-top"
                    draggable={false}
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
