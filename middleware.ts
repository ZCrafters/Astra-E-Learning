import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Public paths that don't require auth
  const publicPaths = ['/login', '/_next', '/api', '/favicon.ico'];
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));
  
  // Check for auth - in dev mode without Supabase, we check for device_id or localStorage simulation
  const deviceId = request.cookies.get('pao_device_id')?.value;
  
  // Skip auth check for static files
  if (pathname.includes('.')) {
    return NextResponse.next();
  }
  
  // Allow all access in development (when Supabase not configured)
  const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!isSupabaseConfigured) {
    // Development mode - allow access, client-side will handle auth state
    return NextResponse.next();
  }
  
  // Production mode with Supabase
  const authToken = request.cookies.get('sb-access-token')?.value;
  
  if (!isPublicPath && !authToken && !deviceId) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Redirect to home if already logged in and trying to access login
  if (pathname === '/login' && (authToken || deviceId)) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
