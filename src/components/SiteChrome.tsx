import type { SiteSetting } from '@/payload-types'

import { Icon } from './Icon'
import { NAV } from './nav'
import { container, waLink } from './ui'

export function SiteFooter({ s }: { s: SiteSetting }) {
  const wa = waLink(s.whatsapp)
  return (
    <footer className="bg-ink text-slate-400">
      <div className={`${container} grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4`}>
        <div className="lg:col-span-2">
          <a href="/" className="text-xl font-bold text-white">
            Signal<span className="text-brand-400">Digital</span>
          </a>
          {s.description && <p className="mt-4 max-w-sm text-sm leading-relaxed">{s.description}</p>}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Navigasi</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Kontak</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={wa} target="_blank" rel="noopener" className="hover:text-white">
                WhatsApp: {s.whatsappDisplay || s.whatsapp}
              </a>
            </li>
            {s.address && <li>{s.address}</li>}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className={`${container} py-6 text-xs`}>
          &copy; {new Date().getFullYear()} {s.legalName || s.siteName}. Hak cipta dilindungi.
        </p>
      </div>
    </footer>
  )
}

export function WhatsAppFloat({ number }: { number: string }) {
  return (
    <a
      href={waLink(number)}
      target="_blank"
      rel="noopener"
      aria-label="Chat via WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-emerald-500 py-3 pl-3 pr-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/40 transition hover:-translate-y-0.5 hover:bg-emerald-600 sm:pr-5"
    >
      <span className="grid h-8 w-8 place-items-center rounded-full bg-white/20">
        <Icon name="chat" className="h-5 w-5" />
      </span>
      <span className="hidden sm:inline">Chat kami</span>
    </a>
  )
}
