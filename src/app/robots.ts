import type { MetadataRoute } from 'next'
import { site } from '@/lib/config'
const prod = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === 'production' : process.env.NODE_ENV === 'production'
export default function robots(): MetadataRoute.Robots {
  return prod ? { rules: { userAgent: '*', allow: '/', disallow: '/api/' }, sitemap: `${site.url}/sitemap.xml` } : { rules: { userAgent: '*', disallow: '/' } }
}
