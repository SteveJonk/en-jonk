import Link from 'next/link';
import { btnPrimary } from '@/components/site/Links';
import { rich } from '@/components/site/Rich';
import { Container } from '@/components/site/Section';
import { cn } from '@/lib/cn';
import { getInterfaceText } from '@/sanity/interface-text';

export default async function NotFound() {
  const { notFound } = await getInterfaceText();

  return (
    <section className='flex min-h-[70vh] items-center pt-32 pb-20 md:pt-44'>
      <Container>
        <p className='eyebrow'>{notFound.eyebrow}</p>
        <h1 className='t-display mt-4'>{rich(notFound.title)}</h1>
        <p className='t-lead mt-6 max-w-prose text-muted'>{rich(notFound.text)}</p>
        <Link href='/' className={cn(btnPrimary, 'mt-8 px-10')}>
          {notFound.button}
        </Link>
      </Container>
    </section>
  );
}
