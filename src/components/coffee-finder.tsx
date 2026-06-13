"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, RotateCcw, Sparkle } from "lucide-react";
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
      zh: "像 Vitra 选择椅子一样，先选一个阅读状态。",
      en: "Like choosing a chair, start with the reading mood.",
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
      zh: "答案会改变每个咖啡主题的匹配分数。",
      en: "Your answer changes every coffee match score.",
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

export function CoffeeFinder({ locale }: CoffeeFinderProps) {
  const copy = coffeeFinderCopy[locale];
  const prefersReducedMotion = useReducedMotion();
  const [isStarted, setIsStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});

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
    setUserAnswers((current) => ({ ...current, [questionId]: answerId }));
    setQuestionIndex((current) => Math.min(current + 1, questions.length - 1));
  }

  function resetFinder() {
    setUserAnswers({});
    setQuestionIndex(0);
    setIsStarted(false);
  }

  return (
    <section className="relative min-h-[calc(100vh-64px)] overflow-hidden border-b border-[#111] bg-white text-[#111]">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-80" />
      <div className="pointer-events-none absolute inset-0 fine-dot-bg opacity-[0.2]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl flex-col border-x border-[#111] px-5 pb-8 pt-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href={withLocale("/", locale)}
            className="inline-flex items-center gap-2 border border-[#111] bg-white px-3 py-2 text-sm font-semibold shadow-[3px_3px_0_#111] transition hover:-translate-y-0.5 hover:bg-[#111] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#111] focus:ring-offset-2"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {copy.backHome}
          </Link>
          <Link
            href={withLocale("/stories", locale)}
            className="inline-flex items-center gap-2 border border-[#111] bg-white px-3 py-2 text-sm font-semibold shadow-[3px_3px_0_#111] transition hover:-translate-y-0.5 hover:bg-[#111] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#111] focus:ring-offset-2"
          >
            {copy.allStories}
            <BookOpen className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div className="relative flex flex-1 flex-col gap-6 pb-[240px] pt-6 lg:min-h-[700px] lg:pb-[190px]">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="relative z-30 mx-auto w-full max-w-[420px] border border-[#111] bg-white/95 p-4 text-center shadow-[6px_6px_0_#111] backdrop-blur lg:absolute lg:left-1/2 lg:top-5 lg:-translate-x-1/2"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#555]">
              {copy.eyebrow}
            </p>
            <h1 className="mt-2 text-2xl font-semibold leading-tight text-[#111] sm:text-[28px]">
              {isStarted ? activeProfile.name[locale] : copy.pageTitle}
            </h1>
            <p className="mt-2 text-xs leading-5 text-[#333]">
              {isStarted ? activeProfile.description[locale] : copy.pageBody}
            </p>
            <div className="mt-4 grid grid-cols-[54px_1fr] items-center border border-[#111] bg-[#f7f7f7] text-left">
              <div className="flex h-full min-h-16 items-center justify-center border-r border-[#111] bg-white text-[#111]">
                <CoffeeIcon id={activeProfile.icon} className="h-8 w-8" />
              </div>
              <div className="p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#555]">
                      {isStarted
                        ? locale === "zh"
                          ? "Match percentage"
                          : "Match percentage"
                        : copy.selectedLabel}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#111]">
                      {isStarted
                        ? `${activeMatch}% match`
                        : activeProfile.name[locale]}
                    </p>
                  </div>
                  {!isStarted ? (
                    <button
                      type="button"
                      className="border border-[#111] bg-[#111] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white hover:text-[#111]"
                      onClick={() => setIsStarted(true)}
                    >
                      Start
                    </button>
                  ) : null}
                </div>
                <p className="mt-1 text-[11px] leading-4 text-[#444]">
                  {activeProfile.flavor[locale]}
                </p>
              </div>
            </div>
          </motion.div>

          <div
            className="relative z-20 grid min-h-[520px] grid-cols-2 items-center gap-x-4 gap-y-8 pt-2 sm:grid-cols-3 lg:absolute lg:inset-0 lg:block lg:pt-0"
            aria-label={copy.pageTitle}
          >
            {coffeeProfiles.map((profile, index) => {
              const isActive = profile.id === activeProfile.id;
              const orbitIndex =
                (index - activeIndex + coffeeProfiles.length) %
                coffeeProfiles.length;
              const slot = orbitSlots[orbitIndex] ?? {
                x: profile.scatter.x,
                y: profile.scatter.y,
              };
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
                  slot={slot}
                  index={index}
                  prefersReducedMotion={Boolean(prefersReducedMotion)}
                />
              );
            })}
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
      </div>
    </section>
  );
}

