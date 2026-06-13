import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
    <main className="min-h-screen bg-white text-[#111]">
      <SiteHeader locale={locale} />

      <section
        id="booking"
        className="grid-bg mx-auto grid max-w-7xl grid-cols-1 gap-8 border-x border-[#111] px-5 py-6 sm:px-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,0.82fr)] lg:items-center lg:py-10"
      >
        <div className="space-y-5">
          <div className="max-w-2xl space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#555]">
              <span className="border border-[#111] bg-white px-2 py-1 text-[#111]">
                Summer 2026
              </span>
              <span>
                {locale === "zh"
                  ? "福州 · 多伦多 · 线上"
                  : "Fuzhou · Toronto · Online"}
              </span>
            </div>
            <h1 className="text-4xl font-semibold leading-[1.14] tracking-normal text-[#111] sm:text-5xl lg:text-[48px]">
              {copy.heroTitle}
            </h1>
            <p className="max-w-xl text-base leading-7 text-[#333]">
              {copy.heroBody}
            </p>
            <div className="grid max-w-xl grid-cols-3 border border-[#111] bg-white text-center text-xs font-semibold text-[#111]">
              {(locale === "zh"
                ? ["线下", "线上", "邮件确认"]
                : ["In person", "Online", "Email confirm"]
              ).map((item) => (
                <span
                  key={item}
                  className="border-r border-[#111] px-2 py-2 last:border-r-0"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <BookingForm locale={locale} />
        </div>

        <div className="ink-shadow-lg relative min-h-[460px] overflow-hidden border border-[#111] bg-[#f2f2f2] lg:min-h-[540px]">
          <Image
            src="/images/coffee-hero.jpg"
            alt={locale === "zh" ? "咖啡桌面真实照片" : "Real coffee table photo"}
            fill
            priority
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover grayscale"
          />
          <div className="absolute left-4 top-4 border border-[#111] bg-white px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#111]">
            yibei.chat
          </div>
          <div className="absolute bottom-5 left-5 right-5 border border-[#111] bg-white p-4 text-sm leading-6 text-[#111]">
            <p className="font-semibold">{copy.heroNoteTitle}</p>
            <p className="mt-1">{copy.heroNoteBody}</p>
          </div>
        </div>
      </section>

      <section
        id="coffee-finder"
        className="dot-bg border-y border-[#111] bg-white"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 border-x border-[#111] px-5 py-14 sm:px-8 lg:grid-cols-[0.85fr_1fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#555]">
              {finderCopy.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-10 text-[#111]">
              {copy.coffeeFinderTitle}
            </h2>
            <p className="mt-3 text-base leading-7 text-[#333]">
              {copy.coffeeFinderBody}
            </p>
            <Link
              href={withLocale("/coffee-finder", locale)}
              className="mt-6 inline-flex items-center gap-2 border border-[#111] bg-white px-4 py-3 text-sm font-semibold text-[#111] transition hover:bg-[#111] hover:text-white"
            >
              {finderCopy.homeCta}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="ink-shadow relative min-h-[250px] overflow-hidden border border-[#111] bg-white">
            <div className="pointer-events-none absolute inset-0 grid-bg opacity-80" />
            <div className="absolute right-3 top-3 border border-[#111] bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#111]">
              06 entries
            </div>
            {coffeeProfiles.map((profile, index) => (
              <span
                key={profile.id}
                className="absolute flex items-center justify-center rounded-full border border-[#111] bg-white text-[#111] shadow-[0_16px_28px_rgba(0,0,0,0.08)] transition hover:-translate-y-1 hover:bg-[#111] hover:text-white"
                style={{
                  width: index % 2 === 0 ? 82 : 62,
                  height: index % 2 === 0 ? 82 : 62,
                  left: `${12 + index * 14}%`,
                  top: `${index % 2 === 0 ? 24 : 55}%`,
                  transform: `translate(-50%, -50%) rotate(${index % 2 === 0 ? -6 : 8}deg)`,
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
        className="mx-auto max-w-7xl border-x border-[#111] px-5 py-16 sm:px-8"
        id="stories"
      >
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-semibold leading-10 text-[#111]">
              {copy.storiesTitle}
            </h2>
            <p className="mt-2 max-w-2xl text-base leading-7 text-[#333]">
              {copy.storiesBody}
            </p>
          </div>
          <Link
            href={withLocale("/stories", locale)}
            className="inline-flex w-fit items-center gap-2 border border-[#111] bg-white px-4 py-3 text-sm font-semibold text-[#111] transition hover:bg-[#111] hover:text-white"
          >
            {copy.readAll}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <StoryPreview stories={stories} locale={locale} />
      </section>

      <footer className="border-t border-[#111] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 border-x border-[#111] px-5 py-8 text-sm text-[#333] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>{copy.footerLeft}</p>
          <p>{copy.footerRight}</p>
        </div>
      </footer>
    </main>
  );
}
