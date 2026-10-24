// Marketing-editable content per campaign group. Selected via utm_campaign or ?cg=gulf|international.
export interface CampaignContent {
  eyebrow?: string
  headline: string
  subline: string
  cta: string
}

const base: CampaignContent = {
  eyebrow: 'DUBAI OFF-PLAN PROPERTY',
  headline: 'Find Your Next Home or Investment in Dubai',
  subline: 'Tell us your budget and preferred property type. We’ll send a personalised shortlist of new off-plan apartments, townhouses and villas.',
  cta: 'Get My Shortlist',
}

export const campaigns: Record<string, CampaignContent> = {
  default: base,
  gulf: {
    ...base,
    subline: 'Compare Dubai communities and developer payment plans with a local advisor, and get a shortlist that fits your budget.',
  },
  international: {
    ...base,
    subline: 'Buying from overseas? Get a shortlist matched to your budget and a remote consultation with a Dubai-based advisor.',
  },
}

export function resolveCampaignGroup(sp: Record<string, string | string[] | undefined>): string {
  const pick = (k: string) => (Array.isArray(sp[k]) ? sp[k]![0] : (sp[k] as string | undefined))
  const explicit = pick('cg')?.toLowerCase()
  if (explicit && campaigns[explicit]) return explicit
  const c = pick('utm_campaign')?.toLowerCase() ?? ''
  if (c.includes('gulf')) return 'gulf'
  if (c.includes('international')) return 'international'
  return 'default'
}
