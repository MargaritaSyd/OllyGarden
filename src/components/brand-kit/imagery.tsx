"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { DownloadMark, ExternalMark } from "@/components/brand-kit/marks";
import { BrandRules, BrandSection } from "@/components/brand-kit/section";
import { bitmapRamp, brandKitLinks, imageryRules, imagerySample } from "@/lib/brand-kit/content";
import { ditherPixels } from "@/lib/brand-kit/dither";

export function BrandImagery() {
  const [src, setSrc] = useState(imagerySample);
  const [size, setSize] = useState(45);
  const [factor, setFactor] = useState(80);
  const [split, setSplit] = useState(36);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ownUrl = useRef<string | null>(null);

  useEffect(
    () => () => {
      if (ownUrl.current) URL.revokeObjectURL(ownUrl.current);
    },
    [],
  );

  useEffect(() => {
    const image = imageRef.current;
    const canvas = canvasRef.current;
    if (!image || !canvas) return;
    let frame = 0;
    const draw = () => {
      if (!image.naturalWidth) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => paint(image, canvas, size, factor));
    };
    draw();
    image.addEventListener("load", draw);
    return () => {
      cancelAnimationFrame(frame);
      image.removeEventListener("load", draw);
    };
  }, [src, size, factor]);

  function choose(file: File | undefined) {
    if (!file) return;
    if (ownUrl.current) URL.revokeObjectURL(ownUrl.current);
    ownUrl.current = URL.createObjectURL(file);
    setSrc(ownUrl.current);
  }

  function download() {
    const canvas = canvasRef.current;
    if (!canvas?.width) return;
    const scale = Math.max(1, Math.round(1600 / canvas.width));
    const output = document.createElement("canvas");
    output.width = canvas.width * scale;
    output.height = canvas.height * scale;
    const context = output.getContext("2d");
    if (!context) return;
    context.imageSmoothingEnabled = false;
    context.drawImage(canvas, 0, 0, output.width, output.height);
    output.toBlob((blob) => {
      if (blob) downloadBlob(blob, "ollygarden-bitmap.png");
    }, "image/png");
  }

  return (
    <BrandSection
      id="imagery"
      icon="sun"
      eyebrow="Bitmap imagery"
      title="Dither any photo into the garden"
      lede="Any image can become an OllyGarden asset once it is bitmapped in the green palette. The result should not look like a realistic photograph, nor messy: the dithering is obvious and every major detail stays. Drag across the photo to compare, or try your own. It is processed in your browser and never uploaded."
    >
      <div className="bk-dither">
        <div className="bk-compare" style={{ "--split": `${split}%` } as CSSProperties}>
          <canvas ref={canvasRef} className="bk-compare-out" role="img" aria-label="The photo, dithered in the brand ramp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imageRef}
            className="bk-compare-in"
            src={src}
            alt=""
          />
          <span className="bk-compare-line" aria-hidden="true">
            <i />
          </span>
          <span className="bk-compare-tag bk-compare-tag--in" aria-hidden="true">
            Original
          </span>
          <span className="bk-compare-tag bk-compare-tag--out" aria-hidden="true">
            Bitmap
          </span>
          <input
            className="bk-compare-range"
            type="range"
            min={0}
            max={100}
            value={split}
            aria-label="Compare the original with the bitmap"
            onChange={(event) => setSplit(Number(event.target.value))}
          />
        </div>
        <div className="flex flex-col justify-center gap-7">
          <label className="bk-range">
            <span className="bk-range-label">
              Size <b>{size}</b>
              <small>recommended 40–50</small>
            </span>
            <input
              type="range"
              min={25}
              max={70}
              value={size}
              style={{ "--lo": "33.3%", "--hi": "55.6%" } as CSSProperties}
              onChange={(event) => setSize(Number(event.target.value))}
            />
          </label>
          <label className="bk-range">
            <span className="bk-range-label">
              Dithering factor <b>{factor}</b>
              <small>recommended 70–90</small>
            </span>
            <input
              type="range"
              min={40}
              max={100}
              value={factor}
              style={{ "--lo": "50%", "--hi": "83.3%" } as CSSProperties}
              onChange={(event) => setFactor(Number(event.target.value))}
            />
          </label>
          <div>
            <div className="bk-ramp-strip">
              {bitmapRamp.map((hex) => (
                <span key={hex} style={{ background: hex }} title={hex} />
              ))}
            </div>
            <div className="bk-ramp-labels">
              <span>Highlights</span>
              <span>Midtones</span>
              <span>Shadows</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <label className="bk-btn bk-btn--secondary bk-btn--compact">
              Try your own photo
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(event) => {
                  choose(event.target.files?.[0]);
                  event.target.value = "";
                }}
              />
            </label>
            <button type="button" className="bk-btn bk-btn--primary bk-btn--compact" onClick={download}>
              <DownloadMark /> Download PNG
            </button>
          </div>
        </div>
      </div>
      <BrandRules rules={imageryRules} />
      <div className="bk-photo-banner bk-card mt-6 flex-row items-center gap-7 p-5 pr-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/brand-kit/photo-library.webp" alt="" />
        <div className="min-w-0 flex-1">
          <h3 className="bk-card-title">Need a photo, not a filter?</h3>
          <p className="bk-card-desc">
            The Photo Library has all 22 brand photographs, already dithered and ready to place as they are. Use them instead of stock photos.
          </p>
        </div>
        <a className="bk-btn bk-btn--primary bk-btn--compact" href={brandKitLinks.photos} target="_blank" rel="noopener noreferrer">
          Open the Photo Library <ExternalMark />
        </a>
      </div>
    </BrandSection>
  );
}

function paint(image: HTMLImageElement, canvas: HTMLCanvasElement, size: number, factor: number) {
  const width = Math.round(size * 8);
  const height = Math.max(1, Math.round((width * image.naturalHeight) / image.naturalWidth));
  const scratch = document.createElement("canvas");
  scratch.width = width;
  scratch.height = height;
  const source = scratch.getContext("2d", { willReadFrequently: true });
  if (!source) return;
  source.drawImage(image, 0, 0, width, height);
  const frame = source.getImageData(0, 0, width, height);
  ditherPixels(frame.data, width, height, factor);
  canvas.width = width;
  canvas.height = height;
  canvas.getContext("2d")?.putImageData(frame, 0, 0);
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
