import type { Metadata } from 'next';
import { SentryTest } from '@/components/SentryTest';
import { Container } from '@/components/site/Section';

/**
 * Served at `/sentry-test`: checks the Sentry connection after a deploy.
 * Not linked anywhere, not in the sitemap, and kept out of search results.
 */
export const metadata: Metadata = {
  title: 'Sentry test',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function SentryTestPage() {
  return (
    <section className='flex min-h-[70vh] items-center pt-32 pb-20 md:pt-44'>
      <Container className='w-full'>
        <h1 className='t-display mb-6'>Sentry test</h1>
        <SentryTest />
      </Container>
    </section>
  );
}
