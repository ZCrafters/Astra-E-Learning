'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Home, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 px-6">
      <div className="text-center">
        <div className="bg-red-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <RefreshCw className="w-12 h-12 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Something went wrong</h1>
        <p className="text-slate-500 mb-8 max-w-xs mx-auto">
          We apologize for the inconvenience. Please try again.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-[0.98]"
          >
            <RefreshCw className="w-5 h-5" />
            Coba Lagi
          </button>
          <Link 
            href="/" 
            className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 font-bold py-4 px-8 rounded-2xl hover:bg-slate-50 transition-all"
          >
            <Home className="w-5 h-5" />
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
