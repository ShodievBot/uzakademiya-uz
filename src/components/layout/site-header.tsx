'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import LanguageSwitcher from './language-switcher';

function stripLocale(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) return '/';

  if (['ru', 'uz', 'en'].includes(segments[0])) {
    const rest = segments.slice(1);
    return rest.length ? `/${rest.join('/')}` : '/';
  }

  return pathname;
}

function withLocale(pathname: string, href: string) {
  const segments = pathname.split('/').filter(Boolean);
  const locale =
    segments[0] && ['ru', 'uz', 'en'].includes(segments[0]) ? segments[0] : 'ru';

  if (href === '/') return `/${locale}`;
  return `/${locale}${href}`;
}

function getLabels(pathname: string) {
  const locale = pathname.split('/').filter(Boolean)[0] || 'ru';

  if (locale === 'uz') {
    return {
      home: 'Bosh sahifa',
      journals: 'Jurnallar',
      scopus: 'Scopus',
      oak: 'OAK',
      legislation: 'Qonunchilik',
      contacts: 'Kontaktlar'
    };
  }

  if (locale === 'en') {
    return {
      home: 'Home',
      journals: 'Journals',
      scopus: 'Scopus',
      oak: 'SAC',
      legislation: 'Legislation',
      contacts: 'Contacts'
    };
  }

  return {
    home: 'Главная',
    journals: 'Журналы',
    scopus: 'Scopus',
    oak: 'ВАК',
    legislation: 'Законодательство',
    contacts: 'Контакты'
  };
}

function isActivePath(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteHeader() {
  const pathname = usePathname();
  const normalizedPath = stripLocale(pathname);
  const labels = getLabels(pathname);

  const navItems = [
    {href: '/', label: labels.home},
    {href: '/journals', label: labels.journals},
    {href: '/scopus', label: labels.scopus},
    {href: '/oak', label: labels.oak},
    {href: '/legislation', label: labels.legislation},
    {href: '/contacts', label: labels.contacts}
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href={withLocale(pathname, '/')}
          className="text-lg font-bold tracking-tight text-slate-900"
        >
          UzAkademiya.uz
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const active = isActivePath(normalizedPath, item.href);

            return (
              <Link
                key={item.href}
                href={withLocale(pathname, item.href)}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                  active
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <LanguageSwitcher />
      </div>
    </header>
  );
}
