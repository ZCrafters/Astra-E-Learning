# Setup GitHub Secrets - Astra E-Learning

Panduan lengkap untuk menambahkan secrets di GitHub.

---

## 🎯 Secrets yang Wajib Ditambahkan

### 1. **NEXT_PUBLIC_SUPABASE_URL**
```
https://oqfprwrwugrortwlnkye.supabase.co
```
**Cara dapatkan:**
1. Buka https://app.supabase.com/project/oqfprwrwugrortwlnkye/settings/api
2. Copy "Project URL"

### 2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
```
sb_publishable_emnCxMdoT4r_dpOWnGQ6-A_05eyvD0h
```
**Cara dapatkan:**
1. Buka https://app.supabase.com/project/oqfprwrwugrortwlnkye/settings/api
2. Copy "anon public" key

---

## 🚀 Optional Secrets (untuk Deployment)

### Jika deploy ke Vercel:

#### **VERCEL_TOKEN**
**Cara dapatkan:**
1. Buka https://vercel.com/account/tokens
2. Klik "Create Token"
3. Beri nama: "Astra E-Learning CI"
4. Copy token

#### **VERCEL_ORG_ID**
**Cara dapatkan:**
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Copy "orgId" dari file .vercel/project.json
```

#### **VERCEL_PROJECT_ID**
**Cara dapatkan:**
```bash
# Setelah vercel link, buka file
 cat .vercel/project.json
 
# Copy "projectId"
```

---

## 📝 Cara Menambahkan Secrets

### Langkah 1: Buka Settings
1. Buka repository GitHub Anda
2. Klik tab **Settings** (di atas)
3. Di sidebar kiri, klik **Secrets and variables** → **Actions**

### Langkah 2: Tambah Secrets
1. Klik tombol **New repository secret** (warna hijau)
2. Isi:
   - **Name**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Secret**: `https://oqfprwrwugrortwlnkye.supabase.co`
3. Klik **Add secret**
4. Ulangi untuk `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Langkah 3: Verifikasi
Secrets yang sudah ditambahkan akan muncul di daftar dengan nilai tersembunyi (********).

---

## 🔧 Environment Variables (Optional)

Selain Secrets, bisa juga tambahkan Variables:

1. Di halaman yang sama, klik tab **Variables**
2. Klik **New repository variable**
3. Tambahkan:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_APP_URL` | `https://your-domain.vercel.app` |

---

## ✅ Checklist

Setelah setup, pastikan semua secrets sudah ditambahkan:

- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `VERCEL_TOKEN` (jika deploy ke Vercel)
- [ ] `VERCEL_ORG_ID` (jika deploy ke Vercel)
- [ ] `VERCEL_PROJECT_ID` (jika deploy ke Vercel)

---

## 🧪 Test Workflow

Setelah semua secrets ditambahkan:

1. **Commit dan push** file `.github/workflows/deploy.yml`
2. Buka tab **Actions** di GitHub
3. Lihat workflow berjalan
4. Jika berhasil, akan muncul ✅ hijau

---

## 🐛 Troubleshooting

### Error: "Secret not found"
**Solusi:** Pastikan nama secret sama persis (case-sensitive):
- ✅ `NEXT_PUBLIC_SUPABASE_URL`
- ❌ `next_public_supabase_url`

### Error: "Permission denied"
**Solusi:** Pastikan Anda punya akses admin ke repository.

### Error: "Build failed"
**Solusi:** Check logs di GitHub Actions → Build → Lihat error detail.

---

## 📚 Dokumentasi Resmi

- GitHub Secrets: https://docs.github.com/en/actions/security-guides/encrypted-secrets
- Vercel Deployment: https://vercel.com/guides/how-can-i-use-github-actions-with-vercel
