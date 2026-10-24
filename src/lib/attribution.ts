'use client'
import type { Attribution } from './lead-schema'

const KEYS = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','campaign_id','ad_group_id','ad_id','gclid','fbclid','msclkid'] as const
const FIRST = 'il_attr_first'
const LAST = 'il_attr_last'

// Consent-aware: if the visitor has declined (il_consent=denied) nothing is persisted.
const allowed = () => {
  try { return localStorage.getItem('il_consent') !== 'denied' } catch { return false }
}

export function captureAttribution() {
  if (typeof window === 'undefined' || !allowed()) return
  const sp = new URLSearchParams(window.location.search)
  const found: Attribution = {}
  KEYS.forEach((k) => { const v = sp.get(k); if (v) found[k] = v.slice(0, 200) })
  const hasParams = Object.keys(found).length > 0
  const snapshot: Attribution = {
    ...found,
    landing_path: window.location.pathname,
    referrer: document.referrer ? document.referrer.slice(0, 300) : undefined,
  }
  try {
    if (!localStorage.getItem(FIRST)) localStorage.setItem(FIRST, JSON.stringify(snapshot))
    if (hasParams) localStorage.setItem(LAST, JSON.stringify(snapshot))
  } catch {}
}

export function readAttribution(): { first?: Attribution; last?: Attribution } {
  try {
    const f = localStorage.getItem(FIRST), l = localStorage.getItem(LAST)
    return { first: f ? JSON.parse(f) : undefined, last: l ? JSON.parse(l) : undefined }
  } catch { return {} }
}

// Keep paid-campaign params on internal links so attribution survives navigation even without storage.
export function carryParams(href: string): string {
  if (typeof window === 'undefined') return href
  const sp = new URLSearchParams(window.location.search)
  const out = new URLSearchParams()
  KEYS.forEach((k) => { const v = sp.get(k); if (v) out.set(k, v) })
  const q = out.toString()
  return q ? `${href}${href.includes('?') ? '&' : '?'}${q}` : href
}
