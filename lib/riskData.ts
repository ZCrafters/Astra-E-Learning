// Data risiko per kelurahan berdasarkan current rate dari Excel
// Risk level: 'low' | 'medium' | 'high'

export type RiskLevel = 'low' | 'medium' | 'high';

export const riskData: Record<string, RiskLevel> = {
  // Bekasi Branch
  'bekasi-01': 'low',
  'bekasi-02': 'low',
  'bekasi-03': 'low',
  'bekasi-04': 'medium',
  'bekasi-05': 'medium',
  'bekasi-06': 'low',
  'bekasi-07': 'high',
  'bekasi-08': 'high',

  // Bekasi II
  'bekasi2-01': 'low',
  'bekasi2-02': 'low',
  'bekasi2-03': 'low',
  'bekasi2-04': 'medium',
  'bekasi2-05': 'medium',
  'bekasi2-06': 'low',

  // Depok Branch
  'depok-01': 'low',
  'depok-02': 'low',
  'depok-03': 'medium',
  'depok-04': 'medium',
  'depok-05': 'low',
  'depok-06': 'high',

  // Cileungsi Branch
  'cileungsi-01': 'low',
  'cileungsi-02': 'medium',
  'cileungsi-03': 'low',
  'cileungsi-04': 'medium',
  'cileungsi-05': 'high',
  'cileungsi-06': 'medium',
};

export type Prioritas = 'Prioritas 1' | 'Prioritas 2' | 'Hindari dulu';

export interface PrioritasInfo {
  label: Prioritas;
  color: string; // tailwind bg class
  textColor: string;
  borderColor: string;
  emoji: string;
  action: string;
}

/**
 * Determine priority based on kontrak count and risk level:
 * 🟢 >15 kontrak + risk low → "Prioritas 1"
 * 🟡 5-15 kontrak + risk low → "Prioritas 2"
 * 🔴 <5 kontrak OR risk high → "Hindari dulu"
 */
export function getPrioritas(kontrak: number, risk: RiskLevel): PrioritasInfo {
  if (risk === 'high' || kontrak < 5) {
    return {
      label: 'Hindari dulu',
      color: 'bg-red-100',
      textColor: 'text-red-700',
      borderColor: 'border-red-200',
      emoji: '🔴',
      action: 'Hindari area ini - risiko tinggi atau potensi rendah',
    };
  }

  if (kontrak > 15 && risk === 'low') {
    return {
      label: 'Prioritas 1',
      color: 'bg-green-100',
      textColor: 'text-green-700',
      borderColor: 'border-green-200',
      emoji: '🟢',
      action: 'Kunjungi hari ini - potensi besar!',
    };
  }

  return {
    label: 'Prioritas 2',
    color: 'bg-yellow-100',
    textColor: 'text-yellow-700',
    borderColor: 'border-yellow-200',
    emoji: '🟡',
    action: 'Potensi baik - jadwalkan kunjungan minggu ini',
  };
}

export const riskLabels: Record<RiskLevel, string> = {
  low: 'Rendah',
  medium: 'Sedang',
  high: 'Tinggi',
};

export const riskColors: Record<RiskLevel, string> = {
  low: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-red-100 text-red-700',
};
