# Website Signal Digital

Landing page + panel admin (CMS) untuk signaldigital.web.id.

- **Next.js 16** (App Router) + **Tailwind CSS 4**
- **Payload CMS 3**: panel admin di `/admin`, berjalan di proyek yang sama
- **SQLite** (`signaldigital.db`), bisa dipindah ke PostgreSQL nanti

## Menjalankan di komputer sendiri

Butuh Node.js **22.23.4+** (atau 24.22.1+).

```bash
npm install
npm run migrate   # membuat/memperbarui tabel database
npm run dev       # http://localhost:3000
```

Buka `http://localhost:3000/admin` dan buat akun admin pertama. Saat pertama kali jalan, konten awal (layanan, portofolio, FAQ, dll.) otomatis diisi.

## Mengubah konten

Semua lewat panel admin `/admin`:

| Menu | Isi |
|---|---|
| Penjualan → Leads (Konsultasi) | Data form konsultasi, status, catatan |
| Konten Website → Pengaturan Website | Nomor WhatsApp, alamat, teks hero, statistik, langkah kerja, pilihan form |
| Konten Website → Layanan / Portofolio / Academy & Mentoring / Tools / Testimoni / FAQ | Tambah, ubah, sembunyikan, atur urutan |
| Konten Website → Media | Gambar yang diunggah |

Bagian **Statistik** dan **Testimoni** otomatis disembunyikan selama datanya kosong.

## Mengubah struktur data (developer)

Setelah menambah/mengubah koleksi atau field di `src/collections` / `src/globals`:

```bash
npm run payload migrate:create nama-perubahan
npm run migrate
npm run generate:types
```

## Produksi (self hosting / VPS)

```bash
npm ci
npm run build
npm start          # port 3000; jalankan dengan PM2 atau systemd, di belakang Nginx (HTTPS)
```

Migration dijalankan otomatis saat server start. Isi `.env` di server:

```
DATABASE_URL=file:./signaldigital.db
PAYLOAD_SECRET=<string acak panjang, beda dari lokal>
NEXT_PUBLIC_SERVER_URL=https://signaldigital.web.id
```

### Tools gratis (`/tools`)

- **Generator QR Code** dan **JPG ke PDF** berjalan sepenuhnya di browser pengunjung (tidak butuh apa-apa di server).
- **Word ke PDF** dikonversi di server dengan **LibreOffice**. Pasang di server, misalnya `sudo apt install libreoffice-writer --no-install-recommends`, lalu restart aplikasi. Program dicari otomatis di lokasi umum; kalau lokasinya lain, isi `LIBREOFFICE_PATH` di `.env`. Selama LibreOffice belum ada, halaman Word ke PDF menampilkan "Segera hadir".
- Batasan Word ke PDF: maks. 10 MB, format .docx/.doc/.odt/.rtf (isi file dicek), maks. 2 konversi bersamaan, 10 konversi per IP per 10 menit. File dihapus setelah selesai.
- Kartu tools di beranda dan `/tools` diatur dari admin → **Tools** (urutan, status Aktif/Segera hadir, tampil/sembunyi).

Yang belum: adapter email (notifikasi lead saat ini hanya ditulis ke log server) dan backup database otomatis.
