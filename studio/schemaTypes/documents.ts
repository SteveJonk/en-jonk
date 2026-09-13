import {BlockquoteIcon} from '@sanity/icons/Blockquote'
import {CaseIcon} from '@sanity/icons/Case'
import {MicrophoneIcon} from '@sanity/icons/Microphone'
import {defineField, defineType} from 'sanity'
import {TEXT_HINT, urlRule} from './objects/fields'

/** A client quote. Referenced from blocks, so one quote is edited in one place. */
export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: BlockquoteIcon,
  fields: [
    defineField({name: 'quote', type: 'text', rows: 4, description: TEXT_HINT, validation: (rule) => rule.required()}),
    defineField({name: 'name', type: 'string', description: TEXT_HINT, validation: (rule) => rule.required()}),
    defineField({
      name: 'role',
      type: 'text',
      rows: 2,
      description: 'Function and organisation. A line break is kept.',
    }),
  ],
  preview: {select: {title: 'name', subtitle: 'quote'}},
})

export const caseType = defineType({
  name: 'case',
  title: 'Case',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({name: 'client', type: 'string', description: TEXT_HINT, validation: (rule) => rule.required()}),
    defineField({name: 'type', type: 'string', description: 'Sector or kind of programme, e.g. Traineeship.'}),
    defineField({name: 'summary', type: 'text', rows: 3, description: TEXT_HINT}),
    defineField({name: 'image', type: 'photo', description: 'Shown when the case is featured.'}),
    defineField({name: 'testimonial', type: 'reference', to: [{type: 'testimonial'}]}),
  ],
  preview: {select: {title: 'client', subtitle: 'type', media: 'image'}},
})

export const podcastEpisodeType = defineType({
  name: 'podcastEpisode',
  title: 'Podcast episode',
  type: 'document',
  icon: MicrophoneIcon,
  fields: [
    defineField({name: 'number', type: 'string', description: 'Episode number, shown beside the title.'}),
    defineField({name: 'title', type: 'string', description: TEXT_HINT, validation: (rule) => rule.required()}),
    defineField({name: 'description', type: 'text', rows: 2, description: 'Guest and the dilemma, in one line.'}),
    defineField({name: 'url', title: 'Listen URL', type: 'string', validation: urlRule}),
    defineField({name: 'publishedAt', type: 'datetime', description: 'Newest episodes are listed first.'}),
  ],
  orderings: [
    {title: 'Newest first', name: 'publishedAtDesc', by: [{field: 'publishedAt', direction: 'desc'}]},
  ],
  preview: {select: {title: 'title', subtitle: 'number'}},
})
