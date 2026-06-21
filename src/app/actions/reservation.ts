"use server";

import { Resend } from "resend";
import { siteConfig } from "@/data/site";
import { generateId, createReservationToken } from "@/lib/crypto";
import {
  storeReservation,
  getReservation,
  updateReservationStatus,
  isReservationProcessed,
} from "@/lib/reservation-store";
import {
  createOwnerEmailHtml,
  createGuestConfirmationHtml,
  createGuestRejectionHtml,
} from "@/lib/email";

export type ReservationResult =
  | { success: true; mocked?: boolean }
  | { success: false; error: string };

export async function submitReservation(formData: {
  name: string;
  email: string;
  phone: string;
  guests: string;
  date: string;
  time: string;
  notes?: string;
}): Promise<ReservationResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const reservationEmail = process.env.RESERVATION_EMAIL;

  const reservationId = generateId();

  const formattedDate = new Date(formData.date).toLocaleDateString("hu-HU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const baseUrl = siteConfig.url;

  const confirmToken = createReservationToken(reservationId, "confirm");
  const rejectToken = createReservationToken(reservationId, "reject");

  const confirmUrl = `${baseUrl}/api/reservation/confirm/${confirmToken}`;
  const rejectUrl = `${baseUrl}/api/reservation/reject/${rejectToken}`;

  storeReservation({
    id: reservationId,
    ...formData,
    date: formattedDate,
    status: "pending",
    createdAt: new Date().toISOString(),
  });

  if (!apiKey || !reservationEmail) {
    return { success: true, mocked: true };
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: `Parisi 6 <onboarding@resend.dev>`,
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

    return { success: true };
  } catch (error) {
    console.error("Hiba az e-mail küldésekor:", error);
    return { success: false, error: "Nem sikerült elküldeni a foglalást." };
  }
}

export async function confirmReservation(
  token: string,
): Promise<{ success: boolean; message: string }> {
  const { verifyReservationToken } = await import("@/lib/crypto");
  const { reservationId, valid } = verifyReservationToken(token, "confirm");

  if (!valid || !reservationId) {
    return { success: false, message: "Érvénytelen vagy lejárt hivatkozás." };
  }

  const reservation = getReservation(reservationId);
  if (!reservation) {
    return { success: false, message: "A foglalás nem található." };
  }

  if (isReservationProcessed(reservationId)) {
    return {
      success: true,
      message: `A foglalás már korábban ${reservation.status === "confirmed" ? "visszaigazolásra" : "elutasításra"} került.`,
    };
  }

  updateReservationStatus(reservationId, "confirmed");

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    const resend = new Resend(apiKey);
    try {
      await resend.emails.send({
        from: `Parisi 6 <onboarding@resend.dev>`,
        to: reservation.email,
        subject: "Foglalása visszaigazolva – Parisi 6",
        html: createGuestConfirmationHtml({
          name: reservation.name,
          email: reservation.email,
          phone: reservation.phone,
          guests: reservation.guests,
          date: reservation.date,
          time: reservation.time,
          notes: reservation.notes,
        }),
      });
    } catch (err) {
      console.error("Hiba a vendég e-mail küldésekor:", err);
    }
  }

  return {
    success: true,
    message: `A foglalás sikeresen visszaigazolva ${reservation.name} részére.`,
  };
}

export async function rejectReservation(
  token: string,
): Promise<{ success: boolean; message: string }> {
  const { verifyReservationToken } = await import("@/lib/crypto");
  const { reservationId, valid } = verifyReservationToken(token, "reject");

  if (!valid || !reservationId) {
    return { success: false, message: "Érvénytelen vagy lejárt hivatkozás." };
  }

  const reservation = getReservation(reservationId);
  if (!reservation) {
    return { success: false, message: "A foglalás nem található." };
  }

  if (isReservationProcessed(reservationId)) {
    return {
      success: true,
      message: `A foglalás már korábban ${reservation.status === "confirmed" ? "visszaigazolásra" : "elutasításra"} került.`,
    };
  }

  updateReservationStatus(reservationId, "rejected");

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    const resend = new Resend(apiKey);
    try {
      await resend.emails.send({
        from: `Parisi 6 <onboarding@resend.dev>`,
        to: reservation.email,
        subject: "Foglalásával kapcsolatban – Parisi 6",
        html: createGuestRejectionHtml({
          name: reservation.name,
          email: reservation.email,
          phone: reservation.phone,
          guests: reservation.guests,
          date: reservation.date,
          time: reservation.time,
          notes: reservation.notes,
        }),
      });
    } catch (err) {
      console.error("Hiba a vendég e-mail küldésekor:", err);
    }
  }

  return {
    success: true,
    message: `A foglalás elutasítva. ${reservation.name} értesítve lett e-mailben.`,
  };
}
