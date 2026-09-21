import Link from "next/link";
import { cta, nav, site } from "@/content/copy";
import { Logo } from "./logo";
import { Container } from "./ui";

// Phone: every footer link is a 44px row. From 40rem up they tighten to a text list.
const tapRows = "[&_a]:flex [&_a]:min-h-11 [&_a]:items-center sm:[&_a]:inline sm:[&_a]:min-h-0";

export function Footer() {
  return (
    <footer className="bg-forest text-white">
      <Container className="pb-20 pt-14 sm:pb-24">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" aria-label="Station Panel home" className="inline-flex min-h-11 items-center">
              <Logo tone="dark" />
            </Link>
            <p className="mt-4 text-[0.95rem] text-white/70">{site.tagline}.</p>
          </div>

          <div className="grid grid-cols-[auto_auto] justify-start gap-x-10 text-[0.95rem] sm:gap-x-16">
            <nav aria-label="Footer">
              <p className="label text-white/60">Site</p>
              <ul className={`mt-4 text-white/85 sm:space-y-2.5 ${tapRows}`}>
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-sage">
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href={cta.demo.href} className="hover:text-sage">
                    {cta.demo.label}
                  </Link>
                </li>
              </ul>
            </nav>
            <div>
              <p className="label text-white/60">Contact</p>
              <ul className={`mt-4 text-white/85 sm:space-y-2.5 ${tapRows}`}>
                <li>
                  <a href={`mailto:${site.email}`} className="text-sage hover:underline">
                    {site.email}
                  </a>
                </li>
                <li>
                  <a href={cta.login.href} className="hover:text-sage">
                    app.stationpanel.com
                  </a>
                </li>
                <li>
                  <a href="/feed.xml" className="hover:text-sage">
                    Field notes (RSS)
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalEntity} Station Panel is a product of {site.legalEntity}
          </p>
          <ul className={`flex gap-5 ${tapRows}`}>
            <li>
              <Link href="/privacy" className="hover:text-sage">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-sage">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
