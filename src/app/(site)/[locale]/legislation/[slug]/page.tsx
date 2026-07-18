import Link from 'next/link';
import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import {
  getLegislationBySlug,
  getLegislationSlugs,
  normalizeLocale,
  pickLocalizedText,
  siteLocales
} from '@/lib/legislation';
import type {SiteLocale} from '@/types/legislation';

type Props = {
  params: Promise<{locale: string; slug: string}>;
};

function getCopy(locale: SiteLocale) {
  if (locale === 'uz') {
    return {
      back: '← Qonunchilik bo‘limiga qaytish',
      source: 'Rasmiy manba',
      openSource: 'Rasmiy manbani ochish',
      summary: 'Qisqacha',
      content: 'Asosiy mazmun',
      note:
        'Yakuniy tekshiruvni doimo hujjatning rasmiy manbasi va amaldagi tahriri orqali bajaring.'
    };
  }

  if (locale === 'en') {
    return {
      back: '← Back to legislation',
      source: 'Official source',
      openSource: 'Open official source',
      summary: 'Overview',
      content: 'Main content',
      note:
        'Always verify the final interpretation using the official source and the current version of the document.'
    };
  }

  return {
    back: '← Назад к законодательству',
    source: 'Официальный источник',
    openSource: 'Открыть официальный источник',
    summary: 'Кратко',
    content: 'Основное содержание',
    note:
      'Финальную проверку всегда выполняйте по официальному источнику и актуальной редакции документа.'
  };
}

export async function generateMetadata({
  params
}: Props): Promise<Metadata> {
  const {locale: rawLocale, slug} = await params;
  const locale = normalizeLocale(rawLocale);
  const document = await getLegislationBySlug(slug);

  if (!document) {
    return {
      title:
        locale === 'uz'
          ? 'Hujjat topilmadi'
          : locale === 'en'
            ? 'Document not found'
            : 'Документ не найден',
      description:
        locale === 'uz'
          ? 'So‘ralgan hujjat topilmadi.'
          : locale === 'en'
            ? 'The requested document was not found.'
            : 'Запрошенный документ не найден.'
    };
  }

  return {
    title: pickLocalizedText(document.title, locale),
    description: pickLocalizedText(document.summary, locale),
    alternates: {
      canonical: `/${locale}/legislation/${document.slug}`,
      languages: {
        ru: `/ru/legislation/${document.slug}`,
        uz: `/uz/legislation/${document.slug}`,
        en: `/en/legislation/${document.slug}`
      }
    }
  };
}

export async function generateStaticParams() {
  const slugs = await getLegislationSlugs();

  return siteLocales.flatMap((locale) =>
    slugs.map((slug) => ({
      locale,
      slug
    }))
  );
}

export default async function LegislationDetailPage({params}: Props) {
  const {locale: rawLocale, slug} = await params;
  const locale = normalizeLocale(rawLocale);
  const copy = getCopy(locale);
  const document = await getLegislationBySlug(slug);

  if (!document) {
    notFound();
  }

  return (
    <main className="pb-16">
      <section className="mx-auto max-w-4xl px-4 pt-8 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}/legislation`}
          className="inline-flex items-center text-sm font-medium text-[#6B6B6B] transition hover:text-[#FF6C26]"
        >
          {copy.back}
        </Link>

        <article className="mt-6 rounded-[32px] border border-[#F1D8C8] bg-gradient-to-br from-[#FFF8F3] via-[#FFF4ED] to-white p-6 shadow-[0_14px_40px_rgba(17,17,17,0.06)] sm:p-8 lg:p-10">
          <h1 className="text-3xl font-bold leading-tight text-[#111111] sm:text-4xl">
            {pickLocalizedText(document.title, locale)}
          </h1>

          <section className="mt-8 rounded-3xl border border-[#ECE3DC] bg-white p-5 shadow-sm sm:p-6">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#B56A42]">
              {copy.summary}
            </div>

            <p className="mt-3 text-sm leading-8 text-[#5C5C5C] sm:text-base">
              {pickLocalizedText(document.summary, locale)}
            </p>
          </section>

          <section className="mt-8 rounded-3xl border border-[#ECE3DC] bg-white p-5 shadow-sm sm:p-6">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#B56A42]">
              {copy.content}
            </div>

            <div className="mt-5 space-y-5">
              {document.body.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-sm leading-8 text-[#5C5C5C] sm:text-base"
                >
                  {pickLocalizedText(paragraph, locale)}
                </p>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-3xl border border-[#F3DDD1] bg-[#FFF8F3] p-5 sm:p-6">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#B56A42]">
              {copy.source}
            </div>

            <a
              href={document.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex rounded-2xl bg-[#FF6C26] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#E85E1B]"
            >
              {copy.openSource}
            </a>

            <p className="mt-4 text-sm leading-7 text-[#5C5C5C]">
              {copy.note}
            </p>
          </section>
        </article>
      </section>
    </main>
  );
}
