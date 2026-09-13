import type { ReactNode } from 'react';
import { Reveal } from '@/components/site/Reveal';
import { cn } from '@/lib/cn';

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('mx-auto max-w-7xl px-6 md:px-10', className)}>{children}</div>;
}

/** The `background` choice on a block, as section classes. */
const BACKGROUNDS = {
  default: 'border-t border-ink/10',
  paper: 'border-t border-ink/10 bg-paper',
  dark: 'bg-ink text-shell',
} as const;

export function bgClass(background?: string | null) {
  return BACKGROUNDS[(background ?? 'default') as keyof typeof BACKGROUNDS] ?? BACKGROUNDS.default;
}

/** Standard content band: vertical rhythm + container. */
export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  /** Background and borders, e.g. `bgClass(block.background)`. */
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
  dark,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  dark?: boolean;
}) {
  return (
    <Reveal className='max-w-3xl'>
      {eyebrow && <p className='eyebrow'>{eyebrow}</p>}
      <h2 className={cn('t-h2', !!eyebrow && 'mt-4')}>{title}</h2>
      {lead && <p className={cn('t-lead mt-6', dark ? 'text-shell/85' : 'text-muted')}>{lead}</p>}
    </Reveal>
  );
}
