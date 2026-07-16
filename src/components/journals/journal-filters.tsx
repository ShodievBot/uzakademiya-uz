import {getUniqueSubjects} from '@/lib/journals';

type JournalFiltersProps = {
  locale?: string;
  searchParams: {
    q?: string;
    scopus?: string;
    oak?: string;
    subject?: string;
    quartile?: string;
  };
};

function getCopy(locale: string) {
  if (locale === 'uz') {
    return {
      searchPlaceholder: 'Nomi yoki nashriyot bo‘yicha qidirish',
      scopusAll: 'Scopus: barchasi',
      scopusYes: 'Faqat Scopus',
      scopusNo: 'Scopus emas',
      oakAll: 'OAK: barchasi',
      oakYes: 'Faqat OAK',
      oakNo: 'OAK emas',
      subjectAll: 'Barcha yo‘nalishlar',
      quartileAll: 'Kvartil: barchasi',
      submit: 'Qidirish'
    };
  }

  if (locale === 'en') {
    return {
      searchPlaceholder: 'Search by title or publisher',
      scopusAll: 'Scopus: all',
      scopusYes: 'Scopus only',
      scopusNo: 'Not in Scopus',
      oakAll: 'OAK: all',
      oakYes: 'OAK only',
      oakNo: 'Not OAK',
      subjectAll: 'All subjects',
      quartileAll: 'Quartile: all',
      submit: 'Search'
    };
  }

  return {
    searchPlaceholder: 'Поиск по названию или издателю',
    scopusAll: 'Scopus: все',
    scopusYes: 'Только Scopus',
    scopusNo: 'Не в Scopus',
    oakAll: 'OAK: все',
    oakYes: 'Только OAK',
    oakNo: 'Не OAK',
    subjectAll: 'Все отрасли',
    quartileAll: 'Квартиль: все',
    submit: 'Найти'
  };
}

export function JournalFilters({
  searchParams,
  locale = 'ru'
}: JournalFiltersProps) {
  const subjects = getUniqueSubjects();
  const copy = getCopy(locale);

  return (
    <form className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-2 xl:grid-cols-5">
      <input
        type="text"
        name="q"
        defaultValue={searchParams.q || ''}
        placeholder={copy.searchPlaceholder}
        className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
      />

      <select
        name="scopus"
        defaultValue={searchParams.scopus || ''}
        className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
      >
        <option value="">{copy.scopusAll}</option>
        <option value="yes">{copy.scopusYes}</option>
        <option value="no">{copy.scopusNo}</option>
      </select>

      <select
        name="oak"
        defaultValue={searchParams.oak || ''}
        className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
      >
        <option value="">{copy.oakAll}</option>
        <option value="yes">{copy.oakYes}</option>
        <option value="no">{copy.oakNo}</option>
      </select>

      <select
        name="subject"
        defaultValue={searchParams.subject || ''}
        className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
      >
        <option value="">{copy.subjectAll}</option>
        {subjects.map((subject) => (
          <option key={subject} value={subject}>
            {subject}
          </option>
        ))}
      </select>

      <div className="flex gap-3">
        <select
          name="quartile"
          defaultValue={searchParams.quartile || ''}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
        >
          <option value="">{copy.quartileAll}</option>
          <option value="Q1">Q1</option>
          <option value="Q2">Q2</option>
          <option value="Q3">Q3</option>
          <option value="Q4">Q4</option>
        </select>

        <button
          type="submit"
          className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          {copy.submit}
        </button>
      </div>
    </form>
  );
}
