import {MenuIcon} from '@sanity/icons/Menu'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {linkFields} from './objects/linkFields'

/** A label + internal page or URL. Shared by the navigation and the footer. */
export const navLinkMember = defineArrayMember({
  type: 'object',
  name: 'navLink',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      description: 'Supports & (brand ampersand).',
      validation: (rule) => rule.required(),
    }),
    ...linkFields,
  ],
  preview: {
    select: {
      title: 'label',
      linkType: 'linkType',
      href: 'href',
      internalTitle: 'internalLink.title',
    },
    prepare({title, linkType, href, internalTitle}) {
      return {
        title: title || 'Link',
        subtitle:
          linkType === 'internal'
            ? internalTitle || 'Internal page'
            : href || 'External URL',
      }
    },
  },
})

/** The main menu: the overlay in the header, and the list in the footer. */
export const navigationType = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'links',
      type: 'array',
      of: [navLinkMember],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Navigation'}
    },
  },
})
