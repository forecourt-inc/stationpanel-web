// Field notes on /failures and in /feed.xml.
// Public reporting only. Summaries say only what the linked source says. See README: "Add a field note".

export type FieldNote = {
  id: string; // unique; anchor on /failures and guid in /feed.xml
  date: string; // ISO date of the public report
  place: string;
  headline: string;
  summary: string; // 2–3 sentences, only what the source says
  impact: string;
  sourceName: string;
  sourceUrl: string;
};

export const fieldNotesLabel = "Public reports, curated. Not Station Panel customer data.";

export const fieldNotes: FieldNote[] = [
  {
    id: "2026-06-mcgregor-mn-atg-broken",
    date: "2026-06-11",
    place: "McGregor, Minnesota",
    headline: "State fines a gas station owner; the tank gauge had been broken since 2022",
    summary:
      "The Minnesota Pollution Control Agency fined the owner of an Aitkin County gas station for improperly maintaining and operating its underground gasoline tanks. An October 2024 inspection found multiple violations, including failure to test the tank systems that prevent leaks and corrosion. The automatic tank gauge used for leak detection tests had been broken since 2022.",
    impact: "$25,000 fine. The owner must repair the equipment and plan for monitoring and inspections.",
    sourceName: "Minnesota Pollution Control Agency",
    sourceUrl:
      "https://www.pca.state.mn.us/news-and-stories/mpca-issues-25000-fine-for-violations-at-aitkin-county-gas-station",
  },
  {
    id: "2026-06-east-taunton-ma-unreported-release",
    date: "2026-06-10",
    place: "East Taunton, Massachusetts",
    headline: "Attorney General’s suit alleges an unreported 31,000-gallon gasoline release",
    summary:
      "The Massachusetts Attorney General’s office alleges that more than 31,000 gallons of gasoline leaked from a gas station between April and August 2023 and was not reported to the state. The complaint cites warning signs: persistent gasoline odors, repeated fuel alarms, inventory discrepancies, and gasoline and water in equipment that should stay dry. These are allegations in a filed complaint, not findings.",
    impact: "More than 31,000 gallons alleged. Vapors detected at nearby residential properties.",
    sourceName: "WJAR / NBC 10",
    sourceUrl:
      "https://turnto10.com/news/local/massachusetts-attorney-general-alleges-31000-gallons-gasoline-leaked-from-east-taunton-gas-station-amaros-market-two-brothers-realty-trust-dependable-service-company-june-10-2026",
  },
  {
    id: "2026-05-kent-wa-repeat-violations",
    date: "2026-05-15",
    place: "Kent, Washington",
    headline: "Owner of two gas stations penalized for repeated tank violations",
    summary:
      "The Washington Department of Ecology issued two penalties to the owner of two Kent gas stations for repeated underground storage tank violations. They included failing to document safety testing and training, and failing to comply with overfill prevention requirements. Ecology said it had provided education and guidance for more than two decades. The penalties can be appealed.",
    impact: "More than $42,000 across two penalties. Two stations.",
    sourceName: "Washington Department of Ecology",
    sourceUrl: "https://ecology.wa.gov/about-us/who-we-are/news/2026/ustkentpenalty",
  },
  {
    id: "2026-01-brattleboro-vt-documentation",
    date: "2026-01-26",
    place: "Brattleboro, Vermont",
    headline: "Station operator fined after inspection finds incomplete monitoring documentation",
    summary:
      "A Brattleboro gas station operator agreed to a fine after an August 2024 routine inspection found multiple deficiencies. They included an undersized spill bucket, liquid in interstitial spaces designed to stay dry, failure to report suspected releases, and incomplete monitoring and inspection documentation.",
    impact: "$8,250 fine.",
    sourceName: "Vermont Agency of Natural Resources",
    sourceUrl: "https://anr.vermont.gov/news/brattleboro-gas-station-fined-violations-underground-storage-tank-rules",
  },
  {
    id: "2023-10-new-york-11-facilities",
    date: "2023-10-30",
    place: "New York State",
    headline: "EPA settles tank violations with three companies running 11 New York fuel facilities",
    summary:
      "EPA found three companies that own and operate gasoline and diesel tanks at 11 facilities across New York State in violation of federal rules. The rules covered financial responsibility, leak detection, spill prevention, and tank inspection requirements. The violations ran from November 2017 to April 2019. The companies agreed to pay a penalty and certify compliance.",
    impact: "$150,000 penalty. 11 facilities.",
    sourceName: "U.S. EPA",
    sourceUrl:
      "https://www.epa.gov/newsreleases/underground-petroleum-storage-tank-violations-result-fines-several-businesses-new",
  },
  {
    id: "2023-10-new-jersey-13-stations",
    date: "2023-10-30",
    place: "New Jersey",
    headline: "Operators of 13 gas stations settle over leak detection, inspection, and recordkeeping",
    summary:
      "Two companies that operate 13 gas stations in New Jersey settled with EPA. EPA said they had failed to comply with spill prevention, leak detection, inspection, and record keeping requirements for underground storage tanks between 2018 and 2020. They agreed to pay a penalty and certify compliance.",
    impact: "$175,000 penalty. 13 stations.",
    sourceName: "U.S. EPA",
    sourceUrl:
      "https://www.epa.gov/newsreleases/underground-petroleum-storage-tank-violations-result-fines-several-businesses-new",
  },
  {
    id: "2023-03-northern-california-14-stations",
    date: "2023-03-06",
    place: "Northern California",
    headline: "Five gas station owners settle over 107 alleged violations at 14 stations",
    summary:
      "The California Attorney General alleged 107 violations at 14 stations in five counties. The allegations included failure to install or maintain leak monitoring and detection systems, failure to continuously monitor and test tanks, and failure to notify agencies of releases. The settlement requires an environmental compliance coordinator and annual reporting.",
    impact: "$1.7 million in civil penalties. 14 stations.",
    sourceName: "California Attorney General",
    sourceUrl:
      "https://www.oag.ca.gov/news/press-releases/attorney-general-bonta-announces-17-million-settlement-five-gas-station-owners",
  },
  {
    id: "2022-10-kokomo-in-gauge-flagged-leak",
    date: "2022-10-25",
    place: "Kokomo, Indiana",
    headline: "Records show a station’s tank gauge flagged a leak for more than a month before the state was notified",
    summary:
      "The Kokomo Tribune reported that the tank gauge at a Kokomo gas station showed a leak rate on August 15, followed by several failed tests with an increasing leak rate through September 19. The leak was reported to the state on September 23–24; Indiana requires reporting within 24 hours. Gas vapor was found in storm sewer lines and three residences.",
    impact: "Three homes affected. One mandatory evacuation. A road temporarily closed.",
    sourceName: "Kokomo Tribune, via Yahoo",
    sourceUrl: "https://finance.yahoo.com/news/report-gas-station-had-leaky-222300471.html",
  },
  {
    id: "2022-09-california-safeway-71-stations",
    date: "2022-09-16",
    place: "California",
    headline: "Safeway settles over alleged tank monitoring and leak detection violations at 71 fuel stations",
    summary:
      "The California Attorney General and five district attorneys alleged that, since at least March 2015, Safeway failed to install or maintain automatic line leak detectors, maintain monitoring systems capable of detecting leaks, continuously monitor and test its tank systems, and properly notify agencies of releases. The settlement terms include a compliance manager, improved spill and alarm monitoring, training, and annual compliance reports.",
    impact: "$8 million settlement. 71 stations.",
    sourceName: "California Attorney General",
    sourceUrl:
      "https://oag.ca.gov/news/press-releases/attorney-general-bonta-and-five-district-attorneys-announce-8-million-settlement",
  },
  {
    id: "2022-03-new-york-new-jersey-13-stations",
    date: "2022-03-31",
    place: "New York and New Jersey",
    headline: "Federal tank case covering 13 gas stations settles for $250,000",
    summary:
      "A federal complaint in the Eastern District of New York alleged failures to comply with underground storage tank regulations at 13 facilities in New York and New Jersey. The allegations included failing to provide release detection, failing to test automatic line leak detectors, failing to report suspected releases, and failing to maintain and timely provide records of release detection monitoring. The consent judgment requires the 21 defendants to maintain compliance at 29 facilities.",
    impact: "$250,000 civil penalty. 13 facilities in the complaint; 29 covered by the judgment.",
    sourceName: "Federal Register",
    sourceUrl: "https://www.govinfo.gov/content/pkg/FR-2022-03-31/html/2022-06791.htm",
  },
  {
    id: "2021-07-virginia-missed-testing",
    date: "2021-07-22",
    place: "Verona and Weyers Cave, Virginia",
    headline: "EPA fines a station owner for missed tank, line, and leak detector testing",
    summary:
      "EPA cited the owner of two Virginia fuel stations. At the Verona station, the violations were failure to have adequate spill prevention equipment and failure to conduct proper testing of the tanks, transmission lines, and leak detectors. At Weyers Cave, two tanks had inadequate spill prevention devices. The company cooperated and certified compliance before settlement.",
    impact: "$27,483 in penalties. Two stations.",
    sourceName: "U.S. EPA",
    sourceUrl:
      "https://www.epa.gov/newsreleases/epa-fines-pm-properties-violations-related-underground-storage-tanks-northern-virginia",
  },
  {
    id: "2017-05-albany-ny-centralized-monitoring",
    date: "2017-05-04",
    place: "Albany area, New York",
    headline: "Settlement requires centralized leak detection monitoring at 26 stations",
    summary:
      "EPA said a fuel company and two affiliates failed to comply with federal underground storage tank requirements at eight Albany-area stations. The settlement requires tanks at all 26 of their stations — 23 of them in New York — to be connected to a centralized monitoring system that collects leak detection data electronically, operated for at least five years.",
    impact:
      "$60,000 civil penalty. More than $200,000 in leak detection upgrades and more than $225,000 for centralized monitoring.",
    sourceName: "U.S. EPA (archived)",
    sourceUrl:
      "https://www.epa.gov/archive/epa/newsreleases/improved-leak-detection-technology-and-centralized-monitoring-be-deployed-23-albany-ny.html",
  },
];
