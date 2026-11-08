'use client'

import { PDFDocument } from 'pdf-lib'
import { useEffect, useRef, useState } from 'react'

import { Icon } from '../Icon'
import { btnGhost, btnPrimary, input } from '../ui'

type Item = { id: string; file: File; url: string }
type PageSize = 'a4' | 'letter' | 'fit'
type Orientation = 'auto' | 'portrait' | 'landscape'
type Margin = 'none' | 'small' | 'large'

const MAX_FILES = 50
const MAX_FILE_MB = 20
const MAX_PIXELS = 3000 // sisi terpanjang; gambar lebih besar diperkecil agar PDF tidak terlalu berat
const ACCEPT = ['image/jpeg', 'image/png', 'image/webp']

// Ukuran dalam point (1/72 inci)
const SIZES = { a4: [595.28, 841.89], letter: [612, 792] } as const
const MARGINS = { none: 0, small: 20, large: 40 } as const

const label = 'mb-2 block text-sm font-medium text-ink'

/** Gambar → JPEG lewat canvas: orientasi EXIF dari HP ikut benar, transparansi jadi putih. */
async function toJpeg(file: File): Promise<{ bytes: ArrayBuffer; width: number; height: number }> {
  const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
  const scale = Math.min(1, MAX_PIXELS / Math.max(bitmap.width, bitmap.height))
  const width = Math.round(bitmap.width * scale)
  const height = Math.round(bitmap.height * scale)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas tidak didukung browser ini.')
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, width, height)
  ctx.drawImage(bitmap, 0, 0, width, height)
  bitmap.close()

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.9))
  if (!blob) throw new Error('Gagal memproses gambar.')
  return { bytes: await blob.arrayBuffer(), width, height }
}

