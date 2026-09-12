import { Reveal } from '@/components/site/Reveal';
import { rich } from '@/components/site/Rich';

export type Kenmerk = { title?: string | null; text?: string | null };

/** The three things clients name, in their own words. */
export function Kenmerken({ items }: { items: Kenmerk[] }) {
  return (
    <ol className='divide-y divide-ink/10 border-y border-ink/10'>
      {items.map((item, i) => (
        <Reveal as='li' key={i} className='py-8 md:py-10'>
          <p className='t-quote'>{rich(item.title)}</p>
          <p className='mt-4 max-w-prose text-muted'>{rich(item.text)}</p>
        </Reveal>
      ))}
    </ol>
  );
}
