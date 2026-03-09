# 🔥 GITHUB SETUP - COPY PASTE CHEATSHEET

## LANGKAH 1: Push ke GitHub

```bash
# 1. Ganti USERNAME dengan username GitHub Anda
git remote add origin https://github.com/USERNAME/Astra-E-Learning.git

# 2. Push ke GitHub
git push -u origin main
```

---

## LANGKAH 2: Tambah Secrets (Cukup Copas!)

Buka: `https://github.com/USERNAME/Astra-E-Learning/settings/secrets/actions`

Klik **"New repository secret"** 2x, lalu isi:

### Secret 1:
```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://oqfprwrwugrortwlnkye.supabase.co
```

### Secret 2:
```
Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: sb_publishable_emnCxMdoT4r_dpOWnGQ6-A_05eyvD0h
```

---

## LANGKAH 3: Jalankan Workflow

1. Buka: `https://github.com/USERNAME/Astra-E-Learning/actions`
2. Workflow akan jalan otomatis setiap push
3. Jika ada error, klik workflow untuk lihat detail

---

## ⚡ QUICK FIX - Jika Error

### Error "remote already exists":
```bash
git remote remove origin
git remote add origin https://github.com/USERNAME/Astra-E-Learning.git
```

### Error "failed to push":
```bash
git push -u origin main --force
```

### Error "repository not found":
Pastikan repository sudah dibuat di GitHub dulu!

---

## ✅ VERIFIKASI

Cek status terakhir:
```bash
git log --oneline -3
git status
```

Output yang benar:
```
ea819ce Add GitHub Actions CI/CD workflow
f3cb5f6 Initial commit: Astra E-Learning Platform
```

---

## 🎯 SELESAI!

Setelah ini, setiap kali Anda push ke GitHub:
1. ✅ Code akan di-build otomatis
2. ✅ Linter akan check error
3. ✅ Siap deploy ke Vercel/Netlify
