import type { Metadata } from "next";
import { LegalPage } from "@/components/legal";
import { site } from "@/content/copy";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy notice for stationpanel.com. Draft for counsel.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy notice" updated="September 20, 2026">
      <section>
        <h2>Who we are</h2>
        <p>
          {site.legalEntity} is a Delaware corporation operating in New York State. We make Station Panel. This notice
          covers this website, stationpanel.com. The product at app.stationpanel.com is covered by the agreement
          between {site.legalEntity} and each customer.
        </p>
      </section>
      <section>
        <h2>What we collect here</h2>
        <ul>
          <li>
            What you send us in the demo form: name, email, company, role, number of sites, city and state, phone,
            notes, and how you heard about us.
          </li>
          <li>Questions you type into the “Ask Station Panel” widget.</li>
          <li>Standard server logs, such as IP address, browser, and pages requested.</li>
        </ul>
      </section>
      <section>
        <h2>What we do with it</h2>
        <p>
          We use it to answer you, schedule a demo, price a fleet, and keep the site running. We do not sell it. This
          site is for businesses; it is not directed at consumers or children.
        </p>
      </section>
      <section>
        <h2>Service providers</h2>
        <p>
          We use service providers to host the site and deliver email. If the automated assistant is enabled,
          questions typed into the widget are sent to our AI provider to generate an answer. Do not put confidential
          information in the widget.
        </p>
      </section>
      <section>
        <h2>Keeping and deleting</h2>
        <p>
          We keep demo requests for as long as we are in conversation with you, and for a reasonable period after.
          Ask and we will delete yours.
        </p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          Write to{" "}
          <a href={`mailto:${site.email}`} className="link">
            {site.email}
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
