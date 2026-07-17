import Link from 'next/link';
import {
  getUsefulPages,
  normalizeLocale,
  pickLocale,
  siteLocales
} from '@/lib/useful';
import type {SiteLocale} from '@/types/useful-page';
import type {Metadata} from 'next';

const dictionary: Record<
  SiteLocale,
  {
    badge: string;
    title: string;
    description: string;
    open: string;
    noteTitle: string;
    noteText: string;
    sourceNote: string;
  }
> = {
  ru: {
    badge: 'ПОЛЕЗНЫЕ МАТЕРИАЛЫ',
    title: 'Материалы для авторов и исследователей',
    description:
      'Справочные материалы по ORCID, DOI, Scopus, ВАК, антиплагиату, рецензированию, выбору журнала и публикационному процессу.',
    open: 'Открыть',
    noteTitle: 'Как использовать раздел',
    noteText:
      'Здесь собраны краткие справочные материалы. Для финальной проверки требований всегда сверяйтесь с официальными источниками.',
    sourceNote: 'Справочный материал'
  },
  uz: {
    badge: 'FOYDALI MATERIALLAR',
    title: 'Mualliflar va tadqiqotchilar uchun materiallar',
    description:
      'ORCID, DOI, Scopus, OAK, antiplagiat, taqriz, jurnal tanlash va nashr jarayoni bo‘yicha foydali ma’lumotlar.',
    open: 'Ochish',
    noteTitle: 'Bo‘limdan foydalanish',
    noteText:
      'Bu yerda qisqa yo‘riqnoma va ma’lumotlar jamlangan. Yakuniy talablarni doimo rasmiy manbalar bilan solishtiring.',
    sourceNote: 'Ma’lumot materiali'
  },
  en: {
    badge: 'USEFUL MATERIALS',
    title: 'Resources for authors and researchers',
    description:
      'Reference materials on ORCID, DOI, Scopus, SAC, plagiarism checks, peer review, journal selection, and publication workflows.',
    open: 'Open',
    noteTitle: 'How to use this section',
    noteText:
      'This section contains short reference materials. Always compare final requirements with official sources.',
    sourceNote: 'Reference material'
  }
};

function getMetadataCopy(locale: SiteLocale) {
  if (locale === 'uz') {
    return {
      title: 'Foydali materiallar — mualliflar uchun resurslar',
      description:
        'ORCID, DOI, Scopus, OAK, antiplagiat, taqriz va maqola nashri bo‘yicha foydali materiallar.'
    };
  }

  if (locale === 'en') {
    return {
      title: 'Useful materials — resources for authors',
      description:
        'Useful resources on ORCID, DOI, Scopus, SAC, plagiarism checks, peer review, and article publication.'
    };
  }

  return {
    title: 'Полезные материалы — ресурсы для авторов',
    description:
      'Справочные материалы по ORCID, DOI, Scopus, ВАК, антиплагиату, рецензированию и публикации статей.'
  };
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}> | {locale: string};
}): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const locale = normalizeLocale(resolvedParams.locale);
  const meta = getMetadataCopy(locale);

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${locale}/useful`,
      languages: {
        ru: '/ru/useful',
        uz: '/uz/useful',
        en: '/en/useful'
      }
    }
  };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return siteLocales.map((locale) => ({locale}));
}

export default async function UsefulListPage({
  params
}: {
  params: Promise<{locale: string}> | {locale: string};
}) {
  const resolvedParams = await Promise.resolve(params);
  const locale = normalizeLocale(resolvedParams.locale);

  const t = dictionary[locale];
  const pages = await getUsefulPages();

  return (
    <main className="pb-16">
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-[#F1D8C8] bg-gradient-to-br from-[#FFF8F3] via-[#FFF4ED] to-white p-8 shadow-[0_10px_30px_rgba(17,17,17,0.06)] sm:p-10">
          <div className="inline-flex rounded-full border border-[#FFD8C2] bg-white px-4 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#FF6C26]">
            {t.badge}
          </div>

          <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight text-[#111111] sm:text-5xl">
            {t.title}
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-[#5C5C5C] sm:text-lg">
            {t.description}
          </p>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {pages.map((page) => (
            <article
              key={page.slug}
              className="flex h-full flex-col rounded-3xl border border-[#ECE3DC] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="inline-flex w-fit rounded-full bg-[#FFF4ED] px-3 py-1 text-xs font-semibold text-[#B85A2B]">
                {t.sourceNote}
              </div>

              <h2 className="mt-4 text-2xl font-bold leading-tight text-[#111111]">
                {pickLocale(page.title, locale)}
              </h2>

              <p className="mt-4 flex-1 text-sm leading-7 text-[#5C5C5C]">
                {pickLocale(page.cardText, locale)}
              </p>

              <Link
                href={`/${locale}/useful/${page.slug}`}
                className="mt-6 inline-flex w-fit rounded-2xl bg-[#FF6C26] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#E85E1B]"
              >
                {t.open}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#ECE3DC] bg-[#FFF8F3] p-6">
          <h3 className="text-xl font-bold text-[#111111]">{t.noteTitle}</h3>
          <p className="mt-3 text-sm leading-7 text-[#5C5C5C]">{t.noteText}</p>
        </div>
      </section>
    </main>
  );
}
