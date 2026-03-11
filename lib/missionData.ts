export interface MissionTemplate {
  filename: string;
  headers: string[];
  example: string[][];
}

export interface Mission {
  id: string;
  title: string;
  category: 'cari-wilayah' | 'kenali-orang' | 'hitung-data';
  duration: string;
  xp: number;
  level: 'Pemula' | 'Petarung' | 'Juara';
  instruction: string[];
  template: MissionTemplate;
  checkQuestion: string;
  checkOptions: string[];
}

export const missionsData: Mission[] = [
  {
    id: 'tugas-01',
    title: 'Kenalan Sama 3 Orang di Sekitar',
    category: 'cari-wilayah',
    duration: '2 jam',
    xp: 50,
    level: 'Pemula',
    instruction: [
      'Cari 3 tempat: warung kopi, pos ronda, atau rumah warga',
      'Tanya: "Permisi Pak/Bu, saya [NAMA] dari Finatra"',
      'Tanyakan nama dan nomor HP',
      'Catat di buku atau HP',
      'Selesai! Klik tombol "Saya Sudah Selesai"',
    ],
    template: {
      filename: 'Data-3-Orang.csv',
      headers: ['No', 'Nama', 'No HP', 'Tempat', 'Tanggal'],
      example: [
        ['1', 'Pak Budi', '08123456789', 'Warung Kopi', '2024-03-11'],
        ['2', 'Bu Siti', '08234567890', 'Pos Ronda', '2024-03-11'],
      ],
    },
    checkQuestion: 'Sudah ketemu 3 orang dan catat namanya?',
    checkOptions: ['Belum', 'Sudah'],
  },
  {
    id: 'tugas-02',
    title: 'Lihat Rumah yang Banyak Motor di Depannya',
    category: 'cari-wilayah',
    duration: '1 jam',
    xp: 40,
    level: 'Pemula',
    instruction: [
      'Jalan-jalan di komplek perumahan',
      'Cari rumah yang motor di depannya banyak (3 atau lebih)',
      'Catat alamat rumahnya',
      'Tanya ke tetangga: "Ini rumah siapa? Punya usaha apa?"',
      'Catat jawabannya',
    ],
    template: {
      filename: 'Rumah-Banyak-Motor.csv',
      headers: ['Alamat Rumah', 'Nama Pemilik', 'Usaha/ Kerjaan', 'Jumlah Motor'],
      example: [
        ['Jl. Mawar No. 5', 'Pak Ahmad', 'Bengkel Motor', '4 motor'],
      ],
    },
    checkQuestion: 'Sudah nemu rumah dengan banyak motor?',
    checkOptions: ['Belum', 'Sudah'],
  },
  {
    id: 'tugas-03',
    title: 'Catat 5 Toko di Pasar Terdekat',
    category: 'cari-wilayah',
    duration: '2 jam',
    xp: 60,
    level: 'Pemula',
    instruction: [
      'Pergi ke pasar terdekat',
      'Pilih 5 toko (boleh warung, toko kelontong, apotek)',
      'Tanya nama pemiliknya',
      'Tanya: "Sudah pernah pinjam uang di bank?"',
      'Catat: Nama toko, nama pemilik, no HP (kalau mau kasih)',
    ],
    template: {
      filename: 'Data-Toko-Pasar.csv',
      headers: ['Nama Toko', 'Nama Pemilik', 'Jualan Apa', 'No HP', 'Sudah Pernah Pinjam?'],
      example: [
        ['Toko Rejeki', 'Bu Rina', 'Sembako', '0811111111', 'Belum'],
      ],
    },
    checkQuestion: 'Sudah catat 5 toko?',
    checkOptions: ['Belum', 'Sudah'],
  },
  {
    id: 'tugas-04',
    title: 'Hitung Kontrak Bulan Lalu di Kantor',
    category: 'hitung-data',
    duration: '1 jam',
    xp: 40,
    level: 'Pemula',
    instruction: [
      'Ke kantor, minta data kontrak bulan lalu ke admin',
      'Hitung: Total ada berapa kontrak?',
      'Hitung: Berapa yang dari Jakarta? Berapa dari Bekasi?',
      'Tulis di kertas dulu',
      'Masukkan ke Excel',
    ],
    template: {
      filename: 'Hitung-Kontrak.csv',
      headers: ['Wilayah', 'Jumlah Kontrak', 'Nama Sales'],
      example: [
        ['Jakarta Timur', '15', 'Pak Andi'],
        ['Bekasi', '8', 'Bu Dina'],
      ],
    },
    checkQuestion: 'Sudah hitung dan catat datanya?',
    checkOptions: ['Belum', 'Sudah'],
  },
  {
    id: 'tugas-05',
    title: 'Tanya 3 Orang: Kalau Pinjam Uang Buat Apa?',
    category: 'kenali-orang',
    duration: '2 jam',
    xp: 70,
    level: 'Petarung',
    instruction: [
      'Cari 3 orang: bisa tetangga, teman, atau kenalan',
      'Tanya: "Pak/Bu, kalau bisa pinjam uang 10 juta, buat apa?"',
      'Dengarkan jawabannya dengan baik',
      'Catat: Nama orang dan jawabannya',
      'Contoh jawaban: buat usaha, bayar sekolah anak, renovasi rumah',
    ],
    template: {
      filename: 'Kebutuhan-Orang.csv',
      headers: ['Nama', 'Jawaban', 'Butuh Berapa', 'Kapan Butuh'],
      example: [
        ['Pak Joko', 'Buat modal usaha bakso', 'Rp 10 juta', 'Bulan depan'],
      ],
    },
    checkQuestion: 'Sudah tanya 3 orang dan catat jawabannya?',
    checkOptions: ['Belum', 'Sudah'],
  },
  {
    id: 'tugas-06',
    title: 'Cari Tahu Siapa Ketua RT di 2 Tempat',
    category: 'cari-wilayah',
    duration: '2 jam',
    xp: 60,
    level: 'Petarung',
    instruction: [
      'Pilih 2 RT berbeda di wilayah kerjamu',
      'Tanya ke warga: "Permisi, Pak Ketua RT siapa? Rumahnya mana?"',
      'Ketemu Pak/Bu Ketua RT',
      'Kenalkan diri, tanya no HP',
      'Catat: Nama RT, nama ketua, no HP',
    ],
    template: {
      filename: 'Data-Ketua-RT.csv',
      headers: ['RT/RW', 'Nama Ketua', 'No HP', 'Alamat'],
      example: [
        ['RT 01/RW 03', 'Pak Slamet', '0833333333', 'Jl. Melati No. 1'],
      ],
    },
    checkQuestion: 'Sudah ketemu 2 ketua RT?',
    checkOptions: ['Belum', 'Sudah'],
  },
  {
    id: 'tugas-07',
    title: 'Hitung Pedagang Pinggir Jalan',
    category: 'hitung-data',
    duration: '1 jam',
    xp: 50,
    level: 'Petarung',
    instruction: [
      'Pilih 1 jalan raya di wilayahmu',
      'Jalan dari ujung ke ujung (atau 500 meter)',
      'Hitung: Ada berapa pedagang? (nasi goreng, es kelapa, dll)',
      'Tanya ke 2 pedagang: "Sudah berapa lama jualan di sini?"',
      'Catat: Jenis jualan dan lama berjualan',
    ],
    template: {
      filename: 'Pedagang-Pinggir-Jalan.csv',
      headers: ['Jenis Jualan', 'Lama Berjualan', 'Lokasi', 'Keterangan'],
      example: [
        ['Nasi Goreng', '3 tahun', 'Depan SMP 1', 'Ramai malam hari'],
      ],
    },
    checkQuestion: 'Sudah hitung dan tanya 2 pedagang?',
    checkOptions: ['Belum', 'Sudah'],
  },
  {
    id: 'tugas-08',
    title: 'Praktik Tanya Penghasilan (Santai)',
    category: 'kenali-orang',
    duration: '2 jam',
    xp: 80,
    level: 'Juara',
    instruction: [
      'Cari 1 orang yang sudah kenal (biar gak canggung)',
      'Ngobrol santai dulu 5 menit',
      'Tanya perlahan: "Pak/Bu, kira-kira penghasilan sebulan berapa? Boleh kasih kisaran"',
      'Catat kisarannya (misal: 3-5 juta, 5-10 juta, di atas 10 juta)',
      'Tanya juga: "Pengeluaran terbesar buat apa?"',
    ],
    template: {
      filename: 'Data-Penghasilan.csv',
      headers: ['Nama', 'Pekerjaan', 'Kisaran Penghasilan', 'Pengeluaran Terbesar'],
      example: [
        ['Pak Tono', 'Driver online', '5-10 juta', 'Cicilan motor & bensin'],
      ],
    },
    checkQuestion: 'Sudah praktik tanya penghasilan 1 orang?',
    checkOptions: ['Belum', 'Sudah'],
  },
  {
    id: 'tugas-09',
    title: 'Cari Tempat Warga Kumpul di Malam Hari',
    category: 'cari-wilayah',
    duration: '1 jam',
    xp: 60,
    level: 'Juara',
    instruction: [
      'Pergi malam hari (jam 7-9 malam)',
      'Cari tempat warga kumpul: warung kopi, lapangan, pos ronda',
      'Duduk dan amati 15 menit',
      'Hitung: Ada berapa orang? Umurnya kira-kira?',
      'Tanya ke 1 orang: "Sering kumpul di sini? Kenapa?"',
    ],
    template: {
      filename: 'Tempat-Kumpul-Warga.csv',
      headers: ['Tempat', 'Jumlah Orang', 'Umur Rata-rata', 'Keterangan'],
      example: [
        ['Warung Kopi Pak Min', '8 orang', '30-50 tahun', 'Nongkrong setiap malam'],
      ],
    },
    checkQuestion: 'Sudah cari tempat dan amati?',
    checkOptions: ['Belum', 'Sudah'],
  },
  {
    id: 'tugas-10',
    title: 'Buat Daftar 10 Orang yang Bisa Dihubungi Lagi',
    category: 'kenali-orang',
    duration: '3 jam',
    xp: 100,
    level: 'Juara',
    instruction: [
      'Dari tugas-tugas sebelumnya, pilih 10 orang yang paling ramah',
      'Pastikan nomor HP mereka benar',
      'Tulis: Nama, no HP, dan kenapa mereka bisa dihubungi lagi',
      'Contoh: "Pak Budi - 08123456789 - Tertarik pinjam buat usaha"',
      'Simpan baik-baik, ini data emas!',
    ],
    template: {
      filename: 'Database-10-Orang.csv',
      headers: ['Nama', 'No HP', 'Alamat/Wilayah', 'Kenapa Menarik', 'Kapan Follow Up'],
      example: [
        ['Pak Budi', '08123456789', 'Jl. Mawar', 'Mau pinjam buat usaha bakso', '3 hari lagi'],
      ],
    },
    checkQuestion: 'Sudah punya daftar 10 orang lengkap?',
    checkOptions: ['Belum', 'Sudah'],
  },
];

export const categoryLabels: Record<Mission['category'], string> = {
  'cari-wilayah': 'Cari Wilayah',
  'kenali-orang': 'Kenali Orang',
  'hitung-data': 'Hitung Data',
};

const missionsMap = new Map<string, Mission>(
  missionsData.map((m) => [m.id, m])
);

export const TOTAL_WEEKLY_MISSIONS = 5;

export function getMissionById(id: string): Mission | undefined {
  return missionsMap.get(id);
}

export function generateCSV(template: MissionTemplate): string {
  const rows = [template.headers.join(',')];
  for (const row of template.example) {
    rows.push(row.map((cell) => `"${cell}"`).join(','));
  }
  return rows.join('\n');
}
