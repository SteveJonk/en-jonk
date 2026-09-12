import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
import { client } from '@/sanity/client';

const { projectId, dataset } = client.config();

const builder =
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset })
    : null;

export type SanityImage = SanityImageSource & {
  _key?: string;
  alt?: string;
};

export function urlFor(source: SanityImageSource) {
  return builder?.image(source) ?? null;
}

export function imageSrc(
  source: SanityImage | undefined | null,
  width: number,
  height?: number,
): string | null {
  if (!source) return null;
  let builder = urlFor(source)?.width(width);
  if (height) builder = builder?.height(height).fit('crop');
  return builder?.url() ?? null;
}

export function toImage(
  source: SanityImage | undefined | null,
  width: number,
  height?: number,
): { src: string; alt: string } | undefined {
  const src = imageSrc(source, width, height);
  if (!src) return undefined;
  return { src, alt: source?.alt ?? '' };
}

/** A `photo` from the studio: an image with its alt text and crop focus. */
export type Photo = {
  asset?: { _ref: string } | null;
  alt?: string | null;
  hotspot?: { x?: number | null; y?: number | null } | null;
  crop?: unknown;
};
