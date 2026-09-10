import type { Metadata } from 'next';
import { KENNISMAKEN_TEXT_LONG } from '@/components/site/Kennismaken';
import { ArrowLink, btnPrimary } from '@/components/site/Links';
import { PageHero } from '@/components/site/PageHero';
import { Reveal } from '@/components/site/Reveal';
import { Container, Section } from '@/components/site/Section';
import { cn } from '@/lib/cn';
import { CONTACT } from '@/lib/nav';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Neem contact op met &Jonk voor een kennismakingsgesprek: bel, mail of stuur een bericht.',
};

const label = 'block font-ui text-xs tracking-[.14em] text-muted uppercase';
const input =
  'mt-2 w-full border-b border-ink/25 bg-transparent py-3 font-body text-lg outline-none transition-colors focus:border-ink';

function Field({
  id,
  children,
  type = 'text',
  required,
}: {
  id: string;
  children: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className={label}>
        {children}
      </label>
      <input type={type} id={id} name={id} required={required} className={input} />
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow='Contact' title='Zullen we kennismaken?' lead={KENNISMAKEN_TEXT_LONG} />

      <Section className='border-t border-ink/10 bg-paper'>
        <div className='grid gap-10 lg:grid-cols-12 lg:gap-16'>
          <Reveal className='lg:col-span-5'>
            <p className='eyebrow'>Direct contact</p>
            <dl className='mt-6 space-y-6 font-ui'>
              <div>
                <dt className='text-sm text-muted'>Telefoon</dt>
                <dd className='t-h3 mt-1'>
                  <a href={CONTACT.phoneHref} className='transition-colors hover:text-rose'>
                    {CONTACT.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className='text-sm text-muted'>E-mail</dt>
                <dd className='t-h3 mt-1'>
                  <a href={CONTACT.emailHref} className='transition-colors hover:text-rose'>
                    {CONTACT.email}
                  </a>
                </dd>
              </div>
            </dl>
            <p className='mt-8 space-x-6 font-ui text-sm tracking-[.1em] uppercase'>
              <a href={CONTACT.linkedin} className='text-steel transition-colors hover:text-rose'>
                LinkedIn
              </a>
              <a href={CONTACT.spotify} className='text-steel transition-colors hover:text-rose'>
                Spotify
              </a>
            </p>
          </Reveal>

          <Reveal className='lg:col-span-7'>
            <p className='eyebrow'>Stuur een bericht</p>
            {/* Opens the mail client for now; wire to /api/submit-form once Sanity forms are hooked up. */}
            <form
              className='mt-6 space-y-6'
              action={CONTACT.emailHref}
              method='post'
              encType='text/plain'
            >
              <div className='grid gap-6 sm:grid-cols-2'>
                <Field id='naam' required>
                  Naam
                </Field>
                <Field id='organisatie'>Organisatie</Field>
              </div>
              <Field id='email' type='email' required>
                E-mailadres
              </Field>
              <div>
                <label htmlFor='bericht' className={label}>
                  Wat speelt er?
                </label>
                <textarea
                  id='bericht'
                  name='bericht'
                  rows={4}
                  required
                  className={cn(input, 'resize-none')}
                />
              </div>
              <button type='submit' className={cn(btnPrimary, 'px-10')}>
                Versturen
              </button>
              <p className='font-ui text-xs text-muted'>
                Dit formulier opent je e-mailprogramma. Voor een echte verzendfunctie is een koppeling
                met de techniek van de uiteindelijke site nodig.
              </p>
            </form>
          </Reveal>
        </div>
      </Section>

      <section className='border-t border-ink/10 py-16 md:py-24'>
        <Container>
          <Reveal className='grid items-center gap-10 lg:grid-cols-12'>
            <div className='lg:col-span-7'>
              <p className='eyebrow'>Op de hoogte blijven</p>
              <h2 className='t-h2 mt-4'>Nieuwe podcastafleveringen in je inbox</h2>
            </div>
            <div className='lg:col-span-5'>
              <p className='max-w-prose text-muted'>
                Liever gewoon meeluisteren? De podcast{' '}
                <em className='font-display not-italic'>In Gesprek</em> staat op Spotify en Apple
                Podcasts.
              </p>
              <p className='mt-4'>
                <ArrowLink href='/podcast'>Naar de podcast</ArrowLink>
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
