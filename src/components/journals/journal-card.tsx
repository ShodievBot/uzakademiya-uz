import Link from 'next/link';
import {Journal} from '@/types/journal';
import {
  getJournalPublishHref,
  getJournalPublishLabel
} from '@/lib/journal-links';

type JournalCardProps = {
  journal: Journal;
  locale?: string;
};

function getCopy(locale: string) {
  if (locale === 'uz') {
    return {
      details: 'Batafsil',
      publisher: 'Nashriyot',
      issn: 'ISSN',
      subjects: 'Yo‘nalishlar',
      citescore: 'CiteScore 2025'
    };
  }

  if (locale === 'en') {
    return {
      details: 'Details',
      publisher: 'Publisher',
      issn: 'ISSN',
      subjects: 'Subjects',
      citescore: 'CiteScore 2025'
    };
  }

  return {
    details: 'Подробнее',
    publisher: 'Издатель',
    issn: 'ISSN',
    subjects: 'Отрасли',
    citescore: 'CiteScore 2025'
  };
}

export function JournalCard({journal, locale = 'ru'}: JournalCardProps) {
  const publishHref = getJournalPublishHref(journal, locale);
  const publishLabel = getJournalPublishLabel(journal, locale);
  const copy = getCopy(locale);

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-3 flex flex-wrap gap-2">
        {journal.isScopusIndexed && (
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
            Scopus
          </span>
        )}
        {journal.isOakRecommended && (
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
            OAK
          </span>
        )}
        {journal.quartile && (
          <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700">
            {journal.quartile}
          </span>
        )}
      </div>

      <h3 className="text-xl font-semibold text-slate-900">{journal.title}</h3>
      <p className="mt-1 text-sm text-slate-500">{journal.titleRu}</p>

      <p className="mt-4 text-sm leading-6 text-slate-600">
        {journal.shortDescription}
      </p>

      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <p>
          <span className="font-medium text-slate-800">{copy.publisher}:</span>{' '}
          {journal.publisher}
        </p>
        <p>
          <span className="font-medium text-slate-800">{copy.issn}:</span>{' '}
          {journal.issn || '—'}
        </p>
        <p>
          <span className="font-medium text-slate-800">{copy.subjects}:</span>{' '}
          {journal.subjectAreas?.join(', ') || '—'}
        </p>
      </div>

      <div className="mt-5 text-sm text-slate-500">
        {copy.citescore}: {journal.citescore2025 ?? '—'}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={`/${locale}/journals/${journal.slug}`}
          className="inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          {copy.details}
        </Link>

        <Link
          href={publishHref}
          className="inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
        >
          {publishLabel}
        </Link>
      </div>
    </article>
  );
}
