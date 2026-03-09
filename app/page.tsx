'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Bell, PlayCircle, BookOpen, Map, TrendingUp, Award, Clock, Star, LogOut } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { coursesData } from '@/lib/courseData';
import { useAuth } from '@/lib/auth-context';
import { useEffect, useMemo } from 'react';

export default function Dashboard() {
  const { profile, progress, logout, isLoading, isAuthenticated } = useAuth();
  
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

  const mainCourse = coursesData[0];
  const progressPercent = userProgress[mainCourse.id] || 0;
  const completedModules = Math.floor((progressPercent / 100) * mainCourse.totalModules);

  // Sync progress to database when component mounts
  useEffect(() => {
    // This would sync any local changes to the database
    // Implementation depends on your sync strategy
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
        <div className="flex w-12 h-12 shrink-0 items-center">
          <div className="bg-blue-50 rounded-full p-1 border-2 border-blue-100">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-200">
              <Image 
                src={`https://picsum.photos/seed/${profile?.id || 'user'}/200/200`}
                alt="Profile" 
                fill 
                className="object-cover"
                sizes="40px"
              />
            </div>
          </div>
        </div>
        <div className="flex-1 ml-3">
          <p className="text-slate-500 text-xs">Selamat datang,</p>
          <h1 className="text-slate-900 text-lg font-bold leading-tight">{profile?.name || 'PAO User'}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="relative flex items-center justify-center p-2 rounded-xl bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full"></span>
          </button>
          <button 
            onClick={logout}
            className="flex items-center justify-center p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        {/* Hero Card / Progress */}
        <section className="px-4 pt-4">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold mb-0.5">Progress Belajar</h2>
                  <p className="text-blue-100 text-sm">{profile?.region || 'Jakarta'} • {isAuthenticated ? 'Tersimpan' : 'Guest'}</p>
                </div>
                <span className="bg-white/20 px-2.5 py-1 rounded-full text-sm font-bold">{progressPercent}%</span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium">{mainCourse.title}</span>
                  <span className="opacity-90">{completedModules}/{mainCourse.totalModules} Modul</span>
                </div>
                <div className="h-3 w-full bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full transition-all" style={{ width: `${progressPercent}%` }}></div>
                </div>
              </div>
              
              <Link href="/courses" className="block w-full bg-white text-blue-600 font-bold py-3 rounded-xl text-center shadow-lg hover:bg-slate-50 active:scale-[0.98] transition-all">
                <span className="flex items-center justify-center gap-2">
                  <PlayCircle className="w-5 h-5 fill-current" />
                  LANJUTKAN BELAJAR
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
            
            <Link href="/courses" className="flex flex-col items-start p-4 bg-emerald-50 rounded-2xl border border-transparent hover:border-emerald-200 transition-all active:scale-[0.98]">
              <div className="bg-emerald-600 text-white p-2.5 rounded-xl mb-3">
                <Map className="w-6 h-6" />
              </div>
              <span className="text-slate-900 font-bold">Pemetaan</span>
              <span className="text-slate-500 text-xs">Zona Prioritas</span>
            </Link>
            
            <Link href="/profile" className="flex flex-col items-start p-4 bg-indigo-50 rounded-2xl border border-transparent hover:border-indigo-200 transition-all active:scale-[0.98]">
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

        {/* Stats Section */}
        <section className="px-4 pt-6">
          <h3 className="text-slate-900 text-lg font-bold mb-4">Performa Saya</h3>
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 text-center">
              <p className="text-xl font-bold text-blue-600">{progress.filter(p => p.progress > 0).length}</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Modul Aktif</p>
            </div>
            <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 text-center">
              <p className="text-xl font-bold text-blue-600">{progress.filter(p => p.is_completed).length}</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Selesai</p>
            </div>
            <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 text-center">
              <p className="text-xl font-bold text-blue-600">{progress.length > 0 ? Math.round(progress.reduce((a, p) => a + p.progress, 0) / progress.length) : 0}%</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Rata-rata</p>
            </div>
            <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 text-center">
              <p className="text-xl font-bold text-blue-600">{progress.reduce((a, p) => a + p.completed_lessons, 0)}</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Lesson</p>
            </div>
          </div>
        </section>

        {/* Recommended Content */}
        <section className="px-4 pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-slate-900 text-lg font-bold">Rekomendasi</h3>
            <Link href="/courses" className="text-blue-600 font-bold text-sm hover:underline">Lihat Semua</Link>
          </div>
          
          <Link href="/courses" className="block bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 hover:shadow-md transition-all active:scale-[0.98]">
            <div className="h-36 w-full bg-slate-200 relative">
              <Image 
                src="https://picsum.photos/seed/territory-mapping/800/400"
                alt="Territory Mapping" 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-white/90 px-2.5 py-1 rounded-lg text-blue-600 text-xs font-bold uppercase">Populer</span>
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-slate-900 font-bold mb-2">Territory Mapping & Analisis Wilayah</h4>
              <div className="flex items-center gap-4 text-slate-500 text-xs">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  1j 45m
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  4.9 (124)
                </span>
              </div>
            </div>
          </Link>
        </section>
      </main>
      
      <BottomNav />
    </>
  );
}
