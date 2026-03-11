'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Star, Clock, CheckCircle2 } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { missionsData, categoryLabels } from '@/lib/missionData';
import { useMissions } from '@/lib/missions-context';
import type { Mission } from '@/lib/missionData';

type FilterCategory = 'semua' | Mission['category'];

const filters: { key: FilterCategory; label: string }[] = [
  { key: 'semua', label: 'Semua' },
  { key: 'cari-wilayah', label: 'Cari Wilayah' },
  { key: 'kenali-orang', label: 'Kenali Orang' },
  { key: 'hitung-data', label: 'Hitung Data' },
];

export default function MissionsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('semua');
  const { isMissionCompleted } = useMissions();

  const filtered = useMemo(() => {
    if (activeFilter === 'semua') return missionsData;
    return missionsData.filter((m) => m.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-slate-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center justify-center p-2 hover:bg-slate-50 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <h1 className="text-lg font-bold text-slate-900">Daftar Tugas</h1>
          <div className="w-9" />
        </div>
      </header>

      {/* Filters */}
      <div className="px-4 pt-3 pb-1 bg-white border-b border-slate-100">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-colors min-h-[40px] ${
                activeFilter === f.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mission Cards */}
      <main className="flex-1 overflow-y-auto pb-24 px-4 pt-4 space-y-3">
        {filtered.map((mission) => {
          const done = isMissionCompleted(mission.id);
          return (
            <Link
              key={mission.id}
              href={`/missions/${mission.id}`}
              className={`block rounded-2xl border p-4 transition-all active:scale-[0.98] ${
                done
                  ? 'bg-green-50 border-green-200'
                  : 'bg-white border-slate-200 hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-base font-bold text-slate-900 flex-1 pr-2">{mission.title}</h3>
                {done && <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />}
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {mission.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  {mission.xp} XP
                </span>
                <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs font-bold">
                  {categoryLabels[mission.category]}
                </span>
              </div>
              {done && (
                <p className="text-sm text-green-700 font-bold mt-2">✅ Sudah selesai</p>
              )}
            </Link>
          );
        })}
      </main>

      <BottomNav />
    </div>
  );
}
