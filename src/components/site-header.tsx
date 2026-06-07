import Link from "next/link";
import { Coffee } from "lucide-react";
import { siteCopy, withLocale } from "@/lib/content";
import type { Locale } from "@/lib/booking";

type SiteHeaderProps = {
  locale: Locale;
};

export function SiteHeader({ locale }: SiteHeaderProps) {
  const copy = siteCopy[locale];
  const nextLocale = locale === "zh" ? "en" : "zh";

  return (
    <header className="sticky top-0 z-30 border-b border-[#111] bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          href={withLocale("/", locale)}
          className="flex items-center gap-3 text-2xl font-semibold text-[#111]"
          aria-label="一杯时间首页"
        >
          <span className="flex h-8 w-8 items-center justify-center border border-[#111] bg-white">
            <Coffee className="h-4 w-4" aria-hidden />
          </span>
          一杯时间
        </Link>
        <Link
          className="border border-[#111] px-3 py-2 text-sm font-medium text-[#111] transition hover:bg-[#111] hover:text-white md:hidden"
          href={withLocale("/", nextLocale)}
        >
          {copy.language}
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-[#111] md:flex">
          <Link className="transition hover:opacity-60" href={withLocale("/stories", locale)}>
            {copy.navStories}
          </Link>
          <Link className="transition hover:opacity-60" href={withLocale("/#booking", locale)}>
            {copy.navBooking}
          </Link>
          <Link className="transition hover:opacity-60" href={withLocale("/#about", locale)}>
            {copy.navAbout}
          </Link>
          <Link
            className="border border-[#111] px-3 py-2 transition hover:bg-[#111] hover:text-white"
            href={withLocale("/", nextLocale)}
          >
            {copy.language}
          </Link>
        </nav>
      </div>
    </header>
  );
}
