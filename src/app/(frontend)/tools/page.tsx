import type { Metadata } from 'next'

import { ToolCard } from '@/components/ToolCard'
import { container, eyebrow } from '@/components/ui'
import { getTools } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Tools Gratis — Signal Digital',
  description: 'Generator QR code, JPG ke PDF, dan Word ke PDF. Gratis, langsung dari browser, tanpa daftar.',
  alternates: { canonical: '/tools' },
}

export default async function ToolsIndex() {
  const tools = await getTools()

  return (
    <div className={container}>
      <div className="mx-auto max-w-2xl text-center">
        <span className={eyebrow}>Tools Gratis</span>
        <h1 className="mt-4 text-3xl leading-tight sm:text-4xl">Alat bantu kerja harian, gratis.</h1>
        <p className="mt-4">Langsung pakai dari browser. Tanpa instal aplikasi, tanpa daftar akun.</p>
      </div>

      {tools.length > 0 ? (
        <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <p className="mt-12 text-center">Belum ada tools yang tersedia.</p>
      )}
    </div>
  )
}
