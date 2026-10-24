import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SiteHeader, SiteFooter } from '@/components/Shell'
import { Breadcrumbs, FAQ, generalFaq } from '@/components/Sections'
import { PageTracker, WhatsAppCTA } from '@/components/Client'
import LeadForm from '@/components/LeadForm'
import { getProject, publishedProjects, formatPrice } from '@/lib/projects'

export const dynamicParams = false
export const generateStaticParams = () => publishedProjects().map((p) => ({ slug: p.slug }))

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProject((await params).slug)
  if (!p) return {}
  return {
    title: `${p.projectName} by ${p.developerName}`,
    description: p.shortDescription ?? `Request details for ${p.projectName} by ${p.developerName} in Dubai.`,
    alternates: { canonical: `/off-plan/${p.slug}` },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug)
  if (!p) notFound()
  const price = formatPrice(p)
  const facts = [
    ['Developer', p.developerName], ['Location', p.location], ['Starting price', price], ['Payment plan', p.paymentPlan],
    ['Booking amount', p.bookingAmount], ['Handover', p.completionDate], ['Bedrooms', p.bedrooms], ['Status', p.projectStatus],
    ['Permit no.', p.reraPermitNumber],
  ].filter(([, v]) => v) as [string, string][]
  return (
    <>
      <PageTracker event="project_view" project={p.slug} />
      <SiteHeader />
      <Breadcrumbs items={[{ name: 'Off-plan', href: '/off-plan' }, { name: p.projectName }]} />
      <main>
        <section className="bg-[#151515] text-white">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <p className="text-sm text-[#F47721]">{[p.developerName, p.location].filter(Boolean).join(' · ')}</p>
            <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">{p.projectName}</h1>
            {p.shortDescription && <p className="mt-4 max-w-2xl text-lg text-white/80">{p.shortDescription}</p>}
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#enquire" className="rounded-lg bg-[#F47721] px-6 py-3.5 font-semibold">Request Project Details</a>
              <a href="#enquire" className="rounded-lg border border-white/60 px-6 py-3.5 font-semibold">Speak to an Advisor</a>
            </div>
          </div>
        </section>
        {facts.length > 0 && (
          <section className="mx-auto max-w-6xl px-4 pt-14">
            <h2 className="text-2xl font-semibold">Project details</h2>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {facts.map(([k, v]) => <div key={k} className="rounded-xl bg-[#F7F6F3] p-4"><dt className="text-sm text-[#6B7280]">{k}</dt><dd className="mt-1 font-medium">{v}</dd></div>)}
            </dl>
            {p.lastVerifiedAt && <p className="mt-3 text-xs text-[#6B7280]">Last verified: {p.lastVerifiedAt}. Details are indicative and subject to change.</p>}
          </section>
        )}
        {p.longDescription && <section className="mx-auto max-w-3xl px-4 pt-14"><p className="text-[#6B7280]">{p.longDescription}</p></section>}
        {p.keyFeatures?.length ? (
          <section className="mx-auto max-w-6xl px-4 pt-14"><h2 className="text-2xl font-semibold">Highlights</h2>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-[#6B7280]">{p.keyFeatures.map((f) => <li key={f}>{f}</li>)}</ul></section>
        ) : null}
        {p.nearbyLandmarks?.length ? (
          <section className="mx-auto max-w-6xl px-4 pt-14"><h2 className="text-2xl font-semibold">Location</h2>
            <ul className="mt-4 space-y-1 text-[#6B7280]">{p.nearbyLandmarks.map((l) => <li key={l.name}>{l.name} — {l.distance}</li>)}</ul></section>
        ) : null}
        <div className="mx-auto max-w-3xl px-4 pt-14">
          <LeadForm projectSlug={p.slug} projectName={p.projectName} title={`Get details for ${p.projectName}`} cta="Request Project Details" />
        </div>
        <FAQ items={generalFaq.slice(0, 4)} />
        <p className="mx-auto max-w-3xl px-4 pt-8 text-xs text-[#6B7280]">Infinity Realty is a real estate brokerage and is not the developer of {p.projectName}.</p>
      </main>
      <SiteFooter />
      <WhatsAppCTA projectName={p.projectName} />
    </>
  )
}
