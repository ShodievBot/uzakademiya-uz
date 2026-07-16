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
      scopusBlock: 'Scopus ko‘rsatkichlari',
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
      oakBadge: 'OAK',
      coverage: 'Qamrov yillari',
      quartile: 'Kvartil',
      percentile: 'Percentile',
      citescore2025: 'CiteScore 2025',
      citescore2026: 'CiteScore 2026',
      verification: 'Tekshiruv holati',
      submission: 'Yuborish usuli',
      telegram: 'Telegram mavjud',
      submissionUrl: 'Submission URL mavjud',
      noWebsite: 'Sayt ko‘rsatilmagan',
      noData: 'Ma’lumot yo‘q',
      yes: 'Ha',
      no: 'Yo‘q',
      year: 'Yil',
      documents: 'Hujjatlar',
      submissionTelegram: 'Telegram',
      submissionForm: 'Submission URL',
      submissionWebsite: 'Website'
    };
  }

  if (locale === 'en') {
    return {
      back: 'Back to journals',
      about: 'About the journal',
      basicInfo: 'Basic information',
      indexing: 'Indexing',
      publication: 'Publication conditions',
      scopusBlock: 'Scopus metrics',
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
      oakStatus: 'SAC',
      oakBadge: 'SAC',
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
      no: 'No',
      year: 'Year',
      documents: 'Documents',
      submissionTelegram: 'Telegram',
      submissionForm: 'Submission URL',
      submissionWebsite: 'Website'
    };
  }

  return {
    back: 'Назад к журналам',
    about: 'О журнале',
    basicInfo: 'Основная информация',
    indexing: 'Индексация',
    publication: 'Условия публикации',
    scopusBlock: 'Scopus-показатели',
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
    oakStatus: 'ВАК',
    oakBadge: 'ВАК',
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
    no: 'Нет',
    year: 'Год',
    documents: 'Документы',
    submissionTelegram: 'Telegram',
    submissionForm: 'Submission URL',
    submissionWebsite: 'Сайт'
  };
}

function formatVerificationStatus(value?: string, locale = 'ru') {
  if (!value) return '—';

  const dict =
    locale === 'uz'
      ? {
          verified: 'Tasdiqlangan',
          partially_verified: 'Qisman tasdiqlangan',
          needs_manual_review: 'Qo‘lda tekshirish kerak'
        }
      : locale === 'en'
        ? {
            verified: 'Verified',
            partially_verified: 'Partially verified',
            needs_manual_review: 'Needs manual review'
          }
        : {
            verified: 'Проверено',
            partially_verified: 'Частично проверено',
            needs_manual_review: 'Требуется ручная проверка'
          };

  return dict[value as keyof typeof dict] || value;
}

