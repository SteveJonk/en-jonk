import {BlockquoteIcon} from '@sanity/icons/Blockquote'
import {CaseIcon} from '@sanity/icons/Case'
import {MicrophoneIcon} from '@sanity/icons/Microphone'
import {PlayIcon} from '@sanity/icons/Play'
import {UsersIcon} from '@sanity/icons/Users'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {
  backgroundField,
  eyebrowField,
  imageField,
  leadField,
  linkField,
  preview,
  titleField,
  urlRule,
} from '../objects/fields'

const noteField = defineField({name: 'note', type: 'text', rows: 2, description: 'Small print under the list.'})

export const testimonialsType = defineType({
  name: 'testimonials',
  title: 'Testimonials',
  type: 'object',
  icon: BlockquoteIcon,
  fields: [
    eyebrowField,
    titleField(),
    defineField({
      name: 'testimonials',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'testimonial'}]})],
    }),
    noteField,
    backgroundField(),
  ],
  preview: preview('Testimonials'),
})

export const casesType = defineType({
  name: 'cases',
  title: 'Cases',
  type: 'object',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'layout',
      type: 'string',
      initialValue: 'grid',
      options: {
        list: [
          {title: 'Featured — photo, summary and quote', value: 'featured'},
          {title: 'Grid — cards', value: 'grid'},
        ],
        layout: 'radio',
      },
    }),
    eyebrowField,
    titleField(false),
    defineField({
      name: 'cases',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'case'}]})],
    }),
    noteField,
    backgroundField(),
  ],
  preview: {
    select: {title: 'title', layout: 'layout'},
    prepare: ({title, layout}) => ({title: title || 'Cases', subtitle: `Cases · ${layout ?? 'grid'}`}),
  },
})

export const logosType = defineType({
  name: 'logos',
  title: 'Client logos',
  type: 'object',
  icon: UsersIcon,
  description: 'Scrolling logo rows; every second row runs the other way.',
  fields: [
    eyebrowField,
    titleField(),
    leadField,
    defineField({
      name: 'rows',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'logoRow',
          fields: [
            defineField({
              name: 'logos',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'logo',
                  fields: [
                    defineField({name: 'image', type: 'image', validation: (rule) => rule.required()}),
                    defineField({name: 'name', type: 'string', description: 'Also the alt text.', validation: (rule) => rule.required()}),
                    defineField({name: 'url', type: 'string', validation: urlRule}),
                  ],
                  preview: {select: {title: 'name', media: 'image'}},
                }),
              ],
            }),
          ],
          preview: {
            select: {logos: 'logos'},
            prepare: ({logos}) => ({title: `${Array.isArray(logos) ? logos.length : 0} logos`}),
          },
        }),
      ],
    }),
    backgroundField('paper'),
  ],
  preview: preview('Client logos'),
})

export const podcastTeaserType = defineType({
  name: 'podcastTeaser',
  title: 'Podcast teaser',
  type: 'object',
  icon: MicrophoneIcon,
  description: 'Spotify and Apple Podcasts links come from Site information.',
  fields: [
    eyebrowField,
    titleField(),
    leadField,
    linkField,
    imageField,
    defineField({name: 'listenTitle', type: 'string'}),
    defineField({name: 'listenText', type: 'text', rows: 3}),
    backgroundField('paper'),
  ],
  preview: preview('Podcast teaser'),
})

export const podcastEpisodesType = defineType({
  name: 'podcastEpisodes',
  title: 'Podcast episodes',
  type: 'object',
  icon: PlayIcon,
  description: 'The latest episodes, newest first.',
  fields: [
    eyebrowField,
    titleField(),
    defineField({name: 'limit', type: 'number', initialValue: 4, validation: (rule) => rule.min(1).integer()}),
    noteField,
    backgroundField('paper'),
  ],
  preview: preview('Podcast episodes'),
})
