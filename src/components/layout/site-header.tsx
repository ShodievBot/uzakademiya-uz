'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useState} from 'react';
import LanguageSwitcher from './language-switcher';

const LOCALES = ['ru', 'uz', 'en'];

function stripLocale(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) return '/';

  if (LOCALES.includes(segments[0])) {
    const rest = segments.slice(1);
    return rest.length ? `/${rest.join('/')}` : '/';
  }

  return pathname;
}

function getCurrentLocale(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);
  return segments[0] && LOCALES.includes(segments[0]) ? segments[0] : 'ru';
}

function withLocale(pathname: string, href: string) {
  const locale = getCurrentLocale(pathname);

  if (href === '/') return `/${locale}`;
  return `/${locale}${href}`;
}

function isActivePath(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

function getCopy(locale: string) {
  if (locale === 'uz') {
    return {
      brandNote: 'Akademik platforma',
      menu: 'Menyu',
      close: 'Yopish',
      home: 'Bosh sahifa',
      journals: 'Jurnallar',
      scopus: 'Scopus',
      oak: 'OAK',
      legislation: 'Qonunchilik',
      useful: 'Foydali',
      contacts: 'Kontaktlar',
      contactCta: 'Bog‘lanish'
    };
  }

  if (locale === 'en') {
    return {
      brandNote: 'Academic platform',
      menu: 'Menu',
      close: 'Close',
      home: 'Home',
      journals: 'Journals',
      scopus: 'Scopus',
      oak: 'SAC',
      legislation: 'Legislation',
      useful: 'Useful',
      contacts: 'Contacts',
      contactCta: 'Contact us'
    };
  }

  return {
    brandNote: 'Академическая платформа',
    menu: 'Меню',
    close: 'Закрыть',
    home: 'Главная',
    journals: 'Журналы',
    scopus: 'Scopus',
    oak: 'ВАК',
    legislation: 'Законодательство',
    useful: 'Полезное',
    contacts: 'Контакты',
    contactCta: 'Связаться'
  };
}

export default function SiteHeader() {
  const pathname = usePathname();
  const normalizedPath = stripLocale(pathname);
  const locale = getCurrentLocale(pathname);
  const copy = getCopy(locale);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    {href: '/', label: copy.home},
    {href: '/journals', label: copy.journals},
    {href: '/scopus', label: copy.scopus},
    {href: '/oak', label: copy.oak},
    {href: '/legislation', label: copy.legislation},
    {href: '/useful', label: copy.useful},
    {href: '/contacts', label: copy.contacts}
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#F0E2D8] bg-white/90 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[78px] items-center justify-between gap-4">
          <Link
            href={withLocale(pathname, '/')}
            className="group flex shrink-0 items-center gap-3"
            onClick={() => setMobileOpen(false)}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF7A36] to-[#FF5E12] text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(255,108,38,0.30)]">
              UZ
            </div>

            <div className="min-w-0">
              <div className="text-lg font-bold tracking-tight text-[#111111] transition group-hover:text-[#E85E1B]">
                UzAkademiya.uz
              </div>
              <div className="text-xs font-medium text-[#8A7B72]">
                {copy.brandNote}
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const active = isActivePath(normalizedPath, item.href);

              return (
                <Link
                  key={item.href}
                  href={withLocale(pathname, item.href)}
                  className={[
                    'rounded-2xl px-4 py-2.5 text-sm transition',
                    active
                      ? 'bg-[#FF6C26] font-bold text-white shadow-[0_8px_18px_rgba(255,108,38,0.24)]'
                      : 'font-medium text-[#4C4C4C] hover:bg-[#FFF3EB] hover:text-[#111111]'
                  ].join(' ')}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitcher />

            <Link
              href={withLocale(pathname, '/contacts')}
              className="inline-flex rounded-2xl border border-[#FFD8C2] bg-[#FFF4EC] px-5 py-3 text-sm font-bold text-[#E85E1B] transition hover:border-[#FF6C26] hover:bg-[#FF6C26] hover:text-white"
            >
              {copy.contactCta}
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher />

            <button
              type="button"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? copy.close : copy.menu}
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#EADCD2] bg-white text-[#111111] transition hover:border-[#FF6C26] hover:bg-[#FFF3EB]"
            >
              <span className="text-lg">{mobileOpen ? '×' : '☰'}</span>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-[#F0E2D8] pb-4 pt-4 lg:hidden">
            <nav className="grid gap-2">
              {navItems.map((item) => {
                const active = isActivePath(normalizedPath, item.href);

                return (
                  <Link
                    key={item.href}
                    href={withLocale(pathname, item.href)}
                    onClick={() => setMobileOpen(false)}
                    className={[
                      'rounded-2xl px-4 py-3 text-sm transition',
                      active
                        ? 'bg-[#FF6C26] font-bold text-white shadow-[0_8px_18px_rgba(255,108,38,0.20)]'
                        : 'border border-[#F1E5DC] bg-white font-medium text-[#444444] hover:bg-[#FFF6F0] hover:text-[#111111]'
                    ].join(' ')}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <Link
                href={withLocale(pathname, '/contacts')}
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex justify-center rounded-2xl bg-[#FF6C26] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#E85E1B]"
              >
                {copy.contactCta}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
