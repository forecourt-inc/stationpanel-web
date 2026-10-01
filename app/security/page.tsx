import type { Metadata } from "next";
import { LegalPage } from "@/components/legal";
import { site } from "@/content/copy";

export const metadata: Metadata = {
  title: "Security",
  description: "How to report a security issue in stationpanel.com or the Station Panel app. Draft for counsel.",
  alternates: { canonical: "/security" },
};

export default function SecurityPage() {
  return (
    <LegalPage title="Reporting a security issue" updated="October 1, 2026">
      <section>
        <h2>Where to write</h2>
        <p>
          If you think you have found a security problem in stationpanel.com or app.stationpanel.com, write to{" "}
          <a href={`mailto:${site.email}?subject=Security`} className="link">
            {site.email}
          </a>{" "}
          with “Security” in the subject. Our contact details for researchers are also at{" "}
          <a href="/.well-known/security.txt" className="link">
            /.well-known/security.txt
          </a>
          .
        </p>
      </section>
      <section>
        <h2>What helps</h2>
        <ul>
          <li>The address or screen where the problem is, and the steps to see it.</li>
          <li>What an attacker could do with it.</li>
          <li>How to reach you if we have questions.</li>
        </ul>
      </section>
      <section>
        <h2>What we ask</h2>
        <ul>
          <li>Do not access, change, or delete data that is not yours. Stop and tell us if you reach any.</li>
          <li>Do not degrade the service for others, and do not use social engineering or physical access.</li>
          <li>Give us a reasonable time to fix the issue before you share it.</li>
        </ul>
        <p>
          We will reply, keep you updated while we work on it, and tell you when it is fixed. We will not pursue
          action against anyone who reports in good faith and follows these requests.{" "}
          <em>Counsel to confirm this safe-harbor language.</em>
        </p>
      </section>
    </LegalPage>
  );
}
