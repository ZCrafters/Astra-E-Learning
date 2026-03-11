import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';

export const metadata: Metadata = {
  title: 'PAO Finatra E-Learning',
  description: 'Platform pembelajaran Partnership Account Officer untuk penetrasi agen RT/RW',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif' }}>
      <body className="bg-slate-100 text-slate-900 antialiased">
        <AuthProvider>
          <div className="max-w-md mx-auto min-h-screen bg-white shadow-xl">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
