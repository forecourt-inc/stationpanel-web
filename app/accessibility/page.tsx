import type { Metadata } from "next";
import { LegalPage } from "@/components/legal";
import { site } from "@/content/copy";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Accessibility statement for stationpanel.com. Draft for counsel.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <LegalPage title="Accessibility statement" updated="October 1, 2026">
      <section>
        <h2>Our goal</h2>
        <p>
          We want stationpanel.com to work for everyone who runs a fuel site, including people who use a screen reader,
          a keyboard, or larger text. We aim for the Web Content Accessibility Guidelines (WCAG) 2.2, level AA.
        </p>
      </section>
      <section>
        <h2>What we have done</h2>
        <ul>
          <li>Body text meets a contrast ratio of at least 4.5:1 against its background.</li>
          <li>On phones, the menu, footer links, and main buttons are at least 44 pixels tall.</li>
          <li>A “Skip to content” link is the first thing a keyboard reaches on every page.</li>
          <li>Product screenshots carry text descriptions of what they show.</li>
          <li>No audio or video plays on its own.</li>
        </ul>
      </section>
      <section>
        <h2>What we know is not finished</h2>
        <p>
          We have not yet had the site audited by an outside reviewer, and the automated assistant panel has not had a
          full screen-reader test. This statement covers stationpanel.com; the app at app.stationpanel.com is covered
          separately.
        </p>
      </section>
      <section>
        <h2>Tell us about a problem</h2>
        <p>
          If something on this site does not work for you, write to{" "}
          <a href={`mailto:${site.email}?subject=Accessibility`} className="link">
            {site.email}
          </a>{" "}
          with the page and what happened. We will reply and get you the information another way while we fix it.
        </p>
      </section>
    </LegalPage>
  );
}
