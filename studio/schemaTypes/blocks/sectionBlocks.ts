import {ChartUpwardIcon} from '@sanity/icons/ChartUpward'
import {CommentIcon} from '@sanity/icons/Comment'
import {HeartIcon} from '@sanity/icons/Heart'
import {ImagesIcon} from '@sanity/icons/Images'
import {LinkIcon} from '@sanity/icons/Link'
import {OlistIcon} from '@sanity/icons/Olist'
import {SplitHorizontalIcon} from '@sanity/icons/SplitHorizontal'
import {StackIcon} from '@sanity/icons/Stack'
import {StarIcon} from '@sanity/icons/Star'
import {ThListIcon} from '@sanity/icons/ThList'
import {TimelineIcon} from '@sanity/icons/Timeline'
import {BlockquoteIcon} from '@sanity/icons/Blockquote'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {
  TEXT_HINT,
  backgroundField,
  eyebrowField,
  imageField,
  itemsField,
  leadField,
  linkField,
  paragraphsField,
  preview,
  testimonialField,
  titleField,
} from '../objects/fields'

export const cardGridType = defineType({
  name: 'cardGrid',
  title: 'Card grid',
  type: 'object',
  icon: ThListIcon,
  fields: [
    eyebrowField,
    titleField(),
    leadField,
    defineField({name: 'splitHeader', type: 'boolean', description: 'Heading on the left, lead on the right.'}),
    defineField({name: 'showBars', type: 'boolean', description: 'A coloured bar above each card.'}),
    defineField({
      name: 'items',
      title: 'Cards',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'card',
          fields: [
            defineField({name: 'title', type: 'string', description: TEXT_HINT, validation: (rule) => rule.required()}),
            defineField({name: 'text', type: 'text', rows: 3, description: TEXT_HINT}),
            linkField,
          ],
          preview: {select: {title: 'title', subtitle: 'text'}},
        }),
      ],
    }),
    defineField({name: 'note', type: 'text', rows: 3, description: 'Closing text under the cards.'}),
    linkField,
    backgroundField(),
  ],
  preview: preview('Card grid'),
})

/** The three things clients name, beside a photo, optionally with a quote. */
export const kenmerkenType = defineType({
  name: 'kenmerken',
  title: 'Client characteristics',
  type: 'object',
  icon: StarIcon,
  fields: [
    eyebrowField,
    titleField(false),
    leadField,
    itemsField(),
    testimonialField(),
    defineField({...imageField, validation: (rule) => rule.required()}),
    linkField,
    backgroundField('paper'),
  ],
  preview: preview('Client characteristics'),
})

export const threeLevelsType = defineType({
  name: 'threeLevels',
  title: 'Three levels',
  type: 'object',
  icon: StackIcon,
  description: 'Venn of individual, team and organisation, with a text per level.',
  fields: [
    eyebrowField,
    titleField(),
    leadField,
    defineField({name: 'cards', type: 'boolean', description: 'Show the levels as bordered cards.'}),
    defineField({
      name: 'levels',
      description: 'Individual, team, organisation — in that order.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'level',
          fields: [
            defineField({name: 'title', type: 'string', description: 'Heading and label in the diagram.', validation: (rule) => rule.required()}),
            defineField({name: 'text', type: 'text', rows: 3, description: TEXT_HINT, validation: (rule) => rule.required()}),
            defineField({name: 'items', type: 'array', of: [defineArrayMember({type: 'string'})]}),
          ],
          preview: {select: {title: 'title', subtitle: 'text'}},
        }),
      ],
      validation: (rule) => rule.length(3),
    }),
    defineField({
      name: 'timeline',
      description: 'Optional programme lengths under the levels.',
      type: 'object',
      options: {collapsible: true, collapsed: true},
      fields: [eyebrowField, itemsField(), defineField({name: 'note', type: 'text', rows: 2})],
    }),
    backgroundField(),
  ],
  preview: preview('Three levels'),
})

export const timelineType = defineType({
  name: 'timeline',
  title: 'Timeline',
  type: 'object',
  icon: TimelineIcon,
  fields: [
    eyebrowField,
    titleField(),
    itemsField(),
    defineField({name: 'note', type: 'text', rows: 2}),
    defineField({name: 'plainLine', type: 'boolean', description: 'Neutral line instead of the colour gradient.'}),
    backgroundField(),
  ],
  preview: preview('Timeline'),
})

export const statsType = defineType({
  name: 'stats',
  title: 'Stats',
  type: 'object',
  icon: ChartUpwardIcon,
  fields: [
    eyebrowField,
    titleField(),
    defineField({name: 'items', type: 'array', of: [defineArrayMember({type: 'stat'})]}),
    defineField({name: 'text', type: 'text', rows: 3, description: TEXT_HINT}),
    linkField,
    backgroundField('dark'),
  ],
  preview: preview('Stats'),
})

