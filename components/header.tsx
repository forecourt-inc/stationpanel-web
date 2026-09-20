import Link from "next/link";
import { cta, nav } from "@/content/copy";
import { Logo } from "./logo";
import { Container } from "./ui";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-forest/95 text-white backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between gap-2 sm:gap-4">
          <Link href="/" aria-label="Station Panel home" className="shrink-0">
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
              className="whitespace-nowrap rounded-lg px-2 py-2 text-[0.875rem] font-medium text-white/90 sm:px-3 sm:text-[0.95rem] transition-colors hover:text-sage"
            >
              {cta.login.label}
            </a>
            <Link
              href={cta.demo.href}
              className="whitespace-nowrap rounded-lg bg-button px-3 py-2.5 text-[0.8125rem] font-semibold leading-none text-forest-deep transition-colors hover:bg-button-hover sm:px-4 sm:text-[0.9rem]"
            >
              {cta.demo.label}
            </Link>
          </div>
        </div>

        {/* Small screens: the same four links on a second row. No JS menu. */}
        <nav aria-label="Main" className="-mx-1 md:hidden">
          <ul className="flex items-center gap-1 overflow-x-auto pb-2 text-[0.95rem] text-white/85">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block rounded-md px-3 py-1.5 hover:text-sage">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
