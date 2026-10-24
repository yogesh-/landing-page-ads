import { SiteHeader, SiteFooter, MobileCta } from './Shell'
import { Hero, ProjectGrid, FAQ, generalFaq, Breadcrumbs, CategoryCards } from './Sections'
import { PageTracker, WhatsAppCTA } from './Client'
import LeadForm from './LeadForm'
import { campaigns } from '@/lib/campaigns'
import { img } from '@/lib/images'
import { projectsByType, type PropertyType } from '@/lib/projects'

export default function CategoryPage({ type, label, headline, sub }: { type: PropertyType; label: string; headline: string; sub: string }) {
  return (
    <>
      <PageTracker category={type} />
      <SiteHeader />
      <Breadcrumbs items={[{ name: 'Off-plan', href: '/off-plan' }, { name: label }]} />
      <main>
        <Hero c={campaigns.default} title={headline} sub={sub} image={img(`${type === 'villa' ? 'villas' : type + 's'}.jpg`) ?? img('hero.jpg')}><LeadForm defaultType={type} /></Hero>
        <ProjectGrid list={projectsByType(type)} emptyText={`No ${label.toLowerCase()} projects are listed yet. Share your requirements below and an advisor will suggest options.`} />
        <CategoryCards images={{ apartments: img('apartments.jpg'), villas: img('villas.jpg'), townhouses: img('townhouses.jpg') }} />
        <FAQ items={generalFaq} />
      </main>
      <SiteFooter />
      <MobileCta />
      <WhatsAppCTA />
    </>
  )
}
