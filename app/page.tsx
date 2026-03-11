'use client';

import Link from 'next/link';
import { Star, ChevronRight, LogOut } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { useAuth } from '@/lib/auth-context';
import { useMissions } from '@/lib/missions-context';
import { missionsData } from '@/lib/missionData';
import { useMemo } from 'react';

export default function Dashboard() {
  const { profile, logout, isLoading } = useAuth();
  const { completedMissions, weeklyCompleted, weeklyTotal, totalXP, level } = useMissions();

  // Pick today's mission: first incomplete mission, or last if all done
  const todayMission = useMemo(() => {
    const next = missionsData.find((m) => !completedMissions.includes(m.id));
    return next || missionsData[missionsData.length - 1];
  }, [completedMissions]);

  const isTodayDone = completedMissions.includes(todayMission.id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <header className="flex items-center bg-white px-4 py-4 sticky top-0 z-10 border-b border-slate-100">
        <div className="flex-1">
          <p className="text-slate-500 text-sm">Selamat datang,</p>
          <h1 className="text-slate-900 text-lg font-bold leading-tight">{profile?.name || 'PAO User'}</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">{level}</span>
          <button
            onClick={logout}
            className="flex items-center justify-center p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-24 space-y-4">
        {/* Tugas Hari Ini */}
        <section className="px-4 pt-4">
          <h2 className="text-lg font-bold text-slate-900 mb-3">📋 Tugas Hari Ini</h2>
          <Link
            href={`/missions/${todayMission.id}`}
            className="block bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-5 text-white shadow-lg"
          >
            <h3 className="text-lg font-bold mb-2">{todayMission.title}</h3>
            <div className="flex items-center gap-3 text-blue-100 text-base mb-4">
              <span>⏱ {todayMission.duration}</span>
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                {todayMission.xp} XP
              </span>
            </div>
            {isTodayDone ? (
              <span className="inline-block bg-green-500 text-white font-bold py-3 px-6 rounded-xl text-base">
                ✅ Sudah Selesai
              </span>
            ) : (
              <span className="inline-block bg-white text-blue-600 font-bold py-3 px-6 rounded-xl text-base">
                Kerjakan Sekarang →
              </span>
            )}
          </Link>
        </section>

        {/* Progress Mingguan */}
        <section className="px-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
            <h3 className="text-lg font-bold text-slate-900">📊 Progress Minggu Ini</h3>
            <p className="text-base text-slate-700">
              Sudah <span className="font-bold text-blue-600">{weeklyCompleted}</span> dari{' '}
              <span className="font-bold">{weeklyTotal}</span> tugas
            </p>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all"
                style={{ width: `${(weeklyCompleted / weeklyTotal) * 100}%` }}
              ></div>
            </div>
            <p className="text-base text-slate-600">
              Total Poin: <span className="font-bold text-blue-600">{totalXP} XP</span>
            </p>
          </div>
        </section>

        {/* Tombol Lihat Semua Tugas */}
        <section className="px-4">
          <Link
            href="/missions"
            className="flex items-center justify-between bg-blue-50 hover:bg-blue-100 rounded-2xl p-4 min-h-[56px] transition-colors active:scale-[0.98]"
          >
            <span className="text-base font-bold text-blue-700">Lihat Semua Tugas</span>
            <ChevronRight className="w-6 h-6 text-blue-600" />
          </Link>
        </section>
      </main>

      <BottomNav />
    </>
  );
}