export function ImageToPdfTool() {
  const [items, setItems] = useState<Item[]>([])
  const [pageSize, setPageSize] = useState<PageSize>('a4')
  const [orientation, setOrientation] = useState<Orientation>('auto')
  const [margin, setMargin] = useState<Margin>('small')
  const [busy, setBusy] = useState(false)
  const [progress, setProgress] = useState('')
  const [error, setError] = useState('')
  const [dragging, setDragging] = useState(false)
  const fileInput = useRef<HTMLInputElement>(null)
  const itemsRef = useRef(items)
  itemsRef.current = items

  // Bersihkan object URL saat komponen ditutup.
  useEffect(() => () => itemsRef.current.forEach((it) => URL.revokeObjectURL(it.url)), [])

  const addFiles = (list: FileList | File[]) => {
    setError('')
    const incoming = Array.from(list)
    const rejected: string[] = []
    const accepted: Item[] = []
    for (const file of incoming) {
      if (!ACCEPT.includes(file.type)) rejected.push(`${file.name} (format tidak didukung)`)
      else if (file.size > MAX_FILE_MB * 1024 * 1024) rejected.push(`${file.name} (lebih dari ${MAX_FILE_MB} MB)`)
      else accepted.push({ id: crypto.randomUUID(), file, url: URL.createObjectURL(file) })
    }
    setItems((prev) => {
      const room = MAX_FILES - prev.length
      if (accepted.length > room) {
        accepted.slice(room).forEach((it) => URL.revokeObjectURL(it.url))
        rejected.push(`maksimal ${MAX_FILES} gambar`)
      }
      return [...prev, ...accepted.slice(0, Math.max(room, 0))]
    })
    if (rejected.length) setError(`Dilewati: ${rejected.join(', ')}.`)
  }

  const move = (index: number, dir: -1 | 1) =>
    setItems((prev) => {
      const next = [...prev]
      const target = index + dir
      if (target < 0 || target >= next.length) return prev
      ;[next[index], next[target]] = [next[target], next[index]]
      return next
    })

  const remove = (id: string) =>
    setItems((prev) => {
      const it = prev.find((p) => p.id === id)
      if (it) URL.revokeObjectURL(it.url)
      return prev.filter((p) => p.id !== id)
    })

  const clearAll = () => {
    items.forEach((it) => URL.revokeObjectURL(it.url))
    setItems([])
    setError('')
  }

  const makePdf = async () => {
    if (!items.length) return
    setBusy(true)
    setError('')
    try {
      const pdf = await PDFDocument.create()
      pdf.setTitle('Gambar ke PDF')
      pdf.setProducer('Signal Digital Tools')
      const m = MARGINS[margin]

      for (const [i, it] of items.entries()) {
        setProgress(`Memproses gambar ${i + 1} dari ${items.length}...`)
        const img = await toJpeg(it.file)
        const embedded = await pdf.embedJpg(img.bytes)
        const landscapeImg = img.width > img.height

        let pw: number
        let ph: number
        if (pageSize === 'fit') {
          // Halaman mengikuti ukuran gambar (dalam point, 1px ≈ 0.75pt).
          pw = img.width * 0.75 + m * 2
          ph = img.height * 0.75 + m * 2
        } else {
          const [w, h] = SIZES[pageSize]
          const landscape = orientation === 'landscape' || (orientation === 'auto' && landscapeImg)
          ;[pw, ph] = landscape ? [h, w] : [w, h]
        }

        const page = pdf.addPage([pw, ph])
        const boxW = pw - m * 2
        const boxH = ph - m * 2
        const s = Math.min(boxW / img.width, boxH / img.height)
        const dw = img.width * s
        const dh = img.height * s
        page.drawImage(embedded, { x: (pw - dw) / 2, y: (ph - dh) / 2, width: dw, height: dh })
      }

      setProgress('Menyusun file PDF...')
      const bytes = await pdf.save()
      const url = URL.createObjectURL(new Blob([bytes as BlobPart], { type: 'application/pdf' }))
      const a = document.createElement('a')
      a.href = url
      a.download = items.length === 1 ? `${items[0].file.name.replace(/\.[^.]+$/, '')}.pdf` : 'gambar-ke-pdf.pdf'
      a.click()
      setTimeout(() => URL.revokeObjectURL(url), 5000)
      setProgress(`Selesai! PDF berisi ${items.length} halaman sudah diunduh.`)
    } catch (e) {
      setProgress('')
      setError(e instanceof Error ? `Gagal membuat PDF: ${e.message}` : 'Gagal membuat PDF.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card sm:p-8">
        {/* Area unggah */}
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragging(false)
            if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files)
          }}
          className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition ${dragging ? 'border-brand-500 bg-brand-50' : 'border-slate-200 bg-slate-50'}`}
        >
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-brand-600 shadow-card">
            <Icon name="image" className="h-7 w-7" />
          </span>
          <p className="mt-4 font-semibold text-ink">Tarik & lepas gambar di sini</p>
          <p className="mt-1 text-sm">JPG, PNG, atau WebP · maks. {MAX_FILE_MB} MB per gambar · maks. {MAX_FILES} gambar</p>
          <button type="button" onClick={() => fileInput.current?.click()} className={`${btnPrimary} mt-5`}>
            Pilih gambar
          </button>
          <input
            ref={fileInput}
            type="file"
            accept={ACCEPT.join(',')}
            multiple
            className="sr-only"
            onChange={(e) => {
              if (e.target.files) addFiles(e.target.files)
              e.target.value = ''
            }}
          />
        </div>

        {error && (
          <p className="mt-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700" role="alert">
            {error}
          </p>
        )}

        {items.length > 0 && (
          <>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-semibold text-ink">{items.length} gambar · urutan = urutan halaman</p>
              <button type="button" onClick={clearAll} className="text-sm font-medium text-rose-600 hover:underline">
                Hapus semua
              </button>
            </div>
            <ol className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {items.map((it, i) => (
                <li key={it.id} className="overflow-hidden rounded-2xl bg-slate-50 ring-1 ring-slate-100">
                  <div className="relative aspect-[3/4] bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={it.url} alt={it.file.name} className="h-full w-full object-contain" />
                    <span className="absolute left-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-brand-600 text-xs font-bold text-white">{i + 1}</span>
                  </div>
                  <div className="flex items-center justify-between gap-1 px-2 py-2">
                    <span className="truncate text-xs" title={it.file.name}>
                      {it.file.name}
                    </span>
                    <span className="flex shrink-0 gap-0.5">
                      <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label={`Geser ${it.file.name} ke kiri`} className="grid h-7 w-7 place-items-center rounded-lg hover:bg-white disabled:opacity-30">
                        <Icon name="arrow" className="h-4 w-4 rotate-180" />
                      </button>
                      <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} aria-label={`Geser ${it.file.name} ke kanan`} className="grid h-7 w-7 place-items-center rounded-lg hover:bg-white disabled:opacity-30">
                        <Icon name="arrow" className="h-4 w-4" />
                      </button>
                      <button type="button" onClick={() => remove(it.id)} aria-label={`Hapus ${it.file.name}`} className="grid h-7 w-7 place-items-center rounded-lg text-rose-600 hover:bg-white">
                        <Icon name="x" className="h-4 w-4" />
                      </button>
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </>
        )}
      </div>

      {/* Pengaturan */}
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card sm:p-8 lg:sticky lg:top-28 lg:self-start">
        <p className="text-sm font-semibold text-ink">Pengaturan PDF</p>
        <div className="mt-5 space-y-5">
          <div>
            <label htmlFor="pdf-size" className={label}>
              Ukuran halaman
            </label>
            <select id="pdf-size" className={input} value={pageSize} onChange={(e) => setPageSize(e.target.value as PageSize)}>
              <option value="a4">A4</option>
              <option value="letter">Letter</option>
              <option value="fit">Sesuai ukuran gambar</option>
            </select>
          </div>
          <div>
            <label htmlFor="pdf-orient" className={label}>
              Orientasi
            </label>
            <select id="pdf-orient" className={input} value={orientation} onChange={(e) => setOrientation(e.target.value as Orientation)} disabled={pageSize === 'fit'}>
              <option value="auto">Otomatis (ikuti gambar)</option>
              <option value="portrait">Potret</option>
              <option value="landscape">Lanskap</option>
            </select>
          </div>
          <div>
            <label htmlFor="pdf-margin" className={label}>
              Margin
            </label>
            <select id="pdf-margin" className={input} value={margin} onChange={(e) => setMargin(e.target.value as Margin)}>
              <option value="none">Tanpa margin</option>
              <option value="small">Kecil</option>
              <option value="large">Besar</option>
            </select>
          </div>
        </div>

        <button type="button" onClick={makePdf} disabled={!items.length || busy} className={`${btnPrimary} mt-7 w-full py-4`}>
          {busy ? 'Memproses...' : `Buat & unduh PDF${items.length ? ` (${items.length})` : ''}`}
        </button>
        {progress && (
          <p className="mt-3 text-center text-sm text-slate-500" role="status">
            {progress}
          </p>
        )}
        {!items.length && (
          <button type="button" onClick={() => fileInput.current?.click()} className={`${btnGhost} mt-3 w-full`}>
            Tambah gambar dulu
          </button>
        )}
      </div>
    </div>
  )
}
