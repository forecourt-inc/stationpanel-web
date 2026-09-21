import { existsSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import { demoBlock, productPage } from "@/content/copy";
import { Screenshot } from "./screenshot";

// Drop a recording at public/demo.mp4 and rebuild: the player replaces the poster.
const hasVideo = existsSync(path.join(process.cwd(), "public", "demo.mp4"));

// The line under the poster while there is no recording. Nothing once there is one.
export function DemoNote({ className = "" }: { className?: string }) {
  if (hasVideo) return null;
  return (
    <p className={`text-[0.95rem] text-muted ${className}`}>
      Screen recording coming.{" "}
      <Link href="/request-demo" className="link">
        Request a walkthrough.
      </Link>
    </p>
  );
}

// `note={false}` leaves the caption line out, for pages that set <DemoNote /> somewhere else.
export function DemoVideo({ note = true, preload }: { note?: boolean; preload?: boolean }) {
  if (hasVideo) {
    return (
      <figure>
        <video
          className="w-full rounded-xl border border-line bg-forest-deep shadow-[0_24px_60px_-24px_rgb(15_36_28/0.35)]"
          controls
          playsInline
          preload="none"
          poster="/screenshots/dashboard.png"
          aria-label="Station Panel screen recording"
        >
          <source src="/demo.mp4" type="video/mp4" />
          Your browser cannot play this video. <a href="/demo.mp4">Download the recording</a>.
        </video>
        {note ? <figcaption className="mt-3 text-center text-sm text-muted">{productPage.screenshotCaption}</figcaption> : null}
      </figure>
    );
  }

  return (
    <div>
      <Screenshot shot="dashboard" alt={demoBlock.posterAlt} preload={preload} />
      {note ? <DemoNote className="mt-4 text-center" /> : null}
    </div>
  );
}
