import type { ReactNode } from 'react';
import { Reveal } from '@/components/site/Reveal';
import { Container } from '@/components/site/Section';
import { cn } from '@/lib/cn';

type PageHeroProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead: ReactNode;
  /** Rendered under the lead (buttons, contact lines). */
  actions?: ReactNode;
  /** Rendered under the two columns (photo, stats). */
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, lead, actions, children }: PageHeroProps) {
  return (
    <section id='top' className='pt-32 pb-16 md:pt-44 md:pb-24'>
      <Container>
        <div className='grid items-end gap-10 lg:grid-cols-12 lg:gap-14'>
          <Reveal className='lg:col-span-7'>
            {eyebrow && <p className='eyebrow'>{eyebrow}</p>}
            <h1 className={cn('t-display', !!eyebrow && 'mt-4')}>{title}</h1>
          </Reveal>
          <Reveal className='lg:col-span-5'>
            <p className='t-lead max-w-prose text-ink/90'>{lead}</p>
            {actions}
          </Reveal>
        </div>
        {children}
      </Container>
    </section>
  );
}
