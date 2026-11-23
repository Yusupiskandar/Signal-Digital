import type { Metadata } from 'next'

import { PromptVideoTool, type PromptItem } from '@/components/tools/PromptVideoTool'
import { ToolShell } from '@/components/tools/ToolShell'
import { getVideoPrompts } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Prompt to Video — Kumpulan Prompt Video AI Gratis — Signal Digital',
  description: 'Kumpulan prompt video AI (Veo, Sora, Kling, dll.) lengkap dengan preview hasilnya. Salin prompt dengan satu klik, gratis.',
  alternates: { canonical: '/tools/prompt-video' },
}

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
      <PromptVideoTool items={items} />
    </ToolShell>
  )
}
