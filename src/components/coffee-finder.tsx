"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ExternalLink,
  RotateCcw,
  Sparkle,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import { CoffeeIcon } from "@/components/coffee-icons";
import {
  coffeeFinderCopy,
  coffeeProfiles,
  withLocale,
  type CoffeeProfile,
} from "@/lib/content";
import type { Locale } from "@/lib/booking";

type CoffeeFinderProps = {
  locale: Locale;
};

const orbitSlots = [
  { x: 50, y: 51 },
  { x: 17, y: 22 },
  { x: 82, y: 24 },
  { x: 25, y: 65 },
  { x: 72, y: 63 },
  { x: 50, y: 72 },
];

const baseSizes = {
  sm: 84,
  md: 110,
  lg: 132,
} satisfies Record<CoffeeProfile["baseSize"], number>;

function fluidSlot(
  slot: { x: number; y: number },
  orbitIndex: number,
  activeIndex: number,
  answeredCount: number,
  isActive: boolean,
) {
  const phase = activeIndex * 0.72 + answeredCount * 1.18 + orbitIndex * 0.91;
  const pull = isActive ? 0.35 : 1;

  return {
    x: slot.x + Math.sin(phase) * 3.4 * pull,
    y: slot.y + Math.cos(phase * 0.83) * 2.6 * pull,
  };
}

type QuestionId = "chat-time" | "flavor" | "pace" | "place";
type AnswerId =
  | "morning"
  | "afternoon"
  | "evening"
  | "anytime"
  | "fruit"
  | "balanced"
  | "deep"
  | "quick"
  | "slow"
  | "quiet"
  | "fuzhou"
  | "toronto"
  | "online"
  | "open";
type UserAnswers = Partial<Record<QuestionId, AnswerId>>;

type FinderQuestion = {
  id: QuestionId;
  title: Record<Locale, string>;
  hint: Record<Locale, string>;
  answers: Array<{
    id: AnswerId;
    label: Record<Locale, string>;
  }>;
};

type QuestionScoreMap = Record<QuestionId, Partial<Record<AnswerId, number>>>;

const questions: FinderQuestion[] = [
  {
    id: "chat-time",
    title: {
      zh: "你想从什么时间感开始读？",
      en: "What time mood do you want?",
    },
    hint: {
      zh: "不用选得很准，靠近现在的感觉就好。",
      en: "It does not need to be exact. Choose what feels close.",
    },
    answers: [
      { id: "morning", label: { zh: "早晨清醒", en: "Morning" } },
      { id: "afternoon", label: { zh: "下午慢聊", en: "Afternoon" } },
      { id: "evening", label: { zh: "夜晚安静", en: "Evening" } },
      { id: "anytime", label: { zh: "都可以", en: "Anytime" } },
    ],
  },
  {
    id: "flavor",
    title: {
      zh: "你更想靠近哪种味道？",
      en: "Which taste feels closer?",
    },
    hint: {
      zh: "这里的味道也是文章气质，不只是咖啡风味。",
      en: "Taste also means the feeling of the story.",
    },
    answers: [
      { id: "fruit", label: { zh: "花果明亮", en: "Fruit" } },
      { id: "balanced", label: { zh: "平衡温和", en: "Balanced" } },
      { id: "deep", label: { zh: "低酸深一点", en: "Deep" } },
    ],
  },
  {
    id: "pace",
    title: {
      zh: "你现在想要哪种阅读节奏？",
      en: "What reading pace do you want?",
    },
    hint: {
      zh: "有些故事适合很快读完，有些适合放慢一点。",
      en: "Some stories are quick. Some need a slower pace.",
    },
    answers: [
      { id: "quick", label: { zh: "短而直接", en: "Quick" } },
      { id: "slow", label: { zh: "慢慢展开", en: "Slow" } },
      { id: "quiet", label: { zh: "安静细腻", en: "Quiet" } },
    ],
  },
  {
    id: "place",
    title: {
      zh: "你想从哪里开始？",
      en: "Where do you want to start?",
    },
    hint: {
      zh: "可以选城市，也可以只选线上或开放答案。",
      en: "Choose a city, online, or keep it open.",
    },
    answers: [
      { id: "fuzhou", label: { zh: "福州", en: "Fuzhou" } },
      { id: "toronto", label: { zh: "多伦多", en: "Toronto" } },
      { id: "online", label: { zh: "线上", en: "Online" } },
      { id: "open", label: { zh: "都可以", en: "Open" } },
    ],
  },
];

