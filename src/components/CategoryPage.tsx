import { SiteHeader, SiteFooter } from './Shell'
import { Hero, ProjectGrid, FAQ, generalFaq, Breadcrumbs, CategoryCards } from './Sections'
import { PageTracker, WhatsAppCTA } from './Client'
import LeadForm from './LeadForm'
import { campaigns } from '@/lib/campaigns'
import { projectsByType, type PropertyType } from '@/lib/projects'

export default function CategoryPage({ type, label, headline, sub }: { type: PropertyType; label: string; headline: string; sub: string }) {
  return (
    <>
      <PageTracker category={type} />
      <SiteHeader />
      <Breadcrumbs items={[{ name: 'Off-plan', href: '/off-plan' }, { name: label }]} />
      <main>
        <Hero c={campaigns.default} title={headline} sub={sub} />
        <ProjectGrid list={projectsByType(type)} emptyText={`No ${label.toLowerCase()} projects are listed yet. Share your requirements below and an advisor will suggest options.`} />
        <div className="mx-auto max-w-3xl px-4 pt-14"><LeadForm defaultType={type} title={`Find the right ${label.toLowerCase().replace(/s$/, '')} for you`} /></div>
        <CategoryCards />
        <FAQ items={generalFaq} />
      </main>
      <SiteFooter />
      <WhatsAppCTA />
    </>
  )
}
