import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Gambar', plural: 'Media' },
  access: {
    read: () => true,
  },
  admin: { group: 'Konten Website' },
  fields: [
    {
      name: 'alt',
      label: 'Teks alternatif (deskripsi gambar)',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/avif'],
  },
}
