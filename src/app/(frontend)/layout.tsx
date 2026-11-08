import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import React from 'react'

import { getHomeData } from '@/lib/payload'

import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#4f3fe7',
}

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getHomeData()
  const name = settings.siteName || 'Signal Digital'
  const title = settings.tagline ? `${name} — ${settings.tagline}` : name
  const description = settings.description || undefined
  const base = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  return {
    metadataBase: new URL(base),
    title,
    description,
    alternates: { canonical: '/' },
    openGraph: { type: 'website', siteName: name, title, description, url: '/', locale: 'id_ID' },
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={poppins.variable}>
      <body>{children}</body>
    </html>
  )
}
