import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { coursesData } from '@/lib/courseData';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return coursesData.map((course) => ({
    id: course.id,
  }));
}

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = coursesData.find((c) => c.id === id);

  if (!course) {
    notFound();
  }

  return (
    <>
      {/* Header */}
      <header className="flex items-center bg-white p-4 sticky top-0 z-10 border-b border-slate-100">
        <Link href="/courses" className="flex w-10 h-10 items-center justify-center hover:bg-slate-50 rounded-full transition-colors cursor-pointer">
          <ArrowLeft className="w-6 h-6 text-slate-900" />
        </Link>
        <h1 className="flex-1 text-center text-lg font-bold text-slate-900 truncate px-2">{course.title}</h1>
        <div className="w-10" />
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        {/* Course Hero */}
        <div className="relative h-48 bg-slate-200">
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="px-2.5 py-1 bg-blue-600 text-white text-xs font-bold rounded-lg">{course.category}</span>
            <h2 className="text-white text-xl font-bold mt-2">{course.title}</h2>
          </div>
        </div>

        {/* Course Info */}
        <div className="px-4 py-4">
          <p className="text-slate-600 text-sm leading-relaxed mb-4">{course.description}</p>

          <div className="flex items-center gap-4 mb-4">
            <span className="flex items-center gap-1.5 text-slate-500 text-sm">
              <BookOpen className="w-4 h-4" />
              {course.totalModules} Modul
            </span>
            <span className="flex items-center gap-1.5 text-slate-500 text-sm">
              <CheckCircle className="w-4 h-4" />
              {course.completedModules} Selesai
            </span>
          </div>

          {/* Progress */}
          <div className="bg-slate-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-slate-700">Progress Keseluruhan</span>
              <span className="text-sm font-bold text-blue-600">{course.progress}%</span>
            </div>
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full transition-all" style={{ width: `${course.progress}%` }}></div>
            </div>
          </div>
        </div>

        {/* Module List */}
        <div className="px-4">
          <h3 className="text-base font-bold text-slate-900 mb-3">Daftar Modul</h3>
          <div className="space-y-3">
            {course.modules.map((module, index) => (
              <Link
                key={module.id}
                href={module.progress === 100 ? '#' : `/learn/${module.id}`}
                className="flex gap-3 p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-300 active:scale-[0.99] transition-all cursor-pointer"
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
                    {module.progress === 100 && (
                      <span className="text-[10px] bg-green-100 text-green-600 px-1.5 py-0.5 rounded font-bold">SELESAI</span>
                    )}
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
        </div>
      </main>

      <BottomNav />
    </>
  );
}
