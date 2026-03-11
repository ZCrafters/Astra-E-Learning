import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a mock client if credentials are not available (for development without Supabase)
const createMockClient = () => {
  console.warn('Supabase credentials not found. Using mock client for development.');
  return {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithOtp: () => Promise.resolve({ error: new Error('Supabase not configured') }),
      verifyOtp: () => Promise.resolve({ data: { user: null }, error: new Error('Supabase not configured') }),
      signOut: () => Promise.resolve({ error: null }),
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: () => Promise.resolve({ data: null, error: null }),
        }),
        single: () => Promise.resolve({ data: null, error: null }),
      }),
      insert: () => Promise.resolve({ error: null }),
      upsert: () => Promise.resolve({ error: null }),
      delete: () => Promise.resolve({ error: null }),
    }),
  } as any;
};

export const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : createMockClient();

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          phone: string;
          name: string;
          region: string;
          device_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          phone: string;
          name: string;
          region: string;
          device_id: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          module_id: string;
          progress: number;
          completed_lessons: number;
          total_lessons: number;
          is_completed: boolean;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          course_id: string;
          module_id: string;
          progress?: number;
          completed_lessons?: number;
          total_lessons: number;
          is_completed?: boolean;
          updated_at?: string;
        };
      };
      user_devices: {
        Row: {
          id: string;
          user_id: string;
          device_id: string;
          device_name: string;
          last_login: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          device_id: string;
          device_name: string;
          last_login?: string;
          created_at?: string;
        };
      };
      tugas: {
        Row: {
          id: number;
          judul: string;
          kategori: string;
          durasi: string;
          xp: number;
          urutan: number;
          langkah: string[];
        };
        Insert: {
          id?: number;
          judul: string;
          kategori: string;
          durasi: string;
          xp?: number;
          urutan?: number;
          langkah: string[];
        };
      };
      tugas_progress: {
        Row: {
          id: string;
          user_id: string;
          tugas_id: number;
          completed_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          tugas_id: number;
          completed_at?: string;
        };
      };
      admins: {
        Row: {
          id: string;
          username: string;
          password_hash: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          username: string;
          password_hash: string;
          created_at?: string;
        };
      };
    };
  };
};
