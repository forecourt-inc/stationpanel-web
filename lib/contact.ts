// One field, email or phone. Shared by the contact form, and later the opt-out page and the one-box capture.

export type ContactKind = "email" | "phone";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_CHARS = /^[\d\s().+-]+$/;

export function detectContact(input: string): ContactKind | null {
  const value = input.trim();
  if (value.includes("@")) return EMAIL.test(value) ? "email" : null;
  if (!PHONE_CHARS.test(value)) return null;
  const digits = value.replace(/\D/g, "");
  if (digits.length === 10) return "phone";
  if (digits.length === 11 && digits.startsWith("1")) return "phone";
  return null;
}

export function contactError(input: string): string | null {
  const value = input.trim();
  if (!value) return "Enter an email or a phone number.";
  if (detectContact(value)) return null;
  if (value.includes("@")) return "Check the email address.";
  return "Enter an email, or a 10-digit phone number.";
}
