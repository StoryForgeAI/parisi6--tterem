import type { ReservationData, ReservationStatus } from "@/lib/crypto";

/*
  FOGLALÁS TÁROLÓ

  Ez a modul az aktív foglalásokat tartja nyilván memóriában.
  
  Production figyelmeztetés:
  - A memória nem osztható meg Vercel serverless függvények között.
  - Többpéldányos környezetben használjon Vercel KV vagy adatbázist.
  - Ez a megoldás kisebb forgalmú éttermek számára elegendő.
*/

const reservations = new Map<string, ReservationData>();

export function storeReservation(data: ReservationData): void {
  reservations.set(data.id, data);
}

export function getReservation(id: string): ReservationData | undefined {
  return reservations.get(id);
}

export function updateReservationStatus(
  id: string,
  status: ReservationStatus,
): ReservationData | undefined {
  const reservation = reservations.get(id);
  if (!reservation) return undefined;
  if (reservation.status !== "pending") return reservation;
  const updated: ReservationData = {
    ...reservation,
    status,
    processedAt: new Date().toISOString(),
  };
  reservations.set(id, updated);
  return updated;
}

export function isReservationProcessed(id: string): boolean {
  const reservation = reservations.get(id);
  if (!reservation) return false;
  return reservation.status !== "pending";
}
