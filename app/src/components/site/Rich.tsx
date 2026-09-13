import { Fragment, type ReactNode } from 'react';
import { withAmp } from '@/components/site/Amp';

const TOKEN = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]|\n)/;

/**
 * Editor text to JSX, so CMS copy can carry the few marks the design uses:
 * `&` becomes the brand ampersand, `**bold**`, `*italic*` (the display face,
 * as for *In Gesprek*), `[placeholder]` in the dashed "still to be delivered"
 * style, and a line break stays a line break — `breakClass` styles that
 * `<br>`, e.g. `hidden sm:block` in headings.
 */
export function rich(text: string | null | undefined, breakClass?: string): ReactNode {
  if (!text) return null;

  return text.split(TOKEN).map((part, i) => {
    if (!part) return null;
    if (part === '\n') return <br key={i} className={breakClass} />;
    if (part.length > 4 && part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className='font-medium text-ink'>
          {withAmp(part.slice(2, -2))}
        </strong>
      );
    }
    if (part.length > 2 && part.startsWith('*') && part.endsWith('*')) {
      return (
        <em key={i} className='font-display not-italic'>
          {withAmp(part.slice(1, -1))}
        </em>
      );
    }
    if (part.startsWith('[') && part.endsWith(']')) {
      return (
        <span key={i} className='tbd'>
          {part}
        </span>
      );
    }
    return <Fragment key={i}>{withAmp(part)}</Fragment>;
  });
}
