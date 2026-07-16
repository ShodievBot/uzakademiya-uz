'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';

function withLocale(pathname: string, href: string) {
  const segments = pathname.split('/').filter(Boolean);
  const locale =
    segments[0] && ['ru', 'uz', 'en'].includes(segments[0]) ? segments[0] : 'ru';

  if (href === '/') return `/${locale}`;
  return `/${locale}${href}`;
}

function getFooterText(pathname: string) {
  const locale = pathname.split('/').filter(Boolean)[0] || 'ru';

  if (locale === 'uz') {
    return {
      description:
        'Ilmiy jurnallar katalogi va Scopus, OAK, qonunchilik hamda nashr talablari bo‘yicha ma’lumot platformasi.',
      journals: 'Jurnallar',
      scopus: 'Scopus',
      oak: 'OAK',
      legislation: 'Qonunchilik',
      useful: 'Foydali ma’lumotlar',
      contacts: 'Kontaktlar',
      rights: 'Barcha huquqlar himoyalangan'
    };
  }

  if (locale === 'en') {
    return {
      description:
        'Scientific journal catalog and reference platform for Scopus, SAC, legislation and publication requirements.',
      journals: 'Journals',
      scopus: 'Scopus',
      oak: 'SAC',
      legislation: 'Legislation',
      useful: 'Useful data',
      contacts: 'Contacts',
      rights: 'All rights reserved'
    };
  }

  return {
    description:
      'Каталог научных журналов и справочная платформа по Scopus, ВАК, законодательству и публикационным требованиям.',
    journals: 'Журналы',
    scopus: 'Scopus',
    oak: 'ВАК',
    legislation: 'Законодательство',
    useful: 'Полезные данные',
    contacts: 'Контакты',
    rights: 'Все права защищены'
  };
}

export default function SiteFooter() {
  const pathname = usePathname();
  const text = getFooterText(pathname);

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <div className="text-base font-semibold text-slate-900">
            UzAkademiya.uz
          </div>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
            {text.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
          <Link href={withLocale(pathname, '/journals')} className="transition hover:text-slate-900">
            {text.journals}
          </Link>
          <Link href={withLocale(pathname, '/scopus')} className="transition hover:text-slate-900">
            {text.scopus}
          </Link>
          <Link href={withLocale(pathname, '/oak')} className="transition hover:text-slate-900">
            {text.oak}
          </Link>
          <Link href={withLocale(pathname, '/legislation')} className="transition hover:text-slate-900">
            {text.legislation}
          </Link>
          <Link href={withLocale(pathname, '/useful')} className="transition hover:text-slate-900">
            {text.useful}
          </Link>
          <Link href={withLocale(pathname, '/contacts')} className="transition hover:text-slate-900">
            {text.contacts}
          </Link>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 text-sm text-slate-500 sm:px-6 lg:px-8">
          <span>© 2026 UzAkademiya.uz</span>
          <span>{text.rights}</span>
        </div>
      </div>
    </footer>
  );
}
