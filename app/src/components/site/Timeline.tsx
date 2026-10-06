import type { ReactNode } from 'react';
import { Reveal } from '@/components/site/Reveal';
import { cn } from '@/lib/cn';

export type TimelineItem = { title: ReactNode; text: ReactNode };

const DOTS = ['bg-rose', 'bg-green', 'bg-steel', 'bg-ink'];

const GRADIENT =
  'linear-gradient(to right, rgba(189,120,117,.5) 0%, rgba(74,107,80,.5) 30%, rgba(44,90,122,.5) 55%, rgba(22,32,41,.4) 80%, rgba(22,32,41,0) 100%)';

const COLS = { 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4' } as const;

/** Two small dots: the options that lie between two big ones. */
function Between({ className }: { className: string }) {
  return (
    <span aria-hidden className={cn('absolute justify-evenly', className)}>
      <span className='size-[5px] rounded-full bg-ink/30' />
      <span className='size-[5px] rounded-full bg-ink/30' />
    </span>
  );
}

/** Dots on a line (horizontal from lg, vertical rule below that). */
export function Timeline({
  items,
  className,
  plainLine,
}: {
  items: TimelineItem[];
  className?: string;
  /** Neutral rule instead of the colour gradient. */
  plainLine?: boolean;
}) {
  return (
    <div className={cn('relative', className)}>
      <Reveal
        delay={80}
        className={cn('absolute inset-x-0 top-[7px] hidden h-px lg:block', plainLine && 'bg-ink/10')}
        style={plainLine ? undefined : { background: GRADIENT }}
      />
      <ol className={cn('grid gap-10 lg:gap-8', COLS[items.length as keyof typeof COLS] ?? 'lg:grid-cols-3')}>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <Reveal
              as='li'
              key={i}
              delay={plainLine ? i * 180 : 160 + i * 200}
              className={cn('relative border-l border-ink/15 pl-6 lg:border-l-0 lg:pl-0', !last && 'lg:pr-8')}
            >
              <span className={cn('hidden size-[15px] rounded-full lg:block', DOTS[i % DOTS.length])} />
              <span
                className={cn(
                  'absolute top-2 -left-[5px] size-[9px] rounded-full lg:hidden',
                  DOTS[i % DOTS.length],
                )}
              />
              {!last && !plainLine && (
                <>
                  <Between className='top-[5px] right-[-2rem] left-[15px] hidden lg:flex' />
                  <Between className='top-full -left-[3px] h-10 flex flex-col lg:hidden' />
                </>
              )}
              <p className='font-display text-3xl leading-none lg:mt-6 lg:text-4xl'>{item.title}</p>
              <p className='mt-3 text-muted'>{item.text}</p>
            </Reveal>
          );
        })}
      </ol>
    </div>
  );
}
