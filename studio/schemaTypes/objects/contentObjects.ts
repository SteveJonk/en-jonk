import {defineField, defineType} from 'sanity'
import {TEXT_HINT} from './fields'

const MAX_VIDEO_MB = 20

/**
 * A photo with its alt text; hotspot so editors choose the crop focus.
 * An optional MP4 plays (muted, looping) in its place, the photo as its poster.
 */
export const photoType = defineType({
  name: 'photo',
  title: 'Photo or video',
  type: 'image',
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'video',
      title: 'Video (optional)',
      type: 'file',
      options: {accept: 'video/mp4'},
      description: `MP4, at most ${MAX_VIDEO_MB} MB. Plays muted and looping instead of the photo; the photo shows while it loads and for visitors who turned off motion.`,
      validation: (rule) =>
        rule.custom(async (value, context) => {
          const ref = value?.asset?._ref
          if (!ref) return true
          const asset = await context
            .getClient({apiVersion: '2025-01-01'})
            .fetch<{size?: number; mimeType?: string} | null>('*[_id == $ref][0]{size, mimeType}', {ref})
          if (asset?.mimeType && asset.mimeType !== 'video/mp4') return 'Only MP4 videos are supported.'
          if ((asset?.size ?? 0) > MAX_VIDEO_MB * 1024 * 1024)
            return `This video is ${((asset?.size ?? 0) / 1024 / 1024).toFixed(1)} MB — keep it under ${MAX_VIDEO_MB} MB.`
          return true
        }),
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
