// Builds public/screenshots/*.png from raw captures that are kept out of git
// (reference/, WEB_PHOTOS/). Run: node scripts/patch-shots.cjs <name> [<name> ...]
// With no names it lists what it knows. OUT_DIR=<dir> writes somewhere else for a dry run.
//
// A patch covers a region with a flat region copied from the same capture, so nothing
// that names a person or an organization is published. Coordinates are in source pixels.
const path = require("node:path");
const sharp = require("sharp"); // installed with next

const root = path.join(__dirname, "..");
const outDir = process.env.OUT_DIR || path.join(root, "public", "screenshots");

const shots = {
  // Browser chrome removed, the half-visible "Recent activity" card trimmed,
  // organization label and signed-in name covered.
  dashboard: {
    source: "reference/dashboard.png",
    patches: [
      { from: { left: 230, top: 200, width: 180, height: 48 }, to: { left: 34, top: 200 } },
      { from: { left: 1800, top: 135, width: 350, height: 42 }, to: { left: 2245, top: 135 } },
    ],
    crop: { left: 6, top: 98, width: 2812, height: 1402 },
  },
  // iPad captures: the status bar (clock, date, battery) is cropped off.
  "ipad-idle": { source: "WEB_PHOTOS/screensaver.png", crop: ipadCrop(), width: 1600 },
  "ipad-setup-power": { source: "WEB_PHOTOS/Setup Wizzard/IMG_0186.PNG", crop: ipadCrop(), width: 1600 },
  "ipad-setup-wifi": { source: "WEB_PHOTOS/Setup Wizzard/IMG_0187.PNG", crop: ipadCrop(), width: 1600 },
  "ipad-setup-address": { source: "WEB_PHOTOS/Setup Wizzard/IMG_0188.PNG", crop: ipadCrop(), width: 1600 },
};

function ipadCrop() {
  return { left: 0, top: 70, width: 2752, height: 1994 };
}

async function build(name) {
  const shot = shots[name];
  if (!shot) throw new Error(`Unknown shot "${name}". Known: ${Object.keys(shots).join(", ")}`);
  const source = path.join(root, shot.source);

  const overlays = [];
  for (const patch of shot.patches ?? []) {
    overlays.push({ input: await sharp(source).extract(patch.from).png().toBuffer(), ...patch.to });
  }
  const patched = await sharp(source).composite(overlays).png().toBuffer();

  let image = sharp(patched).extract(shot.crop);
  if (shot.width) image = sharp(await image.png().toBuffer()).resize({ width: shot.width });

  const out = path.join(outDir, `${name}.png`);
  const info = await image.png({ compressionLevel: 9, palette: true, quality: 95 }).toFile(out);
  console.log(`${name}: ${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB -> ${path.relative(root, out)}`);
}

(async () => {
  const names = process.argv.slice(2);
  if (names.length === 0) {
    console.log(`Shots: ${Object.keys(shots).join(", ")}`);
    return;
  }
  for (const name of names) await build(name);
})().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
