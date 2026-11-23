import type { Metadata } from 'next'

import { PromptVideoTool, type PromptItem } from '@/components/tools/PromptVideoTool'
import { ToolShell } from '@/components/tools/ToolShell'
import { getVideoPrompts } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Prompt to Video — Kumpulan Prompt Video AI Gratis — Signal Digital',
  description: 'Kumpulan prompt video AI (Veo, Sora, Kling, dll.) lengkap dengan preview hasilnya. Salin prompt dengan satu klik, gratis.',
  alternates: { canonical: '/tools/prompt-video' },
}

const STEPS = [
  { title: 'Salin prompt', text: 'Pilih prompt yang preview-nya cocok, lalu klik tombol "Salin prompt".' },
  { title: 'Unggah gambar produk', text: 'Buka Google Flow, buat project baru, lalu unggah foto produk yang ingin dipakai.' },
  { title: 'Tempel prompt & buat video', text: 'Tempel (paste) prompt di kolom prompt bersama gambar produk tadi, lalu klik generate.' },
]

export default async function PromptVideoPage() {
  const docs = await getVideoPrompts()

  const items: PromptItem[] = docs.map((d) => {
    const media = d.preview && typeof d.preview === 'object' ? d.preview : null
    return {
      id: d.id,
      title: d.title,
      category: d.category ?? '',
      model: d.model ?? '',
      prompt: d.prompt,
      preview: media?.url
        ? { url: media.url, alt: media.alt, isVideo: (media.mimeType ?? '').startsWith('video/') }
        : null,
    }
  })

  return (
    <ToolShell
      title="Prompt to Video"
      description="Kumpulan prompt video AI siap pakai. Lihat preview hasilnya, lalu salin prompt dan tempel ke Veo, Sora, Kling, atau generator video favorit Anda."
      icon="video"
      privacyNote="Prompt disalin langsung di browser Anda. Silakan pakai dan modifikasi sesuai kebutuhan."
    >
      <section aria-labelledby="cara-pakai" className="mb-10 rounded-3xl border border-slate-100 bg-white p-6 shadow-card sm:p-8">
        <h2 id="cara-pakai" className="text-xl">Cara pakai</h2>
        <ol className="mt-5 grid gap-4 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex gap-4 rounded-2xl bg-slate-50 p-5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-600 text-sm font-semibold text-white">{i + 1}</span>
              <div>
                <h3 className="text-base">{step.title}</h3>
                <p className="mt-1 text-sm">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-5 text-sm text-slate-500">
          Buka Google Flow di{' '}
          <a href="https://labs.google/fx/tools/flow" target="_blank" rel="noopener noreferrer" className="font-medium text-brand-600 hover:underline">
            labs.google/fx/tools/flow
          </a>
          . Tips: pakai foto produk yang jelas dengan latar polos, dan ganti nama/detail produk di dalam prompt sesuai produk Anda.
        </p>
      </section>

      <PromptVideoTool items={items} />
    </ToolShell>
  )
}
