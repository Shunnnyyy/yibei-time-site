"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
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

function scoreProfile(profile: CoffeeProfile, selections: QuizSelections) {
  let score = 0;

  if (profile.scene === selections.scene) {
    score += 3;
  }

  if (profile.flavorFamily === selections.flavor) {
    score += 3;
  }

  if (profile.method === selections.method) {
    score += 3;
  }

  return score;
}

export function CoffeeFinder({ locale }: CoffeeFinderProps) {
  const copy = coffeeFinderCopy[locale];
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<QuizSelections>({});
  const isResults = step >= copy.questions.length;
  const progress = isResults ? 100 : ((step + 1) / copy.questions.length) * 100;
  const currentQuestion = copy.questions[step];

  const matches = useMemo(() => {
    const exact = coffeeProfiles.filter(
      (profile) =>
        profile.scene === selections.scene &&
        profile.flavorFamily === selections.flavor &&
        profile.method === selections.method,
    );

    if (exact.length > 0) {
      return { profiles: exact, exact: true };
    }

    const bestScore = Math.max(
      ...coffeeProfiles.map((profile) => scoreProfile(profile, selections)),
    );

    return {
      profiles: coffeeProfiles
        .filter((profile) => scoreProfile(profile, selections) === bestScore)
        .slice(0, 4),
      exact: false,
    };
  }, [selections]);

  function chooseOption(
    field: "scene" | "flavor" | "method",
    value: CoffeeScene | CoffeeFlavor | BrewMethod,
  ) {
    setSelections((current) => ({
      ...current,
      [field]: value,
    }));
    setStep((current) => current + 1);
  }

  function goBack() {
    setStep((current) => Math.max(0, current - 1));
  }

  function restart() {
    setSelections({});
    setStep(0);
  }

  return (
    <div className="overflow-hidden border border-[#111] bg-white">
      <div className="h-1 bg-[#f2f2f2]" aria-label={copy.progressLabel}>
        <div
          className="h-full bg-[#111] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="grid-bg min-h-[560px] p-5 sm:p-8 lg:p-10">
        <div className="mb-12 flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#111]">
            {copy.logo}
          </p>
          {step > 0 && !isResults && (
            <button
              type="button"
              className="inline-flex items-center gap-2 border border-[#111] bg-white px-3 py-2 text-sm font-semibold text-[#111] transition hover:bg-[#111] hover:text-white"
              onClick={goBack}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              {copy.back}
            </button>
          )}
        </div>

        {!isResults && currentQuestion ? (
          <section className="mx-auto max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#555]">
              {currentQuestion.step}
            </p>
            <h3 className="mb-10 text-3xl font-semibold leading-tight text-[#111] sm:text-4xl">
              {currentQuestion.title}
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {currentQuestion.options.map((option) => {
                const isSelected =
                  selections[currentQuestion.field] === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    className={`group flex min-h-20 items-center justify-between gap-5 border px-5 py-4 text-left text-base font-semibold leading-6 transition sm:px-6 ${
                      isSelected
                        ? "border-[#111] bg-[#111] text-white"
                        : "border-[#111] bg-white text-[#111] hover:bg-[#f2f2f2]"
                    }`}
                    aria-pressed={isSelected}
                    onClick={() => chooseOption(currentQuestion.field, option.value)}
                  >
                    <span>{option.label}</span>
                    <ArrowRight
                      className="h-5 w-5 shrink-0 transition group-hover:translate-x-1"
                      aria-hidden
                    />
                  </button>
                );
              })}
            </div>
          </section>
        ) : (
          <section className="mx-auto max-w-5xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#555]">
              {copy.resultEyebrow}
            </p>
            <h3 className="text-3xl font-semibold leading-tight text-[#111] sm:text-4xl">
              {copy.resultTitle}
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#333]">
              {matches.exact ? copy.resultBody : copy.fallbackBody}
            </p>

            <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
              {matches.profiles.map((profile) => (
                <CoffeeMarkLink
                  key={profile.id}
                  locale={locale}
                  profile={profile}
                  methodLabel={copy.methods[profile.method]}
                  readLabel={copy.readStory}
                />
              ))}
            </div>

            <button
              type="button"
              className="mt-12 inline-flex items-center gap-2 border border-[#111] bg-[#111] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-[#111]"
              onClick={restart}
            >
              <RotateCcw className="h-4 w-4" aria-hidden />
              {copy.restart}
            </button>
          </section>
        )}
      </div>
    </div>
  );
}

type CoffeeMarkLinkProps = {
  locale: Locale;
  profile: CoffeeProfile;
  methodLabel: string;
  readLabel: string;
};

function CoffeeMarkLink({
  locale,
  profile,
  methodLabel,
  readLabel,
}: CoffeeMarkLinkProps) {
  return (
    <Link
      href={withLocale(`/stories/${profile.storySlug}`, locale)}
      className="group flex flex-col items-center text-center text-[#111] focus:outline-none focus:ring-2 focus:ring-[#111] focus:ring-offset-4"
    >
      <span className="flex aspect-square w-full max-w-[150px] items-center justify-center rounded-full border border-[#111] bg-white text-5xl font-semibold tracking-normal transition group-hover:-translate-y-1 group-hover:bg-[#111] group-hover:text-white sm:text-6xl">
        {profile.mark}
      </span>
      <span className="mt-4 text-sm font-semibold leading-5">
        {profile.name[locale]}
      </span>
      <span className="mt-1 text-xs uppercase tracking-[0.08em] text-[#555]">
        {profile.tag[locale]}
      </span>
      <span className="mt-2 text-xs text-[#555]">{methodLabel}</span>
      <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold">
        {readLabel}
        <ArrowRight
          className="h-4 w-4 transition group-hover:translate-x-1"
          aria-hidden
        />
      </span>
    </Link>
  );
}
