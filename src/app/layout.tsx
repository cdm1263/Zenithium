import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/Footer";
import CoverImage from "@/components/CoverImage";

const inter = Inter({ subsets: ["latin"] });

// TODO: 정적 메타데이터 내용 추가
export const metadata: Metadata = {
  title: "개발 블로그 Zenithium",
  description: "To Zenith, 최고의 개발자를 향해",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <Nav />
          <CoverImage />
          <section className="flex flex-col">
            <main className="flex flex-1 flex-col h-full py-20 bg-background mt-[500px] z-20">
              {children}
            </main>
            <Footer />
          </section>
        </ThemeProvider>
      </body>
    </html>
  );
}
