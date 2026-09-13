/**
 * The site's interface text, and the defaults it falls back to.
 *
 * Editors change these in the studio (the `interfaceText` singleton). The
 * constants here do the same two jobs as `SITE_DEFAULTS` in `site.ts`: they are
 * what the front end shows when a field is empty or the CMS is unreachable,
 * and they are what `npm run seed -- interface` writes into Sanity.
 *
 * Read the resolved values with `getInterfaceText()` from
 * `src/sanity/interface-text.ts`, never these constants directly — or an
 * editor's change will not show up.
 */
export const INTERFACE_DEFAULTS = {
  header: {
    menu: 'Menu',
    close: 'Sluiten',
    logoAlt: '&Jonk — talent, leiderschap, teams',
    homeLabel: '&Jonk, naar home',
    menuLabel: 'Hoofdmenu',
    navLabel: 'Hoofdnavigatie',
    skipLink: 'Naar de inhoud',
  },
  footer: {
    navLabel: 'Footer navigatie',
  },
  contact: {
    callPrefix: 'Bel',
    mailPrefix: 'of mail',
  },
  kennismaken: {
    title: 'Zullen we kennismaken?',
    text: 'Het eerste gesprek is een kennismaking. Wij komen kijken en stellen vragen, jij vertelt wat er speelt.',
    callButton: 'Bel',
    mailButton: 'Mail',
  },
  forms: {
    submit: 'Versturen',
    next: 'Volgende',
    back: 'Terug',
    sending: 'Versturen…',
    step: 'Stap {step} van {total}',
    recaptcha: 'Bevestig dat je geen robot bent.',
    required: '„{label}” is verplicht.',
    fileTooLarge: '„{file}” is groter dan 5 MB.',
    empty: 'Het formulier is leeg.',
    invalid: 'Dit formulier kon niet worden verwerkt. Probeer het opnieuw.',
    notConfigured: 'Dit formulier is nog niet klaar voor gebruik. Mail ons gerust direct.',
    sendError: 'Versturen is niet gelukt. Probeer het later nog eens, of mail ons direct.',
    noForm: 'Er is nog geen formulier gekoppeld aan dit blok.',
  },
  notFound: {
    eyebrow: '404',
    title: 'Deze pagina bestaat niet.',
    text: 'De link is verlopen, verplaatst of heeft nooit bestaan.',
    button: 'Naar home',
  },
};

type Defaults = typeof INTERFACE_DEFAULTS;

/** Every text filled in: the CMS value, or the default where it is empty. */
export type InterfaceText = { [G in keyof Defaults]: { [K in keyof Defaults[G]]: string } };

type Group = Record<string, string | null | undefined> | null | undefined;

/** Lay the CMS document over the defaults, field by field. */
export function resolveInterfaceText(doc: unknown): InterfaceText {
  const source = (doc ?? {}) as Record<string, Group>;
  return Object.fromEntries(
    Object.entries(INTERFACE_DEFAULTS).map(([group, fields]) => [
      group,
      Object.fromEntries(
        Object.entries(fields).map(([key, fallback]) => [key, source[group]?.[key]?.trim() || fallback]),
      ),
    ]),
  ) as InterfaceText;
}

/** `'Stap {step} van {total}'` + `{ step: 1, total: 2 }` -> `'Stap 1 van 2'`. Unknown keys stay. */
export function fillTemplate(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
