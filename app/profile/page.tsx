'use client';

import Link from 'next/link';
import { ArrowLeft, Award, Star, CheckCircle2, LogOut } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { useAuth } from '@/lib/auth-context';
import { useMissions } from '@/lib/missions-context';

const levels = [
  { name: 'Pemula', minXP: 0, maxXP: 200, description: 'Baru mulai' },
  { name: 'Petarung', minXP: 201, maxXP: 500, description: 'Sudah aktif' },
  { name: 'Juara', minXP: 501, maxXP: Infinity, description: 'Senior' },
];

export default function ProfilePage() {
  const { profile, logout } = useAuth();
  const { totalXP, level, completedCount } = useMissions();

  const currentLevelInfo = levels.find((l) => l.name === level) || levels[0];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-slate-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center justify-center p-2 hover:bg-slate-50 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <h1 className="text-lg font-bold text-slate-900">Profil</h1>
          <div className="w-9" />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-24 space-y-4">
        {/* Nama */}
        <section className="px-4 pt-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 text-center space-y-2">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-3xl font-bold text-blue-600">
                {(profile?.name || 'P').charAt(0).toUpperCase()}
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900">{profile?.name || 'PAO User'}</h2>
            <p className="text-base text-slate-500">{profile?.region || 'Jakarta'}</p>
          </div>
        </section>

        {/* Total Poin */}
        <section className="px-4">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-5 text-white text-center space-y-1">
            <Star className="w-8 h-8 mx-auto fill-amber-300 text-amber-300" />
            <p className="text-3xl font-bold">{totalXP} XP</p>
            <p className="text-blue-100 text-base">Total Poin</p>
          </div>
        </section>

        {/* Tugas Selesai */}
        <section className="px-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4">
            <CheckCircle2 className="w-10 h-10 text-green-600 shrink-0" />
            <div>
              <p className="text-lg font-bold text-slate-900">{completedCount} tugas</p>
              <p className="text-base text-slate-500">Sudah selesai</p>
            </div>
          </div>
        </section>

        {/* Level */}
        <section className="px-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-500" />
              Level Kamu
            </h3>
            <div className="space-y-3">
              {levels.map((l) => {
                const isActive = l.name === level;
                return (
                  <div
                    key={l.name}
                    className={`flex items-center justify-between p-3 rounded-xl ${
                      isActive
                        ? 'bg-blue-50 border-2 border-blue-400'
                        : 'bg-slate-50 border border-slate-200'
                    }`}
                  >
                    <div>
                      <p className={`text-base font-bold ${isActive ? 'text-blue-700' : 'text-slate-700'}`}>
                        {l.name}
                      </p>
                      <p className="text-sm text-slate-500">{l.description}</p>
                    </div>
                    <span className="text-sm text-slate-400 font-bold">
                      {l.maxXP === Infinity ? `${l.minXP}+` : `${l.minXP}-${l.maxXP}`} XP
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Logout */}
        <section className="px-4">
          <button
            onClick={logout}
            className="w-full bg-red-50 border border-red-100 text-red-600 font-bold py-3 rounded-xl min-h-[56px] flex items-center justify-center gap-2 hover:bg-red-100 active:scale-[0.98] transition-colors text-base"
          >
            <LogOut className="w-5 h-5" />
            Keluar
          </button>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
