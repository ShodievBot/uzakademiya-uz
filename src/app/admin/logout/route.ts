import {NextResponse} from 'next/server';
import {clearAdminSession} from '@/lib/admin-auth';

export async function GET() {
  await clearAdminSession();
  return NextResponse.redirect(new URL('/admin/login', process.env.SITE_URL || 'http://localhost:3000'));
}
