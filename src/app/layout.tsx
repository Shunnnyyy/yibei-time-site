import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yibei.chat"),
  title: {
    default: "一杯时间",
    template: "%s | 一杯时间",
  },
  description: "一杯咖啡的时间，认识一个新朋友。福州、多伦多和线上都可以预约。",
  openGraph: {
    title: "一杯时间",
    description: "一杯咖啡的时间，认识一个新朋友。",
    url: "https://yibei.chat",
    siteName: "一杯时间",
    locale: "zh_CN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
