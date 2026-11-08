'use client'

import QRCode from 'qrcode'
import { useEffect, useMemo, useState } from 'react'

import { Icon } from '../Icon'
import { btnGhost, btnPrimary, input } from '../ui'

type Mode = 'link' | 'text' | 'whatsapp'
type Level = 'L' | 'M' | 'Q' | 'H'

const MODES: { value: Mode; label: string }[] = [
  { value: 'link', label: 'Link / URL' },
  { value: 'text', label: 'Teks' },
  { value: 'whatsapp', label: 'WhatsApp' },
]

const LEVELS: { value: Level; label: string }[] = [
  { value: 'L', label: 'Rendah (7%)' },
  { value: 'M', label: 'Sedang (15%)' },
  { value: 'Q', label: 'Tinggi (25%)' },
  { value: 'H', label: 'Maksimal (30%)' },
]

const label = 'mb-2 block text-sm font-medium text-ink'

/** Ubah 08xx / +62xx / 62xx menjadi 62xx. */
function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  if (digits.startsWith('0')) return '62' + digits.slice(1)
  return digits
}

export function QrTool() {
  const [mode, setMode] = useState<Mode>('link')
  const [link, setLink] = useState('https://signaldigital.web.id')
  const [text, setText] = useState('')
  const [phone, setPhone] = useState('')
  const [waMsg, setWaMsg] = useState('')
  const [fg, setFg] = useState('#0f1035')
  const [bg, setBg] = useState('#ffffff')
  const [size, setSize] = useState(512)
  const [margin, setMargin] = useState(2)
  const [level, setLevel] = useState<Level>('M')
  const [preview, setPreview] = useState<string>('')
  const [error, setError] = useState<string>('')

  const content = useMemo(() => {
    if (mode === 'link') {
      const v = link.trim()
      if (!v) return ''
      return /^[a-z][a-z0-9+.-]*:/i.test(v) ? v : `https://${v}`
    }
    if (mode === 'text') return text
    const num = normalizePhone(phone)
    if (num.length < 9) return ''
    return `https://wa.me/${num}${waMsg.trim() ? `?text=${encodeURIComponent(waMsg.trim())}` : ''}`
  }, [mode, link, text, phone, waMsg])

  const options = useMemo(
    () => ({ errorCorrectionLevel: level, margin, color: { dark: fg, light: bg } }),
    [level, margin, fg, bg],
  )

  useEffect(() => {
    if (!content) {
      setPreview('')
      setError('')
      return
    }
    let cancelled = false
    const t = setTimeout(() => {
      QRCode.toDataURL(content, { ...options, width: 320 })
        .then((url) => {
          if (!cancelled) {
            setPreview(url)
            setError('')
          }
        })
        .catch(() => {
          if (!cancelled) {
            setPreview('')
            setError('Isi terlalu panjang untuk dijadikan QR code. Coba persingkat atau turunkan tingkat koreksi.')
          }
        })
    }, 150)
    return () => {
      cancelled = true
      clearTimeout(t)
    }
  }, [content, options])

  const download = (href: string, filename: string) => {
    const a = document.createElement('a')
    a.href = href
    a.download = filename
    a.click()
  }

  const downloadPng = async () => {
    const url = await QRCode.toDataURL(content, { ...options, width: size })
    download(url, 'qr-code.png')
  }

  const downloadSvg = async () => {
    const svg = await QRCode.toString(content, { ...options, type: 'svg', width: size })
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }))
    download(url, 'qr-code.svg')
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  const lowContrast = fg.toLowerCase() === bg.toLowerCase()

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
      {/* Pengaturan */}
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card sm:p-8">
        <div role="tablist" aria-label="Jenis isi QR" className="flex flex-wrap gap-2 rounded-2xl bg-slate-100 p-1.5">
          {MODES.map((m) => (
            <button
              key={m.value}
              type="button"
              role="tab"
              aria-selected={mode === m.value}
              onClick={() => setMode(m.value)}
              className={`flex-1 whitespace-nowrap rounded-xl px-2 py-2.5 text-xs font-semibold transition sm:px-4 sm:text-sm ${mode === m.value ? 'bg-white text-brand-700 shadow-card' : 'text-slate-500 hover:text-ink'}`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-5">
          {mode === 'link' && (
            <div>
              <label htmlFor="qr-link" className={label}>
                Alamat link
              </label>
              <input id="qr-link" className={input} value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://contoh.com" inputMode="url" />
            </div>
          )}
          {mode === 'text' && (
            <div>
              <label htmlFor="qr-text" className={label}>
                Teks
              </label>
              <textarea id="qr-text" rows={4} className={input} value={text} onChange={(e) => setText(e.target.value)} placeholder="Tulis teks yang ingin dijadikan QR code" />
            </div>
          )}
          {mode === 'whatsapp' && (
            <>
              <div>
                <label htmlFor="qr-phone" className={label}>
                  Nomor WhatsApp
                </label>
                <input id="qr-phone" type="tel" className={input} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="08xx xxxx xxxx" />
              </div>
              <div>
                <label htmlFor="qr-wamsg" className={label}>
                  Pesan otomatis <span className="text-slate-400">(opsional)</span>
                </label>
                <textarea id="qr-wamsg" rows={3} className={input} value={waMsg} onChange={(e) => setWaMsg(e.target.value)} placeholder="Halo, saya ingin bertanya..." />
              </div>
            </>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="qr-fg" className={label}>
                Warna QR
              </label>
              <div className="flex items-center gap-3">
                <input id="qr-fg" type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="h-11 w-14 cursor-pointer rounded-xl border border-slate-200 bg-white p-1" />
                <code className="text-sm text-slate-500">{fg}</code>
              </div>
            </div>
            <div>
              <label htmlFor="qr-bg" className={label}>
                Warna latar
              </label>
              <div className="flex items-center gap-3">
                <input id="qr-bg" type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-11 w-14 cursor-pointer rounded-xl border border-slate-200 bg-white p-1" />
                <code className="text-sm text-slate-500">{bg}</code>
              </div>
            </div>
          </div>
          {lowContrast && <p className="text-sm text-rose-600">Warna QR dan latar sama, QR tidak akan bisa dipindai.</p>}

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="qr-size" className={label}>
                Ukuran unduhan: {size}px
              </label>
              <input id="qr-size" type="range" min={256} max={2048} step={64} value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full accent-brand-600" />
            </div>
            <div>
              <label htmlFor="qr-margin" className={label}>
                Jarak tepi: {margin}
              </label>
              <input id="qr-margin" type="range" min={0} max={8} value={margin} onChange={(e) => setMargin(Number(e.target.value))} className="w-full accent-brand-600" />
            </div>
          </div>

          <div>
            <label htmlFor="qr-level" className={label}>
              Tingkat koreksi kesalahan
            </label>
            <select id="qr-level" className={input} value={level} onChange={(e) => setLevel(e.target.value as Level)}>
              {LEVELS.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </select>
            <p className="mt-1.5 text-xs text-slate-400">Makin tinggi, QR makin tahan rusak/tertutup logo, tapi polanya makin rapat.</p>
          </div>
        </div>
      </div>

      {/* Pratinjau */}
      <div className="flex flex-col items-center rounded-3xl border border-slate-100 bg-white p-6 shadow-card sm:p-8 lg:sticky lg:top-28 lg:self-start">
        <p className="self-start text-sm font-semibold text-ink">Pratinjau</p>
        <div className="mt-4 grid aspect-square w-full max-w-[320px] place-items-center rounded-2xl bg-slate-50 ring-1 ring-slate-100">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="Pratinjau QR code" className="h-full w-full rounded-2xl object-contain" />
          ) : (
            <div className="px-6 text-center text-sm text-slate-400">
              <Icon name="qr" className="mx-auto mb-3 h-10 w-10" />
              {error || 'Isi data di sebelah kiri untuk membuat QR code.'}
            </div>
          )}
        </div>
        {content && !error && (
          <p className="mt-4 w-full truncate text-center text-xs text-slate-400" title={content}>
            {content}
          </p>
        )}
        <div className="mt-6 grid w-full gap-3 sm:grid-cols-2">
          <button type="button" onClick={downloadPng} disabled={!preview} className={btnPrimary}>
            Unduh PNG
          </button>
          <button type="button" onClick={downloadSvg} disabled={!preview} className={btnGhost}>
            Unduh SVG
          </button>
        </div>
        <p className="mt-3 text-center text-xs text-slate-400">SVG cocok untuk dicetak besar tanpa pecah.</p>
      </div>
    </div>
  )
}
