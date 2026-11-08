import { Icon } from '../Icon'
import { btnGhost, container, eyebrow } from '../ui'

type Props = {
  title: string
  description: string
  icon: string
  privacyNote: string
  children: React.ReactNode
}

/** Kerangka halaman tool: breadcrumb, judul, isi, dan ajakan konsultasi. */
export function ToolShell({ title, description, icon, privacyNote, children }: Props) {
  return (
    <div className={container}>
      <nav aria-label="Breadcrumb" className="text-sm">
        <ol className="flex flex-wrap items-center gap-2 text-slate-500">
          <li>
            <a href="/" className="hover:text-brand-600">
              Beranda
            </a>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <a href="/tools" className="hover:text-brand-600">
              Tools
            </a>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-ink">{title}</li>
        </ol>
      </nav>

      <header className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
        <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/30">
          <Icon name={icon} className="h-8 w-8" />
        </span>
        <div>
          <span className={eyebrow}>Tools Gratis</span>
          <h1 className="mt-3 text-3xl leading-tight sm:text-4xl">{title}</h1>
          <p className="mt-2 max-w-2xl">{description}</p>
        </div>
      </header>

      <div className="mt-10">{children}</div>

      <p className="mt-6 flex items-start gap-2 text-sm text-slate-500">
        <Icon name="shield" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
        {privacyNote}
      </p>

      <aside className="mt-14 flex flex-col items-start justify-between gap-5 rounded-3xl bg-ink p-8 text-slate-300 sm:flex-row sm:items-center sm:p-10">
        <div>
          <h2 className="text-xl text-white">Butuh sistem yang lebih lengkap untuk bisnis Anda?</h2>
          <p className="mt-2 text-sm">Kami membuat website dan aplikasi yang disesuaikan dengan alur kerja Anda.</p>
        </div>
        <a href="/#kontak" className={`${btnGhost} shrink-0 border-transparent`}>
          Konsultasi gratis <Icon name="arrow" className="h-4 w-4" />
        </a>
      </aside>
    </div>
  )
}
