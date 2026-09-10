import { Reveal } from '@/components/site/Reveal';
import { cn } from '@/lib/cn';

const STATS = [
  {
    value: (
      <>
        7<sup className='align-super text-3xl md:text-4xl'>e</sup>
      </>
    ),
    text: (
      <>
        keer dat de leergang <span className='tbd'>[naam leergang]</span> dit jaar draait.
      </>
    ),
  },
  { value: '2018', text: 'het jaar waarin we de eerste traineeships gingen begeleiden.' },
  {
    value: <span className='tbd'>[cijfer]</span>,
    text: 'doorstroom bij een gemeente van ruim 500 medewerkers.',
  },
];

export function Stats({ dark }: { dark?: boolean }) {
  return (
    <dl
      className={cn(
        'mt-14 grid gap-12 border-t pt-12 md:mt-20 md:grid-cols-3 md:gap-8',
        dark ? 'border-shell/20' : 'border-ink/10',
      )}
    >
      {STATS.map((stat, i) => (
        <Reveal key={i}>
          <dt className='font-display text-6xl leading-none text-rose md:text-7xl'>{stat.value}</dt>
          <dd className={cn('mt-4 max-w-xs', dark ? 'text-shell/75' : 'text-muted')}>
            {stat.text}
          </dd>
        </Reveal>
      ))}
    </dl>
  );
}
