'use client'

import { useState } from 'react'

import { Icon } from './Icon'

export function FaqList({ items }: { items: { id: number | string; question: string; answer: string }[] }) {
  const [active, setActive] = useState<number | null>(0)

  return (
    <div className="space-y-4">
      {items.map((faq, i) => {
        const isOpen = active === i
        return (
          <div key={faq.id} className="rounded-2xl bg-white shadow-card ring-1 ring-slate-100">
            <button
              type="button"
              onClick={() => setActive(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-${faq.id}`}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-ink"
            >
              {faq.question}
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition duration-200 ${isOpen ? 'rotate-45 bg-brand-600 text-white' : 'bg-brand-50 text-brand-600'}`}
              >
                <Icon name="plus" className="h-4 w-4" />
              </span>
            </button>
            <div
              id={`faq-${faq.id}`}
              className={`grid transition-all duration-200 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className="overflow-hidden">
                <p className="whitespace-pre-line px-6 pb-6 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
