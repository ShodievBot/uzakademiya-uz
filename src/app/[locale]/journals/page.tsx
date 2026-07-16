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

function getCopy(locale: string) {
  if (locale === 'uz') {
    return {
      badge: 'Jurnallar katalogi',
      title: 'Ilmiy jurnallar katalogi',
      description:
        'Ilmiy maqolalarni chop etish uchun jurnallar bazasi: Scopus, OAK, yo‘nalishlar, kvartil va asosiy ma’lumotlar.',
      found: 'Topilgan jurnallar',
      emptyTitle: 'Jurnallar topilmadi',
      emptyDescription:
        'Filtrlarni o‘zgartirib ko‘ring yoki qidiruvni qayta bajaring.'
    };
  }

  if (locale === 'en') {
    return {
      badge: 'Journal catalog',
      title: 'Scientific journals catalog',
      description:
        'A journal database for publishing scientific articles: Scopus, OAK, subject areas, quartile and key journal information.',
      found: 'Journals found',
      emptyTitle: 'No journals found',
      emptyDescription:
        'Try changing the filters or reset your search.'
    };
  }

  return {
    badge: 'Каталог журналов',
    title: 'Каталог научных журналов',
    description:
      'База журналов для публикации научных статей: Scopus, OAK, отраслевые направления, квартиль и основная информация по каждому изданию.',
    found: 'Найдено журналов',
    emptyTitle: 'Журналы не найдены',
    emptyDescription:
      'Попробуйте изменить параметры фильтрации или сбросить поиск.'
  };
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

  return (
    <main className="pb-16">
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-[#F1D8C8] bg-gradient-to-br from-[#FFF8F3] via-[#FFF4ED] to-white p-8 shadow-[0_10px_30px_rgba(17,17,17,0.06)] sm:p-10">
          <div className="inline-flex rounded-full border border-[#FFD8C2] bg-white px-4 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#FF6C26]">
            {copy.badge}
          </div>

          <h1 className="mt-5 text-4xl font-bold leading-tight text-[#111111] sm:text-5xl">
            {copy.title}
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-[#5C5C5C] sm:text-lg">
            {copy.description}
          </p>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <JournalFilters searchParams={query} locale={locale} />
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 inline-flex rounded-full border border-[#ECE3DC] bg-[#FFF8F3] px-4 py-2 text-sm font-semibold text-[#6B6B6B]">
          {copy.found}: {filteredJournals.length}
        </div>

        {filteredJournals.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredJournals.map((journal) => (
              <JournalCard key={journal.id} journal={journal} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-[#D8CEC6] bg-white p-10 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-[#111111]">
              {copy.emptyTitle}
            </h2>
            <p className="mt-3 text-[#5C5C5C]">{copy.emptyDescription}</p>
          </div>
        )}
      </section>
    </main>
  );
}
