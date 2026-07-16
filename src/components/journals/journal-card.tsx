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
      eissn: 'E-ISSN',
      subjects: 'Yo‘nalishlar',
      country: 'Mamlakat',
      languages: 'Tillar',
      citescore: 'CiteScore 2025',
      percentile: 'Percentile',
      coverage: 'Qamrov yillari',
      website: 'Jurnal sayti',
      openSite: 'Saytni ochish',
      oak: 'OAK',
      verified: 'Tasdiqlangan',
      partial: 'Qisman tasdiqlangan',
      review: 'Tekshiruv kerak'
    };
  }

  if (locale === 'en') {
    return {
      details: 'Details',
      publisher: 'Publisher',
      issn: 'ISSN',
      eissn: 'E-ISSN',
      subjects: 'Subjects',
      country: 'Country',
      languages: 'Languages',
      citescore: 'CiteScore 2025',
      percentile: 'Percentile',
      coverage: 'Coverage years',
      website: 'Journal website',
      openSite: 'Open site',
      oak: 'SAC',
      verified: 'Verified',
      partial: 'Partially verified',
      review: 'Needs review'
    };
  }

  return {
    details: 'Подробнее',
    publisher: 'Издатель',
    issn: 'ISSN',
    eissn: 'E-ISSN',
    subjects: 'Отрасли',
    country: 'Страна',
    languages: 'Языки',
    citescore: 'CiteScore 2025',
    percentile: 'Percentile',
    coverage: 'Период индексации',
    website: 'Сайт журнала',
    openSite: 'Открыть сайт',
    oak: 'ВАК',
    verified: 'Проверен',
    partial: 'Частично проверен',
    review: 'Нужна проверка'
  };
}

function getLocalizedTitle(journal: Journal, locale: string) {
  if (locale === 'uz') return journal.titleUz || journal.title || journal.titleRu;
  if (locale === 'en') return journal.title || journal.titleRu || journal.titleUz;
  return journal.titleRu || journal.title || journal.titleUz;
}

function getSecondaryTitle(journal: Journal, locale: string) {
  if (locale === 'uz') return journal.title || journal.titleRu;
  if (locale === 'en') return journal.titleRu || journal.titleUz;
  return journal.title || journal.titleUz;
}

function getVerificationLabel(
  status: Journal['verificationStatus'],
  locale: string
) {
  const copy = getCopy(locale);

  if (status === 'verified') return copy.verified;
  if (status === 'partially_verified') return copy.partial;
  if (status === 'needs_manual_review') return copy.review;

  return null;
}

function getVerificationClasses(status: Journal['verificationStatus']) {
  if (status === 'verified') {
    return 'border-[#D7EEDB] bg-[#F2FBF4] text-[#2F7A43]';
  }

  if (status === 'partially_verified') {
    return 'border-[#FFE2BF] bg-[#FFF7ED] text-[#C46A1B]';
  }

  return 'border-[#E8DFF7] bg-[#F7F3FF] text-[#7A5CC2]';
}

function MetricCard({
  label,
  value,
  accent = false
}: {
  label: string;
  value: string | number;
  accent?: boolean;
}) {
  return (
    <div
      className={
        accent
          ? 'rounded-2xl border border-[#FFD8C2] bg-[#FFF5EE] p-4'
          : 'rounded-2xl border border-[#F1E5DC] bg-[#FFFCFA] p-4'
      }
    >
      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A57252]">
        {label}
      </div>
      <div className="mt-2 text-lg font-bold text-[#111111]">{value}</div>
    </div>
  );
}

export function JournalCard({journal, locale = 'ru'}: JournalCardProps) {
  const publishHref = getJournalPublishHref(journal, locale);
  const publishLabel = getJournalPublishLabel(journal, locale);
  const copy = getCopy(locale);

  const title = getLocalizedTitle(journal, locale);
  const secondaryTitle = getSecondaryTitle(journal, locale);
  const verificationLabel = getVerificationLabel(journal.verificationStatus, locale);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[30px] border border-[#ECE3DC] bg-white p-6 shadow-[0_8px_24px_rgba(17,17,17,0.05)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(255,108,38,0.12)]">
      <div className="mb-4 flex flex-wrap gap-2">
        {journal.isScopusIndexed && (
          <span className="rounded-full border border-[#FFDCCB] bg-[#FFF4EC] px-3 py-1 text-xs font-semibold text-[#E56A22]">
            Scopus
          </span>
        )}

        {journal.isOakRecommended && (
          <span className="rounded-full border border-[#E7D9CB] bg-[#F8F2EC] px-3 py-1 text-xs font-semibold text-[#6F4E37]">
            {copy.oak}
          </span>
        )}

        {journal.quartile && (
          <span className="rounded-full border border-[#F0D9FF] bg-[#FBF5FF] px-3 py-1 text-xs font-semibold text-[#8A63D2]">
            {journal.quartile}
          </span>
        )}

        {verificationLabel && (
          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${getVerificationClasses(journal.verificationStatus)}`}
          >
            {verificationLabel}
          </span>
        )}
      </div>

      <div>
        <h3 className="text-2xl font-bold leading-tight text-[#111111] transition group-hover:text-[#E85E1B]">
          {title}
        </h3>

        {secondaryTitle && secondaryTitle !== title && (
          <p className="mt-2 text-sm text-[#7A7A7A]">{secondaryTitle}</p>
        )}
      </div>

      <p className="mt-4 text-sm leading-7 text-[#5C5C5C]">
        {journal.shortDescription}
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <MetricCard
          label={copy.citescore}
          value={journal.citescore2025 ?? '—'}
          accent
        />
        <MetricCard
          label={copy.percentile}
          value={journal.percentile ?? '—'}
        />
      </div>

      <div className="mt-5 space-y-3 text-sm leading-7 text-[#5C5C5C]">
        <div>
          <span className="font-semibold text-[#111111]">{copy.publisher}:</span>{' '}
          {journal.publisher || '—'}
        </div>

        <div>
          <span className="font-semibold text-[#111111]">{copy.issn}:</span>{' '}
          {journal.issn || '—'}
          {journal.eissn ? (
            <>
              {' '}<span className="text-[#B0A39A]">/</span>{' '}
              <span className="font-semibold text-[#111111]">{copy.eissn}:</span>{' '}
              {journal.eissn}
            </>
          ) : null}
        </div>

        <div>
          <span className="font-semibold text-[#111111]">{copy.subjects}:</span>{' '}
          {journal.subjectAreas?.join(', ') || '—'}
        </div>

        <div>
          <span className="font-semibold text-[#111111]">{copy.country}:</span>{' '}
          {journal.country || '—'}
        </div>

        <div>
          <span className="font-semibold text-[#111111]">{copy.languages}:</span>{' '}
          {journal.languages?.join(', ') || '—'}
        </div>

        {journal.scopusCoverageYears && (
          <div>
            <span className="font-semibold text-[#111111]">{copy.coverage}:</span>{' '}
            {journal.scopusCoverageYears}
          </div>
        )}
      </div>

      <div className="mt-5">
        <a
          href={journal.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex text-sm font-semibold text-[#E56A22] transition hover:text-[#C94F12]"
        >
          {copy.openSite}
        </a>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={`/${locale}/journals/${journal.slug}`}
          className="inline-flex rounded-2xl bg-[#FF6C26] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#E85E1B]"
        >
          {copy.details}
        </Link>

        <Link
          href={publishHref}
          className="inline-flex rounded-2xl border border-[#ECE3DC] bg-white px-5 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#FFF8F3]"
        >
          {publishLabel}
        </Link>
      </div>
    </article>
  );
}
