'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';

const LOCALES = ['ru', 'uz', 'en'];

function getCurrentLocale(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);
  return segments[0] && LOCALES.includes(segments[0]) ? segments[0] : 'ru';
}

function withLocale(pathname: string, href: string) {
  const locale = getCurrentLocale(pathname);

  if (href === '/') return `/${locale}`;
  return `/${locale}${href}`;
}

function getCopy(locale: string) {
  if (locale === 'uz') {
    return {
      brandTitleFallback: 'UzAkademiya.uz',
      description:
        'Ilmiy jurnallar katalogi, Scopus va OAK bo‘yicha yo‘riqnoma, foydali materiallar hamda nashr navigatsiyasi uchun qulay platforma.',
      navTitle: 'Navigatsiya',
      guidesTitle: 'Asosiy bo‘limlar',
      contactTitle: 'Yordam kerakmi?',
      contactText:
        'Jurnal tanlash, maqola talablari va yuborish tartibi bo‘yicha biz bilan bog‘laning.',
      home: 'Bosh sahifa',
      journals: 'Jurnallar',
      scopus: 'Scopus',
      oak: 'OAK',
      legislation: 'Qonunchilik',
      useful: 'Foydali',
      contacts: 'Kontaktlar',
      contactCta: 'Kontaktlarga o‘tish',
      rights: 'Barcha huquqlar himoyalangan',
      note: 'Platforma ma’lumot va navigatsiya uchun xizmat qiladi.'
    };
  }

  if (locale === 'en') {
    return {
      brandTitleFallback: 'UzAkademiya.uz',
      description:
        'A practical platform for journal catalog navigation, Scopus and SAC guidance, useful materials, and publication support.',
      navTitle: 'Navigation',
      guidesTitle: 'Main sections',
      contactTitle: 'Need help?',
      contactText:
        'Contact us for journal selection, article requirements, and submission guidance.',
      home: 'Home',
      journals: 'Journals',
      scopus: 'Scopus',
      oak: 'SAC',
      legislation: 'Legislation',
      useful: 'Useful',
      contacts: 'Contacts',
      contactCta: 'Go to contacts',
      rights: 'All rights reserved',
      note: 'The platform is intended for navigation and reference.'
    };
  }

  return {
    brandTitleFallback: 'UzAkademiya.uz',
    description:
      'Удобная платформа для навигации по каталогу научных журналов, Scopus, ВАК, полезным материалам и публикационным маршрутам.',
    navTitle: 'Навигация',
    guidesTitle: 'Основные разделы',
    contactTitle: 'Нужна помощь?',
    contactText:
      'Свяжитесь с нами по вопросам подбора журнала, требований к статье и маршрута подачи.',
    home: 'Главная',
    journals: 'Журналы',
    scopus: 'Scopus',
    oak: 'ВАК',
    legislation: 'Законодательство',
    useful: 'Полезное',
    contacts: 'Контакты',
    contactCta: 'Перейти в контакты',
    rights: 'Все права защищены',
    note: 'Платформа носит навигационный и справочный характер.'
  };
}

type Props = {
  siteName?: string;
};

export default function SiteFooterClient({siteName}: Props) {
  const pathname = usePathname();
  const locale = getCurrentLocale(pathname);
  const copy = getCopy(locale);
  const year = new Date().getFullYear();
  const brandTitle = siteName || copy.brandTitleFallback;

  const navLinks = [
    {href: '/', label: copy.home},
    {href: '/journals', label: copy.journals},
    {href: '/contacts', label: copy.contacts}
  ];

  const guideLinks = [
    {href: '/scopus', label: copy.scopus},
    {href: '/oak', label: copy.oak},
    {href: '/legislation', label: copy.legislation},
    {href: '/useful', label: copy.useful}
  ];

  return (
    <footer className="mt-20 border-t border-[#F0E2D8] bg-gradient-to-b from-[#FFFAF6] to-[#FFF3EB]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.7fr_0.8fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF7A36] to-[#FF5E12] text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(255,108,38,0.25)]">
                UZ
              </div>

              <div>
                <div className="text-lg font-bold text-[#111111]">
                  {brandTitle}
                </div>
                <div className="text-xs font-medium text-[#8A7B72]">
                  {copy.note}
                </div>
              </div>
            </div>

            <p className="mt-4 max-w-md text-sm leading-7 text-[#5C5C5C]">
              {copy.description}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#A57252]">
              {copy.navTitle}
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={withLocale(pathname, item.href)}
                  className="text-[#3E3E3E] transition hover:text-[#E85E1B]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#A57252]">
              {copy.guidesTitle}
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm">
              {guideLinks.map((item) => (
                <Link
                  key={item.href}
                  href={withLocale(pathname, item.href)}
                  className="text-[#3E3E3E] transition hover:text-[#E85E1B]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-[#F0E2D8] bg-white/80 p-6 shadow-[0_8px_24px_rgba(17,17,17,0.04)]">
            <h3 className="text-xl font-bold text-[#111111]">
              {copy.contactTitle}
            </h3>

            <p className="mt-3 text-sm leading-7 text-[#5C5C5C]">
              {copy.contactText}
            </p>

            <Link
              href={withLocale(pathname, '/contacts')}
              className="mt-5 inline-flex rounded-2xl bg-[#FF6C26] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#E85E1B]"
            >
              {copy.contactCta}
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-[#EEDFD5]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-sm text-[#7A6D65] sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <span>© {year} {brandTitle}</span>
          <span>{copy.rights}</span>
        </div>
      </div>
    </footer>
  );
}
