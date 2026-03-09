'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Phone, ArrowRight, Loader2, CheckCircle, MapPin, User, Info } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export default function LoginPage() {
  const router = useRouter();
  const { loginWithOTP, verifyOTP, isLoading: authLoading, deviceRegistered, isAuthenticated } = useAuth();
  
  const [step, setStep] = useState<'phone' | 'otp' | 'profile'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [region, setRegion] = useState('Jakarta Timur');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [isDevMode] = useState(
    () => !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    if (!authLoading && (isAuthenticated || deviceRegistered)) {
      router.push('/');
    }
  }, [authLoading, isAuthenticated, deviceRegistered, router]);

  const startCountdown = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const cleanPhone = phone.replace(/\s/g, '');
    if (!cleanPhone.match(/^[0-9]{10,13}$/)) {
      setError('Nomor HP tidak valid. Masukkan 10-13 digit angka.');
      setIsLoading(false);
      return;
    }

    const { error } = await loginWithOTP(cleanPhone);
    
    if (error) {
      setError('Gagal mengirim OTP. Silakan coba lagi.');
      setIsLoading(false);
      return;
    }

    setStep('otp');
    startCountdown();
    setIsLoading(false);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (otp.length !== 6) {
      setError('Masukkan 6 digit kode OTP');
      setIsLoading(false);
      return;
    }

    const cleanPhone = phone.replace(/\s/g, '');
    const { error } = await verifyOTP(cleanPhone, otp, '', region);

    if (error) {
      setError('Kode OTP salah atau sudah expired.');
      setIsLoading(false);
      return;
    }

    setStep('profile');
    setIsLoading(false);
  };

  const handleCompleteProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name.trim()) {
      setError('Nama tidak boleh kosong');
      return;
    }

    setIsLoading(true);

    try {
      // Update profile dengan nama
      const cleanPhone = phone.replace(/\s/g, '');
      const { error: updateError } = await verifyOTP(cleanPhone, otp, name.trim(), region);
      
      if (updateError) {
        // Jika error karena user sudah ada, lanjutkan saja
        console.log('Profile update:', updateError.message);
      }

      // Tunggu sebentar untuk memastikan state tersimpan
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Navigasi ke home
      window.location.href = '/';
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;
    setError('');
    const cleanPhone = phone.replace(/\s/g, '');
    const { error } = await loginWithOTP(cleanPhone);
    if (error) {
      setError('Gagal mengirim ulang OTP.');
      return;
    }
    startCountdown();
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-blue-600 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
          <p className="text-white font-medium">Memuat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-600 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mb-6 backdrop-blur-sm">
          <Phone className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">PAO Finatra</h1>
        <p className="text-blue-100 text-center">Platform Pembelajaran Partnership Account Officer</p>
      </div>

      <div className="bg-white rounded-t-3xl px-6 py-8">
        {isDevMode && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-800 font-medium">Mode Pengembangan</p>
              <p className="text-xs text-amber-700">Supabase belum dikonfigurasi. Gunakan OTP: <strong>123456</strong></p>
            </div>
          </div>
        )}

        {step === 'phone' && (
          <>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Masuk dengan HP</h2>
            <p className="text-slate-500 mb-6">Masukkan nomor HP Anda untuk menerima kode OTP</p>
            
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Nomor HP</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">+62</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="81234567890"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    maxLength={13}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-2">Contoh: 81234567890</p>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || phone.length < 10}
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/25 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Kirim OTP
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </>
        )}

        {step === 'otp' && (
          <>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Verifikasi OTP</h2>
            <p className="text-slate-500 mb-6">
              Masukkan 6 digit kode yang dikirim ke <span className="font-medium text-slate-900">+62{phone}</span>
            </p>
            
            {isDevMode && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-sm text-green-800 text-center font-medium">OTP untuk testing: 123456</p>
              </div>
            )}
            
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Kode OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="123456"
                  className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  maxLength={6}
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || otp.length !== 6}
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/25 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Verifikasi
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <div className="text-center">
                {countdown > 0 ? (
                  <p className="text-sm text-slate-400">Kirim ulang dalam {countdown} detik</p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    className="text-sm text-blue-600 font-medium hover:underline"
                  >
                    Kirim ulang OTP
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => setStep('phone')}
                className="w-full text-slate-500 font-medium py-2 hover:text-slate-700"
              >
                Ganti nomor HP
              </button>
            </form>
          </>
        )}

        {step === 'profile' && (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Verifikasi Berhasil!</h2>
                <p className="text-slate-500">Lengkapi profil Anda</p>
              </div>
            </div>
            
            <form onSubmit={handleCompleteProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama lengkap"
                  className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Wilayah/Cabang
                </label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Jakarta Timur">Jakarta Timur</option>
                  <option value="Jakarta Barat">Jakarta Barat</option>
                  <option value="Jakarta Selatan">Jakarta Selatan</option>
                  <option value="Jakarta Utara">Jakarta Utara</option>
                  <option value="Jakarta Pusat">Jakarta Pusat</option>
                  <option value="Bekasi">Bekasi</option>
                  <option value="Depok">Depok</option>
                  <option value="Tangerang">Tangerang</option>
                  <option value="Bogor">Bogor</option>
                </select>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !name.trim()}
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/25 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    Mulai Belajar
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
