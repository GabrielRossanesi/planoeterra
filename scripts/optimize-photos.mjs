// Optimizes the client's real field/aerial photos into web-ready webp assets.
// Auto-rotates via EXIF, resizes to a sane max width, strips metadata.
// Output: public/photos/*.webp  (referenced from data/ and components/).
import sharp from "sharp";
import { mkdirSync } from "node:fs";

sharp.cache(false);
const SRC = "img";
const OUT = "public/photos";
mkdirSync(OUT, { recursive: true });

// [source file, output slug, max width, quality]
const jobs = [
  // Real drone aerials — hero / section backgrounds
  ["dji_fly_20250309_104824_886_1741528123857_photo.jpg", "aerea-bairro-01", 1920, 72],
  ["dji_fly_20250309_105026_891_1741528238198_photo.jpg", "aerea-bairro-02", 1920, 72],
  // Field / team at work
  ["IMG_20260124_092535.jpg", "campo-rtk-01", 1400, 74],
  ["IMG_20260124_095347.jpg", "equip-rtk-01", 1300, 74],
  ["IMG_20260117_091754.jpg", "campo-rtk-02", 1200, 74],
  ["IMG_20260117_092408.jpg", "equip-gnss-02", 1200, 74],
  ["WhatsApp Image 2026-01-20 at 13.25.07 (5).jpeg", "campo-rtk-03", 1200, 74],
  ["WhatsApp Image 2026-01-20 at 13.25.07 (4).jpeg", "equip-rtk-02", 1200, 74],
  ["WhatsApp Image 2026-01-08 at 14.43.33 (1).jpeg", "campo-nivel-01", 1200, 74],
  // Aerial mission planning screenshot
  ["SmartSelect_20250704_175421_Map Pilot Pro.jpg", "planejamento-voo", 1600, 74],
];

const log = (...a) => console.log(new Date().toISOString(), ...a);

for (const [file, slug, width, quality] of jobs) {
  try {
    const info = await sharp(`${SRC}/${file}`, { limitInputPixels: false })
      .rotate() // apply EXIF orientation
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toFile(`${OUT}/${slug}.webp`);
    log(`${slug}.webp  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
  } catch (e) {
    log(`FAIL ${slug}: ${e.message}`);
  }
}

// Orthophoto: large detailed map, keep more resolution + quality.
try {
  const info = await sharp("img/NOVA ORTO.tif", {
    limitInputPixels: false,
    unlimited: true,
  })
    .rotate()
    .resize({ width: 2400, withoutEnlargement: true })
    .flatten({ background: "#0b1b12" })
    .webp({ quality: 78 })
    .toFile(`${OUT}/ortofoto-bairro.webp`);
  log(`ortofoto-bairro.webp  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
} catch (e) {
  log(`FAIL ortofoto: ${e.message}`);
}

log("done");
