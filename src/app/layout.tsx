import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/Footer";
import FloatingScroller from "@/components/FloatingScroller";
import localFont from "next/font/local";
import { baseUrl } from "./sitemap";

const nanumSquare = localFont({
  src: "../../public/font/NanumSquareRoundB.ttf",
  display: "swap",
  variable: "--font-nanumsquare",
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "개발 블로그 Zenithium",
    template: "%s - 개발 블로그 Zenithium",
  },
  description: "To Zenith",
  openGraph: {
    title: "개발 블로그 Zenithium",
    description: "To Zenith",
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
  return (
    <html lang="en" className={`${nanumSquare.variable}`}>
      <body className={nanumSquare.className}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <Nav />
          <main className="flex flex-1 flex-col h-full py-20 bg-background mt-[600px] relative">
            <div className="pointer-events-none absolute inset-x-0 -top-8 h-8 bg-gradient-to-t from-background" />
            {children}
          </main>
          <Footer />
          <FloatingScroller />
        </ThemeProvider>
      </body>
    </html>
  );
}
