// Case cards on /failures (and the three-card strip on the home page).
// Every figure here comes from the linked public source. Do not round up, and do not add adjectives.

export type FailureCase = {
  id: string;
  kicker: string;
  title: string;
  body: string[];
  facts: { label: string; value: string }[];
  sources: { label: string; url: string }[];
  // Short version for the home page strip.
  teaser: string;
  onHome?: boolean;
};

export const failuresPage = {
  eyebrow: "Failures",
  metaTitle: "Failures from the public record",
  metaDescription:
    "Four cases from the public record, then field notes: tank releases and enforcement actions where the record, the test, or the alarm was the problem.",
  title: "Compliance fails in the records room long before it fails in the soil.",
  intro:
    "Four cases from the public record. Then field notes: releases and enforcement actions where the record, the test, or the alarm was the problem.",
  closing: "Don’t have those days.",
} as const;

export const failureCases: FailureCase[] = [
  {
    id: "national",
    kicker: "United States · EPA, mid-year FY2026",
    title: "The national picture: about six in ten facilities pass.",
    body: [
      "EPA counts 534,189 active petroleum underground storage tanks at approximately 190,224 facilities, as of March 2026.",
      "The technical compliance rate — release prevention and release detection together — was 60.9% for April 2025 through March 2026. In the six months from October 2025 through March 2026, states confirmed 1,997 new releases. 52,859 releases were still waiting to be cleaned up.",
      "None of those numbers is about one bad operator. This is what normal looks like.",
    ],
    facts: [
      { label: "Active petroleum USTs", value: "534,189" },
      { label: "Facilities", value: "≈190,224" },
      { label: "Technical compliance rate", value: "60.9%" },
      { label: "Confirmed releases, Oct 2025 – Mar 2026", value: "1,997" },
      { label: "Releases still to be cleaned up", value: "52,859" },
    ],
    sources: [
      { label: "EPA UST Performance Measures", url: "https://www.epa.gov/ust/ust-performance-measures" },
      {
        label: "Semiannual report, mid fiscal year 2026 (PDF)",
        url: "https://www.epa.gov/system/files/documents/2026-06/performance-measures-mid-year-fy-26.pdf",
      },
    ],
    teaser:
      "534,189 active tanks. A 60.9% technical compliance rate. 1,997 confirmed releases in six months. EPA’s own numbers.",
    onHome: true,
  },
  {
    id: "walla-walla",
    kicker: "Walla Walla, Washington · 2023",
    title: "Nearly 2,500 gallons, and alarms the state says did not trigger.",
    body: [
      "A 40-year-old underground tank at a downtown gas station leaked nearly 2,500 gallons of gasoline to groundwater. On September 14, 2023, a hotel and parts of the downtown business district were evacuated. Gasoline and vapors were found in the hotel basement and in two nearby buildings.",
      "The Washington Department of Ecology said leak detection alarms failed to trigger, and that routine inventory checks showed fuel shortages that were not adequately followed up. Testing over about two and a half months did not confirm the release.",
      "Ecology issued a $738,000 penalty and ordered $4.1 million in cost recovery for spill response and pollution mitigation. The owner settled in April 2026.",
    ],
    facts: [
      { label: "Gasoline released", value: "Nearly 2,500 gal" },
      { label: "Tank age", value: "40 years" },
      { label: "Civil penalty", value: "$738,000" },
      { label: "Cost recovery ordered", value: "$4.1 million" },
    ],
    sources: [
      {
        label: "WA Ecology: owner penalized for 2023 leak",
        url: "https://ecology.wa.gov/about-us/who-we-are/news/2025/aug-29-walla-walla-gas-station-owner-penalized",
      },
      {
        label: "WA Ecology: owner settles penalty",
        url: "https://ecology.wa.gov/about-us/who-we-are/news/2026/april-23-walla-walla-gas-station-owner-settles",
      },
    ],
    teaser:
      "Nearly 2,500 gallons to groundwater. A hotel evacuated. The state said alarms failed to trigger and inventory shortages were not followed up.",
    onHome: true,
  },
  {
    id: "charnock",
    kicker: "Santa Monica, California · 1996",
    title: "Leaking tanks took out about half a city’s drinking water.",
    body: [
      "In 1996, Santa Monica learned that two of its drinking-water wellfields, Charnock and Arcadia, were contaminated with MTBE, a gasoline additive. Levels at Charnock ran as high as 610 parts per billion.",
      "The wellfields, representing 50 percent of the city’s drinking water supply, were shut down, and the city began buying replacement water. The city traced the Charnock contamination to leaking underground gasoline storage tanks owned by various oil companies.",
      "EPA and the Los Angeles Regional Water Quality Control Board pursued a joint enforcement action. A settlement was reached in December 2003. EPA calls it the first major water contamination that brought public attention to MTBE.",
    ],
    facts: [
      { label: "MTBE at Charnock, as high as", value: "610 ppb" },
      { label: "Share of city drinking water shut down", value: "50%" },
      { label: "Wells shut down", value: "1996" },
      { label: "Settlement reached", value: "December 2003" },
    ],
    sources: [
      { label: "EPA: MTBE in drinking water (archived)", url: "https://archive.epa.gov/mtbe/web/html/water.html" },
      {
        label: "City of Santa Monica staff report, Nov. 25, 2008",
        url: "https://www.smgov.net/departments/council/agendas/2008/20081125/s2008112508-C.htm",
      },
    ],
    teaser:
      "MTBE from leaking underground gasoline tanks. Two wellfields, 50 percent of the city’s drinking water, shut down in 1996.",
  },
  {
    id: "new-york-pbs",
    kicker: "New York State · 6 NYCRR Part 613",
    title: "New York: the Tuesday problem.",
    body: [
      "Part 613 is specific. Inventory is reconciled at 10-day intervals. Electronic monitoring is checked for connectivity every 30 days, and ATGs, probes, sensors, and line leak detectors are inspected for operability every year. Walkthrough inspections run every 30 days. Tightness test records are kept for three years or until the next test, whichever is later.",
      "Then the rule says where the records have to be. Records must be made available to DEC within three business days of a request — except the last 30 days of leak detection monitoring, which must be immediately available at the time of request.",
      "DEC’s PBS inspection enforcement policy lists the boring failures by name: failure to reconcile every 10 days, tank not tightness tested, no leak detection performed, monitoring records not being maintained on premises. None of those is a spill. Each is a test not done, or a record not there when someone asked.",
    ],
    facts: [
      { label: "Inventory reconciliation", value: "Every 10 days" },
      { label: "Walkthrough inspection", value: "Every 30 days" },
      { label: "Monitoring connectivity check", value: "Every 30 days" },
      { label: "Last 30 days of leak detection records", value: "Available immediately" },
      { label: "Other records, on DEC request", value: "3 business days" },
    ],
    sources: [
      { label: "6 NYCRR Part 613 (NYSDEC, PDF)", url: "https://dec.ny.gov/sites/default/files/2024-01/part613.pdf" },
      {
        label: "NYSDEC PBS recordkeeping guidance",
        url: "https://dec.ny.gov/regulatory/regulations/pbs-recordkeeping-guidance",
      },
      {
        label: "NYSDEC DEE-22 PBS inspection enforcement policy",
        url: "https://dec.ny.gov/regulatory/guidance-and-policy-documents/dee-22-petroleum-bulk-storage-inspection-enforcement-policy-penalty-schedule",
      },
    ],
    teaser:
      "10-day reconciliation. 30-day walkthroughs. The last 30 days of leak detection records, available the moment DEC asks. The rule is about where the record is.",
    onHome: true,
  },
];
