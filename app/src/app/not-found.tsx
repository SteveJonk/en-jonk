import Link from 'next/link';
import { btnPrimary } from '@/components/site/Links';
import { Container } from '@/components/site/Section';
import { cn } from '@/lib/cn';

export default function NotFound() {
  return (
    <section className='flex min-h-[70vh] items-center pt-32 pb-20 md:pt-44'>
      <Container>
        <p className='eyebrow'>404</p>
        <h1 className='t-display mt-4'>Deze pagina bestaat niet.</h1>
        <p className='t-lead mt-6 max-w-prose text-muted'>
          De link is verlopen, verplaatst of heeft nooit bestaan.
        </p>
        <Link href='/' className={cn(btnPrimary, 'mt-8 px-10')}>
          Naar home
        </Link>
      </Container>
    </section>
  );
}
