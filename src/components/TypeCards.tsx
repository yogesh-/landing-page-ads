'use client'
import { track } from '@/lib/analytics'
import { TypeArt } from './Art'

const types = [
  { value: 'apartment', name: 'Apartments', copy: 'Modern living in Dubai’s most connected communities.' },
  { value: 'townhouse', name: 'Townhouses', copy: 'Family-friendly space with a community feel.' },
  { value: 'villa', name: 'Villas', copy: 'Private, spacious homes with room to grow.' },
] as const

// Tapping a card pre-fills the form and scrolls to it — no page change.
export default function TypeCards({ images }: { images?: Record<string, string | undefined> }) {
  const pick = (v: string) => {
    track('category_select', { category: v })
    const sel = document.getElementById('enquire-propertyType') as HTMLSelectElement | null
    if (sel) sel.value = v
    document.getElementById('enquire')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    sel?.focus({ preventScroll: true })
  }
  return (
    <section className="mx-auto max-w-6xl px-4 pt-12 sm:pt-16">
      <h2 className="text-2xl font-semibold sm:text-3xl">What are you looking for?</h2>
      <p className="mt-2 text-[#6B7280]">Pick a property type and we’ll build your shortlist around it.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {types.map((t) => (
          <button key={t.value} type="button" onClick={() => pick(t.value)} className="overflow-hidden rounded-2xl bg-white text-left ring-1 ring-[#E5E5E5] transition hover:ring-[#F47721]">
            {images?.[t.value] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={images[t.value]} alt={`${t.name} in Dubai`} width={800} height={450} loading="lazy" className="aspect-[16/9] w-full object-cover" />
            ) : <TypeArt type={t.value} />}
            <span className="block p-4"><span className="block text-lg font-semibold">{t.name}</span><span className="mt-1 block text-sm text-[#6B7280]">{t.copy}</span><span className="mt-2 block text-sm font-medium text-[#F47721]">Get {t.name.toLowerCase()} options ↓</span></span>
          </button>
        ))}
      </div>
    </section>
  )
}
