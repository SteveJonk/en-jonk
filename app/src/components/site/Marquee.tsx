/* eslint-disable @next/next/no-img-element -- logos have mixed intrinsic sizes */
import { cn } from '@/lib/cn';

export type MarqueeLogo = { src: string; alt: string; href?: string | null };

/**
 * Endless logo strip. The track holds the set twice and slides -50% for a
 * seamless loop; hover or focus pauses it. With reduced motion it becomes a
 * static, wrapped row without the duplicates.
 */
export function Marquee({ logos, reverse }: { logos: MarqueeLogo[]; reverse?: boolean }) {
  return (
    <div className='group overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] motion-reduce:[mask-image:none]'>
      <ul
        className={cn(
          'flex w-max animate-marquee group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused]',
          'motion-reduce:w-auto motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center',
          reverse && '[animation-direction:reverse]',
        )}
      >
        {[...logos, ...logos].map((logo, i) => {
          const copy = i >= logos.length;
          return (
            <li
              key={i}
              aria-hidden={copy || undefined}
              className={cn(
                'flex h-24 w-44 flex-none items-center justify-center px-6',
                copy && 'motion-reduce:hidden',
              )}
            >
              <a
                href={logo.href || undefined}
                tabIndex={copy ? -1 : undefined}
                className='group/logo flex size-full items-center justify-center'
              >
                <img
                  src={logo.src}
                  alt={copy ? '' : logo.alt}
                  loading='lazy'
                  className='max-h-16 w-auto max-w-full object-contain opacity-60 mix-blend-multiply grayscale transition-[filter,opacity] duration-300 group-hover/logo:opacity-100 group-hover/logo:grayscale-0 group-focus-visible/logo:opacity-100 group-focus-visible/logo:grayscale-0'
                />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
