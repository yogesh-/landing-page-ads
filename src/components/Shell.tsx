import Link from 'next/link'
import { site } from '@/lib/config'

const nav = [
  { href: '/off-plan/apartments', label: 'Apartments' },
  { href: '/off-plan/villas', label: 'Villas' },
  { href: '/off-plan/townhouses', label: 'Townhouses' },
  { href: '/off-plan#projects', label: 'New Launches' },
]

export function SiteHeader() {
  return (
    <header className="border-b border-[#E5E5E5] bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/off-plan" className="flex items-center gap-2 font-semibold text-[#151515]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" width={36} height={36} className="h-9 w-auto" />
          <span className="text-sm sm:text-base">Infinity Realty</span>
        </Link>
        <nav aria-label="Main" className="hidden gap-6 text-sm md:flex">
          {nav.map((n) => <Link key={n.href} href={n.href} className="text-[#151515] hover:text-[#F47721]">{n.label}</Link>)}
        </nav>
        <a href="#enquire" className="rounded-lg bg-[#F47721] px-4 py-2 text-sm font-medium text-white">Speak to an Advisor</a>
      </div>
      {/* Mobile nav: always-visible horizontal list, no hover or hamburger JS needed */}
      <nav aria-label="Main mobile" className="flex gap-5 overflow-x-auto border-t border-[#E5E5E5] px-4 py-2 text-sm md:hidden">
        {nav.map((n) => <Link key={n.href} href={n.href} className="whitespace-nowrap">{n.label}</Link>)}
      </nav>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-[#151515] text-sm text-white/80">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-2">
        <div>
          <p className="font-semibold text-white">{site.name}</p>
          <p className="mt-2">Infinity Realty is a real estate brokerage. It is not the developer of the projects shown.</p>
          {site.regulatory && <p className="mt-2">{site.regulatory}</p>}
        </div>
        <div className="space-y-1">
          {site.phone && <p>Phone: <a href={`tel:${site.phone}`} className="underline">{site.phone}</a></p>}
          {site.email && <p>Email: <a href={`mailto:${site.email}`} className="underline">{site.email}</a></p>}
          {site.address && <p>{site.address}</p>}
          <p className="space-x-4 pt-2">
            {site.privacyUrl && <a href={site.privacyUrl} className="underline">Privacy policy</a>}
            {site.termsUrl && <a href={site.termsUrl} className="underline">Terms</a>}
          </p>
        </div>
      </div>
      <p className="border-t border-white/10 px-4 py-4 text-center text-xs">© {new Date().getFullYear()} {site.name}. Prices and details are indicative and subject to confirmation.</p>
    </footer>
  )
}
