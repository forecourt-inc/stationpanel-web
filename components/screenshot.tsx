import Image from "next/image";

const shots = {
  dashboard: { src: "/screenshots/dashboard.png", width: 2812, height: 1402, url: "app.stationpanel.com" },
  login: { src: "/screenshots/login.png", width: 2812, height: 1560, url: "app.stationpanel.com/login" },
} as const;

type ScreenshotProps = {
  shot: keyof typeof shots;
  alt: string;
  caption?: string;
  preload?: boolean;
  sizes?: string;
};

// Real product screenshot in a plain browser frame.
export function Screenshot({ shot, alt, caption, preload, sizes = "(min-width: 1152px) 1088px, 100vw" }: ScreenshotProps) {
  const { src, width, height, url } = shots[shot];
  return (
    <figure>
      <div className="overflow-hidden rounded-xl border border-line bg-white shadow-[0_24px_60px_-24px_rgb(15_36_28/0.35)]">
        <div className="flex items-center gap-3 border-b border-line bg-canvas px-4 py-2.5" aria-hidden="true">
          <span className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-line" />
            <span className="size-2.5 rounded-full bg-line" />
            <span className="size-2.5 rounded-full bg-line" />
          </span>
          <span className="truncate rounded-md bg-white px-3 py-0.5 text-xs text-muted">{url}</span>
        </div>
        <Image src={src} width={width} height={height} alt={alt} preload={preload} sizes={sizes} className="h-auto w-full" />
      </div>
      {caption ? <figcaption className="mt-3 text-center text-sm text-muted">{caption}</figcaption> : null}
    </figure>
  );
}

const deviceShots = {
  idle: { src: "/screenshots/ipad-idle.png", width: 1600, height: 1159 },
  setupPower: { src: "/screenshots/ipad-setup-power.png", width: 1600, height: 1159 },
  setupWifi: { src: "/screenshots/ipad-setup-wifi.png", width: 1600, height: 1159 },
  setupAddress: { src: "/screenshots/ipad-setup-address.png", width: 1600, height: 1159 },
} as const;

type DeviceShotProps = {
  shot: keyof typeof deviceShots;
  alt: string;
  caption?: string;
  sizes?: string;
};

// Real capture from the on-site iPad in a plain tablet bezel.
export function DeviceShot({ shot, alt, caption, sizes = "(min-width: 1024px) 520px, 100vw" }: DeviceShotProps) {
  const { src, width, height } = deviceShots[shot];
  return (
    <figure>
      <div className="rounded-[1.4rem] bg-ink p-[3.2%] shadow-[0_24px_60px_-24px_rgb(15_36_28/0.35)]">
        <Image src={src} width={width} height={height} alt={alt} sizes={sizes} className="h-auto w-full rounded-lg bg-white" />
      </div>
      {caption ? <figcaption className="mt-3 text-center text-sm text-muted">{caption}</figcaption> : null}
    </figure>
  );
}
