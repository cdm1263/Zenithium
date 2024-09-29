import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/Footer";
import FloatingScroller from "@/components/FloatingScroller";
import localFont from "next/font/local";

const nanumSquare = localFont({
  src: "../../public/font/NanumSquareRoundB.ttf",
  display: "swap",
  variable: "--font-nanumsquare",
});

// TODO: 정적 메타데이터 내용 추가
export const metadata: Metadata = {
  title: "개발 블로그 Zenithium",
  description: "To Zenith",
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
