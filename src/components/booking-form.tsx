"use client";

import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Mail,
  MessageCircle,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import {
  bookingCopy,
  bookingLocations,
  conversationFormats,
  timeSlots,
  timeZoneOptions,
} from "@/lib/content";
import {
  defaultTimeZoneForLocation,
  type ConversationFormat,
  type Locale,
  type LocationId,
  type TimeZoneId,
} from "@/lib/booking";

type BookingFormProps = {
  locale: Locale;
};

type BookingDraft = {
  email: string;
  location: LocationId;
  timezone: TimeZoneId;
  date: string;
  time: string;
  format: ConversationFormat;
  note: string;
  company: string;
};

type SubmitState =
  | { type: "idle" }
  | { type: "sending" }
  | {
      type: "success";
      displayTimes: { primary: string; secondary: string };
    }
  | { type: "error"; errors: string[] };

const defaultBooking: BookingDraft = {
  email: "",
  location: "fuzhou",
  timezone: "Asia/Shanghai",
  date: "2026-06-15",
  time: "14:00",
  format: "offline",
  note: "",
  company: "",
};

function errorMessage(errors: string[], locale: Locale) {
  const copy = bookingCopy[locale];

  if (errors.includes("email_not_configured")) {
    return copy.missingEnv;
  }

  if (errors.includes("invalid_email")) {
    return locale === "zh" ? "请填写有效邮箱。" : "Please enter a valid email.";
  }

  if (errors.includes("spam_detected")) {
    return locale === "zh"
      ? "预约没有通过安全检查。"
      : "The booking did not pass the safety check.";
  }

  return copy.genericError;
}

