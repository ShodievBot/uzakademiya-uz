'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';

const locales = ['ru', 'uz', 'en'] as const;

function buildLocalePath(pathname: string, nextLocale: string) {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return `/${nextLocale}`;
  }

  if (['ru', 'uz', 'en'].includes(segments[0])) {
    segments[0] = nextLocale;
  } else {
    segments.unshift(nextLocale);
  }

  return `/${segments.join('/')}`;
}

function getCurrentLocale(pathname: string) {
  const first = pathname.split('/').filter(Boolean)[0];
  return ['ru', 'uz', 'en'].includes(first) ? first : 'ru';
}

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const currentLocale = getCurrentLocale(pathname);

  return (
    <div className="flex items-center gap-2">
      {locales.map((item) => {
        const isActive = item === currentLocale;

        return (
          <Link
            key={item}
            href={buildLocalePath(pathname, item)}
            className={[
              'inline-flex h-8 min-w-8 items-center justify-center rounded-full border px-3 text-xs font-semibold transition',
              isActive
                ? 'border-slate-900 bg-slate-900 text-white'
                : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:text-slate-900'
            ].join(' ')}
          >
            {item.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
