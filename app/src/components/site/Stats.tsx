import { Reveal } from '@/components/site/Reveal';
import { rich } from '@/components/site/Rich';
import { cn } from '@/lib/cn';

export type Stat = { value?: string | null; suffix?: string | null; text?: string | null };

export function Stats({ items, dark }: { items: Stat[]; dark?: boolean }) {
  if (!items.length) return null;

  return (
    <dl
      className={cn(
        'mt-14 grid gap-12 border-t pt-12 md:mt-20 md:grid-cols-3 md:gap-8',
        dark ? 'border-shell/20' : 'border-ink/10',
      )}
    >
      {items.map((stat, i) => (
        <Reveal key={i}>
          <dt className='font-display text-6xl leading-none text-rose md:text-7xl'>
            {rich(stat.value)}
            {stat.suffix && <sup className='align-super text-3xl md:text-4xl'>{stat.suffix}</sup>}
          </dt>
          <dd className={cn('mt-4 max-w-xs', dark ? 'text-shell/75' : 'text-muted')}>
            {rich(stat.text)}
          </dd>
        </Reveal>
      ))}
    </dl>
  );
}
