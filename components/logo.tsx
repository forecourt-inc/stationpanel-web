type LogoProps = {
  // "light" sits on white/canvas (Station in ink); "dark" sits on forest (Station in white).
  tone?: "light" | "dark";
  size?: number;
  className?: string;
};

export function LeafMark({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="32" height="32" rx="8" fill="#6FBF8A" />
      <path d="M10.2 22.1C8.6 14.6 13.6 9.4 23.2 9.2c.4 9.6-4.6 14.8-13 12.9Z" fill="#FBFDFB" />
      <path d="M10.6 21.8 17.2 15.2" fill="none" stroke="#6FBF8A" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M8.9 23.5 11 21.4" fill="none" stroke="#FBFDFB" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ tone = "light", size = 32, className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 sm:gap-2.5 ${className}`}>
      <LeafMark size={size} />
      <span
        className={`text-[1.05rem] font-semibold sm:text-[1.2rem] tracking-tight ${tone === "dark" ? "text-white" : "text-ink"}`}
      >
        Station<span className="text-sage">Panel</span>
      </span>
    </span>
  );
}
