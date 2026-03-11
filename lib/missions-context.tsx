'use client';

import { createContext, useContext, useState, useCallback, useSyncExternalStore } from 'react';
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

const STORAGE_KEY = 'pao_completed_missions';

let listeners: Array<() => void> = [];

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(listener: () => void) {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function getSnapshot(): string[] {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // ignore
    }
  }
  return [];
}

const emptyArray: string[] = [];
function getServerSnapshot(): string[] {
  return emptyArray;
}

function setStoredMissions(missions: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(missions));
  emitChange();
}

const MissionsContext = createContext<MissionsContextType | undefined>(undefined);

export function MissionsProvider({ children }: { children: React.ReactNode }) {
  const completedMissions = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

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
    const current = getSnapshot();
    if (current.includes(id)) return;
    setStoredMissions([...current, id]);
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
