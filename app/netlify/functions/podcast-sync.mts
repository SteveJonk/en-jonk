/**
 * Netlify scheduled function: runs the podcast sync once a day (midnight UTC).
 * `URL` is set by Netlify to the site's main address. See "Podcast sync" in
 * the README.
 */
export default async function podcastSync() {
  const response = await fetch(`${process.env.URL}/api/podcast-sync`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.PODCAST_SYNC_SECRET}` },
  });
  const body = await response.text();
  if (!response.ok) throw new Error(`podcast-sync ${response.status}: ${body}`);
  console.log('podcast-sync:', body);
}

export const config = { schedule: '@daily' };
