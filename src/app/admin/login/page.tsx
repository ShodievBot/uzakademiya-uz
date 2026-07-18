import type {Metadata} from 'next';
import {redirect} from 'next/navigation';
import {getCurrentAdminUser} from '@/lib/admin-auth';
import {LoginForm} from './login-form';

export const metadata: Metadata = {
  title: 'Admin login',
  robots: {
    index: false,
    follow: false
  }
};

export default async function AdminLoginPage() {
  const user = await getCurrentAdminUser();

  if (user) {
    redirect('/admin');
  }

  return (
    <main className="min-h-screen bg-[#FFF8F3] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <div className="rounded-[32px] border border-[#F1D8C8] bg-white p-6 shadow-[0_16px_42px_rgba(17,17,17,0.08)] sm:p-8">
          <div className="inline-flex rounded-full border border-[#FFD8C2] bg-[#FFF8F3] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#FF6C26]">
            Admin
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-[#111111]">
            Sign in to admin panel
          </h1>

          <p className="mt-3 text-sm leading-7 text-[#5B5B5B]">
            Use your administrator account credentials to access the internal dashboard.
          </p>

          <LoginForm />
        </div>
      </div>
    </main>
  );
}
