import type { ReactNode } from 'react';
import { Reveal } from '@/components/site/Reveal';
import { cn } from '@/lib/cn';

export type TimelineItem = {
  title: ReactNode;
  text: ReactNode;
  /** Dot colour, e.g. `bg-rose`. */
  dot: string;
  delay: number;
};

export const TRAJECTEN: TimelineItem[] = [
  {
    title: 'Drie bijeenkomsten',
    text: 'Een korte instap, waarin patronen zichtbaar worden en een volgende stap ontstaat.',
    dot: 'bg-rose',
    delay: 160,
  },
  {
    title: 'Een half jaar',
    text: 'Trajecten waarin het geleerde meebeweegt met het werk zelf.',
    dot: 'bg-green',
    delay: 360,
  },
  {
    title: 'Tot twee jaar',
    text: 'Traineeships en jaartrajecten, van intake tot overdracht.',
    dot: 'bg-steel',
    delay: 560,
  },
];

const GRADIENT =
  'linear-gradient(to right, rgba(189,120,117,.5) 0%, rgba(74,107,80,.5) 42%, rgba(44,90,122,.5) 70%, rgba(44,90,122,0) 100%)';

/** Three dots on a line (horizontal from lg, vertical rule below that). */
export function Timeline({
  items,
  className,
  plainLine,
}: {
  items: TimelineItem[];
  className?: string;
  /** Neutral rule instead of the rose-green-steel gradient. */
  plainLine?: boolean;
}) {
  return (
    <div className={cn('relative', className)}>
      <Reveal
        delay={80}
        className={cn('absolute inset-x-0 top-[7px] hidden h-px lg:block', plainLine && 'bg-ink/10')}
        style={plainLine ? undefined : { background: GRADIENT }}
      />
      <ol className='grid gap-10 lg:grid-cols-3 lg:gap-8'>
        {items.map((item, i) => (
          <Reveal
            as='li'
            key={i}
            delay={item.delay}
            className={cn(
              'relative border-l border-ink/15 pl-6 lg:border-l-0 lg:pl-0',
              i < items.length - 1 && 'lg:pr-8',
            )}
          >
            <span className={cn('hidden size-[15px] rounded-full lg:block', item.dot)} />
            <span
              className={cn('absolute top-2 -left-[5px] size-[9px] rounded-full lg:hidden', item.dot)}
            />
            <p className='font-display text-3xl leading-none lg:mt-6 lg:text-4xl'>{item.title}</p>
            <p className='mt-3 text-muted'>{item.text}</p>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