export const valuesType = defineType({
  name: 'values',
  title: 'Values',
  type: 'object',
  icon: HeartIcon,
  fields: [
    defineField({
      name: 'variant',
      type: 'string',
      initialValue: 'compact',
      options: {
        list: [
          {title: 'Compact — text beside the values', value: 'compact'},
          {title: 'Full — illustration, coloured bars and photos', value: 'full'},
        ],
        layout: 'radio',
      },
    }),
    eyebrowField,
    titleField(),
    leadField,
    defineField({name: 'quote', type: 'text', rows: 3, description: TEXT_HINT, hidden: ({parent}) => parent?.variant === 'full'}),
    defineField({...linkField, hidden: ({parent}) => parent?.variant === 'full'}),
    defineField({name: 'itemsEyebrow', type: 'string', hidden: ({parent}) => parent?.variant === 'full'}),
    itemsField(),
    defineField({
      name: 'images',
      type: 'array',
      of: [defineArrayMember({type: 'photo'})],
      validation: (rule) => rule.max(2),
      hidden: ({parent}) => parent?.variant !== 'full',
    }),
    backgroundField('paper'),
  ],
  preview: preview('Values'),
})

export const mediaTextType = defineType({
  name: 'mediaText',
  title: 'Media & text',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    eyebrowField,
    titleField(),
    leadField,
    paragraphsField,
    defineField({
      name: 'images',
      description: 'One photo, or three for a collage (one large, two small).',
      type: 'array',
      of: [defineArrayMember({type: 'photo'})],
      validation: (rule) => rule.min(1).max(3).required(),
    }),
    defineField({
      name: 'imageAspect',
      type: 'string',
      initialValue: '3/2',
      options: {list: ['3/2', '4/5'], layout: 'radio', direction: 'horizontal'},
    }),
    defineField({name: 'narrowImage', type: 'boolean', description: 'Photo takes 5 of 12 columns instead of half.'}),
    testimonialField(),
    linkField,
    backgroundField(),
  ],
  preview: preview('Media & text', 'images.0'),
})

export const textSplitType = defineType({
  name: 'textSplit',
  title: 'Text split',
  type: 'object',
  icon: SplitHorizontalIcon,
  description: 'Heading on the left, text on the right.',
  fields: [
    titleField(),
    leadField,
    paragraphsField,
    defineField({...imageField, description: 'Optional photo under the heading.'}),
    backgroundField(),
  ],
  preview: preview('Text split'),
})

export const quoteType = defineType({
  name: 'quote',
  title: 'Quote',
  type: 'object',
  icon: BlockquoteIcon,
  description: 'A plain quote, or a testimonial with its name and role.',
  fields: [
    defineField({name: 'text', type: 'text', rows: 3, description: TEXT_HINT}),
    testimonialField(),
    backgroundField('dark'),
  ],
  preview: {
    select: {title: 'text', name: 'testimonial.name'},
    prepare: ({title, name}) => ({title: title || name || 'Quote', subtitle: 'Quote'}),
  },
})

export const galleryType = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'object',
  icon: ImagesIcon,
  description: 'One wide photo, or photos in columns.',
  fields: [
    eyebrowField,
    titleField(false),
    leadField,
    defineField({
      name: 'images',
      type: 'array',
      of: [defineArrayMember({type: 'photo'})],
      validation: (rule) => rule.min(1).required(),
    }),
    backgroundField(),
  ],
  preview: preview('Gallery', 'images.0'),
})

export const stepsType = defineType({
  name: 'steps',
  title: 'Steps',
  type: 'object',
  icon: OlistIcon,
  fields: [eyebrowField, titleField(), leadField, itemsField(), backgroundField()],
  preview: preview('Steps'),
})

export const linkBandType = defineType({
  name: 'linkBand',
  title: 'Link band',
  type: 'object',
  icon: LinkIcon,
  description: 'A short heading with one link beside it.',
  fields: [
    eyebrowField,
    titleField(),
    leadField,
    defineField({name: 'text', title: 'Text beside', type: 'text', rows: 2, description: TEXT_HINT}),
    linkField,
    backgroundField(),
  ],
  preview: preview('Link band'),
})

export const kennismakenType = defineType({
  name: 'kennismaken',
  title: 'Kennismaken (closing CTA)',
  type: 'object',
  icon: CommentIcon,
  description: 'Call and mail buttons. Empty fields use the standard kennismaken copy.',
  fields: [
    defineField({name: 'title', type: 'string', description: TEXT_HINT}),
    defineField({name: 'text', type: 'text', rows: 3, description: TEXT_HINT}),
    defineField({name: 'mailOnly', type: 'boolean', description: 'Only the mail button.'}),
    backgroundField('paper'),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({title: title || 'Zullen we kennismaken?', subtitle: 'Kennismaken'}),
  },
})
