import type { Metadata } from 'next'
import { SiteHeader, SiteFooter, MobileCta } from '@/components/Shell'
import { Hero, ProjectGrid, HowItWorks, FAQ, generalFaq, Benefits, FinalCta } from '@/components/Sections'
import { PageTracker, WhatsAppCTA } from '@/components/Client'
import TypeCards from '@/components/TypeCards'
import LeadForm from '@/components/LeadForm'
import { campaigns, resolveCampaignGroup } from '@/lib/campaigns'
import { img } from '@/lib/images'
import { publishedProjects } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Dubai Off-Plan Property: Apartments, Villas & Townhouses',
  description: "Explore new apartments, villas and townhouses across Dubai's residential communities. Compare projects and speak with an advisor.",
  alternates: { canonical: '/off-plan' },
}

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const group = resolveCampaignGroup(await searchParams)
  const c = campaigns[group]
  return (
    <>
      <PageTracker />
      <SiteHeader />
      <main>
        <Hero c={c} image={img('hero.jpg')}><LeadForm campaignGroup={group} /></Hero>
        <TypeCards images={{ apartment: img('apartments.jpg'), townhouse: img('townhouses.jpg'), villa: img('villas.jpg') }} />
        <Benefits />
        <ProjectGrid list={publishedProjects()} emptyText="Projects are being added. Share your requirements below and an advisor will help." />
        <HowItWorks />
        <FAQ items={generalFaq.slice(0, 4)} />
        <FinalCta />
      </main>
      <SiteFooter />
      <MobileCta />
      <WhatsAppCTA />
    </>
  )
}
