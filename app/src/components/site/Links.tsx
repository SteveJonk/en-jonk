import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { mailtoHref, telHref } from '@/lib/site';

const btnBase =
  'inline-flex items-center py-4 font-ui text-sm tracking-[.14em] uppercase transition-colors duration-300';

/** Add horizontal padding at the call site: `px-10`, or `gap-2 px-7`. */
export const btnPrimary = `${btnBase} bg-rose text-ink hover:bg-ink hover:text-shell`;
export const btnOutline = `${btnBase} border border-ink/25 hover:border-ink`;

type ArrowLinkProps = {
  href: string;
  children: ReactNode;
  /** Colour and spacing. Defaults to steel. */
  className?: string;
  /** Arrow points back, on the left. */
  back?: boolean;
};

export function ArrowLink({ href, children, className = 'text-steel', back }: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center gap-3 font-ui text-sm tracking-[.14em] uppercase',
        className,
      )}
    >
      {back && (
        <span aria-hidden className='transition-transform duration-300 group-hover:-translate-x-1'>
          &larr;
        </span>
      )}
      <span className='link-underline'>{children}</span>
      {!back && (
        <span aria-hidden className='transition-transform duration-300 group-hover:translate-x-1'>
          &rarr;
        </span>
      )}
    </Link>
  );
}

/** "Bel … of mail …" */
export function ContactLines({
  phone,
  email,
  className,
  style,
}: {
  phone: string;
  email: string;
  className?: string;
  style?: CSSProperties;
}) {
  const link = 'text-ink transition-colors hover:text-rose';

  return (
    <p className={cn('font-ui text-sm text-muted', className)} style={style}>
      Bel{' '}
      <a href={telHref(phone)} className={link}>
        {phone}
      </a>
      <br />
      of mail{' '}
      <a href={mailtoHref(email)} className={link}>
        {email}
      </a>
    </p>
  );
}
