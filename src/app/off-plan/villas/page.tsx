import type { Metadata } from 'next'
import CategoryPage from '@/components/CategoryPage'

export const metadata: Metadata = {
  title: 'Off-Plan Villas in Dubai',
  description: 'Discover villa communities and compare available layouts, locations and payment structures.',
  alternates: { canonical: '/off-plan/villas' },
}

export default function Page() {
  return <CategoryPage type="villa" label="Villas" headline="Explore Off-Plan Villas in Dubai" sub="Discover villa communities and compare available layouts, locations and payment structures." />
}
