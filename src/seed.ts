import type { Payload } from 'payload'

/**
 * Mengisi konten awal sekali saja, saat database masih kosong.
 * Setelah itu semua konten diubah lewat panel admin (/admin).
 */
export async function seedIfEmpty(payload: Payload): Promise<void> {
  const settings = await payload.findGlobal({ slug: 'site-settings' })
  if (settings?.whatsapp) return

  payload.logger.info('Seed: mengisi konten awal Signal Digital...')

  const l = (items: string[]) => items.map((label) => ({ label }))

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Signal Digital',
      legalName: 'CV. Signal Digital',
      tagline: 'Partner Digitalisasi Bisnis Anda',
      description:
        'Signal Digital membantu UMKM dan perusahaan go digital: pembuatan website & aplikasi, cloud hosting, kelas online, dan konsultasi teknologi.',
      whatsapp: '6282219074569',
      whatsappDisplay: '0822 1907 4569',
      address: 'Cigantang, Kec. Mangkubumi, Kota Tasikmalaya, Jawa Barat 46181',
      leadEmail: process.env.LEAD_NOTIFY_EMAIL || undefined,
      heroBadge: 'Solusi digital untuk UMKM & perusahaan',
      heroTitle: 'Bawa bisnis Anda',
      heroHighlight: 'naik level',
      heroTitleAfter: 'dengan teknologi yang tepat.',
      heroSubtitle:
        'Dari website, aplikasi, sampai hosting dan pelatihan tim. Kami bantu merancang, membangun, dan merawat solusi digital yang benar-benar dipakai bisnis Anda.',
      heroPoints: l(['Konsultasi awal gratis', 'Harga sesuai kebutuhan', 'Pendampingan setelah rilis']),
      stats: [],
      values: [
        { icon: 'target', title: 'Mulai dari masalah bisnis', text: 'Kami pahami dulu tujuan dan kendala Anda, baru menentukan teknologinya. Tidak ada fitur yang dibuat hanya untuk gaya.' },
        { icon: 'chat', title: 'Komunikasi jelas', text: 'Progres rutin dan bahasa yang mudah dipahami, tanpa istilah teknis yang membingungkan.' },
        { icon: 'shield', title: 'Dirawat setelah rilis', text: 'Website dan aplikasi tidak ditinggal begitu saja. Kami bantu hosting, perbaikan, dan pengembangan lanjutan.' },
      ],
      steps: [
        { title: 'Konsultasi', text: 'Ceritakan kebutuhan dan masalah bisnis Anda. Gratis, tanpa komitmen.' },
        { title: 'Rencana & Penawaran', text: 'Kami susun ruang lingkup, estimasi waktu, dan biaya yang transparan.' },
        { title: 'Pengerjaan', text: 'Desain dan pengembangan dengan update progres rutin yang bisa Anda pantau.' },
        { title: 'Rilis & Pendampingan', text: 'Sistem online, tim Anda dilatih, dan kami tetap mendampingi setelahnya.' },
      ],
      leadNeeds: l(['Pembuatan Website', 'Pembuatan Aplikasi', 'Cloud Hosting', 'Kelas Online / Pelatihan', 'Konsultasi Digital', 'Lainnya']),
      leadBudgets: l(['Belum tahu, perlu konsultasi', '< Rp 5 juta', 'Rp 5 - 15 juta', 'Rp 15 - 50 juta', '> Rp 50 juta']),
    },
  })

  const services = [
    { icon: 'code', title: 'Pembuatan Website & Aplikasi', text: 'Company profile, toko online, sistem informasi, sampai aplikasi internal perusahaan yang dibuat sesuai alur kerja Anda.', tags: ['Company Profile', 'Sistem Informasi', 'Aplikasi Web'] },
    { icon: 'cloud', title: 'Cloud Hosting Pribadi', text: 'Hosting dan server yang dikelola untuk website dan aplikasi bisnis Anda, lengkap dengan backup dan pemantauan.', tags: ['Hosting', 'Domain', 'Backup'] },
    { icon: 'book', title: 'Kelas Online', text: 'Pelatihan praktis untuk individu dan tim: Microsoft Office, web development, hingga memulai karier freelance.', tags: ['MS Office', 'Web Development', 'Freelance'] },
    { icon: 'bulb', title: 'Konsultasi Digital', text: 'Bingung mulai dari mana? Kami bantu memetakan kebutuhan, memilih solusi, dan menyusun rencana digitalisasi yang realistis.', tags: ['Strategi', 'Audit Sistem', 'Perencanaan'] },
  ] as const
  for (const [i, s] of services.entries()) {
    await payload.create({ collection: 'services', data: { ...s, tags: l([...s.tags]), order: i } })
  }

  const portfolio = [
    { title: 'Aplikasi Rental Mobil', category: 'Aplikasi Web', text: 'Sistem pemesanan dan manajemen armada untuk usaha rental mobil.', url: 'https://indorent.signaldigital.web.id' },
    { title: 'Website Perusahaan', category: 'Company Profile', text: 'Website profil perusahaan yang informatif dan mudah diperbarui.' },
    { title: 'Aplikasi Arsip Data Perusahaan', category: 'Sistem Informasi', text: 'Penyimpanan dan pencarian dokumen perusahaan yang rapi dan aman.' },
  ]
  for (const [i, p] of portfolio.entries()) {
    await payload.create({ collection: 'portfolio', data: { ...p, order: i } })
  }

  const programs = [
    { icon: 'book', badge: 'Kelas Online', title: 'Signal Academy', text: 'Kelas praktis dengan format campuran: video materi yang bisa diakses kapan saja dan sesi live bersama mentor.', points: ['Microsoft Office untuk kerja', 'Web development dasar', 'Memulai karier freelance'], cta: 'Tanya jadwal kelas', waText: 'Halo Signal Digital, saya ingin tahu info kelas online di Signal Academy.' },
    { icon: 'users', badge: '1-on-1', title: 'Mentoring Privat', text: 'Sesi privat untuk membahas masalah spesifik Anda: review proyek, arahan belajar, atau konsultasi karier.', points: ['Topik bebas sesuai kebutuhan', 'Jadwal fleksibel', 'Online via video call'], cta: 'Booking mentoring', waText: 'Halo Signal Digital, saya ingin booking sesi mentoring privat.' },
  ] as const
  for (const [i, p] of programs.entries()) {
    await payload.create({ collection: 'programs', data: { ...p, points: l([...p.points]), order: i } })
  }

  const tools = [
    { icon: 'qr', slug: 'qr-code', status: 'active', title: 'Generator QR Code', text: 'Buat QR code untuk link, WhatsApp, atau teks.' },
    { icon: 'image', slug: 'jpg-ke-pdf', status: 'active', title: 'JPG ke PDF', text: 'Gabungkan foto menjadi satu file PDF.' },
    { icon: 'file', slug: 'word-ke-pdf', status: 'active', title: 'Word ke PDF', text: 'Ubah dokumen Word menjadi PDF.' },
  ] as const
  for (const [i, t] of tools.entries()) {
    await payload.create({ collection: 'tools', data: { ...t, order: i } })
  }

  const faqs = [
    ['Berapa biaya membuat website atau aplikasi?', 'Biaya tergantung kebutuhan dan fitur yang diinginkan. Setelah konsultasi gratis, kami kirimkan penawaran dengan rincian ruang lingkup dan biaya yang jelas.'],
    ['Berapa lama proses pengerjaannya?', 'Website company profile umumnya selesai dalam 1–3 minggu. Aplikasi atau sistem yang lebih kompleks menyesuaikan ruang lingkup, dan jadwalnya kami sepakati di awal.'],
    ['Apakah bisa sekalian hosting dan domain?', 'Bisa. Kami menyediakan cloud hosting dan membantu pengurusan domain, sehingga Anda cukup fokus menjalankan bisnis.'],
    ['Bagaimana kalau ada kendala setelah website online?', 'Kami memberikan masa pendampingan setelah rilis. Setelah itu, tersedia layanan perawatan untuk perbaikan dan pengembangan lanjutan.'],
    ['Apakah melayani klien di luar Tasikmalaya?', 'Tentu. Seluruh proses bisa dilakukan secara online, jadi kami melayani klien dari seluruh Indonesia.'],
  ]
  for (const [i, [question, answer]] of faqs.entries()) {
    await payload.create({ collection: 'faqs', data: { question, answer, order: i } })
  }

  payload.logger.info('Seed: selesai.')
}
