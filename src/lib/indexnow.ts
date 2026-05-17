const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const SITE_URL = "https://texaspropertyhelp.com";
const KEY_LOCATION = `${SITE_URL}/api/indexnow-key`;

export interface IndexNowResult {
  submitted: number;
  failed: number;
  error?: string;
}

/**
 * Submit one or more URLs to IndexNow (Bing, Yandex, and other compatible engines).
 * Requires INDEXNOW_KEY env var. Returns silently if not configured.
 */
export async function submitToIndexNow(urls: string[]): Promise<IndexNowResult> {
  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    console.log("[indexnow] INDEXNOW_KEY not set — skipping submission");
    return { submitted: 0, failed: 0 };
  }

  if (urls.length === 0) return { submitted: 0, failed: 0 };

  // IndexNow supports up to 10,000 URLs per request; batch if needed
  const absoluteUrls = urls.map((u) => (u.startsWith("http") ? u : `${SITE_URL}${u}`));

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: "texaspropertyhelp.com",
        key,
        keyLocation: KEY_LOCATION,
        urlList: absoluteUrls,
      }),
    });

    if (res.ok || res.status === 200 || res.status === 202) {
      return { submitted: absoluteUrls.length, failed: 0 };
    }

    const text = await res.text().catch(() => "");
    return { submitted: 0, failed: absoluteUrls.length, error: `HTTP ${res.status}: ${text}` };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { submitted: 0, failed: absoluteUrls.length, error: message };
  }
}
