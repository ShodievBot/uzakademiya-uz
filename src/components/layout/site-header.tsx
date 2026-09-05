import Link from 'next/link';
import LanguageSwitcher from './language-switcher';
import MobileMenu from './mobile-menu';
import NavLinks from './nav-links';

type SiteHeaderProps = {
  locale: string;
};

function withLocale(locale: string, href: string) {
  if (href === '/') return `/${locale}`;
  return `/${locale}${href}`;
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
      useful: 'Foydali materiallar',
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
      useful: 'Useful materials',
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
    useful: 'Полезные материалы',
    contacts: 'Контакты',
    contactCta: 'Связаться'
  };
}

export default function SiteHeader({locale}: SiteHeaderProps) {
  const copy = getCopy(locale);

  const navItems = [
    {href: '/', label: copy.home},
    {href: '/journals', label: copy.journals},
    {href: '/scopus', label: copy.scopus},
    {href: '/oak', label: copy.oak},
    {href: '/legislation', label: copy.legislation},
    {href: '/useful', label: copy.useful},
    {href: '/contacts', label: copy.contacts}
  ];

  const localizedNav = navItems.map((item) => ({
    ...item,
    href: withLocale(locale, item.href)
  }));

  return (
    <header className="sticky top-0 z-50 border-b border-[#F0E2D8] bg-white/90 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[78px] items-center justify-between gap-4">
          <Link
            href={withLocale(locale, '/')}
            className="group flex shrink-0 items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6C26] rounded-2xl"
            aria-label="UzAkademiya.uz — home"
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

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label={copy.menu}
          >
            <NavLinks items={localizedNav} />
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitcher />

            <Link
              href={withLocale(locale, '/contacts')}
              className="inline-flex rounded-2xl border border-[#FFD8C2] bg-[#FFF4EC] px-5 py-3 text-sm font-bold text-[#E85E1B] transition hover:border-[#FF6C26] hover:bg-[#FF6C26] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6C26]"
            >
              {copy.contactCta}
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher />
            <MobileMenu
              locale={locale}
              navItems={localizedNav}
              copy={{
                menu: copy.menu,
                close: copy.close,
                contactCta: copy.contactCta,
                contactHref: withLocale(locale, '/contacts')
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
