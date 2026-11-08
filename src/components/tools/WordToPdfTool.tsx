'use client'

import { useRef, useState } from 'react'

import { Icon } from '../Icon'
import { btnPrimary } from '../ui'

const MAX_MB = 10
const EXTS = ['docx', 'doc', 'odt', 'rtf']

export function WordToPdfTool({ available }: { available: boolean }) {
  const [file, setFile] = useState<File | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState('')
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const pick = (f: File | undefined) => {
    setError('')
    setDone('')
    if (!f) return
    const ext = f.name.split('.').pop()?.toLowerCase() ?? ''
    if (!EXTS.includes(ext)) return setError('Format didukung: .docx, .doc, .odt, .rtf.')
    if (f.size > MAX_MB * 1024 * 1024) return setError(`Ukuran file maksimal ${MAX_MB} MB.`)
    setFile(f)
  }

  const convert = async () => {
    if (!file) return
    setBusy(true)
    setError('')
    setDone('')
    try {
      const body = new FormData()
      body.append('file', file)
      const res = await fetch('/tools/word-ke-pdf/convert', { method: 'POST', body })
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error || 'Konversi gagal. Coba lagi nanti.')
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${file.name.replace(/\.[^.]+$/, '')}.pdf`
      a.click()
      setTimeout(() => URL.revokeObjectURL(url), 5000)
      setDone('Selesai! File PDF sudah diunduh.')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Konversi gagal.')
    } finally {
      setBusy(false)
    }
  }

  if (!available) {
    return (
      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-8 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white text-accent-600 shadow-card">
          <Icon name="file" className="h-7 w-7" />
        </span>
        <h2 className="mt-5 text-xl">Segera hadir</h2>
        <p className="mx-auto mt-2 max-w-md text-sm">
          Fitur Word ke PDF sedang disiapkan. Sementara itu, Anda bisa memakai tools lain yang sudah tersedia.
        </p>
        <a href="/tools" className={`${btnPrimary} mt-6`}>
          Lihat tools lain
        </a>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-slate-100 bg-white p-6 shadow-card sm:p-8">
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          pick(e.dataTransfer.files[0])
        }}
        className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition ${dragging ? 'border-brand-500 bg-brand-50' : 'border-slate-200 bg-slate-50'}`}
      >
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-brand-600 shadow-card">
          <Icon name="file" className="h-7 w-7" />
        </span>
        {file ? (
          <>
            <p className="mt-4 max-w-full truncate font-semibold text-ink" title={file.name}>
              {file.name}
            </p>
            <p className="mt-1 text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </>
        ) : (
          <>
            <p className="mt-4 font-semibold text-ink">Tarik & lepas dokumen di sini</p>
            <p className="mt-1 text-sm">.docx, .doc, .odt, .rtf · maks. {MAX_MB} MB</p>
          </>
        )}
        <button type="button" onClick={() => inputRef.current?.click()} className="mt-5 text-sm font-semibold text-brand-600 hover:underline">
          {file ? 'Ganti file' : 'Pilih file'}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept=".docx,.doc,.odt,.rtf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
          className="sr-only"
          onChange={(e) => {
            pick(e.target.files?.[0])
            e.target.value = ''
          }}
        />
      </div>

      {error && (
        <p className="mt-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700" role="alert">
          {error}
        </p>
      )}
      {done && (
        <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700" role="status">
          {done}
        </p>
      )}

      <button type="button" onClick={convert} disabled={!file || busy} className={`${btnPrimary} mt-6 w-full py-4`}>
        {busy ? 'Mengonversi... (bisa sampai 1 menit)' : 'Ubah ke PDF'}
      </button>
    </div>
  )
}
