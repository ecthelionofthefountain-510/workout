// Genererar app-ikoner (PNG) och favicon (SVG) från en enkel hantel-SVG.
// Körs med: node scripts/gen-icons.mjs   (kräver dev-beroendet "sharp")
import sharp from 'sharp'
import { writeFileSync } from 'node:fs'

// Hantel-formen (samma som appens HeroArt), i en 120x120-ruta.
const dumbbell = `
  <g transform="rotate(-30 60 60)">
    <rect x="4" y="50" width="14" height="20" rx="4"/>
    <rect x="18" y="42" width="10" height="36" rx="4"/>
    <rect x="28" y="54" width="64" height="12" rx="6"/>
    <rect x="92" y="42" width="10" height="36" rx="4"/>
    <rect x="102" y="50" width="14" height="20" rx="4"/>
  </g>`

// Bygg en 512x512-ikon. rounded = rundade hörn (annars helt fylld kvadrat).
// scale styr hur stor hanteln är (safe zone för maskable-ikoner).
function icon({ rounded, scale }) {
  const rx = rounded ? 112 : 0
  return `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ff6a2b"/>
      <stop offset="1" stop-color="#ff8f4d"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="${rx}" fill="url(#g)"/>
  <g fill="#ffffff" transform="translate(256 256) scale(${scale}) translate(-60 -60)">
    ${dumbbell}
  </g>
</svg>`
}

const rounded = icon({ rounded: true, scale: 2.7 }) // vanlig ikon
const maskable = icon({ rounded: false, scale: 2.05 }) // full-bleed + safe zone
const apple = icon({ rounded: false, scale: 2.4 }) // iOS lägger på egna hörn

const out = new URL('../public/', import.meta.url)

async function png(svg, name, size) {
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(new URL(name, out).pathname)
  console.log('skrev', name, `(${size}px)`)
}

await png(rounded, 'pwa-192.png', 192)
await png(rounded, 'pwa-512.png', 512)
await png(maskable, 'pwa-maskable-512.png', 512)
await png(apple, 'apple-touch-icon.png', 180)

// Favicon som SVG (skarp i alla storlekar).
writeFileSync(new URL('favicon.svg', out), rounded)
console.log('skrev favicon.svg')
