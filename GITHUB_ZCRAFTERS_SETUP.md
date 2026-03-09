# 🚀 SETUP GITHUB - ZCrafters

## LANGKAH 1: Buat Repository di GitHub

Buka browser dan kunjungi:
```
https://github.com/new
```

Isi form berikut:

| Field | Isi |
|-------|-----|
| **Repository name** | `Astra-E-Learning` |
| **Description** | `Platform pembelajaran PAO Finatra - PT Astra International` |
| **Visibility** | 🔒 Private (recommended) |
| ✅ Initialize with README | **JANGAN** dicentang (sudah ada README) |
| ✅ Add .gitignore | **JANGAN** dicentang (sudah ada .gitignore) |
| ✅ Choose a license | **JANGAN** dicentang (sudah ada LICENSE) |

Klik tombol **"Create repository"** (hijau)

---

## LANGKAH 2: Push Kode ke GitHub

Setelah repo dibuat, jalankan command ini:

```bash
cd "D:\portofolio\web\ayen hacker\pao"

git remote add origin https://github.com/ZCrafters/Astra-E-Learning.git
git branch -M main
git push -u origin main
```

---

## LANGKAH 3: Tambah Secrets (Copy-Paste!)

Buka link ini:
```
https://github.com/ZCrafters/Astra-E-Learning/settings/secrets/actions
```

Klik tombol **"New repository secret"** dan tambahkan 2 secrets:

### 🔐 Secret 1:
```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://oqfprwrwugrortwlnkye.supabase.co
```

### 🔐 Secret 2:
```
Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: sb_publishable_emnCxMdoT4r_dpOWnGQ6-A_05eyvD0h
```

---

## LANGKAH 4: Verifikasi

Cek hasilnya di:
- **Repository**: https://github.com/ZCrafters/Astra-E-Learning
- **Actions**: https://github.com/ZCrafters/Astra-E-Learning/actions

---

## 🎯 Selesai!

Setiap kali Anda push kode ke GitHub, workflow akan:
1. ✅ Build aplikasi Next.js
2. ✅ Check error dengan ESLint
3. ✅ Siap untuk deploy

---

## 🐛 Troubleshooting

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/ZCrafters/Astra-E-Learning.git
```

### Error: "failed to push some refs"
```bash
git pull origin main --rebase
git push origin main
```

### Error: "repository not found"
Pastikan repo sudah dibuat di GitHub (Langkah 1)
