import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SentryTest } from '@/components/SentryTest';
import { Container } from '@/components/site/Section';
import { isSentryTestSecret } from '@/lib/sentry-test';

/**
 * Served at `/sentry-test?secret=<SENTRY_TEST_SECRET>`: checks the Sentry connection
 * after a deploy. Without the right secret it is a 404. Not linked anywhere, not
 * in the sitemap, and kept out of search results.
 */
export const metadata: Metadata = {
  title: 'Sentry test',
  // The secret is in the URL; don't hand it to sites linked from the header/footer.
  referrer: 'no-referrer',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

type PageProps = { searchParams: Promise<{ secret?: string | string[] }> };

export default async function SentryTestPage({ searchParams }: PageProps) {
  const { secret } = await searchParams;
  if (typeof secret !== 'string' || !isSentryTestSecret(secret)) notFound();

  return (
    <section className='flex min-h-[70vh] items-center pt-32 pb-20 md:pt-44'>
      <Container className='w-full'>
        <h1 className='t-display mb-6'>Sentry test</h1>
        <SentryTest secret={secret} />
      </Container>
    </section>
  );
}
