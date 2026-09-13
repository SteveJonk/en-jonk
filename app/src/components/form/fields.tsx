import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import type { FormFieldDefinition } from '@/lib/form-fields';

/** `stacked` is the roomy page form, `compact` fits a narrow card or sidebar. */
export type FormFieldVariant = 'stacked' | 'compact';

const controlBase = 'w-full text-ink transition-colors outline-none placeholder:text-muted/70';

const VARIANTS = {
  // The design's page form: small caps labels over an underlined field.
  stacked: {
    wrapper: 'mb-6',
    label: 'block font-ui text-xs tracking-[.14em] text-muted uppercase',
    control: 'mt-2 border-b border-ink/25 bg-transparent py-3 font-body text-lg focus:border-ink',
    caretY: '28px',
    checkboxWrapper: 'my-1.5 mb-6 flex items-start gap-3',
    checkboxInput: 'mt-px size-5 shrink-0 cursor-pointer accent-steel',
    checkboxLabel: 'cursor-pointer text-sm leading-[1.6] text-muted',
  },
  compact: {
    wrapper: 'mb-4',
    label: 'mb-2 block font-ui text-sm text-ink',
    control: 'border border-ink/15 bg-paper px-4 py-3 focus:border-ink',
    caretY: '22px',
    checkboxWrapper: 'my-1 mb-5 flex items-start gap-3',
    checkboxInput: 'mt-[3px] size-5 shrink-0 cursor-pointer accent-steel',
    checkboxLabel: 'cursor-pointer text-sm leading-[1.6] text-muted',
  },
} as const satisfies Record<FormFieldVariant, Record<string, string>>;

/**
 * The dropdown chevron, drawn with two gradients so it needs no asset. Built
 * from the theme's `--color-muted`, so recolouring the theme recolours it.
 */
function selectCaret(offsetY: string) {
  return {
    backgroundImage:
      'linear-gradient(45deg,transparent 50%,var(--color-muted) 50%),linear-gradient(135deg,var(--color-muted) 50%,transparent 50%)',
    backgroundPosition: `calc(100% - 21px) ${offsetY}, calc(100% - 15px) ${offsetY}`,
    backgroundSize: '6px 6px, 6px 6px',
    backgroundRepeat: 'no-repeat',
  } as const;
}

/** Turns `[label](href)` in editor copy into a real link. */
export function linkify(text: string): ReactNode {
  const parts = text.split(/\[([^\]]+)\]\(([^)]+)\)/g);
  if (parts.length === 1) return text;

  const nodes: ReactNode[] = [];
  for (let i = 0; i < parts.length; i += 3) {
    if (parts[i]) nodes.push(parts[i]);
    if (parts[i + 1]) {
      nodes.push(
        <Link
          key={i}
          href={parts[i + 2]}
          className='text-steel underline underline-offset-[3px]'
        >
          {parts[i + 1]}
        </Link>,
      );
    }
  }
  return nodes;
}

export function FormField({
  field,
  variant = 'stacked',
  idPrefix = 'field',
}: {
  field: FormFieldDefinition;
  variant?: FormFieldVariant;
  idPrefix?: string;
}) {
  const styles = VARIANTS[variant];
  const id = `${idPrefix}-${field.name}`;
  const controlClass = cn(controlBase, styles.control);

  // Hidden fields are drawn by the renderer itself — it is the only place that
  // knows the page context their value is filled from.
  if (field.type === 'hidden') return null;

  // Checkboxes carry their own label per option, so they skip the field label.
  if (field.type === 'checkbox') {
    return (
      <>
        {(field.checkboxOptions ?? []).map((option, index) => (
          <div key={option} className={styles.checkboxWrapper}>
            <input
              type='checkbox'
              id={`${id}-${index}`}
              name={field.name}
              value={option}
              required={field.isRequired}
              className={styles.checkboxInput}
            />
            <label htmlFor={`${id}-${index}`} className={styles.checkboxLabel}>
              {linkify(option)}
            </label>
          </div>
        ))}
      </>
    );
  }

  return (
    <div className={styles.wrapper}>
      <label htmlFor={id} className={styles.label}>
        {field.label}
      </label>

      {field.type === 'textarea' ? (
        <textarea
          id={id}
          name={field.name}
          required={field.isRequired}
          placeholder={field.placeholder}
          className={cn(controlClass, 'min-h-32 resize-none leading-[1.6]')}
        />
      ) : field.type === 'select' ? (
        <select
          id={id}
          name={field.name}
          required={field.isRequired}
          // With a placeholder the empty option is the initial value, so a
          // required dropdown actually blocks submitting; without one the
          // browser preselects the first real option.
          defaultValue={field.placeholder ? '' : undefined}
          style={selectCaret(styles.caretY)}
          className={cn(controlClass, 'cursor-pointer appearance-none pr-[46px]')}
        >
          {field.placeholder ? <option value=''>{field.placeholder}</option> : null}
          {(field.selectOptions ?? []).map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      ) : field.type === 'radio' ? (
        <div className='flex flex-wrap gap-x-6 gap-y-2.5'>
          {(field.radioOptions ?? []).map((option) => (
            <label
              key={option}
              className='flex cursor-pointer items-center gap-2.5 text-[0.95rem] text-muted'
            >
              <input
                type='radio'
                name={field.name}
                value={option}
                required={field.isRequired}
                className='size-[18px] cursor-pointer accent-steel'
              />
              {option}
            </label>
          ))}
        </div>
      ) : (
        <input
          type={field.type}
          id={id}
          name={field.name}
          required={field.isRequired}
          placeholder={field.placeholder}
          className={controlClass}
        />
      )}

      {field.helpText ? (
        <p className='mt-2 text-sm text-muted'>{linkify(field.helpText)}</p>
      ) : null}
    </div>
  );
}
