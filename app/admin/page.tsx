'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { exportToExcel } from '@/lib/exportExcel';
import { Shield, Download, LogOut, Users, FileSpreadsheet } from 'lucide-react';

interface RingkasanPAO {
  nama: string;
  no_hp: string;
  wilayah: string;
  tugas_selesai: number;
  total_xp: number;
  level: string;
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [data, setData] = useState<RingkasanPAO[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [exporting, setExporting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      // NOTE: In production, use proper password hashing (bcrypt/argon2).
      // The current approach compares password_hash as plaintext per project requirements.
      const { data: admin, error } = await supabase
        .from('admins')
        .select('id, username')
        .eq('username', username)
        .eq('password_hash', password)
        .single();

      if (error || !admin) {
        setLoginError('Username atau password salah');
        setLoginLoading(false);
        return;
      }

      setIsLoggedIn(true);
      await loadData();
    } catch (err) {
      console.error('Admin login error:', err);
      setLoginError('Gagal login. Periksa koneksi dan coba lagi.');
    }
    setLoginLoading(false);
  };

  const loadData = async () => {
    setDataLoading(true);
    try {
      const { data: ringkasan, error } = await supabase
        .from('admin_ringkasan_pao')
        .select('*');

      if (!error && ringkasan) {
        setData(ringkasan as RingkasanPAO[]);
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    }
    setDataLoading(false);
  };

  const handleExport = async () => {
    if (data.length === 0) return;
    setExporting(true);
    const today = new Date().toISOString().split('T')[0];
    await exportToExcel(
      data as unknown as Record<string, unknown>[],
      `Ringkasan_PAO_${today}.xlsx`
    );
    setExporting(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setData([]);
  };

  // Login form
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Panel</h1>
            <p className="text-slate-500 text-sm mt-1">PAO Finatra E-Learning</p>
          </div>

          <form onSubmit={handleLogin} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="Masukkan username"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="Masukkan password"
                required
              />
            </div>

            {loginError && (
              <p className="text-red-500 text-sm font-medium">{loginError}</p>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
            >
              {loginLoading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900">Admin Dashboard</h1>
              <p className="text-xs text-slate-500">Ringkasan Progress PAO</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <Users className="w-6 h-6 text-blue-600 mb-2" />
            <p className="text-2xl font-bold text-slate-900">{data.length}</p>
            <p className="text-xs text-slate-500 font-semibold">Total PAO</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <FileSpreadsheet className="w-6 h-6 text-emerald-600 mb-2" />
            <p className="text-2xl font-bold text-slate-900">
              {data.reduce((sum, d) => sum + d.tugas_selesai, 0)}
            </p>
            <p className="text-xs text-slate-500 font-semibold">Total Tugas Selesai</p>
          </div>
        </div>

        {/* Export Button */}
        <button
          onClick={handleExport}
          disabled={exporting || data.length === 0}
          className="w-full mb-6 py-3.5 bg-emerald-600 text-white rounded-2xl font-bold text-sm hover:bg-emerald-700 disabled:bg-slate-300 transition-colors flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          {exporting ? 'Mengunduh...' : 'Download Excel'}
        </button>

        {/* Data Table */}
        {dataLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="font-semibold">Belum ada data PAO</p>
            <p className="text-sm">Data akan muncul setelah PAO menyelesaikan tugas</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left px-4 py-3 font-bold text-slate-700">Nama</th>
                    <th className="text-left px-4 py-3 font-bold text-slate-700">No HP</th>
                    <th className="text-left px-4 py-3 font-bold text-slate-700">Wilayah</th>
                    <th className="text-center px-4 py-3 font-bold text-slate-700">Tugas</th>
                    <th className="text-center px-4 py-3 font-bold text-slate-700">XP</th>
                    <th className="text-center px-4 py-3 font-bold text-slate-700">Level</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, i) => (
                    <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900">{row.nama}</td>
                      <td className="px-4 py-3 text-slate-600">{row.no_hp}</td>
                      <td className="px-4 py-3 text-slate-600">{row.wilayah}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-bold">
                          {row.tugas_selesai}/10
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center font-semibold text-amber-600">{row.total_xp}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          row.level === 'Master' ? 'bg-purple-100 text-purple-700' :
                          row.level === 'Expert' ? 'bg-emerald-100 text-emerald-700' :
                          row.level === 'Advanced' ? 'bg-blue-100 text-blue-700' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {row.level}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
