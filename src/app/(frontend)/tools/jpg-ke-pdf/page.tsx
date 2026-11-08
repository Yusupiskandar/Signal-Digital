import type { Metadata } from 'next'

import { ImageToPdfTool } from '@/components/tools/ImageToPdfTool'
import { ToolShell } from '@/components/tools/ToolShell'

export const metadata: Metadata = {
  title: 'JPG ke PDF Gratis — Signal Digital',
  description: 'Gabungkan foto JPG, PNG, atau WebP menjadi satu file PDF. Atur urutan, ukuran kertas, dan margin. Gratis, langsung di browser.',
  alternates: { canonical: '/tools/jpg-ke-pdf' },
}

export default function JpgToPdfPage() {
  return (
    <ToolShell
      title="JPG ke PDF"
      description="Gabungkan foto atau hasil scan menjadi satu file PDF. Atur urutan halaman, ukuran kertas, dan margin."
      icon="image"
      privacyNote="Gambar diproses langsung di browser Anda dan tidak pernah diunggah ke server kami."
    >
      <ImageToPdfTool />
    </ToolShell>
  )
}
