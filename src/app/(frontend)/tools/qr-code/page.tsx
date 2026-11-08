import type { Metadata } from 'next'

import { QrTool } from '@/components/tools/QrTool'
import { ToolShell } from '@/components/tools/ToolShell'

export const metadata: Metadata = {
  title: 'Generator QR Code Gratis — Signal Digital',
  description: 'Buat QR code untuk link, teks, atau WhatsApp. Atur warna dan ukuran, unduh PNG atau SVG. Gratis tanpa daftar.',
  alternates: { canonical: '/tools/qr-code' },
}

export default function QrCodePage() {
  return (
    <ToolShell
      title="Generator QR Code"
      description="Buat QR code untuk link, teks, atau chat WhatsApp. Atur warna dan ukuran, lalu unduh sebagai PNG atau SVG."
      icon="qr"
      privacyNote="QR code dibuat langsung di browser Anda. Data yang Anda ketik tidak dikirim ke server kami."
    >
      <QrTool />
    </ToolShell>
  )
}
