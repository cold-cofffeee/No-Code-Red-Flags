const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours

export async function getCachedResponse(query: string): Promise<any | null> {
  const res = await fetch(`/.netlify/functions/cache?query=${encodeURIComponent(query)}`);
  const data = await res.json();
  if (data.result && data.result.timestamp && Date.now() - data.result.timestamp < CACHE_TTL) {
    return data.result.response;
  }
  return null;
}

export async function saveResponseToCache(query: string, response: any) {
  const entry = { query, response, timestamp: Date.now() };
  await fetch(`/.netlify/functions/cache`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, response: entry }),
  });
}