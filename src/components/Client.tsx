'use client'
import { useEffect } from 'react'
import { captureAttribution } from '@/lib/attribution'
import { track } from '@/lib/analytics'
import { whatsappLink } from '@/lib/config'

export function PageTracker({ event = 'landing_page_view', project, category }: { event?: string; project?: string; category?: string }) {
  useEffect(() => {
    captureAttribution()
    track(event, { path: location.pathname, project, category })
  }, [event, project, category])
  return null
}

export function WhatsAppCTA({ projectName }: { projectName?: string }) {
  const href = whatsappLink(`Hello Infinity Realty, I'm interested in ${projectName ?? 'Dubai off-plan properties'}. Please help me explore suitable options.`)
  if (!href) return null
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
      onClick={() => track('whatsapp_click', { project: projectName })}
      className="fixed bottom-20 right-4 lg:bottom-4 z-40 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg">
      WhatsApp
    </a>
  )
}

export function CategoryTrack({ category, href, children, className }: { category: string; href: string; children: React.ReactNode; className?: string }) {
  return <a href={href} className={className} onClick={() => track('category_select', { category })}>{children}</a>
}
