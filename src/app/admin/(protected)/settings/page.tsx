import type {Metadata} from 'next';
import Link from 'next/link';
import {getSiteSettings} from '@/lib/site-settings';
import SettingsForm from './settings-form';

export const metadata: Metadata = {
  title: 'Site settings | Admin'
};

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-orange-100 bg-white/95 p-6 shadow-[0_20px_60px_-30px_rgba(251,146,60,0.28)] md:p-8">
        <div className="mb-6 flex flex-col gap-4 border-b border-slate-100 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-600">
              Settings
            </span>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              Site settings
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">
              Manage the public site name, contact channels, social links and
              default locale from one place.
            </p>
          </div>

          <Link
            href="/admin"
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Back to dashboard
          </Link>
        </div>

        <SettingsForm initialValues={settings} />
      </section>
    </div>
  );
}
