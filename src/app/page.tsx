import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe2, Mail, MapPin } from "lucide-react";
import { BookingForm } from "@/components/booking-form";
import { SiteHeader } from "@/components/site-header";
import { StoryPreview } from "@/components/story-preview";
import {
  getLocale,
  siteCopy,
  stories,
  summerWindows,
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

  return (
    <main className="min-h-screen bg-white text-[#111]">
      <SiteHeader locale={locale} />

      <section
        id="booking"
        className="grid-bg mx-auto grid max-w-7xl grid-cols-1 gap-8 border-x border-[#111] px-5 py-6 sm:px-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,0.82fr)] lg:items-center lg:py-8"
      >
        <div className="space-y-5">
          <div className="max-w-2xl space-y-3">
            <h1 className="text-4xl font-semibold leading-[1.14] tracking-normal text-[#111] sm:text-5xl lg:text-[48px]">
              {copy.heroTitle}
            </h1>
            <p className="max-w-xl text-base leading-7 text-[#333]">
              {copy.heroBody}
            </p>
          </div>

          <BookingForm locale={locale} />
        </div>

        <div className="relative min-h-[460px] overflow-hidden border border-[#111] bg-[#f2f2f2] shadow-[8px_8px_0_#111]">
          <Image
            src="/images/coffee-hero.jpg"
            alt={locale === "zh" ? "咖啡桌面真实照片" : "Real coffee table photo"}
            fill
            priority
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover grayscale"
          />
          <div className="absolute bottom-5 left-5 right-5 border border-[#111] bg-white p-4 text-sm leading-6 text-[#111]">
            <p className="font-semibold">{copy.heroNoteTitle}</p>
            <p className="mt-1">{copy.heroNoteBody}</p>
          </div>
        </div>
      </section>

      <section className="border-y border-[#111] bg-white">
        <div className="dot-bg mx-auto grid max-w-7xl grid-cols-1 gap-4 border-x border-[#111] px-5 py-8 sm:px-8 md:grid-cols-3">
          {summerWindows.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title[locale]}
                className="flex items-start gap-4 border border-[#111] bg-white p-5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#111] bg-white text-[#111]">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h2 className="text-base font-semibold text-[#111]">
                    {item.title[locale]}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-[#333]">
                    {item.detail[locale]}
                  </p>
                </div>
              </div>
            );
          })}
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

      <section id="about" className="border-t border-[#111] bg-white">
        <div className="grid-bg mx-auto grid max-w-7xl grid-cols-1 gap-8 border-x border-[#111] px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1fr]">
          <div>
            <h2 className="text-3xl font-semibold leading-10 text-[#111]">
              {copy.aboutTitle}
            </h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-[#333]">
            <p>{copy.aboutBodyOne}</p>
            <p>{copy.aboutBodyTwo}</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="border border-[#111] bg-white p-4">
                <MapPin className="mb-3 h-5 w-5 text-[#111]" aria-hidden />
                <p className="text-sm font-semibold text-[#111]">
                  {locale === "zh" ? "福州 / 多伦多" : "Fuzhou / Toronto"}
                </p>
              </div>
              <div className="border border-[#111] bg-white p-4">
                <Globe2 className="mb-3 h-5 w-5 text-[#111]" aria-hidden />
                <p className="text-sm font-semibold text-[#111]">
                  {locale === "zh" ? "线上也可以" : "Online is okay"}
                </p>
              </div>
              <div className="border border-[#111] bg-white p-4">
                <Mail className="mb-3 h-5 w-5 text-[#111]" aria-hidden />
                <p className="text-sm font-semibold text-[#111]">
                  {locale === "zh" ? "邮件确认预约" : "Email confirmation"}
                </p>
              </div>
            </div>
          </div>
        </div>
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
