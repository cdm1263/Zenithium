import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/Footer";
import FloatingScroller from "@/components/FloatingScroller";
import localFont from "next/font/local";
import { baseUrl } from "./sitemap";
import { Toaster } from "@/components/ui/toaster";
import { GoogleAnalytics } from "@next/third-parties/google";

const nanumSquareRound = localFont({
  src: [
    {
      path: "../../public/font/NanumSquareRoundL.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/font/NanumSquareRoundR.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/font/NanumSquareRoundB.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/font/NanumSquareRoundEB.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-nanum",
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "개발 블로그 Zenithium",
    template: "%s - 개발 블로그 Zenithium",
  },
  description: "To Zenith, 어제보다 한 걸음 위로",
  openGraph: {
    title: "개발 블로그 Zenithium",
    description: "To Zenith, 어제보다 한 걸음 위로",
    url: baseUrl,
    siteName: "개발 블로그 Zenithium",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: `${baseUrl}/api/og`,
        width: 1200,
        height: 630,
        alt: "개발 블로그 Zenithium OG 이미지",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "개발 블로그 Zenithium",
    description: "To Zenith",
    images: [`${baseUrl}/api/og`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID as string;
  return (
    <html lang="en" className={`${nanumSquareRound.variable}`}>
      <body className={nanumSquareRound.className}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <Nav />
          <main className="flex flex-1 flex-col h-full py-20 bg-background mt-[600px] relative">
            <div className="pointer-events-none absolute inset-x-0 -top-8 h-8 bg-gradient-to-t from-background" />
            {children}
          </main>
          <Footer />
          <FloatingScroller />
          <Toaster />
          <GoogleAnalytics gaId={gaId} />
        </ThemeProvider>
      </body>
    </html>
  );
}
