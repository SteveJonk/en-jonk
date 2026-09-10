import Image from 'next/image';
import { cn } from '@/lib/cn';

type FrameProps = {
  /** File name in public/images, without extension. */
  src: string;
  alt: string;
  /** Aspect ratio and layout, e.g. `aspect-[4/5]`. */
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/** Cropped photo on the warm placeholder ground. */
export function Frame({ src, alt, className, sizes = '100vw', priority }: FrameProps) {
  return (
    <div className={cn('relative overflow-hidden rounded-[2px] bg-frame', className)}>
      <Image
        src={`/images/${src}.webp`}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className='object-cover'
      />
    </div>
  );
}
