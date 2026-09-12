'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { withAmp } from '@/components/site/Amp';
import { ContactLines } from '@/components/site/Links';
import { useStickyTopbar } from '@/hooks/useStickyTopbar';
import { cn } from '@/lib/cn';

const bar = 'mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:h-24 md:px-10';
const toggle = 'flex cursor-pointer items-center gap-3 px-1 py-3 font-ui text-sm tracking-[.18em] uppercase';
const rise = 'transition-[opacity,transform] duration-500 ease-brand';

/* eslint-disable @next/next/no-img-element -- static SVG logo */
function Logo(props: { alt: string }) {
  return <img src='/jonk-logo.svg' alt={props.alt} className='h-7 w-auto md:h-8' />;
}

type SiteHeaderProps = {
  /** Main navigation, from the `navigation` document. `&` renders as the brand ampersand. */
  links: { label: string; href: string }[];
  phone: string;
  email: string;
};

/** Fixed top bar + full-screen menu overlay (used at every width). */
export function SiteHeader({ links, phone, email }: SiteHeaderProps) {
  const scrolled = useStickyTopbar();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const openButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) closeButton.current?.focus();
    else if (wasOpen.current) openButton.current?.focus();
    wasOpen.current = open;

    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300',
          scrolled ? 'border-ink/10 bg-shell/88 backdrop-blur-[8px]' : 'border-transparent',
        )}
      >
        <div className={bar}>
          <Link href='/' aria-label='&Jonk, naar home' className='block'>
            <Logo alt='&Jonk — talent, leiderschap, teams' />
          </Link>
          <button
            ref={openButton}
            type='button'
            aria-expanded={open}
            aria-controls='site-menu'
            onClick={() => setOpen(true)}
            className={cn(toggle, 'group')}
          >
            <span>Menu</span>
            <span className='flex w-6 flex-col gap-[5px]' aria-hidden>
              <span className='block h-px w-6 bg-ink transition-transform duration-300 group-hover:translate-x-1' />
              <span className='block h-px w-6 bg-ink transition-transform duration-300 group-hover:-translate-x-1' />
              <span className='block h-px w-6 bg-ink transition-transform duration-300 group-hover:translate-x-1' />
            </span>
          </button>
        </div>
      </header>

      {/* Fades in; the items rise one by one. `invisible` keeps it out of the tab order when closed. */}
      <div
        id='site-menu'
        role='dialog'
        aria-modal='true'
        aria-label='Hoofdmenu'
        className={cn(
          'fixed inset-0 z-50 bg-shell duration-200 ease-out',
          // Visible at once on open so the close button can take focus; hidden only after the fade on close.
          open
            ? 'visible opacity-100 transition-opacity'
            : 'invisible opacity-0 transition-[opacity,visibility]',
        )}
      >
        <div className='mx-auto max-w-7xl px-6 md:px-10'>
          <div className='flex h-20 items-center justify-between md:h-24'>
            <Logo alt='' />
            <button ref={closeButton} type='button' onClick={close} className={toggle}>
              <span>Sluiten</span>
              <span className='relative block size-6' aria-hidden>
                <span className='absolute top-1/2 left-0 h-px w-6 rotate-45 bg-ink' />
                <span className='absolute top-1/2 left-0 h-px w-6 -rotate-45 bg-ink' />
              </span>
            </button>
          </div>

          <nav className='mt-10 md:mt-16' aria-label='Hoofdnavigatie'>
            <ul className='space-y-2 md:space-y-3'>
              {links.map((link, i) => (
                <li
                  key={link.href}
                  className={cn(rise, open ? 'translate-y-0 opacity-100' : 'translate-y-[18px] opacity-0')}
                  style={{ transitionDelay: open ? `${180 + i * 60}ms` : '0ms' }}
                >
                  <Link
                    href={link.href}
                    onClick={close}
                    aria-current={
                      pathname === link.href || pathname.startsWith(`${link.href}/`)
                        ? 'page'
                        : undefined
                    }
                    className='t-h2 inline-block transition-colors hover:text-rose'
                  >
                    {withAmp(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ContactLines
            phone={phone}
            email={email}
            className={cn(
              'mt-12 md:mt-16',
              rise,
              open ? 'translate-y-0 opacity-100' : 'translate-y-[18px] opacity-0',
            )}
            style={{ transitionDelay: '620ms' }}
          />
        </div>
      </div>
    </>
  );
}
