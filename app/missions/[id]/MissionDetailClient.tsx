'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Clock, Zap, ListChecks } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { type Tugas } from '@/lib/tugasData';
import { fetchTugasById, completeTugas, fetchCompletedTugasIds } from '@/lib/tugas';

export default function MissionDetailClient() {
  const params = useParams();
  const router = useRouter();
  const { profile, isLoading } = useAuth();
  const [tugas, setTugas] = useState<Tugas | null>(null);
  const [isDone, setIsDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const id = Number(params.id);

  useEffect(() => {
    async function loadData() {
      setLoadingData(true);
      const data = await fetchTugasById(id);
      setTugas(data);

      if (profile?.id) {
        const completed = await fetchCompletedTugasIds(profile.id);
        setIsDone(completed.includes(id));
      } else {
        const saved = localStorage.getItem('pao_completed_tugas');
        if (saved) {
          const ids: number[] = JSON.parse(saved);
          setIsDone(ids.includes(id));
        }
      }
      setLoadingData(false);
    }
    if (!isLoading && id) loadData();
  }, [id, profile, isLoading]);

  const handleComplete = async () => {
    if (isDone || submitting) return;
    setSubmitting(true);

    if (profile?.id) {
      await completeTugas(profile.id, id);
    }

    // Also save to localStorage as fallback
    const saved = localStorage.getItem('pao_completed_tugas');
    const ids: number[] = saved ? JSON.parse(saved) : [];
    if (!ids.includes(id)) {
      ids.push(id);
      localStorage.setItem('pao_completed_tugas', JSON.stringify(ids));
    }

    setIsDone(true);
    setSubmitting(false);
    alert('🎉 Tugas berhasil diselesaikan! XP +' + (tugas?.xp || 0));
    router.push('/missions');
  };

  if (isLoading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!tugas) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-slate-500 text-lg">Tugas tidak ditemukan</p>
        <Link href="/missions" className="text-blue-600 font-bold hover:underline">
          Kembali ke Daftar Tugas
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-slate-100 px-4 py-4">
        <div className="flex items-center gap-3">
          <Link href="/missions" className="p-2 -ml-2 rounded-xl hover:bg-slate-100 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </Link>
          <h1 className="text-lg font-bold text-slate-900 truncate">Detail Tugas</h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-8 px-4">
        {/* Tugas Info */}
        <div className="pt-6 pb-4">
          <span
            className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
              tugas.kategori === 'Cari Wilayah'
                ? 'bg-blue-100 text-blue-700'
                : tugas.kategori === 'Kenali Orang'
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-amber-100 text-amber-700'
            }`}
          >
            {tugas.kategori}
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mt-3">{tugas.judul}</h2>
          <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> {tugas.durasi}
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" /> {tugas.xp} XP
            </span>
          </div>
        </div>

        {/* Status */}
        {isDone && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-4 flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
            <p className="text-emerald-700 font-semibold text-sm">Tugas ini sudah selesai!</p>
          </div>
        )}

        {/* Langkah-langkah */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <ListChecks className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-900">Langkah-langkah</h3>
          </div>
          <ol className="space-y-4">
            {tugas.langkah.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <p className="text-sm text-slate-700 pt-1 leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Complete Button */}
        <div className="mt-6">
          <button
            onClick={handleComplete}
            disabled={isDone || submitting}
            className={`w-full py-4 rounded-2xl font-bold text-center transition-all active:scale-[0.98] ${
              isDone
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : submitting
                  ? 'bg-blue-400 text-white cursor-wait'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
            }`}
          >
            {isDone ? '✅ Sudah Selesai' : submitting ? 'Menyimpan...' : '🚀 Saya Sudah Selesai'}
          </button>
        </div>
      </main>
    </>
  );
}
