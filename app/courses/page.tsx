import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Search, PlayCircle, ArrowRight, Clock, BookOpen, CheckCircle } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { coursesData } from '@/lib/courseData';

export const metadata: Metadata = {
  title: 'Kursus Saya | PAO Finatra',
  description: 'Kelola dan lanjutkan pembelajaran Anda',
};

export default function CoursesPage() {
  const mainCourse = coursesData[0];

  return (
    <>
      {/* Header */}
      <header className="flex items-center bg-white p-4 sticky top-0 z-10 border-b border-slate-100">
        <Link href="/" className="flex w-10 h-10 items-center justify-center hover:bg-slate-50 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-slate-900" />
        </Link>
        <h1 className="flex-1 text-center text-lg font-bold text-slate-900">Kursus Saya</h1>
        <button className="flex w-10 h-10 items-center justify-center hover:bg-slate-50 rounded-full transition-colors">
          <Search className="w-6 h-6 text-slate-900" />
        </button>
      </header>

      {/* Tabs */}
      <div className="bg-white sticky top-[65px] z-10 border-b border-slate-100">
        <div className="flex px-4">
          <button className="flex-1 py-3 border-b-2 border-blue-600 text-blue-600 font-bold text-sm">
            Sedang Dipelajari
          </button>
          <button className="flex-1 py-3 border-b-2 border-transparent text-slate-500 font-medium text-sm hover:text-slate-800">
            Selesai
          </button>
          <button className="flex-1 py-3 border-b-2 border-transparent text-slate-500 font-medium text-sm hover:text-slate-800">
            Tersimpan
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-4 py-4 pb-24">
        
        {/* Featured Course */}
        <section className="mb-6">
          <h2 className="text-base font-bold text-slate-900 mb-3">Lanjutkan Belajar</h2>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="relative h-44 bg-slate-200">
              <Image 
                src={mainCourse.thumbnail}
                alt={mainCourse.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded">Sedang Berlangsung</span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-bold rounded">{mainCourse.category}</span>
                <span className="text-slate-500 text-xs font-medium">{mainCourse.progress}% Selesai</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">{mainCourse.title}</h3>
              <p className="text-slate-500 text-sm mb-4">Modul 3: Hypno-Selling & Komunikasi Sugestif</p>
              
              <div className="w-full bg-slate-100 h-2 rounded-full mb-4 overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full transition-all" style={{ width: `${mainCourse.progress}%` }}></div>
              </div>
              
              <Link 
                href="/learn" 
                className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-blue-700 active:scale-[0.98] transition-all"
              >
                <PlayCircle className="w-5 h-5" />
                Lanjutkan Modul
              </Link>
            </div>
          </div>
        </section>

        {/* Module List */}
        <section className="mb-6">
          <h2 className="text-base font-bold text-slate-900 mb-3">Daftar Modul</h2>
          <div className="space-y-3">
            {mainCourse.modules.map((module, index) => (
              <Link 
                key={module.id} 
                href={module.progress === 100 ? "#" : "/learn"}
                className="flex gap-3 p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-300 active:scale-[0.99] transition-all"
              >
                <div className="relative w-24 h-20 rounded-lg bg-slate-200 shrink-0 overflow-hidden">
                  <Image 
                    src={`https://picsum.photos/seed/${module.id}/200/150`}
                    alt={module.title}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                  {module.progress === 100 && (
                    <div className="absolute inset-0 bg-green-500/80 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-slate-400">Modul {index + 1}</span>
                    {module.progress === 100 && <span className="text-[10px] bg-green-100 text-green-600 px-1.5 py-0.5 rounded font-bold">SELESAI</span>}
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm leading-tight mb-1 line-clamp-2">{module.title}</h4>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full rounded-full" style={{ width: `${module.progress}%` }}></div>
                    </div>
                    <span className="text-xs font-bold text-slate-500 w-8 text-right">{module.progress}%</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="flex items-center gap-1 text-slate-400 text-xs">
                      <Clock className="w-3 h-3" />
                      {module.duration}
                    </span>
                    {module.progress < 100 && (
                      <span className="text-blue-600 font-bold text-xs flex items-center gap-1">
                        {module.progress === 0 ? 'Mulai' : 'Lanjutkan'} <ArrowRight className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Other Courses */}
        <section>
          <h2 className="text-base font-bold text-slate-900 mb-3">Program Lainnya</h2>
          <div className="space-y-3">
            {coursesData.slice(1).map((course) => (
              <Link 
                key={course.id} 
                href="#"
                className="flex gap-3 p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-300 active:scale-[0.99] transition-all"
              >
                <div className="relative w-24 h-20 rounded-lg bg-slate-200 shrink-0 overflow-hidden">
                  <Image 
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs text-blue-600 font-bold uppercase">{course.category}</span>
                  <h4 className="font-bold text-slate-900 text-sm leading-tight mb-1">{course.title}</h4>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full rounded-full" style={{ width: `${course.progress}%` }}></div>
                    </div>
                    <span className="text-xs font-bold text-slate-500 w-8 text-right">{course.progress}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-slate-400 text-xs">
                      <BookOpen className="w-3 h-3" />
                      {course.totalModules} Modul
                    </span>
                    <span className="text-blue-600 font-bold text-xs flex items-center gap-1">
                      {course.progress === 0 ? 'Mulai' : 'Lanjutkan'} <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </>
  );
}
