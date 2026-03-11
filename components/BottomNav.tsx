'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, ClipboardList, TrendingUp, User } from 'lucide-react';
import { memo } from 'react';

const navItems = [
  { name: 'Beranda', path: '/', icon: Home },
  { name: 'Tugas', path: '/missions', icon: ClipboardList },
  { name: 'Kursus', path: '/courses', icon: BookOpen },
  { name: 'Profil', path: '/profile', icon: User },
] as const;

function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 z-50">
      <div className="max-w-md mx-auto px-2 py-2 flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = pathname === item.path || (pathname.startsWith(item.path) && item.path !== '/');
          const Icon = item.icon;
          return (
            <Link 
              key={item.name} 
              href={item.path}
              prefetch={true}
              className={`flex flex-col items-center gap-0.5 py-2 px-4 rounded-xl transition-colors cursor-pointer active:scale-95 ${
                isActive ? 'text-blue-600' : 'text-slate-400 hover:text-blue-500'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} />
              <span className="text-[10px] font-bold">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default memo(BottomNav);
