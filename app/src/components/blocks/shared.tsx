import { ArrowLink } from '@/components/site/Links';
import { rich } from '@/components/site/Rich';
import { cn } from '@/lib/cn';
import { resolveHref, type SanityLabeledLink } from '@/lib/links';
import type { PAGE_QUERY_RESULT } from '@/sanity/sanity.types';

/** One page-builder block as `PAGE_QUERY` returns it. */
export type Block = NonNullable<NonNullable<PAGE_QUERY_RESULT>['content']>[number];
export type BlockOf<T extends Block['_type']> = Extract<Block, { _type: T }>;

type Testimonial = {
  quote?: string | null;
  name?: string | null;
  role?: string | null;
} | null;

/** A cta/link object as `{ label, href }`, or undefined when it leads nowhere. */
export function toLink(link: SanityLabeledLink | null | undefined) {
  const href = resolveHref(link);
  return link?.label && href ? { label: link.label, href } : undefined;
}

export function paras(list: string[] | null | undefined) {
  return (list ?? []).map((text) => rich(text));
}

/** The arrow link most sections end with. Nothing without a label and target. */
export function Arrow({ link, className }: { link?: SanityLabeledLink | null; className?: string }) {
  const resolved = toLink(link);
  if (!resolved) return null;
  return (
    <ArrowLink href={resolved.href} className={className}>
      {rich(resolved.label)}
    </ArrowLink>
  );
}

/** Quote + name + role, as in the design's blockquotes. */
export function TestimonialQuote({
  testimonial,
  dark,
}: {
  testimonial: Testimonial;
  dark?: boolean;
}) {
  if (!testimonial?.quote) return null;
  return (
    <>
      <p className={cn('t-quote', dark ? 'text-shell/95' : 'text-ink/90')}>
        &ldquo;{rich(testimonial.quote)}&rdquo;
      </p>
      <footer className={cn('font-ui text-sm', dark ? 'mt-6 text-shell/65' : 'mt-4 text-muted')}>
        {rich(testimonial.name)}
        {testimonial.role && (
          <span className={cn('mt-1 block', dark ? 'text-shell/50' : 'text-ink/60')}>
            {rich(testimonial.role)}
          </span>
        )}
      </footer>
    </>
  );
}
