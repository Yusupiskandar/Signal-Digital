import type { CollectionConfig } from 'payload'

import { iconField, orderField, publishedField } from '../fields/common'

const publicRead = { read: () => true }
const group = 'Konten Website'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Layanan', plural: 'Layanan' },
  access: publicRead,
  defaultSort: 'order',
  admin: { group, useAsTitle: 'title', defaultColumns: ['title', 'order', 'published'] },
  fields: [
    { name: 'title', label: 'Judul', type: 'text', required: true },
    { name: 'text', label: 'Deskripsi', type: 'textarea', required: true },
    iconField('code'),
    {
      name: 'tags',
      label: 'Tag',
      type: 'array',
      labels: { singular: 'Tag', plural: 'Tag' },
      fields: [{ name: 'label', label: 'Tag', type: 'text', required: true }],
    },
    orderField,
    publishedField,
  ],
}

export const Portfolio: CollectionConfig = {
  slug: 'portfolio',
  labels: { singular: 'Portofolio', plural: 'Portofolio' },
  access: publicRead,
  defaultSort: 'order',
  admin: { group, useAsTitle: 'title', defaultColumns: ['title', 'category', 'order', 'published'] },
  fields: [
    { name: 'title', label: 'Nama proyek', type: 'text', required: true },
    { name: 'category', label: 'Kategori', type: 'text', required: true, admin: { description: 'Contoh: Aplikasi Web, Company Profile' } },
    { name: 'text', label: 'Deskripsi singkat', type: 'textarea', required: true },
    { name: 'image', label: 'Gambar / screenshot', type: 'upload', relationTo: 'media' },
    { name: 'url', label: 'Link proyek (opsional)', type: 'text' },
    orderField,
    publishedField,
  ],
}

export const Programs: CollectionConfig = {
  slug: 'programs',
  labels: { singular: 'Program Academy', plural: 'Academy & Mentoring' },
  access: publicRead,
  defaultSort: 'order',
  admin: { group, useAsTitle: 'title', defaultColumns: ['title', 'badge', 'order', 'published'] },
  fields: [
    { name: 'title', label: 'Nama program', type: 'text', required: true },
    { name: 'badge', label: 'Label kecil', type: 'text', admin: { description: 'Contoh: Kelas Online, 1-on-1' } },
    { name: 'text', label: 'Deskripsi', type: 'textarea', required: true },
    iconField('book'),
    {
      name: 'points',
      label: 'Poin keunggulan',
      type: 'array',
      fields: [{ name: 'label', label: 'Poin', type: 'text', required: true }],
    },
    { name: 'cta', label: 'Teks tombol', type: 'text', required: true, defaultValue: 'Daftar via WhatsApp' },
    { name: 'waText', label: 'Pesan WhatsApp otomatis', type: 'textarea', required: true },
    orderField,
    publishedField,
  ],
}

export const Tools: CollectionConfig = {
  slug: 'tools',
  labels: { singular: 'Tool', plural: 'Tools' },
  access: publicRead,
  defaultSort: 'order',
  admin: { group, useAsTitle: 'title', defaultColumns: ['title', 'slug', 'status', 'order', 'published'] },
  fields: [
    { name: 'title', label: 'Nama tool', type: 'text', required: true },
    { name: 'text', label: 'Deskripsi', type: 'text', required: true },
    {
      name: 'slug',
      label: 'Halaman tool',
      type: 'select',
      required: true,
      unique: true,
      options: [
        { label: 'Generator QR Code (/tools/qr-code)', value: 'qr-code' },
        { label: 'JPG ke PDF (/tools/jpg-ke-pdf)', value: 'jpg-ke-pdf' },
        { label: 'Word ke PDF (/tools/word-ke-pdf)', value: 'word-ke-pdf' },
      ],
      admin: { description: 'Menghubungkan kartu ini ke halaman tool yang sudah dibuat di kode.' },
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Aktif', value: 'active' },
        { label: 'Segera hadir', value: 'soon' },
      ],
      admin: { position: 'sidebar' },
    },
    iconField('qr'),
    orderField,
    publishedField,
  ],
}

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: { singular: 'Testimoni', plural: 'Testimoni' },
  access: publicRead,
  defaultSort: 'order',
  admin: {
    group,
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'published'],
    description: 'Bagian testimoni hanya tampil jika ada minimal satu testimoni yang ditampilkan.',
  },
  fields: [
    { name: 'name', label: 'Nama', type: 'text', required: true },
    { name: 'role', label: 'Jabatan / usaha', type: 'text' },
    { name: 'quote', label: 'Testimoni', type: 'textarea', required: true },
    { name: 'photo', label: 'Foto (opsional)', type: 'upload', relationTo: 'media' },
    orderField,
    publishedField,
  ],
}

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  labels: { singular: 'FAQ', plural: 'FAQ' },
  access: publicRead,
  defaultSort: 'order',
  admin: { group, useAsTitle: 'question', defaultColumns: ['question', 'order', 'published'] },
  fields: [
    { name: 'question', label: 'Pertanyaan', type: 'text', required: true },
    { name: 'answer', label: 'Jawaban', type: 'textarea', required: true },
    orderField,
    publishedField,
  ],
}
