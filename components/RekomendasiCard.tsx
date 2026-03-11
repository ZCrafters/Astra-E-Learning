'use client';

import { MapPin, ArrowRight } from 'lucide-react';
import { type RiskLevel, riskLabels, riskColors, getPrioritas } from '@/lib/riskData';

interface RekomendasiCardProps {
  kelurahan: string;
  kontrak: number;
  risk: RiskLevel;
  branch: string;
}

export default function RekomendasiCard({ kelurahan, kontrak, risk, branch }: RekomendasiCardProps) {
  const prioritas = getPrioritas(kontrak, risk);

  return (
    <div
      className={`rounded-xl p-4 border ${prioritas.color} ${prioritas.borderColor} transition-all active:scale-[0.99]`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-white/70 rounded-lg">
            <MapPin className="w-5 h-5 text-slate-600" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900">{kelurahan}</h4>
            <p className="text-xs text-slate-500 mt-0.5">{branch}</p>
          </div>
        </div>
        <span
          className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${prioritas.color} ${prioritas.textColor} border ${prioritas.borderColor}`}
        >
          {prioritas.emoji} {prioritas.label}
        </span>
      </div>

      <div className="flex items-center gap-4 mb-3">
        <div className="text-sm">
          <span className="text-slate-500">Kontrak: </span>
          <span className="font-bold text-slate-900">{kontrak}</span>
        </div>
        <div className="text-sm">
          <span className="text-slate-500">Risiko: </span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${riskColors[risk]}`}>
            {riskLabels[risk]}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <ArrowRight className={`w-4 h-4 ${prioritas.textColor}`} />
        <span className={`font-medium ${prioritas.textColor}`}>{prioritas.action}</span>
      </div>
    </div>
  );
}
