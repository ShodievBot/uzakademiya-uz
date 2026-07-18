import type {Metadata} from 'next';
import Link from 'next/link';
import {redirect} from 'next/navigation';
import {getCurrentAdminUser} from '@/lib/admin-auth';
import NewUsefulPageForm from './new-useful-page-form';

export const metadata: Metadata = {
  title: 'Create useful page | Admin'
};

export default async function AdminUsefulCreatePage() {
  const user = await getCurrentAdminUser();

  if (!user) {
    redirect('/admin/login');
  }

  if (user.role !== 'SUPERADMIN' && user.role !== 'EDITOR') {
    redirect('/admin');
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-[#F1D8C8] bg-white/95 p-6 shadow-[0_20px_60px_-30px_rgba(251,146,60,0.28)] md:p-8">
        <div className="mb-6 flex flex-col gap-4 border-b border-slate-100 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-600">
              Useful page
            </span>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              Create useful page
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">
              Create a new useful page manually or paste JSON to auto-fill the form.
            </p>
          </div>

          <Link
            href="/admin/useful"
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Back to useful pages
          </Link>
        </div>

        <NewUsefulPageForm />
      </section>
    </div>
  );
}
