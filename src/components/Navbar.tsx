'use client'

import { useEffect, useState } from 'react'

import { Icon } from './Icon'
import { NAV } from './nav'
import { btnPrimary, container } from './ui'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${scrolled || open ? 'bg-white/90 shadow-card backdrop-blur' : 'bg-transparent'}`}
    >
      <nav className={`${container} flex h-20 items-center justify-between`}>
        <a href="/" className="flex items-center gap-2.5" aria-label="Signal Digital">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/30">
            <Icon name="signal" className="h-5 w-5" strokeWidth={2.2} />
          </span>
          <span className="text-lg font-bold text-ink">
            Signal<span className="text-brand-600">Digital</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="text-sm font-medium text-slate-600 transition hover:text-brand-600">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <a href="/#kontak" className={btnPrimary}>
            Konsultasi Gratis
          </a>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-xl text-ink lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
        >
          <Icon name={open ? 'x' : 'menu'} />
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-100 bg-white shadow-soft lg:hidden">
          <ul className={`${container} flex flex-col gap-1 py-4`}>
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 font-medium text-ink hover:bg-brand-50">
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a href="/#kontak" onClick={() => setOpen(false)} className={`${btnPrimary} w-full`}>
                Konsultasi Gratis
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
