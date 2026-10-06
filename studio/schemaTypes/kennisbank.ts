import {DocumentPdfIcon} from '@sanity/icons/DocumentPdf'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {DocumentsIcon} from '@sanity/icons/Documents'
import {DownloadIcon} from '@sanity/icons/Download'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {backgroundField, eyebrowField, leadField, linkField, preview, TEXT_HINT, titleField} from './objects/fields'

/**
 * The Kennisbank: articles (each on its own page at /kennisbank/artikelen/<slug>)
 * and PDFs visitors download after leaving their e-mail address.
 *
 * Both are listed by a block, so the hub and the two overview pages are
 * ordinary pages: the same block shows a hand-picked few or all of them.
 */
export const articleType = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({name: 'title', type: 'string', description: TEXT_HINT, validation: (rule) => rule.required()}),
    defineField({
      name: 'slug',
      type: 'slug',
      description: 'The last part of the URL: /kennisbank/artikelen/<slug>.',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      rows: 3,
      description: 'Shown on the article card and below the title. Also the search engine description.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      type: 'array',
      description: 'The reading time is worked out from this text.',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading', value: 'h2'},
            {title: 'Subheading', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
            ],
            annotations: [
              defineArrayMember({
                name: 'link',
                type: 'object',
                fields: [defineField({name: 'href', type: 'url', validation: (rule) => rule.uri({scheme: ['http', 'https', 'mailto']})})],
              }),
            ],
          },
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  orderings: [{title: 'Newest first', name: 'createdDesc', by: [{field: '_createdAt', direction: 'desc'}]}],
  preview: {select: {title: 'title', subtitle: 'excerpt'}},
})

export const downloadType = defineType({
  name: 'download',
  title: 'Download',
  type: 'document',
  icon: DocumentPdfIcon,
  fields: [
    defineField({name: 'title', type: 'string', description: TEXT_HINT, validation: (rule) => rule.required()}),
    defineField({name: 'description', type: 'text', rows: 3, description: 'One or two lines on the card.'}),
    defineField({
      name: 'file',
      title: 'PDF',
      type: 'file',
      options: {accept: 'application/pdf'},
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [{title: 'Newest first', name: 'createdDesc', by: [{field: '_createdAt', direction: 'desc'}]}],
  preview: {select: {title: 'title', subtitle: 'description'}},
})

const limitField = defineField({
  name: 'limit',
  type: 'number',
  description: 'How many to show. Empty shows all of them.',
  validation: (rule) => rule.min(1).integer(),
})

export const articleListType = defineType({
  name: 'articleList',
  title: 'Article list',
  type: 'object',
  icon: DocumentsIcon,
  fields: [
    eyebrowField,
    titleField(false),
    leadField,
    defineField({
      name: 'articles',
      type: 'array',
      description: 'Pick articles to show, in this order. Empty shows the newest.',
      of: [defineArrayMember({type: 'reference', to: [{type: 'article'}]})],
      validation: (rule) => rule.unique(),
    }),
    limitField,
    linkField,
    backgroundField(),
  ],
  preview: preview('Article list'),
})

export const downloadListType = defineType({
  name: 'downloadList',
  title: 'Download list',
  type: 'object',
  icon: DownloadIcon,
  fields: [
    eyebrowField,
    titleField(false),
    leadField,
    defineField({
      name: 'downloads',
      type: 'array',
      description: 'Pick PDFs to show, in this order. Empty shows the newest.',
      of: [defineArrayMember({type: 'reference', to: [{type: 'download'}]})],
      validation: (rule) => rule.unique(),
    }),
    limitField,
    defineField({
      name: 'form',
      type: 'reference',
      to: [{type: 'form'}],
      description: 'What visitors fill in before they get the PDF. Needs an e-mail field; the mail says which PDF.',
      validation: (rule) => rule.required(),
    }),
    linkField,
    backgroundField(),
  ],
  preview: preview('Download list'),
})
