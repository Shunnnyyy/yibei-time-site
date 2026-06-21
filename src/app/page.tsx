import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarClock, Route, Sparkles, Waves } from "lucide-react";
import { BookingForm } from "@/components/booking-form";
import { CoffeeIcon } from "@/components/coffee-icons";
import { SiteHeader } from "@/components/site-header";
import { StoryPreview } from "@/components/story-preview";
import {
  coffeeProfiles,
  coffeeFinderCopy,
  getLocale,
  siteCopy,
  stories,
  withLocale,
} from "@/lib/content";

type HomeProps = {
  searchParams?: Promise<{
    lang?: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const locale = getLocale(params?.lang);
  const copy = siteCopy[locale];
  const finderCopy = coffeeFinderCopy[locale];

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f2e8] text-[#1d1712]">
      <SiteHeader locale={locale} />

      <section
        id="booking"
        className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl grid-cols-1 gap-8 px-5 pb-10 pt-7 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,0.84fr)] lg:items-center lg:pb-16 lg:pt-12"
      >
        <div className="flow-orbit flow-orbit-one" aria-hidden />
        <div className="flow-orbit flow-orbit-two" aria-hidden />
        <div className="space-y-6">
          <div className="max-w-2xl space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6d6258]">
              <span className="rounded-full border border-[#1d1712] bg-[#1d1712] px-3 py-1.5 text-[#fffaf0]">
                Summer 2026
              </span>
              <span>
                {locale === "zh"
                  ? "福州 · 多伦多 · 线上"
                  : "Fuzhou · Toronto · Online"}
              </span>
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-normal text-[#1d1712] sm:text-6xl lg:text-[68px]">
              {copy.heroTitle}
            </h1>
            <p className="max-w-xl text-base leading-7 text-[#4b4038] sm:text-lg">
              {copy.heroBody}
            </p>
            <div className="grid max-w-xl grid-cols-3 overflow-hidden rounded-full border border-[#1d1712]/20 bg-white/70 text-center text-xs font-semibold text-[#1d1712] shadow-[0_20px_60px_rgba(68,54,43,0.12)] backdrop-blur">
              {(locale === "zh"
                ? [
                    ["线下", "真实咖啡馆"],
                    ["线上", "跨时区"],
                    ["确认", "邮件收到"],
                  ]
                : [
                    ["In person", "Real cafe"],
                    ["Online", "Cross time"],
                    ["Confirm", "Email sent"],
                  ]
              ).map(([item, detail]) => (
                <span
                  key={item}
                  className="border-r border-[#1d1712]/15 px-2 py-3 last:border-r-0"
                >
                  <span className="block">{item}</span>
                  <span className="mt-0.5 block text-[10px] font-medium text-[#7c6d60]">
                    {detail}
                  </span>
                </span>
              ))}
            </div>
          </div>

          <BookingForm locale={locale} />
        </div>

        <div className="liquid-card relative min-h-[500px] overflow-hidden rounded-[2rem] border border-[#1d1712]/15 bg-[#fffaf0] shadow-[0_32px_90px_rgba(64,49,36,0.22)] lg:min-h-[620px]">
          <Image
            src="/images/coffee-hero.jpg"
            alt={locale === "zh" ? "咖啡桌面真实照片" : "Real coffee table photo"}
            fill
            priority
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(231,166,78,0.42),transparent_26%),linear-gradient(130deg,rgba(9,84,86,0.26),transparent_46%,rgba(247,242,232,0.6))]" />
          <svg
            className="flow-map absolute inset-x-[-8%] top-[16%] h-[56%] w-[116%]"
            viewBox="0 0 900 420"
            aria-hidden
          >
            <path d="M-20 238 C 120 58, 242 352, 386 150 S 624 70, 920 230" />
            <path d="M-30 128 C 164 258, 250 32, 438 204 S 690 370, 930 82" />
            <path d="M-10 312 C 180 264, 286 400, 464 292 S 686 110, 915 302" />
          </svg>
          <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-[#1d1712]/15 bg-[#fffaf0]/85 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1d1712] backdrop-blur">
            <Waves className="h-3.5 w-3.5" aria-hidden />
            fluid dispatch
          </div>
          <div className="schedule-chip schedule-chip-one">
            <CalendarClock className="h-4 w-4" aria-hidden />
            <span>{locale === "zh" ? "14:00 可约" : "14:00 open"}</span>
          </div>
          <div className="schedule-chip schedule-chip-two">
            <Route className="h-4 w-4" aria-hidden />
            <span>{locale === "zh" ? "多伦多同步" : "Toronto synced"}</span>
          </div>
          <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-[#1d1712]/15 bg-[#fffaf0]/88 p-5 text-sm leading-6 text-[#1d1712] shadow-[0_18px_50px_rgba(32,24,18,0.16)] backdrop-blur">
            <p className="font-semibold">{copy.heroNoteTitle}</p>
            <p className="mt-1">{copy.heroNoteBody}</p>
          </div>
        </div>
      </section>

      <section
        id="coffee-finder"
        className="relative border-y border-[#1d1712]/10 bg-[#1d1712] text-[#fffaf0]"
      >
        <div className="flow-sheen" aria-hidden />
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.85fr_1fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d8c7b2]">
              {finderCopy.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-10 text-[#fffaf0]">
              {copy.coffeeFinderTitle}
            </h2>
            <p className="mt-3 text-base leading-7 text-[#e8dccb]">
              {copy.coffeeFinderBody}
            </p>
            <Link
              href={withLocale("/coffee-finder", locale)}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#fffaf0]/30 bg-[#fffaf0] px-5 py-3 text-sm font-semibold text-[#1d1712] transition hover:-translate-y-0.5 hover:bg-[#e7a64e]"
            >
              {finderCopy.homeCta}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="relative min-h-[310px] overflow-hidden rounded-[2rem] border border-[#fffaf0]/15 bg-[#fffaf0] text-[#1d1712] shadow-[0_30px_80px_rgba(0,0,0,0.28)]">
            <div className="pointer-events-none absolute inset-0 fluid-grid opacity-90" />
            <div className="absolute right-4 top-4 rounded-full border border-[#1d1712]/15 bg-white/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1d1712] backdrop-blur">
              06 entries
            </div>
            {coffeeProfiles.map((profile, index) => (
              <span
                key={profile.id}
                className="coffee-node absolute flex items-center justify-center rounded-full border border-[#1d1712]/15 bg-white/85 text-[#1d1712] shadow-[0_18px_36px_rgba(29,23,18,0.16)] backdrop-blur transition hover:bg-[#095456] hover:text-[#fffaf0]"
                style={{
                  width: index % 2 === 0 ? 82 : 62,
                  height: index % 2 === 0 ? 82 : 62,
                  left: `${12 + index * 14}%`,
                  top: `${index % 2 === 0 ? 24 : 55}%`,
                  transform: `translate(-50%, -50%) rotate(${index % 2 === 0 ? -6 : 8}deg)`,
                  animationDelay: `${index * 170}ms`,
                }}
              >
                <CoffeeIcon
                  id={profile.icon}
                  className={index % 2 === 0 ? "h-11 w-11" : "h-8 w-8"}
                />
              </span>
            ))}
          </div>
        </div>
      </section>

      <section
        className="mx-auto max-w-7xl px-5 py-16 sm:px-8"
        id="stories"
      >
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#1d1712]/15 bg-white/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6d6258]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              nonlinear stories
            </div>
            <h2 className="text-3xl font-semibold leading-10 text-[#1d1712]">
              {copy.storiesTitle}
            </h2>
            <p className="mt-2 max-w-2xl text-base leading-7 text-[#4b4038]">
              {copy.storiesBody}
            </p>
          </div>
          <Link
            href={withLocale("/stories", locale)}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-[#1d1712]/20 bg-white/75 px-5 py-3 text-sm font-semibold text-[#1d1712] shadow-[0_12px_36px_rgba(68,54,43,0.1)] transition hover:-translate-y-0.5 hover:bg-[#1d1712] hover:text-[#fffaf0]"
          >
            {copy.readAll}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <StoryPreview stories={stories} locale={locale} />
      </section>

      <footer className="border-t border-[#1d1712]/10 bg-[#fffaf0]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-sm text-[#4b4038] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>{copy.footerLeft}</p>
          <p>{copy.footerRight}</p>
        </div>
      </footer>
    </main>
  );
}
