import type { CollectionConfig } from 'payload'

export const LEAD_STATUSES = [
  { label: 'Baru', value: 'baru' },
  { label: 'Sudah dihubungi', value: 'dihubungi' },
  { label: 'Deal', value: 'deal' },
  { label: 'Batal', value: 'batal' },
]

export const Leads: CollectionConfig = {
  slug: 'leads',
  labels: { singular: 'Lead', plural: 'Leads (Konsultasi)' },
  defaultSort: '-createdAt',
  access: {
    // Lead hanya dibuat lewat form website (server action, local API).
    create: () => false,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  admin: {
    group: 'Penjualan',
    useAsTitle: 'name',
    defaultColumns: ['name', 'whatsapp', 'need', 'status', 'createdAt'],
    listSearchableFields: ['name', 'whatsapp', 'email'],
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', label: 'Nama', type: 'text', required: true },
        { name: 'whatsapp', label: 'WhatsApp', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'need', label: 'Kebutuhan', type: 'text', required: true },
        { name: 'budget', label: 'Estimasi budget', type: 'text' },
      ],
    },
    { name: 'message', label: 'Pesan', type: 'textarea', required: true },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      defaultValue: 'baru',
      options: LEAD_STATUSES,
      admin: { position: 'sidebar' },
    },
    {
      name: 'notes',
      label: 'Catatan internal',
      type: 'textarea',
      admin: { position: 'sidebar' },
    },
    {
      name: 'ipAddress',
      label: 'IP pengirim',
      type: 'text',
      admin: { position: 'sidebar', readOnly: true },
    },
  ],
}
