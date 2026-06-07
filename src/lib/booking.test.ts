import { describe, expect, test } from "vitest";
import {
  buildBookingEmail,
  normalizeBookingPayload,
  validateBookingPayload,
} from "./booking";

describe("booking validation", () => {
  test("accepts a Toronto online video booking and converts to Fuzhou time", () => {
    const payload = {
      email: "guest@example.com",
      location: "online",
      timezone: "America/Toronto",
      date: "2026-06-15",
      time: "15:30",
      format: "online_video",
      note: "I want to talk about summer plans.",
      locale: "zh",
      company: "",
    };

    const result = normalizeBookingPayload(payload);

    expect(result.ok).toBe(true);
    if (!result.ok) {
      throw new Error("Expected valid booking");
    }
    expect(result.booking.startsAtUtc).toBe("2026-06-15T19:30:00.000Z");
    expect(result.booking.displayTimes.primary).toContain("Toronto");
    expect(result.booking.displayTimes.secondary).toContain("福州");
    expect(result.booking.displayTimes.secondary).toContain("2026-06-16");
  });

  test("rejects invalid email and non-empty honeypot", () => {
    const invalid = validateBookingPayload({
      email: "not-an-email",
      location: "fuzhou",
      timezone: "Asia/Shanghai",
      date: "2026-06-15",
      time: "15:30",
      format: "offline_text",
      note: "",
      locale: "zh",
      company: "bot text",
    });

    expect(invalid.ok).toBe(false);
    if (invalid.ok) {
      throw new Error("Expected invalid booking");
    }
    expect(invalid.errors).toEqual(
      expect.arrayContaining(["invalid_email", "spam_detected"]),
    );
  });
});

describe("booking email", () => {
  test("includes booking details without leaking secrets", () => {
    const result = normalizeBookingPayload({
      email: "guest@example.com",
      location: "fuzhou",
      timezone: "Asia/Shanghai",
      date: "2026-06-15",
      time: "15:30",
      format: "offline_audio",
      note: "I prefer audio only.",
      locale: "en",
      company: "",
    });

    expect(result.ok).toBe(true);
    if (!result.ok) {
      throw new Error("Expected valid booking");
    }

    const email = buildBookingEmail(result.booking);
    expect(email.subject).toContain("一杯时间");
    expect(email.text).toContain("guest@example.com");
    expect(email.text).toContain("offline_audio");
    expect(email.text).toContain("Asia/Shanghai");
    expect(email.html).toContain("I prefer audio only.");
    expect(email.html).not.toContain("RESEND_API_KEY");
  });
});
