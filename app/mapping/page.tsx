'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, MapPin, Plus, Users, Clock, ChevronRight } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

type ZoneType = 'priority' | 'explored' | 'potential';

interface Territory {
  id: string;
  name: string;
  status: ZoneType;
  progress: number;
  agents: number;
  lastVisit: string;
  description: string;
}

const territories: Territory[] = [
  {
    id: 'cakung',
    name: 'Kelurahan Cakung',
    status: 'priority',
    progress: 75,
    agents: 12,
    lastVisit: '2 hari lalu',
    description: 'Zona prioritas utama dengan potensi tinggi',
  },
  {
    id: 'jakarta-timur',
    name: 'Jakarta Timur',
    status: 'potential',
    progress: 30,
    agents: 8,
    lastVisit: '5 hari lalu',
    description: 'Wilayah potensial untuk ekspansi',
  },
  {
    id: 'bekasi',
    name: 'Bekasi',
    status: 'explored',
    progress: 90,
    agents: 15,
    lastVisit: '1 hari lalu',
    description: 'Wilayah telah dijelajahi dengan coverage tinggi',
  },
  {
    id: 'depok',
    name: 'Depok',
    status: 'priority',
    progress: 60,
    agents: 10,
    lastVisit: '3 hari lalu',
    description: 'Zona prioritas dengan pertumbuhan stabil',
  },
  {
    id: 'tangerang',
    name: 'Tangerang Selatan',
    status: 'potential',
    progress: 15,
    agents: 3,
    lastVisit: '1 minggu lalu',
    description: 'Area potensial baru untuk penetrasi',
  },
  {
    id: 'bogor',
    name: 'Bogor Kota',
    status: 'explored',
    progress: 85,
    agents: 11,
    lastVisit: '4 hari lalu',
    description: 'Coverage area sudah komprehensif',
  },
];

interface MapPointProps {
  x: number;
  y: number;
  label: string;
  status: ZoneType;
}

function MapPoint({ x, y, label, status }: MapPointProps) {
  const colors: Record<ZoneType, string> = {
    priority: 'bg-red-500 animate-pulse',
    explored: 'bg-green-500',
    potential: 'bg-blue-500',
  };

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div
        className={`w-4 h-4 rounded-full ${colors[status]} shadow-lg ring-2 ring-white cursor-pointer hover:scale-125 transition-transform`}
      />
      <span className="absolute top-5 left-1/2 -translate-x-1/2 text-xs font-medium bg-white px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-slate-700">
        {label}
      </span>
    </div>
  );
}

const zoneLabels: Record<ZoneType, string> = {
  priority: 'Zona Prioritas',
  explored: 'Sudah Dijelajahi',
  potential: 'Potensial Tinggi',
};

const statusColors: Record<ZoneType, string> = {
  priority: 'bg-red-100 text-red-700 border-red-200',
  explored: 'bg-green-100 text-green-700 border-green-200',
  potential: 'bg-blue-100 text-blue-700 border-blue-200',
};

const progressColors: Record<ZoneType, string> = {
  priority: 'bg-red-500',
  explored: 'bg-green-500',
  potential: 'bg-blue-500',
};

export default function MappingPage() {
  const [activeZone, setActiveZone] = useState<ZoneType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTerritories = territories.filter((t) => {
    const matchesZone = activeZone === 'all' || t.status === activeZone;
    const matchesSearch =
      searchQuery === '' || t.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesZone && matchesSearch;
  });

  return (
    <>
      <div className="min-h-screen bg-slate-50 pb-20">
        {/* Header */}
        <header className="bg-white p-4 sticky top-0 z-10 shadow-sm border-b border-slate-100">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex w-10 h-10 items-center justify-center hover:bg-slate-50 rounded-full transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-6 h-6 text-slate-900" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Pemetaan Wilayah</h1>
              <p className="text-sm text-slate-500">Kelola zona prioritas & tracking</p>
            </div>
          </div>
        </header>

        {/* Search & Filter */}
        <div className="p-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari wilayah..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
            />
          </div>

          {/* Zone Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveZone('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-colors ${
                activeZone === 'all'
                  ? 'bg-slate-800 text-white'
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              Semua
            </button>
            {(['priority', 'explored', 'potential'] as ZoneType[]).map((zone) => (
              <button
                key={zone}
                onClick={() => setActiveZone(zone)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-colors ${
                  activeZone === zone
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                {zoneLabels[zone]}
              </button>
            ))}
          </div>
        </div>

        {/* Map Visualization */}
        <div className="px-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="aspect-square bg-gradient-to-br from-blue-50 to-green-50 rounded-xl relative overflow-hidden">
              <MapPoint x={30} y={40} label="Jakarta Timur" status="potential" />
              <MapPoint x={60} y={30} label="Bekasi" status="explored" />
              <MapPoint x={45} y={65} label="Depok" status="priority" />
              <MapPoint x={25} y={25} label="Tangerang Selatan" status="potential" />
              <MapPoint x={70} y={55} label="Bogor Kota" status="explored" />
              <MapPoint x={50} y={45} label="Kelurahan Cakung" status="priority" />

              {/* Legend */}
              <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur rounded-lg p-2 text-xs">
                <div className="flex gap-3 justify-center">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span> Prioritas
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span> Dijelajahi
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span> Potensial
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Territory List */}
        <div className="px-4 mt-4 space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-900">Daftar Wilayah</h3>
            <span className="text-sm text-slate-500">{filteredTerritories.length} wilayah</span>
          </div>

          {filteredTerritories.map((territory) => (
            <div
              key={territory.id}
              className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 active:scale-[0.99] transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{territory.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{territory.description}</p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-[10px] font-bold border ${statusColors[territory.status]}`}
                >
                  {zoneLabels[territory.status]}
                </span>
              </div>

              {/* Progress */}
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-slate-500">Progress Coverage</span>
                  <span className="text-xs font-bold text-slate-700">{territory.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${progressColors[territory.status]}`}
                    style={{ width: `${territory.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {territory.agents} agen
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {territory.lastVisit}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          ))}

          {filteredTerritories.length === 0 && (
            <div className="text-center py-8">
              <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">Tidak ada wilayah ditemukan</p>
            </div>
          )}
        </div>
      </div>

      {/* FAB */}
      <button className="fixed bottom-24 right-4 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 active:scale-95 transition-all cursor-pointer z-50">
        <Plus className="w-6 h-6" />
      </button>

      <BottomNav />
    </>
  );
}
