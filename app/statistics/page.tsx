'use client';

import Link from 'next/link';
import { ArrowLeft, Users, Target, TrendingUp, Award } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { userStats } from '@/lib/courseData';

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  trend: string;
  trendUp?: boolean;
}

function StatCard({ icon: Icon, label, value, trend, trendUp }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
      <div className="flex items-center gap-2 mb-2">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
      <p className={`text-xs mt-1 ${trendUp ? 'text-green-600' : 'text-slate-500'}`}>
        {trend}
      </p>
    </div>
  );
}

interface ProgressBarProps {
  label: string;
  current: number;
  total: number;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

function ProgressBar({ label, current, total, color }: ProgressBarProps) {
  const percent = Math.round((current / total) * 100);
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-slate-700 font-medium">{label}</span>
        <span className="text-sm font-bold text-slate-900">
          {current}/{total}
        </span>
      </div>
      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${colorClasses[color]}`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
}

const performanceData = [
  { month: 'Jan', leads: 45, conversion: 12 },
  { month: 'Feb', leads: 52, conversion: 18 },
  { month: 'Mar', leads: 48, conversion: 22 },
  { month: 'Apr', leads: 61, conversion: 28 },
  { month: 'Mei', leads: 55, conversion: 25 },
  { month: 'Jun', leads: 70, conversion: 32 },
];

export default function StatisticsPage() {
  const maxLeads = Math.max(...performanceData.map((d) => d.leads));

  return (
    <>
      <div className="min-h-screen bg-slate-50 pb-20">
        {/* Header */}
        <header className="bg-white p-4 sticky top-0 z-10 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex w-10 h-10 items-center justify-center hover:bg-slate-50 rounded-full transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-6 h-6 text-slate-900" />
            </Link>
            <h1 className="text-xl font-bold text-slate-900">Statistik Performa</h1>
          </div>
        </header>

        {/* Summary Cards */}
        <div className="p-4 grid grid-cols-2 gap-3">
          <StatCard
            icon={Users}
            label="Total Leads"
            value={userStats.stats.totalLeads}
            trend="+12%"
            trendUp={true}
          />
          <StatCard
            icon={Target}
            label="Konversi"
            value="23%"
            trend="+5%"
            trendUp={true}
          />
          <StatCard
            icon={TrendingUp}
            label="Rating"
            value={userStats.stats.rating}
            trend="Stabil"
          />
          <StatCard
            icon={Award}
            label="Sertifikat"
            value="2"
            trend="Terus semangat!"
          />
        </div>

        {/* Chart - Simple Bar Visualization */}
        <div className="px-4 mt-2 space-y-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4">Tren Leads & Konversi</h3>
            <div className="space-y-3">
              {performanceData.map((data) => (
                <div key={data.month} className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 w-8 font-medium">{data.month}</span>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-100 h-4 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all"
                          style={{ width: `${(data.leads / maxLeads) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-blue-600 w-7 text-right">
                        {data.leads}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-100 h-4 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full transition-all"
                          style={{ width: `${(data.conversion / maxLeads) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-green-600 w-7 text-right">
                        {data.conversion}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-4 mt-4 pt-3 border-t border-slate-100">
              <span className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span> Leads
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="w-3 h-3 rounded-full bg-green-500"></span> Konversi
              </span>
            </div>
          </div>

          {/* Weekly Progress */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4">Progress Mingguan</h3>
            <div className="space-y-4">
              <ProgressBar label="Modul Selesai" current={7} total={10} color="blue" />
              <ProgressBar label="Target Leads" current={45} total={60} color="green" />
              <ProgressBar label="Aktivitas Belajar" current={12} total={20} color="purple" />
              <ProgressBar label="Kunjungan Wilayah" current={8} total={15} color="orange" />
            </div>
          </div>

          {/* Performance Summary */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4">Ringkasan Kinerja</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-blue-600">{userStats.stats.activeAgents}</p>
                <p className="text-xs text-slate-500 mt-1">Agen Aktif</p>
              </div>
              <div className="bg-green-50 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-green-600">{userStats.stats.success}%</p>
                <p className="text-xs text-slate-500 mt-1">Tingkat Sukses</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-purple-600">{userStats.stats.projects}</p>
                <p className="text-xs text-slate-500 mt-1">Total Proyek</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-orange-600">{userStats.stats.rating}</p>
                <p className="text-xs text-slate-500 mt-1">Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </>
  );
}
