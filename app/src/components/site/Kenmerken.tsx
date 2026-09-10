import { Reveal } from '@/components/site/Reveal';

const ITEMS = [
  {
    title: 'Ze komen terug om de persoon.',
    text: 'Je krijgt vakmensen die zichzelf meenemen. Er zijn veel trainers met een trucje, een methodiek en veel ervaring; het verschil is dat hier echt het hart erin zit.',
  },
  {
    title: 'Eerlijkheid als onderscheid.',
    text: 'Ook als het spannend is, richting directie en richting team. En we zeggen nee als een vraag bij ons niet past. Opdrachtgevers noemen dat als reden om ons te kiezen.',
  },
  {
    title: 'Aanvoelen gaat voor een methode.',
    text: 'Op maat werken, mensen op hun gemak stellen en voelen dat de een nog niet zo ver is als de ander. Vaste methodieken en protocollen zijn als houvast losgelaten.',
  },
];

/** The three things clients name, in their own words. */
export function Kenmerken() {
  return (
    <ol className='divide-y divide-ink/10 border-y border-ink/10'>
      {ITEMS.map((item) => (
        <Reveal as='li' key={item.title} className='py-8 md:py-10'>
          <p className='t-quote'>{item.title}</p>
          <p className='mt-4 max-w-prose text-muted'>{item.text}</p>
        </Reveal>
      ))}
    </ol>
  );
}
