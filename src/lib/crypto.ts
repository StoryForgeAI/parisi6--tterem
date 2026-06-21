import { randomUUID, createHmac } from "crypto";

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

export interface TokenPayload {
  id: string;
  name: string;
  email: string;
  phone: string;
  guests: string;
  date: string;
  time: string;
  notes?: string;
  action: "confirm" | "reject";
  iat: number;
}

export function generateId(): string {
  return randomUUID();
}

export function createReservationToken(
  data: Omit<TokenPayload, "iat" | "action">,
  action: "confirm" | "reject",
): string {
  const payload: TokenPayload = {
    ...data,
    action,
    iat: Math.floor(Date.now() / 1000),
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", SECRET).update(encoded).digest("base64url");
  return `${encoded}.${signature}`;
}

export function verifyReservationToken(
  token: string,
  expectedAction: "confirm" | "reject",
): { payload: TokenPayload | null; valid: boolean } {
  try {
    const dot = token.lastIndexOf(".");
    if (dot === -1) return { payload: null, valid: false };

    const encoded = token.substring(0, dot);
    const signature = token.substring(dot + 1);

    const expectedSig = createHmac("sha256", SECRET).update(encoded).digest("base64url");
    if (signature !== expectedSig) return { payload: null, valid: false };

    const decoded = JSON.parse(Buffer.from(encoded, "base64url").toString("utf-8")) as TokenPayload;
    if (decoded.action !== expectedAction) return { payload: decoded, valid: false };

    return { payload: decoded, valid: true };
  } catch {
    return { payload: null, valid: false };
  }
}
