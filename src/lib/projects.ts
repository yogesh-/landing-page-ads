export type PropertyType = 'apartment' | 'villa' | 'townhouse'

export interface Project {
  id: string
  slug: string
  projectName: string
  developerName: string
  propertyTypes: PropertyType[]
  location?: string
  shortDescription?: string
  longDescription?: string
  startingPrice?: number
  currency?: string
  paymentPlan?: string
  bookingAmount?: string
  completionDate?: string
  bedrooms?: string
  unitConfigurations?: string[]
  heroImage?: string
  gallery?: { src: string; alt: string }[]
  masterplanImage?: string
  keyFeatures?: string[]
  nearbyLandmarks?: { name: string; distance: string }[]
  projectStatus?: string
  salesStatus?: string
  brochureUrl?: string
  floorPlanUrls?: string[]
  officialProjectUrl?: string
  reraPermitNumber?: string
  lastVerifiedAt?: string // ISO date
  featured?: boolean
  published: boolean
}

// Single source of project data. Only add facts that have been verified.
export const projects: Project[] = [
  {
    id: 'grand-polo-emaar',
    slug: 'grand-polo-emaar',
    projectName: 'Grand Polo Club & Resort',
    developerName: 'Emaar',
    // TODO(verify): propertyTypes, location, price, payment plan, handover, permit number, imagery.
    propertyTypes: [],
    featured: true,
    published: true,
  },
]

export const publishedProjects = () => projects.filter((p) => p.published)
export const getProject = (slug: string) => publishedProjects().find((p) => p.slug === slug)
export const projectsByType = (t: PropertyType) => publishedProjects().filter((p) => p.propertyTypes.includes(t))

export const formatPrice = (p: Project) =>
  p.startingPrice ? `${p.currency ?? 'AED'} ${p.startingPrice.toLocaleString('en-US')}` : undefined
