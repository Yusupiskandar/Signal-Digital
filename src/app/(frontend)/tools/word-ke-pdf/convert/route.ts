import { execFile } from 'node:child_process'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { promisify } from 'node:util'

import { findSoffice } from '@/lib/libreoffice'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const run = promisify(execFile)

const MAX_BYTES = 10 * 1024 * 1024
const MAX_CONCURRENT = 2
const TIMEOUT_MS = 90_000

// Tanda tangan file (magic bytes) supaya hanya dokumen asli yang diproses.
const ZIP = [0x50, 0x4b, 0x03, 0x04] // .docx / .odt
const OLE = [0xd0, 0xcf, 0x11, 0xe0] // .doc lama
const RTF = [0x7b, 0x5c, 0x72, 0x74] // "{\rt"
const ALLOWED: Record<string, number[]> = { docx: ZIP, odt: ZIP, doc: OLE, rtf: RTF }

let active = 0
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear()
  return recent.length > 10
}

const fail = (status: number, message: string) => Response.json({ error: message }, { status })

export async function POST(req: Request) {
  const soffice = await findSoffice()
  if (!soffice) return fail(503, 'Konversi Word ke PDF belum tersedia di server ini.')

  const ip = (req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || 'unknown').trim()
  if (rateLimited(ip)) return fail(429, 'Terlalu banyak konversi. Coba lagi dalam beberapa menit.')

  const len = Number(req.headers.get('content-length') || 0)
  if (len > MAX_BYTES + 64 * 1024) return fail(413, 'Ukuran file maksimal 10 MB.')

  let file: File | null = null
  try {
    const form = await req.formData()
    const f = form.get('file')
    file = f instanceof File ? f : null
  } catch {
    return fail(400, 'Data unggahan tidak valid.')
  }
  if (!file) return fail(400, 'Pilih file dokumen terlebih dahulu.')
  if (file.size === 0) return fail(400, 'File kosong.')
  if (file.size > MAX_BYTES) return fail(413, 'Ukuran file maksimal 10 MB.')

  const ext = file.name.split('.').pop()?.toLowerCase() ?? ''
  const signature = ALLOWED[ext]
  if (!signature) return fail(415, 'Format didukung: .docx, .doc, .odt, .rtf.')

  const bytes = Buffer.from(await file.arrayBuffer())
  if (!signature.every((b, i) => bytes[i] === b)) return fail(415, 'Isi file tidak sesuai dengan format dokumen Word.')

  if (active >= MAX_CONCURRENT) return fail(503, 'Server sedang sibuk. Coba lagi sebentar lagi.')
  active++

  const dir = await mkdtemp(path.join(tmpdir(), 'sd-word2pdf-'))
  try {
    const input = path.join(dir, `dokumen.${ext}`)
    await writeFile(input, bytes)

    await run(
      soffice,
      [
        '--headless',
        '--norestore',
        '--nolockcheck',
        '--nodefault',
        // Profil terpisah per konversi agar proses paralel tidak saling mengunci.
        `-env:UserInstallation=${pathToFileURL(path.join(dir, 'profile')).href}`,
        '--convert-to',
        'pdf',
        '--outdir',
        dir,
        input,
      ],
      { timeout: TIMEOUT_MS, windowsHide: true, maxBuffer: 1024 * 1024 },
    )

    const pdf = await readFile(path.join(dir, 'dokumen.pdf')).catch(() => null)
    if (!pdf) return fail(422, 'Dokumen tidak bisa dikonversi. Pastikan file tidak rusak atau terkunci kata sandi.')

    const base = file.name.replace(/\.[^.]+$/, '').replace(/[^\p{L}\p{N} ._-]/gu, '').trim().slice(0, 100) || 'dokumen'
    return new Response(new Uint8Array(pdf), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="dokumen.pdf"; filename*=UTF-8''${encodeURIComponent(base)}.pdf`,
        'Cache-Control': 'no-store',
      },
    })
  } catch (err) {
    const timedOut = (err as { killed?: boolean })?.killed
    console.error('[word-ke-pdf] konversi gagal:', err)
    return fail(timedOut ? 504 : 500, timedOut ? 'Konversi terlalu lama. Coba dokumen yang lebih kecil.' : 'Konversi gagal. Coba lagi nanti.')
  } finally {
    active--
    await rm(dir, { recursive: true, force: true }).catch(() => {})
  }
}
