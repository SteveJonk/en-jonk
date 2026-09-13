import {
  articleAsideType,
  articleFigureType,
  articleHeroType,
  articleOutcomeType,
  articleSplitType,
  layerNavType,
} from './blocks/articleBlocks'
import {
  casesType,
  logosType,
  podcastEpisodesType,
  podcastTeaserType,
  testimonialsType,
} from './blocks/collectionBlocks'
import {contactFormType} from './blocks/contactFormType'
import {pageHeroType} from './blocks/pageHeroType'
import {
  cardGridType,
  galleryType,
  kennismakenType,
  kenmerkenType,
  linkBandType,
  mediaTextType,
  quoteType,
  statsType,
  stepsType,
  textSplitType,
  threeLevelsType,
  timelineType,
  valuesType,
} from './blocks/sectionBlocks'
import {caseType, podcastEpisodeType, testimonialType} from './documents'
import {footerType} from './footerType'
import {formGeneralSettingsType} from './formGeneralSettingsType'
import {formType} from './formType'
import {interfaceTextType} from './interfaceTextType'
import {navigationType} from './navigationType'
import {itemType, photoType, statType} from './objects/contentObjects'
import {ctaType} from './objects/ctaType'
import {formFieldType} from './objects/formFieldType'
import {linkType} from './objects/linkType'
import {seoType} from './objects/seoType'
import {pageBuilderType} from './pageBuilderType'
import {pageType} from './pageType'
import {siteInformationType} from './siteInformationType'

/**
 * Every schema type the studio knows about.
 *
 * ADDING A BLOCK: define it in `blocks/`, import it here, add it to the
 * Blocks list below, and add it to `pageBuilderType.ts` so editors can insert
 * it. Then project any link or reference fields in the app's `queries.ts` and
 * add a case to `PageBuilder.tsx`.
 */
export const schemaTypes = [
  // Documents
  pageType,
  testimonialType,
  caseType,
  podcastEpisodeType,
  navigationType,
  footerType,
  siteInformationType,
  interfaceTextType,
  formType,
  formGeneralSettingsType,
  // Shared objects
  seoType,
  linkType,
  ctaType,
  photoType,
  itemType,
  statType,
  formFieldType,
  pageBuilderType,
  // Blocks
  pageHeroType,
  articleHeroType,
  mediaTextType,
  textSplitType,
  cardGridType,
  kenmerkenType,
  threeLevelsType,
  timelineType,
  stepsType,
  statsType,
  valuesType,
  quoteType,
  galleryType,
  testimonialsType,
  casesType,
  logosType,
  podcastTeaserType,
  podcastEpisodesType,
  contactFormType,
  articleSplitType,
  articleAsideType,
  articleFigureType,
  articleOutcomeType,
  layerNavType,
  linkBandType,
  kennismakenType,
]
