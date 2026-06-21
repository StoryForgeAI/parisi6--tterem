"use server";

import { siteConfig } from "@/data/site";
import { generateId, createReservationToken, verifyReservationToken } from "@/lib/crypto";
import { markProcessed, isReservationProcessed } from "@/lib/reservation-store";
import { sendEmail, getActiveProviderInfo } from "@/lib/email-service";
import {
  createOwnerEmailHtml,
  createGuestConfirmationHtml,
  createGuestRejectionHtml,
} from "@/lib/email";

export type ReservationResult =
  | { success: true; mocked?: boolean }
  | { success: false; error: string };

type ActionResult =
  | { success: true; message: string }
  | { success: false; message: string };

export async function submitReservation(formData: {
  name: string;
  email: string;
  phone: string;
  guests: string;
  date: string;
  time: string;
  notes?: string;
}): Promise<ReservationResult> {
  const reservationEmail = process.env.RESERVATION_EMAIL;

  const reservationId = generateId();
  console.log(`[RESERVATION] Created: ${reservationId} for ${formData.name}`);

  const formattedDate = new Date(formData.date).toLocaleDateString("hu-HU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const baseUrl = siteConfig.url;
  console.log(`[RESERVATION] Base URL: ${baseUrl}`);

  const tokenData = {
    id: reservationId,
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    guests: formData.guests,
    date: formattedDate,
    time: formData.time,
    notes: formData.notes,
  };

  const confirmToken = createReservationToken(tokenData, "confirm");
  const rejectToken = createReservationToken(tokenData, "reject");
  console.log(`[RESERVATION] Tokens generated for ${reservationId}`);

  const confirmUrl = `${baseUrl}/api/reservation/confirm/${confirmToken}`;
  const rejectUrl = `${baseUrl}/api/reservation/reject/${rejectToken}`;
  console.log(`[RESERVATION] Confirm URL: ${confirmUrl.substring(0, 80)}...`);
  console.log(`[RESERVATION] Reject URL: ${rejectUrl.substring(0, 80)}...`);

  const { provider, label } = getActiveProviderInfo();
  console.log(`[RESERVATION] Email provider: ${label}`);

  if (provider === "mock") {
    console.log(`[RESERVATION] No email provider configured — mock mode`);
    return { success: true, mocked: true };
  }

  if (!reservationEmail) {
    console.log(`[RESERVATION] RESERVATION_EMAIL not set — mock mode`);
    return { success: true, mocked: true };
  }

  const emailResult = await sendEmail({
    to: reservationEmail,
    subject: `Új foglalás - ${formData.name} - ${formattedDate} ${formData.time}`,
    html: createOwnerEmailHtml({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      guests: formData.guests,
      date: formattedDate,
      time: formData.time,
      notes: formData.notes,
      confirmUrl,
      rejectUrl,
    }),
  });

  if (!emailResult.success) {
    console.error(`[RESERVATION] Owner email failed: ${emailResult.error}`);
    return {
      success: false,
      error: `Nem sikerült elküldeni a foglalást: ${emailResult.error}`,
    };
  }

  return { success: true };
}

export async function confirmReservation(
  token: string,
): Promise<ActionResult> {
  console.log(`[RESERVATION] Confirm clicked — token length: ${token.length}`);

  const { payload, valid } = verifyReservationToken(token, "confirm");
  if (!valid || !payload) {
    console.log(`[RESERVATION] Token invalid for confirm action`);
    return { success: false, message: "Érvénytelen vagy lejárt hivatkozás." };
  }

  console.log(`[RESERVATION] Token valid — reservation: ${payload.id}, guest: ${payload.name}`);

  if (isReservationProcessed(payload.id)) {
    console.log(`[RESERVATION] Already processed: ${payload.id}`);
    return {
      success: true,
      message: "Ez a foglalás már feldolgozásra került.",
    };
  }

  const { provider } = getActiveProviderInfo();
  if (provider !== "mock") {
    const emailResult = await sendEmail({
      to: payload.email,
      subject: "Foglalása visszaigazolva – Parisi 6",
      html: createGuestConfirmationHtml({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        guests: payload.guests,
        date: payload.date,
        time: payload.time,
        notes: payload.notes,
      }),
    });

    if (!emailResult.success) {
      console.error(`[RESERVATION] Guest confirmation email failed: ${emailResult.error}`);
    }
  } else {
    console.log(`[RESERVATION] Mock mode — guest confirmation email skipped`);
  }

  markProcessed(payload.id);

  return {
    success: true,
    message: "A vendég automatikusan értesítést kapott e-mailben.",
  };
}

export async function rejectReservation(
  token: string,
): Promise<ActionResult> {
  console.log(`[RESERVATION] Reject clicked — token length: ${token.length}`);

  const { payload, valid } = verifyReservationToken(token, "reject");
  if (!valid || !payload) {
    console.log(`[RESERVATION] Token invalid for reject action`);
    return { success: false, message: "Érvénytelen vagy lejárt hivatkozás." };
  }

  console.log(`[RESERVATION] Token valid — reservation: ${payload.id}, guest: ${payload.name}`);

  if (isReservationProcessed(payload.id)) {
    console.log(`[RESERVATION] Already processed: ${payload.id}`);
    return {
      success: true,
      message: "Ez a foglalás már feldolgozásra került.",
    };
  }

  const { provider } = getActiveProviderInfo();
  if (provider !== "mock") {
    const emailResult = await sendEmail({
      to: payload.email,
      subject: "Foglalásával kapcsolatban – Parisi 6",
      html: createGuestRejectionHtml({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        guests: payload.guests,
        date: payload.date,
        time: payload.time,
        notes: payload.notes,
      }),
    });

    if (!emailResult.success) {
      console.error(`[RESERVATION] Guest rejection email failed: ${emailResult.error}`);
    }
  } else {
    console.log(`[RESERVATION] Mock mode — guest rejection email skipped`);
  }

  markProcessed(payload.id);

  return {
    success: true,
    message: "A vendég automatikusan értesítést kapott e-mailben.",
  };
}
