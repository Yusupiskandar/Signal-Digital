import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { id } from '@payloadcms/translations/languages/id'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Faqs, Portfolio, Programs, Services, Testimonials, Tools } from './collections/content'
import { Leads } from './collections/Leads'
import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { SiteSettings } from './globals/SiteSettings'
import { migrations } from './migrations'
import { seedIfEmpty } from './seed'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — Admin Signal Digital',
    },
  },
  i18n: {
    // Panel admin selalu Bahasa Indonesia.
    fallbackLanguage: 'id',
    supportedLanguages: { id },
  },
  collections: [Leads, Services, Portfolio, Programs, Tools, Testimonials, Faqs, Media, Users],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || '',
    },
    // Skema database dikelola lewat migration (src/migrations), baik dev maupun produksi.
    // Di produksi, migration dijalankan otomatis saat server start.
    // Setiap mengubah koleksi/field: `npm run payload migrate:create nama-perubahan`, lalu `npm run migrate`.
    push: false,
    prodMigrations: migrations,
  }),
  sharp,
  plugins: [],
  onInit: async (payload) => {
    await seedIfEmpty(payload)
  },
})
