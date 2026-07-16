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
    <main className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {copy.title}
          </h1>
          <p className="mt-3 max-w-3xl text-slate-600">
            {copy.description}
          </p>
        </div>

        <div className="mb-8">
          <JournalFilters searchParams={query} locale={locale} />
        </div>

        <div className="mb-6 text-sm text-slate-500">
          {copy.found}:{' '}
          <span className="font-semibold">{filteredJournals.length}</span>
        </div>

        {filteredJournals.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredJournals.map((journal) => (
              <JournalCard key={journal.id} journal={journal} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <h2 className="text-xl font-semibold text-slate-900">
              {copy.emptyTitle}
            </h2>
            <p className="mt-2 text-slate-600">{copy.emptyDescription}</p>
          </div>
        )}
      </section>
    </main>
  );
}
