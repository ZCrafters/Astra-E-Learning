'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from './supabase';
import type { User, AuthChangeEvent, Session } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  phone: string;
  name: string;
  region: string;
  device_id: string;
}

interface UserProgress {
  course_id: string;
  module_id: string;
  progress: number;
  completed_lessons: number;
  total_lessons: number;
  is_completed: boolean;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  progress: Map<string, UserProgress>;
  isLoading: boolean;
  isAuthenticated: boolean;
  deviceRegistered: boolean;
  loginWithOTP: (phone: string) => Promise<{ error: Error | null }>;
  verifyOTP: (phone: string, token: string, name?: string, region?: string) => Promise<{ error: Error | null }>;
  logout: () => Promise<void>;
  updateProgress: (courseId: string, moduleId: string, progress: number, completedLessons: number, totalLessons: number) => Promise<void>;
  getModuleProgress: (courseId: string, moduleId: string) => UserProgress | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Generate device ID
function getDeviceId(): string {
  if (typeof window === 'undefined') return '';
  
  let deviceId = localStorage.getItem('pao_device_id');
  if (!deviceId) {
    deviceId = 'dev_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('pao_device_id', deviceId);
  }
  return deviceId;
}

// Check if trial mode is enabled
const isTrialMode = () => {
  return process.env.NEXT_PUBLIC_TRIAL_MODE === 'true';
};

// Check if Supabase is configured
const isSupabaseConfigured = () => {
  return !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [progress, setProgress] = useState<Map<string, UserProgress>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [deviceRegistered, setDeviceRegistered] = useState(false);
  const [isDevMode, setIsDevMode] = useState(false);

  // Load saved profile from localStorage (for dev mode or when Supabase is not available)
  const loadLocalProfile = useCallback(() => {
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem('pao_profile');
    const savedProgress = localStorage.getItem('pao_progress');
    
    if (saved) {
      const parsed = JSON.parse(saved);
      setProfile(parsed);
      setDeviceRegistered(true);
      if (savedProgress) {
        const parsedProgress = JSON.parse(savedProgress);
        const progressMap = new Map<string, UserProgress>();
        if (Array.isArray(parsedProgress)) {
          parsedProgress.forEach((p: UserProgress) => {
            progressMap.set(p.module_id, p);
          });
        }
        setProgress(progressMap);
      }
      return parsed;
    }
    return null;
  }, []);

  // Save profile to localStorage
  const saveLocalProfile = (profileData: UserProfile) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('pao_profile', JSON.stringify(profileData));
  };

  // Save progress to localStorage
  const saveLocalProgress = useCallback((progressData: Map<string, UserProgress>) => {
    if (typeof window === 'undefined') return;
    const progressArray = Array.from(progressData.values());
    localStorage.setItem('pao_progress', JSON.stringify(progressArray));
  }, []);

