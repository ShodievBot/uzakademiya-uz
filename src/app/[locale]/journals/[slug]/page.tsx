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

function getJournalAltTitle(
  journal: {
    title: string;
    titleRu: string;
    titleUz: string;
  },
  locale: string
) {
  if (locale === 'ru') return journal.title;
  if (locale === 'uz') return journal.titleRu || journal.title;
  return journal.titleRu || journal.titleUz;
}

function getCopy(locale: string) {
  if (locale === 'uz') {
    return {
      back: '← Jurnallar ro‘yxatiga qaytish',
      badge: 'Jurnal kartasi',
      about: 'Jurnal haqida',
      basicInfo: 'Asosiy ma’lumotlar',
      indexing: 'Indekslash',
      publication: 'Nashr shartlari',
      scopusBlock: 'Scopus ko‘rsatkichlari',
      sources: 'Manbalar va havolalar',
      actionPanel: 'Tezkor harakatlar',
      ctaTitle: 'Maqola yuborishga tayyormisiz?',
      ctaText:
        'Jurnal bo‘yicha bog‘lanish, talablarni aniqlashtirish yoki maqola chop ettirish uchun bizga murojaat qiling.',
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
      submissionWebsite: 'Website',
      journalLanguages: 'Nashr tillari',
      journalFocus: 'Asosiy yo‘nalishlar',
      recommendedFor: 'Kimlar uchun mos',
      metricsNote:
        'Scopus ko‘rsatkichlari yo‘naltiruvchi xarakterga ega. Yakuniy tekshiruvni doimo rasmiy manbalar orqali bajaring.',
      note:
        'Platformadagi ma’lumotlar ma’lumot uchun xizmat qiladi va avtomatik nashrni kafolatlamaydi.',
      sourceWebsite: 'Rasmiy sayt',
      sourceSubmission: 'Submission sahifa',
      sourceTelegram: 'Telegram aloqa'
    };
  }

  if (locale === 'en') {
    return {
      back: '← Back to journals',
      badge: 'Journal profile',
      about: 'About the journal',
      basicInfo: 'Basic information',
      indexing: 'Indexing',
      publication: 'Publication conditions',
      scopusBlock: 'Scopus metrics',
      sources: 'Sources and links',
      actionPanel: 'Quick actions',
      ctaTitle: 'Ready to submit your article?',
      ctaText:
        'Contact us for journal-specific support, requirement clarification, and submission guidance.',
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
      submissionWebsite: 'Website',
      journalLanguages: 'Journal languages',
      journalFocus: 'Main focus areas',
      recommendedFor: 'Who this may fit',
      metricsNote:
        'Scopus metrics are provided for orientation. Always verify final details using official sources.',
      note:
        'Information on the platform is for reference purposes only and does not guarantee publication.',
      sourceWebsite: 'Official website',
      sourceSubmission: 'Submission page',
      sourceTelegram: 'Telegram contact'
    };
  }

  return {
    back: '← Назад к журналам',
    badge: 'Карточка журнала',
    about: 'О журнале',
    basicInfo: 'Основная информация',
    indexing: 'Индексация',
    publication: 'Условия публикации',
    scopusBlock: 'Scopus-показатели',
    sources: 'Источники и ссылки',
    actionPanel: 'Быстрые действия',
    ctaTitle: 'Готовы подать статью?',
    ctaText:
      'Свяжитесь с нами для уточнения требований журнала, выбора стратегии подачи и сопровождения публикации.',
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
    submissionWebsite: 'Сайт',
    journalLanguages: 'Языки журнала',
    journalFocus: 'Основные направления',
    recommendedFor: 'Кому может подойти',
    metricsNote:
      'Scopus-показатели носят справочный характер. Финальную проверку всегда выполняйте по официальным источникам.',
    note:
      'Информация на платформе носит справочный характер и не гарантирует автоматическую публикацию.',
    sourceWebsite: 'Официальный сайт',
    sourceSubmission: 'Страница submission',
    sourceTelegram: 'Telegram-контакт'
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

function verificationBadgeClass(value?: string) {
  if (value === 'verified') {
    return 'bg-[#EEF9F2] text-[#228B52]';
  }

  if (value === 'partially_verified') {
    return 'bg-[#FFF8E8] text-[#B7791F]';
  }

  if (value === 'needs_manual_review') {
    return 'bg-[#FFF1E8] text-[#D05A1A]';
  }

  return 'bg-[#F6F1EC] text-[#8A6A56]';
}

function StatCard({
  label,
  value
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-3xl border border-[#ECE3DC] bg-white p-5 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B85A2B]">
        {label}
      </div>
      <div className="mt-3 text-2xl font-bold text-[#111111]">{value}</div>
    </div>
  );
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

function SourceLink({
  label,
  href
}: {
  label: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex rounded-2xl border border-[#ECE3DC] bg-white px-4 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#FFF8F3]"
    >
      {label}
    </a>
  );
}

export default async function LocalizedJournalDetailsPage({params}: Props) {
  const {locale, slug} = await params;
  const copy = getCopy(locale);

  const journal = await getJournalBySlug(slug);

  if (!journal) {
    notFound();
  }

  const title = getJournalTitle(journal, locale);
  const altTitle = getJournalAltTitle(journal, locale);
  const publishHref = getJournalPublishHref(journal, locale);
  const publishLabel = getJournalPublishLabel(journal, locale);

  const submissionMethod = journal.telegramUrl
    ? copy.submissionTelegram
    : journal.submissionUrl
      ? copy.submissionForm
      : journal.website
        ? copy.submissionWebsite
        : copy.noData;

  const languages = journal.languages?.join(', ') || copy.noData;
  const subjects = journal.subjectAreas?.join(', ') || copy.noData;
  const categories = journal.categories?.join(', ') || copy.noData;

  return (
    <main className="pb-16">
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}/journals`}
          className="inline-block text-sm font-medium text-[#8A6A56] transition hover:text-[#D05A1A]"
        >
          {copy.back}
        </Link>
      </section>

      <section className="mx-auto mt-5 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-[#F1D8C8] bg-gradient-to-br from-[#FFF8F3] via-[#FFF4ED] to-white p-8 shadow-[0_10px_30px_rgba(17,17,17,0.06)] sm:p-10 lg:p-12">
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="inline-flex rounded-full border border-[#FFD8C2] bg-white px-4 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#FF6C26]">
              {copy.badge}
            </span>

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

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div>
              <h1 className="max-w-4xl text-4xl font-bold leading-tight text-[#111111] sm:text-5xl">
                {title}
              </h1>

              <p className="mt-3 text-sm text-[#8A6A56]">{altTitle}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={publishHref}
                  className="inline-flex rounded-2xl bg-[#FF6C26] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#E85E1B]"
                >
                  {publishLabel}
                </Link>

                <Link
                  href={`/${locale}/contacts?journal=${encodeURIComponent(journal.slug)}`}
                  className="inline-flex rounded-2xl border border-[#ECE3DC] bg-white px-6 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#FFF8F3]"
                >
                  {copy.contactUs}
                </Link>

                {journal.website ? (
                  <a
                    href={journal.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-2xl border border-[#ECE3DC] bg-white px-6 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#FFF8F3]"
                  >
                    {copy.openWebsite}
                  </a>
                ) : null}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <StatCard
                label={copy.scopusStatus}
                value={journal.isScopusIndexed ? copy.yes : copy.no}
              />
              <StatCard
                label={copy.oakStatus}
                value={journal.isOakRecommended ? copy.yes : copy.no}
              />
              <StatCard label={copy.quartile} value={journal.quartile || '—'} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6">
            <section className="rounded-3xl border border-[#ECE3DC] bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-4 inline-flex rounded-full bg-[#FFF4ED] px-3 py-1 text-xs font-semibold text-[#B85A2B]">
                {copy.about}
              </div>

              <p className="text-sm leading-8 text-[#5C5C5C] sm:text-base">
                {journal.shortDescription}
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-[#F3E5DB] bg-[#FFFCFA] p-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B85A2B]">
                    {copy.journalLanguages}
                  </div>
                  <div className="mt-3 text-sm leading-7 text-[#111111]">
                    {languages}
                  </div>
                </div>

                <div className="rounded-3xl border border-[#F3E5DB] bg-[#FFFCFA] p-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B85A2B]">
                    {copy.journalFocus}
                  </div>
                  <div className="mt-3 text-sm leading-7 text-[#111111]">
                    {subjects}
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-[#ECE3DC] bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-4 inline-flex rounded-full bg-[#FFF8F3] px-3 py-1 text-xs font-semibold text-[#B85A2B]">
                {copy.basicInfo}
              </div>

              <div className="mt-2">
                <InfoRow label={copy.publisher} value={journal.publisher} />
                <InfoRow label={copy.country} value={journal.country} />
                <InfoRow label={copy.languages} value={languages} />
                <InfoRow label={copy.subjects} value={subjects} />
                <InfoRow label={copy.categories} value={categories} />
                <InfoRow label={copy.issn} value={journal.issn} />
                <InfoRow label={copy.eissn} value={journal.eissn} />
                <InfoRow label={copy.website} value={journal.website || copy.noWebsite} />
              </div>
            </section>

            <section className="rounded-3xl border border-[#ECE3DC] bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-4 inline-flex rounded-full bg-[#FFF4ED] px-3 py-1 text-xs font-semibold text-[#B85A2B]">
                {copy.indexing}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-[#F3E5DB] bg-[#FFFCFA] p-5">
                  <div className="text-sm font-semibold text-[#111111]">
                    {copy.scopusStatus}
                  </div>
                  <div className="mt-3 text-sm leading-7 text-[#5C5C5C]">
                    {journal.isScopusIndexed ? copy.yes : copy.no}
                  </div>
                </div>

                <div className="rounded-3xl border border-[#F3E5DB] bg-[#FFFCFA] p-5">
                  <div className="text-sm font-semibold text-[#111111]">
                    {copy.oakStatus}
                  </div>
                  <div className="mt-3 text-sm leading-7 text-[#5C5C5C]">
                    {journal.isOakRecommended ? copy.yes : copy.no}
                  </div>
                </div>

                <div className="rounded-3xl border border-[#F3E5DB] bg-[#FFFCFA] p-5">
                  <div className="text-sm font-semibold text-[#111111]">
                    {copy.coverage}
                  </div>
                  <div className="mt-3 text-sm leading-7 text-[#5C5C5C]">
                    {journal.scopusCoverageYears || copy.noData}
                  </div>
                </div>

                <div className="rounded-3xl border border-[#F3E5DB] bg-[#FFFCFA] p-5">
                  <div className="text-sm font-semibold text-[#111111]">
                    {copy.verification}
                  </div>
                  <div
                    className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${verificationBadgeClass(
                      journal.verificationStatus
                    )}`}
                  >
                    {formatVerificationStatus(journal.verificationStatus, locale)}
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-[#ECE3DC] bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-4 inline-flex rounded-full bg-[#FFF8F3] px-3 py-1 text-xs font-semibold text-[#B85A2B]">
                {copy.publication}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-[#F3E5DB] bg-[#FFFCFA] p-5">
                  <div className="text-sm font-semibold text-[#111111]">
                    {copy.submission}
                  </div>
                  <div className="mt-3 text-sm leading-7 text-[#5C5C5C]">
                    {submissionMethod}
                  </div>
                </div>

                <div className="rounded-3xl border border-[#F3E5DB] bg-[#FFFCFA] p-5">
                  <div className="text-sm font-semibold text-[#111111]">
                    {copy.recommendedFor}
                  </div>
                  <div className="mt-3 text-sm leading-7 text-[#5C5C5C]">
                    {subjects}
                  </div>
                </div>
              </div>

              <p className="mt-5 text-sm leading-7 text-[#5C5C5C]">
                {copy.note}
              </p>
            </section>

            <section className="rounded-3xl border border-[#ECE3DC] bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-4 inline-flex rounded-full bg-[#FFF4ED] px-3 py-1 text-xs font-semibold text-[#B85A2B]">
                {copy.scopusBlock}
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-3xl border border-[#F3E5DB] bg-[#FFFCFA] p-5">
                  <div className="text-sm font-semibold text-[#111111]">
                    {copy.quartile}
                  </div>
                  <div className="mt-3 text-2xl font-bold text-[#111111]">
                    {journal.quartile || '—'}
                  </div>
                </div>

                <div className="rounded-3xl border border-[#F3E5DB] bg-[#FFFCFA] p-5">
                  <div className="text-sm font-semibold text-[#111111]">
                    {copy.citescore2025}
                  </div>
                  <div className="mt-3 text-2xl font-bold text-[#111111]">
                    {journal.citescore2025 ?? '—'}
                  </div>
                </div>

                <div className="rounded-3xl border border-[#F3E5DB] bg-[#FFFCFA] p-5">
                  <div className="text-sm font-semibold text-[#111111]">
                    {copy.citescore2026}
                  </div>
                  <div className="mt-3 text-2xl font-bold text-[#111111]">
                    {journal.citescore2026 ?? '—'}
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-3xl border border-[#F3E5DB] bg-[#FFFCFA] p-5">
                <div className="text-sm font-semibold text-[#111111]">
                  {copy.percentile}
                </div>
                <div className="mt-3 text-sm leading-7 text-[#5C5C5C]">
                  {journal.percentile ?? '—'}
                </div>
              </div>

              {journal.scopusContent && journal.scopusContent.length > 0 ? (
                <div className="mt-6">
                  <div className="mb-4 text-lg font-bold text-[#111111]">
                    Scopus content
                  </div>

                  <div className="space-y-3">
                    {journal.scopusContent.map((item) => (
                      <div
                        key={item.year}
                        className="flex items-center justify-between rounded-2xl border border-[#F3E5DB] bg-[#FFFCFA] px-4 py-4"
                      >
                        <div className="text-sm font-semibold text-[#111111]">
                          {copy.year}: {item.year}
                        </div>
                        <div className="text-sm text-[#5C5C5C]">
                          {copy.documents}: {item.documentsCount}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              <p className="mt-5 text-sm leading-7 text-[#5C5C5C]">
                {copy.metricsNote}
              </p>
            </section>

            <section className="rounded-3xl border border-[#ECE3DC] bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-4 inline-flex rounded-full bg-[#FFF8F3] px-3 py-1 text-xs font-semibold text-[#B85A2B]">
                {copy.sources}
              </div>

              <div className="flex flex-wrap gap-3">
                {journal.website ? (
                  <SourceLink label={copy.sourceWebsite} href={journal.website} />
                ) : null}

                {journal.submissionUrl ? (
                  <SourceLink
                    label={copy.sourceSubmission}
                    href={journal.submissionUrl}
                  />
                ) : null}

                {journal.telegramUrl ? (
                  <SourceLink
                    label={copy.sourceTelegram}
                    href={journal.telegramUrl}
                  />
                ) : null}
              </div>
            </section>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <section className="rounded-3xl border border-[#ECE3DC] bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex rounded-full bg-[#FFF4ED] px-3 py-1 text-xs font-semibold text-[#B85A2B]">
                {copy.actionPanel}
              </div>

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

            <section className="rounded-3xl border border-[#ECE3DC] bg-[#FFF8F3] p-6 shadow-sm">
              <div className="text-sm font-semibold text-[#111111]">
                {copy.verification}
              </div>

              <div
                className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${verificationBadgeClass(
                  journal.verificationStatus
                )}`}
              >
                {formatVerificationStatus(journal.verificationStatus, locale)}
              </div>

              <div className="mt-5 space-y-3 text-sm leading-7 text-[#5C5C5C]">
                <div>
                  <span className="font-semibold text-[#111111]">
                    {copy.submission}:
                  </span>{' '}
                  {submissionMethod}
                </div>
                <div>
                  <span className="font-semibold text-[#111111]">
                    {copy.quartile}:
                  </span>{' '}
                  {journal.quartile || '—'}
                </div>
                <div>
                  <span className="font-semibold text-[#111111]">
                    {copy.citescore2025}:
                  </span>{' '}
                  {journal.citescore2025 ?? '—'}
                </div>
              </div>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}
