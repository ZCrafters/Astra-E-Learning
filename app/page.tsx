'use client';

import Link from 'next/link';
import { Bell, PlayCircle, BookOpen, Map, TrendingUp, Award, Clock, Star, LogOut, ClipboardList } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { useAuth } from '@/lib/auth-context';
import { useEffect, useMemo, useState } from 'react';

export default function Dashboard() {
  const { profile, progress, logout, isLoading, isAuthenticated } = useAuth();
  const [completedTugasCount, setCompletedTugasCount] = useState(0);

  const TOTAL_TUGAS = 10;
  
  // Calculate progress from database
  const userProgress = useMemo(() => {
    const courseProgress: Record<string, number> = {};
    
    coursesData.forEach(course => {
      const moduleProgresses = course.modules.map(module => {
        const saved = progress.find(p => p.module_id === module.id);
        return saved ? saved.progress : module.progress;
      });
      
      const avgProgress = moduleProgresses.reduce((a, b) => a + b, 0) / moduleProgresses.length;
      courseProgress[course.id] = Math.round(avgProgress);
    });
    
    return courseProgress;
  }, [progress]);

  // Pick today's mission: first incomplete mission, or last if all done
  const todayMission = useMemo(() => {
    const next = missionsData.find((m) => !completedMissions.includes(m.id));
    return next || missionsData[missionsData.length - 1];
  }, [completedMissions]);

  // Sync progress to database when component mounts
  useEffect(() => {
    // Load completed tugas count from localStorage
    const saved = localStorage.getItem('pao_completed_tugas');
    if (saved) {
      const ids: number[] = JSON.parse(saved);
      setCompletedTugasCount(ids.length);
    }
  }, []);

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
          </div>
        </section>

        {/* Tugas Progress */}
        <section className="px-4 pt-4">
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h2 className="text-lg font-bold mb-0.5">Tugas Lapangan</h2>
                  <p className="text-emerald-100 text-sm">Sudah {completedTugasCount} dari {TOTAL_TUGAS} tugas selesai</p>
                </div>
                <span className="bg-white/20 px-2.5 py-1 rounded-full text-sm font-bold">
                  {completedTugasCount}/{TOTAL_TUGAS}
                </span>
              </div>
              <div className="h-2.5 w-full bg-white/20 rounded-full overflow-hidden mb-4">
                <div className="h-full bg-white rounded-full transition-all" style={{ width: `${(completedTugasCount / TOTAL_TUGAS) * 100}%` }}></div>
              </div>
              <Link href="/missions" className="block w-full bg-white text-emerald-600 font-bold py-3 rounded-xl text-center shadow-lg hover:bg-slate-50 active:scale-[0.98] transition-all">
                <span className="flex items-center justify-center gap-2">
                  <ClipboardList className="w-5 h-5" />
                  LIHAT TUGAS HARI INI
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="px-4 pt-6">
          <h3 className="text-slate-900 text-lg font-bold mb-4">Aksi Cepat</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/courses" className="flex flex-col items-start p-4 bg-blue-50 rounded-2xl border border-transparent hover:border-blue-200 transition-all active:scale-[0.98]">
              <div className="bg-blue-600 text-white p-2.5 rounded-xl mb-3">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-slate-900 font-bold">Kursus Saya</span>
              <span className="text-slate-500 text-xs">{coursesData.length} Program Aktif</span>
            </Link>
            
            <Link href="/mapping" className="flex flex-col items-start p-4 bg-emerald-50 rounded-2xl border border-transparent hover:border-emerald-200 transition-all active:scale-[0.98] cursor-pointer">
              <div className="bg-emerald-600 text-white p-2.5 rounded-xl mb-3">
                <Map className="w-6 h-6" />
              </div>
              <span className="text-slate-900 font-bold">Pemetaan</span>
              <span className="text-slate-500 text-xs">Zona Prioritas</span>
            </Link>
            
            <Link href="/statistics" className="flex flex-col items-start p-4 bg-indigo-50 rounded-2xl border border-transparent hover:border-indigo-200 transition-all active:scale-[0.98] cursor-pointer">
              <div className="bg-indigo-600 text-white p-2.5 rounded-xl mb-3">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="text-slate-900 font-bold">Statistik</span>
              <span className="text-slate-500 text-xs">Lihat Performa</span>
            </Link>
            
            <Link href="/profile" className="flex flex-col items-start p-4 bg-orange-50 rounded-2xl border border-transparent hover:border-orange-200 transition-all active:scale-[0.98]">
              <div className="bg-orange-500 text-white p-2.5 rounded-xl mb-3">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-slate-900 font-bold">Sertifikat</span>
              <span className="text-slate-500 text-xs">{completedModules} Selesai</span>
            </Link>
          </div>
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
