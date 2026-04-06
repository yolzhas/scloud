"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import {
  MapPin,
  Envelope,
  Phone,
  InstagramLogo,
  FacebookLogo,
  XLogo,
  YoutubeLogo,
  TiktokLogo,
} from "@phosphor-icons/react";
import { SOCIAL_LINKS, CONTACT_INFO, FOOTER_LINKS } from "@/lib/constants";
import LanguageToggle from "@/components/ui/LanguageToggle";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SOCIAL_ICON_MAP: Record<string, React.ComponentType<any>> = {
  InstagramLogo,
  FacebookLogo,
  XLogo,
  YoutubeLogo,
  TiktokLogo,
};

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const logoSrc = locale === "ar" ? "/logo-ar.png" : "/logo-en.png";

  return (
    <footer className="bg-zinc-950">
      <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.5fr_1fr_1fr] md:gap-8">
          {/* Column 1 - Brand */}
          <div>
            <Image
              src={logoSrc}
              alt="S-Cloud"
              width={400}
              height={46}
              className="h-8 md:h-10 w-auto brightness-0 invert"
            />
            <p className="mt-4 max-w-[35ch] text-sm leading-relaxed text-zinc-400">
              {t("description")}
            </p>
          </div>

          {/* Column 2 - Contact + Social */}
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">
              {t("contactUs")}
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-zinc-500" />
                <span className="text-sm text-zinc-400">
                  {CONTACT_INFO.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Envelope size={18} className="shrink-0 text-zinc-500" />
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-zinc-500" />
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  {CONTACT_INFO.phone}
                </a>
              </li>
            </ul>

            {/* Follow Us */}
            <h3 className="mb-4 mt-8 text-sm font-bold uppercase tracking-widest text-white">
              {t("followUs")}
            </h3>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ name, url, icon }) => {
                const Icon = SOCIAL_ICON_MAP[icon];
                if (!Icon) return null;
                return (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 3 - Quick Links */}
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">
              {t("quickLinks")}
            </h3>
            <ul className="flex flex-col">
              {FOOTER_LINKS.map(({ key, href }) => (
                <li key={key}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="block py-1.5 text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {t(key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-zinc-800 pt-8 sm:flex-row sm:items-center">
          <LanguageToggle />
          <p className="text-sm text-zinc-500">
            &copy; {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
