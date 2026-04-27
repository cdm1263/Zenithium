export const siteConfig = {
  baseUrl: "https://www.zenithium.info",
} as const;

export const getGoogleAnalyticsId = () =>
  process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ||
  process.env.GOOGLE_APPLICATION_ID ||
  "";
