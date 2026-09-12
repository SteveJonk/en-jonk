import {ImagesIcon} from '@sanity/icons/Images'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {TEXT_HINT, eyebrowField, imageField, leadField, preview} from '../objects/fields'

/** Page opener: heading left, lead right, optional photo or stats underneath. */
export const pageHeroType = defineType({
  name: 'pageHero',
  title: 'Page hero',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    eyebrowField,
    defineField({
      name: 'title',
      type: 'text',
      rows: 2,
      description: `${TEXT_HINT} A line break is kept on larger screens.`,
      validation: (rule) => rule.required(),
    }),
    defineField({...leadField, validation: (rule) => rule.required()}),
    defineField({
      name: 'ctas',
      title: 'Buttons',
      description: 'The first is the primary button, the rest are outlined.',
      type: 'array',
      of: [defineArrayMember({type: 'cta'})],
    }),
    defineField({name: 'showContactLines', type: 'boolean', description: '"Bel … of mail …" from Site information.'}),
    defineField({name: 'showPodcastLinks', type: 'boolean', description: 'Spotify and Apple Podcasts buttons from Site information.'}),
    imageField,
    defineField({
      name: 'imageAspect',
      type: 'string',
      initialValue: '16/9',
      options: {list: ['16/9', '21/9'], layout: 'radio', direction: 'horizontal'},
      hidden: ({parent}) => !parent?.image,
    }),
    defineField({name: 'stats', type: 'array', of: [defineArrayMember({type: 'stat'})]}),
  ],
  preview: preview('Page hero'),
})
