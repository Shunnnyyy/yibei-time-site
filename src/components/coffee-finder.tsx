"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, RotateCcw } from "lucide-react";
import { useState } from "react";
import {
  coffeeFinderCopy,
  coffeeProfiles,
  withLocale,
  type CoffeeFlavor,
  type CoffeeMethod,
  type CoffeeProfile,
  type CoffeeScene,
} from "@/lib/content";
import type { Locale } from "@/lib/booking";

type CoffeeFinderProps = {
  locale: Locale;
};

type BrewMethod = Exclude<CoffeeMethod, "all">;

type QuizSelections = {
  scene?: CoffeeScene;
  flavor?: CoffeeFlavor;
  method?: BrewMethod;
};

const objectPositions = [
  "lg:left-[6%] lg:top-[9%]",
  "lg:left-[26%] lg:top-[10%]",
  "lg:left-[54%] lg:top-[8%]",
  "lg:left-[76%] lg:top-[12%]",
  "lg:left-[11%] lg:top-[55%]",
  "lg:left-[72%] lg:top-[57%]",
];

function scoreProfile(profile: CoffeeProfile, selections: QuizSelections) {
  let score = 0;

  if (profile.scene === selections.scene) score += 1;
  if (profile.flavorFamily === selections.flavor) score += 1;
  if (profile.method === selections.method) score += 1;

  return score;
}

function hasSelections(selections: QuizSelections) {
  return Boolean(selections.scene || selections.flavor || selections.method);
}

export function CoffeeFinder({ locale }: CoffeeFinderProps) {
  const copy = coffeeFinderCopy[locale];
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<QuizSelections>({});
  const isComplete = step >= copy.questions.length;
  const currentQuestion = copy.questions[step];
  const progress = isComplete ? 100 : ((step + 1) / copy.questions.length) * 100;
  const bestScore = Math.max(
    ...coffeeProfiles.map((profile) => scoreProfile(profile, selections)),
  );
  const shouldHighlight = hasSelections(selections) && bestScore > 0;

  function chooseOption(
    field: "scene" | "flavor" | "method",
    value: CoffeeScene | CoffeeFlavor | BrewMethod,
  ) {
    setSelections((current) => ({
      ...current,
      [field]: value,
    }));
    setStep((current) => Math.min(current + 1, copy.questions.length));
  }

  function goBack() {
    setStep((current) => Math.max(0, current - 1));
  }

  function restart() {
    setSelections({});
    setStep(0);
  }

  return (
    <div className="overflow-hidden border border-[#111] bg-[#f8f8f8]">
      <div className="h-1 bg-[#e8e8e8]" aria-label={copy.progressLabel}>
        <div
          className="h-full bg-[#111] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="relative min-h-[740px] overflow-hidden bg-[#f8f8f8] px-5 py-8 sm:px-8 lg:min-h-[680px]">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-70" />
        <div className="relative z-10 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#111]">
            {copy.logo}
          </p>
          <Link
            href={withLocale("/stories", locale)}
            className="border border-[#111] bg-white px-3 py-2 text-sm font-semibold text-[#111] transition hover:bg-[#111] hover:text-white"
          >
            {locale === "zh" ? "全部文章" : "All stories"}
          </Link>
        </div>

        <section className="relative z-20 mx-auto mt-8 w-full max-w-[360px] border border-[#111] bg-white/95 p-3 shadow-[6px_6px_0_#111] backdrop-blur sm:max-w-[420px] sm:p-4 lg:absolute lg:bottom-8 lg:left-1/2 lg:mt-0 lg:-translate-x-1/2">
          <div className="mb-3 flex items-center justify-between gap-3">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center border border-[#111] bg-white text-[#111] transition disabled:opacity-25 enabled:hover:bg-[#111] enabled:hover:text-white"
              disabled={step === 0}
              onClick={goBack}
              aria-label={copy.back}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
            </button>

            <div className="text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#555]">
                {isComplete ? copy.resultEyebrow : currentQuestion.step}
              </p>
              <h3 className="mt-1 text-base font-semibold leading-6 text-[#111]">
                {isComplete ? copy.resultTitle : currentQuestion.title}
              </h3>
            </div>

            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center border border-[#111] bg-white text-[#111] transition hover:bg-[#111] hover:text-white"
              onClick={isComplete ? restart : () => setStep((current) => current + 1)}
              aria-label={isComplete ? copy.restart : copy.readStory}
            >
              {isComplete ? (
                <RotateCcw className="h-4 w-4" aria-hidden />
              ) : (
                <ArrowRight className="h-4 w-4" aria-hidden />
              )}
            </button>
          </div>

          {isComplete ? (
            <p className="px-2 pb-1 text-center text-sm leading-6 text-[#333]">
              {shouldHighlight ? copy.resultBody : copy.fallbackBody}
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {currentQuestion.options.map((option) => {
                const isSelected =
                  selections[currentQuestion.field] === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    className={`flex min-h-11 items-center justify-center gap-2 border px-3 py-2 text-sm font-semibold leading-5 transition ${
                      isSelected
                        ? "border-[#111] bg-[#111] text-white"
                        : "border-[#111] bg-white text-[#111] hover:bg-[#f2f2f2]"
                    }`}
                    aria-pressed={isSelected}
                    onClick={() => chooseOption(currentQuestion.field, option.value)}
                  >
                    {isSelected && <Check className="h-4 w-4" aria-hidden />}
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </section>

        <div className="relative z-0 mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:absolute lg:inset-0 lg:mt-0 lg:block lg:pb-0">
          {coffeeProfiles.map((profile, index) => {
            const score = scoreProfile(profile, selections);
            const isHighlighted = !shouldHighlight || score === bestScore;

            return (
              <CoffeeObject
                key={profile.id}
                locale={locale}
                profile={profile}
                methodLabel={copy.methods[profile.method]}
                className={objectPositions[index] ?? ""}
                highlighted={isHighlighted}
              />
            );
          })}
        </div>

      </div>
    </div>
  );
}

type CoffeeObjectProps = {
  locale: Locale;
  profile: CoffeeProfile;
  methodLabel: string;
  className: string;
  highlighted: boolean;
};

function CoffeeObject({
  locale,
  profile,
  methodLabel,
  className,
  highlighted,
}: CoffeeObjectProps) {
  return (
    <Link
      href={withLocale(`/stories/${profile.storySlug}`, locale)}
      aria-label={`${profile.name[locale]} ${profile.tag[locale]}`}
      className={`group flex flex-col items-center text-center transition duration-300 lg:absolute lg:w-[160px] ${className} ${
        highlighted ? "opacity-100" : "opacity-25 grayscale"
      }`}
    >
      <span className="relative flex h-24 w-24 items-center justify-center rounded-full border border-[#111] bg-white text-4xl font-semibold text-[#111] shadow-[0_18px_35px_rgba(0,0,0,0.08)] transition group-hover:-translate-y-1 group-hover:bg-[#111] group-hover:text-white sm:h-28 sm:w-28">
        <span className="absolute -bottom-2 h-3 w-16 rounded-[50%] bg-black/10 blur-[2px]" />
        <span className="relative">{profile.mark}</span>
      </span>
      <span className="mt-3 max-w-[10rem] text-xs font-semibold leading-4 text-[#111] opacity-0 transition group-hover:opacity-100 group-focus:opacity-100">
        {profile.name[locale]}
      </span>
      <span className="mt-1 max-w-[10rem] text-[11px] leading-4 text-[#555] opacity-0 transition group-hover:opacity-100 group-focus:opacity-100">
        {profile.tag[locale]} · {methodLabel}
      </span>
    </Link>
  );
}
