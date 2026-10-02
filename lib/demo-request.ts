import { contactError, detectContact, type ContactKind } from "@/lib/contact";

export const bestTimes = ["Morning", "Midday", "Afternoon", "Any time"] as const;
export const bestDays = ["Weekdays", "Weekends", "Either"] as const;

export type DemoRequest = {
  address: string;
  // "site": a street address. "area": no address yet, so the nearest town or cross streets.
  addressKind: "site" | "area";
  contact: string;
  contactKind: ContactKind;
  time: string;
  days: string;
  name: string;
  company: string;
  sites: string;
  notes: string;
  referral: string;
};

export type DemoErrors = Partial<Record<keyof DemoRequest, string>>;

export const addressLabels = {
  site: { label: "Site address", placeholder: "Street, town, state" },
  area: { label: "Nearest town or cross streets", placeholder: "Town, or the nearest cross streets" },
} as const;

// Step 3. Every one is optional.
export const detailFields: {
  name: "name" | "company" | "sites" | "notes" | "referral";
  label: string;
  type?: "text" | "textarea";
  autoComplete?: string;
  inputMode?: "numeric";
  placeholder?: string;
  max: number;
}[] = [
  { name: "name", label: "Name", autoComplete: "name", max: 120 },
  { name: "company", label: "Company", autoComplete: "organization", max: 160 },
  { name: "sites", label: "Number of sites", inputMode: "numeric", max: 40 },
  { name: "notes", label: "Notes", type: "textarea", placeholder: "Tanks, ATGs on site, an inspection coming up — whatever helps.", max: 2000 },
  { name: "referral", label: "How did you hear about us?", max: 200 },
];

export function addressError(address: string, kind: DemoRequest["addressKind"]): string | null {
  const value = address.trim();
  if (!value) return kind === "site" ? "Enter the site address, or choose “Don’t have one yet”." : "Enter the nearest town or cross streets.";
  if (value.length > 300) return "That is too long.";
  return null;
}

function text(source: Record<string, unknown>, key: string): string {
  const raw = source[key];
  return typeof raw === "string" ? raw.trim() : "";
}

export function validateDemoRequest(input: unknown): { ok: true; data: DemoRequest } | { ok: false; errors: DemoErrors } {
  const source = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const errors: DemoErrors = {};

  const addressKind = text(source, "addressKind") === "area" ? "area" : "site";
  const address = text(source, "address");
  const addressProblem = addressError(address, addressKind);
  if (addressProblem) errors.address = addressProblem;

  const contact = text(source, "contact");
  const contactProblem = contact.length > 200 ? "That is too long." : contactError(contact);
  if (contactProblem) errors.contact = contactProblem;

  const time = text(source, "time");
  const days = text(source, "days");
  if (time && !(bestTimes as readonly string[]).includes(time)) errors.time = "Pick a time from the list.";
  if (days && !(bestDays as readonly string[]).includes(days)) errors.days = "Pick from the list.";

  const details = {} as Pick<DemoRequest, (typeof detailFields)[number]["name"]>;
  for (const field of detailFields) {
    const value = text(source, field.name);
    details[field.name] = value;
    if (value.length > field.max) errors[field.name] = `${field.label} is too long.`;
  }

  if (Object.keys(errors).length) return { ok: false, errors };
  return {
    ok: true,
    data: { address, addressKind, contact, contactKind: detectContact(contact)!, time, days, ...details },
  };
}
