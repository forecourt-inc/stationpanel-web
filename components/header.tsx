import Link from "next/link";
import { cta, nav } from "@/content/copy";
import { Logo } from "./logo";
import { Container } from "./ui";

export function Header() {
  return (
    <>
      <header className="sticky top-0 z-40 bg-forest/95 text-white backdrop-blur md:border-b md:border-white/10">
        <Container className="flex h-16 items-center justify-between gap-2 sm:gap-4">
          <Link href="/" aria-label="Station Panel home" className="flex min-h-11 shrink-0 items-center">
            <Logo tone="dark" size={30} />
          </Link>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-7 text-[0.95rem] text-white/85">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-sage">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1 sm:gap-3">
            <a
              href={cta.login.href}
              className="inline-flex min-h-11 items-center whitespace-nowrap rounded-lg px-2 text-[0.875rem] font-medium text-white/90 transition-colors hover:text-sage sm:px-3 sm:text-[0.95rem] md:min-h-0 md:py-2"
            >
              {cta.login.label}
            </a>
            <Link
              href={cta.demo.href}
              className="inline-flex min-h-11 items-center whitespace-nowrap rounded-lg bg-button px-3 text-[0.8125rem] font-semibold leading-none text-forest-deep transition-colors hover:bg-button-hover sm:px-4 sm:text-[0.9rem] md:min-h-0 md:py-2.5"
            >
              {cta.demo.label}
            </Link>
          </div>
        </Container>
      </header>

      {/* Small screens: the same four links on a second row. It scrolls away with the page; only the bar above sticks. No JS menu. */}
      <nav aria-label="Main" className="border-b border-white/10 bg-forest text-white md:hidden">
        <Container>
          <ul className="-mx-3 flex items-center gap-1 overflow-x-auto text-[0.95rem] text-white/85">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="flex min-h-11 items-center rounded-md px-3 hover:text-sage">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </nav>
    </>
  );
}
