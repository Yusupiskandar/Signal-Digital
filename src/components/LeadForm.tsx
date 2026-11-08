'use client'

import { useActionState } from 'react'

import { submitLead, type LeadFormState } from '@/app/(frontend)/actions'

import { Icon } from './Icon'
import { btnPrimary, input } from './ui'

type Props = {
  needs: string[]
  budgets: string[]
  waUrl: string
}

const initial: LeadFormState = { status: 'idle' }

function FieldError({ msg }: { msg?: string }) {
  return msg ? <p className="mt-1.5 text-xs text-rose-600">{msg}</p> : null
}

export function LeadForm({ needs, budgets, waUrl }: Props) {
  const [state, action, pending] = useActionState(submitLead, initial)
  const v = state.values ?? {}
  const e = state.errors ?? {}

  if (state.status === 'success') {
    return (
      <div className="flex h-full flex-col items-center justify-center py-10 text-center" role="status">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
          <Icon name="check" className="h-8 w-8" />
        </span>
        <h3 className="mt-6 text-2xl">Terima kasih{state.name ? `, ${state.name}` : ''}!</h3>
        <p className="mt-3 max-w-sm">
          Permintaan Anda sudah kami terima. Tim kami akan menghubungi Anda lewat WhatsApp di jam kerja.
        </p>
        <a href={waUrl} target="_blank" rel="noopener" className={`${btnPrimary} mt-8`}>
          Chat sekarang via WhatsApp
        </a>
      </div>
    )
  }

  // key memaksa input memakai defaultValue terbaru setelah error validasi.
  const k = JSON.stringify(v)

  return (
    <form action={action} className="grid gap-5 sm:grid-cols-2" noValidate key={k}>
      <div className="hidden" aria-hidden="true">
        <label>
          Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.status === 'error' && state.message && (
        <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700 sm:col-span-2" role="alert">
          {state.message}
        </p>
      )}

      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink">
          Nama lengkap <span className="text-rose-500">*</span>
        </label>
        <input id="name" name="name" type="text" defaultValue={v.name} required maxLength={100} className={input} placeholder="Nama Anda" />
        <FieldError msg={e.name} />
      </div>
      <div>
        <label htmlFor="whatsapp" className="mb-2 block text-sm font-medium text-ink">
          Nomor WhatsApp <span className="text-rose-500">*</span>
        </label>
        <input id="whatsapp" name="whatsapp" type="tel" defaultValue={v.whatsapp} required className={input} placeholder="08xx xxxx xxxx" />
        <FieldError msg={e.whatsapp} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink">
          Email <span className="text-slate-400">(opsional)</span>
        </label>
        <input id="email" name="email" type="email" defaultValue={v.email} className={input} placeholder="nama@perusahaan.com" />
        <FieldError msg={e.email} />
      </div>
      <div>
        <label htmlFor="need" className="mb-2 block text-sm font-medium text-ink">
          Jenis kebutuhan <span className="text-rose-500">*</span>
        </label>
        <select id="need" name="need" required defaultValue={v.need ?? ''} className={input}>
          <option value="" disabled>
            Pilih kebutuhan
          </option>
          {needs.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <FieldError msg={e.need} />
      </div>
      <div>
        <label htmlFor="budget" className="mb-2 block text-sm font-medium text-ink">
          Estimasi budget
        </label>
        <select id="budget" name="budget" defaultValue={v.budget ?? budgets[0] ?? ''} className={input}>
          {budgets.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
        <FieldError msg={e.budget} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">
          Ceritakan kebutuhan Anda <span className="text-rose-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          maxLength={3000}
          defaultValue={v.message}
          className={input}
          placeholder="Contoh: Saya punya usaha katering dan ingin website untuk menerima pesanan online..."
        />
        <FieldError msg={e.message} />
      </div>
      <div className="sm:col-span-2">
        <button type="submit" disabled={pending} className={`${btnPrimary} w-full py-4`}>
          {pending ? 'Mengirim...' : 'Kirim & Jadwalkan Konsultasi'}
          {!pending && <Icon name="arrow" className="h-4 w-4" />}
        </button>
        <p className="mt-3 text-center text-xs text-slate-400">
          Data Anda hanya dipakai untuk menghubungi Anda terkait konsultasi.
        </p>
      </div>
    </form>
  )
}
