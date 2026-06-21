"use server";

import { Resend } from "resend";
import { createReservationEmailHtml } from "@/lib/email";

export async function sendReservationEmail(formData: {
  name: string;
  email: string;
  phone: string;
  guests: string;
  date: string;
  time: string;
  notes?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const reservationEmail = process.env.RESERVATION_EMAIL;

  if (!apiKey || !reservationEmail) {
    console.warn(
      "Hiányzó RESEND_API_KEY vagy RESERVATION_EMAIL környezeti változó.",
    );
    return { success: true, mocked: true };
  }

  const resend = new Resend(apiKey);

  const { date, time } = formData;
  const formattedDate = new Date(date).toLocaleDateString("hu-HU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  try {
    await resend.emails.send({
      from: `Parisi 6 <onboarding@resend.dev>`,
      to: reservationEmail,
      subject: `Új foglalás - ${formData.name} - ${formattedDate} ${time}`,
      html: createReservationEmailHtml({
        ...formData,
        date: formattedDate,
        time,
      }),
    });

    return { success: true };
  } catch (error) {
    console.error("Hiba az e-mail küldésekor:", error);
    throw new Error("Nem sikerült elküldeni a foglalást.");
  }
}
