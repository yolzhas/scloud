import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const isArabic = locale === "ar";
  const fontClass =
    locale === "ar" ? "font-arabic" : locale === "ru" ? "font-cyrillic" : "font-sans";

  return (
    <div
      lang={locale}
      dir={isArabic ? "rtl" : "ltr"}
      className={`min-h-full flex flex-col ${fontClass}`}
    >
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </div>
  );
}
