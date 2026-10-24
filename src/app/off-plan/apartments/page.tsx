import type { Metadata } from 'next'
import CategoryPage from '@/components/CategoryPage'

export const metadata: Metadata = {
  title: 'Off-Plan Apartments in Dubai',
  description: 'Compare apartment developments, layouts, locations and payment plans.',
  alternates: { canonical: '/off-plan/apartments' },
}

export default function Page() {
  return <CategoryPage type="apartment" label="Apartments" headline="Explore Off-Plan Apartments in Dubai" sub="Compare apartment developments, layouts, locations and payment plans." />
}
