'use server'

import { headers } from 'next/headers'

import { getPayloadClient } from '@/lib/payload'

export type LeadFormState = {
  status: 'idle' | 'success' | 'error'
  name?: string
  message?: string
  errors?: Partial<Record<'name' | 'whatsapp' | 'email' | 'need' | 'budget' | 'message', string>>
  values?: Record<string, string>
}

// Pembatas sederhana: maks. 5 kiriman per IP per menit (per proses server).
const hits = new Map<string, number[]>()
function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear()
  return recent.length > 5
}

const str = (fd: FormData, key: string) => String(fd.get(key) ?? '').trim()

export async function submitLead(_prev: LeadFormState, formData: FormData): Promise<LeadFormState> {
  // Honeypot: field tersembunyi yang biasanya diisi bot.
  if (str(formData, 'website')) return { status: 'success' }

  const h = await headers()
  const ip = (h.get('x-forwarded-for')?.split(',')[0] || h.get('x-real-ip') || 'unknown').trim()
  if (rateLimited(ip)) {
    return { status: 'error', message: 'Terlalu banyak percobaan. Silakan coba lagi dalam 1 menit.' }
  }

  const values = {
    name: str(formData, 'name'),
    whatsapp: str(formData, 'whatsapp'),
    email: str(formData, 'email'),
    need: str(formData, 'need'),
    budget: str(formData, 'budget'),
    message: str(formData, 'message'),
  }

  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({ slug: 'site-settings', depth: 0 })
  const needs = (settings.leadNeeds ?? []).map((n) => n.label)
  const budgets = (settings.leadBudgets ?? []).map((b) => b.label)

  const errors: LeadFormState['errors'] = {}
  if (!values.name) errors.name = 'Nama wajib diisi.'
  else if (values.name.length > 100) errors.name = 'Nama terlalu panjang.'
  if (!/^[0-9+\-\s()]{8,30}$/.test(values.whatsapp)) errors.whatsapp = 'Nomor WhatsApp tidak valid.'
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Format email tidak valid.'
  if (!needs.includes(values.need)) errors.need = 'Pilih jenis kebutuhan.'
  if (values.budget && !budgets.includes(values.budget)) errors.budget = 'Pilihan budget tidak valid.'
  if (values.message.length < 10) errors.message = 'Ceritakan kebutuhan Anda minimal 10 karakter.'
  else if (values.message.length > 3000) errors.message = 'Cerita terlalu panjang (maks. 3000 karakter).'

  if (Object.keys(errors).length) {
    return { status: 'error', errors, values, message: 'Periksa kembali isian yang ditandai.' }
  }

  try {
    const lead = await payload.create({
      collection: 'leads',
      overrideAccess: true,
      data: {
        name: values.name,
        whatsapp: values.whatsapp,
        email: values.email || undefined,
        need: values.need,
        budget: values.budget || undefined,
        message: values.message,
        status: 'baru',
        ipAddress: ip,
      },
    })

    if (settings.leadEmail) {
      // Tanpa adapter email, Payload hanya menulis email ini ke log server.
      payload
        .sendEmail({
          to: settings.leadEmail,
          subject: `Lead baru: ${lead.name} (${lead.need})`,
          text: [
            'Ada permintaan konsultasi baru dari website:',
            '',
            `Nama      : ${lead.name}`,
            `WhatsApp  : ${lead.whatsapp}`,
            `Email     : ${lead.email || '-'}`,
            `Kebutuhan : ${lead.need}`,
            `Budget    : ${lead.budget || '-'}`,
            '',
            'Pesan:',
            lead.message,
          ].join('\n'),
        })
        .catch((err: unknown) => payload.logger.warn({ err }, `Gagal mengirim notifikasi lead #${lead.id}`))
    }

    return { status: 'success', name: lead.name }
  } catch (err) {
    payload.logger.error({ err }, 'Gagal menyimpan lead')
    return { status: 'error', values, message: 'Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi kami via WhatsApp.' }
  }
}
