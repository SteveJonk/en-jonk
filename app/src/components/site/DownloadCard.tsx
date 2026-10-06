'use client';

import { useRef, type ReactNode } from 'react';
import { FormRenderer, type FormRecaptcha } from '@/components/form/FormRenderer';
import { btnOutline, btnPrimary } from '@/components/site/Links';
import { CARD } from '@/components/site/Section';
import { cn } from '@/lib/cn';
import type { FormDefinition } from '@/lib/form-fields';
import type { InterfaceText } from '@/lib/interface-text';

/**
 * A PDF card. The button opens a dialog with the download form; once that is
 * sent, the submit route hands back the file and the dialog offers it.
 * The native <dialog> brings Escape, focus trapping and the backdrop.
 */
export function DownloadCard({
  id,
  title,
  plainTitle,
  description,
  meta,
  bar,
  form,
  recaptcha,
  labels,
  text,
}: {
  id: string;
  title: ReactNode;
  /** The title as text, for the dialog heading. */
  plainTitle: string;
  description?: ReactNode;
  /** "PDF · 1,2 MB" */
  meta: string;
  bar: string;
  form: FormDefinition;
  recaptcha?: FormRecaptcha;
  labels: InterfaceText['forms'];
  text: InterfaceText['kennisbank'];
}) {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <article className={cn('flex flex-col p-8 md:p-10', CARD)}>
      <span className={cn('mb-5 block h-px w-10', bar)} />
      <p className='font-ui text-xs tracking-[.14em] text-muted uppercase'>{meta}</p>
      <h3 className='t-h3 mt-3'>{title}</h3>
      {description && <p className='mt-3 text-muted'>{description}</p>}
      <p className='mt-auto pt-8'>
        <button
          type='button'
          onClick={() => dialog.current?.showModal()}
          className={cn(btnOutline, 'cursor-pointer gap-2 px-7')}
        >
          {text.downloadButton}
        </button>
      </p>

      <dialog
        ref={dialog}
        aria-label={plainTitle}
        // A click on the backdrop lands on the dialog itself.
        onClick={(event) => event.target === event.currentTarget && dialog.current?.close()}
        className='m-auto w-[calc(100%-2rem)] max-w-lg bg-paper p-0 text-ink backdrop:bg-ink/60'
      >
        <div className='relative p-8 md:p-10'>
          <button
            type='button'
            onClick={() => dialog.current?.close()}
            aria-label={text.close}
            className='absolute top-4 right-4 grid size-10 cursor-pointer place-items-center text-muted hover:text-ink'
          >
            <svg width='16' height='16' viewBox='0 0 16 16' fill='none' aria-hidden='true'>
              <path d='m3 3 10 10M13 3 3 13' stroke='currentColor' strokeWidth='1.5' />
            </svg>
          </button>
          <FormRenderer
            form={form}
            title={plainTitle}
            recaptcha={recaptcha}
            labels={labels}
            extra={{ downloadId: id }}
            footer={<p className='mt-4 text-xs leading-[1.6] text-muted'>{text.downloadPrivacy}</p>}
            afterSuccess={(result) =>
              result.fileUrl ? (
                <p className='mt-6 text-center'>
                  <a href={result.fileUrl} className={cn(btnPrimary, 'px-10')}>
                    {text.downloadReady}
                  </a>
                </p>
              ) : null
            }
          />
        </div>
      </dialog>
    </article>
  );
}
