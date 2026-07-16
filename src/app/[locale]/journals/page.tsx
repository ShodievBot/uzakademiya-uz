import Link from 'next/link';
import {JournalCard} from '@/components/journals/journal-card';
import {JournalFilters} from '@/components/journals/journal-filters';
import {getFilteredJournals} from '@/lib/journals';

type Props = {
  params: Promise<{locale: string}>;
  searchParams?: Promise<{
    q?: string;
    scopus?: string;
    oak?: string;
    subject?: string;
    quartile?: string;
  }>;
};

function withLocale(locale: string, href: string) {
  if (href === '/') return `/${locale}`;
  return `/${locale}${href}`;
}

function getCopy(locale: string) {
  if (locale === 'uz') {
    return {
      badge: 'Jurnallar katalogi',
      title: 'Ilmiy jurnallar katalogi',
      description:
        'Scopus, OAK, yo‘nalish, kvartil va asosiy ko‘rsatkichlar bo‘yicha jurnallarni qulay qidiring. Mos jurnal tanlash nashr jarayonining eng muhim bosqichidir.',
      primaryCta: 'Scopus jurnallari',
      secondaryCta: 'OAK jurnallari',
      contactsCta: 'Bog‘lanish',
      stats: {
        total: 'Umumiy jurnallar',
        scopus: 'Scopus mavjud',
        oak: 'OAK tavsiya etgan'
      },
      guideTitle: 'Katalogdan qanday foydalaniladi?',
      guideDescription:
        'Filtrlar yordamida jurnalni ilmiy yo‘nalish, indeksatsiya va kvartil bo‘yicha qisqa vaqt ichida topishingiz mumkin.',
      guideCards: [
        {
          title: 'Yo‘nalish bo‘yicha qidiring',
          text: 'Maqolangiz mavzusiga mos jurnal topish uchun subject filtridan foydalaning.'
        },
        {
          title: 'Scopus / OAK ni ajrating',
          text: 'Talabingizga qarab faqat Scopus yoki faqat OAK jurnallarini ko‘rsatishingiz mumkin.'
        },
        {
          title: 'Kvartilni tekshiring',
          text: 'Q1–Q4 filtrlari jurnal darajasini tez baholashga yordam beradi.'
        }
      ],
      resultsTitle: 'Qidiruv natijalari',
      found: 'Topilgan jurnallar',
      activeFilters: 'Faol filtrlar',
      emptyTitle: 'Jurnallar topilmadi',
      emptyDescription:
        'Filtrlarni o‘zgartirib ko‘ring yoki qidiruv parametrlarini soddalashtiring.',
      reset: 'Filtrlarni tozalash',
      contactHelpTitle: 'Jurnal tanlashda yordam kerakmi?',
      contactHelpText:
        'Biz maqolangiz mavzusi, kvartil, indeksatsiya va jurnal talablari bo‘yicha mos variantlarni tanlashda yordam beramiz.',
      contactHelpPrimary: 'Mutaxassis bilan bog‘lanish',
      contactHelpSecondary: 'Scopus sahifasiga o‘tish'
    };
  }

  if (locale === 'en') {
    return {
      badge: 'Journal catalog',
      title: 'Scientific journals catalog',
      description:
        'Search journals by Scopus, SAC, subject area, quartile, and key metrics. Choosing the right journal is one of the most important steps in publication.',
      primaryCta: 'Scopus journals',
      secondaryCta: 'SAC journals',
      contactsCta: 'Contact us',
      stats: {
        total: 'Total journals',
        scopus: 'In Scopus',
        oak: 'SAC recommended'
      },
      guideTitle: 'How to use the catalog',
      guideDescription:
        'Use the filters to find a suitable journal quickly by subject area, indexing status, and quartile.',
      guideCards: [
        {
          title: 'Search by subject',
          text: 'Use the subject filter to find journals that match your research topic.'
        },
        {
          title: 'Separate Scopus / SAC',
          text: 'Depending on your goal, you can show only Scopus journals or only SAC-recommended ones.'
        },
        {
          title: 'Check quartile',
          text: 'Q1–Q4 filters help you assess journal level much faster.'
        }
      ],
      resultsTitle: 'Search results',
      found: 'Journals found',
      activeFilters: 'Active filters',
      emptyTitle: 'No journals found',
      emptyDescription:
        'Try changing the filters or simplifying your search parameters.',
      reset: 'Clear filters',
      contactHelpTitle: 'Need help choosing a journal?',
      contactHelpText:
        'We can help you choose suitable options based on your topic, quartile, indexing, and journal requirements.',
      contactHelpPrimary: 'Contact a specialist',
      contactHelpSecondary: 'Go to Scopus page'
    };
  }

  return {
    badge: 'Каталог журналов',
    title: 'Каталог научных журналов',
    description:
      'Подбирайте журналы по Scopus, ВАК, отрасли, квартилю и ключевым метрикам. Правильный выбор журнала — один из самых важных этапов публикации статьи.',
    primaryCta: 'Scopus-журналы',
    secondaryCta: 'Журналы ВАК',
    contactsCta: 'Связаться с нами',
    stats: {
      total: 'Всего журналов',
      scopus: 'В Scopus',
      oak: 'Рекомендованы ВАК'
    },
    guideTitle: 'Как пользоваться каталогом',
    guideDescription:
      'С помощью фильтров вы можете быстро подобрать подходящий журнал по направлению, индексации и квартилю.',
    guideCards: [
      {
        title: 'Ищите по направлению',
        text: 'Используйте фильтр отрасли, чтобы найти журналы, соответствующие теме вашей статьи.'
      },
      {
        title: 'Разделяйте Scopus / ВАК',
        text: 'В зависимости от цели можно показать только Scopus-журналы или только журналы ВАК.'
      },
      {
        title: 'Проверяйте квартиль',
        text: 'Фильтры Q1–Q4 помогают быстрее оценить уровень и позицию журнала.'
      }
    ],
    resultsTitle: 'Результаты поиска',
    found: 'Найдено журналов',
    activeFilters: 'Активные фильтры',
    emptyTitle: 'Журналы не найдены',
    emptyDescription:
      'Попробуйте изменить фильтры или упростить параметры поиска.',
    reset: 'Очистить фильтры',
    contactHelpTitle: 'Нужна помощь с выбором журнала?',
    contactHelpText:
      'Мы поможем подобрать подходящие варианты по теме статьи, квартилю, индексации и требованиям журнала.',
    contactHelpPrimary: 'Связаться со специалистом',
    contactHelpSecondary: 'Перейти на страницу Scopus'
  };
}

