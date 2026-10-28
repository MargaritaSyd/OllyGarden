import { bitmapRamp } from "@/lib/brand-kit/content";

const ramp = [...bitmapRamp].reverse().map((hex) => [
  Number.parseInt(hex.slice(1, 3), 16),
  Number.parseInt(hex.slice(3, 5), 16),
  Number.parseInt(hex.slice(5, 7), 16),
]);

/**
 * Floyd–Steinberg dither into the brand green ramp.
 * Stretches contrast to the 1st and 99th percentile, then snaps each pixel to a ramp step.
 * `factorPercent` is how much of the rounding error spreads to neighbouring pixels.
 */
export function ditherPixels(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  factorPercent: number,
) {
  const count = width * height;
  const luma = new Float32Array(count);
  const histogram = new Uint32Array(256);
  for (let index = 0; index < count; index++) {
    const value =
      0.2126 * pixels[index * 4] +
      0.7152 * pixels[index * 4 + 1] +
      0.0722 * pixels[index * 4 + 2];
    luma[index] = value;
    histogram[Math.min(255, value | 0)] += 1;
  }

  let low = 0;
  let high = 255;
  let seen = 0;
  const cutoff = count * 0.01;
  for (let shade = 0; shade < 256; shade++) {
    seen += histogram[shade];
    if (seen >= cutoff) {
      low = shade;
      break;
    }
  }
  seen = 0;
  for (let shade = 255; shade >= 0; shade--) {
    seen += histogram[shade];
    if (seen >= cutoff) {
      high = shade;
      break;
    }
  }

  const span = Math.max(1, high - low);
  for (let index = 0; index < luma.length; index++) {
    luma[index] = Math.min(255, Math.max(0, ((luma[index] - low) / span) * 255));
  }

  const last = ramp.length - 1;
  const step = 255 / last;
  const factor = factorPercent / 100;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = y * width + x;
      const value = luma[index];
      const bucket = Math.min(last, Math.max(0, Math.round(value / step)));
      const error = (value - bucket * step) * factor;
      const [red, green, blue] = ramp[bucket];
      pixels[index * 4] = red;
      pixels[index * 4 + 1] = green;
      pixels[index * 4 + 2] = blue;
      pixels[index * 4 + 3] = 255;
      if (x + 1 < width) luma[index + 1] += (error * 7) / 16;
      if (y + 1 < height) {
        if (x > 0) luma[index + width - 1] += (error * 3) / 16;
        luma[index + width] += (error * 5) / 16;
        if (x + 1 < width) luma[index + width + 1] += error / 16;
      }
    }
  }
}
