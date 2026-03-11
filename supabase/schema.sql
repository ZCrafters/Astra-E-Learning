-- Supabase Schema for PAO Finatra E-Learning
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  region TEXT NOT NULL DEFAULT 'Jakarta',
  device_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL,
  module_id TEXT NOT NULL,
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  completed_lessons INTEGER DEFAULT 0,
  total_lessons INTEGER NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, module_id)
);

-- User devices table (for remember device feature)
CREATE TABLE IF NOT EXISTS user_devices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  device_id TEXT UNIQUE NOT NULL,
  device_name TEXT,
  last_login TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_module ON user_progress(course_id, module_id);
CREATE INDEX IF NOT EXISTS idx_user_devices_device_id ON user_devices(device_id);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_devices ENABLE ROW LEVEL SECURITY;

-- Policies for users table
CREATE POLICY "Users can view own data" 
  ON users FOR SELECT 
  USING (auth.uid() = id OR device_id = current_setting('app.device_id', true));

CREATE POLICY "Users can insert own data" 
  ON users FOR INSERT 
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own data" 
  ON users FOR UPDATE 
  USING (auth.uid() = id);

-- Policies for user_progress table
CREATE POLICY "Users can view own progress" 
  ON user_progress FOR SELECT 
  USING (user_id IN (SELECT id FROM users WHERE id = auth.uid() OR device_id = current_setting('app.device_id', true)));

CREATE POLICY "Users can insert own progress" 
  ON user_progress FOR INSERT 
  WITH CHECK (user_id IN (SELECT id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can update own progress" 
  ON user_progress FOR UPDATE 
  USING (user_id IN (SELECT id FROM users WHERE id = auth.uid()));

-- Policies for user_devices table
CREATE POLICY "Users can view own devices" 
  ON user_devices FOR SELECT 
  USING (user_id IN (SELECT id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can manage own devices" 
  ON user_devices FOR ALL 
  USING (user_id IN (SELECT id FROM users WHERE id = auth.uid()));

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at 
  BEFORE UPDATE ON users 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_progress_updated_at ON user_progress;
CREATE TRIGGER update_user_progress_updated_at 
  BEFORE UPDATE ON user_progress 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- NEW TABLES FOR TUGAS FEATURE
-- =============================================

-- Tugas table
CREATE TABLE IF NOT EXISTS tugas (
  id SERIAL PRIMARY KEY,
  judul TEXT NOT NULL,
  kategori TEXT NOT NULL CHECK (kategori IN ('Cari Wilayah', 'Kenali Orang', 'Hitung Data')),
  durasi TEXT NOT NULL,
  xp INTEGER NOT NULL DEFAULT 0,
  urutan INTEGER NOT NULL DEFAULT 0,
  langkah TEXT[] NOT NULL DEFAULT '{}'
);

-- Tugas progress table (tracks which user completed which tugas)
CREATE TABLE IF NOT EXISTS tugas_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  tugas_id INTEGER REFERENCES tugas(id) ON DELETE CASCADE,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, tugas_id)
);

-- Admins table
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for new tables
CREATE INDEX IF NOT EXISTS idx_tugas_progress_user_id ON tugas_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_tugas_progress_tugas_id ON tugas_progress(tugas_id);
CREATE INDEX IF NOT EXISTS idx_tugas_urutan ON tugas(urutan);

-- Enable RLS on new tables
ALTER TABLE tugas ENABLE ROW LEVEL SECURITY;
ALTER TABLE tugas_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Policies for tugas (read-only for all authenticated users)
CREATE POLICY "Anyone can read tugas"
  ON tugas FOR SELECT
  USING (true);

-- Policies for tugas_progress
CREATE POLICY "Users can view own tugas progress"
  ON tugas_progress FOR SELECT
  USING (user_id IN (SELECT id FROM users WHERE id = auth.uid() OR device_id = current_setting('app.device_id', true)));

CREATE POLICY "Users can insert own tugas progress"
  ON tugas_progress FOR INSERT
  WITH CHECK (user_id IN (SELECT id FROM users WHERE id = auth.uid()));

-- Policies for admins (read-only for login check)
CREATE POLICY "Anyone can read admins for login"
  ON admins FOR SELECT
  USING (true);

-- =============================================
-- VIEWS FOR ADMIN
-- =============================================

-- Admin summary view: ringkasan per PAO
CREATE OR REPLACE VIEW admin_ringkasan_pao AS
SELECT
  u.name AS nama,
  u.phone AS no_hp,
  u.region AS wilayah,
  COUNT(tp.id) AS tugas_selesai,
  COALESCE(SUM(t.xp), 0) AS total_xp,
  CASE
    WHEN COALESCE(SUM(t.xp), 0) >= 500 THEN 'Master'
    WHEN COALESCE(SUM(t.xp), 0) >= 300 THEN 'Expert'
    WHEN COALESCE(SUM(t.xp), 0) >= 150 THEN 'Advanced'
    ELSE 'Beginner'
  END AS level
FROM users u
LEFT JOIN tugas_progress tp ON u.id = tp.user_id
LEFT JOIN tugas t ON tp.tugas_id = t.id
GROUP BY u.id, u.name, u.phone, u.region;

-- Admin detail view: detail per tugas per user
CREATE OR REPLACE VIEW admin_detail_tugas AS
SELECT
  u.name AS nama_pao,
  u.phone AS no_hp,
  t.judul AS nama_tugas,
  t.kategori,
  t.xp,
  tp.completed_at AS waktu_selesai
FROM tugas_progress tp
JOIN users u ON tp.user_id = u.id
JOIN tugas t ON tp.tugas_id = t.id
ORDER BY tp.completed_at DESC;
