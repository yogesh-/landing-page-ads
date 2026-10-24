import Link from 'next/link'
import Image from 'next/image'
import { Skyline } from './Art'
import { CategoryTrack } from './Client'
import { type Project, formatPrice } from '@/lib/projects'
import type { CampaignContent } from '@/lib/campaigns'

export function Hero({ c, title, sub, image, children }: { c: CampaignContent; title?: string; sub?: string; image?: string; children?: React.ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden bg-[#151515] text-white">
      {!image && <Skyline className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 w-full sm:h-56" />}
      {image && <Image src={image} alt="Dubai residential skyline" fill priority sizes="100vw" className="-z-10 object-cover opacity-45" />}
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 py-10 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] [&>*]:min-w-0">
        <div>
          {c.eyebrow && !title && <p className="text-xs tracking-[0.2em] text-[#F47721]">{c.eyebrow}</p>}
          <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-5xl">{title ?? c.headline}</h1>
          <p className="mt-3 max-w-xl text-base text-white/85 sm:text-lg">{sub ?? c.subline}</p>
          <div className="mt-6 hidden flex-wrap gap-3 lg:flex">
            <a href="#projects" className="rounded-lg border border-white/60 px-5 py-3 text-sm font-semibold">Explore Projects</a>
          </div>
          <p className="mt-4 hidden text-sm text-white/60 sm:block">Compare verified project details, starting prices and payment plans.</p>
        </div>
        {children}
      </div>
    </section>
  )
}

const cats = [
  { href: '/off-plan/apartments', name: 'Apartments', copy: 'Compare apartment developments, layouts, locations and payment plans.' },
  { href: '/off-plan/villas', name: 'Villas', copy: 'Discover villa communities and compare layouts and payment structures.' },
  { href: '/off-plan/townhouses', name: 'Townhouses', copy: 'Compare townhouse communities, layouts and project details.' },
]

export function CategoryCards({ images = {} }: { images?: Record<string, string | undefined> }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-14">
      <h2 className="text-2xl font-semibold">Browse by property type</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {cats.map((c) => (
          <CategoryTrack key={c.href} category={c.name.toLowerCase()} href={c.href} className="overflow-hidden rounded-2xl bg-[#F7F6F3] ring-1 ring-[#E5E5E5] hover:ring-[#F47721]">
            {images[c.name.toLowerCase()] && <Image src={images[c.name.toLowerCase()]!} alt={`${c.name} in Dubai`} width={800} height={500} sizes="(min-width:640px) 33vw, 100vw" className="aspect-[16/10] w-full object-cover" />}
            <div className="p-5"><h3 className="text-xl font-semibold">{c.name}</h3>
            <p className="mt-2 text-sm text-[#6B7280]">{c.copy}</p>
            <span className="mt-4 inline-block text-sm font-medium text-[#F47721]">Explore {c.name.toLowerCase()} →</span></div>
          </CategoryTrack>
        ))}
      </div>
    </section>
  )
}

export function ProjectCard({ p }: { p: Project }) {
  const price = formatPrice(p)
  return (
    <article className="rounded-2xl bg-white p-6 ring-1 ring-[#E5E5E5]">
      <h3 className="text-lg font-semibold">{p.projectName}</h3>
      <p className="text-sm text-[#6B7280]">{[p.developerName, p.location].filter(Boolean).join(' · ')}</p>
      <dl className="mt-3 space-y-1 text-sm">
        {price && <div><dt className="inline text-[#6B7280]">Starting price: </dt><dd className="inline">{price}</dd></div>}
        {p.paymentPlan && <div><dt className="inline text-[#6B7280]">Payment plan: </dt><dd className="inline">{p.paymentPlan}</dd></div>}
        {p.completionDate && <div><dt className="inline text-[#6B7280]">Handover: </dt><dd className="inline">{p.completionDate}</dd></div>}
      </dl>
      <Link href={`/off-plan/${p.slug}`} className="mt-4 inline-block text-sm font-medium text-[#F47721]">View Project Details →</Link>
    </article>
  )
}

export function ProjectGrid({ list, emptyText }: { list: Project[]; emptyText: string }) {
  const shown = list.filter((p) => p.startingPrice || p.paymentPlan || p.completionDate || p.location)
  if (!shown.length) return emptyText ? null : null
  list = shown
  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-4 px-4 pt-14">
      <h2 className="text-2xl font-semibold">Featured developments</h2>
      {list.length ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{list.map((p) => <ProjectCard key={p.id} p={p} />)}</div>
      ) : (
        <p className="mt-6 rounded-xl bg-[#F7F6F3] p-6 text-[#6B7280]">{emptyText}</p>
      )}
    </section>
  )
}

