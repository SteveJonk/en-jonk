import Link from 'next/link';
import { Amp, withAmp } from '@/components/site/Amp';
import { Container } from '@/components/site/Section';
import { CONTACT, NAV } from '@/lib/nav';

const link = 'transition-colors hover:text-rose';

export function SiteFooter() {
  return (
    <footer className='bg-ink pt-16 pb-10 text-shell/80 md:pt-20'>
      <Container>
        <div className='grid gap-10 border-b border-shell/15 pb-12 md:grid-cols-12 md:gap-8'>
          <div className='md:col-span-5'>
            <Link
              href='/'
              className='inline-block font-mark text-4xl text-shell transition-colors hover:text-shell/80'
            >
              <Amp />
              Jonk
            </Link>
            <p className='mt-3 font-script text-2xl text-shell/70'>talent · leiderschap · teams</p>
          </div>

          <nav className='md:col-span-4' aria-label='Footer navigatie'>
            <ul className='space-y-2 font-ui text-sm'>
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={link}>
                    {withAmp(item.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className='space-y-2 font-ui text-sm md:col-span-3'>
            <p>
              <a href={CONTACT.phoneHref} className={link}>
                {CONTACT.phone}
              </a>
            </p>
            <p>
              <a href={CONTACT.emailHref} className={link}>
                {CONTACT.email}
              </a>
            </p>
            <p className='space-x-4 pt-3'>
              <a href={CONTACT.linkedin} className={link}>
                LinkedIn
              </a>
              <a href={CONTACT.spotify} className={link}>
                Spotify
              </a>
            </p>
          </div>
        </div>

        <div className='flex flex-col gap-4 pt-8 font-ui text-xs text-shell/55 sm:flex-row sm:items-center sm:justify-between'>
          <p>&copy; 2026 &amp;Jonk</p>
          <p className='space-x-6'>
            <a href='#' className='transition-colors hover:text-shell'>
              Privacyverklaring
            </a>
            <a href='#' className='transition-colors hover:text-shell'>
              Algemene voorwaarden
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
