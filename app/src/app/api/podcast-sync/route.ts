import { createHash, timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';
import { env } from '@/lib/env';
import { client } from '@/sanity/client';

export const runtime = 'nodejs';

/**
 * Imports the podcast's Spotify episodes as `podcastEpisode` documents.
 * `POST /api/podcast-sync` writes, `POST /api/podcast-sync?dryRun=1` only
 * reports what it would write. See "Podcast sync" in the README.
 *
 * Only creates: an episode already in Sanity is never touched again, so
 * editors can rewrite titles and descriptions without the next run undoing it.
 *
 * Two ways in, both a bearer token:
 * - `PODCAST_SYNC_SECRET` — the daily Netlify function.
 * - a Sanity login token — the button in the studio. Checked against Sanity
 *   itself, so the studio bundle (which is public) holds no secret.
 */

/** Studio roles allowed to run the sync. */
const ROLES = ['administrator', 'editor', 'developer'];

/** Spotify hides episodes from a client-credentials token without a market. */
const MARKET = 'NL';

// Bearer auth, no cookies, so any origin may call it: the studio runs on
// localhost:3333 and *.sanity.studio.
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization',
};

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: CORS });
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

/** Hashing first gives equal lengths, which `timingSafeEqual` needs. */
function sameSecret(a: string, b: string) {
  const hash = (s: string) => createHash('sha256').update(s).digest();
  return timingSafeEqual(hash(a), hash(b));
}

async function isStudioUser(token: string) {
  const response = await fetch(`https://${env.projectId}.api.sanity.io/v2021-06-07/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  if (!response.ok) return false;
  const user = (await response.json()) as { roles?: { name: string }[] };
  return (user.roles ?? []).some((role) => ROLES.includes(role.name));
}

async function authorized(request: Request) {
  const token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!token) return false;
  const secret = process.env.PODCAST_SYNC_SECRET;
  if (secret && sameSecret(token, secret)) return true;
  return isStudioUser(token);
}

type SpotifyEpisode = {
  id: string;
  name: string;
  description: string;
  release_date: string;
  external_urls: { spotify: string };
};

async function spotifyEpisodes(clientId: string, clientSecret: string, showId: string) {
  const auth = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
    cache: 'no-store',
  });
  if (!auth.ok) throw new Error(`Spotify token request failed: ${auth.status} ${await auth.text()}`);
  const { access_token } = (await auth.json()) as { access_token: string };

  const episodes: SpotifyEpisode[] = [];
  let url: string | null =
    `https://api.spotify.com/v1/shows/${encodeURIComponent(showId)}/episodes?market=${MARKET}&limit=50`;
  while (url) {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${access_token}` },
      cache: 'no-store',
    });
    if (!response.ok) throw new Error(`Spotify episodes request failed: ${response.status} ${await response.text()}`);
    const page = (await response.json()) as { items: (SpotifyEpisode | null)[]; next: string | null };
    // Unavailable episodes come back as null.
    episodes.push(...page.items.filter((item): item is SpotifyEpisode => item !== null));
    url = page.next;
  }
  return episodes;
}

/** The first line, cut at a word — the site shows one line per episode. */
function oneLine(text: string, max = 200) {
  const line = text.trim().split('\n')[0].trim();
  if (line.length <= max) return line;
  const cut = line.lastIndexOf(' ', max);
  return `${line.slice(0, cut > 0 ? cut : max)}…`;
}

export async function POST(request: Request) {
  if (!(await authorized(request))) return json({ error: 'Unauthorized' }, 401);

  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_SHOW_ID, SANITY_API_WRITE_TOKEN } = process.env;
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_SHOW_ID || !SANITY_API_WRITE_TOKEN) {
    return json(
      { error: 'Missing SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_SHOW_ID or SANITY_API_WRITE_TOKEN' },
      500,
    );
  }
  const dryRun = new URL(request.url).searchParams.has('dryRun');

  try {
    // Oldest first, so the position is the episode number. Spotify has none.
    const episodes = (await spotifyEpisodes(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_SHOW_ID)).sort(
      (a, b) => a.release_date.localeCompare(b.release_date),
    );
    const docs = episodes.map((episode, i) => ({
      _id: `podcastEpisode-spotify-${episode.id}`,
      _type: 'podcastEpisode',
      number: String(i + 1).padStart(2, '0'),
      title: episode.name,
      description: oneLine(episode.description),
      url: episode.external_urls.spotify,
      publishedAt: new Date(episode.release_date).toISOString(),
    }));

    const writer = client.withConfig({ token: SANITY_API_WRITE_TOKEN });
    // Drafts count as existing too: an editor halfway through an edit.
    const ids = docs.flatMap((doc) => [doc._id, `drafts.${doc._id}`]);
    const existing = new Set(
      (await writer.fetch<string[]>('*[_id in $ids]._id', { ids })).map((id) => id.replace(/^drafts\./, '')),
    );
    const created = docs.filter((doc) => !existing.has(doc._id));

    if (!dryRun && created.length) {
      const tx = writer.transaction();
      for (const doc of created) tx.createIfNotExists(doc);
      await tx.commit();
    }

    return json({
      dryRun,
      found: docs.length,
      created: created.map(({ number, title, publishedAt }) => ({ number, title, publishedAt })),
      skipped: docs.length - created.length,
    });
  } catch (error) {
    console.error('podcast-sync:', error);
    return json({ error: error instanceof Error ? error.message : String(error) }, 502);
  }
}
