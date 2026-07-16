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
      useful: 'Useful materials',
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
    useful: 'Полезные материалы',
    contacts: 'Контакты',
    rights: 'Все права защищены'
  };
}

export default function SiteFooter() {
  const pathname = usePathname();
  const text = getFooterText(pathname);

  return (
    <footer className="mt-20 border-t border-[#1E1E1E] bg-[#111111] text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8">
        <div className="max-w-md">
          <div className="text-lg font-bold text-white">UzAkademiya.uz</div>
          <p className="mt-3 text-sm leading-7 text-white/75">
            {text.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-white/80">
          <Link href={withLocale(pathname, '/journals')} className="transition hover:text-[#FF6C26]">
            {text.journals}
          </Link>
          <Link href={withLocale(pathname, '/scopus')} className="transition hover:text-[#FF6C26]">
            {text.scopus}
          </Link>
          <Link href={withLocale(pathname, '/oak')} className="transition hover:text-[#FF6C26]">
            {text.oak}
          </Link>
          <Link href={withLocale(pathname, '/legislation')} className="transition hover:text-[#FF6C26]">
            {text.legislation}
          </Link>
          <Link href={withLocale(pathname, '/useful')} className="transition hover:text-[#FF6C26]">
            {text.useful}
          </Link>
          <Link href={withLocale(pathname, '/contacts')} className="transition hover:text-[#FF6C26]">
            {text.contacts}
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 text-sm text-white/60 sm:px-6 lg:px-8">
          <span>© 2026 UzAkademiya.uz</span>
          <span>{text.rights}</span>
        </div>
      </div>
    </footer>
  );
}
