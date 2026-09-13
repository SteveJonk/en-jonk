import type { Metadata } from 'next';
import { Jost, Spectral } from 'next/font/google';
import localFont from 'next/font/local';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { TrackingScriptsBody, TrackingScriptsHead } from '@/components/TrackingScripts';
import { JsonLd } from '@/components/JsonLd';
import { siteJsonLd } from '@/lib/json-ld';
import { toLabeledHref, type SanityLabeledLink } from '@/lib/links';
import { SITE_URL } from '@/lib/site';
import { safeFetch } from '@/sanity/client';
import { FOOTER_QUERY, NAVIGATION_QUERY } from '@/sanity/queries';
import type {
  FOOTER_QUERY_RESULT,
  NAVIGATION_QUERY_RESULT,
} from '@/sanity/sanity.types';
import { getInterfaceText } from '@/sanity/interface-text';
import { getSiteInformation } from '@/sanity/site-information';
import './globals.css';

// Brand faces, self-hosted from app/designs/assets/fonts.
const cardillac = localFont({
  src: './fonts/cardillac-light.woff2',
  weight: '300',
  variable: '--font-cardillac-src',
});
const rameau = localFont({
  src: './fonts/rameau-regular.woff2',
  weight: '400',
  variable: '--font-rameau-src',
});
const elettra = localFont({
  src: './fonts/elettra.woff',
  weight: '400',
  variable: '--font-elettra-src',
});
const mitchaella = localFont({
  src: './fonts/mitchaella.woff2',
  weight: '400',
  variable: '--font-mitchaella-src',
});

const spectral = Spectral({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-spectral-src',
});
const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jost-src',
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteInformation();
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: site.name, template: `${site.name} — %s` },
    description: site.description,
    openGraph: { type: 'website', siteName: site.name },
  };
}

const options = { next: { revalidate: 30 } };

/** Resolved `{ label, href }` pairs; links that resolve to nothing are dropped. */
function toLinks(links: SanityLabeledLink[] | null | undefined) {
  return (links ?? []).map(toLabeledHref).filter((link) => link !== undefined);
}

const fonts = [cardillac, rameau, elettra, mitchaella, spectral, jost]
  .map((font) => font.variable)
  .join(' ');

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Header and footer degrade instead of throwing: a CMS outage should not take
  // every page down with it. Page content does fail loudly — see `CmsPage`.
  const [site, ui, navigation, footer] = await Promise.all([
    getSiteInformation(),
    getInterfaceText(),
    safeFetch<NAVIGATION_QUERY_RESULT>(NAVIGATION_QUERY, {}, options),
    safeFetch<FOOTER_QUERY_RESULT>(FOOTER_QUERY, {}, options),
  ]);
  const links = toLinks(navigation?.links);

  return (
    <html lang={site.language} data-scroll-behavior='smooth' className={fonts}>
      <head>
        <TrackingScriptsHead />
      </head>
      <body>
        {/* Vendor-specified position: first element inside <body>. */}
        <TrackingScriptsBody />
        <JsonLd data={siteJsonLd(site)} />
        <a
          href='#main'
          className='sr-only font-ui text-sm focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-shell'
        >
          {ui.header.skipLink}
        </a>
        <SiteHeader
          links={links}
          phone={site.phone}
          email={site.email}
          labels={ui.header}
          contact={ui.contact}
        />
        <main id='main'>{children}</main>
        <SiteFooter
          site={site}
          navLabel={ui.footer.navLabel}
          links={links}
          tagline={footer?.tagline}
          legalLinks={toLinks(footer?.legalLinks)}
          copyright={footer?.copyright}
        />
      </body>
    </html>
  );
}
