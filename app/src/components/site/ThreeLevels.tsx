'use client';

import { useState, type ReactNode } from 'react';
import { Reveal } from '@/components/site/Reveal';
import { cn } from '@/lib/cn';

const LOBES = [
  { key: 'individueel', fill: '#bd7875', bar: 'bg-rose', cx: 235, cy: 160, tx: 180, ty: 130 },
  { key: 'team', fill: '#4a6b50', bar: 'bg-green', cx: 385, cy: 160, tx: 444, ty: 130 },
  { key: 'organisatie', fill: '#2c5a7a', bar: 'bg-steel', cx: 310, cy: 272, tx: 310, ty: 338 },
];

export type Level = { title: string; text: ReactNode; items?: string[] | null };

type ThreeLevelsProps = {
  /** Individueel, team, organisatie — in that order. */
  levels: Level[];
  /** Bordered cards (wat-we-doen) instead of open columns (home). */
  cards?: boolean;
};

/**
 * Venn of individu, team and organisatie, linked to the three level blocks
 * below it: hover or focus either side and the matching pair lights up.
 */
export function ThreeLevels({ levels, cards }: ThreeLevelsProps) {
  const [active, setActive] = useState<string | null>(null);
  // Positions and colours are the drawing's; the titles come from the CMS.
  const lobes = LOBES.map((lobe, i) => ({ ...lobe, title: levels[i]?.title ?? '' }));

  const highlight = (key: string) => ({
    onMouseEnter: () => setActive(key),
    onMouseLeave: () => setActive(null),
    onFocus: () => setActive(key),
    onBlur: () => setActive(null),
  });

  return (
    <>
      <Reveal className='mt-12 md:mt-16'>
        <svg
          viewBox='97 22 426 388'
          className='mx-auto h-auto w-full max-w-2xl'
          role='img'
          aria-label='Drie overlappende cirkels: individueel, team en organisatie, die elkaar in het midden overlappen'
        >
          {lobes.map((lobe) => (
            <g
              key={lobe.key}
              tabIndex={0}
              role='button'
              aria-label={`${lobe.title} uitlichten`}
              className='cursor-pointer'
              {...highlight(lobe.key)}
            >
              <circle
                cx={lobe.cx}
                cy={lobe.cy}
                r={128}
                fill={lobe.fill}
                style={{
                  mixBlendMode: 'multiply',
                  fillOpacity: !active ? 0.3 : active === lobe.key ? 0.55 : 0.12,
                  transition: 'fill-opacity .35s ease',
                }}
              />
              <text
                x={lobe.tx}
                y={lobe.ty}
                textAnchor='middle'
                dominantBaseline='central'
                className='font-ui max-md:text-[15px] max-md:tracking-[1.8px]'
                fontSize={10}
                letterSpacing={1.6}
                fill='#162029'
              >
                {lobe.title.toUpperCase()}
              </text>
            </g>
          ))}
        </svg>
      </Reveal>

      <div
        className={cn(
          'mx-auto grid max-w-2xl lg:max-w-none lg:grid-cols-3',
          cards
            ? 'mt-14 gap-px border-y border-ink/10 bg-ink/10 md:mt-20'
            : 'mt-10 gap-10 md:mt-14 lg:gap-12',
        )}
      >
        {lobes.map((lobe, i) => {
          const level = levels[i];
          if (!level) return null;
          return (
            <Reveal
              as='article'
              key={lobe.key}
              className={cn(cards && 'bg-shell p-8 md:p-10')}
              {...highlight(lobe.key)}
            >
              <div
                className={cn(
                  'transition-opacity duration-350',
                  active && active !== lobe.key && 'opacity-35',
                )}
              >
                <span className={cn('block h-px w-10', lobe.bar)} />
                <h3 className='t-h3 mt-5'>{lobe.title}</h3>
                <p className='mt-3 text-muted'>{level.text}</p>
                {level.items?.length ? (
                  <ul className='mt-5 space-y-2 font-ui text-sm text-muted'>
                    {level.items.map((item) => (
                      <li key={item} className='border-l border-ink/15 pl-4'>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </Reveal>
          );
        })}
      </div>
    </>
  );
}
