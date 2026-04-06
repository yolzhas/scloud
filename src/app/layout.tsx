import type { Metadata } from "next";
import { altform, estedad, golosText } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "S-Cloud — Launch Your Own Super-App | By Snoonu",
  description:
    "A complete white-label delivery platform built at scale. Empowering governments, enterprises, and innovators to dominate their local markets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${altform.variable} ${estedad.variable} ${golosText.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
