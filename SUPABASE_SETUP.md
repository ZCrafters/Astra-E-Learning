# Setup Supabase untuk PAO Finatra E-Learning

## 1. Buat Project Supabase

1. Buka https://supabase.com dan login
2. Klik "New Project"
3. Pilih organization dan beri nama project: `pao-finatra`
4. Pilih region terdekat (Singapore untuk Indonesia)
5. Klik "Create new project"

## 2. Setup Database

1. Buka SQL Editor di dashboard Supabase
2. Copy dan paste isi file `supabase/schema.sql`
3. Klik "Run" untuk eksekusi

## 3. Enable Phone Auth (OTP)

1. Buka Authentication → Providers
2. Scroll ke bawah ke "Phone"
3. Enable Phone provider
4. Pilih provider SMS:
   - **Twilio** (Recommended): Daftar di twilio.com, dapatkan Account SID, Auth Token, dan phone number
   - **MessageBird**: Alternatif untuk Indonesia
   - **Vonage**: Alternatif lain

### Setup Twilio:
```
Twilio Account SID: your_account_sid
Twilio Auth Token: your_auth_token
Twilio Phone Number: your_twilio_number
```

5. Masukkan credentials Twilio di Supabase
6. Save settings

## 4. Setup Environment Variables

Copy `.env.local.example` menjadi `.env.local`:

```bash
cp .env.local.example .env.local
```

Isi dengan data dari Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Data ini ada di: Project Settings → API

## 5. Alur Autentikasi

```
1. User masukkan nomor HP → Kirim OTP
2. User masukkan kode OTP → Verifikasi
3. Jika verifikasi berhasil:
   - Buat user di database
   - Simpan device_id di localStorage
   - Register device di user_devices table
4. Next visit:
   - Check device_id di localStorage
   - Auto-login jika device terdaftar
```

## 6. Testing

1. Jalankan aplikasi: `npm run dev`
2. Buka http://localhost:3000/login
3. Masukkan nomor HP (format: 81234567890)
4. Cek OTP di console (development mode) atau SMS (production)
5. Verifikasi dan lengkapi profil

## Troubleshooting

### OTP tidak terkirim:
- Pastikan Twilio sudah verified
- Check Supabase logs di Authentication → Logs
- Pastikan nomor HP dalam format internasional (+62)

### Device tidak terdeteksi:
- Check localStorage untuk key `pao_device_id`
- Pastikan tidak di private/incognito mode
- Check user_devices table di Supabase

### Progress tidak tersimpan:
- Pastikan user sudah login
- Check Network tab di DevTools
- Check Supabase RLS policies
