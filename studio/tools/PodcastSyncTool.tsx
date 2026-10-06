import {useState} from 'react'
import {useClient} from 'sanity'
import {styles} from './panelStyles'

/**
 * "Spotify sync" in the left-hand menu: runs the app's `/api/podcast-sync`
 * route by hand, as a dry run or for real. The daily run is a Netlify function;
 * see "Podcast sync" in the README.
 *
 * The route is called with the editor's own Sanity token, which the route
 * checks against Sanity. That is why `sanity.config.ts` uses
 * `loginMethod: 'token'`: with cookie login the studio has no token to send.
 */

const SITE_URL = process.env.SANITY_STUDIO_SITE_URL

type Result = {
  dryRun: boolean
  found: number
  created: {number: string; title: string; publishedAt: string}[]
  skipped: number
}

export function PodcastSync() {
  const token = useClient({apiVersion: '2026-09-10'}).config().token
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState<Result | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function run(dryRun: boolean) {
    setBusy(true)
    setResult(null)
    setError(null)
    try {
      const response = await fetch(`${SITE_URL}/api/podcast-sync${dryRun ? '?dryRun=1' : ''}`, {
        method: 'POST',
        headers: {Authorization: `Bearer ${token}`},
      })
      const body = await response.json()
      if (!response.ok) throw new Error(body.error || `HTTP ${response.status}`)
      setResult(body)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setBusy(false)
    }
  }

  const blocked = !SITE_URL
    ? 'SANITY_STUDIO_SITE_URL is not set in studio/.env.'
    : !token
      ? 'No login token. Log out and in again.'
      : null

  return (
    <div style={{padding: 24, maxWidth: 720}}>
      <p style={styles.intro}>
        Imports new episodes from Spotify as podcast episodes. Episodes already in Sanity are left
        alone. A dry run shows what would be imported without writing anything. This also runs
        automatically once a day.
      </p>
      {blocked ? (
        <p style={styles.notice}>{blocked}</p>
      ) : (
        <div style={styles.row}>
          <button type="button" style={styles.secondary} disabled={busy} onClick={() => run(true)}>
            Dry run
          </button>
          <button type="button" style={styles.button} disabled={busy} onClick={() => run(false)}>
            Sync now
          </button>
        </div>
      )}
      {busy && <p style={styles.intro}>Fetching from Spotify…</p>}
      {error && <p style={styles.notice}>Failed: {error}</p>}
      {result && (
        <div style={styles.notice}>
          <p style={{margin: 0}}>
            {result.found} episodes on Spotify, {result.skipped} already in Sanity,{' '}
            {result.created.length} {result.dryRun ? 'would be imported' : 'imported'}.
          </p>
          {result.created.length > 0 && (
            <ul>
              {result.created.map((episode) => (
                <li key={episode.number}>
                  {episode.number}. {episode.title} ({episode.publishedAt.slice(0, 10)})
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
