import type { Metadata } from 'next'
import { SiteHeader, SiteFooter } from '@/components/Shell'
import { Hero, CategoryCards, ProjectGrid, HowItWorks, FAQ, generalFaq } from '@/components/Sections'
import { PageTracker, WhatsAppCTA } from '@/components/Client'
import LeadForm from '@/components/LeadForm'
import { campaigns, resolveCampaignGroup } from '@/lib/campaigns'
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
        <Hero c={c} />
        <CategoryCards />
        <ProjectGrid list={publishedProjects()} emptyText="Projects are being added. Share your requirements below and an advisor will help." />
        <section className="mx-auto max-w-6xl px-4 pt-14">
          <h2 className="text-2xl font-semibold">Why explore Dubai off-plan?</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[#6B7280]">
            <li>Compare different residential communities side by side.</li>
            <li>Review payment-plan structures and expected handover timelines.</li>
            <li>Choose a property type based on your own requirements.</li>
            <li>Talk through the options with an advisor before deciding.</li>
          </ul>
        </section>
        <HowItWorks />
        <div className="mx-auto max-w-3xl px-4 pt-14"><LeadForm campaignGroup={group} /></div>
        <FAQ items={generalFaq} />
      </main>
      <SiteFooter />
      <WhatsAppCTA />
    </>
  )
}
