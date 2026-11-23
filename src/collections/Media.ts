import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Media', plural: 'Media' },
  access: {
    read: () => true,
  },
  admin: { group: 'Konten Website' },
  fields: [
    {
      name: 'alt',
      label: 'Teks alternatif (deskripsi gambar/video)',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/avif', 'video/mp4', 'video/webm'],
  },
}
