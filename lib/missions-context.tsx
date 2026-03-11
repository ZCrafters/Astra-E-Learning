'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { missionsData, TOTAL_WEEKLY_MISSIONS } from './missionData';

interface MissionsContextType {
  completedMissions: string[];
  totalXP: number;
  level: string;
  completedCount: number;
  weeklyCompleted: number;
  weeklyTotal: number;
  isMissionCompleted: (id: string) => boolean;
  completeMission: (id: string) => void;
}

function getLevel(xp: number): string {
  if (xp >= 501) return 'Juara';
  if (xp >= 201) return 'Petarung';
  return 'Pemula';
}

function loadCompletedMissions(): string[] {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('pao_completed_missions');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  }
  return [];
}

const MissionsContext = createContext<MissionsContextType | undefined>(undefined);

export function MissionsProvider({ children }: { children: React.ReactNode }) {
  const [completedMissions, setCompletedMissions] = useState<string[]>(loadCompletedMissions);

  // Save to localStorage on change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('pao_completed_missions', JSON.stringify(completedMissions));
  }, [completedMissions]);

  const totalXP = missionsData
    .filter((m) => completedMissions.includes(m.id))
    .reduce((sum, m) => sum + m.xp, 0);

  const level = getLevel(totalXP);
  const completedCount = completedMissions.length;
  const weeklyCompleted = Math.min(completedCount, TOTAL_WEEKLY_MISSIONS);
  const weeklyTotal = TOTAL_WEEKLY_MISSIONS;

  const isMissionCompleted = useCallback(
    (id: string) => completedMissions.includes(id),
    [completedMissions]
  );

  const completeMission = useCallback((id: string) => {
    setCompletedMissions((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  }, []);

  return (
    <MissionsContext.Provider
      value={{
        completedMissions,
        totalXP,
        level,
        completedCount,
        weeklyCompleted,
        weeklyTotal,
        isMissionCompleted,
        completeMission,
      }}
    >
      {children}
    </MissionsContext.Provider>
  );
}

export function useMissions() {
  const context = useContext(MissionsContext);
  if (context === undefined) {
    throw new Error('useMissions must be used within a MissionsProvider');
  }
  return context;
}
