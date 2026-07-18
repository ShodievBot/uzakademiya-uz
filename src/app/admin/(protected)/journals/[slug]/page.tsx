import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound, redirect} from 'next/navigation';
import {getCurrentAdminUser} from '@/lib/admin-auth';
import {getJournalBySlug} from '@/lib/journals';
import type {JournalFormValues} from './actions';
import JournalForm from './journal-form';

export const metadata: Metadata = {
  title: 'Edit journal | Admin'
};

export default async function AdminJournalEditPage({
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
  const journal = await getJournalBySlug(slug);

  if (!journal) {
    notFound();
  }

  const initialValues: JournalFormValues = {
    slug: journal.slug,
    title: journal.title ?? '',
    titleRu: journal.titleRu ?? '',
    titleUz: journal.titleUz ?? '',
    shortDescription: journal.shortDescription ?? '',
    shortDescriptionRu: journal.shortDescriptionRu ?? '',
    shortDescriptionUz: journal.shortDescriptionUz ?? '',
    shortDescriptionEn: journal.shortDescriptionEn ?? '',
    publisher: journal.publisher ?? '',
    website: journal.website ?? '',
    coverImage: journal.coverImage ?? '',
    issn: journal.issn ?? '',
    eissn: journal.eissn ?? '',
    country: journal.country ?? '',
    languagesText: (journal.languages ?? []).join('\n'),
    subjectAreasText: (journal.subjectAreas ?? []).join('\n'),
    categoriesText: (journal.categories ?? []).join('\n'),
    isScopusIndexed: journal.isScopusIndexed,
    isOakRecommended: journal.isOakRecommended,
    scopusCoverageYears: journal.scopusCoverageYears ?? '',
    citescore2025:
      journal.citescore2025 === null || journal.citescore2025 === undefined
        ? ''
        : String(journal.citescore2025),
    citescore2026:
      journal.citescore2026 === null || journal.citescore2026 === undefined
        ? ''
        : String(journal.citescore2026),
    percentile:
      journal.percentile === null || journal.percentile === undefined
        ? ''
        : String(journal.percentile),
    quartile: (journal.quartile ?? '') as JournalFormValues['quartile'],
    verificationStatus: (journal.verificationStatus ?? '') as JournalFormValues['verificationStatus'],
    telegramUrl: journal.telegramUrl ?? '',
    submissionUrl: journal.submissionUrl ?? '',
    scopusContentJson: JSON.stringify(journal.scopusContent ?? [], null, 2)
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-[#F1D8C8] bg-white/95 p-6 shadow-[0_20px_60px_-30px_rgba(251,146,60,0.28)] md:p-8">
        <div className="mb-6 flex flex-col gap-4 border-b border-slate-100 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-600">
              Journal
            </span>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              Edit journal
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">
              Update multilingual content, indexing flags, metrics, links and
              Scopus yearly rows for the selected journal.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/journals"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Back to journals
            </Link>

            <Link
              href={`/ru/journals/${journal.slug}`}
              target="_blank"
              style={{color: '#ffffff'}}
              className="inline-flex min-w-[170px] items-center justify-center rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-medium leading-none whitespace-nowrap transition hover:bg-slate-700"
            >
              <span style={{color: '#ffffff'}}>Open public page</span>
            </Link>
          </div>
        </div>

        <JournalForm slug={slug} initialValues={initialValues} />
      </section>
    </div>
  );
}
