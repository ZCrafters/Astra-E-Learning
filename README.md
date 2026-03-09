# Astra E-Learning

Platform pembelajaran digital untuk Partnership Account Officer (PAO) Finatra - bagian dari PT Astra International Tbk.

![Astra E-Learning](./screenshots/dashboard.png)

## 📋 Deskripsi

Astra E-Learning adalah aplikasi mobile-first e-learning yang dirancang khusus untuk melatih Partnership Account Officer (PAO) dalam strategi pemetaan wilayah, rekrutmen agen RT/RW, dan teknik penjualan produk Finatra.

## ✨ Fitur Utama

### 🔐 Autentikasi
- Login dengan OTP via SMS
- Remember device (auto-login untuk HP yang sudah terdaftar)
- Profile management

### 📚 Kurikulum Lengkap
- **10 Modul Fundamental PAO**
  1. Personal Branding Profesional Keuangan
  2. Komunikasi Efektif dan Empatik
  3. Hypno-Selling & Komunikasi Sugestif
  4. Teknik Negosiasi Resolusi (BATNA)
  5. Territory Management
  6. Literasi Keuangan untuk Penjualan
  7. Account Management Berkelanjutan
  8. Strategi Prospecting Komunitas
  9. Arsitektur Produk Finatra
  10. Etika & Good Corporate Governance

- **Territory Mapping**
  - Historical Contract Density
  - Social Spider-Webbing
  - Analisis Current Rate

### 📊 Progress Tracking
- Real-time progress tracking per modul
- Synchronization dengan Supabase
- Resume learning dari device manapun

### 🎯 Quiz Interaktif
- Skenario-based learning
- Feedback instan
- Strategi BATNA simulation

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) + React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1
- **Database**: [Supabase](https://supabase.com/)
- **Auth**: Supabase Auth (Phone OTP)
- **Icons**: Lucide React
- **Deployment**: Vercel/Netlify ready

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm atau yarn
- Akun Supabase (untuk production)

### Installation

1. **Clone repository**
```bash
git clone https://github.com/username/astra-elearning.git
cd astra-elearning
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. **Database Setup**
- Buka Supabase SQL Editor
- Copy dan paste isi file `supabase/schema.sql`
- Jalankan query

5. **Setup SMS Provider**
- Buka Supabase Dashboard → Authentication → Providers → Phone
- Enable Phone provider
- Setup Twilio/Vonage untuk SMS OTP

6. **Run development server**
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## 📱 Usage

### Mode Development (Tanpa SMS)
1. Buka halaman login
2. Masukkan nomor HP apa saja (contoh: 81234567890)
3. Gunakan OTP: `123456`
4. Lengkapi profil
5. Mulai belajar!

### Mode Production (Dengan SMS)
1. Buka halaman login
2. Masukkan nomor HP aktif
3. Tunggu OTP via SMS
4. Verifikasi dan mulai belajar

## 📂 Project Structure

```
astra-elearning/
├── app/                    # Next.js App Router
│   ├── courses/           # Halaman kursus
│   ├── learn/             # Halaman quiz/interaktif
│   ├── login/             # Halaman login
│   ├── profile/           # Halaman profil
│   └── page.tsx           # Dashboard
├── components/            # React Components
│   └── BottomNav.tsx     # Navigation bar
├── lib/                   # Utilities & Hooks
│   ├── supabase.ts       # Supabase client
│   ├── auth-context.tsx  # Auth provider
│   └── courseData.ts     # Course content
├── supabase/             # Database schema
│   └── schema.sql        # SQL migrations
├── middleware.ts         # Route protection
└── README.md
```

## 🗄️ Database Schema

### Tables
- `users` - Data user (phone, name, region, device_id)
- `user_progress` - Progress belajar per modul
- `user_devices` - Device registration untuk auto-login

### RLS Policies
Semua tabel menggunakan Row Level Security untuk proteksi data.

## 🎨 Customization

### Menambah Kursus Baru
Edit file `lib/courseData.ts`:

```typescript
export const coursesData: Course[] = [
  {
    id: "new-course",
    title: "Nama Kursus Baru",
    // ...
  }
];
```

### Menambah Modul Baru
Tambahkan ke dalam array `modules`:

```typescript
{
  id: "mod-11",
  title: "Modul Baru",
  description: "Deskripsi modul",
  duration: "45 menit",
  progress: 0,
  totalLessons: 5,
  completedLessons: 0,
  icon: "BookOpen"
}
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push ke GitHub
2. Import project di Vercel
3. Tambahkan environment variables
4. Deploy!

### Environment Variables
Pastikan semua env vars di Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 📝 License

Proprietary - PT Astra International Tbk

## 👥 Team

- **Product Owner**: Finatra Team
- **Development**: [Your Name]
- **Content**: PAO Training Department

## 🤝 Support

Untuk support dan pertanyaan, hubungi:
- Email: support@finatra.astra.co.id
- Internal: Extension xxxx

---

**PT Federal International Finance (FIFGROUP)**  
*Part of Astra International*  
🏢 Jakarta, Indonesia
