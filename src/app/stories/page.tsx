import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { StoryPreview } from "@/components/story-preview";
import { getLocale, siteCopy, stories } from "@/lib/content";

export const metadata: Metadata = {
  title: "故事",
  description: "一杯时间的项目笔记、城市路线和之后的聊天故事。",
};

type StoriesPageProps = {
  searchParams?: Promise<{
    lang?: string;
  }>;
};

export default async function StoriesPage({ searchParams }: StoriesPageProps) {
  const params = await searchParams;
  const locale = getLocale(params?.lang);
  const copy = siteCopy[locale];

  return (
    <main className="min-h-screen bg-white text-[#111]">
      <SiteHeader locale={locale} />
      <section className="grid-bg mx-auto max-w-7xl border-x border-[#111] px-5 py-14 sm:px-8">
        <div className="mb-10 max-w-3xl space-y-4">
          <h1 className="text-4xl font-semibold leading-[1.2] text-[#111] sm:text-5xl">
            {copy.storiesPageTitle}
          </h1>
          <p className="text-base leading-8 text-[#333] sm:text-lg">
            {copy.storiesPageBody}
          </p>
        </div>
        <StoryPreview stories={stories} locale={locale} compact />
      </section>
    </main>
  );
}
