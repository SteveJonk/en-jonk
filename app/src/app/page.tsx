import { CmsPage, cmsMetadata } from '@/components/CmsPage';
import { HOME_SLUG } from '@/lib/links';

export function generateMetadata() {
  return cmsMetadata(HOME_SLUG);
}

export default function HomePage() {
  return <CmsPage slug={HOME_SLUG} />;
}
