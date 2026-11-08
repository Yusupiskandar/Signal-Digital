import 'server-only'

import { execFile } from 'node:child_process'
import { existsSync } from 'node:fs'
import { promisify } from 'node:util'

const run = promisify(execFile)

const CANDIDATES = [
  process.env.LIBREOFFICE_PATH,
  'C:\\Program Files\\LibreOffice\\program\\soffice.exe',
  'C:\\Program Files (x86)\\LibreOffice\\program\\soffice.exe',
  '/usr/bin/soffice',
  '/usr/bin/libreoffice',
  '/usr/local/bin/soffice',
  '/opt/libreoffice/program/soffice',
  '/Applications/LibreOffice.app/Contents/MacOS/soffice',
].filter(Boolean) as string[]

let cached: { path: string | null; at: number } | null = null

/** Mencari program LibreOffice (soffice). Hasil di-cache: ditemukan = permanen, tidak ditemukan = 60 detik. */
export async function findSoffice(): Promise<string | null> {
  if (cached && (cached.path || Date.now() - cached.at < 60_000)) return cached.path

  let found: string | null = CANDIDATES.find((p) => existsSync(p)) ?? null

  if (!found) {
    // Coba "soffice" dari PATH.
    try {
      await run('soffice', ['--version'], { timeout: 15_000, windowsHide: true })
      found = 'soffice'
    } catch {
      found = null
    }
  }

  cached = { path: found, at: Date.now() }
  return found
}
