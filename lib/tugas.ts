import { supabase } from './supabase';
import { tugasData, type Tugas } from './tugasData';

// Fetch all tugas ordered by urutan
export async function fetchAllTugas(): Promise<Tugas[]> {
  try {
    const { data, error } = await supabase
      .from('tugas')
      .select('*')
      .order('urutan', { ascending: true });

    if (error || !data || data.length === 0) {
      // Fallback to local data
      return tugasData;
    }

    return data as Tugas[];
  } catch {
    return tugasData;
  }
}

// Fetch single tugas by id
export async function fetchTugasById(id: number): Promise<Tugas | null> {
  try {
    const { data, error } = await supabase
      .from('tugas')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return tugasData.find((t) => t.id === id) || null;
    }

    return data as Tugas;
  } catch {
    return tugasData.find((t) => t.id === id) || null;
  }
}

// Fetch completed tugas IDs for a user
export async function fetchCompletedTugasIds(userId: string): Promise<number[]> {
  try {
    const { data, error } = await supabase
      .from('tugas_progress')
      .select('tugas_id')
      .eq('user_id', userId);

    if (error || !data) {
      return [];
    }

    return data.map((d: { tugas_id: number }) => d.tugas_id);
  } catch {
    return [];
  }
}

// Mark a tugas as completed
export async function completeTugas(userId: string, tugasId: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('tugas_progress')
      .insert({ user_id: userId, tugas_id: tugasId });

    return !error;
  } catch {
    return false;
  }
}
