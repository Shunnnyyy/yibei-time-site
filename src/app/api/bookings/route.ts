import { NextResponse } from "next/server";
import { Resend } from "resend";
import { buildBookingEmail, normalizeBookingPayload } from "../../../lib/booking";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: ["invalid_json"] },
      { status: 400 },
    );
  }

  const result = normalizeBookingPayload(
    typeof payload === "object" && payload !== null
      ? (payload as Record<string, unknown>)
      : {},
  );

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, errors: result.errors },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const to = process.env.BOOKING_TO_EMAIL;

  if (!apiKey || !from || !to) {
    return NextResponse.json(
      { ok: false, errors: ["email_not_configured"] },
      { status: 503 },
    );
  }

  const email = buildBookingEmail(result.booking);
  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from,
    to,
    replyTo: result.booking.email,
    subject: email.subject,
    html: email.html,
    text: email.text,
  });

  if (error) {
    return NextResponse.json(
      { ok: false, errors: ["email_send_failed"], detail: error.message },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    id: data?.id,
    booking: {
      startsAtUtc: result.booking.startsAtUtc,
      displayTimes: result.booking.displayTimes,
    },
  });
}
