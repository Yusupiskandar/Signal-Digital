import type { Field } from 'payload'

export const ICON_OPTIONS = [
  { label: 'Kode', value: 'code' },
  { label: 'Cloud', value: 'cloud' },
  { label: 'Buku', value: 'book' },
  { label: 'Lampu / Ide', value: 'bulb' },
  { label: 'Target', value: 'target' },
  { label: 'Chat', value: 'chat' },
  { label: 'Perisai', value: 'shield' },
  { label: 'Orang', value: 'users' },
  { label: 'QR Code', value: 'qr' },
  { label: 'Gambar', value: 'image' },
  { label: 'Dokumen', value: 'file' },
] as const

export const iconField = (defaultValue = 'code'): Field => ({
  name: 'icon',
  label: 'Ikon',
  type: 'select',
  required: true,
  defaultValue,
  options: [...ICON_OPTIONS],
})

export const orderField: Field = {
  name: 'order',
  label: 'Urutan',
  type: 'number',
  defaultValue: 0,
  admin: {
    position: 'sidebar',
    description: 'Angka kecil tampil lebih dulu.',
  },
}

export const publishedField: Field = {
  name: 'published',
  label: 'Tampilkan di website',
  type: 'checkbox',
  defaultValue: true,
  admin: { position: 'sidebar' },
}
