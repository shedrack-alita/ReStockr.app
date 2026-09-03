/**
 * Regenerates public/favicon.ico and public/apple-touch-icon.png from the
 * brand's green logomark. Re-run with `node scripts/generate-favicon.cjs`
 * (from the project root) whenever public/images/logo/logomark-green.svg
 * changes.
 *
 * ICO is a hand-built ICONDIR wrapping PNG-encoded 16/32/48px renders
 * (PNG-in-ICO, valid since Windows Vista) — no extra dependency needed
 * beyond `sharp`, which the project already has via @nuxt/image.
 */
const path = require('node:path')
const fs = require('node:fs')
const sharp = require('sharp')

const ROOT = path.join(__dirname, '..')
const SRC = path.join(ROOT, 'public/images/logo/logomark-green.svg')
const SIZES = [16, 32, 48]

async function renderPng(size) {
  return sharp(SRC, { density: 384 }) // high density so small raster sizes stay crisp
    .resize(size, size)
    .png()
    .toBuffer()
}

function buildIco(pngBuffers, sizes) {
  const count = pngBuffers.length
  const headerSize = 6 + 16 * count
  let offset = headerSize
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // type: icon
  header.writeUInt16LE(count, 4) // image count

  const entries = []
  for (let i = 0; i < count; i++) {
    const size = sizes[i]
    const buf = pngBuffers[i]
    const entry = Buffer.alloc(16)
    entry.writeUInt8(size >= 256 ? 0 : size, 0) // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1) // height
    entry.writeUInt8(0, 2) // color count
    entry.writeUInt8(0, 3) // reserved
    entry.writeUInt16LE(1, 4) // color planes
    entry.writeUInt16LE(32, 6) // bits per pixel
    entry.writeUInt32LE(buf.length, 8) // size of image data
    entry.writeUInt32LE(offset, 12) // offset of image data
    offset += buf.length
    entries.push(entry)
  }

  return Buffer.concat([header, ...entries, ...pngBuffers])
}

;(async () => {
  const pngBuffers = await Promise.all(SIZES.map(renderPng))
  const ico = buildIco(pngBuffers, SIZES)
  fs.writeFileSync(path.join(ROOT, 'public/favicon.ico'), ico)
  console.log('wrote public/favicon.ico', ico.length, 'bytes, sizes', SIZES)

  // apple-touch-icon: iOS wants an opaque square (no alpha-blended edges
  // look odd on the home screen), 180x180 is the current recommended size.
  const touch = await sharp(SRC, { density: 384 }).resize(180, 180).png().toBuffer()
  fs.writeFileSync(path.join(ROOT, 'public/apple-touch-icon.png'), touch)
  console.log('wrote public/apple-touch-icon.png', touch.length, 'bytes')
})()
