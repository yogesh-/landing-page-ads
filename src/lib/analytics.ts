// PII-free event layer. Pushes to dataLayer (GTM) only; never include names, emails or phones.
type Params = Record<string, string | number | boolean | undefined>

export function track(event: string, params: Params = {}) {
  if (typeof window === 'undefined') return
  const w = window as unknown as { dataLayer?: unknown[] }
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push({ event, ...params })
}
