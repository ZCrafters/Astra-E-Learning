'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Filter, ArrowUpDown, BarChart3, MapPin } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import RekomendasiCard from '@/components/RekomendasiCard';
import { wilayahData, getBranches } from '@/lib/wilayahData';
import { riskData, type RiskLevel, riskLabels, getPrioritas } from '@/lib/riskData';

type SortField = 'kontrak' | 'risk' | 'prioritas';
type SortDirection = 'asc' | 'desc';
type ViewMode = 'table' | 'cards';

const prioritasOrder = { 'Prioritas 1': 0, 'Prioritas 2': 1, 'Hindari dulu': 2 };

export default function AnalisisPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBranch, setFilterBranch] = useState<string>('all');
  const [filterRisk, setFilterRisk] = useState<RiskLevel | 'all'>('all');
  const [filterKontrak, setFilterKontrak] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('prioritas');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [viewMode, setViewMode] = useState<ViewMode>('cards');

  const branches = useMemo(() => getBranches(), []);

  const enrichedData = useMemo(() => {
    return wilayahData.map((w) => {
      const risk = riskData[w.id] || 'medium';
      const prioritas = getPrioritas(w.kontrak, risk);
      return { ...w, risk, prioritas };
    });
  }, []);

  const filteredAndSorted = useMemo(() => {
    let result = enrichedData;

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (w) =>
          w.kelurahan.toLowerCase().includes(q) || w.branch.toLowerCase().includes(q)
      );
    }

    // Filter by branch
    if (filterBranch !== 'all') {
      result = result.filter((w) => w.branch === filterBranch);
    }

    // Filter by risk
    if (filterRisk !== 'all') {
      result = result.filter((w) => w.risk === filterRisk);
    }

    // Filter by kontrak range
    if (filterKontrak !== 'all') {
      switch (filterKontrak) {
        case 'high':
          result = result.filter((w) => w.kontrak > 15);
          break;
        case 'medium':
          result = result.filter((w) => w.kontrak >= 5 && w.kontrak <= 15);
          break;
        case 'low':
          result = result.filter((w) => w.kontrak < 5);
          break;
      }
    }

    // Sort
    result = [...result].sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case 'kontrak':
          cmp = a.kontrak - b.kontrak;
          break;
        case 'risk': {
          const riskOrder: Record<RiskLevel, number> = { low: 0, medium: 1, high: 2 };
          cmp = riskOrder[a.risk] - riskOrder[b.risk];
          break;
        }
        case 'prioritas':
          cmp =
            prioritasOrder[a.prioritas.label] - prioritasOrder[b.prioritas.label];
          // Secondary sort by kontrak descending for same priority
          if (cmp === 0) cmp = b.kontrak - a.kontrak;
          break;
      }
      return sortDirection === 'asc' ? cmp : -cmp;
    });

    return result;
  }, [enrichedData, searchQuery, filterBranch, filterRisk, filterKontrak, sortField, sortDirection]);

  // Summary stats
  const stats = useMemo(() => {
    const p1 = enrichedData.filter((w) => w.prioritas.label === 'Prioritas 1').length;
    const p2 = enrichedData.filter((w) => w.prioritas.label === 'Prioritas 2').length;
    const avoid = enrichedData.filter((w) => w.prioritas.label === 'Hindari dulu').length;
    const totalKontrak = enrichedData.reduce((sum, w) => sum + w.kontrak, 0);
    return { p1, p2, avoid, totalKontrak };
  }, [enrichedData]);

  function toggleSort(field: SortField) {
    if (sortField === field) {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  }

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
              <h1 className="text-xl font-bold text-slate-900">Analisis Wilayah</h1>
              <p className="text-sm text-slate-500">Data kontrak & rekomendasi prioritas</p>
            </div>
          </div>
        </header>

        {/* Summary Cards */}
        <div className="p-4 grid grid-cols-2 gap-3">
          <div className="bg-green-50 rounded-xl p-3 text-center border border-green-100">
            <p className="text-2xl font-bold text-green-600">{stats.p1}</p>
            <p className="text-xs text-slate-500 mt-1">🟢 Prioritas 1</p>
          </div>
          <div className="bg-yellow-50 rounded-xl p-3 text-center border border-yellow-100">
            <p className="text-2xl font-bold text-yellow-600">{stats.p2}</p>
            <p className="text-xs text-slate-500 mt-1">🟡 Prioritas 2</p>
          </div>
          <div className="bg-red-50 rounded-xl p-3 text-center border border-red-100">
            <p className="text-2xl font-bold text-red-600">{stats.avoid}</p>
            <p className="text-xs text-slate-500 mt-1">🔴 Hindari Dulu</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-3 text-center border border-blue-100">
            <p className="text-2xl font-bold text-blue-600">{stats.totalKontrak}</p>
            <p className="text-xs text-slate-500 mt-1">📊 Total Kontrak</p>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari kelurahan atau cabang..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="px-4 mt-3">
          <div className="bg-white rounded-xl p-3 border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {/* Branch filter */}
              <select
                value={filterBranch}
                onChange={(e) => setFilterBranch(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Semua Cabang</option>
                {branches.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>

              <div className="grid grid-cols-2 gap-2">
                {/* Risk filter */}
                <select
                  value={filterRisk}
                  onChange={(e) => setFilterRisk(e.target.value as RiskLevel | 'all')}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Semua Risiko</option>
                  <option value="low">🟢 Rendah</option>
                  <option value="medium">🟡 Sedang</option>
                  <option value="high">🔴 Tinggi</option>
                </select>

                {/* Kontrak filter */}
                <select
                  value={filterKontrak}
                  onChange={(e) => setFilterKontrak(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Semua Kontrak</option>
                  <option value="high">&gt;15 Kontrak</option>
                  <option value="medium">5-15 Kontrak</option>
                  <option value="low">&lt;5 Kontrak</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* View Mode & Sort Controls */}
        <div className="px-4 mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                viewMode === 'cards'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 inline mr-1" />
              Kartu
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                viewMode === 'table'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 inline mr-1" />
              Tabel
            </button>
          </div>

          <div className="flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={`${sortField}-${sortDirection}`}
              onChange={(e) => {
                const [field, dir] = e.target.value.split('-') as [SortField, SortDirection];
                setSortField(field);
                setSortDirection(dir);
              }}
              className="px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none"
            >
              <option value="prioritas-asc">Prioritas ↑</option>
              <option value="prioritas-desc">Prioritas ↓</option>
              <option value="kontrak-desc">Kontrak ↓</option>
              <option value="kontrak-asc">Kontrak ↑</option>
              <option value="risk-asc">Risiko ↑</option>
              <option value="risk-desc">Risiko ↓</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="px-4 mt-3">
          <p className="text-sm text-slate-500">
            Menampilkan <span className="font-bold text-slate-700">{filteredAndSorted.length}</span> wilayah
          </p>
        </div>

        {/* Content: Cards or Table */}
        {viewMode === 'cards' ? (
          <div className="px-4 mt-3 space-y-3">
            {filteredAndSorted.map((w) => (
              <RekomendasiCard
                key={w.id}
                kelurahan={w.kelurahan}
                kontrak={w.kontrak}
                risk={w.risk}
                branch={w.branch}
              />
            ))}
          </div>
        ) : (
          <div className="px-4 mt-3">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th
                        className="text-left px-3 py-2.5 font-semibold text-slate-700"
                      >
                        Kelurahan
                      </th>
                      <th
                        className="text-center px-3 py-2.5 font-semibold text-slate-700 cursor-pointer hover:bg-slate-100"
                        onClick={() => toggleSort('kontrak')}
                      >
                        Kontrak {sortField === 'kontrak' && (sortDirection === 'asc' ? '↑' : '↓')}
                      </th>
                      <th
                        className="text-center px-3 py-2.5 font-semibold text-slate-700 cursor-pointer hover:bg-slate-100"
                        onClick={() => toggleSort('risk')}
                      >
                        Risiko {sortField === 'risk' && (sortDirection === 'asc' ? '↑' : '↓')}
                      </th>
                      <th
                        className="text-center px-3 py-2.5 font-semibold text-slate-700 cursor-pointer hover:bg-slate-100"
                        onClick={() => toggleSort('prioritas')}
                      >
                        Prioritas {sortField === 'prioritas' && (sortDirection === 'asc' ? '↑' : '↓')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAndSorted.map((w) => {
                      const riskColor =
                        w.risk === 'low'
                          ? 'bg-green-100 text-green-700'
                          : w.risk === 'medium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700';
                      return (
                        <tr
                          key={w.id}
                          className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                        >
                          <td className="px-3 py-2.5">
                            <div className="font-medium text-slate-900">{w.kelurahan}</div>
                            <div className="text-xs text-slate-400">{w.branch}</div>
                          </td>
                          <td className="px-3 py-2.5 text-center font-bold text-slate-900">
                            {w.kontrak}
                          </td>
                          <td className="px-3 py-2.5 text-center">
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium ${riskColor}`}
                            >
                              {riskLabels[w.risk]}
                            </span>
                          </td>
                          <td className="px-3 py-2.5 text-center">
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-bold ${w.prioritas.color} ${w.prioritas.textColor}`}
                            >
                              {w.prioritas.emoji} {w.prioritas.label}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {filteredAndSorted.length === 0 && (
          <div className="text-center py-8 px-4">
            <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">Tidak ada wilayah ditemukan</p>
          </div>
        )}
      </div>

      <BottomNav />
    </>
  );
}
