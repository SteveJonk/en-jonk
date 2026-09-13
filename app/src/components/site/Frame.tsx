import Image from 'next/image';
import { cn } from '@/lib/cn';
import { urlFor, type Photo } from '@/sanity/image';
import type { SanityImageSource } from '@sanity/image-url';

type FrameProps = {
  image?: Photo | null;
  /** Aspect ratio and layout, e.g. `aspect-[4/5]`. */
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/** Cropped photo on the warm placeholder ground. The hotspot sets the focus. */
export function Frame({ image, className, sizes = '100vw', priority }: FrameProps) {
  const src = image?.asset
    ? urlFor(image as SanityImageSource)?.width(2400).fit('max').auto('format').url()
    : null;
  const x = image?.hotspot?.x ?? 0.5;
  const y = image?.hotspot?.y ?? 0.5;

  return (
    <div className={cn('relative overflow-hidden rounded-[2px] bg-frame', className)}>
      {src && (
        <Image
          src={src}
          alt={image?.alt ?? ''}
          fill
          sizes={sizes}
          priority={priority}
          className='object-cover'
          style={{ objectPosition: `${x * 100}% ${y * 100}%` }}
        />
      )}
    </div>
  );
}