  // Fetch user progress from Supabase
  const fetchUserProgress = useCallback(async (userId: string) => {
    if (!isSupabaseConfigured()) return;
    
    const { data } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId);
    
    if (data) {
      const progressMap = new Map<string, UserProgress>();
      data.forEach((p: UserProgress) => {
        progressMap.set(p.module_id, {
          course_id: p.course_id,
          module_id: p.module_id,
          progress: p.progress,
          completed_lessons: p.completed_lessons,
          total_lessons: p.total_lessons,
          is_completed: p.is_completed,
        });
      });
      setProgress(progressMap);
      saveLocalProgress(progressMap);
    }
  }, [saveLocalProgress]);

  // Check device registration via Supabase
  const checkDeviceRegistration = useCallback(async (deviceId: string) => {
    if (!isSupabaseConfigured()) return false;
    
    try {
      const { data, error } = await supabase
        .from('user_devices')
        .select('user_id, users(*)')
        .eq('device_id', deviceId)
        .single();

      if (data && !error) {
        const userData = data.users as any;
        const profileData = {
          id: userData.id,
          phone: userData.phone,
          name: userData.name,
          region: userData.region,
          device_id: deviceId,
        };
        setProfile(profileData);
        saveLocalProfile(profileData);
        setDeviceRegistered(true);
        await fetchUserProgress(userData.id);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, [fetchUserProgress]);

  // Initial auth check
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      
      // Check if trial mode or Supabase not configured
      if (isTrialMode() || !isSupabaseConfigured()) {
        console.info('Running in trial mode with localStorage. OTP code: 123456');
        setIsDevMode(true);
        // Try to load from localStorage
        const localProfile = loadLocalProfile();
        if (localProfile) {
          setDeviceRegistered(true);
        }
        setIsLoading(false);
        return;
      }
      
      // Check Supabase session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUser(session.user);
        
        const { data: profileData } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (profileData) {
          const profileObj = {
            id: profileData.id,
            phone: profileData.phone,
            name: profileData.name,
            region: profileData.region,
            device_id: profileData.device_id,
          };
          setProfile(profileObj);
          saveLocalProfile(profileObj);
          await fetchUserProgress(session.user.id);
        }
      } else {
        // Check device-based auto login
        const deviceId = getDeviceId();
        if (deviceId) {
          const registered = await checkDeviceRegistration(deviceId);
          if (!registered) {
            // Try localStorage fallback
            loadLocalProfile();
          }
        }
      }
      
      setIsLoading(false);
    };

    initAuth();

    // Listen for auth changes
    if (isSupabaseConfigured()) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, session: Session | null) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      });

      return () => subscription.unsubscribe();
    }
  }, [checkDeviceRegistration, loadLocalProfile, fetchUserProgress]);

  // Login with OTP
  const loginWithOTP = async (phone: string) => {
    const formattedPhone = phone.startsWith('0') 
      ? '+62' + phone.substring(1) 
      : phone.startsWith('+') ? phone : '+62' + phone;

    if (isDevMode) {
      // Dev mode: simulate OTP sent
      console.log(`[DEV] OTP sent to ${formattedPhone}: 123456`);
      return { error: null };
    }

    const { error } = await supabase.auth.signInWithOtp({
      phone: formattedPhone,
    });

    return { error };
  };

  // Verify OTP
  const verifyOTP = async (phone: string, token: string, nameInput?: string, regionInput?: string) => {
    const formattedPhone = phone.startsWith('0') 
      ? '+62' + phone.substring(1) 
      : phone.startsWith('+') ? phone : '+62' + phone;

    const deviceId = getDeviceId();
    
    // Use current profile data if available, otherwise use inputs
    const userName = nameInput || profile?.name || 'PAO User';
    const userRegion = regionInput || profile?.region || 'Jakarta';
    
    if (isDevMode) {
      // Dev mode: accept any 6-digit OTP
      if (token === '123456') {
        // Generate or reuse user ID
        const userId = profile?.id || 'dev-' + Math.random().toString(36).substring(2, 9);
        const profileData: UserProfile = {
          id: userId,
          phone: formattedPhone,
          name: userName,
          region: userRegion,
          device_id: deviceId,
        };
        setProfile(profileData);
        saveLocalProfile(profileData);
        setDeviceRegistered(true);
        setIsLoading(false);
        return { error: null };
      }
      return { error: new Error('Invalid OTP') };
    }

    const { data, error } = await supabase.auth.verifyOtp({
      phone: formattedPhone,
      token,
      type: 'sms',
    });

    if (data.user) {
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (!existingUser) {
        await supabase.from('users').insert({
          id: data.user.id,
          phone: formattedPhone,
          name: userName || 'PAO User',
          region: userRegion || 'Jakarta',
          device_id: deviceId,
        });
      }

      await supabase.from('user_devices').upsert({
        user_id: data.user.id,
        device_id: deviceId,
        device_name: navigator.userAgent,
        last_login: new Date().toISOString(),
      }, {
        onConflict: 'device_id'
      });

      const { data: profileData } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileData) {
        const profileObj = {
          id: profileData.id,
          phone: profileData.phone,
          name: profileData.name,
          region: profileData.region,
          device_id: deviceId,
        };
        setProfile(profileObj);
        saveLocalProfile(profileObj);
        await fetchUserProgress(data.user.id);
      }
      
      setDeviceRegistered(true);
    }

    return { error };
  };

  // Logout
  const logout = async () => {
    const deviceId = getDeviceId();
    
    if (!isDevMode && user) {
      await supabase
        .from('user_devices')
        .delete()
        .eq('device_id', deviceId);
      
      await supabase.auth.signOut();
    }
    
    setUser(null);
    setProfile(null);
    setProgress(new Map());
    setDeviceRegistered(false);
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('pao_profile');
      localStorage.removeItem('pao_progress');
      localStorage.removeItem('pao_device_id');
    }
  };

  // Update progress
  const updateProgress = async (
    courseId: string, 
    moduleId: string, 
    progressValue: number, 
    completedLessons: number,
    totalLessons: number
  ) => {
    const userId = user?.id || profile?.id;
    if (!userId) return;

    const isCompleted = progressValue >= 100;
    
    const newProgress: UserProgress = {
      course_id: courseId,
      module_id: moduleId,
      progress: progressValue,
      completed_lessons: completedLessons,
      total_lessons: totalLessons,
      is_completed: isCompleted,
    };

    // Update localStorage
    const updatedProgress = new Map(progress);
    updatedProgress.set(moduleId, newProgress);
    setProgress(updatedProgress);
    saveLocalProgress(updatedProgress);

    // Update Supabase if configured
    if (!isDevMode && isSupabaseConfigured()) {
      await supabase.from('user_progress').upsert({
        user_id: userId,
        course_id: courseId,
        module_id: moduleId,
        progress: progressValue,
        completed_lessons: completedLessons,
        total_lessons: totalLessons,
        is_completed: isCompleted,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id, module_id'
      });
    }
  };

  // Get module progress
  const getModuleProgress = (courseId: string, moduleId: string) => {
    const p = progress.get(moduleId);
    return p && p.course_id === courseId ? p : null;
  };

  const value: AuthContextType = {
    user,
    profile,
    progress,
    isLoading,
    isAuthenticated: !!user || !!profile,
    deviceRegistered,
    loginWithOTP,
    verifyOTP,
    logout,
    updateProgress,
    getModuleProgress,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
