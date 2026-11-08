import { Navbar } from '@/components/Navbar'
import { SiteFooter, WhatsAppFloat } from '@/components/SiteChrome'
import { getSettings } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export default async function ToolsLayout({ children }: { children: React.ReactNode }) {
  const s = await getSettings()
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] bg-gradient-to-b from-brand-50 via-white to-white pb-24 pt-28 lg:pt-36">{children}</main>
      <SiteFooter s={s} />
      <WhatsAppFloat number={s.whatsapp} />
    </>
  )
}
