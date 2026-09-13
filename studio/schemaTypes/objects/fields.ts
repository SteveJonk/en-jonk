import {defineArrayMember, defineField, type PreviewConfig, type StringRule} from 'sanity'

/**
 * Field building blocks the page-builder blocks share.
 *
 * Text fields are rendered by `Rich` in the app: `&` becomes the brand
 * ampersand, `*x*` italic, `**x**` bold and `[x]` a placeholder still to be
 * filled in (shown with the dashed "to be delivered" style).
 */
export const TEXT_HINT = 'Supports & (brand ampersand), *italic*, **bold** and [placeholder].'

export const eyebrowField = defineField({name: 'eyebrow', type: 'string', description: TEXT_HINT})

export function titleField(required = true) {
  return defineField({
    name: 'title',
    type: 'string',
    description: TEXT_HINT,
    validation: required ? (rule) => rule.required() : undefined,
  })
}

export const leadField = defineField({name: 'lead', type: 'text', rows: 3, description: TEXT_HINT})

export const paragraphsField = defineField({
  name: 'paragraphs',
  type: 'array',
  description: TEXT_HINT,
  of: [defineArrayMember({type: 'text', rows: 4})],
})

export const linkField = defineField({name: 'link', title: 'Arrow link', type: 'cta'})

export const imageField = defineField({name: 'image', type: 'photo'})

export function itemsField(name = 'items', title?: string) {
  return defineField({name, title, type: 'array', of: [defineArrayMember({type: 'item'})]})
}

export function testimonialField() {
  return defineField({name: 'testimonial', type: 'reference', to: [{type: 'testimonial'}]})
}

export function backgroundField(initialValue: 'default' | 'paper' | 'dark' = 'default') {
  return defineField({
    name: 'background',
    type: 'string',
    initialValue,
    options: {
      list: [
        {title: 'Default', value: 'default'},
        {title: 'Paper', value: 'paper'},
        {title: 'Dark', value: 'dark'},
      ],
      layout: 'radio',
      direction: 'horizontal',
    },
  })
}

/** A full URL, a path, mailto:/tel:, or `#` as a placeholder until the real link exists. */
export function urlRule(rule: StringRule) {
  return rule.custom((value?: string) =>
    !value || value === '#' || /^(https?:|mailto:|tel:|\/)/.test(value)
      ? true
      : 'Use a full URL (https://…), a path (/contact) or # as a placeholder',
  )
}

/** List preview: the block's title, with the kind of block underneath. */
export function preview(kind: string, media = 'image'): PreviewConfig<{title: string; media: string}> {
  return {
    select: {title: 'title', media},
    prepare: ({title, media}) => ({title: title || kind, subtitle: kind, media}),
  }
}