export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <section className="mx-auto max-w-3xl px-4 pt-14">
      <h2 className="text-2xl font-semibold">Frequently asked questions</h2>
      <div className="mt-6 divide-y divide-[#E5E5E5] rounded-2xl bg-white ring-1 ring-[#E5E5E5]">
        {items.map((i) => (
          <details key={i.q} className="group p-5">
            <summary className="cursor-pointer list-none font-medium focus-visible:outline-2 focus-visible:outline-[#F47721]">{i.q}</summary>
            <p className="mt-3 text-[#6B7280]">{i.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

export const generalFaq = [
  { q: 'How does buying off-plan property in Dubai work?', a: 'Off-plan means purchasing a property that is still under construction, usually via a sales agreement with the developer and a staged payment plan. Exact steps depend on the project and your circumstances; an advisor can walk you through them. This is general information, not legal advice.' },
  { q: 'What should I compare before choosing a project?', a: 'Location, developer track record, unit types and sizes, payment-plan structure, expected handover date and service charges are common points of comparison.' },
  { q: 'How do developer payment plans work?', a: 'Plans typically split the price into a booking amount, instalments during construction and a final payment on or after handover. Terms differ per project and can change, so confirm the current plan before booking.' },
  { q: 'What information should I verify before booking?', a: 'Confirm the current price and availability, the payment schedule, the registered project and permit details, handover timeline and all fees with the developer or an authorised broker. Consider independent legal and financial advice.' },
  { q: 'Can an overseas buyer arrange a remote consultation?', a: 'Yes. Share your preferences through the form and an advisor can arrange a call or video consultation at a time that suits your time zone.' },
  { q: 'How can I compare apartments, villas and townhouses?', a: 'Consider space and layout needs, community facilities, budget and how you plan to use the property. An advisor can shortlist options across all three types.' },
]

export function HowItWorks() {
  const steps = ['Tell us your budget and preferred property type.', 'We shortlist projects that match.', 'An advisor contacts you to talk it through.']
  return (
    <section className="mx-auto max-w-6xl px-4 pt-14">
      <h2 className="text-2xl font-semibold">How it works</h2>
      <ol className="mt-6 grid gap-4 sm:grid-cols-3">
        {steps.map((s, i) => <li key={s} className="rounded-2xl bg-[#F7F6F3] p-6"><span className="text-[#F47721] font-semibold">0{i + 1}</span><p className="mt-2 font-medium">{s}</p></li>)}
      </ol>
    </section>
  )
}

export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-4 pt-4 text-sm text-[#6B7280]">
      {items.map((i, n) => <span key={i.name}>{i.href ? <Link href={i.href} className="underline">{i.name}</Link> : i.name}{n < items.length - 1 && ' / '}</span>)}
    </nav>
  )
}

export function Benefits() {
  const items = [
    { t: 'A shortlist matched to you', d: 'Tell us your budget and property type. We shortlist projects that fit, instead of sending you a long catalogue.' },
    { t: 'Clear payment-plan comparisons', d: 'See how booking amounts, instalments and handover payments compare across developers, side by side.' },
    { t: 'Advice from a Dubai-based team', d: 'Speak with an advisor by call or WhatsApp, from wherever you are, at a time that suits you.' },
  ]
  return (
    <section className="mx-auto max-w-6xl px-4 pt-12 sm:pt-16">
      <h2 className="text-2xl font-semibold sm:text-3xl">Why buyers start here</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {items.map((i) => <div key={i.t} className="rounded-2xl bg-[#F7F6F3] p-6"><h3 className="font-semibold">{i.t}</h3><p className="mt-2 text-sm text-[#6B7280]">{i.d}</p></div>)}
      </div>
    </section>
  )
}

export function FinalCta() {
  return (
    <section className="mx-auto mt-12 max-w-6xl px-4 sm:mt-16">
      <div className="rounded-2xl bg-[#151515] p-8 text-center text-white sm:p-12">
        <h2 className="text-2xl font-semibold sm:text-3xl">Ready to see options that fit?</h2>
        <p className="mx-auto mt-2 max-w-xl text-white/75">Share your name, number and budget. An advisor will get back to you with a personalised shortlist.</p>
        <a href="#enquire" className="mt-6 inline-block rounded-lg bg-[#F47721] px-7 py-3.5 font-semibold">Get My Shortlist</a>
      </div>
    </section>
  )
}
