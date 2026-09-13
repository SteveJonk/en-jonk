/**
 * The fields of the seeded contact form, as in the design: naam and
 * organisatie side by side, then e-mail and the message. Kept apart from
 * `forms.ts` so `check-form.ts` can import it without a Sanity client.
 */
export const CONTACT_FORM_FIELDS = [
  { label: 'Naam', name: 'naam', type: 'text', width: 'half', isRequired: true },
  { label: 'Organisatie', name: 'organisatie', type: 'text', width: 'half' },
  { label: 'E-mailadres', name: 'email', type: 'email', width: 'full', isRequired: true },
  { label: 'Wat speelt er?', name: 'bericht', type: 'textarea', width: 'full', isRequired: true },
  // Not drawn: tells the mail which page the form was sent from. The value is
  // filled in by the renderer from the page context.
  { label: 'Pagina', name: 'pagina', type: 'hidden', defaultValue: '{{path}}' },
] as const satisfies ReadonlyArray<{
  label: string;
  name: string;
  type: 'text' | 'email' | 'textarea' | 'hidden';
  width?: 'full' | 'half';
  isRequired?: boolean;
  defaultValue?: string;
}>;
