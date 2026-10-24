import type { Metadata } from 'next'
import CategoryPage from '@/components/CategoryPage'

export const metadata: Metadata = {
  title: 'Off-Plan Townhouses in Dubai',
  description: 'Compare townhouse communities, layouts and project details across Dubai.',
  alternates: { canonical: '/off-plan/townhouses' },
}

export default function Page() {
  return <CategoryPage type="townhouse" label="Townhouses" headline="Explore Off-Plan Townhouses in Dubai" sub="Compare townhouse communities, layouts and project details across Dubai." />
}
