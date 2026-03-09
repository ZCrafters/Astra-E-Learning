import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Settings, BadgeCheck, Edit2, Share, User, Bell, Lock, LogOut, ChevronRight, ArrowLeft, MapPin, Award, TrendingUp } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { userStats } from '@/lib/courseData';

export const metadata: Metadata = {
  title: 'Profil | PAO Finatra',
  description: 'Kelola akun dan pengaturan Anda',
};

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-slate-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center justify-center p-2 hover:bg-slate-50 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <h1 className="text-lg font-bold text-slate-900">Profil</h1>
          <button className="flex items-center justify-center p-2 hover:bg-slate-50 rounded-full transition-colors">
            <Settings className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        {/* Profile Section */}
        <section className="p-4 text-center bg-white">
          <div className="relative inline-block mb-4">
            <div className="w-28 h-28 rounded-full border-4 border-blue-600 p-1 bg-white">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-200">
                <Image 
                  src="https://picsum.photos/seed/pao-profile/400/400"
                  alt={userStats.name}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>
            </div>
            <div className="absolute bottom-1 right-1 bg-blue-600 text-white p-1 rounded-full border-2 border-white">
              <BadgeCheck className="w-4 h-4" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900 mb-1">{userStats.name}</h2>
          <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold uppercase rounded-full mb-2">{userStats.membership}</span>
          <p className="text-slate-500 text-sm flex items-center justify-center gap-1">
            <MapPin className="w-4 h-4" />
            {userStats.region}
          </p>
          <p className="text-slate-400 text-xs mt-1">Anggota sejak {userStats.memberSince}</p>
        </section>

        {/* Stats Grid */}
        <section className="px-4 -mt-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
            <div className="grid grid-cols-4 gap-2 divide-x divide-slate-100">
              <div className="text-center">
                <p className="text-xl font-bold text-blue-600">{userStats.stats.activeAgents}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Agen</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-blue-600">{userStats.stats.totalLeads}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Leads</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-blue-600">{userStats.stats.rating}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Rating</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-blue-600">{userStats.stats.success}%</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Sukses</p>
              </div>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <section className="px-4 mt-4">
          <div className="flex gap-3">
            <button className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              <Edit2 className="w-4 h-4" />
              Edit Profil
            </button>
            <button className="flex-1 bg-white border border-slate-200 text-slate-900 font-bold py-3 rounded-xl shadow-sm hover:bg-slate-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              <Share className="w-4 h-4" />
              Bagikan
            </button>
          </div>
        </section>

        {/* Achievement */}
        <section className="px-4 mt-6">
          <h3 className="text-base font-bold mb-3 text-slate-900">Pencapaian</h3>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                <Award className="w-7 h-7 text-amber-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900">Star Recruiter</h4>
                <p className="text-sm text-slate-500">Berhasil merekrut 10+ agen aktif</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span className="text-xs font-bold text-slate-500">85%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Settings */}
        <section className="px-4 mt-6">
          <h3 className="text-base font-bold mb-3 text-slate-900">Pengaturan Akun</h3>
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-100">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-slate-900">Informasi Pribadi</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-100">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-slate-900">Notifikasi</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-100">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-slate-900">Keamanan</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-slate-900">Target & Performa</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </section>

        {/* Logout */}
        <section className="px-4 mt-6">
          <button className="w-full bg-red-50 border border-red-100 text-red-600 font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-red-100 active:scale-[0.98] transition-colors">
            <LogOut className="w-5 h-5" />
            Keluar
          </button>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
