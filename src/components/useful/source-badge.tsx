import Link from 'next/link';
import type {LocalizedText, SiteLocale} from '@/types/useful-page';

type SourceBadgeSource = {
  url: string;
  title: string | LocalizedText;
};

function getLocalizedTitle(
  title: string | LocalizedText,
  locale: SiteLocale
) {
  if (typeof title === 'string') return title;
  return title[locale] || title.ru || title.uz || title.en;
}

function getCopy(locale: SiteLocale) {
  if (locale === 'uz') {
    return {
      source: 'Manba'
    };
  }

  if (locale === 'en') {
    return {
      source: 'Source'
    };
  }

  return {
    source: 'Источник'
  };
}

export function SourceBadge({
  source,
  locale = 'ru'
}: {
  source: SourceBadgeSource;
  locale?: SiteLocale;
}) {
  const copy = getCopy(locale);
  const title = getLocalizedTitle(source.title, locale);

  return (
    <span className="group relative ml-1 inline-flex align-super">
      <Link
        href={source.url}
        target="_blank"
        rel="noreferrer"
        aria-label={`${copy.source}: ${title}`}
        className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-700 transition hover:bg-slate-900 hover:text-white"
      >
        ?
      </Link>

      <span className="pointer-events-none absolute bottom-full left-1/2 z-30 hidden w-72 -translate-x-1/2 rounded-lg bg-slate-900 px-3 py-2 text-[11px] leading-4 text-white shadow-lg group-hover:block">
        <span className="font-semibold">{copy.source}</span>
        <br />
        {title}
      </span>
    </span>
  );
}
