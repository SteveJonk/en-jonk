import {defineField, defineType} from 'sanity'
import {TEXT_HINT} from './fields'

/** A photo with its alt text; hotspot so editors choose the crop focus. */
export const photoType = defineType({
  name: 'photo',
  title: 'Photo',
  type: 'image',
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})

/** Title + text: reasons, values, steps, timeline entries. */
export const itemType = defineType({
  name: 'item',
  title: 'Item',
  type: 'object',
  fields: [
    defineField({name: 'title', type: 'string', description: TEXT_HINT, validation: (rule) => rule.required()}),
    defineField({name: 'text', type: 'text', rows: 3, description: TEXT_HINT}),
  ],
  preview: {select: {title: 'title', subtitle: 'text'}},
})

export const statType = defineType({
  name: 'stat',
  title: 'Stat',
  type: 'object',
  fields: [
    defineField({name: 'value', type: 'string', description: 'The big number, e.g. 7 or 2018.', validation: (rule) => rule.required()}),
    defineField({name: 'suffix', type: 'string', description: 'Raised after the value, e.g. "e" for 7e.'}),
    defineField({name: 'text', type: 'text', rows: 2, description: TEXT_HINT, validation: (rule) => rule.required()}),
  ],
  preview: {select: {title: 'value', subtitle: 'text'}},
})
