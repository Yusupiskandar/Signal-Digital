import type { GlobalConfig } from 'payload'

import { iconField } from '../fields/common'

const labelArray = (name: string, label: string, description?: string) => ({
  name,
  label,
  type: 'array' as const,
  admin: description ? { description } : undefined,
  fields: [{ name: 'label', label: 'Teks', type: 'text' as const, required: true }],
})

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Pengaturan Website',
  access: { read: () => true },
  admin: { group: 'Konten Website' },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Umum & Kontak',
          fields: [
            { name: 'siteName', label: 'Nama website', type: 'text', required: true, defaultValue: 'Signal Digital' },
            { name: 'legalName', label: 'Nama badan usaha', type: 'text', defaultValue: 'CV. Signal Digital' },
            { name: 'tagline', label: 'Tagline', type: 'text' },
            { name: 'description', label: 'Deskripsi singkat (SEO & footer)', type: 'textarea' },
            {
              type: 'row',
              fields: [
                {
                  name: 'whatsapp',
                  label: 'Nomor WhatsApp (format 62...)',
                  type: 'text',
                  required: true,
                  admin: { description: 'Tanpa + dan spasi. Contoh: 6282219074569' },
                  validate: (v: unknown) => (typeof v === 'string' && /^62\d{8,13}$/.test(v)) || 'Gunakan format 62xxxxxxxxxx',
                },
                { name: 'whatsappDisplay', label: 'Nomor WhatsApp (tampilan)', type: 'text', admin: { description: 'Contoh: 0822 1907 4569' } },
              ],
            },
            { name: 'address', label: 'Alamat', type: 'textarea' },
            {
              name: 'leadEmail',
              label: 'Email penerima notifikasi lead',
              type: 'email',
              admin: { description: 'Tidak ditampilkan di website.' },
            },
          ],
        },
        {
          label: 'Hero',
          fields: [
            { name: 'heroBadge', label: 'Label kecil', type: 'text' },
            {
              type: 'row',
              fields: [
                { name: 'heroTitle', label: 'Judul (awal)', type: 'text', required: true },
                { name: 'heroHighlight', label: 'Judul (kata yang disorot)', type: 'text' },
                { name: 'heroTitleAfter', label: 'Judul (akhir)', type: 'text' },
              ],
            },
            { name: 'heroSubtitle', label: 'Subjudul', type: 'textarea' },
            labelArray('heroPoints', 'Poin singkat di bawah tombol'),
          ],
        },
        {
          label: 'Statistik',
          fields: [
            {
              name: 'stats',
              label: 'Angka statistik',
              type: 'array',
              admin: { description: 'Kosongkan jika belum ada angka asli. Bagian ini otomatis disembunyikan.' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'value', label: 'Angka', type: 'text', required: true },
                    { name: 'label', label: 'Keterangan', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Kenapa Kami & Cara Kerja',
          fields: [
            {
              name: 'values',
              label: 'Kenapa memilih kami',
              type: 'array',
              fields: [
                iconField('target'),
                { name: 'title', label: 'Judul', type: 'text', required: true },
                { name: 'text', label: 'Deskripsi', type: 'textarea', required: true },
              ],
            },
            {
              name: 'steps',
              label: 'Langkah cara kerja',
              type: 'array',
              fields: [
                { name: 'title', label: 'Judul', type: 'text', required: true },
                { name: 'text', label: 'Deskripsi', type: 'textarea', required: true },
              ],
            },
          ],
        },
        {
          label: 'Form Konsultasi',
          fields: [
            labelArray('leadNeeds', 'Pilihan jenis kebutuhan'),
            labelArray('leadBudgets', 'Pilihan estimasi budget'),
          ],
        },
      ],
    },
  ],
}
