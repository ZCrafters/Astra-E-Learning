'use client';

import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Circle,
  Clock,
  BookOpen,
} from 'lucide-react';
import { coursesData, Module } from '@/lib/courseData';

interface Slide {
  title: string;
  content: string;
}

interface ModuleData extends Module {
  courseId: string;
  courseTitle: string;
  slides: Slide[];
}

const moduleDataMap = new Map<string, ModuleData>();

for (const course of coursesData) {
  for (const mod of course.modules) {
    const slides: Slide[] = [
      {
        title: `Pengenalan: ${mod.title}`,
        content: mod.description,
      },
      {
        title: 'Tujuan Pembelajaran',
        content: `Setelah menyelesaikan modul "${mod.title}", Anda akan memahami konsep-konsep kunci dan mampu menerapkannya dalam pekerjaan sehari-hari sebagai PAO Finatra.`,
      },
      {
        title: 'Materi Utama',
        content: `Modul ini terdiri dari ${mod.totalLessons} pelajaran yang dirancang untuk membangun kompetensi Anda secara bertahap. Estimasi waktu: ${mod.duration}.`,
      },
      {
        title: 'Studi Kasus',
        content: `Pelajari bagaimana konsep "${mod.title}" diterapkan dalam situasi nyata di lapangan oleh Partnership Account Officer.`,
      },
      {
        title: 'Ringkasan & Evaluasi',
        content: `Anda telah menyelesaikan materi "${mod.title}". Lanjutkan ke kuis untuk menguji pemahaman Anda.`,
      },
    ];

    moduleDataMap.set(mod.id, {
      ...mod,
      courseId: course.id,
      courseTitle: course.title,
      slides,
    });
  }
}

function getModuleData(moduleId: string): ModuleData | null {
  return moduleDataMap.get(moduleId) || null;
}

export default function LearningModuleClient() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.moduleId as string;
  const [currentSlide, setCurrentSlide] = useState(0);

  const moduleData = useMemo(() => getModuleData(moduleId), [moduleId]);

  if (!moduleData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-8 text-center">
        <BookOpen className="w-16 h-16 text-slate-300 mb-4" />
        <h1 className="text-xl font-bold text-slate-900 mb-2">Modul Tidak Ditemukan</h1>
        <p className="text-slate-500 mb-6">Modul yang Anda cari tidak tersedia.</p>
        <Link
          href="/courses"
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Kembali ke Kursus
        </Link>
      </div>
    );
  }

  const { slides, courseTitle } = moduleData;
  const progress = ((currentSlide + 1) / slides.length) * 100;
  const isLastSlide = currentSlide === slides.length - 1;

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (!isLastSlide) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      router.push('/learn');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="flex items-center p-4 sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-slate-700">
        <Link
          href="/courses"
          className="flex w-10 h-10 items-center justify-center hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div className="flex-1 text-center px-2">
          <h2 className="text-base font-bold leading-tight truncate">{moduleData.title}</h2>
          <p className="text-xs text-slate-400">{courseTitle}</p>
        </div>
        <div className="w-10" />
      </header>

      {/* Progress Bar */}
      <div className="h-1 bg-slate-700">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Slide Content */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1 relative">
          {/* Cover Image */}
          <div className="relative h-48 bg-slate-800">
            <Image
              src={`https://picsum.photos/seed/${moduleId}-slide-${currentSlide}/800/400`}
              alt={slides[currentSlide].title}
              fill
              className="object-cover opacity-60"
              sizes="(max-width: 768px) 100vw, 400px"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900" />
          </div>

          {/* Text Content */}
          <div className="px-6 -mt-12 relative z-10">
            <h2 className="text-2xl font-bold mb-4">{slides[currentSlide].title}</h2>
            <p className="text-slate-300 leading-relaxed text-base">
              {slides[currentSlide].content}
            </p>
          </div>

          {/* Navigation Overlay */}
          <div className="absolute top-24 inset-x-0 flex items-center justify-between px-2 pointer-events-none">
            <button
              onClick={handlePrev}
              disabled={currentSlide === 0}
              className="pointer-events-auto p-3 bg-black/50 rounded-full hover:bg-black/70 disabled:opacity-30 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="pointer-events-auto p-3 bg-black/50 rounded-full hover:bg-black/70 transition-all cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="bg-slate-800 p-4 mt-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">{moduleData.title}</h3>
              <p className="text-sm text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {moduleData.duration} • Slide {currentSlide + 1} dari {slides.length}
              </p>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {slides.map((slide, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`flex items-center gap-1.5 flex-shrink-0 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  idx === currentSlide
                    ? 'bg-blue-600 text-white'
                    : idx < currentSlide
                    ? 'bg-slate-700 text-green-400'
                    : 'bg-slate-700 text-slate-400'
                }`}
              >
                {idx < currentSlide ? (
                  <CheckCircle className="w-3.5 h-3.5" />
                ) : (
                  <Circle className="w-3.5 h-3.5" />
                )}
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer Action */}
      <footer className="p-4 bg-slate-900 border-t border-slate-700">
        <button
          onClick={handleNext}
          className="w-full py-3.5 px-4 rounded-xl bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {isLastSlide ? 'Selesai & Lanjut ke Kuis' : 'Lanjutkan'}
          <ChevronRight className="w-5 h-5" />
        </button>
      </footer>
    </div>
  );
}
