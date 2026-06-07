"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import {
  coffeeFinderCopy,
  coffeeProfiles,
  withLocale,
  type CoffeeMethod,
  type CoffeeProfile,
} from "@/lib/content";
import type { Locale } from "@/lib/booking";

type CoffeeFinderProps = {
  locale: Locale;
};

function profileDistance(profile: CoffeeProfile, roast: number, acid: number) {
  return Math.abs(profile.roast - roast) + Math.abs(profile.acid - acid);
}

export function CoffeeFinder({ locale }: CoffeeFinderProps) {
  const copy = coffeeFinderCopy[locale];
  const [roast, setRoast] = useState(2);
  const [acid, setAcid] = useState(2);
  const [method, setMethod] = useState<CoffeeMethod>("all");

  const matches = useMemo(() => {
    const exact = coffeeProfiles.filter((profile) => {
      const methodMatches = method === "all" || profile.method === method;
      return profile.roast === roast && profile.acid === acid && methodMatches;
    });

    if (exact.length > 0) {
      return { profiles: exact, exact: true };
    }

    const closest = coffeeProfiles
      .filter((profile) => method === "all" || profile.method === method)
      .sort(
        (left, right) =>
          profileDistance(left, roast, acid) - profileDistance(right, roast, acid),
      )
      .slice(0, 2);

    return { profiles: closest, exact: false };
  }, [acid, method, roast]);

  return (
    <div className="grid grid-cols-1 border border-[#111] bg-white lg:grid-cols-[360px_1fr]">
      <aside className="dot-bg border-b border-[#111] p-5 sm:p-6 lg:border-b-0 lg:border-r">
        <div className="mb-8 flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#111] bg-white text-[#111]">
            <SlidersHorizontal className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <h3 className="text-xl font-semibold leading-7 text-[#111]">
              {copy.panelTitle}
            </h3>
            <p className="mt-1 text-sm leading-6 text-[#333]">{copy.panelBody}</p>
          </div>
        </div>

        <div className="space-y-8">
          <RangeControl
            label={copy.roast}
            value={roast}
            labels={copy.roastLabels}
            onChange={setRoast}
          />
          <RangeControl
            label={copy.acid}
            value={acid}
            labels={copy.acidLabels}
            onChange={setAcid}
          />

          <fieldset className="space-y-3">
            <legend className="text-xs font-semibold uppercase tracking-[0.08em] text-[#555]">
              {copy.method}
            </legend>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(copy.methods) as CoffeeMethod[]).map((option) => {
                const isSelected = method === option;

                return (
                  <button
                    key={option}
                    type="button"
                    className={`min-h-11 border px-3 text-sm font-semibold transition ${
                      isSelected
                        ? "border-[#111] bg-[#111] text-white"
                        : "border-[#111] bg-white text-[#111] hover:bg-[#f2f2f2]"
                    }`}
                    aria-pressed={isSelected}
                    onClick={() => setMethod(option)}
                  >
                    {copy.methods[option]}
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>
      </aside>

      <div className="grid-bg p-5 sm:p-6">
        <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <p className="text-sm font-semibold text-[#111]">
            {matches.exact
              ? `${matches.profiles.length} ${copy.resultCount}`
              : copy.bestMatch}
          </p>
          {!matches.exact && (
            <p className="max-w-md text-sm leading-6 text-[#555]">{copy.noResult}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {matches.profiles.map((profile) => (
            <Link
              key={profile.id}
              href={withLocale(`/stories/${profile.storySlug}`, locale)}
              className="group flex min-h-[420px] flex-col overflow-hidden border border-[#111] bg-white transition hover:-translate-y-1 hover:shadow-[8px_8px_0_#111] focus:outline-none focus:ring-2 focus:ring-[#111] focus:ring-offset-2"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#f2f2f2]">
                <Image
                  src={profile.image}
                  alt={profile.imageAlt[locale]}
                  fill
                  sizes="(min-width: 1280px) 24vw, (min-width: 768px) 45vw, 100vw"
                  className="object-cover grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex flex-wrap gap-2 text-xs text-[#555]">
                  <span className="border border-[#111] bg-white px-2 py-1">
                    {copy.roastLabels[profile.roast - 1]}
                  </span>
                  <span className="border border-[#111] bg-white px-2 py-1">
                    {copy.acidLabels[profile.acid - 1]}
                  </span>
                  <span className="border border-[#111] bg-white px-2 py-1">
                    {copy.methods[profile.method]}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-semibold leading-7 text-[#111]">
                  {profile.name[locale]}
                </h3>
                <p className="mt-2 text-sm font-semibold text-[#111]">
                  {profile.flavor[locale]}
                </p>
                <p className="mt-3 flex-1 text-sm leading-6 text-[#333]">
                  {profile.description[locale]}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#111]">
                  {copy.readStory}
                  <ArrowRight
                    className="h-4 w-4 transition group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

type RangeControlProps = {
  label: string;
  value: number;
  labels: string[];
  onChange: (value: number) => void;
};

function RangeControl({ label, value, labels, onChange }: RangeControlProps) {
  return (
    <label className="block space-y-4">
      <span className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#555]">
          {label}
        </span>
        <span className="border border-[#111] bg-white px-2 py-1 text-xs font-semibold text-[#111]">
          {labels[value - 1]}
        </span>
      </span>
      <input
        type="range"
        min={1}
        max={3}
        step={1}
        value={value}
        className="coffee-range w-full"
        onChange={(event) => onChange(Number(event.target.value))}
        onInput={(event) => onChange(Number(event.currentTarget.value))}
      />
      <span className="flex justify-between text-xs text-[#555]">
        {labels.map((rangeLabel) => (
          <span key={rangeLabel}>{rangeLabel}</span>
        ))}
      </span>
    </label>
  );
}
