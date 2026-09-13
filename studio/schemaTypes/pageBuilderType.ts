import {defineArrayMember, defineType} from 'sanity'

/**
 * The block list editors can insert on a page.
 *
 * Order here is the order of the "Add item" menu, so keep the blocks an editor
 * reaches for most near the top.
 */
export const pageBuilderType = defineType({
  name: 'pageBuilder',
  type: 'array',
  of: [
    // Openers
    defineArrayMember({type: 'pageHero'}),
    defineArrayMember({type: 'articleHero'}),
    // Body
    defineArrayMember({type: 'mediaText'}),
    defineArrayMember({type: 'textSplit'}),
    defineArrayMember({type: 'cardGrid'}),
    defineArrayMember({type: 'kenmerken'}),
    defineArrayMember({type: 'threeLevels'}),
    defineArrayMember({type: 'timeline'}),
    defineArrayMember({type: 'steps'}),
    defineArrayMember({type: 'stats'}),
    defineArrayMember({type: 'values'}),
    defineArrayMember({type: 'quote'}),
    defineArrayMember({type: 'gallery'}),
    defineArrayMember({type: 'testimonials'}),
    defineArrayMember({type: 'cases'}),
    defineArrayMember({type: 'logos'}),
    defineArrayMember({type: 'podcastTeaser'}),
    defineArrayMember({type: 'podcastEpisodes'}),
    defineArrayMember({type: 'contactForm'}),
    // Article (the three layers)
    defineArrayMember({type: 'articleSplit'}),
    defineArrayMember({type: 'articleAside'}),
    defineArrayMember({type: 'articleFigure'}),
    defineArrayMember({type: 'articleOutcome'}),
    defineArrayMember({type: 'layerNav'}),
    // Closers
    defineArrayMember({type: 'linkBand'}),
    defineArrayMember({type: 'kennismaken'}),
  ],
})
