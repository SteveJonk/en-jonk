import type { Metadata } from 'next';
import { Jost, Spectral } from 'next/font/google';
import localFont from 'next/font/local';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { TrackingScriptsBody, TrackingScriptsHead } from '@/components/TrackingScripts';
import { SITE_URL } from '@/lib/site';
import './globals.css';

// SANITY — disabled while the pages are built statically. Re-enable when the
// CMS is wired up: site information, navigation, footer and JSON-LD came from here.
// import { JsonLd } from '@/components/JsonLd';
// import { siteJsonLd } from '@/lib/json-ld';
// import { toLabeledHref, type SanityLabeledLink } from '@/lib/links';
// import { type FooterLinkGroup, type NavLink } from '@/lib/site';
// import { safeFetch } from '@/sanity/client';
// import { FOOTER_QUERY, NAVIGATION_QUERY } from '@/sanity/queries';
// import { getSiteInformation } from '@/sanity/site-information';
//
// export async function generateMetadata(): Promise<Metadata> {
//   const site = await getSiteInformation();
//   return {
//     metadataBase: new URL(SITE_URL),
//     title: { default: site.name, template: `%s - ${site.name}` },
//     description: site.description,
//     openGraph: { type: 'website', siteName: site.name },
//   };
// }
//
// Inside RootLayout:
//   const [site, navigation, footer] = await Promise.all([
//     getSiteInformation(),
//     safeFetch<SanityNavigation>(NAVIGATION_QUERY, {}, { next: { revalidate: 30 } }),
//     safeFetch<SanityFooter>(FOOTER_QUERY, {}, { next: { revalidate: 30 } }),
//   ]);
//   <JsonLd data={siteJsonLd(site)} />

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: '&Jonk — talent, leiderschap, teams',
    template: '&Jonk — %s',
  },
  description:
    '&Jonk is ontwikkelpartner voor organisaties in het publieke domein. Ontwikkel je de mens, je ontwikkelt de organisatie.',
  openGraph: { type: 'website', siteName: '&Jonk' },
};

const fonts = [cardillac, rameau, elettra, mitchaella, spectral, jost]
  .map((font) => font.variable)
  .join(' ');

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='nl' data-scroll-behavior='smooth' className={fonts}>
      <head>
        <TrackingScriptsHead />
      </head>
      <body>
        {/* Vendor-specified position: first element inside <body>. */}
        <TrackingScriptsBody />
        <a
          href='#main'
          className='sr-only font-ui text-sm focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-shell'
        >
          Naar de inhoud
        </a>
        <SiteHeader />
        <main id='main'>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
