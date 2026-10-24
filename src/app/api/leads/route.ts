import { NextResponse } from 'next/server'
import { leadSchema } from '@/lib/lead-schema'
import { budgetBands, propertyTypeOptions } from '@/lib/config'
import { getProject } from '@/lib/projects'

export const maxDuration = 30

// In-memory guards: per-instance only. Replace with a shared store (e.g. Upstash/KV) for strict guarantees.
const hits = new Map<string, number[]>()
const done = new Map<string, { at: number; body: unknown }>()
const WINDOW = 10 * 60_000
const MAX_HITS = 5

function limited(ip: string) {
  const now = Date.now()
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW)
  arr.push(now)
  hits.set(ip, arr)
  return arr.length > MAX_HITS
}

const label = <T extends { value: string; label: string }>(list: readonly T[], v: string) =>
  list.find((i) => i.value === v)?.label ?? v

export async function POST(req: Request) {
  const crmUrl = process.env.CRM_API_URL
  const crmKey = process.env.CRM_API_KEY
  if (!crmUrl || !crmKey) {
    console.error('[leads] CRM_API_URL / CRM_API_KEY not configured')
    return NextResponse.json({ ok: false, error: 'Service temporarily unavailable.' }, { status: 503 })
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (limited(ip)) return NextResponse.json({ ok: false, error: 'Too many requests. Please try again later.' }, { status: 429 })

  let json: unknown
  try { json = await req.json() } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 })
  }
  const parsed = leadSchema.safeParse(json)
  if (!parsed.success) {
    // Honeypot hits are indistinguishable from other validation errors on purpose.
    return NextResponse.json({ ok: false, error: 'Please check the form and try again.', fields: parsed.error.flatten().fieldErrors }, { status: 400 })
  }
  const d = parsed.data

  const prev = done.get(d.idempotencyKey)
  if (prev && Date.now() - prev.at < WINDOW) return NextResponse.json(prev.body)

  const band = budgetBands.find((b) => b.value === d.budgetBand)
  const project = d.projectSlug ? getProject(d.projectSlug) : undefined
  const first = d.attribution?.first ?? {}
  const last = d.attribution?.last ?? {}
  const digits = d.phone.replace(/\D/g, '').replace(/^0+/, '')
  const fmt = (a: Record<string, string | undefined>) =>
    Object.entries(a).filter(([, v]) => v).map(([k, v]) => `${k}=${v}`).join(' ') || '—'

  const notes = [
    `Landing page: ${last.landing_path ?? first.landing_path ?? '—'}`,
    `Campaign group: ${d.campaignGroup ?? '—'}`,
    `Investment range: ${label(budgetBands, d.budgetBand)}`,
    `Property type: ${label(propertyTypeOptions, d.propertyType)}`,
    `First touch: ${fmt(first as Record<string, string | undefined>)}`,
    `Latest paid touch: ${fmt(last as Record<string, string | undefined>)}`,
  ].join('\n')

  const body = {
    name: d.fullName,
    email: d.email,
    phone: `${d.countryCode}${digits}`,
    lead_source: 'offplan-lp',
    project: project?.projectName,
    developer: project?.developerName,
    category: ['apartment', 'villa', 'townhouse'].includes(d.propertyType) ? d.propertyType : undefined,
    budget_min: band?.min,
    budget_max: band?.max,
    notes,
  }

  try {
    const res = await fetch(crmUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': crmKey },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(20_000),
    })
    if (!res.ok) {
      console.error('[leads] CRM rejected lead', res.status)
      return NextResponse.json({ ok: false, error: 'We could not submit your enquiry. Please try again.' }, { status: 502 })
    }
    const out = { ok: true }
    done.set(d.idempotencyKey, { at: Date.now(), body: out })
    return NextResponse.json(out)
  } catch (e) {
    console.error('[leads] CRM unreachable', e instanceof Error ? e.message : 'unknown')
    return NextResponse.json({ ok: false, error: 'We could not submit your enquiry. Please try again.' }, { status: 502 })
  }
}
