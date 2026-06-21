import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { withLocale, type Story } from "@/lib/content";
import type { Locale } from "@/lib/booking";

type StoryPreviewProps = {
  stories: Story[];
  locale: Locale;
  compact?: boolean;
};

export function StoryPreview({
  stories,
  locale,
  compact = false,
}: StoryPreviewProps) {
  return (
    <div
      className={
        compact
          ? "grid grid-cols-1 gap-4 md:grid-cols-2"
          : "grid grid-cols-1 gap-4 md:grid-cols-3"
      }
    >
      {stories.map((story, index) => (
        <article
          key={story.slug}
          className="group overflow-hidden rounded-[1.5rem] border border-[#1d1712]/12 bg-[#fffaf0]/82 shadow-[0_18px_50px_rgba(68,54,43,0.1)] backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(68,54,43,0.18)]"
        >
          <Link
            href={withLocale(`/stories/${story.slug}`, locale)}
            className="block focus:outline-none focus:ring-2 focus:ring-[#095456] focus:ring-offset-2"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[#eee4d6]">
              <Image
                src={story.image}
                alt={story.imageAlt[locale]}
                fill
                sizes={compact ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
                priority={index === 0}
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <span className="absolute left-3 top-3 rounded-full border border-[#1d1712]/15 bg-[#fffaf0]/86 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1d1712] backdrop-blur">
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </span>
            </div>
            <div className="grid min-h-[230px] grid-rows-[auto_1fr_auto] border-t border-[#1d1712]/10 p-5">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#7c6d60]">
                <span>{story.city[locale]}</span>
                <span aria-hidden>·</span>
                <time dateTime={story.date}>{story.date}</time>
                <span aria-hidden>·</span>
                <span>{story.status[locale]}</span>
              </div>
              <div className="mt-4 space-y-2">
                <h3 className="text-xl font-semibold leading-7 text-[#1d1712]">
                  {story.title[locale]}
                </h3>
                <p className="text-sm leading-6 text-[#4b4038]">
                  {story.summary[locale]}
                </p>
              </div>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#095456]">
                {locale === "zh" ? "阅读故事" : "Read story"}
                <ArrowRight
                  className="h-4 w-4 transition group-hover:translate-x-1"
                  aria-hidden
                />
              </span>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
