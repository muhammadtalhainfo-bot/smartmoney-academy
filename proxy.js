import { updateSession } from '@/lib/supabase/proxy';

export async function proxy(request) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/certificate/:path*',
    '/api/((?!webhook|ticker|email-capture).*)',
    '/auth/callback',
  ],
};
