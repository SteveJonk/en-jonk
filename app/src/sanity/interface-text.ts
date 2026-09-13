import { cache } from 'react';
import { resolveInterfaceText, type InterfaceText } from '@/lib/interface-text';
import { safeFetch } from '@/sanity/client';
import { INTERFACE_TEXT_QUERY } from '@/sanity/queries';
import type { INTERFACE_TEXT_QUERY_RESULT } from '@/sanity/sanity.types';

const options = { next: { revalidate: 30 } };

/**
 * The interface text, with defaults filled in where the CMS is empty.
 *
 * Cached per render like `getSiteInformation`, and fetched with `safeFetch`:
 * a CMS outage leaves the labels on their defaults rather than failing pages.
 */
export const getInterfaceText = cache(async (): Promise<InterfaceText> => {
  const doc = await safeFetch<INTERFACE_TEXT_QUERY_RESULT>(INTERFACE_TEXT_QUERY, {}, options);
  return resolveInterfaceText(doc);
});
