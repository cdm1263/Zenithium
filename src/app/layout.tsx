import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dongmin",
  description: "개발자로 살아남기",
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
          <section className="flex flex-col min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-4rem)]">
            <main className="flex flex-1 flex-col h-full">{children}</main>
            <Footer />
          </section>
        </ThemeProvider>
      </body>
    </html>
  );
}
