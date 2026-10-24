'use client'
import { useEffect, useRef, useState } from 'react'
import { budgetBands, propertyTypeOptions, countryCodes, site, whatsappLink } from '@/lib/config'
import { leadSchema } from '@/lib/lead-schema'
import { readAttribution } from '@/lib/attribution'
import { track } from '@/lib/analytics'

interface Props { id?: string; defaultType?: string; projectSlug?: string; projectName?: string; campaignGroup?: string; title?: string; cta?: string }

const field = 'w-full rounded-lg border border-[#E5E5E5] bg-white px-3.5 py-3 text-base text-[#151515] focus:border-[#F47721] focus:outline-none focus:ring-2 focus:ring-[#F47721]/30'

export default function LeadForm({ id = 'enquire', defaultType, projectSlug, projectName, campaignGroup, title = 'Get Your Property Shortlist', cta = 'Get My Shortlist' }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [serverError, setServerError] = useState('')
  const started = useRef(false)
  const key = useRef('')
  useEffect(() => { key.current = crypto.randomUUID() }, [])

  const onStart = () => { if (!started.current) { started.current = true; track('lead_form_start', { project: projectSlug, form_id: id }) } }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'sending') return
    const fd = new FormData(e.currentTarget)
    const payload = {
      fullName: String(fd.get('fullName') ?? ''), email: String(fd.get('email') ?? ''),
      countryCode: String(fd.get('countryCode') ?? '+971'), phone: String(fd.get('phone') ?? ''),
      propertyType: String(fd.get('propertyType') ?? ''), budgetBand: String(fd.get('budgetBand') ?? ''),
      projectSlug,
      website: String(fd.get('website') ?? ''), idempotencyKey: key.current, campaignGroup,
      attribution: readAttribution(),
    }
    track('lead_form_submit', { project: projectSlug, form_id: id })
    const parsed = leadSchema.safeParse(payload)
    if (!parsed.success) {
      const errs: Record<string, string> = {}
      parsed.error.issues.forEach((i) => { const k = String(i.path[0]); if (!errs[k]) errs[k] = i.message })
      setErrors(errs); setStatus('idle')
      track('lead_form_error', { reason: 'validation', form_id: id })
      document.getElementById(`${id}-${Object.keys(errs)[0]}`)?.focus()
      return
    }
    setErrors({}); setStatus('sending'); setServerError('')
    try {
      const res = await fetch('/api/leads', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(parsed.data) })
      const out = await res.json().catch(() => ({}))
      if (res.ok && out.ok) { setStatus('success'); track('lead_form_success', { project: projectSlug, property_type: payload.propertyType, form_id: id }); return }
      setServerError(out.error ?? 'Something went wrong. Please try again.'); setStatus('error')
      track('lead_form_error', { reason: 'server', form_id: id })
    } catch {
      setServerError('Network error. Please check your connection and try again.'); setStatus('error')
      track('lead_form_error', { reason: 'network', form_id: id })
    }
  }

  const wa = whatsappLink(`Hello Infinity Realty, I'm interested in ${projectName ? projectName : 'Dubai off-plan properties'}. Please help me explore suitable options.`)

  if (status === 'success') {
    return (
      <section id={id} className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-[#E5E5E5]" role="status" aria-live="polite">
        <h2 className="text-2xl font-semibold text-[#151515]">Thank you — we&apos;ve received your enquiry</h2>
        <p className="mt-3 text-[#6B7280]">A Dubai property advisor will review your requirements and contact you with relevant options.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {wa && <a href={wa} onClick={() => track('whatsapp_click', { location: 'form_success' })} className="rounded-lg bg-[#F47721] px-5 py-3 font-medium text-white">Continue on WhatsApp</a>}
          {site.bookingUrl && <a href={site.bookingUrl} onClick={() => track('consultation_booking_click', { location: 'form_success' })} className="rounded-lg border border-[#151515] px-5 py-3 font-medium">Book a consultation</a>}
        </div>
      </section>
    )
  }

  const err = (k: string) => errors[k] ? <p id={`${id}-${k}-err`} className="mt-1 text-sm text-red-600">{errors[k]}</p> : null
  const a11y = (k: string) => ({ id: `${id}-${k}`, name: k, 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `${id}-${k}-err` : undefined })

  return (
    <section id={id} className="scroll-mt-4 rounded-2xl bg-white p-5 text-[#151515] shadow-sm ring-1 ring-[#E5E5E5] sm:p-7">
      <h2 className="text-xl font-semibold text-[#151515] sm:text-2xl">{title}</h2>
      
      <form onSubmit={onSubmit} onFocus={onStart} noValidate className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2 [&>*]:min-w-0">
        <div className="sm:col-span-2"><label htmlFor={`${id}-fullName`} className="mb-1 block text-sm font-medium">Full name</label><input {...a11y('fullName')} autoComplete="name" className={field} />{err('fullName')}</div>
        <div className="sm:col-span-2"><label htmlFor={`${id}-email`} className="mb-1 block text-sm font-medium">Email address</label><input {...a11y('email')} type="email" autoComplete="email" inputMode="email" className={field} />{err('email')}</div>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-phone`} className="mb-1 block text-sm font-medium">Phone number</label>
          <div className="flex gap-2">
            <select name="countryCode" aria-label="Country calling code" defaultValue="+971" className={`${field} !w-[7.5rem] shrink-0`}>{countryCodes.map((c) => <option key={c.code} value={c.code}>{c.label}</option>)}</select>
            <input {...a11y('phone')} type="tel" autoComplete="tel-national" inputMode="tel" className={`${field} !w-auto min-w-0 flex-1`} />
          </div>{err('phone')}
        </div>
        <div><label htmlFor={`${id}-propertyType`} className="mb-1 block text-sm font-medium">Preferred choice</label>
          <select {...a11y('propertyType')} defaultValue={defaultType ?? ''} className={field}><option value="" disabled>Select…</option>{propertyTypeOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select>{err('propertyType')}</div>
        <div><label htmlFor={`${id}-budgetBand`} className="mb-1 block text-sm font-medium">Investment range</label>
          <select {...a11y('budgetBand')} defaultValue="" className={field}><option value="" disabled>Select…</option>{budgetBands.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}</select>{err('budgetBand')}</div>
        {/* honeypot */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <p className="text-xs text-[#6B7280] sm:col-span-2">
          We use your details to respond to this enquiry. {site.privacyUrl ? <>See our <a className="underline" href={site.privacyUrl}>privacy policy</a>.</> : null}
        </p>
        {status === 'error' && <p role="alert" className="text-sm text-red-600 sm:col-span-2">{serverError}</p>}
        <button type="submit" disabled={status === 'sending'} className="rounded-lg bg-[#F47721] px-6 py-3.5 text-base font-semibold text-white hover:bg-[#d96a1c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#151515] disabled:opacity-60 sm:col-span-2">
          {status === 'sending' ? 'Sending…' : cta}
        </button>
      </form>
    </section>
  )
}
