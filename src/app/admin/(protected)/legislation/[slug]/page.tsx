import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound, redirect} from 'next/navigation';
import {getCurrentAdminUser} from '@/lib/admin-auth';
import {getLegislationBySlug} from '@/lib/legislation';
import type {LegislationFormValues} from './actions';
import LegislationForm from './legislation-form';

export const metadata: Metadata = {
  title: 'Edit legislation document | Admin'
};

export default async function AdminLegislationEditPage({
  params
}: {
  params: Promise<{slug: string}>;
}) {
  const user = await getCurrentAdminUser();

  if (!user) {
    redirect('/admin/login');
  }

  if (user.role !== 'SUPERADMIN' && user.role !== 'EDITOR') {
    redirect('/admin');
  }

  const {slug} = await params;
  const document = await getLegislationBySlug(slug);

  if (!document) {
    notFound();
  }

  const initialValues: LegislationFormValues = {
    slug: document.slug,
    category: document.category,
    publishedAt: document.publishedAt.slice(0, 10),
    titleRu: document.title.ru,
    titleUz: document.title.uz,
    titleEn: document.title.en,
    summaryRu: document.summary.ru,
    summaryUz: document.summary.uz,
    summaryEn: document.summary.en,
    sourceUrl: document.sourceUrl,
    sourceLabelRu: document.sourceLabel.ru,
    sourceLabelUz: document.sourceLabel.uz,
    sourceLabelEn: document.sourceLabel.en,
    bodyJson: JSON.stringify(document.body, null, 2)
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-[#F1D8C8] bg-white/95 p-6 shadow-[0_20px_60px_-30px_rgba(251,146,60,0.28)] md:p-8">
        <div className="mb-6 flex flex-col gap-4 border-b border-slate-100 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-600">
              Legislation
            </span>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              Edit legislation document
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">
              Update multilingual content, source data and structured body
              paragraphs for the selected document.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/legislation"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Back to legislation
            </Link>

            <Link
              href={`/ru/legislation/${document.slug}`}
              target="_blank"
              style={{color: '#ffffff'}}
              className="inline-flex min-w-[170px] items-center justify-center rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-medium leading-none whitespace-nowrap transition hover:bg-slate-700"
            >
              <span style={{color: '#ffffff'}}>Open public page</span>
            </Link>
          </div>
        </div>

        <LegislationForm slug={slug} initialValues={initialValues} />
      </section>
    </div>
  );
}
