// Kumpulan class Tailwind yang dipakai berulang, supaya tampilan konsisten.

export const container = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'

const btnBase =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-200 focus:outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-60'

export const btnPrimary = `${btnBase} bg-brand-600 text-white shadow-lg shadow-brand-600/30 hover:bg-brand-700 focus-visible:ring-brand-300`
export const btnAccent = `${btnBase} bg-accent-500 text-ink shadow-lg shadow-accent-500/30 hover:bg-accent-400 focus-visible:ring-accent-400/50`
export const btnGhost = `${btnBase} border border-slate-200 bg-white text-ink hover:border-brand-300 hover:text-brand-700 focus-visible:ring-brand-100`

export const section = 'py-20 lg:py-28'
export const eyebrow =
  'inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-700'
export const sectionTitle = 'mt-4 text-3xl leading-tight sm:text-4xl'

export const card = 'rounded-3xl border border-slate-100 bg-white p-7 shadow-card transition duration-300'
export const cardHover = 'hover:-translate-y-1 hover:border-brand-200 hover:shadow-soft'

export const input =
  'block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-ink placeholder:text-slate-400 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/30'

export const waLink = (number: string, text = 'Halo Signal Digital, saya ingin konsultasi.') =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`
