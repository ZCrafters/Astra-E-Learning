// Data kontrak per kelurahan berdasarkan data historis Excel
// Digunakan untuk analisis wilayah & pemetaan prioritas

export interface WilayahItem {
  id: string;
  kelurahan: string;
  branch: string;
  kontrak: number;
  lat: number;
  lng: number;
}

export const wilayahData: WilayahItem[] = [
  // BEKASI BRANCH (Top 8)
  { id: 'bekasi-01', kelurahan: 'Kel Sriamur', branch: 'Bekasi Branch', kontrak: 22, lat: -6.2345, lng: 106.9890 },
  { id: 'bekasi-02', kelurahan: 'Kel Srimahi', branch: 'Bekasi Branch', kontrak: 19, lat: -6.2456, lng: 106.9912 },
  { id: 'bekasi-03', kelurahan: 'Kel Sumber Jaya', branch: 'Bekasi Branch', kontrak: 17, lat: -6.2567, lng: 106.9934 },
  { id: 'bekasi-04', kelurahan: 'Kel Tambun', branch: 'Bekasi Branch', kontrak: 14, lat: -6.2678, lng: 106.9956 },
  { id: 'bekasi-05', kelurahan: 'Kel Jalenjaya', branch: 'Bekasi Branch', kontrak: 12, lat: -6.2789, lng: 106.9978 },
  { id: 'bekasi-06', kelurahan: 'Kel Mustika Jaya', branch: 'Bekasi Branch', kontrak: 12, lat: -6.2890, lng: 106.9990 },
  { id: 'bekasi-07', kelurahan: 'Kel Bantar Gebang', branch: 'Bekasi Branch', kontrak: 8, lat: -6.2901, lng: 107.0001 },
  { id: 'bekasi-08', kelurahan: 'Kel Cibuntu', branch: 'Bekasi Branch', kontrak: 6, lat: -6.3012, lng: 107.0112 },

  // BEKASI II BRANCH (Top 6)
  { id: 'bekasi2-01', kelurahan: 'Kel Medan Satria', branch: 'Bekasi II', kontrak: 27, lat: -6.1234, lng: 106.8765 },
  { id: 'bekasi2-02', kelurahan: 'Kel Muara Bakti', branch: 'Bekasi II', kontrak: 17, lat: -6.1345, lng: 106.8876 },
  { id: 'bekasi2-03', kelurahan: 'Kel Kebalen', branch: 'Bekasi II', kontrak: 16, lat: -6.1456, lng: 106.8987 },
  { id: 'bekasi2-04', kelurahan: 'Kel Bahagia', branch: 'Bekasi II', kontrak: 13, lat: -6.1567, lng: 106.9098 },
  { id: 'bekasi2-05', kelurahan: 'Kel Hurip Jaya', branch: 'Bekasi II', kontrak: 12, lat: -6.1678, lng: 106.9209 },
  { id: 'bekasi2-06', kelurahan: 'Kel Pejuang', branch: 'Bekasi II', kontrak: 10, lat: -6.1789, lng: 106.9320 },

  // DEPOK BRANCH (Top 6)
  { id: 'depok-01', kelurahan: 'Kel Cipayung', branch: 'Depok Branch', kontrak: 10, lat: -6.3456, lng: 106.7890 },
  { id: 'depok-02', kelurahan: 'Kel Cipayung Jaya', branch: 'Depok Branch', kontrak: 10, lat: -6.3567, lng: 106.7901 },
  { id: 'depok-03', kelurahan: 'Kel Pondok Jaya', branch: 'Depok Branch', kontrak: 8, lat: -6.3678, lng: 106.8012 },
  { id: 'depok-04', kelurahan: 'Kel Bojong Pondok Terong', branch: 'Depok Branch', kontrak: 6, lat: -6.3789, lng: 106.8123 },
  { id: 'depok-05', kelurahan: 'Kel Beji', branch: 'Depok Branch', kontrak: 5, lat: -6.3890, lng: 106.8234 },
  { id: 'depok-06', kelurahan: 'Kel Kalimulya', branch: 'Depok Branch', kontrak: 5, lat: -6.3901, lng: 106.8345 },

  // CILEUNGSI BRANCH (Top 6)
  { id: 'cileungsi-01', kelurahan: 'Kel Mampir', branch: 'Cileungsi Branch', kontrak: 11, lat: -6.4567, lng: 106.9012 },
  { id: 'cileungsi-02', kelurahan: 'Kel Wargajaya', branch: 'Cileungsi Branch', kontrak: 11, lat: -6.4678, lng: 106.9123 },
  { id: 'cileungsi-03', kelurahan: 'Kel Setu Sari', branch: 'Cileungsi Branch', kontrak: 10, lat: -6.4789, lng: 106.9234 },
  { id: 'cileungsi-04', kelurahan: 'Kel Singajaya', branch: 'Cileungsi Branch', kontrak: 8, lat: -6.4890, lng: 106.9345 },
  { id: 'cileungsi-05', kelurahan: 'Kel Cikahuripan', branch: 'Cileungsi Branch', kontrak: 8, lat: -6.4901, lng: 106.9456 },
  { id: 'cileungsi-06', kelurahan: 'Kel Dayeuh', branch: 'Cileungsi Branch', kontrak: 8, lat: -6.5012, lng: 106.9567 },
];

// Helper: get unique branches
export function getBranches(): string[] {
  return [...new Set(wilayahData.map((w) => w.branch))];
}