export function BookingForm({ locale }: BookingFormProps) {
  const copy = bookingCopy[locale];
  const [booking, setBooking] = useState<BookingDraft>(defaultBooking);
  const [submitState, setSubmitState] = useState<SubmitState>({ type: "idle" });

  const selectedLocation = useMemo(
    () =>
      bookingLocations.find((location) => location.id === booking.location) ??
      bookingLocations[0],
    [booking.location],
  );

  const noteCount = booking.note.length;
  const isOnline = booking.location === "online";

  function updateBooking(value: Partial<BookingDraft>) {
    setSubmitState({ type: "idle" });
    setBooking((current) => ({ ...current, ...value }));
  }

  function handleLocationChange(location: LocationId) {
    const timezone = defaultTimeZoneForLocation(location);
    updateBooking({
      location,
      timezone,
      format: location === "online" ? "online" : "offline",
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState({ type: "sending" });

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...booking,
          locale,
        }),
      });
      const data = (await response.json()) as {
        ok: boolean;
        errors?: string[];
        booking?: {
          displayTimes: { primary: string; secondary: string };
        };
      };

      if (!response.ok || !data.ok || !data.booking) {
        setSubmitState({ type: "error", errors: data.errors ?? ["unknown"] });
        return;
      }

      setSubmitState({
        type: "success",
        displayTimes: data.booking.displayTimes,
      });
    } catch {
      setSubmitState({ type: "error", errors: ["network_error"] });
    }
  }

  return (
    <form
      className="w-full max-w-[680px] space-y-4 rounded-[1.75rem] border border-[#1d1712]/12 bg-[#fffaf0]/78 p-4 shadow-[0_24px_70px_rgba(68,54,43,0.13)] backdrop-blur-xl sm:p-5"
      onSubmit={handleSubmit}
      data-testid="booking-form"
    >
      <label className="space-y-1.5 text-sm font-medium text-[#1d1712]">
        <span>{copy.email}</span>
        <span className="relative block">
          <Mail
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7c6d60]"
            aria-hidden
          />
          <input
            className="h-12 w-full rounded-full border border-[#1d1712]/15 bg-white/90 px-11 text-[15px] text-[#1d1712] outline-none transition placeholder:text-[#8a7b6c] focus:border-[#095456] focus:ring-2 focus:ring-[#095456]/25"
            type="email"
            required
            placeholder={copy.emailPlaceholder}
            value={booking.email}
            onChange={(event) => updateBooking({ email: event.target.value })}
          />
        </span>
      </label>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-[#1d1712]">{copy.location}</legend>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {bookingLocations.map((option) => {
            const Icon = option.icon;
            const isSelected = booking.location === option.id;

            return (
              <button
                key={option.id}
                type="button"
                className={`flex min-h-11 items-center justify-center gap-2 rounded-full border px-4 text-sm font-medium transition ${
                  isSelected
                    ? "border-[#095456] bg-[#095456] text-[#fffaf0] shadow-[0_12px_28px_rgba(9,84,86,0.22)]"
                    : "border-[#1d1712]/15 bg-white/80 text-[#1d1712] hover:-translate-y-0.5 hover:bg-white"
                }`}
                aria-pressed={isSelected}
                onClick={() => handleLocationChange(option.id)}
              >
                <Icon className="h-4 w-4" aria-hidden />
                <span>{option.shortLabel[locale]}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_160px]">
        <label className="space-y-1.5 text-sm font-medium text-[#1d1712]">
          <span>{copy.date}</span>
          <input
            className="h-11 w-full rounded-full border border-[#1d1712]/15 bg-white/90 px-4 text-[15px] text-[#1d1712] outline-none transition focus:border-[#095456] focus:ring-2 focus:ring-[#095456]/25"
            type="date"
            required
            value={booking.date}
            onChange={(event) => updateBooking({ date: event.target.value })}
          />
        </label>

        <label className="space-y-1.5 text-sm font-medium text-[#1d1712]">
          <span>{copy.time}</span>
          <span className="relative block">
            <Clock
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7c6d60]"
              aria-hidden
            />
            <select
              className="h-11 w-full appearance-none rounded-full border border-[#1d1712]/15 bg-white/90 px-10 text-[15px] text-[#1d1712] outline-none transition focus:border-[#095456] focus:ring-2 focus:ring-[#095456]/25"
              value={booking.time}
              onChange={(event) => updateBooking({ time: event.target.value })}
            >
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </span>
        </label>
      </div>

      <label className="space-y-1.5 text-sm font-medium text-[#1d1712]">
        <span>{copy.timezone}</span>
        <select
          className="h-11 w-full rounded-full border border-[#1d1712]/15 bg-white/90 px-4 text-[15px] text-[#1d1712] outline-none transition disabled:bg-[#eee4d6] focus:border-[#095456] focus:ring-2 focus:ring-[#095456]/25"
          value={booking.timezone}
          disabled={!isOnline}
          onChange={(event) =>
            updateBooking({ timezone: event.target.value as TimeZoneId })
          }
        >
          {timeZoneOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label[locale]}
            </option>
          ))}
        </select>
        <span className="block text-xs leading-5 text-[#7c6d60]">
          {isOnline ? copy.timezoneHint : selectedLocation.description[locale]}
        </span>
      </label>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-[#1d1712]">{copy.format}</legend>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {conversationFormats.map((option) => {
            const Icon = option.icon;
            const isSelected = booking.format === option.id;

            return (
              <button
                key={option.id}
                type="button"
                className={`flex min-h-11 items-center justify-center gap-2 rounded-full border px-3 text-sm font-medium transition ${
                  isSelected
                    ? "border-[#1d1712] bg-[#1d1712] text-[#fffaf0]"
                    : "border-[#1d1712]/15 bg-white/80 text-[#1d1712] hover:-translate-y-0.5 hover:bg-white"
                }`}
                aria-pressed={isSelected}
                onClick={() => updateBooking({ format: option.id })}
              >
                <Icon className="h-4 w-4" aria-hidden />
                <span>{option.shortLabel[locale]}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <label className="space-y-1.5 text-sm font-medium text-[#1d1712]">
        <span>{copy.note}</span>
        <span className="relative block">
          <MessageCircle
            className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-[#7c6d60]"
            aria-hidden
          />
          <textarea
            className="min-h-[86px] w-full resize-none rounded-[1.25rem] border border-[#1d1712]/15 bg-white/90 px-11 py-3 text-[15px] leading-6 text-[#1d1712] outline-none transition placeholder:text-[#8a7b6c] focus:border-[#095456] focus:ring-2 focus:ring-[#095456]/25"
            maxLength={500}
            placeholder={copy.notePlaceholder}
            value={booking.note}
            onChange={(event) => updateBooking({ note: event.target.value })}
          />
          <span className="absolute bottom-3 right-4 text-xs text-[#7c6d60]">
            {noteCount}/500
          </span>
        </span>
      </label>

      <label className="hidden" aria-hidden>
        Company
        <input
          tabIndex={-1}
          autoComplete="off"
          value={booking.company}
          onChange={(event) => updateBooking({ company: event.target.value })}
        />
      </label>

      <button
        className="group flex h-12 w-full items-center justify-center gap-3 rounded-full border border-[#1d1712] bg-[#1d1712] px-5 text-base font-semibold text-[#fffaf0] shadow-[0_16px_34px_rgba(29,23,18,0.2)] transition hover:-translate-y-0.5 hover:bg-[#e7a64e] hover:text-[#1d1712] focus:outline-none focus:ring-2 focus:ring-[#095456] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        type="submit"
        disabled={submitState.type === "sending"}
      >
        {submitState.type === "sending" ? copy.sending : copy.submit}
        <ArrowRight
          className="h-5 w-5 transition group-hover:translate-x-1"
          aria-hidden
        />
      </button>

      <p className="text-center text-xs leading-5 text-[#7c6d60]">{copy.privacy}</p>

      <div aria-live="polite">
        {submitState.type === "success" ? (
          <div
            className="flex items-start gap-3 rounded-2xl border border-[#095456]/25 bg-white/86 p-4 text-sm text-[#1d1712]"
            data-testid="booking-confirmation"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
            <div>
              <p className="font-semibold">{copy.successTitle}</p>
              <p className="mt-1 leading-6">{copy.successBody}</p>
              <p className="mt-1 leading-6">
                {submitState.displayTimes.primary} ·{" "}
                {submitState.displayTimes.secondary}
              </p>
            </div>
          </div>
        ) : null}

        {submitState.type === "error" ? (
          <div
            className="flex items-start gap-3 rounded-2xl border border-[#a4442f]/25 bg-white/86 p-4 text-sm text-[#1d1712]"
            data-testid="booking-error"
          >
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
            <div>
              <p className="font-semibold">{copy.failureTitle}</p>
              <p className="mt-1 leading-6">
                {errorMessage(submitState.errors, locale)}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </form>
  );
}
