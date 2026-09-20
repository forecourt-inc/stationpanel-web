import Link from "next/link";
import type { ReactNode } from "react";
import { cta } from "@/content/copy";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return <p className={`label ${tone === "dark" ? "text-sage" : "text-clear"}`}>{children}</p>;
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "onDark" | "onLight";
  className?: string;
};

const buttonBase =
  "inline-flex items-center justify-center rounded-lg px-5 py-3 text-[0.95rem] font-semibold leading-none transition-colors";

const buttonVariants = {
  // Dark text on the product's button green: white on #5FA87A does not meet contrast.
  primary: "bg-button text-forest-deep hover:bg-button-hover",
  onDark: "border border-white/30 text-white hover:bg-white/10",
  onLight: "border border-line bg-white text-ink hover:border-sage",
};

export function ButtonLink({ href, children, variant = "primary", className = "" }: ButtonProps) {
  const classes = `${buttonBase} ${buttonVariants[variant]} ${className}`;
  if (href.startsWith("http")) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

export function CtaPair({ tone }: { tone: "dark" | "light" }) {
  return (
    <div className="flex flex-wrap gap-3">
      <ButtonLink href={cta.demo.href}>{cta.demo.label}</ButtonLink>
      <ButtonLink href={cta.login.href} variant={tone === "dark" ? "onDark" : "onLight"}>
        {cta.login.label}
      </ButtonLink>
    </div>
  );
}

export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <header className="forest-wash text-white">
      <Container className="py-16 sm:py-24">
        <Eyebrow tone="dark">{eyebrow}</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold sm:text-5xl">{title}</h1>
        {intro ? <p className="mt-6 max-w-2xl text-lg text-white/80">{intro}</p> : null}
      </Container>
    </header>
  );
}
