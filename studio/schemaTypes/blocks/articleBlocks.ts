import {ArrowLeftIcon} from '@sanity/icons/ArrowLeft'
import {BlockquoteIcon} from '@sanity/icons/Blockquote'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {ImageIcon} from '@sanity/icons/Image'
import {MenuIcon} from '@sanity/icons/Menu'
import {SparklesIcon} from '@sanity/icons/Sparkles'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {TEXT_HINT, imageField, leadField, linkField, paragraphsField, preview, titleField} from '../objects/fields'

/**
 * The "Hoe wij kijken" layer pages. Consecutive article blocks are rendered
 * inside one article column; the layer number (from the article hero) sets the
 * colour of the outcome block.
 */

/** Diagrams are drawn in code; editors choose which one to show. */
const DIAGRAMS = [
  {title: 'Opmerken en vertragen (from tangle to parts)', value: 'tangle'},
  {title: 'De lens (eye with filter)', value: 'lens'},
  {title: 'Dramadriehoek', value: 'dramaTriangle'},
  {title: 'Ik in de wij (circle)', value: 'ikInDeWij'},
]

const diagramField = defineField({name: 'diagram', type: 'string', options: {list: DIAGRAMS}})
const captionField = defineField({name: 'caption', type: 'string'})

export const articleHeroType = defineType({
  name: 'articleHero',
  title: 'Article hero',
  type: 'object',
  icon: ArrowLeftIcon,
  fields: [
    defineField({
      name: 'layer',
      type: 'number',
      description: 'Which of the three layers this is. Sets the colour.',
      options: {list: [1, 2, 3], layout: 'radio', direction: 'horizontal'},
      validation: (rule) => rule.required(),
    }),
    titleField(),
    defineField({...leadField, validation: (rule) => rule.required()}),
    defineField({...imageField, validation: (rule) => rule.required()}),
    defineField({name: 'backLink', type: 'cta'}),
  ],
  preview: preview('Article hero'),
})

export const articleSplitType = defineType({
  name: 'articleSplit',
  title: 'Article section',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [titleField(), paragraphsField],
  preview: preview('Article section'),
})

export const articleAsideType = defineType({
  name: 'articleAside',
  title: 'Article section with aside',
  type: 'object',
  icon: BlockquoteIcon,
  fields: [
    titleField(),
    paragraphsField,
    defineField({name: 'reverse', type: 'boolean', description: 'Aside on the left.'}),
    defineField({name: 'quote', type: 'string', description: TEXT_HINT}),
    imageField,
    diagramField,
    captionField,
  ],
  preview: preview('Article section with aside'),
})

export const articleFigureType = defineType({
  name: 'articleFigure',
  title: 'Article diagram',
  type: 'object',
  icon: SparklesIcon,
  fields: [defineField({...diagramField, validation: (rule) => rule.required()}), captionField],
  preview: {
    select: {title: 'caption', diagram: 'diagram'},
    prepare: ({title, diagram}) => ({title: title || diagram || 'Diagram', subtitle: 'Article diagram'}),
  },
})

export const articleOutcomeType = defineType({
  name: 'articleOutcome',
  title: 'Article outcome',
  type: 'object',
  icon: ImageIcon,
  description: '"Wat het oplevert", closing the article.',
  fields: [paragraphsField, defineField({...linkField, title: 'Read-on link'})],
  preview: {prepare: () => ({title: 'Wat het oplevert', subtitle: 'Article outcome'})},
})

export const layerNavType = defineType({
  name: 'layerNav',
  title: 'Layer navigation',
  type: 'object',
  icon: MenuIcon,
  fields: [
    defineField({name: 'eyebrow', type: 'string'}),
    defineField({
      name: 'layers',
      description: 'The three layer pages, in reading order.',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'page'}]})],
      validation: (rule) => rule.max(3),
    }),
  ],
  preview: {prepare: () => ({title: 'De drie lagen', subtitle: 'Layer navigation'})},
})
