'use client';

import Link from 'next/link';
import {usePathname, useSearchParams} from 'next/navigation';

const locales = ['ru', 'uz', 'en'] as const;

function buildLocalePath(
  pathname: string,
  nextLocale: string,
  search: string
) {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return search ? `/${nextLocale}?${search}` : `/${nextLocale}`;
  }

  if (['ru', 'uz', 'en'].includes(segments[0])) {
    segments[0] = nextLocale;
  } else {
    segments.unshift(nextLocale);
  }

  const nextPath = `/${segments.join('/')}`;
  return search ? `${nextPath}?${search}` : nextPath;
}

function getCurrentLocale(pathname: string) {
  const first = pathname.split('/').filter(Boolean)[0];
  return ['ru', 'uz', 'en'].includes(first) ? first : 'ru';
}

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLocale = getCurrentLocale(pathname);
  const search = searchParams.toString();

  return (
    <div className="flex items-center gap-2">
      {locales.map((item) => {
        const isActive = item === currentLocale;

        return (
          <Link
            key={item}
            href={buildLocalePath(pathname, item, search)}
            className={[
              'inline-flex h-9 min-w-9 items-center justify-center rounded-full border px-3 text-xs transition',
              isActive
                ? 'border-[#FF6C26] bg-[#FF6C26] font-bold text-white'
                : 'border-[#E7DDD4] bg-white font-semibold text-[#555555] hover:border-[#FF6C26] hover:bg-[#FFF1E8] hover:text-[#111111]'
            ].join(' ')}
          >
            {item.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
