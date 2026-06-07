import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { getLocale, getStory, siteCopy, stories, withLocale } from "@/lib/content";

type StoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{
    lang?: string;
  }>;
};

export function generateStaticParams() {
  return stories.map((story) => ({
    slug: story.slug,
  }));
}

export async function generateMetadata({
  params,
}: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);

  if (!story) {
    return {
      title: "故事未找到",
    };
  }

  return {
    title: story.title.zh,
    description: story.summary.zh,
  };
}

export default async function StoryPage({ params, searchParams }: StoryPageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const locale = getLocale(query?.lang);
  const copy = siteCopy[locale];
  const story = getStory(slug);

  if (!story) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-[#111]">
      <SiteHeader locale={locale} />
      <article className="grid-bg mx-auto max-w-4xl border-x border-[#111] px-5 py-12 sm:px-8">
        <Link
          href={withLocale("/stories", locale)}
          className="mb-8 inline-flex items-center gap-2 border border-[#111] bg-white px-4 py-3 text-sm font-semibold text-[#111] transition hover:bg-[#111] hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {copy.backToStories}
        </Link>

        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-sm text-[#333]">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" aria-hidden />
              {story.city[locale]}
            </span>
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4" aria-hidden />
              <time dateTime={story.date}>{story.date}</time>
            </span>
            <span>{story.status[locale]}</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-semibold leading-[1.18] text-[#111] sm:text-5xl">
              {story.title[locale]}
            </h1>
            <p className="text-lg leading-8 text-[#333]">
              {story.summary[locale]}
            </p>
          </div>
        </header>

        <div className="relative my-10 aspect-[16/10] overflow-hidden border border-[#111] bg-[#f2f2f2] shadow-[8px_8px_0_#111]">
          <Image
            src={story.image}
            alt={story.imageAlt[locale]}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover grayscale"
            priority
          />
        </div>

        <div className="space-y-6 border-t border-[#111] pt-9 text-[17px] leading-9 text-[#333]">
          {story.body[locale].map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