const coffeeQuestionScores: Record<string, QuestionScoreMap> = {
  yirgacheffe: {
    "chat-time": { afternoon: 100, morning: 72, anytime: 84, evening: 52 },
    flavor: { fruit: 100, balanced: 76, deep: 42 },
    pace: { quiet: 92, slow: 82, quick: 58 },
    place: { online: 86, open: 82, fuzhou: 64, toronto: 58 },
  },
  "colombia-huila": {
    "chat-time": { afternoon: 96, anytime: 88, evening: 66, morning: 55 },
    flavor: { balanced: 100, deep: 72, fruit: 62 },
    pace: { slow: 92, quiet: 76, quick: 64 },
    place: { fuzhou: 100, open: 78, online: 62, toronto: 46 },
  },
  "espresso-blend": {
    "chat-time": { morning: 100, anytime: 72, afternoon: 66, evening: 48 },
    flavor: { deep: 92, balanced: 82, fruit: 36 },
    pace: { quick: 100, quiet: 58, slow: 54 },
    place: { toronto: 86, online: 82, open: 74, fuzhou: 52 },
  },
  "kenya-aa": {
    "chat-time": { morning: 94, afternoon: 78, anytime: 76, evening: 42 },
    flavor: { fruit: 100, balanced: 68, deep: 28 },
    pace: { quick: 86, quiet: 76, slow: 60 },
    place: { open: 84, online: 74, fuzhou: 68, toronto: 58 },
  },
  mandheling: {
    "chat-time": { evening: 100, anytime: 84, afternoon: 62, morning: 32 },
    flavor: { deep: 100, balanced: 70, fruit: 24 },
    pace: { slow: 96, quiet: 92, quick: 38 },
    place: { fuzhou: 86, open: 78, toronto: 56, online: 52 },
  },
  "toronto-cold-cup": {
    "chat-time": { anytime: 100, afternoon: 82, evening: 78, morning: 64 },
    flavor: { balanced: 92, fruit: 84, deep: 44 },
    pace: { quiet: 88, quick: 72, slow: 70 },
    place: { toronto: 100, online: 90, open: 84, fuzhou: 42 },
  },
};

function calculateMatch(profile: CoffeeProfile, userAnswers: UserAnswers) {
  const scores = coffeeQuestionScores[profile.id];
  let score = 0;
  let maxScore = 0;

  for (const question of questions) {
    const productScores = scores?.[question.id] ?? {};
    const values = Object.values(productScores);
    const best = values.length > 0 ? Math.max(...values) : 0;
    const answer = userAnswers[question.id];

    score += answer ? productScores[answer] ?? 0 : Math.round(best * 0.62);
    maxScore += best;
  }

  if (maxScore === 0) return 0;
  return Math.round((score / maxScore) * 100);
}

function activeIndexForAnswers(userAnswers: UserAnswers) {
  const activeProfile = coffeeProfiles
    .map((profile, index) => ({
      profile,
      match: calculateMatch(profile, userAnswers),
      index,
    }))
    .sort((a, b) => b.match - a.match || a.index - b.index)[0]?.profile;

  return coffeeProfiles.findIndex((profile) => profile.id === activeProfile?.id);
}

