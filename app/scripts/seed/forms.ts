/**
 * Seeds the shared form settings and the contact form.
 *
 * The form is a document with a fixed `_id`, so the contact page's block can
 * point at it without looking anything up.
 *
 * The mail credentials are deliberately NOT seeded: they belong in `app/.env`
 * as MAILJET_API_KEY / MAILJET_API_SECRET, which the submit route prefers over
 * anything stored in the dataset.
 */
import {SITE_DEFAULTS} from '../../src/lib/site'
import {CONTACT_FORM_FIELDS} from './contact-form-fields'
import {client, key} from './shared'

export const CONTACT_FORM_ID = 'form-contact'
export const DOWNLOAD_FORM_ID = 'form-download'

async function upsertFormSettings() {
  await client.createOrReplace({
    _id: 'formGeneralSettings',
    _type: 'formGeneralSettings' as const,
    adminEmail: SITE_DEFAULTS.email,
    fromName: SITE_DEFAULTS.name,
    confirmationSubject: 'Nieuw bericht via de website',
    confirmationMessage: 'Er is een nieuw bericht binnengekomen via het contactformulier.',
    mailFooter: 'Verstuurd via het formulier „{form}” op de website van {site}.',
    primaryColor: '#bd7875',
    textColor: '#162029',
    recaptchaEnabled: false,
  })

  console.log('✓ form settings singleton upserted')
}

async function upsertContactForm() {
  await client.createOrReplace({
    _id: CONTACT_FORM_ID,
    _type: 'form' as const,
    title: 'Contact',
    showTitle: false,
    mode: 'simple',
    fields: CONTACT_FORM_FIELDS.map((field) => ({
      ...field,
      _type: 'formField' as const,
      _key: key(field.name),
    })),
    submitButtonText: 'Versturen',
    successTitle: 'Bedankt voor je bericht',
    successBody: 'We nemen zo snel mogelijk contact met je op.',
    redirectAfterSubmit: false,
    sendCopyToSubmitter: false,
  })

  console.log('✓ contact form upserted')
}

/** What a visitor leaves before a Kennisbank PDF. The route adds which PDF to the mail. */
export async function upsertDownloadForm() {
  await client.createOrReplace({
    _id: DOWNLOAD_FORM_ID,
    _type: 'form' as const,
    title: 'Download',
    showTitle: false,
    mode: 'simple',
    fields: [
      {label: 'Naam', name: 'naam', type: 'text', width: 'full', isRequired: true},
      {label: 'E-mailadres', name: 'email', type: 'email', width: 'full', isRequired: true},
      {label: 'Organisatie', name: 'organisatie', type: 'text', width: 'full'},
    ].map((field) => ({...field, _type: 'formField' as const, _key: key(`download:${field.name}`)})),
    submitButtonText: 'Naar de download',
    successTitle: 'Je download staat klaar',
    successBody: 'Veel leesplezier.',
    redirectAfterSubmit: false,
    mailSubject: 'Nieuwe download via de Kennisbank',
    mailMessage: 'Iemand heeft een PDF uit de Kennisbank gedownload.',
    sendCopyToSubmitter: true,
    copySubject: 'Je download van &Jonk',
    copyMessage: 'Bedankt voor je interesse. Hieronder vind je de link naar de PDF.',
  })

  console.log('✓ download form upserted')
}

export async function seedForms() {
  console.log('Forms')
  await upsertFormSettings()
  await upsertContactForm()
  await upsertDownloadForm()
}
