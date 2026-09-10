'use client';

import type { ElementType, HTMLAttributes } from 'react';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import { cn } from '@/lib/cn';

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  /** Transition delay in ms. */
  delay?: number;
};

/** Fades and lifts its content in once it scrolls into view. */
export function Reveal({ as: Tag = 'div', delay = 0, className, style, ...rest }: RevealProps) {
  const { ref, visible } = useRevealOnScroll<HTMLElement>();

  return (
    <Tag
      ref={ref}
      style={{ ...style, transitionDelay: `${delay}ms` }}
      className={cn(
        'transition-[opacity,transform] duration-700 ease-brand',
        'motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-[18px] opacity-0',
        className,
      )}
      {...rest}
    />
  );
}