type CoffeeMarkProps = {
  locale: Locale;
  profile: CoffeeProfile;
  isActive: boolean;
  match: number;
  slot: { x: number; y: number };
  index: number;
  prefersReducedMotion: boolean;
};

function CoffeeMark({
  locale,
  profile,
  isActive,
  match,
  slot,
  index,
  prefersReducedMotion,
}: CoffeeMarkProps) {
  const copy = coffeeFinderCopy[locale];
  const size = baseSizes[profile.baseSize];
  const activeSize = Math.round(size * 1.2);
  const visualSize = isActive ? activeSize : size;
  const opacity = isActive ? 1 : match > 70 ? 0.68 : 0.36;
  const floatY = prefersReducedMotion ? 0 : isActive ? -5 : index % 2 ? 5 : -4;

  return (
    <motion.div
      className="group relative flex justify-center lg:absolute"
      style={{
        left: `${slot.x}%`,
        top: `${slot.y}%`,
        translate: "-50% -50%",
        zIndex: isActive ? 22 : 10 - index,
      }}
      animate={{
        left: `${slot.x}%`,
        top: `${slot.y}%`,
        opacity,
      }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: "easeOut" }}
    >
      <Link
        href={withLocale(`/stories/${profile.storySlug}`, locale)}
        aria-label={`${copy.openStory}: ${profile.name[locale]}, ${profile.flavor[locale]}`}
        data-coffee-id={profile.id}
        data-active={isActive}
        className="relative flex flex-col items-center text-center outline-none focus-visible:ring-2 focus-visible:ring-[#111] focus-visible:ring-offset-4"
      >
        <motion.span
          className="relative flex items-center justify-center rounded-full border border-[#111] bg-white font-semibold text-[#111] shadow-[0_20px_35px_rgba(0,0,0,0.08)] transition-colors group-hover:bg-[#111] group-hover:text-white group-focus-visible:bg-[#111] group-focus-visible:text-white"
          style={{
            width: visualSize,
            height: visualSize,
          }}
          animate={{
            y: [0, floatY, 0],
            rotate: isActive ? 0 : profile.scatter.rotate,
            scale: isActive ? 1.08 : 1,
          }}
          transition={{
            y: {
              duration: prefersReducedMotion ? 0 : 4.6 + index * 0.2,
              repeat: prefersReducedMotion ? 0 : Infinity,
              ease: "easeInOut",
            },
            rotate: { duration: prefersReducedMotion ? 0 : 0.7 },
            scale: { duration: prefersReducedMotion ? 0 : 0.45 },
          }}
        >
          <span className="absolute -bottom-2 h-3 w-2/3 rounded-[50%] bg-black/10 blur-[2px]" />
          <CoffeeIcon id={profile.icon} className="relative h-[54%] w-[54%]" />
        </motion.span>

        <span className="mt-3 max-w-[13rem] border border-[#111] bg-white px-3 py-2 text-xs font-semibold leading-5 text-[#111] opacity-0 shadow-[3px_3px_0_#111] transition group-hover:opacity-100 group-focus-visible:opacity-100">
          {profile.name[locale]}
          <span className="block text-[11px] uppercase tracking-[0.12em] text-[#111]">
            {match}% match
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
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#111] bg-white/95 px-5 pb-5 pt-10 shadow-[0_-16px_40px_rgba(0,0,0,0.06)] backdrop-blur sm:px-8">
      <div className="pointer-events-none absolute left-1/2 top-0 h-28 w-[290px] -translate-x-1/2 -translate-y-[74px] overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[290px] rounded-full border border-[#111] bg-white" />
        <div className="absolute inset-x-8 top-8 h-[226px] rounded-full border border-dashed border-[#111]/35" />
        <motion.div
          className="absolute left-1/2 top-[76px] h-[92px] w-px origin-top bg-[#111]"
          animate={{ rotate: dialRotation }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        />
        <div className="absolute left-1/2 top-4 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-[#111] bg-white text-[#111] shadow-[3px_3px_0_#111]">
          <CoffeeIcon id={activeProfile.icon} className="h-7 w-7" />
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 lg:grid-cols-[0.68fr_1.32fr] lg:items-end">
        <div>
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#555]">
            <Sparkle className="h-3.5 w-3.5" aria-hidden />
            {isStarted
              ? locale === "zh"
                ? "Questionnaire"
                : "Questionnaire"
              : copy.controlsTitle}
          </p>
          <p className="mt-2 text-sm leading-6 text-[#333]">
            {isStarted
              ? locale === "zh"
                ? `${activeProfile.name[locale]} 现在是 ${activeMatch}% match。`
                : `${activeProfile.name[locale]} is now a ${activeMatch}% match.`
              : copy.dialHint}
          </p>
          <div className="mt-3 h-1 border border-[#111] bg-white">
            <div
              className="h-full bg-[#111] transition-[width]"
              style={{ width: `${isStarted ? progress : 0}%` }}
            />
          </div>
          <p className="mt-2 text-xs leading-5 text-[#555]">
            {isStarted
              ? `${String(Math.min(questionIndex + 1, questions.length)).padStart(
                  2,
                  "0",
                )} / ${String(questions.length).padStart(2, "0")}`
              : copy.helperText}
          </p>
        </div>

        <div className="border border-[#111] bg-white p-4 shadow-[5px_5px_0_#111]">
          {!isStarted ? (
            <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#555]">
                  {locale === "zh" ? "Product finder logic" : "Product finder logic"}
                </p>
                <h2 className="mt-1 text-xl font-semibold text-[#111]">
                  {locale === "zh" ? "回答几个问题，找到一杯" : "Answer, then match a cup"}
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#333]">
                  {locale === "zh"
                    ? "每个咖啡图标都有一组答案分数。开始后，图标会根据你的答案重新排序。"
                    : "Each coffee icon has answer scores. After you start, icons reorder by your answers."}
                </p>
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 border border-[#111] bg-[#111] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-[#111]"
                onClick={onStart}
              >
                Start
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
          ) : (
            <div>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#555]">
                    {locale === "zh" ? "Question" : "Question"}{" "}
                    {String(questionIndex + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-1 text-xl font-semibold leading-7 text-[#111]">
                    {question.title[locale]}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-[#333]">
                    {question.hint[locale]}
                  </p>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 border border-[#111] bg-white px-3 py-2 text-xs font-semibold text-[#111] transition hover:bg-[#111] hover:text-white"
                  onClick={onReset}
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                  {locale === "zh" ? "重来" : "Reset"}
                </button>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {question.answers.map((answer) => {
                  const isSelected = selectedAnswer === answer.id;

                  return (
                    <button
                      key={answer.id}
                      type="button"
                      className={`min-h-12 border px-3 py-2 text-sm font-semibold transition ${
                        isSelected
                          ? "border-[#111] bg-[#111] text-white"
                          : "border-[#111] bg-white text-[#111] hover:bg-[#f2f2f2]"
                      }`}
                      aria-pressed={isSelected}
                      onClick={() => onAnswer(question.id, answer.id)}
                    >
                      {answer.label[locale]}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <button
                  type="button"
                  className="border-b border-[#111] text-sm font-semibold text-[#111] disabled:border-transparent disabled:text-[#999]"
                  disabled={questionIndex === 0}
                  onClick={onBack}
                >
                  ← Back
                </button>
                <Link
                  href={withLocale(`/stories/${activeProfile.storySlug}`, locale)}
                  className="inline-flex items-center gap-2 border border-[#111] bg-white px-3 py-2 text-sm font-semibold text-[#111] transition hover:bg-[#111] hover:text-white"
                >
                  {copy.openStory}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
