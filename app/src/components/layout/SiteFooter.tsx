import Link from 'next/link';
import { Amp, withAmp } from '@/components/site/Amp';
import { Container } from '@/components/site/Section';
import { mailtoHref, telHref, type SiteInformation } from '@/lib/site';

const link = 'transition-colors hover:text-rose';

type FooterLink = { label: string; href: string };

type SiteFooterProps = {
  site: SiteInformation;
  /** The main navigation, repeated. */
  links: FooterLink[];
  tagline?: string | null;
  legalLinks: FooterLink[];
  copyright?: string | null;
};

/** Social buttons in the order the design shows them; a missing URL hides one. */
const SOCIAL = [
  { key: 'linkedin', label: 'LinkedIn' },
  { key: 'spotify', label: 'Spotify' },
];

export function SiteFooter({ site, links, tagline, legalLinks, copyright }: SiteFooterProps) {
  const social = SOCIAL.filter((item) => site.social[item.key]);

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
            {tagline && <p className='mt-3 font-script text-2xl text-shell/70'>{tagline}</p>}
          </div>

          <nav className='md:col-span-4' aria-label='Footer navigatie'>
            <ul className='space-y-2 font-ui text-sm'>
              {links.map((item) => (
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
              <a href={telHref(site.phone)} className={link}>
                {site.phone}
              </a>
            </p>
            <p>
              <a href={mailtoHref(site.email)} className={link}>
                {site.email}
              </a>
            </p>
            {social.length > 0 && (
              <p className='space-x-4 pt-3'>
                {social.map((item) => (
                  <a key={item.key} href={site.social[item.key]} className={link}>
                    {item.label}
                  </a>
                ))}
              </p>
            )}
          </div>
        </div>

        <div className='flex flex-col gap-4 pt-8 font-ui text-xs text-shell/55 sm:flex-row sm:items-center sm:justify-between'>
          <p>{copyright ? withAmp(copyright) : `© ${new Date().getFullYear()} ${site.name}`}</p>
          {legalLinks.length > 0 && (
            <p className='space-x-6'>
              {legalLinks.map((item) => (
                <a key={item.label} href={item.href} className='transition-colors hover:text-shell'>
                  {item.label}
                </a>
              ))}
            </p>
          )}
        </div>
      </Container>
    </footer>
  );
}
