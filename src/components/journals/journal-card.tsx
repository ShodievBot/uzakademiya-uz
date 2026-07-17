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
      citescore: 'CiteScore 2025',
      percentile: 'Percentile',
      oak: 'OAK',
      verified: 'Tekshirilgan'
    };
  }

  if (locale === 'en') {
    return {
      details: 'Details',
      publisher: 'Publisher',
      issn: 'ISSN',
      subjects: 'Subjects',
      citescore: 'CiteScore 2025',
      percentile: 'Percentile',
      oak: 'SAC',
      verified: 'Verified'
    };
  }

  return {
    details: 'Подробнее',
    publisher: 'Издатель',
    issn: 'ISSN',
    subjects: 'Отрасли',
    citescore: 'CiteScore 2025',
    percentile: 'Percentile',
    oak: 'ВАК',
    verified: 'Проверен'
  };
}

function getLocalizedTitle(journal: Journal, locale: string) {
  if (locale === 'uz') return journal.titleUz || journal.title || journal.titleRu;
  if (locale === 'en') return journal.title || journal.titleRu || journal.titleUz;
  return journal.titleRu || journal.title || journal.titleUz;
}

function getSecondaryTitle(journal: Journal, locale: string) {
  const localized = getLocalizedTitle(journal, locale);
  const candidates = [journal.title, journal.titleRu, journal.titleUz].filter(Boolean);

  return candidates.find((item) => item !== localized) || null;
}

function formatSubjects(subjects?: string[]) {
  if (!subjects?.length) return '—';
  if (subjects.length <= 2) return subjects.join(', ');
  return `${subjects.slice(0, 2).join(', ')} +${subjects.length - 2}`;
}

export function JournalCard({journal, locale = 'ru'}: JournalCardProps) {
  const publishHref = getJournalPublishHref(journal, locale);
  const publishLabel = getJournalPublishLabel(journal, locale);
  const copy = getCopy(locale);

  const title = getLocalizedTitle(journal, locale);
  const secondaryTitle = getSecondaryTitle(journal, locale);

  return (
    <article className="flex h-full flex-col rounded-3xl border border-[#ECE3DC] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-4 flex flex-wrap gap-2">
        {journal.isScopusIndexed && (
          <span className="rounded-full border border-[#FFDCCB] bg-[#FFF4EC] px-3 py-1 text-xs font-semibold text-[#E56A22]">
            Scopus
          </span>
        )}

        {journal.quartile && (
          <span className="rounded-full border border-[#E8D9FF] bg-[#F7F1FF] px-3 py-1 text-xs font-semibold text-[#8A63D2]">
            {journal.quartile}
          </span>
        )}

        {journal.isOakRecommended && (
          <span className="rounded-full border border-[#E7D9CB] bg-[#F8F2EC] px-3 py-1 text-xs font-semibold text-[#6F4E37]">
            {copy.oak}
          </span>
        )}

        {journal.verificationStatus === 'verified' && (
          <span className="rounded-full border border-[#D8EEDB] bg-[#EDF9EF] px-3 py-1 text-xs font-semibold text-[#3C8A4A]">
            {copy.verified}
          </span>
        )}
      </div>

      <h3 className="text-2xl font-bold leading-tight text-[#111111]">
        {title}
      </h3>

      {secondaryTitle ? (
        <p className="mt-2 text-sm text-[#7A7A7A]">{secondaryTitle}</p>
      ) : null}

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-[#F1E5DC] bg-[#FFF8F3] p-4">
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#B56A42]">
            {copy.citescore}
          </div>
          <div className="mt-2 text-2xl font-bold text-[#111111]">
            {journal.citescore2025 ?? '—'}
          </div>
        </div>

        <div className="rounded-2xl border border-[#F1E5DC] bg-[#FFF8F3] p-4">
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#B56A42]">
            {copy.percentile}
          </div>
          <div className="mt-2 text-2xl font-bold text-[#111111]">
            {journal.percentile ?? '—'}
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-2 text-sm leading-7 text-[#5C5C5C]">
        <p>
          <span className="font-semibold text-[#111111]">{copy.publisher}:</span>{' '}
          {journal.publisher || '—'}
        </p>
        <p>
          <span className="font-semibold text-[#111111]">{copy.issn}:</span>{' '}
          {journal.issn || '—'}
          {journal.eissn ? ` / E-ISSN: ${journal.eissn}` : ''}
        </p>
        <p>
          <span className="font-semibold text-[#111111]">{copy.subjects}:</span>{' '}
          {formatSubjects(journal.subjectAreas)}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={`/${locale}/journals/${journal.slug}`}
          className="inline-flex rounded-xl bg-[#FF6C26] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#E85E1B]"
        >
          {copy.details}
        </Link>

        <Link
          href={publishHref}
          className="inline-flex rounded-xl border border-[#ECE3DC] bg-white px-4 py-2 text-sm font-semibold text-[#111111] transition hover:bg-[#FFF8F3]"
        >
          {publishLabel}
        </Link>
      </div>
    </article>
  );
}
