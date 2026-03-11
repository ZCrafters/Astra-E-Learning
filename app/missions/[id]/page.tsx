'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Download, Star, Clock } from 'lucide-react';
import { getMissionById, generateCSV, categoryLabels } from '@/lib/missionData';
import { useMissions } from '@/lib/missions-context';
import { useCallback } from 'react';

export default function MissionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const mission = getMissionById(id);
  const { isMissionCompleted, completeMission } = useMissions();

  const handleDownload = useCallback(() => {
    if (!mission) return;
    const csv = generateCSV(mission.template);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = mission.template.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [mission]);

  const handleComplete = useCallback(() => {
    if (!mission) return;
    if (confirm('Sudah selesai mengerjakan tugas ini?')) {
      completeMission(mission.id);
    }
  }, [mission, completeMission]);

  if (!mission) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center p-4">
        <p className="text-lg text-slate-600 mb-4">Tugas tidak ditemukan</p>
        <Link href="/missions" className="text-blue-600 font-bold text-base">
          ← Kembali ke Daftar Tugas
        </Link>
      </div>
    );
  }

  const done = isMissionCompleted(mission.id);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-slate-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/missions" className="flex items-center justify-center p-2 hover:bg-slate-50 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <h1 className="text-lg font-bold text-slate-900">Detail Tugas</h1>
          <div className="w-9" />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-24 space-y-4">
        {/* Title & Meta */}
        <section className="px-4 pt-4">
          <h2 className="text-lg font-bold text-slate-900 mb-3">{mission.title}</h2>
          <div className="flex flex-wrap items-center gap-3 text-base text-slate-500">
            <span className="flex items-center gap-1">
              <Clock className="w-5 h-5" />
              {mission.duration}
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              {mission.xp} XP
            </span>
            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-bold">
              {categoryLabels[mission.category]}
            </span>
          </div>
        </section>

        {/* Cara Mengerjakan */}
        <section className="px-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Cara Mengerjakan</h3>
            <ol className="space-y-3">
              {mission.instruction.map((step, i) => (
                <li key={i} className="flex gap-3 text-base text-slate-700">
                  <span className="flex items-center justify-center w-7 h-7 bg-blue-100 text-blue-700 rounded-full text-sm font-bold shrink-0">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Download Format */}
        <section className="px-4">
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 w-full bg-white border-2 border-blue-200 text-blue-700 font-bold py-4 rounded-xl min-h-[56px] hover:bg-blue-50 active:scale-[0.98] transition-all text-base"
          >
            <Download className="w-5 h-5" />
            Download Format Excel ({mission.template.filename})
          </button>
        </section>

        {/* Saya Sudah Selesai */}
        <section className="px-4">
          {done ? (
            <div className="w-full bg-green-100 text-green-800 font-bold py-4 rounded-xl min-h-[56px] text-center text-base">
              ✅ Tugas ini sudah selesai!
            </div>
          ) : (
            <button
              onClick={handleComplete}
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl min-h-[56px] hover:bg-blue-700 active:scale-[0.98] transition-all text-base"
            >
              Saya Sudah Selesai ✓
            </button>
          )}
        </section>
      </main>
    </div>
  );
}
