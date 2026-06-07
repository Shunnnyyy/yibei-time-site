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
          className="group overflow-hidden border border-[#111] bg-white transition hover:-translate-y-1 hover:shadow-[8px_8px_0_#111]"
        >
          <Link
            href={withLocale(`/stories/${story.slug}`, locale)}
            className="block focus:outline-none focus:ring-2 focus:ring-[#111] focus:ring-offset-2"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[#f2f2f2]">
              <Image
                src={story.image}
                alt={story.imageAlt[locale]}
                fill
                sizes={compact ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
                priority={index === 0}
                className="object-cover grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
              />
            </div>
            <div className="space-y-4 p-5">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#555]">
                <span>{story.city[locale]}</span>
                <span aria-hidden>·</span>
                <time dateTime={story.date}>{story.date}</time>
                <span aria-hidden>·</span>
                <span>{story.status[locale]}</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold leading-7 text-[#111]">
                  {story.title[locale]}
                </h3>
                <p className="text-sm leading-6 text-[#333]">
                  {story.summary[locale]}
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#111]">
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
