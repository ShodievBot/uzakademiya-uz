import Link from 'next/link';
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
      title: 'Jurnalni filtrlar orqali toping',
      description:
        'Qidiruv, indeksatsiya, yo‘nalish va kvartil bo‘yicha mos jurnallarni ajrating.',
      searchLabel: 'Qidiruv',
      searchPlaceholder: 'Nomi yoki nashriyot bo‘yicha qidirish',
      scopusLabel: 'Scopus',
      scopusAll: 'Barchasi',
      scopusYes: 'Faqat Scopus',
      scopusNo: 'Scopus emas',
      oakLabel: 'OAK',
      oakAll: 'Barchasi',
      oakYes: 'Faqat OAK',
      oakNo: 'OAK emas',
      subjectLabel: 'Yo‘nalish',
      subjectAll: 'Barcha yo‘nalishlar',
      quartileLabel: 'Kvartil',
      quartileAll: 'Barcha kvartillar',
      submit: 'Qidirish',
      reset: 'Tozalash'
    };
  }

  if (locale === 'en') {
    return {
      title: 'Find a journal using filters',
      description:
        'Narrow down suitable journals by search, indexing, subject area, and quartile.',
      searchLabel: 'Search',
      searchPlaceholder: 'Search by title or publisher',
      scopusLabel: 'Scopus',
      scopusAll: 'All',
      scopusYes: 'Scopus only',
      scopusNo: 'Not in Scopus',
      oakLabel: 'SAC',
      oakAll: 'All',
      oakYes: 'SAC only',
      oakNo: 'Not SAC',
      subjectLabel: 'Subject',
      subjectAll: 'All subjects',
      quartileLabel: 'Quartile',
      quartileAll: 'All quartiles',
      submit: 'Search',
      reset: 'Clear'
    };
  }

  return {
    title: 'Найдите журнал с помощью фильтров',
    description:
      'Сузьте выбор подходящих журналов по поиску, индексации, направлению и квартилю.',
    searchLabel: 'Поиск',
    searchPlaceholder: 'Поиск по названию или издателю',
    scopusLabel: 'Scopus',
    scopusAll: 'Все',
    scopusYes: 'Только Scopus',
    scopusNo: 'Не в Scopus',
    oakLabel: 'ВАК',
    oakAll: 'Все',
    oakYes: 'Только ВАК',
    oakNo: 'Не ВАК',
    subjectLabel: 'Отрасль',
    subjectAll: 'Все отрасли',
    quartileLabel: 'Квартиль',
    quartileAll: 'Все квартили',
    submit: 'Найти',
    reset: 'Очистить'
  };
}

function withLocale(locale: string, href: string) {
  if (href === '/') return `/${locale}`;
  return `/${locale}${href}`;
}

function hasActiveFilters(searchParams: JournalFiltersProps['searchParams']) {
  return Boolean(
    searchParams.q ||
      searchParams.scopus ||
      searchParams.oak ||
      searchParams.subject ||
      searchParams.quartile
  );
}

export function JournalFilters({
  searchParams,
  locale = 'ru'
}: JournalFiltersProps) {
  const subjects = getUniqueSubjects();
  const copy = getCopy(locale);
  const active = hasActiveFilters(searchParams);

  return (
    <section className="rounded-[32px] border border-[#F0E2D8] bg-white p-5 shadow-[0_10px_28px_rgba(17,17,17,0.05)] sm:p-6 lg:p-7">
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#111111]">{copy.title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-[#6B6B6B]">
            {copy.description}
          </p>
        </div>

        {active && (
          <Link
            href={withLocale(locale, '/journals')}
            className="inline-flex rounded-2xl border border-[#ECE3DC] bg-[#FFF8F3] px-5 py-3 text-sm font-semibold text-[#111111] transition hover:bg-white"
          >
            {copy.reset}
          </Link>
        )}
      </div>

      <form className="grid gap-4 md:grid-cols-2 xl:grid-cols-12">
        <div className="xl:col-span-4">
          <label className="mb-2 block text-sm font-semibold text-[#111111]">
            {copy.searchLabel}
          </label>
          <input
            type="text"
            name="q"
            defaultValue={searchParams.q || ''}
            placeholder={copy.searchPlaceholder}
            className="w-full rounded-2xl border border-[#ECE3DC] bg-[#FFFDFC] px-4 py-3.5 text-sm text-[#111111] outline-none transition placeholder:text-[#9A8F87] focus:border-[#FF6C26] focus:bg-white"
          />
        </div>

        <div className="xl:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-[#111111]">
            {copy.scopusLabel}
          </label>
          <select
            name="scopus"
            defaultValue={searchParams.scopus || ''}
            className="w-full rounded-2xl border border-[#ECE3DC] bg-white px-4 py-3.5 text-sm text-[#111111] outline-none transition focus:border-[#FF6C26]"
          >
            <option value="">{copy.scopusAll}</option>
            <option value="yes">{copy.scopusYes}</option>
            <option value="no">{copy.scopusNo}</option>
          </select>
        </div>

        <div className="xl:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-[#111111]">
            {copy.oakLabel}
          </label>
          <select
            name="oak"
            defaultValue={searchParams.oak || ''}
            className="w-full rounded-2xl border border-[#ECE3DC] bg-white px-4 py-3.5 text-sm text-[#111111] outline-none transition focus:border-[#FF6C26]"
          >
            <option value="">{copy.oakAll}</option>
            <option value="yes">{copy.oakYes}</option>
            <option value="no">{copy.oakNo}</option>
          </select>
        </div>

        <div className="xl:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-[#111111]">
            {copy.subjectLabel}
          </label>
          <select
            name="subject"
            defaultValue={searchParams.subject || ''}
            className="w-full rounded-2xl border border-[#ECE3DC] bg-white px-4 py-3.5 text-sm text-[#111111] outline-none transition focus:border-[#FF6C26]"
          >
            <option value="">{copy.subjectAll}</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        <div className="xl:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-[#111111]">
            {copy.quartileLabel}
          </label>
          <select
            name="quartile"
            defaultValue={searchParams.quartile || ''}
            className="w-full rounded-2xl border border-[#ECE3DC] bg-white px-4 py-3.5 text-sm text-[#111111] outline-none transition focus:border-[#FF6C26]"
          >
            <option value="">{copy.quartileAll}</option>
            <option value="Q1">Q1</option>
            <option value="Q2">Q2</option>
            <option value="Q3">Q3</option>
            <option value="Q4">Q4</option>
          </select>
        </div>

        <div className="xl:col-span-12">
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-2xl bg-[#FF6C26] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#E85E1B]"
            >
              {copy.submit}
            </button>

            {active && (
              <Link
                href={withLocale(locale, '/journals')}
                className="inline-flex items-center justify-center rounded-2xl border border-[#ECE3DC] bg-white px-6 py-3.5 text-sm font-semibold text-[#111111] transition hover:bg-[#FFF8F3]"
              >
                {copy.reset}
              </Link>
            )}
          </div>
        </div>
      </form>
    </section>
  );
}
