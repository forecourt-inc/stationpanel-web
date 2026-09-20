import type { Metadata } from "next";
import { LegalPage } from "@/components/legal";
import { site } from "@/content/copy";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for stationpanel.com. Draft for counsel.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of use" updated="September 20, 2026">
      <section>
        <h2>This website</h2>
        <p>
          These terms cover stationpanel.com, the marketing site operated by {site.legalEntity}, a Delaware
          corporation operating in New York State. Use of the Station Panel product at app.stationpanel.com is
          governed by a separate written agreement between {site.legalEntity} and each customer. If that agreement
          and these terms disagree, the agreement controls.
        </p>
      </section>
      <section>
        <h2>Information, not advice</h2>
        <p>
          This site describes our product and summarizes public reporting about storage-tank failures. It is not
          legal, regulatory, engineering, or environmental advice. Station Panel helps operators organize records,
          testing dates, and alarms. It does not make a site compliant and does not replace the operator’s
          obligations under 6 NYCRR Part 613 or any other law. The automated assistant on this site can be wrong.
        </p>
      </section>
      <section>
        <h2>Third-party sources</h2>
        <p>
          Case summaries and field notes link to public sources we do not control. They are not Station Panel
          customer data. We summarize them in good faith; read the source before relying on any figure.
        </p>
      </section>
      <section>
        <h2>Ownership</h2>
        <p>
          The Station Panel name, leaf mark, screenshots, and site content belong to {site.legalEntity}. Do not reuse
          them without written permission.
        </p>
      </section>
      <section>
        <h2>No warranty; limit of liability</h2>
        <p>
          This site is provided as is. To the extent the law allows, {site.legalEntity} disclaims all warranties for
          this site and is not liable for indirect or consequential damages arising from its use.
        </p>
      </section>
      <section>
        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws of the State of New York, without regard to conflict-of-law rules.
          Courts located in New York State have exclusive jurisdiction. <em>Counsel to confirm choice of law and venue.</em>
        </p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          <a href={`mailto:${site.email}`} className="link">
            {site.email}
          </a>
        </p>
      </section>
    </LegalPage>
  );
}