function InfoRow({
  label,
  value
}: {
  label: string;
  value: string | number | null | undefined;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#ECE3DC] py-3 last:border-b-0">
      <div className="text-sm font-medium text-[#7A7A7A]">{label}</div>
      <div className="max-w-[60%] break-words text-right text-sm text-[#111111]">
        {value || '—'}
      </div>
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

  const submissionMethod = journal.telegramUrl
    ? copy.submissionTelegram
    : journal.submissionUrl
      ? copy.submissionForm
      : journal.website
        ? copy.submissionWebsite
        : copy.noData;

  return (
    <main className="pb-16">
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href={`/${locale}/journals`}
            className="inline-flex rounded-2xl border border-[#ECE3DC] bg-white px-4 py-2 text-sm font-semibold text-[#111111] transition hover:bg-[#FFF8F3]"
          >
            {copy.back}
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <section className="rounded-[32px] border border-[#F1D8C8] bg-gradient-to-br from-[#FFF8F3] via-[#FFF4ED] to-white p-8 shadow-[0_10px_30px_rgba(17,17,17,0.06)]">
              <div className="mb-4 flex flex-wrap gap-2">
                {journal.isScopusIndexed && (
                  <span className="rounded-full border border-[#FFDCCB] bg-[#FFF4EC] px-3 py-1 text-xs font-semibold text-[#E56A22]">
                    Scopus
                  </span>
                )}

                {journal.isOakRecommended && (
                  <span className="rounded-full border border-[#E7D9CB] bg-[#F8F2EC] px-3 py-1 text-xs font-semibold text-[#6F4E37]">
                    {copy.oakBadge}
                  </span>
                )}

                {journal.quartile && (
                  <span className="rounded-full border border-[#E8D9FF] bg-[#F7F1FF] px-3 py-1 text-xs font-semibold text-[#8A63D2]">
                    {journal.quartile}
                  </span>
                )}
              </div>

              <h1 className="max-w-4xl text-4xl font-bold leading-tight text-[#111111] sm:text-5xl">
                {title}
              </h1>

              <p className="mt-3 text-sm text-[#7A7A7A]">{journal.title}</p>

              <p className="mt-6 max-w-3xl text-base leading-8 text-[#5C5C5C]">
                {journal.shortDescription}
              </p>
            </section>

            <section className="rounded-3xl border border-[#ECE3DC] bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-[#111111]">{copy.about}</h2>
              <p className="mt-4 text-sm leading-7 text-[#5C5C5C]">
                {journal.shortDescription}
              </p>
            </section>

            <section className="rounded-3xl border border-[#ECE3DC] bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-[#111111]">
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
                <InfoRow
                  label={copy.website}
                  value={journal.website || copy.noWebsite}
                />
              </div>
            </section>

            <section className="rounded-3xl border border-[#ECE3DC] bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-[#111111]">
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
                  value={formatVerificationStatus(journal.verificationStatus, locale)}
                />
              </div>
            </section>

            <section className="rounded-3xl border border-[#ECE3DC] bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-[#111111]">
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
                <InfoRow label={copy.submission} value={submissionMethod} />
              </div>
            </section>

            {journal.isScopusIndexed && (
              <section className="rounded-3xl border border-[#ECE3DC] bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-[#111111]">
                  {copy.scopusBlock}
                </h2>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-[#ECE3DC] bg-[#FFF8F3] p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-[#7A7A7A]">
                      {copy.quartile}
                    </div>
                    <div className="mt-2 text-3xl font-bold text-[#111111]">
                      {journal.quartile || '—'}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#ECE3DC] bg-[#FFF8F3] p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-[#7A7A7A]">
                      {copy.percentile}
                    </div>
                    <div className="mt-2 text-3xl font-bold text-[#111111]">
                      {journal.percentile ?? '—'}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#ECE3DC] bg-[#FFF8F3] p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-[#7A7A7A]">
                      {copy.citescore2025}
                    </div>
                    <div className="mt-2 text-3xl font-bold text-[#111111]">
                      {journal.citescore2025 ?? '—'}
                    </div>
                  </div>
                </div>

                {journal.scopusContent && journal.scopusContent.length > 0 && (
                  <div className="mt-6 overflow-hidden rounded-2xl border border-[#ECE3DC]">
                    <table className="min-w-full text-sm">
                      <thead className="bg-[#FFF8F3]">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold text-[#7A7A7A]">
                            {copy.year}
                          </th>
                          <th className="px-4 py-3 text-left font-semibold text-[#7A7A7A]">
                            {copy.documents}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#ECE3DC] bg-white">
                        {journal.scopusContent.map((item) => (
                          <tr key={item.year}>
                            <td className="px-4 py-3 text-[#111111]">{item.year}</td>
                            <td className="px-4 py-3 text-[#5C5C5C]">
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

            <section className="rounded-3xl border border-[#ECE3DC] bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-[#111111]">
                {copy.sources}
              </h2>

              <div className="mt-5 flex flex-wrap gap-3">
                {journal.website ? (
                  <a
                    href={journal.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-2xl border border-[#ECE3DC] bg-white px-5 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#FFF8F3]"
                  >
                    {copy.openWebsite}
                  </a>
                ) : (
                  <div className="rounded-2xl border border-dashed border-[#D8CEC6] px-4 py-2 text-sm text-[#7A7A7A]">
                    {copy.noWebsite}
                  </div>
                )}

                <Link
                  href={`/${locale}/contacts?journal=${encodeURIComponent(journal.slug)}`}
                  className="inline-flex rounded-2xl bg-[#FF6C26] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#E85E1B]"
                >
                  {copy.contactUs}
                </Link>
              </div>
            </section>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <section className="rounded-3xl border border-[#ECE3DC] bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-[#111111]">
                {copy.ctaTitle}
              </h2>

              <p className="mt-3 text-sm leading-7 text-[#5C5C5C]">
                {copy.ctaText}
              </p>

              <div className="mt-5 flex flex-col gap-3">
                <Link
                  href={publishHref}
                  className="inline-flex items-center justify-center rounded-2xl bg-[#FF6C26] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#E85E1B]"
                >
                  {publishLabel}
                </Link>

                <Link
                  href={`/${locale}/contacts?journal=${encodeURIComponent(journal.slug)}`}
                  className="inline-flex items-center justify-center rounded-2xl border border-[#ECE3DC] bg-white px-5 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#FFF8F3]"
                >
                  {copy.contactUs}
                </Link>

                {journal.website ? (
                  <a
                    href={journal.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-2xl border border-[#ECE3DC] bg-white px-5 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#FFF8F3]"
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
