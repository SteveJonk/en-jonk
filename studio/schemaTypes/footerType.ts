import {BlockElementIcon} from '@sanity/icons/BlockElement'
import {defineField, defineType} from 'sanity'
import {navLinkMember} from './navigationType'

/** The footer's own copy. Its menu repeats the Navigation links. */
export const footerType = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'tagline',
      type: 'string',
      description: 'Handwritten line under the logo.',
    }),
    defineField({
      name: 'legalLinks',
      title: 'Legal links',
      description: 'Privacy statement, terms — the bottom row.',
      type: 'array',
      of: [navLinkMember],
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright text',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Footer'}
    },
  },
})
