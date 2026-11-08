import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Admin', plural: 'Admin' },
  admin: {
    useAsTitle: 'email',
    group: 'Pengaturan',
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
  },
  fields: [{ name: 'name', label: 'Nama', type: 'text' }],
}
