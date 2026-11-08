import type { Metadata } from 'next'

import { ToolShell } from '@/components/tools/ToolShell'
import { WordToPdfTool } from '@/components/tools/WordToPdfTool'
import { findSoffice } from '@/lib/libreoffice'

export const metadata: Metadata = {
  title: 'Word ke PDF Gratis — Signal Digital',
  description: 'Ubah dokumen Word (.docx, .doc), .odt, atau .rtf menjadi PDF. Gratis tanpa daftar.',
  alternates: { canonical: '/tools/word-ke-pdf' },
}

export default async function WordToPdfPage() {
  const available = Boolean(await findSoffice())

  return (
    <ToolShell
      title="Word ke PDF"
      description="Ubah dokumen Word, OpenDocument, atau RTF menjadi PDF dengan tata letak yang tetap rapi."
      icon="file"
      privacyNote="Dokumen dikonversi di server kami dan langsung dihapus setelah selesai. Kami tidak menyimpan isi dokumen Anda."
    >
      <WordToPdfTool available={available} />
    </ToolShell>
  )
}
