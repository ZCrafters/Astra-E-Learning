import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

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
    <html lang="id" className={inter.variable}>
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
