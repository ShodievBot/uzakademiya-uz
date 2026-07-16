import Link from 'next/link';
import {notFound} from 'next/navigation';
import {getJournalBySlug} from '@/lib/journals';
import {
  getJournalPublishHref,
  getJournalPublishLabel
} from '@/lib/journal-links';

type Props = {
  params: Promise<{locale: string; slug: string}>;
};

function getJournalTitle(
  journal: {
    title: string;
    titleRu: string;
    titleUz: string;
  },
  locale: string
) {
  if (locale === 'uz') return journal.titleUz || journal.title || journal.titleRu;
  if (locale === 'en') return journal.title || journal.titleRu || journal.titleUz;
  return journal.titleRu || journal.title || journal.titleUz;
}

function getCopy(locale: string) {
  if (locale === 'uz') {
    return {
      back: 'Jurnallar ro‘yxatiga qaytish',
      about: 'Jurnal haqida',
      basicInfo: 'Asosiy ma’lumotlar',
      indexing: 'Indekslash',
      publication: 'Nashr shartlari',
      scopusBlock: 'Scopus bloki',
      sources: 'Manbalar',
      ctaTitle: 'Maqola yuborishga tayyormisiz?',
      ctaText:
        'Jurnal bo‘yicha bog‘lanish yoki maqola chop ettirish uchun bizga murojaat qiling.',
      openWebsite: 'Jurnal saytiga o‘tish',
      contactUs: 'Biz bilan bog‘lanish',
      publisher: 'Nashriyot',
      country: 'Mamlakat',
      languages: 'Nashr tillari',
      subjects: 'Yo‘nalishlar',
      categories: 'Kategoriyalar',
      issn: 'ISSN',
      eissn: 'EISSN',
      website: 'Rasmiy sayt',
      scopusStatus: 'Scopus',
      oakStatus: 'OAK',
      coverage: 'Qamrov yillari',
      quartile: 'Kvartil',
      percentile: 'Percentile',
      citescore2025: 'CiteScore 2025',
      citescore2026: 'CiteScore 2026',
      verification: 'Tekshiruv holati',
      submission: 'Maqola yuborish usuli',
      telegram: 'Telegram mavjud',
      submissionUrl: 'Submission URL mavjud',
      noWebsite: 'Sayt ko‘rsatilmagan',
      noData: 'Ma’lumot yo‘q',
      yes: 'Ha',
      no: 'Yo‘q'
    };
  }

  if (locale === 'en') {
    return {
      back: 'Back to journals',
      about: 'About the journal',
      basicInfo: 'Basic information',
      indexing: 'Indexing',
      publication: 'Publication conditions',
      scopusBlock: 'Scopus block',
      sources: 'Sources',
      ctaTitle: 'Ready to submit your article?',
      ctaText:
        'Use the journal contact flow or get in touch with us for publication support.',
      openWebsite: 'Open journal website',
      contactUs: 'Contact us',
      publisher: 'Publisher',
      country: 'Country',
      languages: 'Publication languages',
      subjects: 'Subjects',
      categories: 'Categories',
      issn: 'ISSN',
      eissn: 'EISSN',
      website: 'Official website',
      scopusStatus: 'Scopus',
      oakStatus: 'OAK',
      coverage: 'Coverage years',
      quartile: 'Quartile',
      percentile: 'Percentile',
      citescore2025: 'CiteScore 2025',
      citescore2026: 'CiteScore 2026',
      verification: 'Verification status',
      submission: 'Submission method',
      telegram: 'Telegram available',
      submissionUrl: 'Submission URL available',
      noWebsite: 'Website not specified',
      noData: 'No data',
      yes: 'Yes',
      no: 'No'
    };
  }

  return {
    back: 'Назад к журналам',
    about: 'О журнале',
    basicInfo: 'Основная информация',
    indexing: 'Индексация',
    publication: 'Условия публикации',
    scopusBlock: 'Scopus-блок',
    sources: 'Источники',
    ctaTitle: 'Готовы подать статью?',
    ctaText:
      'Используйте контактный сценарий по журналу или свяжитесь с нами для сопровождения публикации.',
    openWebsite: 'Перейти на сайт журнала',
    contactUs: 'Связаться с нами',
    publisher: 'Издатель',
    country: 'Страна',
    languages: 'Языки публикации',
    subjects: 'Отрасли',
    categories: 'Категории',
    issn: 'ISSN',
    eissn: 'EISSN',
    website: 'Официальный сайт',
    scopusStatus: 'Scopus',
    oakStatus: 'OAK',
    coverage: 'Годы покрытия',
    quartile: 'Квартиль',
    percentile: 'Percentile',
    citescore2025: 'CiteScore 2025',
    citescore2026: 'CiteScore 2026',
    verification: 'Статус проверки',
    submission: 'Способ подачи',
    telegram: 'Есть Telegram',
    submissionUrl: 'Есть submission URL',
    noWebsite: 'Сайт не указан',
    noData: 'Нет данных',
    yes: 'Да',
    no: 'Нет'
  };
}

function formatVerificationStatus(value?: string) {
  if (!value) return '—';

  if (value === 'verified') return 'Verified';
  if (value === 'partially_verified') return 'Partially verified';
  if (value === 'needs_manual_review') return 'Needs manual review';

  return value;
}

function InfoRow({
  label,
  value
}: {
  label: string;
  value: string | number | null | undefined;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-200 py-3 last:border-b-0">
      <div className="text-sm font-medium text-slate-500">{label}</div>
      <div className="text-right text-sm text-slate-900">{value || '—'}</div>
    </div>
  );
}

