// Data kursus berdasarkan materi PAO Finatra
// Sumber: Teori E-learning PAO Rekrutmen Agen Finatra

export interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  icon: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  progress: number;
  totalModules: number;
  completedModules: number;
  modules: Module[];
}

export const coursesData: Course[] = [
  {
    id: "pao-fundamental",
    title: "Fundamental PAO Finatra",
    description: "Kurikulum komprehensif Partnership Account Officer untuk penetrasi agen RT/RW",
    category: "Program Utama",
    thumbnail: "https://picsum.photos/seed/pao-fundamental/400/300",
    progress: 35,
    totalModules: 10,
    completedModules: 3,
    modules: [
      {
        id: "mod-1",
        title: "Personal Branding Profesional Keuangan",
        description: "Rekayasa persepsi dan positioning statement untuk diterima oleh tokoh masyarakat. Belajar teknik mengidentifikasi 'Zebra' - persona prospek ideal.",
        duration: "45 menit",
        progress: 100,
        totalLessons: 5,
        completedLessons: 5,
        icon: "User"
      },
      {
        id: "mod-2",
        title: "Komunikasi Efektif dan Empatik",
        description: "Active listening dan discovery needs analysis. Menangani keberatan dengan empati terhadap Ketua RT/RW.",
        duration: "50 menit",
        progress: 100,
        totalLessons: 6,
        completedLessons: 6,
        icon: "MessageCircle"
      },
      {
        id: "mod-3",
        title: "Hypno-Selling & Komunikasi Sugestif",
        description: "Teknik Pacing and Leading, Trance-Persuasive Language, dan Circle of Excellence untuk mengatasi fear of rejection.",
        duration: "60 menit",
        progress: 50,
        totalLessons: 8,
        completedLessons: 4,
        icon: "Sparkles"
      },
      {
        id: "mod-4",
        title: "Teknik Negosiasi Resolusi",
        description: "8 teknik perundingan taktis dan penyusunan BATNA (Best Alternative to Negotiated Agreement).",
        duration: "45 menit",
        progress: 0,
        totalLessons: 5,
        completedLessons: 0,
        icon: "Handshake"
      },
      {
        id: "mod-5",
        title: "Territory Management",
        description: "Workflow streamlining, CRM, dan optimasi rute GPS. Menghindari sindrom pergerakan buta.",
        duration: "40 menit",
        progress: 0,
        totalLessons: 4,
        completedLessons: 0,
        icon: "Map"
      },
      {
        id: "mod-6",
        title: "Literasi Keuangan untuk Penjualan",
        description: "Memahami Laba vs Arus Kas, Income Statement, Break-even Point, dan ROI dalam konteks UMKM.",
        duration: "55 menit",
        progress: 0,
        totalLessons: 6,
        completedLessons: 0,
        icon: "TrendingUp"
      },
      {
        id: "mod-7",
        title: "Account Management Berkelanjutan",
        description: "Post-sale relationship management dan kalender pemeliharaan relasi dengan agen.",
        duration: "35 menit",
        progress: 0,
        totalLessons: 4,
        completedLessons: 0,
        icon: "Users"
      },
      {
        id: "mod-8",
        title: "Strategi Prospecting Komunitas",
        description: "Social selling lokal, infiltrasi grup WhatsApp RT/RW, dan teknik visibility di titik nadi ekonomi.",
        duration: "40 menit",
        progress: 0,
        totalLessons: 5,
        completedLessons: 0,
        icon: "Search"
      },
      {
        id: "mod-9",
        title: "Arsitektur Produk Finatra",
        description: "Mekanisme pembiayaan, SOP administrasi, dan troubleshooting dokumen legalitas.",
        duration: "50 menit",
        progress: 0,
        totalLessons: 6,
        completedLessons: 0,
        icon: "Building"
      },
      {
        id: "mod-10",
        title: "Etika & Good Corporate Governance",
        description: "Budaya Astra, regulasi OJK, dan navigasi situasi 'wilayah abu-abu' di lapangan.",
        duration: "45 menit",
        progress: 0,
        totalLessons: 5,
        completedLessons: 0,
        icon: "Shield"
      }
    ]
  },
  {
    id: "territory-mapping",
    title: "Territory Mapping & Analisis Wilayah",
    description: "Strategi pemetaan teritorial dan identifikasi potensi kelurahan",
    category: "Strategi",
    thumbnail: "https://picsum.photos/seed/territory/400/300",
    progress: 65,
    totalModules: 3,
    completedModules: 2,
    modules: [
      {
        id: "tm-1",
        title: "Pilar 1: Historical Contract Density",
        description: "Ekstraksi data kontrak historis dan penerapan prinsip Pareto (80:20) untuk zona prioritas.",
        duration: "30 menit",
        progress: 100,
        totalLessons: 4,
        completedLessons: 4,
        icon: "BarChart"
      },
      {
        id: "tm-2",
        title: "Pilar 2: Social Spider-Webbing",
        description: "Penetrasi ekosistem sosial melalui referensi jaringan dan trust transfer antar ketua RT/RW.",
        duration: "35 menit",
        progress: 100,
        totalLessons: 4,
        completedLessons: 4,
        icon: "Share2"
      },
      {
        id: "tm-3",
        title: "Pilar 3: Analisis Current Rate",
        description: "Matriks keputusan spasial berdasarkan rasio likuiditas, NPF, dan ROE koperasi kelurahan.",
        duration: "40 menit",
        progress: 20,
        totalLessons: 5,
        completedLessons: 1,
        icon: "PieChartIcon"
      }
    ]
  },
  {
    id: "ekosistem-umkm",
    title: "Ekosistem Pembiayaan Mikro UMKM",
    description: "Kontribusi UMKM 61.97% PDB dan peran Finatra dalam pemberdayaan ekonomi",
    category: "Fundamental",
    thumbnail: "https://picsum.photos/seed/umkm/400/300",
    progress: 0,
    totalModules: 2,
    completedModules: 0,
    modules: [
      {
        id: "umkm-1",
        title: "Latar Belakang Makroekonomi",
        description: "UMKM sebagai tulang punggung ekonomi nasional dan amanat UUD 1945 Pasal 33.",
        duration: "25 menit",
        progress: 0,
        totalLessons: 3,
        completedLessons: 0,
        icon: "Building2"
      },
      {
        id: "umkm-2",
        title: "Model Bisnis B2B2C Finatra",
        description: "Perbedaan PAO dengan agen konvensional dan mitigasi risiko asimetri informasi.",
        duration: "30 menit",
        progress: 0,
        totalLessons: 4,
        completedLessons: 0,
        icon: "GitFork"
      }
    ]
  }
];

