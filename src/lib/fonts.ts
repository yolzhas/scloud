import localFont from "next/font/local";

export const altform = localFont({
  src: [
    { path: "../fonts/Altform-Light.otf", weight: "300", style: "normal" },
    {
      path: "../fonts/Altform-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    { path: "../fonts/Altform-Regular.otf", weight: "400", style: "normal" },
    {
      path: "../fonts/Altform-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    { path: "../fonts/Altform-Bold.otf", weight: "700", style: "normal" },
    {
      path: "../fonts/Altform-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    { path: "../fonts/Altform-Black.otf", weight: "900", style: "normal" },
    {
      path: "../fonts/Altform-BlackItalic.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-altform",
  display: "swap",
});

export const estedad = localFont({
  src: [
    { path: "../fonts/estedad/Estedad-Thin.woff2", weight: "100" },
    { path: "../fonts/estedad/Estedad-ExtraLight.woff2", weight: "200" },
    { path: "../fonts/estedad/Estedad-Light.woff2", weight: "300" },
    { path: "../fonts/estedad/Estedad-Regular.woff2", weight: "400" },
    { path: "../fonts/estedad/Estedad-Medium.woff2", weight: "500" },
    { path: "../fonts/estedad/Estedad-SemiBold.woff2", weight: "600" },
    { path: "../fonts/estedad/Estedad-Bold.woff2", weight: "700" },
    { path: "../fonts/estedad/Estedad-ExtraBold.woff2", weight: "800" },
    { path: "../fonts/estedad/Estedad-Black.woff2", weight: "900" },
  ],
  variable: "--font-estedad",
  display: "swap",
});
