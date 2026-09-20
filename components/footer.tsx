import Link from "next/link";
import { cta, nav, site } from "@/content/copy";
import { Logo } from "./logo";
import { ButtonLink, Container } from "./ui";

export function Footer() {
  return (
    <footer className="bg-forest text-white">
      <Container className="pb-24 pt-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" aria-label="Station Panel home">
              <Logo tone="dark" />
            </Link>
            <p className="mt-4 text-[0.95rem] text-white/70">{site.tagline}.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={cta.demo.href}>{cta.demo.label}</ButtonLink>
              <ButtonLink href={cta.login.href} variant="onDark">
                {cta.login.label}
              </ButtonLink>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 text-[0.95rem] sm:gap-16">
            <nav aria-label="Footer">
              <p className="label text-white/50">Site</p>
              <ul className="mt-4 space-y-2.5 text-white/85">
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
              <p className="label text-white/50">Contact</p>
              <ul className="mt-4 space-y-2.5 text-white/85">
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
          <ul className="flex gap-5">
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