export function CoffeeFinder({ locale }: CoffeeFinderProps) {
  const copy = coffeeFinderCopy[locale];
  const prefersReducedMotion = useReducedMotion();
  const [isStarted, setIsStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [motionDirection, setMotionDirection] = useState<-1 | 0 | 1>(0);

  const rankedProfiles = useMemo(() => {
    return coffeeProfiles
      .map((profile, index) => ({
        profile,
        match: calculateMatch(profile, userAnswers),
        index,
      }))
      .sort((a, b) => b.match - a.match || a.index - b.index);
  }, [userAnswers]);

  const activeProfile = rankedProfiles[0]?.profile ?? coffeeProfiles[0];
  const activeMatch = rankedProfiles[0]?.match ?? 0;
  const activeIndex = coffeeProfiles.findIndex(
    (profile) => profile.id === activeProfile.id,
  );
  const answeredCount = questions.filter((question) => userAnswers[question.id]).length;
  const dialRotation = activeIndex * 18 + answeredCount * 23;

  function handleAnswer(questionId: QuestionId, answerId: AnswerId) {
    setIsStarted(true);
    setUserAnswers((current) => {
      const nextAnswers = { ...current, [questionId]: answerId };
      const nextActiveIndex = activeIndexForAnswers(nextAnswers);
      const indexDelta =
        (nextActiveIndex - activeIndex + coffeeProfiles.length) %
        coffeeProfiles.length;

      setMotionDirection(
        indexDelta === 0
          ? 0
          : indexDelta <= coffeeProfiles.length / 2
            ? 1
            : -1,
      );

      return nextAnswers;
    });
    setQuestionIndex((current) => Math.min(current + 1, questions.length - 1));
  }

  function resetFinder() {
    setUserAnswers({});
    setQuestionIndex(0);
    setIsStarted(false);
    setMotionDirection(0);
  }

  return (
    <section className="relative min-h-[calc(100vh-64px)] overflow-hidden border-b border-[#111] bg-[#f4f1e8] text-[#111]">
      <div className="pointer-events-none absolute inset-0 brutal-paper opacity-95" />
      <FlowField
        activeIndex={activeIndex}
        answeredCount={answeredCount}
        prefersReducedMotion={Boolean(prefersReducedMotion)}
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl flex-col px-5 pb-8 pt-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#111] pb-4">
          <Link
            href={withLocale("/", locale)}
            className="inline-flex items-center gap-2 border border-[#111] bg-[#fdfbf4] px-3 py-2 text-sm font-semibold shadow-[4px_4px_0_#111] transition hover:-translate-y-0.5 hover:bg-[#111] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#111] focus:ring-offset-2"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {copy.backHome}
          </Link>
          <p className="hidden text-[11px] font-semibold uppercase tracking-[0.32em] text-[#555] sm:block">
            Field tasting / story selector
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://github.com/SAY-5/recommendation-quiz"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-[#111] bg-[#fdfbf4] px-3 py-2 text-sm font-semibold shadow-[4px_4px_0_#111] transition hover:-translate-y-0.5 hover:bg-[#111] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#111] focus:ring-offset-2"
            >
              {locale === "zh" ? "模板方案" : "Template"}
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
            <a
              href="https://www.figma.com/design/BAn5704XC7EF1hVIGiqNgm?node-id=5-2"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-[#111] bg-[#fdfbf4] px-3 py-2 text-sm font-semibold shadow-[4px_4px_0_#111] transition hover:-translate-y-0.5 hover:bg-[#111] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#111] focus:ring-offset-2"
            >
              {locale === "zh" ? "动效稿" : "Motion"}
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
            <Link
              href={withLocale("/stories", locale)}
              className="inline-flex items-center gap-2 border border-[#111] bg-[#fdfbf4] px-3 py-2 text-sm font-semibold shadow-[4px_4px_0_#111] transition hover:-translate-y-0.5 hover:bg-[#111] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#111] focus:ring-offset-2"
            >
              {copy.allStories}
              <BookOpen className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>

        <div className="grid flex-1 gap-6 pt-6 lg:grid-cols-[minmax(320px,0.82fr)_minmax(0,1.18fr)] lg:items-start">
          <motion.aside
            initial={prefersReducedMotion ? false : { opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className="relative z-30 space-y-4"
          >
            <div className="border border-[#111] bg-[#fdfbf4] p-5 shadow-[6px_6px_0_#111]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#555]">
                {copy.eyebrow}
              </p>
              <h1 className="mt-3 text-[38px] font-semibold leading-[1.02] text-[#111] [word-break:keep-all] sm:text-[44px]">
                {isStarted ? activeProfile.name[locale] : copy.pageTitle}
              </h1>
              <p className="mt-4 text-sm leading-6 text-[#333]">
                {isStarted ? activeProfile.description[locale] : copy.pageBody}
              </p>
            </div>

            <div className="grid grid-cols-[72px_1fr] border border-[#111] bg-white shadow-[4px_4px_0_#111]">
              <div className="flex min-h-24 items-center justify-center border-r border-[#111] bg-[#111] text-white">
                <CoffeeIcon id={activeProfile.icon} className="h-10 w-10" />
              </div>
              <div className="p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#555]">
                  {isStarted
                    ? locale === "zh"
                      ? "当前匹配"
                      : "Current match"
                    : copy.selectedLabel}
                </p>
                <p className="mt-1 text-xl font-semibold leading-7 text-[#111]">
                  {isStarted
                    ? locale === "zh"
                      ? `${activeMatch}% 靠近`
                      : `${activeMatch}% fit`
                    : activeProfile.name[locale]}
                </p>
                <p className="mt-1 text-sm leading-5 text-[#444]">
                  {activeProfile.flavor[locale]}
                </p>
              </div>
            </div>

            <QuestionDeck
              locale={locale}
              isStarted={isStarted}
              questionIndex={questionIndex}
              userAnswers={userAnswers}
              activeProfile={activeProfile}
              activeMatch={activeMatch}
              dialRotation={dialRotation}
              onStart={() => setIsStarted(true)}
              onAnswer={handleAnswer}
              onBack={() => setQuestionIndex((current) => Math.max(current - 1, 0))}
              onReset={resetFinder}
            />
          </motion.aside>

          <div className="relative z-20 min-h-[560px] overflow-hidden border border-[#111] bg-[#fdfbf4] shadow-[7px_7px_0_#111] lg:min-h-[590px]">
            <LineArtPoster
              locale={locale}
              activeIndex={activeIndex}
              activeProfile={activeProfile}
              answeredCount={answeredCount}
              motionDirection={motionDirection}
              prefersReducedMotion={Boolean(prefersReducedMotion)}
            />
            <div
              className="absolute inset-0 z-20 hidden lg:block"
              aria-label={copy.pageTitle}
            >
              {coffeeProfiles.map((profile, index) => {
                const isActive = profile.id === activeProfile.id;
                if (isActive) {
                  return null;
                }

                const orbitIndex =
                  (index - activeIndex + coffeeProfiles.length) %
                  coffeeProfiles.length;
                const slot = orbitSlots[orbitIndex] ?? {
                  x: profile.scatter.x,
                  y: profile.scatter.y,
                };
                const fluidPosition = fluidSlot(
                  slot,
                  orbitIndex,
                  activeIndex,
                  answeredCount,
                  isActive,
                );
                const match =
                  rankedProfiles.find((item) => item.profile.id === profile.id)
                    ?.match ?? 0;

                return (
                  <CoffeeMark
                    key={profile.id}
                    locale={locale}
                    profile={profile}
                    isActive={isActive}
                    match={match}
                    slot={fluidPosition}
                    index={index}
                    orbitIndex={orbitIndex}
                    answeredCount={answeredCount}
                    prefersReducedMotion={Boolean(prefersReducedMotion)}
                  />
                );
              })}
            </div>
            <div className="relative z-30 grid grid-cols-2 gap-3 p-4 pt-[440px] sm:grid-cols-3 lg:hidden">
              {coffeeProfiles.map((profile, index) => {
                const isActive = profile.id === activeProfile.id;
                const match =
                  rankedProfiles.find((item) => item.profile.id === profile.id)
                    ?.match ?? 0;

                return (
                  <CoffeeMark
                    key={profile.id}
                    locale={locale}
                    profile={profile}
                    isActive={isActive}
                    match={match}
                    slot={{ x: 50, y: 50 }}
                    index={index}
                    orbitIndex={index}
                    answeredCount={answeredCount}
                    prefersReducedMotion={Boolean(prefersReducedMotion)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type FlowFieldProps = {
  activeIndex: number;
  answeredCount: number;
  prefersReducedMotion: boolean;
};

function FlowField({
  activeIndex,
  answeredCount,
  prefersReducedMotion,
}: FlowFieldProps) {
  const flowOffset = activeIndex * 18 + answeredCount * 31;

  return (
    <motion.svg
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full text-[#111]"
      viewBox="0 0 1200 760"
      preserveAspectRatio="none"
      aria-hidden
      animate={prefersReducedMotion ? undefined : { x: [-18, 14, -18] }}
      transition={{
        duration: 18,
        repeat: prefersReducedMotion ? 0 : Infinity,
        ease: "easeInOut",
      }}
    >
      {[0, 1, 2].map((line) => {
        const y = 160 + line * 165 + (flowOffset % 37);
        const bend = 90 + line * 28 + answeredCount * 10;

        return (
          <motion.path
            key={line}
            d={`M -80 ${y} C 220 ${y - bend}, 430 ${y + bend}, 690 ${
              y - bend * 0.55
            } S 1050 ${y + bend * 0.9}, 1290 ${y - 24}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="5 18"
            opacity="0.12"
            initial={false}
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    pathLength: [0.55, 1, 0.55],
                    pathOffset: [0, 0.22, 0],
                    opacity: [0.06, 0.16, 0.06],
                  }
            }
            transition={{
              duration: 10 + line * 1.8,
              repeat: prefersReducedMotion ? 0 : Infinity,
              ease: "easeInOut",
              delay: line * 0.35,
            }}
          />
        );
      })}
    </motion.svg>
  );
}

type LineArtPosterProps = {
  locale: Locale;
  activeIndex: number;
  activeProfile: CoffeeProfile;
  answeredCount: number;
  motionDirection: -1 | 0 | 1;
  prefersReducedMotion: boolean;
};

function LineArtPoster({
  locale,
  activeIndex,
  activeProfile,
  answeredCount,
  motionDirection,
  prefersReducedMotion,
}: LineArtPosterProps) {
  const previousProfile =
    coffeeProfiles[(activeIndex - 1 + coffeeProfiles.length) % coffeeProfiles.length];
  const nextProfile = coffeeProfiles[(activeIndex + 1) % coffeeProfiles.length];

  return (
    <div className="absolute inset-0 z-10 overflow-hidden">
      <div className="absolute inset-0 brutal-paper opacity-80" />
      <div className="absolute left-5 top-5 border border-[#111] bg-white px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] shadow-[4px_4px_0_#111]">
        {locale === "zh" ? "咖啡索引" : "Coffee index"}
      </div>
      <div className="absolute right-5 top-5 max-w-[12rem] text-right text-[10px] font-semibold uppercase leading-5 tracking-[0.18em] text-[#555]">
        {activeProfile.tag[locale]}
      </div>
      <svg
        className="absolute left-1/2 top-[42%] h-[540px] w-[660px] -translate-x-1/2 -translate-y-1/2 text-[#111] sm:h-[590px] sm:w-[700px]"
        viewBox="0 0 760 640"
        aria-hidden
      >
        <defs>
          <pattern id="coffee-lines" width="18" height="18" patternUnits="userSpaceOnUse">
            <path d="M0 18 L18 0" stroke="currentColor" strokeWidth="0.5" opacity="0.12" />
          </pattern>
        </defs>
        <path
          d="M48 214 C 156 152, 246 286, 356 210 S 594 126, 718 214"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.24"
        />
        <path
          d="M32 386 C 186 314, 302 468, 438 372 S 612 288, 736 360"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="8 10"
          opacity="0.26"
        />
        <circle cx="380" cy="346" r="178" fill="white" stroke="currentColor" strokeWidth="2" />
        <circle cx="380" cy="346" r="128" fill="none" stroke="currentColor" strokeDasharray="7 9" opacity="0.36" />
        <path d="M264 338 H496" stroke="currentColor" strokeWidth="2" />
        <path d="M320 338 L342 454 H418 L440 338" fill="white" stroke="currentColor" strokeWidth="3" />
        <path d="M334 366 H426 M340 394 H420 M348 422 H412" stroke="currentColor" strokeWidth="2" />
        <path d="M340 298 C336 282, 356 280, 350 262 M380 298 C376 282, 396 280, 390 262 M420 298 C416 282, 436 280, 430 262" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M210 544 C 282 502, 482 502, 552 544" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M164 570 H596" stroke="currentColor" strokeWidth="2" />
        <rect x="116" y="122" width="132" height="96" fill="white" stroke="currentColor" strokeWidth="1.5" opacity="0.72" />
        <rect x="522" y="134" width="110" height="82" fill="url(#coffee-lines)" stroke="currentColor" strokeWidth="1.5" opacity="0.72" />
        <circle cx="190" cy="472" r="42" fill="white" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
        <circle cx="596" cy="456" r="34" fill="white" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      </svg>
      <div className="absolute inset-x-8 top-[118px] z-20 hidden h-[280px] sm:block">
        <div className="absolute left-1/2 top-[112px] h-px w-[68%] -translate-x-1/2 bg-[#111]" />
        <div className="absolute left-1/2 top-[112px] h-[130px] w-[58%] -translate-x-1/2 rounded-[50%] border-b border-dashed border-[#111]/35" />
        <motion.div
          key={`previous-${previousProfile.id}`}
          data-motion-frame="outgoing"
          className="absolute left-[16%] top-[86px] flex h-20 w-20 items-center justify-center rounded-[1.2rem] border border-[#111] bg-white/80 opacity-55 shadow-[3px_3px_0_#111]"
          initial={
            prefersReducedMotion
              ? false
              : { opacity: 0.2, x: motionDirection < 0 ? 40 : -18, scale: 0.78 }
          }
          animate={
            prefersReducedMotion
              ? { opacity: 0.55, x: 0, scale: 1 }
              : { opacity: 0.55, x: [-4, 4, -4], rotate: [-2, 2, -2], scale: 1 }
          }
          transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <CoffeeIcon id={previousProfile.icon} className="h-10 w-10" />
        </motion.div>
        <motion.div
          key={`next-${nextProfile.id}`}
          data-motion-frame="incoming"
          className="absolute right-[16%] top-[86px] flex h-20 w-20 items-center justify-center rounded-[1.2rem] border border-[#111] bg-white/80 opacity-55 shadow-[3px_3px_0_#111]"
          initial={
            prefersReducedMotion
              ? false
              : { opacity: 0.2, x: motionDirection > 0 ? -40 : 18, scale: 0.78 }
          }
          animate={
            prefersReducedMotion
              ? { opacity: 0.55, x: 0, scale: 1 }
              : { opacity: 0.55, x: [4, -4, 4], rotate: [2, -2, 2], scale: 1 }
          }
          transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <CoffeeIcon id={nextProfile.icon} className="h-10 w-10" />
        </motion.div>
        <motion.div
          key={activeProfile.id}
          data-motion-frame="focus"
          className="absolute left-1/2 top-[42px] flex h-36 w-36 -translate-x-1/2 items-center justify-center rounded-[1.8rem] border-2 border-[#111] bg-white shadow-[7px_7px_0_#111]"
          initial={
            prefersReducedMotion
              ? false
              : {
                  opacity: 0,
                  x: motionDirection * 96,
                  y: 18,
                  scale: 0.82,
                  rotate: motionDirection * 8,
                }
          }
          animate={
            prefersReducedMotion
              ? { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }
              : {
                  opacity: 1,
                  x: [0, -7, 0, 6, 0],
                  y: [0, -9, 0],
                  scale: [1, 1.04, 1],
                  rotate: [0, -2, 1.5, 0],
                }
          }
          transition={{
            opacity: { duration: 0.18 },
            x: { duration: 6.8, repeat: prefersReducedMotion ? 0 : Infinity, ease: "easeInOut" },
            y: { duration: 4.8, repeat: prefersReducedMotion ? 0 : Infinity, ease: "easeInOut" },
            scale: { duration: 4.8, repeat: prefersReducedMotion ? 0 : Infinity, ease: "easeInOut" },
            rotate: { duration: 6.8, repeat: prefersReducedMotion ? 0 : Infinity, ease: "easeInOut" },
          }}
        >
          <motion.span
            className="absolute -top-8 left-1/2 h-8 w-12 -translate-x-1/2 text-[#111]"
            animate={
              prefersReducedMotion
                ? undefined
                : { opacity: [0.2, 1, 0.25], y: [8, -4, -14] }
            }
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
            aria-hidden
          >
            <span className="absolute left-1 top-2 h-6 w-px rotate-[-10deg] bg-current" />
            <span className="absolute left-5 top-0 h-7 w-px rotate-[8deg] bg-current" />
            <span className="absolute right-1 top-3 h-5 w-px rotate-[14deg] bg-current" />
          </motion.span>
          <motion.span
            className="absolute inset-[-18px] rounded-[2.2rem] border border-dashed border-[#111]/35"
            animate={prefersReducedMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            aria-hidden
          />
          <CoffeeIcon id={activeProfile.icon} className="relative h-20 w-20" />
        </motion.div>
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
          {coffeeProfiles.map((profile, index) => (
            <span
              key={profile.id}
              className={`h-2.5 border border-[#111] transition-all ${
                index === activeIndex ? "w-8 bg-[#111]" : "w-2.5 bg-white"
              }`}
            />
          ))}
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#555]">
          {locale === "zh"
            ? `第 ${answeredCount} 次漂移`
            : `Drift ${answeredCount}`}
        </div>
      </div>
      <div className="absolute bottom-4 left-4 right-4 grid border border-[#111] bg-white shadow-[4px_4px_0_#111] sm:grid-cols-[1fr_88px]">
        <div className="p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#555]">
            {locale === "zh" ? "当前漂移" : "Current drift"}
          </p>
          <p className="mt-1 text-xl font-semibold leading-7">
            {activeProfile.name[locale]}
          </p>
          <p className="mt-1 text-sm leading-6 text-[#444]">
            {activeProfile.description[locale]}
          </p>
        </div>
        <div className="flex items-center justify-center border-t border-[#111] p-4 sm:border-l sm:border-t-0">
          <CoffeeIcon id={activeProfile.icon} className="h-14 w-14" />
        </div>
      </div>
    </div>
  );
}

type CoffeeMarkProps = {
  locale: Locale;
  profile: CoffeeProfile;
  isActive: boolean;
  match: number;
  slot: { x: number; y: number };
  index: number;
  orbitIndex: number;
  answeredCount: number;
  prefersReducedMotion: boolean;
};

function CoffeeMark({
  locale,
  profile,
  isActive,
  match,
  slot,
  index,
  orbitIndex,
  answeredCount,
  prefersReducedMotion,
}: CoffeeMarkProps) {
  const copy = coffeeFinderCopy[locale];
  const size = baseSizes[profile.baseSize];
  const activeSize = Math.round(size * 1.2);
  const visualSize = isActive ? activeSize : size;
  const opacity = isActive ? 1 : match > 70 ? 0.68 : 0.36;
  const floatY = prefersReducedMotion ? 0 : isActive ? -5 : index % 2 ? 5 : -4;
  const sideDrift = prefersReducedMotion
    ? 0
    : Math.sin((answeredCount + 1) * (orbitIndex + 1)) * 4;
  const settleDelay = prefersReducedMotion ? 0 : orbitIndex * 0.045;

  return (
    <motion.div
      className="group flex justify-center lg:absolute"
      style={{
        left: `${slot.x}%`,
        top: `${slot.y}%`,
        zIndex: isActive ? 22 : 10 - index,
      }}
      animate={{
        left: `${slot.x}%`,
        top: `${slot.y}%`,
        opacity,
        x: sideDrift,
      }}
      transition={{
        left: {
          type: "spring",
          stiffness: 72,
          damping: 18,
          mass: 0.9 + orbitIndex * 0.08,
          delay: settleDelay,
        },
        top: {
          type: "spring",
          stiffness: 62,
          damping: 19,
          mass: 1 + orbitIndex * 0.08,
          delay: settleDelay,
        },
        x: {
          duration: prefersReducedMotion ? 0 : 5.8 + orbitIndex * 0.4,
          repeat: prefersReducedMotion ? 0 : Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        },
        opacity: { duration: prefersReducedMotion ? 0 : 0.35 },
      }}
    >
      <Link
        href={withLocale(`/stories/${profile.storySlug}`, locale)}
        aria-label={`${copy.openStory}: ${profile.name[locale]}, ${profile.flavor[locale]}`}
        data-coffee-id={profile.id}
        data-active={isActive}
        className="relative flex flex-col items-center text-center outline-none focus-visible:ring-2 focus-visible:ring-[#111] focus-visible:ring-offset-4 lg:-translate-x-1/2 lg:-translate-y-1/2"
      >
        <motion.span
          className="relative flex items-center justify-center rounded-full border border-[#111] bg-white font-semibold text-[#111] shadow-[0_20px_35px_rgba(0,0,0,0.08)] transition-colors group-hover:bg-[#111] group-hover:text-white group-focus-visible:bg-[#111] group-focus-visible:text-white"
          style={{
            width: visualSize,
            height: visualSize,
          }}
          animate={{
            y: [0, floatY, 0],
            rotate: isActive
              ? [0, -1.6, 0.8, 0]
              : [profile.scatter.rotate, profile.scatter.rotate + 2.2, profile.scatter.rotate],
            scale: isActive ? 1.08 : 1,
          }}
          transition={{
            y: {
              duration: prefersReducedMotion ? 0 : 5.2 + orbitIndex * 0.3,
              repeat: prefersReducedMotion ? 0 : Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: prefersReducedMotion ? 0 : isActive ? 5.5 : 7 + orbitIndex,
              repeat: prefersReducedMotion ? 0 : Infinity,
              ease: "easeInOut",
            },
            scale: { duration: prefersReducedMotion ? 0 : 0.45 },
          }}
        >
          <span className="absolute -bottom-2 h-3 w-2/3 rounded-[50%] bg-black/10 blur-[2px]" />
          <CoffeeIcon id={profile.icon} className="relative h-[54%] w-[54%]" />
        </motion.span>

        <span
          className={`mt-3 max-w-[13rem] border border-[#111] bg-white px-3 py-2 text-xs font-semibold leading-5 text-[#111] shadow-[3px_3px_0_#111] transition group-hover:opacity-100 group-focus-visible:opacity-100 ${
            isActive ? "opacity-100" : "opacity-0"
          }`}
        >
          {profile.name[locale]}
          <span className="block text-[11px] uppercase tracking-[0.12em] text-[#111]">
            {locale === "zh" ? `${match}% 靠近` : `${match}% fit`}
          </span>
          <span className="block font-normal text-[#444]">
            {profile.tag[locale]} / {profile.flavor[locale]}
          </span>
          <span className="mt-1 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.12em]">
            {copy.openStory}
            <span aria-hidden>↗</span>
          </span>
        </span>
      </Link>
    </motion.div>
  );
}

type QuestionDeckProps = {
  locale: Locale;
  isStarted: boolean;
  questionIndex: number;
  userAnswers: UserAnswers;
  activeProfile: CoffeeProfile;
  activeMatch: number;
  dialRotation: number;
  onStart: () => void;
  onAnswer: (questionId: QuestionId, answerId: AnswerId) => void;
  onBack: () => void;
  onReset: () => void;
};

function QuestionDeck({
  locale,
  isStarted,
  questionIndex,
  userAnswers,
  activeProfile,
  activeMatch,
  dialRotation,
  onStart,
  onAnswer,
  onBack,
  onReset,
}: QuestionDeckProps) {
  const copy = coffeeFinderCopy[locale];
  const question = questions[questionIndex] ?? questions[0];
  const selectedAnswer = userAnswers[question.id];
  const answeredCount = questions.filter((item) => userAnswers[item.id]).length;
  const progress = Math.round((answeredCount / questions.length) * 100);

  return (
    <div className="relative z-40 overflow-hidden border border-[#111] bg-[#fdfbf4] p-4 shadow-[6px_6px_0_#111]">
      <div className="pointer-events-none absolute right-4 top-4 h-24 w-24 overflow-hidden opacity-90">
        <div className="absolute inset-0 rounded-full border border-[#111] bg-white" />
        <div className="absolute inset-4 rounded-full border border-dashed border-[#111]/35" />
        <motion.div
          className="absolute left-1/2 top-1/2 h-10 w-px origin-top bg-[#111]"
          animate={{ rotate: dialRotation }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        />
        <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#111] bg-white text-[#111]">
          <CoffeeIcon id={activeProfile.icon} className="h-6 w-6" />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {!isStarted ? (
          <motion.div
            key="start"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="pr-24"
          >
            <div className="grid gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#555]">
                  {locale === "zh" ? "慢慢选" : "Choose slowly"}
                </p>
                <h2 className="mt-1 text-xl font-semibold text-[#111]">
                  {locale === "zh" ? "从一个感觉开始" : "Start with a feeling"}
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#333]">
                  {locale === "zh"
                    ? "不用急着决定。选几个答案，看看哪一杯慢慢靠近。"
                    : "No need to decide fast. Pick a few answers and see which cup comes closer."}
                </p>
              </div>
              <button
                type="button"
                className="inline-flex w-fit items-center justify-center gap-2 border border-[#111] bg-[#111] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-[#111]"
                onClick={onStart}
              >
                {locale === "zh" ? "开始" : "Start"}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="pr-0 sm:pr-24"
          >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#555]">
                    {locale === "zh"
                      ? `第 ${String(questionIndex + 1).padStart(2, "0")} 题`
                      : `Question ${String(questionIndex + 1).padStart(2, "0")}`}
                  </p>
                  <h2 className="mt-1 text-xl font-semibold leading-7 text-[#111]">
                    {question.title[locale]}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-[#333]">
                    {question.hint[locale]}
                  </p>
                </div>
                <div className="border border-[#111] bg-white px-3 py-2 text-right">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#555]">
                    {locale === "zh" ? "靠近" : "Fit"}
                  </p>
                  <p className="text-sm font-semibold text-[#111]">
                    {activeMatch}%
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {question.answers.map((answer) => {
                  const isSelected = selectedAnswer === answer.id;

                  return (
                    <button
                      key={answer.id}
                      type="button"
                      className={`min-h-12 border px-3 py-2 text-sm font-semibold transition ${
                        isSelected
                          ? "border-[#111] bg-[#111] text-white"
                          : "border-[#111] bg-[#fdfbf4] text-[#111] hover:bg-white"
                      }`}
                      aria-pressed={isSelected}
                      onClick={() => onAnswer(question.id, answer.id)}
                    >
                      {answer.label[locale]}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

        <div className="border-t border-[#111] pt-4">
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#555]">
            <Sparkle className="h-3.5 w-3.5" aria-hidden />
            {isStarted
              ? locale === "zh"
                ? "这一杯"
                : "This cup"
              : copy.controlsTitle}
          </p>
          <div className="mt-3 h-1.5 border border-[#111] bg-white">
            <div
              className="h-full bg-[#111] transition-[width] duration-300 ease-out"
              style={{ width: `${isStarted ? progress : 0}%` }}
            />
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs leading-5 text-[#555]">
              {isStarted
                ? `${String(
                    Math.min(questionIndex + 1, questions.length),
                  ).padStart(2, "0")} / ${String(questions.length).padStart(
                    2,
                    "0",
                  )} · ${activeProfile.name[locale]} · ${
                    locale === "zh"
                      ? `${activeMatch}% 靠近`
                      : `${activeMatch}% fit`
                  }`
                : copy.helperText}
            </p>
            <div className="flex items-center gap-3">
              {isStarted ? (
                <button
                  type="button"
                  className="border-b border-[#111] text-sm font-semibold text-[#111] disabled:border-transparent disabled:text-[#999]"
                  disabled={questionIndex === 0}
                  onClick={onBack}
                >
                  ← Back
                </button>
              ) : null}
              {isStarted ? (
                <button
                  type="button"
                  className="inline-flex items-center gap-2 border border-[#111] bg-[#fdfbf4] px-3 py-2 text-xs font-semibold text-[#111] transition hover:bg-[#111] hover:text-white"
                  onClick={onReset}
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                  {locale === "zh" ? "重来" : "Reset"}
                </button>
              ) : null}
              {isStarted ? (
                <Link
                  href={withLocale(`/stories/${activeProfile.storySlug}`, locale)}
                  className="inline-flex items-center gap-2 border border-[#111] bg-[#fdfbf4] px-3 py-2 text-sm font-semibold text-[#111] transition hover:bg-[#111] hover:text-white"
                >
                  {copy.openStory}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
