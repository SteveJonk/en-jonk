import { defineQuery } from 'next-sanity';

/**
 * Resolve internal page references on link/cta objects.
 *
 * A link in the studio is either an external URL or a reference to a `page`
 * document; this projection pulls the referenced slug up so `resolveHref` in
 * `src/lib/links.ts` can turn either shape into an href.
 */
const linkExpansion = /* groq */ `{
  ...,
  internalLink->{
    "slug": slug.current
  }
}`;

const testimonialProjection = /* groq */ `{
  _id,
  quote,
  name,
  role
}`;

/**
 * Everything the renderer needs to draw a form.
 *
 * `fields[]` and `steps[]` are spread wholesale — a form field is a flat object
 * with no references in it, so there is nothing to resolve. Only the redirect
 * link needs expanding.
 */
const formProjection = /* groq */ `{
  _id,
  title,
  showTitle,
  mode,
  fields[],
  steps[]{
    title,
    fields[]
  },
  submitButtonText,
  nextButtonText,
  backButtonText,
  successTitle,
  successBody,
  redirectAfterSubmit,
  redirectLink${linkExpansion}
}`;

/**
 * One page and its blocks.
 *
 * The `content[]` projection spreads every block wholesale (`...`) and then
 * re-projects the fields that need resolving — links and referenced documents.
 * When you add a block with a link or reference field, add it here or it will
 * arrive unresolved.
 */
export const PAGE_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    seo,
    content[]{
      ...,
      link${linkExpansion},
      backLink${linkExpansion},
      ctas[]${linkExpansion},
      items[]{
        ...,
        link${linkExpansion}
      },
      testimonial->${testimonialProjection},
      testimonials[]->${testimonialProjection},
      cases[]->{
        _id,
        client,
        type,
        summary,
        image,
        testimonial->${testimonialProjection}
      },
      layers[]->{
        _id,
        title,
        "slug": slug.current
      },
      _type == "podcastEpisodes" => {
        "episodes": *[_type == "podcastEpisode"] | order(publishedAt desc, _createdAt asc){
          _id,
          number,
          title,
          description,
          url
        }
      },
      // The form lives in its own document so several pages can share it, and
      // the public half of the reCAPTCHA settings rides along — the secret
      // stays server-side, in the submit route.
      _type == "contactForm" => {
        form->${formProjection},
        "recaptcha": *[_type == "formGeneralSettings"][0]{
          recaptchaEnabled,
          recaptchaSiteKey
        }
      }
    }
  }
`);

/** Slugs of every page, for generateStaticParams and the sitemap. */
export const PAGE_SLUGS_QUERY = defineQuery(`
  *[_type == "page" && defined(slug.current)]{
    "slug": slug.current,
    _updatedAt
  }
`);

export const NAVIGATION_QUERY = defineQuery(`
  *[_id == "navigation"][0]{
    links[]${linkExpansion}
  }
`);

/**
 * The site's own details — name, contact, language, social profiles.
 *
 * Every field is optional in the studio; `resolveSiteInformation` in
 * `src/lib/site.ts` lays what comes back over the defaults, so an empty field
 * falls back rather than rendering blank.
 */
export const SITE_INFORMATION_QUERY = defineQuery(`
  *[_id == "siteInformation"][0]{
    name,
    description,
    language,
    phone,
    email,
    address,
    addressCountry,
    badges,
    socialLinks[]{
      platform,
      label,
      url
    },
    "logoUrl": logo.asset->url
  }
`);

/** Labels and messages of the interface — see `src/lib/interface-text.ts`. */
export const INTERFACE_TEXT_QUERY = defineQuery(`
  *[_id == "interfaceText"][0]{
    header,
    footer,
    contact,
    kennismaken,
    forms,
    notFound
  }
`);

export const FOOTER_QUERY = defineQuery(`
  *[_id == "footer"][0]{
    tagline,
    legalLinks[]${linkExpansion},
    copyright
  }
`);

/**
 * What the submit route needs: the mail settings, plus a flat list of every
 * field the form declares — both modes collapse to the same shape here.
 *
 * This list is the server's allow-list. A key the browser posts that is not in
 * it never reaches the mail, so it has to stay in step with what the renderer
 * draws; `npm run check:form` asserts exactly that.
 */
export const FORM_QUERY = defineQuery(`
  *[_id == $formId && _type == "form"][0]{
    _id,
    title,
    mailRecipients,
    mailSubject,
    mailMessage,
    sendCopyToSubmitter,
    copySubject,
    copyMessage,
    "fields": select(
      mode == "steps" => steps[].fields[]{label, name, type, isRequired},
      fields[]{label, name, type, isRequired}
    )
  }
`);

/** Shared mail and spam settings. Server-side only — it carries secrets. */
export const FORM_SETTINGS_QUERY = defineQuery(`
  *[_type == "formGeneralSettings"][0]{
    adminEmail,
    fromEmail,
    fromName,
    mailLogo,
    primaryColor,
    textColor,
    mailjetApiKey,
    mailjetApiSecret,
    confirmationSubject,
    confirmationMessage,
    mailFooter,
    recaptchaEnabled,
    recaptchaSecretKey
  }
`);
