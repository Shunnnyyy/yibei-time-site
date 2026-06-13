"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Sparkle } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import * as Slider from "@radix-ui/react-slider";
import { useMemo, useState } from "react";
import { CoffeeIcon } from "@/components/coffee-icons";
import {
  coffeeFinderCopy,
  coffeeProfiles,
  withLocale,
  type CoffeeAgeBand,
  type CoffeeProfile,
  type CoffeeTimeBand,
} from "@/lib/content";
import type { Locale } from "@/lib/booking";

type CoffeeFinderProps = {
  locale: Locale;
};

const timeBands: CoffeeTimeBand[] = [
  "08:00",
  "10:00",
  "12:00",
  "14:00",
  "16:00",
  "18:00",
  "20:00",
  "22:00",
  "anytime",
];

const ageBands: CoffeeAgeBand[] = [
  "teen",
  "student",
  "young_adult",
  "adult",
  "open",
];

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

function scoreCoffee(
  profile: CoffeeProfile,
  timeBand: CoffeeTimeBand,
  ageBand: CoffeeAgeBand,
) {
  let score = 0;

  if (profile.timeBand === timeBand) score += 6;
  if (profile.timeBand === "anytime" || timeBand === "anytime") score += 2;
  if (profile.ageBand === ageBand) score += 4;
  if (profile.ageBand === "open" || ageBand === "open") score += 1;

  return score;
}

export function CoffeeFinder({ locale }: CoffeeFinderProps) {
  const copy = coffeeFinderCopy[locale];
  const prefersReducedMotion = useReducedMotion();
  const [timeIndex, setTimeIndex] = useState(3);
  const [ageIndex, setAgeIndex] = useState(1);

  const selectedTime = timeBands[timeIndex] ?? "14:00";
  const selectedAge = ageBands[ageIndex] ?? "student";

  const rankedProfiles = useMemo(() => {
    return coffeeProfiles
      .map((profile, index) => ({
        profile,
        score: scoreCoffee(profile, selectedTime, selectedAge),
        index,
      }))
      .sort((a, b) => b.score - a.score || a.index - b.index);
  }, [selectedAge, selectedTime]);

  const activeProfile = rankedProfiles[0]?.profile ?? coffeeProfiles[0];
  const activeIndex = coffeeProfiles.findIndex(
    (profile) => profile.id === activeProfile.id,
  );
  const dialRotation = timeIndex * 18 + ageIndex * 11;

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
              {copy.pageTitle}
            </h1>
            <p className="mt-2 text-xs leading-5 text-[#333]">{copy.pageBody}</p>
            <div className="mt-4 grid grid-cols-[54px_1fr] items-center border border-[#111] bg-[#f7f7f7] text-left">
              <div className="flex h-full min-h-16 items-center justify-center border-r border-[#111] bg-white text-[#111]">
                <CoffeeIcon id={activeProfile.icon} className="h-8 w-8" />
              </div>
              <div className="p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#555]">
                {copy.selectedLabel}
              </p>
              <p className="mt-1 text-sm font-semibold text-[#111]">
                {activeProfile.name[locale]}
              </p>
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
              const score = scoreCoffee(profile, selectedTime, selectedAge);

              return (
                <CoffeeMark
                  key={profile.id}
                  locale={locale}
                  profile={profile}
                  isActive={isActive}
                  score={score}
                  slot={slot}
                  index={index}
                  prefersReducedMotion={Boolean(prefersReducedMotion)}
                />
              );
            })}
          </div>
        </div>

        <CoffeeDial
          locale={locale}
          timeIndex={timeIndex}
          ageIndex={ageIndex}
          activeProfile={activeProfile}
          dialRotation={dialRotation}
          onTimeChange={setTimeIndex}
          onAgeChange={setAgeIndex}
        />
      </div>
    </section>
  );
}

type CoffeeMarkProps = {
  locale: Locale;
  profile: CoffeeProfile;
  isActive: boolean;
  score: number;
  slot: { x: number; y: number };
  index: number;
  prefersReducedMotion: boolean;
};

