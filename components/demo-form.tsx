"use client";

import { useId, useState, type FormEvent } from "react";
import { requestDemoPage, site } from "@/content/copy";
import { demoFields, type DemoRequest } from "@/lib/demo-request";

type Status = "idle" | "sending" | "sent" | "error";
type FieldErrors = Partial<Record<keyof DemoRequest, string>>;

const inputClass =
  "mt-1.5 block w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-base text-ink placeholder:text-muted/70 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/40 aria-[invalid=true]:border-overdue";

export function DemoForm() {
  const formId = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
    setStatus("sending");
    setErrors({});
    setMessage("");

    try {
      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => ({}))) as { error?: string; errors?: FieldErrors };
      if (response.ok) {
        setStatus("sent");
        return;
      }
      setErrors(result.errors ?? {});
      setMessage(result.error ?? "Something went wrong.");
      setStatus("error");
    } catch {
      setMessage(`We could not send that. Please write to ${site.email}.`);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="card p-8 sm:p-10" role="status" aria-live="polite">
        <h2 className="text-2xl font-semibold">Got it.</h2>
        <p className="mt-3 text-lg">{requestDemoPage.confirmation}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card p-6 sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        {demoFields.map((field) => {
          const id = `${formId}-${field.name}`;
          const error = errors[field.name];
          const wide = field.type === "textarea" || field.name === "referral";
          const shared = {
            id,
            name: field.name,
            required: field.required,
            maxLength: field.max,
            placeholder: field.placeholder,
            autoComplete: field.autoComplete,
            "aria-invalid": error ? true : undefined,
            "aria-describedby": error ? `${id}-error` : undefined,
            className: inputClass,
          };
          return (
            <div key={field.name} className={wide ? "sm:col-span-2" : undefined}>
              <label htmlFor={id} className="text-[0.95rem] font-medium">
                {field.label}
                {field.required ? null : <span className="font-normal text-muted"> (optional)</span>}
              </label>
              {field.type === "textarea" ? (
                <textarea {...shared} rows={4} />
              ) : (
                <input {...shared} type={field.type ?? "text"} inputMode={field.inputMode} />
              )}
              {error ? (
                <p id={`${id}-error`} className="mt-1.5 text-sm text-overdue-ink">
                  {error}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Honeypot. Hidden from people and assistive tech; bots fill it in. */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center rounded-lg bg-button px-6 py-3 text-[0.95rem] font-semibold text-forest-deep transition-colors hover:bg-button-hover disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Request a demo"}
        </button>
        <p className="text-sm text-muted">{requestDemoPage.confirmation}</p>
      </div>

      <p role="alert" aria-live="assertive" className="mt-4 text-[0.95rem] text-overdue-ink empty:hidden">
        {status === "error" ? message : ""}
      </p>
    </form>
  );
}
