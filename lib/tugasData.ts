export interface Tugas {
  id: number;
  judul: string;
  kategori: 'Cari Wilayah' | 'Kenali Orang' | 'Hitung Data';
  durasi: string;
  xp: number;
  urutan: number;
  langkah: string[];
}

export const tugasData: Tugas[] = [
  {
    id: 1,
    judul: 'Survei Warung Sekitar Kantor',
    kategori: 'Cari Wilayah',
    durasi: '30 menit',
    xp: 50,
    urutan: 1,
    langkah: [
      'Buka Google Maps dan tandai lokasi kantor Anda',
      'Jalan kaki 500m dari kantor, catat semua warung yang ditemukan',
      'Foto setiap warung dari depan (minimal 5 warung)',
      'Catat nama pemilik dan jenis dagangan di notes HP',
      'Kirim laporan ke grup WhatsApp tim',
    ],
  },
  {
    id: 2,
    judul: 'Kenali 3 Ketua RT di Wilayah',
    kategori: 'Kenali Orang',
    durasi: '45 menit',
    xp: 75,
    urutan: 2,
    langkah: [
      'Kunjungi kantor kelurahan terdekat',
      'Minta data kontak 3 Ketua RT di wilayah target',
      'Hubungi dan perkenalkan diri sebagai PAO Finatra',
      'Catat nama, nomor HP, dan alamat RT masing-masing',
      'Jadwalkan pertemuan lanjutan minggu depan',
    ],
  },
  {
    id: 3,
    judul: 'Hitung Jumlah UMKM di Pasar',
    kategori: 'Hitung Data',
    durasi: '60 menit',
    xp: 100,
    urutan: 3,
    langkah: [
      'Kunjungi pasar tradisional terdekat',
      'Hitung jumlah kios yang buka hari ini',
      'Kategorikan: makanan, pakaian, elektronik, lainnya',
      'Catat estimasi omzet harian (tanya langsung ke pedagang)',
      'Buat ringkasan dalam spreadsheet sederhana',
    ],
  },
  {
    id: 4,
    judul: 'Mapping Jalan Utama Wilayah',
    kategori: 'Cari Wilayah',
    durasi: '40 menit',
    xp: 60,
    urutan: 4,
    langkah: [
      'Buka aplikasi peta dan screenshot wilayah target',
      'Tandai 5 jalan utama yang sering dilalui warga',
      'Identifikasi titik keramaian (sekolah, masjid, pasar)',
      'Foto kondisi jalan dan akses transportasi',
      'Buat catatan potensi bisnis di setiap titik',
    ],
  },
  {
    id: 5,
    judul: 'Wawancara Pemilik Toko Kelontong',
    kategori: 'Kenali Orang',
    durasi: '30 menit',
    xp: 50,
    urutan: 5,
    langkah: [
      'Pilih 2 toko kelontong di wilayah target',
      'Perkenalkan diri dan jelaskan tujuan kunjungan',
      'Tanyakan: lama usaha, jumlah pelanggan harian, modal awal',
      'Tanyakan kebutuhan pembiayaan atau modal tambahan',
      'Catat hasil wawancara dan minta nomor kontak',
    ],
  },
  {
    id: 6,
    judul: 'Data Demografi RT Setempat',
    kategori: 'Hitung Data',
    durasi: '45 menit',
    xp: 75,
    urutan: 6,
    langkah: [
      'Minta data jumlah KK dari Ketua RT',
      'Catat estimasi jumlah penduduk usia produktif (18-55 tahun)',
      'Identifikasi pekerjaan dominan warga (pedagang, buruh, dll)',
      'Hitung persentase warga yang punya usaha sendiri',
      'Rangkum data dalam format tabel sederhana',
    ],
  },
  {
    id: 7,
    judul: 'Cari Lokasi Strategis untuk Agen',
    kategori: 'Cari Wilayah',
    durasi: '50 menit',
    xp: 80,
    urutan: 7,
    langkah: [
      'Survey 3 lokasi potensial untuk agen pembayaran',
      'Cek kepadatan penduduk di radius 200m',
      'Pastikan ada akses listrik dan internet stabil',
      'Foto lokasi dari berbagai sudut',
      'Buat perbandingan kelebihan dan kekurangan tiap lokasi',
    ],
  },
  {
    id: 8,
    judul: 'Bangun Relasi dengan Tokoh Masyarakat',
    kategori: 'Kenali Orang',
    durasi: '60 menit',
    xp: 100,
    urutan: 8,
    langkah: [
      'Identifikasi 2 tokoh masyarakat berpengaruh di wilayah',
      'Cari tahu kegiatan sosial yang mereka ikuti',
      'Hadiri kegiatan dan perkenalkan diri secara natural',
      'Diskusikan potensi kerja sama untuk pemberdayaan ekonomi',
      'Tukar kontak dan follow up dalam 3 hari',
    ],
  },
  {
    id: 9,
    judul: 'Analisis Kompetitor di Wilayah',
    kategori: 'Hitung Data',
    durasi: '45 menit',
    xp: 75,
    urutan: 9,
    langkah: [
      'Identifikasi semua layanan keuangan di wilayah (bank, koperasi, fintech)',
      'Catat lokasi dan jenis layanan yang ditawarkan',
      'Bandingkan suku bunga dan kemudahan akses',
      'Tanyakan ke warga layanan mana yang paling sering dipakai',
      'Buat analisis SWOT singkat untuk strategi penetrasi',
    ],
  },
  {
    id: 10,
    judul: 'Laporan Mingguan Wilayah',
    kategori: 'Hitung Data',
    durasi: '30 menit',
    xp: 50,
    urutan: 10,
    langkah: [
      'Kumpulkan semua data yang sudah dikumpulkan minggu ini',
      'Buat ringkasan: jumlah kunjungan, kontak baru, potensi nasabah',
      'Hitung conversion rate (prospek vs nasabah aktif)',
      'Identifikasi 3 tantangan utama minggu ini',
      'Susun rencana aksi untuk minggu depan',
    ],
  },
];
