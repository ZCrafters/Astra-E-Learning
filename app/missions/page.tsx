'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Clock, Zap, Search } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { useAuth } from '@/lib/auth-context';
import { tugasData, type Tugas } from '@/lib/tugasData';
import { fetchAllTugas, fetchCompletedTugasIds } from '@/lib/tugas';

const CATEGORIES = ['Semua', 'Cari Wilayah', 'Kenali Orang', 'Hitung Data'] as const;

export default function MissionsPage() {
  const { profile, isLoading } = useAuth();
  const [tugasList, setTugasList] = useState<Tugas[]>(tugasData);
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('Semua');
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoadingData(true);
      const tugas = await fetchAllTugas();
      setTugasList(tugas);

      if (profile?.id) {
        const completed = await fetchCompletedTugasIds(profile.id);
        setCompletedIds(completed);
      } else {
        // Fallback: load from localStorage
        const saved = localStorage.getItem('pao_completed_tugas');
        if (saved) setCompletedIds(JSON.parse(saved));
      }
      setLoadingData(false);
    }
    if (!isLoading) loadData();
  }, [profile, isLoading]);

  const filtered = useMemo(() => {
    if (activeFilter === 'Semua') return tugasList;
    return tugasList.filter((t) => t.kategori === activeFilter);
  }, [tugasList, activeFilter]);

  if (isLoading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-slate-100 px-4 py-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 -ml-2 rounded-xl hover:bg-slate-100 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Tugas Lapangan</h1>
            <p className="text-xs text-slate-500">
              {completedIds.length} dari {tugasList.length} tugas selesai
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        {/* Filter Tabs */}
        <div className="px-4 pt-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeFilter === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="px-4 pt-2 pb-4">
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all"
              style={{ width: `${tugasList.length > 0 ? (completedIds.length / tugasList.length) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Tugas List */}
        <div className="px-4 space-y-3">
          {filtered.map((tugas) => {
            const done = completedIds.includes(tugas.id);
            return (
              <Link
                key={tugas.id}
                href={`/missions/${tugas.id}`}
                className={`block rounded-2xl border p-4 transition-all active:scale-[0.98] ${
                  done
                    ? 'bg-emerald-50 border-emerald-200'
                    : 'bg-white border-slate-100 hover:border-blue-200 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          tugas.kategori === 'Cari Wilayah'
                            ? 'bg-blue-100 text-blue-700'
                            : tugas.kategori === 'Kenali Orang'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {tugas.kategori}
                      </span>
                    </div>
                    <h3 className={`font-bold text-sm ${done ? 'text-emerald-700' : 'text-slate-900'}`}>
                      {tugas.judul}
                    </h3>
                    <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {tugas.durasi}
                      </span>
                      <span className="flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 text-amber-500" /> {tugas.xp} XP
                      </span>
                    </div>
                  </div>
                  {done && <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />}
                </div>
              </Link>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="font-semibold">Tidak ada tugas</p>
              <p className="text-sm">Coba filter kategori lain</p>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </>
  );
}
