import type { ReactNode } from 'react';
import { btnOutline, btnPrimary } from '@/components/site/Links';
import { Reveal } from '@/components/site/Reveal';
import { Container } from '@/components/site/Section';
import { cn } from '@/lib/cn';
import { CONTACT } from '@/lib/nav';

export const KENNISMAKEN_TEXT =
  'Het eerste gesprek is een kennismaking. Wij komen kijken en stellen vragen, jij vertelt wat er speelt.';
export const KENNISMAKEN_TEXT_LONG = `${KENNISMAKEN_TEXT} Daarna weten we allebei of het past.`;

type KennismakenProps = {
  title?: ReactNode;
  text?: ReactNode;
  paper?: boolean;
  /** Only the mail button (podcast page). */
  mailOnly?: boolean;
};

/** Closing call-to-action band, `#kennismaken`. */
export function Kennismaken({
  title = 'Zullen we kennismaken?',
  text = KENNISMAKEN_TEXT,
  paper,
  mailOnly,
}: KennismakenProps) {
  return (
    <section id='kennismaken' className={cn('py-24 md:py-36', paper && 'bg-paper')}>
      <Container>
        <Reveal className='grid items-center gap-10 lg:grid-cols-12 lg:gap-16'>
          <div className='lg:col-span-7'>
            <h2 className='t-display'>{title}</h2>
          </div>
          <div className='lg:col-span-5'>
            <p className='t-lead max-w-prose text-muted'>{text}</p>
            <div className='mt-8 flex flex-wrap items-center gap-4'>
              {!mailOnly && (
                <a href={CONTACT.phoneHref} className={cn(btnPrimary, 'px-10')}>
                  Bel
                </a>
              )}
              <a
                href={CONTACT.emailHref}
                className={cn(mailOnly ? btnPrimary : btnOutline, 'px-10')}
              >
                Mail
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
