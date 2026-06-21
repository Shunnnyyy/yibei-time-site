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
    <header className="sticky top-0 z-30 border-b border-[#1d1712]/10 bg-[#fffaf0]/82 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          href={withLocale("/", locale)}
          className="flex items-center gap-3 text-2xl font-semibold text-[#1d1712]"
          aria-label="一杯时间首页"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1d1712]/15 bg-white shadow-[0_10px_24px_rgba(68,54,43,0.12)]">
            <Coffee className="h-4 w-4" aria-hidden />
          </span>
          一杯时间
        </Link>
        <Link
          className="rounded-full border border-[#1d1712]/20 bg-white/70 px-3 py-2 text-sm font-medium text-[#1d1712] transition hover:bg-[#1d1712] hover:text-[#fffaf0] md:hidden"
          href={withLocale("/", nextLocale)}
        >
          {copy.language}
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-[#1d1712] md:flex">
          <Link className="transition hover:opacity-60" href={withLocale("/stories", locale)}>
            {copy.navStories}
          </Link>
          <Link
            className="transition hover:opacity-60"
            href={withLocale("/coffee-finder", locale)}
          >
            {copy.navCoffee}
          </Link>
          <Link className="transition hover:opacity-60" href={withLocale("/#booking", locale)}>
            {copy.navBooking}
          </Link>
          <Link
            className="rounded-full border border-[#1d1712]/20 bg-white/70 px-4 py-2 transition hover:bg-[#1d1712] hover:text-[#fffaf0]"
            href={withLocale("/", nextLocale)}
          >
            {copy.language}
          </Link>
        </nav>
      </div>
    </header>
  );
}
