import type { Tool } from '@/payload-types'

import { Icon } from './Icon'

export function ToolCard({ tool }: { tool: Pick<Tool, 'slug' | 'status' | 'icon' | 'title' | 'text'> }) {
  const active = tool.status === 'active'
  const body = (
    <>
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white">
        <Icon name={tool.icon} />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="flex flex-wrap items-center gap-2 text-base">
          {tool.title}
          {!active && <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">Segera hadir</span>}
        </h3>
        <p className="mt-1 text-sm">{tool.text}</p>
      </div>
      {active && <Icon name="arrow" className="mt-1 h-5 w-5 shrink-0 text-brand-600 transition group-hover:translate-x-1" />}
    </>
  )

  const cls = 'group flex items-start gap-4 rounded-2xl bg-white p-5 shadow-card ring-1 ring-transparent transition'
  return active ? (
    <a href={`/tools/${tool.slug}`} className={`${cls} hover:-translate-y-0.5 hover:shadow-soft hover:ring-brand-200`}>
      {body}
    </a>
  ) : (
    <div className={`${cls} opacity-70`}>{body}</div>
  )
}