function StatCard({
  value,
  label
}: {
  value: number | string;
  label: string;
}) {
  return (
    <div className="rounded-[28px] border border-[#F0E2D8] bg-white/95 p-5 shadow-[0_8px_24px_rgba(17,17,17,0.05)]">
      <div className="text-3xl font-bold text-[#111111] sm:text-4xl">{value}</div>
      <div className="mt-2 text-sm leading-6 text-[#6B6B6B]">{label}</div>
    </div>
  );
}

function GuideCard({
  title,
  text
}: {
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-[28px] border border-[#F0E2D8] bg-white p-6 shadow-[0_8px_24px_rgba(17,17,17,0.05)]">
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFF2E9] text-lg font-bold text-[#FF6C26]">
        ●
      </div>

      <h3 className="mt-5 text-xl font-bold leading-tight text-[#111111]">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-[#5C5C5C]">{text}</p>
    </article>
  );
}

function getActiveFiltersCount(query: {
  q?: string;
  scopus?: string;
  oak?: string;
  subject?: string;
  quartile?: string;
}) {
  return [query.q, query.scopus, query.oak, query.subject, query.quartile].filter(
    Boolean
  ).length;
}

export default async function LocalizedJournalsPage({
  params,
  searchParams
}: Props) {
  const {locale} = await params;
  const query = (await searchParams) || {};
  const copy = getCopy(locale);

  const filteredJournals = getFilteredJournals({
    q: query.q,
    scopus: query.scopus,
    oak: query.oak,
    subject: query.subject,
    quartile: query.quartile
  });

  const allJournals = getFilteredJournals({});
  const scopusCount = allJournals.filter((journal) => journal.isScopusIndexed).length;
  const oakCount = allJournals.filter((journal) => journal.isOakRecommended).length;
  const activeFiltersCount = getActiveFiltersCount(query);

  return (
    <main className="pb-16">
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="rounded-[36px] border border-[#F1D8C8] bg-gradient-to-br from-[#FFF8F3] via-[#FFF4ED] to-white p-6 shadow-[0_14px_40px_rgba(17,17,17,0.06)] sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <div className="inline-flex rounded-full border border-[#FFD8C2] bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#FF6C26]">
                {copy.badge}
              </div>

              <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight text-[#111111] sm:text-5xl">
                {copy.title}
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-[#5C5C5C] sm:text-lg">
                {copy.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={withLocale(locale, '/scopus')}
                  className="inline-flex rounded-2xl bg-[#FF6C26] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#E85E1B]"
                >
                  {copy.primaryCta}
                </Link>

                <Link
                  href={withLocale(locale, '/oak')}
                  className="inline-flex rounded-2xl border border-[#ECE3DC] bg-white px-6 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#FFF8F3]"
                >
                  {copy.secondaryCta}
                </Link>

                <Link
                  href={withLocale(locale, '/contacts')}
                  className="inline-flex rounded-2xl border border-[#ECE3DC] bg-white px-6 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#FFF8F3]"
                >
                  {copy.contactsCta}
                </Link>
              </div>
            </div>

            <aside className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <StatCard value={allJournals.length} label={copy.stats.total} />
              <StatCard value={scopusCount} label={copy.stats.scopus} />
              <StatCard value={oakCount} label={copy.stats.oak} />
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-[#111111]">{copy.guideTitle}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#6B6B6B]">
            {copy.guideDescription}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {copy.guideCards.map((item) => (
            <GuideCard key={item.title} title={item.title} text={item.text} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <JournalFilters searchParams={query} locale={locale} />
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-[#111111]">
              {copy.resultsTitle}
            </h2>
            <div className="mt-3 flex flex-wrap gap-3">
              <div className="inline-flex rounded-full border border-[#ECE3DC] bg-[#FFF8F3] px-4 py-2 text-sm font-semibold text-[#6B6B6B]">
                {copy.found}: {filteredJournals.length}
              </div>

              {activeFiltersCount > 0 && (
                <div className="inline-flex rounded-full border border-[#FFD8C2] bg-white px-4 py-2 text-sm font-semibold text-[#FF6C26]">
                  {copy.activeFilters}: {activeFiltersCount}
                </div>
              )}
            </div>
          </div>

          {activeFiltersCount > 0 && (
            <Link
              href={withLocale(locale, '/journals')}
              className="inline-flex rounded-2xl border border-[#ECE3DC] bg-white px-5 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#FFF8F3]"
            >
              {copy.reset}
            </Link>
          )}
        </div>

        {filteredJournals.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredJournals.map((journal) => (
              <JournalCard key={journal.id} journal={journal} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="rounded-[30px] border border-dashed border-[#D8CEC6] bg-white p-10 text-center shadow-[0_8px_24px_rgba(17,17,17,0.05)]">
            <h2 className="text-2xl font-bold text-[#111111]">
              {copy.emptyTitle}
            </h2>
            <p className="mt-3 text-[#5C5C5C]">{copy.emptyDescription}</p>

            <div className="mt-6 flex justify-center">
              <Link
                href={withLocale(locale, '/journals')}
                className="inline-flex rounded-2xl bg-[#FF6C26] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#E85E1B]"
              >
                {copy.reset}
              </Link>
            </div>
          </div>
        )}
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[36px] border border-[#F1D8C8] bg-gradient-to-r from-[#FFF4EC] via-[#FFF8F4] to-white p-6 shadow-[0_14px_40px_rgba(17,17,17,0.06)] sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-[#111111]">
                {copy.contactHelpTitle}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#5C5C5C] sm:text-base">
                {copy.contactHelpText}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={withLocale(locale, '/contacts')}
                className="inline-flex rounded-2xl bg-[#FF6C26] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#E85E1B]"
              >
                {copy.contactHelpPrimary}
              </Link>

              <Link
                href={withLocale(locale, '/scopus')}
                className="inline-flex rounded-2xl border border-[#ECE3DC] bg-white px-6 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#FFF8F3]"
              >
                {copy.contactHelpSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
