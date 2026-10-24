// Marketing-editable content per campaign group. Selected via utm_campaign or ?cg=gulf|international.
export interface CampaignContent {
  eyebrow?: string
  headline: string
  subline: string
  cta: string
}

const base: CampaignContent = {
  eyebrow: 'DUBAI OFF-PLAN PROPERTY',
  headline: 'Discover Your Next Property in Dubai',
  subline: "Explore new apartments, villas and townhouses across Dubai's residential communities.",
  cta: 'Get a Personalised Shortlist',
}

export const campaigns: Record<string, CampaignContent> = {
  default: base,
  gulf: {
    ...base,
    subline: 'Compare Dubai communities, property types and developer payment plans with a local advisor.',
  },
  international: {
    ...base,
    subline: 'Understand the off-plan buying process from overseas, compare projects and book a remote consultation.',
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
