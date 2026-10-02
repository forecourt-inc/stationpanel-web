"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { contactPage, site } from "@/content/copy";
import { contactError } from "@/lib/contact";
import {
  addressError,
  addressLabels,
  bestDays,
  bestTimes,
  detailFields,
  type DemoErrors,
  type DemoRequest,
} from "@/lib/demo-request";

type Status = "idle" | "sending" | "sent" | "error";
type Step = 1 | 2 | 3;
type Values = Omit<DemoRequest, "addressKind" | "contactKind">;

const empty: Values = {
  address: "",
  contact: "",
  time: "",
  days: "",
  name: "",
  company: "",
  sites: "",
  notes: "",
  referral: "",
};

const inputClass =
  "mt-1.5 block w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-base text-ink placeholder:text-muted focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/40 aria-[invalid=true]:border-overdue";

const primaryButton =
  "inline-flex min-h-11 items-center justify-center rounded-lg bg-button px-6 py-3 text-[0.95rem] font-semibold text-forest-deep transition-colors hover:bg-button-hover disabled:opacity-60";

const secondaryButton =
  "inline-flex min-h-11 items-center justify-center rounded-lg border border-line bg-white px-5 py-3 text-[0.95rem] font-semibold text-ink transition-colors hover:border-sage";

export function DemoForm() {
  const formId = useId();
  const [step, setStep] = useState<Step>(1);
  const [addressKind, setAddressKind] = useState<DemoRequest["addressKind"]>("site");
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<DemoErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState<{ phone: boolean; timed: boolean }>({ phone: false, timed: false });

  const addressRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);
  const detailsRef = useRef<HTMLInputElement>(null);
  const focusOnStep = useRef(false);

  // Move focus to the first field of a step when it opens, not on first render.
  useEffect(() => {
    if (!focusOnStep.current) return;
    focusOnStep.current = false;
    (step === 2 ? contactRef : detailsRef).current?.focus();
  }, [step]);

  const id = (name: string) => `${formId}-${name}`;

  function set(name: keyof Values, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function toggleAddressKind() {
    setAddressKind((kind) => (kind === "site" ? "area" : "site"));
    set("address", "");
    addressRef.current?.focus();
  }

  function next() {
    const problem = addressError(values.address, addressKind);
    if (problem) {
      setErrors((current) => ({ ...current, address: problem }));
      addressRef.current?.focus();
      return;
    }
    focusOnStep.current = true;
    setStep(2);
  }

  function addDetails() {
    focusOnStep.current = true;
    setStep(3);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step === 1) {
      next();
      return;
    }

    const local: DemoErrors = {};
    const addressProblem = addressError(values.address, addressKind);
    const contactProblem = contactError(values.contact);
    if (addressProblem) local.address = addressProblem;
    if (contactProblem) local.contact = contactProblem;
    if (Object.keys(local).length) {
      setErrors(local);
      (local.address ? addressRef : contactRef).current?.focus();
      return;
    }

    const form = new FormData(event.currentTarget);
    const payload = { ...values, addressKind, website: form.get("website") ?? "" };
    setStatus("sending");
    setErrors({});
    setMessage("");

    try {
      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => ({}))) as { error?: string; errors?: DemoErrors };
      if (response.ok) {
        setSent({ phone: !values.contact.includes("@"), timed: Boolean(values.time || values.days) });
        setStatus("sent");
        return;
      }
      const serverErrors = result.errors ?? {};
      setErrors(serverErrors);
      if (detailFields.some((field) => serverErrors[field.name])) setStep(3);
      setMessage(result.error ?? "Something went wrong.");
      setStatus("error");
    } catch {
      setMessage(`We could not send that. Please write to ${site.email}.`);
      setStatus("error");
    }
  }

  if (status === "sent") {
    const confirmation = !sent.phone
      ? contactPage.confirmation
      : sent.timed
        ? contactPage.confirmationPhoneTimed
        : contactPage.confirmationPhone;
    return (
      <div className="card self-start p-8 sm:p-10" role="status" aria-live="polite">
        <h2 className="type-card">Got it.</h2>
        <p className="mt-3 text-lg">{confirmation}</p>
      </div>
    );
  }

  const address = addressLabels[addressKind];

  return (
    <form onSubmit={onSubmit} noValidate className="card self-start p-6 sm:p-9">
      <Step number={1} title={contactPage.steps.where}>
        <label htmlFor={id("address")} className="text-[0.95rem] font-medium">
          {address.label}
        </label>
        <input
          ref={addressRef}
          id={id("address")}
          name="address"
          value={values.address}
          onChange={(event) => set("address", event.target.value)}
          maxLength={300}
          placeholder={address.placeholder}
          autoComplete={addressKind === "site" ? "street-address" : "off"}
          aria-invalid={errors.address ? true : undefined}
          aria-describedby={errors.address ? `${id("address")}-error` : undefined}
          className={`${inputClass} py-3.5 text-lg`}
        />
        <FieldError id={`${id("address")}-error`} error={errors.address} />
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button type="button" onClick={toggleAddressKind} className="link min-h-11 text-[0.95rem]">
            {addressKind === "site" ? contactPage.noAddress : contactPage.haveAddress}
          </button>
        </div>
        {step === 1 ? (
          <div className="mt-6">
            <button type="button" onClick={next} className={primaryButton}>
              {contactPage.next}
            </button>
          </div>
        ) : null}
      </Step>

      {step >= 2 ? (
        <Step number={2} title={contactPage.steps.reach}>
          <label htmlFor={id("contact")} className="text-[0.95rem] font-medium">
            {contactPage.contactLabel}
          </label>
          <input
            ref={contactRef}
            id={id("contact")}
            name="contact"
            value={values.contact}
            onChange={(event) => set("contact", event.target.value)}
            maxLength={200}
            autoComplete="email"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            aria-invalid={errors.contact ? true : undefined}
            aria-describedby={`${errors.contact ? `${id("contact")}-error ` : ""}${id("contact")}-consent`}
            className={inputClass}
          />
          <FieldError id={`${id("contact")}-error`} error={errors.contact} />
          <p id={`${id("contact")}-consent`} className="mt-2 text-sm text-muted">
            {contactPage.consent}
          </p>
          <div className="mt-6 space-y-5">
            <Chips
              name="time"
              label={contactPage.timeLabel}
              options={bestTimes}
              value={values.time}
              onChange={(value) => set("time", value)}
            />
            <Chips
              name="days"
              label={contactPage.daysLabel}
              options={bestDays}
              value={values.days}
              onChange={(value) => set("days", value)}
            />
          </div>
        </Step>
      ) : null}

      {step === 3 ? (
        <Step number={3} title={contactPage.steps.details} optional>
          <div className="grid gap-5 sm:grid-cols-2">
            {detailFields.map((field, index) => {
              const fieldId = id(field.name);
              const error = errors[field.name];
              const wide = field.type === "textarea" || field.name === "referral";
              const shared = {
                id: fieldId,
                name: field.name,
                value: values[field.name],
                maxLength: field.max,
                placeholder: field.placeholder,
                autoComplete: field.autoComplete,
                "aria-invalid": error ? true : undefined,
                "aria-describedby": error ? `${fieldId}-error` : undefined,
                className: inputClass,
              };
              return (
                <div key={field.name} className={wide ? "sm:col-span-2" : undefined}>
                  <label htmlFor={fieldId} className="text-[0.95rem] font-medium">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea {...shared} rows={4} onChange={(event) => set(field.name, event.target.value)} />
                  ) : (
                    <input
                      {...shared}
                      ref={index === 0 ? detailsRef : undefined}
                      type="text"
                      inputMode={field.inputMode}
                      onChange={(event) => set(field.name, event.target.value)}
                    />
                  )}
                  <FieldError id={`${fieldId}-error`} error={error} />
                </div>
              );
            })}
          </div>
        </Step>
      ) : null}

      {/* Honeypot. Hidden from people and assistive tech; bots fill it in. */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {step >= 2 ? (
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="submit" disabled={status === "sending"} className={primaryButton}>
            {status === "sending" ? "Sending…" : "Send"}
          </button>
          {step === 2 ? (
            <button type="button" onClick={addDetails} className={secondaryButton}>
              {contactPage.addDetails}
              <span className="ml-1 font-normal text-muted">(optional)</span>
            </button>
          ) : null}
        </div>
      ) : null}

      <p role="alert" aria-live="assertive" className="mt-4 text-[0.95rem] text-overdue-ink empty:hidden">
        {status === "error" ? message : ""}
      </p>
    </form>
  );
}

function Step({
  number,
  title,
  optional,
  children,
}: {
  number: number;
  title: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <fieldset className="border-t border-line pt-6 first:border-t-0 first:pt-0 [&+fieldset]:mt-8">
      <legend className="float-left mb-4 w-full">
        <span className="font-mono text-sm text-clear" aria-hidden="true">
          {number}
        </span>
        <span className="type-item ml-3">{title}</span>
        {optional ? <span className="ml-1 text-[0.95rem] text-muted">(optional)</span> : null}
      </legend>
      <div className="clear-left">{children}</div>
    </fieldset>
  );
}

function Chips({
  name,
  label,
  options,
  value,
  onChange,
}: {
  name: string;
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-[0.95rem] font-medium">
        {label}
        <span className="font-normal text-muted"> (optional)</span>
      </legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => (
          <label
            key={option}
            className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-line bg-white px-4 text-[0.95rem] transition-colors hover:border-sage has-[:checked]:border-forest has-[:checked]:bg-forest has-[:checked]:text-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-sage has-[:focus-visible]:ring-offset-2"
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              className="sr-only"
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-overdue-ink">
      {error}
    </p>
  );
}
