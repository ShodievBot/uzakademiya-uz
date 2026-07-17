import Link from 'next/link';
import type {Metadata} from 'next';
import {
  getAllLegislation,
  normalizeLocale,
  pickLocalizedText,
  siteLocales
} from '@/lib/legislation';
import type {SiteLocale} from '@/types/legislation';

type Props = {
  params: Promise<{locale: string}> | {locale: string};
};

function withLocale(locale: string, href: string) {
  if (href === '/') return `/${locale}`;
  return `/${locale}${href}`;
}

const dictionary: Record<
  SiteLocale,
  {
    badge: string;
    title: string;
    description: string;
    open: string;
    noteTitle: string;
    noteText: string;
    cta: string;
    categories: Record<string, string>;
  }
> = {
  ru: {
    badge: 'Официальные источники',
    title: 'Законодательство и официальные документы',
    description:
      'Основные материалы по научной деятельности, аттестации, публикационным требованиям и официальным источникам.',
    open: 'Открыть документ',
    noteTitle: 'Важное примечание',
    noteText:
      'Финальную проверку актуальности документов и требований всегда выполняйте по официальным государственным источникам.',
    cta: 'Перейти в контакты',
    categories: {
      science: 'Научная деятельность',
      attestation: 'Аттестация',
      ethics: 'Публикационная этика'
    }
  },
  uz: {
    badge: 'Rasmiy manbalar',
    title: 'Qonunchilik va rasmiy hujjatlar',
    description:
      'Ilmiy faoliyat, attestatsiya, maqola chop etish talablari va rasmiy manbalar bo‘yicha asosiy yo‘riqnomalar.',
    open: 'Hujjatni ochish',
    noteTitle: 'Muhim eslatma',
    noteText:
      'Yakuniy qaror va dolzarb talablarni doimo rasmiy davlat yoki attestatsiya manbalari orqali tekshiring.',
    cta: 'Kontaktlarga o‘tish',
    categories: {
      science: 'Ilmiy faoliyat',
      attestation: 'Attestatsiya',
      ethics: 'Nashr etikasi'
    }
  },
  en: {
    badge: 'Official sources',
    title: 'Legislation and official documents',
    description:
      'Core guidance on scientific activity, attestation, publication requirements, and official reference sources.',
    open: 'Open document',
    noteTitle: 'Important note',
    noteText:
      'Always verify current rules and final requirements through official state or attestation sources.',
    cta: 'Go to contacts',
    categories: {
      science: 'Scientific activity',
      attestation: 'Attestation',
      ethics: 'Publication ethics'
    }
  }
};

function getMetadataCopy(locale: SiteLocale) {
  if (locale === 'uz') {
    return {
      title: 'Qonunchilik va rasmiy hujjatlar',
      description:
        'Ilmiy faoliyat, attestatsiya va nashr talablari bo‘yicha rasmiy manbalar.'
    };
  }

  if (locale === 'en') {
    return {
      title: 'Legislation and official documents',
      description:
        'Official sources on scientific activity, attestation, and publication requirements.'
    };
  }

  return {
    title: 'Законодательство и официальные документы',
    description:
      'Официальные источники по научной деятельности, аттестации и публикационным требованиям.'
  };
}

export async function generateMetadata({
  params
}: Props): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const locale = normalizeLocale(resolvedParams.locale);
  const meta = getMetadataCopy(locale);

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${locale}/legislation`,
      languages: {
        ru: '/ru/legislation',
        uz: '/uz/legislation',
        en: '/en/legislation'
      }
    }
  };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return siteLocales.map((locale) => ({locale}));
}

export default async function LocalizedLegislationPage({params}: Props) {
  const resolvedParams = await Promise.resolve(params);
  const locale = normalizeLocale(resolvedParams.locale);
  const t = dictionary[locale];
  const documents = await getAllLegislation();

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
        <div className="grid gap-6 lg:grid-cols-3">
          {documents.map((doc) => (
            <article
              key={doc.slug}
              className="flex h-full flex-col rounded-3xl border border-[#ECE3DC] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="inline-flex w-fit rounded-full bg-[#FFF8F3] px-3 py-1 text-xs font-semibold text-[#B85A2B]">
                {t.categories[doc.category] || doc.category}
              </div>

              <h2 className="mt-4 text-2xl font-bold leading-tight text-[#111111]">
                {pickLocalizedText(doc.title, locale)}
              </h2>

              <p className="mt-4 flex-1 text-sm leading-7 text-[#5C5C5C]">
                {pickLocalizedText(doc.summary, locale)}
              </p>

              <Link
                href={`/${locale}/legislation/${doc.slug}`}
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

          <Link
            href={withLocale(locale, '/contacts')}
            className="mt-5 inline-flex rounded-2xl bg-[#FF6C26] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#E85E1B]"
          >
            {t.cta}
          </Link>
        </div>
      </section>
    </main>
  );
}
