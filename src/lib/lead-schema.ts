import { z } from 'zod'
import { budgetBands, propertyTypeOptions, countryCodes } from './config'

const safe = z.string().max(200).regex(/^[\w\-.:@/ %+=&,()]*$/, 'invalid').optional()

export const attributionSchema = z
  .object({
    utm_source: safe, utm_medium: safe, utm_campaign: safe, utm_content: safe, utm_term: safe,
    campaign_id: safe, ad_group_id: safe, ad_id: safe, gclid: safe, fbclid: safe, msclkid: safe,
    landing_path: z.string().max(300).optional(),
    referrer: z.string().max(300).optional(),
  })
  .partial()

export type Attribution = z.infer<typeof attributionSchema>

export const leadSchema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your full name').max(100),
  email: z.string().trim().email('Please enter a valid email address').max(200),
  countryCode: z.enum(countryCodes.map((c) => c.code) as [string, ...string[]]),
  phone: z.string().trim().regex(/^[0-9\s\-()]{6,16}$/, 'Please enter a valid phone number'),
  propertyType: z.enum(propertyTypeOptions.map((o) => o.value) as [string, ...string[]], {
    message: 'Please choose a property type',
  }),
  budgetBand: z.enum(budgetBands.map((b) => b.value) as [string, ...string[]], { message: 'Please choose a budget' }),
  projectSlug: z.string().max(100).optional(),
  consentMarketing: z.boolean().default(false),
  consentTextVersion: z.string().max(40).optional(),
  privacyPolicyVersion: z.string().max(40).optional(),
  website: z.string().max(0).optional(), // honeypot
  idempotencyKey: z.string().min(8).max(80),
  campaignGroup: z.string().max(40).optional(),
  attribution: z.object({ first: attributionSchema.optional(), last: attributionSchema.optional() }).optional(),
})

export type LeadInput = z.infer<typeof leadSchema>
