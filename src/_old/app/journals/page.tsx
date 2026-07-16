import { JournalCard } from "@/components/journals/journal-card";
import { JournalFilters } from "@/components/journals/journal-filters";
import { getFilteredJournals } from "@/lib/journals";

type JournalsPageProps = {
  searchParams?: Promise<{
    q?: string;
    scopus?: string;
    oak?: string;
    subject?: string;
    quartile?: string;
  }>;
};

export default async function JournalsPage({ searchParams }: JournalsPageProps) {
  const params = (await searchParams) || {};

  const filteredJournals = getFilteredJournals({
    q: params.q,
    scopus: params.scopus,
    oak: params.oak,
    subject: params.subject,
    quartile: params.quartile,
  });

  return (
    <main className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Каталог научных журналов
          </h1>
          <p className="mt-3 max-w-3xl text-slate-600">
            База журналов для публикации научных статей: Scopus, OAK,
            отраслевые направления, квартиль и основная информация по каждому
            изданию.
          </p>
        </div>

        <div className="mb-8">
          <JournalFilters searchParams={params} />
        </div>

        <div className="mb-6 text-sm text-slate-500">
          Найдено журналов: <span className="font-semibold">{filteredJournals.length}</span>
        </div>

        {filteredJournals.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredJournals.map((journal) => (
              <JournalCard key={journal.id} journal={journal} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <h2 className="text-xl font-semibold text-slate-900">
              Журналы не найдены
            </h2>
            <p className="mt-2 text-slate-600">
              Попробуйте изменить параметры фильтрации или сбросить поиск.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
