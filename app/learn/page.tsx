'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Info, CheckCircle2, ArrowRight } from 'lucide-react';
import { quizData } from '@/lib/courseData';

export default function LearnModulePage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const question = quizData.question;
  const options = quizData.options;
  const correctAnswer = quizData.correctAnswer;

  const handleSelect = useCallback((id: string) => {
    if (!isSubmitted) {
      setSelectedOption(id);
    }
  }, [isSubmitted]);

  const handleSubmit = useCallback(() => {
    if (selectedOption) {
      setIsSubmitted(true);
    }
  }, [selectedOption]);

  const isCorrect = selectedOption === correctAnswer;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top Navigation */}
      <header className="flex items-center bg-white p-4 sticky top-0 z-10 border-b border-slate-100">
        <Link href="/courses" className="text-slate-900 flex w-10 h-10 shrink-0 items-center justify-center hover:bg-slate-50 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div className="flex-1 text-center px-2">
          <h2 className="text-slate-900 text-base font-bold leading-tight tracking-tight truncate">{quizData.module}</h2>
          <p className="text-xs text-slate-500">{quizData.title}</p>
        </div>
        <button className="flex w-10 h-10 items-center justify-center rounded-full hover:bg-slate-50 transition-colors">
          <Info className="w-6 h-6 text-slate-700" />
        </button>
      </header>

      {/* Progress Indicator */}
      <div className="px-4 py-4 border-b border-slate-50">
        <div className="flex justify-between items-end mb-3">
          <div>
            <span className="text-blue-600 font-bold text-xs uppercase tracking-wider">Pertanyaan {question.id} dari {question.total}</span>
            <h1 className="text-xl font-bold text-slate-900 mt-1">{question.title}</h1>
          </div>
          <span className="text-slate-500 text-sm font-medium">{Math.round((question.id / question.total) * 100)}%</span>
        </div>
        
        {/* Progress Bar */}
        <div className="flex w-full gap-1">
          {Array.from({ length: question.total }).map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 flex-1 rounded-full ${i < question.id ? 'bg-blue-600' : 'bg-slate-100'}`}
            />
          ))}
        </div>
      </div>

      <main className="flex-1 overflow-y-auto pb-40">
        {/* Scenario Visual */}
        <div className="px-4 py-4">
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-slate-200">
            <Image 
              src={question.image}
              alt="Scenario"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <div className="bg-white/95 p-3 rounded-lg shadow-lg">
                <p className="text-sm text-slate-800 italic">
                  &ldquo;{question.scenario}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Question Text */}
        <div className="px-4 pb-4">
          <h3 className="text-lg font-bold text-slate-900 leading-snug">
            {question.text}
          </h3>
        </div>

        {/* Option Cards */}
        <div className="px-4 space-y-3">
          {options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            const showCorrect = isSubmitted && opt.id === correctAnswer;
            const showWrong = isSubmitted && isSelected && opt.id !== correctAnswer;
            
            let btnClass = 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50';
            if (showCorrect) btnClass = 'border-green-500 bg-green-50';
            else if (showWrong) btnClass = 'border-red-500 bg-red-50';
            else if (isSelected) btnClass = 'border-blue-600 bg-blue-50';
            
            let badgeClass = 'bg-slate-100 text-slate-500';
            if (showCorrect) badgeClass = 'bg-green-500 text-white';
            else if (showWrong) badgeClass = 'bg-red-500 text-white';
            else if (isSelected) badgeClass = 'bg-blue-600 text-white';
            
            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                disabled={isSubmitted}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3 ${btnClass} ${isSubmitted ? '' : 'active:scale-[0.99]'}`}
              >
                <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${badgeClass}`}>
                  {opt.id}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-slate-900 text-sm">{opt.title}</p>
                    {isSelected && !isSubmitted && (
                      <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold shrink-0">Dipilih</span>
                    )}
                    {showCorrect && (
                      <span className="text-[10px] bg-green-500 text-white px-2 py-0.5 rounded-full font-bold shrink-0">Benar</span>
                    )}
                    {showWrong && (
                      <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full font-bold shrink-0">Salah</span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">{opt.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {isSubmitted && (
          <div className={`mx-4 mt-4 p-4 rounded-xl ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isCorrect ? 'bg-green-500' : 'bg-amber-500'}`}>
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className={`font-bold text-sm ${isCorrect ? 'text-green-800' : 'text-amber-800'}`}>
                  {isCorrect ? 'Jawaban Benar!' : 'Jawaban Belum Tepat'}
                </h4>
                <p className={`text-sm mt-1 leading-relaxed ${isCorrect ? 'text-green-700' : 'text-amber-700'}`}>
                  {isCorrect 
                    ? 'Strategi BATNA yang tepat! Alternatif endorsement memungkinkan Ketua RW tetap terlibat tanpa benturan kepentingan.'
                    : 'Ingat konsep BATNA - selalu siapkan alternatif terbaik jika tawaran utama ditolak.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer Actions */}
      <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-4 bg-white border-t border-slate-100 flex gap-3 z-20">
        {!isSubmitted ? (
          <>
            <button 
              className="flex-1 py-3 px-4 rounded-xl border-2 border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors active:scale-[0.98]"
              onClick={() => alert('Draft disimpan!')}
            >
              Simpan
            </button>
            <button 
              onClick={handleSubmit}
              disabled={!selectedOption}
              className="flex-[2] py-3 px-4 rounded-xl bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Periksa
              <ArrowRight className="w-4 h-4" />
            </button>
          </>
        ) : (
          <Link 
            href="/courses"
            className="w-full py-3 px-4 rounded-xl bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            Lanjutkan
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </footer>
    </div>
  );
}
