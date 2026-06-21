import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const PROCESSED_FILE = join("/tmp", "parisi6-processed-ids.json");

function getProcessedIds(): string[] {
  try {
    if (existsSync(PROCESSED_FILE)) {
      const raw = readFileSync(PROCESSED_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch {
    // ignore
  }
  return [];
}

function saveProcessedIds(ids: string[]): void {
  try {
    const dir = "/tmp";
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    writeFileSync(PROCESSED_FILE, JSON.stringify(ids), "utf-8");
  } catch {
    // /tmp is not available (e.g. local dev without /tmp)
  }
}

export function markProcessed(id: string): void {
  const ids = getProcessedIds();
  if (!ids.includes(id)) {
    ids.push(id);
    saveProcessedIds(ids);
  }
  console.log(`[RESERVATION] Marked processed: ${id}`);
}

export function isReservationProcessed(id: string): boolean {
  const ids = getProcessedIds();
  const processed = ids.includes(id);
  if (processed) console.log(`[RESERVATION] Already processed: ${id}`);
  return processed;
}
