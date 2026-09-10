import type { ReactNode } from 'react';
import { Reveal } from '@/components/site/Reveal';
import { cn } from '@/lib/cn';

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('mx-auto max-w-7xl px-6 md:px-10', className)}>{children}</div>;
}

/** Standard content band: vertical rhythm + container. */
export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  /** Background and borders, e.g. `bg-paper border-t border-ink/10`. */
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn('py-20 md:py-32', className)}>
      <Container>{children}</Container>
    </section>
  );
}

/** Eyebrow + heading + optional lead, revealed as one block. */
export function SectionHead({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
}) {
  return (
    <Reveal className='max-w-3xl'>
      {eyebrow && <p className='eyebrow'>{eyebrow}</p>}
      <h2 className={cn('t-h2', !!eyebrow && 'mt-4')}>{title}</h2>
      {lead && <p className='t-lead mt-6 text-muted'>{lead}</p>}
    </Reveal>
  );
}
