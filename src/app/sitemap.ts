import type { MetadataRoute } from 'next'
import { site } from '@/lib/config'
import { publishedProjects } from '@/lib/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/off-plan', '/off-plan/apartments', '/off-plan/villas', '/off-plan/townhouses', ...publishedProjects().map((p) => `/off-plan/${p.slug}`)]
  return paths.map((p) => ({ url: `${site.url}${p}`, lastModified: new Date() }))
}
