import type {Metadata} from 'next';
import Link from 'next/link';
import {redirect} from 'next/navigation';
import {getCurrentAdminUser} from '@/lib/admin-auth';
import {getAllLegislation, pickLocalizedText} from '@/lib/legislation';

export const metadata: Metadata = {
  title: 'Legislation | Admin'
};

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

const categoryLabels: Record<string, string> = {
  science: 'Scientific activity',
  attestation: 'Attestation',
  ethics: 'Publication ethics'
};

export default async function AdminLegislationListPage() {
  const user = await getCurrentAdminUser();

  if (!user) {
    redirect('/admin/login');
  }

  if (user.role !== 'SUPERADMIN' && user.role !== 'EDITOR') {
    redirect('/admin');
  }

  const documents = await getAllLegislation();

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-[#F1D8C8] bg-gradient-to-br from-white via-[#FFF9F5] to-[#FFF4ED] p-6 shadow-[0_16px_42px_rgba(17,17,17,0.06)] sm:p-8">
        <div className="inline-flex rounded-full border border-[#FFD8C2] bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#FF6C26]">
          Legislation
        </div>

        <h1 className="mt-5 text-3xl font-bold tracking-tight text-[#111111] sm:text-[36px]">
          Legislation documents
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-7 text-[#5B5B5B] sm:text-[15px]">
          Review official documents, categories, multilingual summaries and
          publication dates. The document editor will be connected in the next
          batch.
        </p>

        <div className="mt-6">
          <Link
            href="/admin"
            className="inline-flex rounded-2xl border border-[#ECE3DC] bg-white px-5 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#FFF8F3]"
          >
            Back to dashboard
          </Link>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        {documents.map((doc) => (
          <article
            key={doc.slug}
            className="rounded-[28px] border border-[#ECE3DC] bg-white p-6 shadow-[0_10px_28px_rgba(17,17,17,0.05)]"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#FFF8F3] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#B56A42]">
                /{doc.slug}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                {categoryLabels[doc.category] || doc.category}
              </span>
            </div>

            <h2 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-[#111111]">
              {pickLocalizedText(doc.title, 'ru')}
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#5C5C5C]">
              {pickLocalizedText(doc.summary, 'ru')}
            </p>

            <div className="mt-5 flex flex-wrap gap-3 text-sm text-[#6B6B6B]">
              <span className="rounded-full bg-[#FFF8F3] px-3 py-1">
                Paragraphs: {doc.body.length}
              </span>
              <span className="rounded-full bg-[#FFF8F3] px-3 py-1">
                Published: {formatDate(doc.publishedAt)}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={doc.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-2xl border border-[#ECE3DC] bg-white px-5 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#FFF8F3]"
              >
                Open source
              </a>

              <span className="inline-flex items-center justify-center rounded-2xl bg-[#111111] px-5 py-3 text-sm font-semibold text-white">
                Editor in part 2
              </span>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
