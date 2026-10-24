import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { site } from '@/lib/config'

const inter = Inter({ subsets: ['latin'], display: 'swap' })
const prod = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === 'production' : process.env.NODE_ENV === 'production'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Dubai Off-Plan Property | Infinity Realty', template: '%s | Infinity Realty' },
  description: "Explore new apartments, villas and townhouses across Dubai's residential communities.",
  robots: prod ? { index: true, follow: true } : { index: false, follow: false },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-[#151515] antialiased`}>
        {children}
        {/* GTM only when an ID is configured. Add consent-mode handling in GTM before enabling ad tags. */}
        {site.gtmId && (
          <Script id="gtm" strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${site.gtmId}');`}</Script>
        )}
      </body>
    </html>
  )
}
