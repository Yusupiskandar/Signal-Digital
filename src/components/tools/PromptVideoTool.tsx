'use client'

import { useMemo, useState } from 'react'

import { Icon } from '../Icon'
import { btnGhost, btnPrimary } from '../ui'

export type PromptItem = {
  id: number
  title: string
  category: string
  model: string
  prompt: string
  preview: { url: string; alt: string; isVideo: boolean } | null
}

const ALL = 'Semua'

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    // Cadangan untuk browser/konteks tanpa Clipboard API (mis. http).
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    ta.remove()
  }
}

function Preview({ item }: { item: PromptItem }) {
  if (!item.preview) {
    return (
      <div className="grid h-full w-full place-items-center text-slate-300">
        <Icon name="video" className="h-12 w-12" />
      </div>
    )
  }
  if (item.preview.isVideo) {
    return (
      <video
        src={item.preview.url}
        className="h-full w-full object-cover"
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        aria-label={item.preview.alt}
      />
    )
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={item.preview.url} alt={item.preview.alt} loading="lazy" className="h-full w-full object-cover" />
}

function PromptCard({ item }: { item: PromptItem }) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const onCopy = async () => {
    await copyText(item.prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-card">
      <div className="relative aspect-video bg-slate-100">
        <Preview item={item} />
        {item.model && (
          <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
            {item.model}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        {item.category && <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">{item.category}</span>}
        <h2 className="mt-1 text-base">{item.title}</h2>
        <p className={`mt-3 whitespace-pre-line rounded-2xl bg-slate-50 p-4 font-mono text-xs leading-relaxed text-slate-600 ${expanded ? '' : 'line-clamp-4'}`}>
          {item.prompt}
        </p>
        <button type="button" onClick={() => setExpanded((v) => !v)} className="mt-2 self-start text-xs font-medium text-brand-600 hover:underline">
          {expanded ? 'Tutup' : 'Lihat prompt lengkap'}
        </button>
        <button type="button" onClick={onCopy} className={`${copied ? btnGhost : btnPrimary} mt-auto w-full`} aria-live="polite">
          <Icon name={copied ? 'check' : 'copy'} className="h-4 w-4" />
          {copied ? 'Prompt tersalin!' : 'Salin prompt'}
        </button>
      </div>
    </article>
  )
}

export function PromptVideoTool({ items }: { items: PromptItem[] }) {
  const [category, setCategory] = useState(ALL)
  const [query, setQuery] = useState('')

  const categories = useMemo(() => [ALL, ...Array.from(new Set(items.map((i) => i.category).filter(Boolean)))], [items])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter(
      (i) =>
        (category === ALL || i.category === category) &&
        (!q || i.title.toLowerCase().includes(q) || i.prompt.toLowerCase().includes(q)),
    )
  }, [items, category, query])

  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-100 bg-white p-10 text-center shadow-card">
        <Icon name="video" className="mx-auto h-10 w-10 text-slate-300" />
        <p className="mt-3">Belum ada prompt yang tersedia. Segera hadir!</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {categories.length > 2 ? (
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${category === c ? 'bg-brand-600 text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:text-brand-700'}`}
              >
                {c}
              </button>
            ))}
          </div>
        ) : (
          <span />
        )}
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari prompt..."
          aria-label="Cari prompt"
          className="w-full rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 sm:w-64"
        />
      </div>

      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <PromptCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center">Tidak ada prompt yang cocok.</p>
      )}
    </div>
  )
}