function CoffeeMark({
  locale,
  profile,
  isActive,
  score,
  slot,
  index,
  prefersReducedMotion,
}: CoffeeMarkProps) {
  const copy = coffeeFinderCopy[locale];
  const size = baseSizes[profile.baseSize];
  const activeSize = Math.round(size * 1.2);
  const visualSize = isActive ? activeSize : size;
  const opacity = isActive ? 1 : score > 0 ? 0.58 : 0.32;
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

type CoffeeDialProps = {
  locale: Locale;
  timeIndex: number;
  ageIndex: number;
  activeProfile: CoffeeProfile;
  dialRotation: number;
  onTimeChange: (value: number) => void;
  onAgeChange: (value: number) => void;
};

function CoffeeDial({
  locale,
  timeIndex,
  ageIndex,
  activeProfile,
  dialRotation,
  onTimeChange,
  onAgeChange,
}: CoffeeDialProps) {
  const copy = coffeeFinderCopy[locale];
  const selectedTime = timeBands[timeIndex] ?? "14:00";
  const selectedAge = ageBands[ageIndex] ?? "student";

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

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 lg:grid-cols-[0.8fr_1fr_1fr] lg:items-end">
        <div>
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#555]">
            <Sparkle className="h-3.5 w-3.5" aria-hidden />
            {copy.controlsTitle}
          </p>
          <p className="mt-2 text-sm leading-6 text-[#333]">{copy.dialHint}</p>
          <p className="mt-1 text-xs leading-5 text-[#555]">{copy.helperText}</p>
        </div>

        <DialSlider
          label={copy.timeLabel}
          ariaLabel={copy.timeSliderLabel}
          value={timeIndex}
          max={timeBands.length - 1}
          valueLabel={copy.timeBands[selectedTime]}
          tickLabels={timeBands.map((band) => copy.timeBands[band])}
          onChange={onTimeChange}
        />

        <DialSlider
          label={copy.ageLabel}
          ariaLabel={copy.ageSliderLabel}
          value={ageIndex}
          max={ageBands.length - 1}
          valueLabel={copy.ageBands[selectedAge]}
          tickLabels={ageBands.map((band) => copy.ageBands[band])}
          onChange={onAgeChange}
        />
      </div>
    </div>
  );
}

type DialSliderProps = {
  label: string;
  ariaLabel: string;
  value: number;
  max: number;
  valueLabel: string;
  tickLabels: string[];
  onChange: (value: number) => void;
};

function DialSlider({
  label,
  ariaLabel,
  value,
  max,
  valueLabel,
  tickLabels,
  onChange,
}: DialSliderProps) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-[#111]">{label}</p>
        <p className="border border-[#111] bg-white px-2 py-1 text-xs font-semibold text-[#111]">
          {valueLabel}
        </p>
      </div>
      <Slider.Root
        aria-label={ariaLabel}
        value={[value]}
        min={0}
        max={max}
        step={1}
        onValueChange={(nextValue) => onChange(nextValue[0] ?? 0)}
        className="relative flex h-7 w-full touch-none select-none items-center"
      >
        <Slider.Track className="relative h-px grow border-t border-[#111] bg-[#111]">
          <Slider.Range className="absolute h-px bg-[#111]" />
        </Slider.Track>
        <Slider.Thumb className="block h-5 w-5 border border-[#111] bg-white shadow-[2px_2px_0_#111] outline-none transition hover:bg-[#111] focus-visible:ring-2 focus-visible:ring-[#111] focus-visible:ring-offset-2" />
      </Slider.Root>
      <div className="mt-2 flex justify-between gap-2 text-[10px] font-medium leading-4 text-[#555]">
        {tickLabels.map((tick) => (
          <span key={tick} className="max-w-16 text-center">
            {tick}
          </span>
        ))}
      </div>
    </div>
  );
}
