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

async function upsertFormSettings() {
  await client.createOrReplace({
    _id: 'formGeneralSettings',
    _type: 'formGeneralSettings' as const,
    adminEmail: SITE_DEFAULTS.email,
    fromName: SITE_DEFAULTS.name,
    confirmationSubject: 'Nieuw bericht via de website',
    confirmationMessage: 'Er is een nieuw bericht binnengekomen via het contactformulier.',
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

export async function seedForms() {
  console.log('Forms')
  await upsertFormSettings()
  await upsertContactForm()
}
