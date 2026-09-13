import {EnvelopeIcon} from '@sanity/icons/Envelope'
import {defineField, defineType} from 'sanity'
import {backgroundField} from '../objects/fields'

/**
 * Direct contact details (from Site information) beside a form from Forms.
 * The form is a reference, so its fields are edited in one place.
 */
export const contactFormType = defineType({
  name: 'contactForm',
  title: 'Contact form',
  type: 'object',
  icon: EnvelopeIcon,
  fields: [
    defineField({name: 'detailsEyebrow', type: 'string', initialValue: 'Direct contact'}),
    defineField({name: 'phoneLabel', type: 'string', initialValue: 'Telefoon'}),
    defineField({name: 'emailLabel', type: 'string', initialValue: 'E-mail'}),
    defineField({name: 'formEyebrow', type: 'string', initialValue: 'Stuur een bericht'}),
    defineField({
      name: 'form',
      type: 'reference',
      to: [{type: 'form'}],
      description: 'The form to show. Its fields are managed under Forms.',
      validation: (rule) => rule.required(),
    }),
    backgroundField('paper'),
  ],
  preview: {
    select: {title: 'form.title'},
    prepare: ({title}) => ({title: title || 'Contact form', subtitle: 'Contact form'}),
  },
})
