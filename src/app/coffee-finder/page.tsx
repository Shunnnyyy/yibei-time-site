import type { Metadata } from "next";
import { CoffeeFinder } from "@/components/coffee-finder";
import { SiteHeader } from "@/components/site-header";
import { getLocale } from "@/lib/content";

export const metadata: Metadata = {
  title: "咖啡阅读选择器 | 一杯时间",
  description:
    "一个 Vitra 风格的咖啡阅读选择器，用聊天时间和年龄段找到对应的一杯故事。",
};

type CoffeeFinderPageProps = {
  searchParams?: Promise<{
    lang?: string;
  }>;
};

export default async function CoffeeFinderPage({
  searchParams,
}: CoffeeFinderPageProps) {
  const params = await searchParams;
  const locale = getLocale(params?.lang);

  return (
    <main className="min-h-screen bg-white text-[#111]">
      <SiteHeader locale={locale} />
      <CoffeeFinder locale={locale} />
    </main>
  );
}
