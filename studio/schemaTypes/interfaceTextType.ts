import {ComposeIcon} from '@sanity/icons/Compose'
import {defineField, defineType} from 'sanity'

/**
 * The site's own interface text: labels that appear on every page (header,
 * footer), the defaults behind blocks, form messages and the 404 page.
 *
 * A singleton. Page copy does not belong here — it lives on the blocks. The
 * app keeps the same texts as fallbacks (`src/lib/interface-text.ts`), which
 * is also what `npm run seed -- interface` writes.
 */
type Field = [name: string, title: string, description?: string, rows?: number]

function group(name: string, title: string, description: string, fields: Field[]) {
  return defineField({
    name,
    title,
    description,
    type: 'object',
    options: {collapsible: true, collapsed: false},
    fields: fields.map(([fieldName, fieldTitle, fieldDescription, rows]) =>
      rows
        ? defineField({name: fieldName, title: fieldTitle, description: fieldDescription, type: 'text', rows})
        : defineField({name: fieldName, title: fieldTitle, description: fieldDescription, type: 'string'}),
    ),
  })
}

const SCREEN_READER = 'Read out by screen readers; not shown.'

export const interfaceTextType = defineType({
  name: 'interfaceText',
  title: 'Interface text',
  type: 'document',
  icon: ComposeIcon,
  fields: [
    group('header', 'Header', 'The top bar and the menu overlay.', [
      ['menu', 'Menu button'],
      ['close', 'Close button'],
      ['logoAlt', 'Logo alt text', SCREEN_READER],
      ['homeLabel', 'Home link label', SCREEN_READER],
      ['menuLabel', 'Menu overlay label', SCREEN_READER],
      ['navLabel', 'Main navigation label', SCREEN_READER],
      ['skipLink', 'Skip link', 'Shown to keyboard users at the very top of every page.'],
    ]),
    group('footer', 'Footer', 'The footer at the bottom of every page.', [
      ['navLabel', 'Footer navigation label', SCREEN_READER],
    ]),
    group('contact', 'Contact lines', '"Bel … / of mail …" in the page hero and the menu overlay.', [
      ['callPrefix', 'Before the phone number'],
      ['mailPrefix', 'Before the e-mail address'],
    ]),
    group('kennismaken', 'Kennismaken', 'The closing call-to-action band. A block with its own title or text overrides these.', [
      ['title', 'Default title'],
      ['text', 'Default text', undefined, 3],
      ['callButton', 'Call button'],
      ['mailButton', 'Mail button'],
    ]),
    group('forms', 'Forms', 'Buttons and messages of every form. Button texts set on a form override the first three.', [
      ['submit', 'Send button'],
      ['next', 'Next step button'],
      ['back', 'Back button'],
      ['sending', 'While sending'],
      ['step', 'Step counter', 'Use {step} and {total}, e.g. "Stap {step} van {total}".'],
      ['recaptcha', 'reCAPTCHA not ticked'],
      ['required', 'Required field missing', 'Use {label} for the field name.'],
      ['fileTooLarge', 'File too large', 'Use {file} for the file name.'],
      ['empty', 'Form sent empty'],
      ['invalid', 'Form could not be processed'],
      ['notConfigured', 'Form not set up yet', 'Shown when mail settings are missing.'],
      ['sendError', 'Sending failed', undefined, 2],
      ['noForm', 'No form picked', 'Shown in a contact form block that has no form selected.'],
    ]),
    group('notFound', '404 page', 'Shown for an address that does not exist. The title is also the page title.', [
      ['eyebrow', 'Eyebrow'],
      ['title', 'Title'],
      ['text', 'Text', undefined, 2],
      ['button', 'Button'],
    ]),
  ],
  preview: {
    prepare() {
      return {title: 'Interface text'}
    },
  },
})
