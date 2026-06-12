import { DateTime } from "luxon";

export type Locale = "zh" | "en";
export type LocationId = "fuzhou" | "toronto" | "online";
export type TimeZoneId = "Asia/Shanghai" | "America/Toronto";
export type ConversationFormat = "offline" | "online";

export type BookingRequest = {
  email: string;
  location: LocationId;
  timezone: TimeZoneId;
  date: string;
  time: string;
  format: ConversationFormat;
  note: string;
  locale: Locale;
  startsAtUtc: string;
};

export type NormalizedBooking = BookingRequest & {
  displayTimes: {
    primary: string;
    secondary: string;
  };
};

type RawBookingPayload = Partial<Record<keyof BookingRequest | "company", unknown>>;

type ValidationResult =
  | { ok: true; value: Omit<BookingRequest, "startsAtUtc"> & { company: string } }
  | { ok: false; errors: string[] };

type NormalizeResult =
  | { ok: true; booking: NormalizedBooking }
  | { ok: false; errors: string[] };

const locations: LocationId[] = ["fuzhou", "toronto", "online"];
const timeZones: TimeZoneId[] = ["Asia/Shanghai", "America/Toronto"];
const formats: ConversationFormat[] = ["offline", "online"];
const locales: Locale[] = ["zh", "en"];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function defaultTimeZoneForLocation(location: LocationId): TimeZoneId {
  if (location === "toronto") {
    return "America/Toronto";
  }

  return "Asia/Shanghai";
}

function getString(payload: RawBookingPayload, key: keyof BookingRequest | "company") {
  const value = payload[key];
  return typeof value === "string" ? value.trim() : "";
}

function formatTime(date: DateTime, zoneLabel: string) {
  return `${zoneLabel}: ${date.toFormat("yyyy-MM-dd HH:mm")}`;
}

export function validateBookingPayload(payload: RawBookingPayload): ValidationResult {
  const email = getString(payload, "email").toLowerCase();
  const location = getString(payload, "location") as LocationId;
  const timezone = getString(payload, "timezone") as TimeZoneId;
  const date = getString(payload, "date");
  const time = getString(payload, "time");
  const format = getString(payload, "format") as ConversationFormat;
  const note = getString(payload, "note");
  const locale = (getString(payload, "locale") || "zh") as Locale;
  const company = getString(payload, "company");
  const errors: string[] = [];

  if (!emailPattern.test(email)) {
    errors.push("invalid_email");
  }

  if (!locations.includes(location)) {
    errors.push("invalid_location");
  }

  if (!timeZones.includes(timezone)) {
    errors.push("invalid_timezone");
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    errors.push("invalid_date");
  }

  if (!/^\d{2}:\d{2}$/.test(time)) {
    errors.push("invalid_time");
  }

  if (!formats.includes(format)) {
    errors.push("invalid_format");
  }

  if (!locales.includes(locale)) {
    errors.push("invalid_locale");
  }

  if (note.length > 500) {
    errors.push("note_too_long");
  }

  if (company.length > 0) {
    errors.push("spam_detected");
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    value: {
      email,
      location,
      timezone,
      date,
      time,
      format,
      note,
      locale,
      company,
    },
  };
}

export function normalizeBookingPayload(payload: RawBookingPayload): NormalizeResult {
  const validation = validateBookingPayload(payload);

  if (!validation.ok) {
    return validation;
  }

  const dateTime = DateTime.fromISO(
    `${validation.value.date}T${validation.value.time}`,
    { zone: validation.value.timezone },
  );

  if (!dateTime.isValid) {
    return { ok: false, errors: ["invalid_datetime"] };
  }

  const otherZone =
    validation.value.timezone === "Asia/Shanghai"
      ? "America/Toronto"
      : "Asia/Shanghai";
  const primaryLabel =
    validation.value.timezone === "Asia/Shanghai" ? "福州" : "Toronto";
  const secondaryLabel = otherZone === "Asia/Shanghai" ? "福州" : "Toronto";
  const otherDate = dateTime.setZone(otherZone);

  return {
    ok: true,
    booking: {
      ...validation.value,
      startsAtUtc: dateTime.toUTC().toISO({ suppressMilliseconds: false }) ?? "",
      displayTimes: {
        primary: formatTime(dateTime, primaryLabel),
        secondary: formatTime(otherDate, secondaryLabel),
      },
    },
  };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function buildBookingEmail(booking: NormalizedBooking) {
  const note = booking.note || "No note";
  const rows = [
    ["Email", booking.email],
    ["Location", booking.location],
    ["Format", booking.format],
    ["Selected timezone", booking.timezone],
    ["Primary time", booking.displayTimes.primary],
    ["Other timezone", booking.displayTimes.secondary],
    ["UTC", booking.startsAtUtc],
    ["Locale", booking.locale],
    ["Note", note],
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><th style="text-align:left;padding:8px;border:1px solid #111;">${escapeHtml(
          label,
        )}</th><td style="padding:8px;border:1px solid #111;">${escapeHtml(
          value,
        )}</td></tr>`,
    )
    .join("");

  return {
    subject: `一杯时间新预约 - ${booking.displayTimes.primary}`,
    text,
    html: `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#111;background:#fff;"><h1 style="font-size:20px;">一杯时间新预约</h1><table style="border-collapse:collapse;border:1px solid #111;">${htmlRows}</table></body></html>`,
  };
}
