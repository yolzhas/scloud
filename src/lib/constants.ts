export const NAV_LINKS = [
  { key: "product", href: "#modules" },
  { key: "howItWorks", href: "#deployment" },
  { key: "pricing", href: "#pricing" },
  { key: "contact", href: "#contact" },
] as const;

export const STATS = [
  { value: 1.2, suffix: "M+", key: "users" },
  { value: 6, suffix: "+", key: "verticals" },
  { value: 15, suffix: " min", prefix: "~", key: "delivery" },
  { value: 0, suffix: "", key: "multiMarket", isText: true },
] as const;

export const SEGMENTS = [
  { key: "food", seed: "snoonu-food" },
  { key: "grocery", seed: "snoonu-grocery" },
  { key: "pharmacy", seed: "snoonu-pharmacy" },
  { key: "express", seed: "snoonu-express" },
  { key: "shopping", seed: "snoonu-shopping" },
] as const;

export const MODULES = {
  primary: [
    {
      key: "corePlatform",
      items: ["consumerApp", "merchantDashboard", "driverApp"],
    },
    {
      key: "operationsEngine",
      items: ["fleetManagement", "routingDispatch", "orderTracking"],
    },
  ],
  secondary: [
    {
      key: "commerceTools",
      items: ["marketplace", "merchantOnboarding", "promotionsLoyalty"],
    },
    {
      key: "infrastructure",
      items: ["cloudHosting", "analytics", "apiSupport"],
    },
  ],
} as const;

export const DEPLOYMENT_STEPS = [
  { key: "license", number: "01" },
  { key: "deploy", number: "02" },
  { key: "launch", number: "03" },
] as const;

export const PRICING_TIERS = [
  {
    key: "starter",
    features: ["coreModules", "setupFee", "flatMonthly"],
  },
  {
    key: "growth",
    features: ["fullPlatform", "setupMonthly", "lowTransaction"],
    highlighted: true,
  },
  {
    key: "enterprise",
    features: ["customDev", "dataResidency", "multiCountry"],
  },
] as const;

export const SOCIAL_LINKS = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/snoonu",
    icon: "InstagramLogo" as const,
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/snoonu.qa",
    icon: "FacebookLogo" as const,
  },
  {
    name: "X",
    url: "https://x.com/snoonu_qa",
    icon: "XLogo" as const,
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/channel/UCldXY2LDjfF_TBijZ3mdtZA",
    icon: "YoutubeLogo" as const,
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@snoonu",
    icon: "TiktokLogo" as const,
  },
] as const;

export const CONTACT_INFO = {
  address: "The 18th Tower, 14th Floor, Lusail, Qatar",
  email: "join@snoonu.com",
  phone: "+974 3111 2214",
} as const;

export const FOOTER_LINKS = [
  { key: "aboutUs", href: "https://join.snoonu.com/en/#about" },
  { key: "services", href: "https://join.snoonu.com/en/#services" },
  { key: "becomePartner", href: "https://join.snoonu.com/en/#partner-program" },
  { key: "privacyPolicy", href: "https://snoonu.com/privacy" },
  { key: "terms", href: "https://snoonu.com/terms" },
  { key: "merchantTerms", href: "#" },
] as const;

export const SHOW_TECH_PARTNERS = false;
