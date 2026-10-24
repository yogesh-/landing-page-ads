// All company details are read from env and rendered only when set — nothing is invented.
const env = (v: string | undefined) => (v && v.trim() ? v.trim() : undefined)

export const site = {
  name: 'Infinity Realty Real Estate',
  url: env(process.env.NEXT_PUBLIC_SITE_URL) ?? 'https://dxb.invest.infinityrealty.ae',
  phone: env(process.env.NEXT_PUBLIC_COMPANY_PHONE),
  email: env(process.env.NEXT_PUBLIC_COMPANY_EMAIL),
  address: env(process.env.NEXT_PUBLIC_COMPANY_ADDRESS),
  whatsappNumber: env(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER)?.replace(/\D/g, ''),
  bookingUrl: env(process.env.NEXT_PUBLIC_BOOKING_URL),
  privacyUrl: env(process.env.NEXT_PUBLIC_PRIVACY_URL),
  termsUrl: env(process.env.NEXT_PUBLIC_TERMS_URL),
  regulatory: env(process.env.NEXT_PUBLIC_REGULATORY_TEXT), // e.g. "RERA BRN xxxx · ORN xxxx"
  gtmId: env(process.env.NEXT_PUBLIC_GTM_ID),
  metaPixelId: env(process.env.NEXT_PUBLIC_META_PIXEL_ID),
}

export const CONSENT_TEXT_VERSION = 'v1'
export const PRIVACY_POLICY_VERSION = env(process.env.NEXT_PUBLIC_PRIVACY_VERSION) ?? 'unversioned'

export const budgetBands = [
  { value: 'below-1m', label: 'Below AED 1 million', min: undefined, max: 1_000_000 },
  { value: '1m-3m', label: 'AED 1 million – 3 million', min: 1_000_000, max: 3_000_000 },
  { value: '3m-6m', label: 'AED 3 million – 6 million', min: 3_000_000, max: 6_000_000 },
  { value: 'above-6m', label: 'Above AED 6 million', min: 6_000_000, max: undefined },
  { value: 'undecided', label: 'Undecided', min: undefined, max: undefined },
] as const

export const timelines = [
  { value: 'within-3-months', label: 'Within 3 months' },
  { value: '3-6-months', label: '3–6 months' },
  { value: '6-12-months', label: '6–12 months' },
  { value: 'researching', label: 'Researching' },
] as const

export const propertyTypeOptions = [
  { value: 'apartment', label: 'Apartment' },
  { value: 'villa', label: 'Villa' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'open', label: 'Open to recommendations' },
] as const

export const countryCodes = [
  { code: '+971', label: 'UAE +971' },
  { code: '+974', label: 'Qatar +974' },
  { code: '+965', label: 'Kuwait +965' },
  { code: '+1', label: 'US/Canada +1' },
  { code: '+44', label: 'UK +44' },
  { code: '+61', label: 'Australia +61' },
] as const

export const whatsappLink = (message: string) =>
  site.whatsappNumber ? `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}` : undefined
