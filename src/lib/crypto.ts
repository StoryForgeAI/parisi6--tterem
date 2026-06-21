import { randomUUID } from "crypto";

const SECRET = process.env.RESEND_API_KEY || "parisi6-dev-secret-key-change-in-production";

export type ReservationStatus = "pending" | "confirmed" | "rejected";

export interface ReservationData {
  id: string;
  name: string;
  email: string;
  phone: string;
  guests: string;
  date: string;
  time: string;
  notes?: string;
  status: ReservationStatus;
  createdAt: string;
  processedAt?: string;
}

export function generateId(): string {
  return randomUUID();
}

export function createReservationToken(
  reservationId: string,
  action: "confirm" | "reject",
): string {
  const encoder = new TextEncoder();
  const data = `${reservationId}:${action}:${Math.floor(Date.now() / 1000)}`;
  const key = encoder.encode(SECRET);
  const msg = encoder.encode(data);
  return Buffer.from(data).toString("base64url");
}

export function verifyReservationToken(
  token: string,
  expectedAction: "confirm" | "reject",
): { reservationId: string; valid: boolean } {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf-8");
    const parts = decoded.split(":");
    if (parts.length < 2) return { reservationId: "", valid: false };

    const reservationId = parts[0];
    const action = parts[1];

    if (action !== expectedAction) return { reservationId, valid: false };

    const expectedToken = createReservationToken(reservationId, expectedAction);
    if (token !== expectedToken) return { reservationId, valid: false };

    return { reservationId, valid: true };
  } catch {
    return { reservationId: "", valid: false };
  }
}
