import { describe, expect, test, vi } from "vitest";
import { POST } from "./route";

describe("POST /api/bookings", () => {
  test("returns validation errors for invalid payload", async () => {
    const response = await POST(
      new Request("http://localhost/api/bookings", {
        method: "POST",
        body: JSON.stringify({
          email: "bad-email",
          location: "fuzhou",
          timezone: "Asia/Shanghai",
          date: "2026-06-15",
          time: "14:00",
          format: "offline",
          note: "",
          locale: "zh",
          company: "",
        }),
      }),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      ok: false,
      errors: expect.arrayContaining(["invalid_email"]),
    });
  });

  test("does not pretend to send email when Resend env is missing", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("RESEND_FROM", "");
    vi.stubEnv("BOOKING_TO_EMAIL", "");

    const response = await POST(
      new Request("http://localhost/api/bookings", {
        method: "POST",
        body: JSON.stringify({
          email: "guest@example.com",
          location: "toronto",
          timezone: "America/Toronto",
          date: "2026-06-15",
          time: "14:00",
          format: "offline",
          note: "Test booking.",
          locale: "en",
          company: "",
        }),
      }),
    );

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toMatchObject({
      ok: false,
      errors: ["email_not_configured"],
    });
  });
});
