import type { Metadata } from "next";
import { CoffeeFinder } from "@/components/coffee-finder";
import { SiteHeader } from "@/components/site-header";
import { getLocale } from "@/lib/content";

export const metadata: Metadata = {
  title: "咖啡阅读选择器 | 一杯时间",
  description:
    "从几个轻轻的问题开始，选一杯咖啡，进入一段故事。",
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
    <main className="min-h-screen bg-[#f4f1e8] text-[#111]">
      <SiteHeader locale={locale} />
      <CoffeeFinder locale={locale} />
    </main>
  );
}
