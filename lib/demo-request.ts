export type DemoRequest = {
  name: string;
  email: string;
  company: string;
  role: string;
  sites: string;
  location: string;
  phone: string;
  notes: string;
  referral: string;
};

export const demoFields: {
  name: keyof DemoRequest;
  label: string;
  required?: boolean;
  type?: "text" | "email" | "tel" | "textarea";
  autoComplete?: string;
  inputMode?: "numeric";
  placeholder?: string;
  max: number;
}[] = [
  { name: "name", label: "Name", required: true, autoComplete: "name", max: 120 },
  { name: "email", label: "Work email", required: true, type: "email", autoComplete: "email", max: 200 },
  { name: "company", label: "Company", required: true, autoComplete: "organization", max: 160 },
  { name: "role", label: "Role", autoComplete: "organization-title", max: 120 },
  { name: "sites", label: "Number of sites", required: true, inputMode: "numeric", max: 40 },
  { name: "location", label: "City / State", autoComplete: "address-level2", placeholder: "Albany, NY", max: 120 },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", max: 40 },
  { name: "notes", label: "Notes", type: "textarea", placeholder: "Tanks, ATGs on site, an inspection coming up — whatever helps.", max: 2000 },
  { name: "referral", label: "How did you hear about us?", max: 200 },
];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateDemoRequest(
  input: unknown,
): { ok: true; data: DemoRequest } | { ok: false; errors: Partial<Record<keyof DemoRequest, string>> } {
  const source = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const data = {} as DemoRequest;
  const errors: Partial<Record<keyof DemoRequest, string>> = {};

  for (const field of demoFields) {
    const raw = source[field.name];
    const value = typeof raw === "string" ? raw.trim() : "";
    data[field.name] = value;
    if (field.required && !value) errors[field.name] = `${field.label} is required.`;
    else if (value.length > field.max) errors[field.name] = `${field.label} is too long.`;
  }
  if (data.email && !EMAIL.test(data.email)) errors.email = "Enter a valid email address.";

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}
