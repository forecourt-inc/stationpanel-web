import type { ReactNode } from "react";
import { Container } from "./ui";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <Container className="py-16 sm:py-24">
      <article className="mx-auto max-w-3xl">
        <p className="inline-block rounded-full border border-warning/60 bg-warning/10 px-3 py-1 text-sm font-semibold text-[#7a5b06]">
          Draft for counsel
        </p>
        <h1 className="mt-5 text-4xl font-semibold">{title}</h1>
        <p className="mt-3 text-muted">Last updated {updated}. This is a working draft and has not been reviewed by counsel.</p>
        <div className="mt-10 space-y-8 [&_h2]:text-xl [&_h2]:font-semibold [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
          {children}
        </div>
      </article>
    </Container>
  );
}
