import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "星点工具箱 - 专业的在线工具集合平台",
  description: "星点工具箱(stardottools.top)提供专业的在线工具服务，涵盖开发工具、设计工具、办公工具、生活工具等多个领域，免费、高效、即开即用",
  keywords: "星点工具箱,在线工具,开发工具,设计工具,办公工具,免费工具,stardottools.top",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        {/* 51.la 统计代码 */}
        <script 
          charSet="UTF-8" 
          id="LA_COLLECT" 
          src="https://sdk.51.la/js-sdk-pro.min.js"
          async
          crossOrigin="anonymous"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.LA_LOADED = function() {
              LA.init({
                id:"3NwBxMC1Swq9aXM0",
                ck:"3NwBxMC1Swq9aXM0",
                autoTrack: true,
                hashMode: true,
                screenRecord: true
              });
            }
            if (window.LA) {
              window.LA_LOADED();
            } else {
              document.addEventListener('LA_LOAD', window.LA_LOADED);
            }
            `
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        <LanguageProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <BackToTop />
          </div>
        </LanguageProvider>
      </body>
    </html>
  )
}
