# Rencana Pengembangan Website Signal Digital

> Referensi fitur: https://nafanesia.id/ (beranda, /blog, /academy, /academy/mentoring)
> Dibuat: 6 November 2026
> Status: **Draf. Jawab bagian "Pertanyaan" dulu sebelum pengembangan dimulai.**

---

## Daftar Isi
1. [Pertanyaan yang Harus Dijawab Lebih Dulu](#1-pertanyaan-yang-harus-dijawab-lebih-dulu)
2. [Ringkasan Situs Referensi](#2-ringkasan-situs-referensi)
3. [Daftar Fitur](#3-daftar-fitur)
4. [Rekomendasi Teknologi](#4-rekomendasi-teknologi)
5. [Struktur Database](#5-struktur-database)
6. [Struktur Halaman & URL](#6-struktur-halaman--url)
7. [Alur Utama](#7-alur-utama)
8. [Tahapan Pengerjaan](#8-tahapan-pengerjaan)
9. [Checklist Sebelum Launch](#9-checklist-sebelum-launch)
10. [Catatan & Risiko](#10-catatan--risiko)

---

## 1. Pertanyaan yang Harus Dijawab Lebih Dulu

Isi jawaban langsung di bawah tiap pertanyaan (ganti `...`). Pertanyaan bertanda **(WAJIB)** menentukan cakupan proyek dan harus dijawab sebelum Fase 1 dimulai.

> <span style="color:#16a34a">🟢 **Hijau = belum dijawab / jawabannya belum lengkap.** Lengkapi bagian yang hijau, lalu hapus tanda 🟢-nya.</span>

### A. Bisnis & Tujuan
1. **(WAJIB)** Apa bisnis Signal Digital? (agensi software, venture studio, digital marketing, kelas online, atau gabungan)
   - Jawaban: Gabungan
2. **(WAJIB)** Apa tujuan utama website? Urutkan prioritasnya: (a) mendapatkan klien/lead, (b) menjual kelas/produk, (c) branding/portofolio, (d) blog/edukasi.
   - Jawaban: ...c-a-b-d
3. Siapa target pengunjung utamanya? (UMKM, startup, korporat, pelajar/developer, umum)
   - Jawaban: UMKM dan korporat
4. <span style="color:#16a34a">🟢 Layanan apa saja yang ditawarkan? Tulis daftarnya beserta deskripsi singkat.</span>
   - Jawaban: 
   - Konsultan dan 
   - agency
   - <span style="color:#16a34a">🟢 Belum lengkap: tulis daftar layanannya satu per satu. Apakah memakai daftar di situs lama (Cloud Hosting Pribadi, Kelas Online, Development Website)? Ada tambahan?</span>
5. Apakah ada paket/tier layanan (misal Starter, Growth, Enterprise)? Apakah harga ditampilkan di website?
   - Jawaban: ...belum ada, ini harus konsultasi dulu
6. Apakah ada nama badan usaha (PT/CV), alamat kantor, dan nomor kontak resmi?
   - Jawaban: ...CV. Signal Digital - Cigantang, Kec. Mangkubumi, Kota Tasikmalaya, Jawa Barat 46181

### B. Cakupan Fitur
7. **(WAJIB)** Fitur mana yang ikut di versi pertama (v1)? Centang:
   - [ok ] Landing page / company profile
   - [ok ] <span style="color:#16a34a">🟢 Form konsultasi (lead) ← belum dicentang. Terlewat? Disarankan tetap ada, karena harga layanan harus lewat konsultasi (no. 5).</span>
   - [ok ] Halaman portofolio
   - [ok ] Blog
   - [ok ] Academy / kelas berbayar
   - [ok ] Mentoring / booking berbayar
   - [ok ] Panel admin (CMS)
   - [ ] Lainnya: ... fitur service generate QR code, jpg to pdf, doc to pdf
   - <span style="color:#16a34a">🟢 Belum lengkap: semua fitur dicentang, tapi target online minggu depan (no. 25). Setujui pembagian ini: **v1 (minggu depan):** beranda, portofolio, blog, panel admin, form konsultasi, Academy & Mentoring sebagai katalog dengan tombol "Daftar via WhatsApp", tools QR code + JPG→PDF. **v2:** pembayaran Midtrans, jadwal mentoring otomatis, versi bahasa Inggris, DOC→PDF. Setuju / ubah?</span>
8. Jika ada kelas berbayar: kelas apa, berapa harganya, berapa kuotanya, dan apa formatnya (live, rekaman, atau campuran)?
   - Jawaban: ...campuran, Rp100.000
9. <span style="color:#16a34a">🟢 Jika ada mentoring: siapa mentornya, apa saja paketnya, berapa harganya, dan bagaimana sesinya dijadwalkan (manual via WhatsApp atau pilih jadwal otomatis di website)?</span>
   - Jawaban: ...manual dan otomatis
   - <span style="color:#16a34a">🟢 Belum lengkap: siapa mentornya, apa paketnya, berapa harganya? (Boleh "belum ada, diisi nanti di CMS".)</span>
10. Apakah peserta/pelanggan perlu **akun/login** (misal untuk mengakses materi kelas), atau cukup bayar lalu dihubungi via WhatsApp seperti nafanesia.id?
    - Jawaban: ...sama
11. Apakah website perlu dua bahasa (Indonesia & Inggris)?
    - Jawaban: ...perlu
12. Siapa yang akan mengelola konten (menulis blog, mengubah portofolio)? Apakah orang non-teknis? (Ini menentukan seberapa lengkap panel admin.)
    - Jawaban: ...non teknis

### C. Konten & Aset
13. Apakah logo dan identitas visual (warna, font) sudah ada?
    - Jawaban: ...belum ada
14. Website apa saja yang gayanya Anda sukai sebagai inspirasi visual? (boleh lebih dari satu)
    - Jawaban: ... signaldigital.web.id
    - <span style="color:#16a34a">🟢 Belum lengkap: situs lama memakai template gratis (HTML Codex / ThemeWagon). Tampilannya mau **dipertahankan**, atau **dibuat desain baru** yang lebih modern?</span>
15. Apakah teks/copywriting sudah ada, atau perlu dibantu ditulis?
    - Jawaban: ...bantu tulis
16. Portofolio/proyek apa saja yang akan ditampilkan? Apakah sudah ada screenshot, deskripsi, dan izin dari klien?
    - Jawaban: ...baru ada di lokal, siapkan saja biar nanti saya isi di cms nya
17. Apakah ada testimoni klien, logo klien, dan foto tim yang boleh dipakai?
    - Jawaban: ...belum ada
18. Angka statistik apa yang ingin ditampilkan (jumlah klien, jumlah proyek, tahun berdiri)? Pastikan angkanya benar.
    - Jawaban: ...belum ada

### D. Teknis & Operasional
19. **(WAJIB)** Teknologi apa yang ingin dipakai: **Next.js** (rekomendasi) atau **Laravel**? Atau bahasa yang paling Anda kuasai?
    - Jawaban: samakan dengan https://buildwithangga.com/
    - <span style="color:#16a34a">🟢 Perlu konfirmasi: situs BuildWithAngga tidak bisa diperiksa (akses ditolak). Usulan: **Laravel 11 + Filament** (panel admin mudah untuk non-teknis, cocok untuk self hosting). Setuju?</span>
20. Apakah domain sudah dibeli? Apa nama domainnya?
    - Jawaban: sudah, signaldigital.web.id
21. Di mana website akan di-hosting (Vercel, VPS, shared hosting)? Berapa budget bulanannya?
    - Jawaban: self hosting
    - <span style="color:#16a34a">🟢 Belum lengkap: servernya apa? VPS (penyedia & OS-nya) atau server sendiri di kantor/rumah? Apakah ada akses SSH? Apakah sudah terpasang PHP / MySQL / Nginx?</span>
22. Apakah sudah punya akun **Midtrans** (atau payment gateway lain seperti Xendit/Tripay)? Verifikasi bisnis butuh beberapa hari kerja.
    - Jawaban: belum dulu
23. Nomor WhatsApp mana yang dipakai untuk notifikasi otomatis? Mau pakai layanan apa (Fonnte, WhatsApp Cloud API, atau manual saja)?
    - Jawaban: belum ada
    - <span style="color:#16a34a">🟢 Belum lengkap: tombol WhatsApp di website tetap butuh nomor. Pakai **0822 1907 4569** (dari situs lama)?</span>
24. Email bisnis apa yang dipakai untuk menerima notifikasi lead?
    - Jawaban: iskandaryusup465@gmail.com

### E. Waktu & Prioritas
25. Kapan target website harus online?
    - Jawaban: minggu depan
26. Apakah boleh rilis bertahap (v1 company profile dulu, fitur berbayar menyusul)?
    - Jawaban: boleh

---

## 2. Ringkasan Situs Referensi

nafanesia.id adalah situs **venture studio** (PT. Nafanesia Kebermanfaatan Indonesia, Bandung). Situsnya bukan toko online dan tidak punya login member. Situs ini punya empat fungsi utama:

| Fungsi | Isi |
|---|---|
| Landing page perusahaan | Hero, statistik, manifesto, 6 kartu layanan, portofolio, logo klien, testimoni, tim, FAQ, form kontak |
| Portofolio | Produk milik sendiri (dengan badge metrik / "Coming Soon") dan proyek klien |
| Academy | Kelas Flutter berbayar: kurikulum per minggu, harga coret, kuota/waitlist, kode promo, bayar via Midtrans |
| Mentoring 1-on-1 | Pilih paket, isi topik, bayar via Midtrans, jadwal dikirim via WhatsApp |

Fitur pendukung yang ada di situs referensi:
- Blog dengan filter bahasa ID/EN
- Tindak lanjut ke pelanggan lewat WhatsApp

Model bisnis yang tertulis di FAQ-nya:
- Tier Starter, Growth, dan Venture
- Pembayaran 50% di awal dan 50% setelah delivery
- Support setelah launch 14–30 hari

> Gunakan referensi ini sebagai **inspirasi struktur dan fitur** saja. Teks, ilustrasi, dan desain harus dibuat sendiri.

---

## 3. Daftar Fitur

Prioritas: **P1** = wajib di v1, **P2** = setelah v1, **P3** = opsional/nanti.

### 3.1 Halaman Publik
| Fitur | Detail | Prioritas |
|---|---|---|
| Beranda | Hero + CTA, statistik, visi/manifesto, layanan, portofolio unggulan, logo klien, testimoni, tim, FAQ (accordion), form kontak | P1 |
| Portofolio | Daftar + detail, filter kategori (produk sendiri / klien), badge status | P1 |
| Halaman hukum | Kebijakan privasi, syarat & ketentuan, kebijakan refund (wajib untuk Midtrans) | P1 |
| Blog | Daftar + detail, kategori, pencarian, filter bahasa, SEO per artikel | P2 |
| Academy | Kurikulum, harga coret, kuota, status (buka/penuh/waitlist), FAQ, testimoni, form daftar & bayar | P2 |
| Mentoring | Profil mentor, paket, form booking & bayar | P2 |
| Dua bahasa (ID/EN) | Pilihan bahasa untuk semua halaman | P3 |

### 3.2 Fitur Fungsional
| Fitur | Detail | Prioritas |
|---|---|---|
| Form konsultasi | Nama, email, WhatsApp, jenis kebutuhan, estimasi budget, deskripsi. Disimpan ke database, notifikasi ke admin, lalu halaman terima kasih. Ada anti-spam (honeypot/Turnstile) | P1 |
| Tombol WhatsApp melayang | Link wa.me dengan pesan yang sudah terisi | P1 |
| SEO dasar | Meta tags, Open Graph, sitemap.xml, robots.txt, structured data | P1 |
| Analitik | Google Analytics 4 / Meta Pixel, pelacakan submit form | P1 |
| Pembayaran Midtrans Snap | QRIS, transfer bank (VA), e-wallet. Webhook memperbarui status order otomatis | P2 |
| Kode promo | Diskon persen/nominal, kuota pemakaian, tanggal kedaluwarsa, tombol "Cek" | P2 |
| Kuota & waitlist | Jika kuota penuh, form otomatis berubah menjadi daftar waitlist | P2 |
| Notifikasi WhatsApp otomatis | Setelah pembayaran sukses (Fonnte / WhatsApp Cloud API) | P2 |
| Email konfirmasi | Bukti pembayaran ke email pembeli (Resend) | P2 |
| Akun peserta & akses materi | Login peserta, halaman materi kelas | P3 |

### 3.3 Panel Admin
| Fitur | Detail | Prioritas |
|---|---|---|
| Login admin | Email + password, hanya untuk tim internal | P1 |
| Leads (CRM sederhana) | Daftar lead, status (baru → dihubungi → deal / batal), catatan, ekspor CSV | P1 |
| Kelola konten beranda | Layanan, statistik, klien, testimoni, tim, FAQ | P1 |
| Kelola portofolio | CRUD + upload gambar | P1 |
| Kelola blog | Editor artikel (rich text / markdown), draf & terbit | P2 |
| Kelola Academy | Batch, harga, kuota, status, kurikulum | P2 |
| Kelola mentoring | Mentor, paket, harga | P2 |
| Order & pembayaran | Daftar transaksi, status, detail, ekspor CSV | P2 |
| Kode promo & waitlist | CRUD promo, daftar waitlist | P2 |

---

## 4. Rekomendasi Teknologi

| Komponen | Pilihan Utama | Alternatif |
|---|---|---|
| Framework | **Next.js 15 (App Router) + TypeScript** | Laravel 11 + Filament |
| Styling | Tailwind CSS + shadcn/ui | — |
| Animasi | Framer Motion | GSAP |
| Database | PostgreSQL (Supabase / Neon) | MySQL |
| ORM | Prisma | Drizzle |
| Auth admin | Auth.js | Supabase Auth |
| Upload gambar | Cloudinary / Supabase Storage | UploadThing |
| Pembayaran | Midtrans Snap | Xendit, Tripay |
| WhatsApp | Fonnte | WhatsApp Cloud API |
| Email | Resend | SMTP |
| Anti-spam | Cloudflare Turnstile | reCAPTCHA |
| Hosting | Vercel | VPS (Docker) |
| DNS / CDN | Cloudflare | — |

**Alasan memilih Next.js:**
- SEO bagus karena halaman dirender di server.
- Frontend dan API ada dalam satu proyek.
- Deploy ke Vercel gratis untuk awal.

**Kapan memilih Laravel:**
- Jika Anda lebih menguasai PHP.
- Jika butuh panel admin yang lengkap dengan cepat. Filament membuat CRUD admin hampir otomatis.

---

## 5. Struktur Database

```
users            id, name, email, password_hash, role, created_at
leads            id, name, email, whatsapp, need_type, budget_range, message, status, notes, source, created_at
services         id, title, subtitle, description, tags[], metric, icon, order, is_active
stats            id, label, value, order
portfolios       id, slug, title, category(own|client), tag, tagline, description, metric, image, url, status(live|coming_soon), order, is_featured
clients          id, name, logo, url, order
testimonials     id, name, role, quote, photo, context(home|academy|mentoring), order
team_members     id, name, role, bio, photo, order
faqs             id, question, answer, context(home|academy|mentoring), order
posts            id, slug, title, excerpt, content, cover, lang, category, status(draft|published), published_at, seo_title, seo_desc
courses          id, slug, title, description, curriculum(json), price, price_strike, status
batches          id, course_id, name, quota, start_date, status(open|full|closed)
mentors          id, name, title, bio, photo, expertise[]
mentoring_packages id, mentor_id, name, duration_min, price, description, is_active
orders           id, code, type(course|mentoring), item_id, name, whatsapp, email, notes, subtotal, discount, total, promo_code_id, status(pending|paid|expired|failed|refunded), created_at
payments         id, order_id, midtrans_order_id, snap_token, payment_type, gross_amount, transaction_status, raw_payload(json), updated_at
promo_codes      id, code, type(percent|fixed), value, quota, used, valid_from, valid_until, applies_to, is_active
waitlists        id, batch_id, name, whatsapp, email, created_at
```

---

## 6. Struktur Halaman & URL

```
/                          Beranda
/portofolio                Daftar portofolio
/portofolio/[slug]         Detail portofolio
/blog                      Daftar artikel
/blog/[slug]               Detail artikel
/academy                   Halaman kelas
/mentoring                 Halaman mentoring
/checkout/sukses           Pembayaran berhasil
/checkout/pending          Menunggu pembayaran
/terima-kasih              Setelah submit form konsultasi
/kebijakan-privasi
/syarat-ketentuan
/kebijakan-refund

/admin                     Dashboard (ringkasan lead & order)
/admin/leads
/admin/konten/{layanan|klien|testimoni|tim|faq|statistik}
/admin/portofolio
/admin/blog
/admin/academy
/admin/mentoring
/admin/order
/admin/promo
/admin/waitlist

/api/leads                 POST form konsultasi
/api/promo/validate        POST cek kode promo
/api/checkout              POST buat order + Snap token
/api/midtrans/webhook      POST notifikasi pembayaran
```

---

## 7. Alur Utama

### 7.1 Form Konsultasi
1. Pengunjung mengisi form di beranda.
2. Sistem memvalidasi input dan memeriksa anti-spam.
3. Data disimpan ke tabel `leads` dengan status `baru`.
4. Admin menerima notifikasi lewat email dan WhatsApp.
5. Pengunjung diarahkan ke `/terima-kasih`, yang berisi tombol untuk chat WhatsApp langsung.

### 7.2 Pembelian Kelas / Mentoring
1. Pengguna memilih kelas atau paket, lalu mengisi nama, WhatsApp, email, dan kode promo (opsional).
2. Jika kode promo diisi, tombol "Cek" memanggil `/api/promo/validate` dan total harga diperbarui.
3. Saat tombol "Bayar" ditekan, `/api/checkout` membuat `order` (status `pending`) dan meminta Snap token ke Midtrans.
4. Popup Midtrans Snap muncul dan pengguna membayar (QRIS / VA / e-wallet).
5. Midtrans memanggil `/api/midtrans/webhook`. Sistem memverifikasi signature, lalu status order menjadi `paid`.
   - Jika berhasil: kuota batch dikurangi, pemakaian promo bertambah, pembeli menerima WhatsApp dan email konfirmasi, admin menerima notifikasi.
   - Jika `expire` atau `deny`: status order menjadi `expired` atau `failed`.
6. Pengguna diarahkan ke `/checkout/sukses` atau `/checkout/pending`.

### 7.3 Kuota Penuh
- Jika `batch.quota` habis, status batch berubah menjadi `full`.
- Form di halaman Academy berubah menjadi form waitlist dan data masuk ke tabel `waitlists`.

---

## 8. Tahapan Pengerjaan

| Fase | Pekerjaan | Hasil | Estimasi |
|---|---|---|---|
| **0. Persiapan** | Jawab pertanyaan bagian 1, kumpulkan aset (logo, foto, teks), beli domain, daftar Midtrans | Brief final | 3–5 hari |
| **1. Fondasi** | Setup proyek, design system (warna, font, komponen), layout, header & footer, deploy awal | Kerangka situs online di domain staging | 1 minggu |
| **2. Landing Page** | Semua bagian beranda (data statis dulu), animasi, versi mobile, form konsultasi + notifikasi, tombol WhatsApp, SEO dasar, analitik | **v1 bisa dirilis** | 1–2 minggu |
| **3. Admin & CMS** | Login admin, CRUD konten beranda, leads, portofolio. Beranda mulai membaca data dari database | Konten bisa diubah tanpa coding | 1–2 minggu |
| **4. Portofolio & Blog** | Halaman daftar & detail, filter, editor artikel, sitemap dinamis | Blog & portofolio aktif | 1 minggu |
| **5. Academy & Mentoring** | Halaman produk, Midtrans Snap + webhook, promo, kuota & waitlist, WhatsApp & email otomatis, manajemen order | Bisa menerima pembayaran | 2 minggu |
| **6. QA & Launch** | Halaman hukum, uji di sandbox Midtrans, uji di berbagai perangkat, Lighthouse ≥ 90, pindah ke Midtrans produksi, go-live | Website produksi | 1 minggu |

**Total:** sekitar 7–9 minggu (satu developer). Rilis v1 (Fase 0–2) bisa dilakukan sekitar 2–3 minggu.

---

## 9. Checklist Sebelum Launch

- [ ] Semua teks sudah dicek ejaannya dan angka statistiknya benar
- [ ] Gambar sudah dikompres (WebP/AVIF) dan memiliki teks `alt`
- [ ] Tampilan sudah dicek di HP, tablet, dan desktop
- [ ] Form konsultasi sudah diuji dan notifikasinya sampai
- [ ] Anti-spam aktif
- [ ] Transaksi Midtrans sandbox sudah diuji untuk semua metode (sukses, pending, expire)
- [ ] Signature webhook sudah diverifikasi
- [ ] Kunci produksi Midtrans disimpan di environment variable, bukan di kode
- [ ] Halaman privasi, S&K, dan refund sudah tersedia
- [ ] Meta tags, Open Graph, sitemap, dan robots.txt sudah ada
- [ ] Google Search Console sudah terdaftar
- [ ] Analitik dan event konversi berjalan
- [ ] HTTPS aktif dan domain sudah mengarah dengan benar
- [ ] Backup database otomatis sudah aktif
- [ ] Halaman 404 sudah dibuat

---

## 10. Catatan & Risiko

| Risiko | Mitigasi |
|---|---|
| Verifikasi Midtrans lama atau ditolak | Daftar sejak Fase 0, siapkan halaman hukum & legalitas usaha lebih awal |
| Konten (teks, foto, portofolio) belum siap | Pakai placeholder agar pengembangan tidak terhambat, tetapi tetapkan tenggat untuk konten final |
| Cakupan fitur terus bertambah | Kunci daftar fitur v1 (pertanyaan no. 7). Fitur baru masuk ke v2 |
| Nomor WhatsApp kena blokir karena pesan otomatis | Pakai nomor khusus untuk notifikasi, batasi pesan hanya untuk konfirmasi transaksi |
| Menyalin konten/desain situs referensi | Hanya meniru struktur fitur. Semua teks, gambar, dan desain dibuat orisinal |
