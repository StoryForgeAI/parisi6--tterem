import nodemailer from "nodemailer";
import { Resend } from "resend";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

function loadLocalEnv(): void {
  const path = join(process.cwd(), "local-settings.json");
  if (existsSync(path)) {
    try {
      const raw = readFileSync(path, "utf-8");
      const parsed = JSON.parse(raw);
      let count = 0;
      for (const [key, value] of Object.entries(parsed)) {
        if (typeof value === "string" && value.length > 0 && !process.env[key]) {
          process.env[key] = value;
          count++;
        }
      }
      if (count > 0) {
        console.log(`[EMAIL] Loaded ${count} env vars from local-settings.json`);
      }
    } catch {
      // local-settings.json is optional
    }
  }
}

loadLocalEnv();

export type EmailProvider = "smtp" | "resend" | "mock";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

interface EmailResult {
  success: boolean;
  provider: EmailProvider;
  error?: string;
}

interface ParsedFrom {
  name: string;
  address: string;
}

function parseFromAddress(raw: string): ParsedFrom {
  const match = raw.match(/^(?:"([^"]*)"\s*)?(?:([^<"]*)\s*)?<([^>]+)>$/);
  if (match) {
    const name = (match[1] || match[2] || "Parisi 6").trim();
    return { name, address: match[3].trim() };
  }
  if (raw.includes("@")) {
    return { name: "Parisi 6", address: raw.trim() };
  }
  return { name: "Parisi 6", address: raw.trim() || "noreply@parisi6.com" };
}

function getSmtpFrom(): ParsedFrom {
  return parseFromAddress(process.env.SMTP_FROM || "");
}

function getResendFrom(): string {
  const raw = process.env.SMTP_FROM || "";
  if (raw) {
    const parsed = parseFromAddress(raw);
    return `${parsed.name} <${parsed.address}>`;
  }
  return "Parisi 6 <noreply@parisi6.com>";
}

export function resolveProvider(): EmailProvider {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
    return "smtp";
  }
  if (process.env.RESEND_API_KEY) {
    return "resend";
  }
  return "mock";
}

function validateSmtpConfig(): string | null {
  const required = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASSWORD", "SMTP_FROM"];
  for (const key of required) {
    if (!process.env[key]) {
      return `Hiányzó környezeti változó: ${key}`;
    }
  }
  return null;
}

function validateResendConfig(): string | null {
  if (!process.env.RESEND_API_KEY) {
    return "Hiányzó környezeti változó: RESEND_API_KEY";
  }
  return null;
}

async function sendViaSmtp(options: EmailOptions): Promise<EmailResult> {
  const validationError = validateSmtpConfig();
  if (validationError) {
    console.error(`[EMAIL SMTP] ${validationError}`);
    return { success: false, provider: "smtp", error: validationError };
  }

  const from = getSmtpFrom();
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const secure = port === 465;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"${from.name}" <${from.address}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });

    console.log(`[EMAIL SMTP] Sent successfully:`, {
      messageId: info.messageId,
      from: `"${from.name}" <${from.address}>`,
      to: options.to,
      subject: options.subject,
    });

    return { success: true, provider: "smtp" };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[EMAIL SMTP] Send failed:`, {
      error: message,
      from: `"${from.name}" <${from.address}>`,
      to: options.to,
      subject: options.subject,
    });
    return { success: false, provider: "smtp", error: message };
  }
}

async function sendViaResend(options: EmailOptions): Promise<EmailResult> {
  const validationError = validateResendConfig();
  if (validationError) {
    console.error(`[EMAIL RESEND] ${validationError}`);
    return { success: false, provider: "resend", error: validationError };
  }

  const resend = new Resend(process.env.RESEND_API_KEY!);
  const from = getResendFrom();

  try {
    const result = await resend.emails.send({
      from,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });

    console.log(`[EMAIL RESEND] Sent successfully:`, {
      from,
      to: options.to,
      subject: options.subject,
      result,
    });

    return { success: true, provider: "resend" };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[EMAIL RESEND] Send failed:`, {
      error: message,
      from,
      to: options.to,
      subject: options.subject,
    });
    return { success: false, provider: "resend", error: message };
  }
}

async function sendViaMock(options: EmailOptions): Promise<EmailResult> {
  console.log(`[EMAIL MOCK] ====== MOCK EMAIL ======`);
  console.log(`[EMAIL MOCK] To: ${options.to}`);
  console.log(`[EMAIL MOCK] Subject: ${options.subject}`);
  console.log(`[EMAIL MOCK] Body length: ${options.html.length} chars`);
  console.log(`[EMAIL MOCK] ====== END MOCK ======`);
  return { success: true, provider: "mock" };
}

export function getActiveProviderInfo(): { provider: EmailProvider; label: string } {
  const provider = resolveProvider();
  const labels: Record<EmailProvider, string> = {
    smtp: `SMTP (${process.env.SMTP_HOST || "?"})`,
    resend: "Resend",
    mock: "Mock (nincs email konfiguráció)",
  };
  console.log(`[EMAIL] Active provider: ${labels[provider]}`);
  return { provider, label: labels[provider] };
}

export async function sendEmail(options: EmailOptions): Promise<EmailResult> {
  const provider = resolveProvider();
  console.log(`[EMAIL] Provider: ${provider} — sending to ${options.to}`);

  switch (provider) {
    case "smtp":
      return sendViaSmtp(options);
    case "resend":
      return sendViaResend(options);
    case "mock":
    default:
      return sendViaMock(options);
  }
}
