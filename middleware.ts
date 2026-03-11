import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Public paths that don't require auth
  const publicPaths = ['/login', '/admin', '/_next', '/api', '/favicon.ico'];
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));
  
  // Skip auth check for static files
  if (pathname.includes('.')) {
    return NextResponse.next();
  }
  
  // Allow all access in trial mode or development (when Supabase not configured)
  const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const isTrialMode = process.env.NEXT_PUBLIC_TRIAL_MODE === 'true';
  
  if (isTrialMode || !isSupabaseConfigured) {
    // Development mode - allow access, client-side will handle auth state
    return NextResponse.next();
  }
  
  // Production mode with Supabase
  const authToken = request.cookies.get('sb-access-token')?.value;
  
  if (!isPublicPath && !authToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Redirect to home if already logged in and trying to access login
  if (pathname === '/login' && authToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