export default async function LocalizedJournalDetailsPage({params}: Props) {
  const {locale, slug} = await params;
  const copy = getCopy(locale);

  const journal = getJournalBySlug(slug);

  if (!journal) {
    notFound();
  }

  const title = getJournalTitle(journal, locale);
  const publishHref = getJournalPublishHref(journal, locale);
  const publishLabel = getJournalPublishLabel(journal, locale);

  return (
    <main className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href={`/${locale}/journals`}
            className="inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            {copy.back}
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-4 flex flex-wrap gap-2">
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

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {title}
              </h1>

              <p className="mt-3 text-sm text-slate-500">{journal.title}</p>

              <p className="mt-6 max-w-3xl text-base leading-7 text-slate-600">
                {journal.shortDescription}
              </p>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">
                {copy.about}
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {journal.shortDescription}
              </p>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">
                {copy.basicInfo}
              </h2>

              <div className="mt-4">
                <InfoRow label={copy.publisher} value={journal.publisher} />
                <InfoRow label={copy.country} value={journal.country} />
                <InfoRow
                  label={copy.languages}
                  value={journal.languages?.join(', ') || copy.noData}
                />
                <InfoRow
                  label={copy.subjects}
                  value={journal.subjectAreas?.join(', ') || copy.noData}
                />
                <InfoRow
                  label={copy.categories}
                  value={journal.categories?.join(', ') || copy.noData}
                />
                <InfoRow label={copy.issn} value={journal.issn} />
                <InfoRow label={copy.eissn} value={journal.eissn} />
                <InfoRow label={copy.website} value={journal.website || copy.noWebsite} />
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">
                {copy.indexing}
              </h2>

              <div className="mt-4">
                <InfoRow
                  label={copy.scopusStatus}
                  value={journal.isScopusIndexed ? copy.yes : copy.no}
                />
                <InfoRow
                  label={copy.oakStatus}
                  value={journal.isOakRecommended ? copy.yes : copy.no}
                />
                <InfoRow
                  label={copy.coverage}
                  value={journal.scopusCoverageYears || copy.noData}
                />
                <InfoRow
                  label={copy.quartile}
                  value={journal.quartile || copy.noData}
                />
                <InfoRow
                  label={copy.percentile}
                  value={journal.percentile ?? copy.noData}
                />
                <InfoRow
                  label={copy.citescore2025}
                  value={journal.citescore2025 ?? copy.noData}
                />
                <InfoRow
                  label={copy.citescore2026}
                  value={journal.citescore2026 ?? copy.noData}
                />
                <InfoRow
                  label={copy.verification}
                  value={formatVerificationStatus(journal.verificationStatus)}
                />
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">
                {copy.publication}
              </h2>

              <div className="mt-4">
                <InfoRow
                  label={copy.telegram}
                  value={journal.telegramUrl ? copy.yes : copy.no}
                />
                <InfoRow
                  label={copy.submissionUrl}
                  value={journal.submissionUrl ? copy.yes : copy.no}
                />
                <InfoRow
                  label={copy.submission}
                  value={
                    journal.telegramUrl
                      ? 'Telegram'
                      : journal.submissionUrl
                        ? 'Submission URL'
                        : journal.website
                          ? 'Website'
                          : copy.noData
                  }
                />
              </div>
            </section>

            {journal.isScopusIndexed && (
              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900">
                  {copy.scopusBlock}
                </h2>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="text-xs uppercase tracking-wide text-slate-500">
                      {copy.quartile}
                    </div>
                    <div className="mt-2 text-2xl font-bold text-slate-900">
                      {journal.quartile || '—'}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="text-xs uppercase tracking-wide text-slate-500">
                      {copy.percentile}
                    </div>
                    <div className="mt-2 text-2xl font-bold text-slate-900">
                      {journal.percentile ?? '—'}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="text-xs uppercase tracking-wide text-slate-500">
                      {copy.citescore2025}
                    </div>
                    <div className="mt-2 text-2xl font-bold text-slate-900">
                      {journal.citescore2025 ?? '—'}
                    </div>
                  </div>
                </div>

                {journal.scopusContent && journal.scopusContent.length > 0 && (
                  <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
                    <table className="min-w-full divide-y divide-slate-200 text-sm">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-4 py-3 text-left font-medium text-slate-600">
                            Year
                          </th>
                          <th className="px-4 py-3 text-left font-medium text-slate-600">
                            Documents
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white">
                        {journal.scopusContent.map((item) => (
                          <tr key={item.year}>
                            <td className="px-4 py-3 text-slate-900">{item.year}</td>
                            <td className="px-4 py-3 text-slate-700">
                              {item.documentsCount}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            )}

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">
                {copy.sources}
              </h2>

              <div className="mt-5 flex flex-wrap gap-3">
                {journal.website ? (
                  <a
                    href={journal.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
                  >
                    {copy.openWebsite}
                  </a>
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-300 px-4 py-2 text-sm text-slate-500">
                    {copy.noWebsite}
                  </div>
                )}

                <Link
                  href={`/${locale}/contacts?journal=${encodeURIComponent(journal.slug)}`}
                  className="inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                >
                  {copy.contactUs}
                </Link>
              </div>
            </section>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">
                {copy.ctaTitle}
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {copy.ctaText}
              </p>

              <div className="mt-5 flex flex-col gap-3">
                <Link
                  href={publishHref}
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  {publishLabel}
                </Link>

                <Link
                  href={`/${locale}/contacts?journal=${encodeURIComponent(journal.slug)}`}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  {copy.contactUs}
                </Link>

                {journal.website ? (
                  <a
                    href={journal.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    {copy.openWebsite}
                  </a>
                ) : null}
              </div>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}