export const quizData = {
  id: "mod-3-quiz",
  title: "Hypno-Selling & Komunikasi Sugestif",
  module: "Modul 3 - Fundamental PAO Finatra",
  question: {
    id: 3,
    total: 8,
    title: "Conflict Management",
    text: "Anda sebagai PAO sedang berhadapan dengan Ketua RW yang menolak mentah-mentah tawaran menjadi agen dengan alasan 'benturan kepentingan'. Apa strategi BATNA (Best Alternative to Negotiated Agreement) yang paling tepat?",
    scenario: "Ketua RW 01 merasa posisinya sebagai pejabat struktural tidak cocok dengan status 'agen penjualan'. Namun, beliau menunjukkan empati terhadap warganya yang membutuhkan modal usaha.",
    image: "https://picsum.photos/seed/rw-negotiation/800/500"
  },
  options: [
    {
      id: "A",
      title: "Intervensi Langsung",
      desc: "Tekan Ketua RW dengan data keberhasilan agen lain dan insist bahwa komisi menguntungkan."
    },
    {
      id: "B",
      title: "Alternatif Endorsement",
      desc: "Usulkan Ketua RW hanya memberikan dukungan politis untuk Anda merekrut kader Posyandu/PKK sebagai agen aktif di wilayahnya."
    },
    {
      id: "C",
      title: "Delegasi ke Atasan",
      desc: "Minta Branch Manager datang untuk memberikan legitimasi korporat lebih tinggi."
    },
    {
      id: "D",
      title: "Penangguhan Sementara",
      desc: "Tinggalkan wilayah RW 01 dan fokus ke RW lain, dengan harapan akan ada perubahan pikiran."
    }
  ],
  correctAnswer: "B"
};

export const userStats = {
  name: "Ahmad Rizki",
  role: "Partnership Account Officer",
  region: "Cabang Jakarta Timur",
  memberSince: "Januari 2024",
  membership: "Premium Member",
  stats: {
    projects: 47,
    rating: 4.8,
    success: 82,
    activeAgents: 12,
    totalLeads: 156
  }
};
