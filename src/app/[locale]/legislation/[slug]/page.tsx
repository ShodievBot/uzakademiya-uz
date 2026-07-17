import Link from 'next/link';
import {notFound} from 'next/navigation';
import {getLegislationBySlug, normalizeLocale} from '@/lib/legislation';

type Props = {
  params: Promise<{locale: string; slug: string}>;
};

type Locale = 'ru' | 'uz' | 'en';

function getCopy(locale: string) {
  if (locale === 'uz') {
    return {
      back: '← Qonunchilik bo‘limiga qaytish',
      badge: 'Rasmiy hujjat',
      source: 'Rasmiy manba',
      openSource: 'Rasmiy manbani ochish',
      summaryTitle: 'Qisqacha mazmun',
      contentTitle: 'Hujjat matni',
      note: 'Hujjatning eng dolzarb talqini va yakuniy talablari uchun rasmiy manbani tekshiring.'
    };
  }

  if (locale === 'en') {
    return {
      back: '← Back to legislation',
      badge: 'Official document',
      source: 'Official source',
      openSource: 'Open official source',
      summaryTitle: 'Summary',
      contentTitle: 'Document text',
      note: 'Please verify the latest version of the document and final requirements using the official source.'
    };
  }

  return {
    back: '← Назад к законодательству',
    badge: 'Официальный документ',
    source: 'Официальный источник',
    openSource: 'Открыть официальный источник',
    summaryTitle: 'Краткое описание',
    contentTitle: 'Текст документа',
    note: 'Актуальную редакцию документа и финальные требования всегда проверяйте по официальному источнику.'
  };
}

function pickText(
  value:
    | string
    | {ru?: string; uz?: string; en?: string}
    | null
    | undefined,
  locale: Locale
): string {
  if (!value) return '';

  if (typeof value === 'string') {
    return value;
  }

  return value[locale] || value.ru || value.uz || value.en || '';
}

function getTitle(document: any, locale: Locale): string {
  if (document?.title) {
    return pickText(document.title, locale);
  }

  return (
    (locale === 'ru' && document?.titleRu) ||
    (locale === 'uz' && document?.titleUz) ||
    (locale === 'en' && document?.titleEn) ||
    document?.titleRu ||
    document?.titleUz ||
    document?.titleEn ||
    ''
  );
}

function getSummary(document: any, locale: Locale): string {
  if (document?.summary) {
    return pickText(document.summary, locale);
  }

  return (
    (locale === 'ru' && document?.summaryRu) ||
    (locale === 'uz' && document?.summaryUz) ||
    (locale === 'en' && document?.summaryEn) ||
    document?.summaryRu ||
    document?.summaryUz ||
    document?.summaryEn ||
    ''
  );
}

function getBody(document: any, locale: Locale): string[] {
  if (Array.isArray(document?.body)) {
    return document.body
      .map((paragraph: any) => pickText(paragraph, locale))
      .filter(Boolean);
  }

  const prismaBody =
    (locale === 'ru' && document?.bodyRu) ||
    (locale === 'uz' && document?.bodyUz) ||
    (locale === 'en' && document?.bodyEn) ||
    document?.bodyRu ||
    document?.bodyUz ||
    document?.bodyEn ||
    [];

  return Array.isArray(prismaBody) ? prismaBody.filter(Boolean) : [];
}

function getSourceUrl(document: any): string {
  return document?.sourceUrl || '#';
}

export default async function LegislationDetailPage({params}: Props) {
  const {locale: rawLocale, slug} = await params;
  const locale = normalizeLocale(rawLocale) as Locale;
  const copy = getCopy(locale);
  const document = await getLegislationBySlug(slug);

  if (!document) {
    notFound();
  }

  const title = getTitle(document, locale);
  const summary = getSummary(document, locale);
  const body = getBody(document, locale);
  const sourceUrl = getSourceUrl(document);

  return (
    <main className="pb-16">
      <section className="mx-auto max-w-5xl px-4 pt-8 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}/legislation`}
          className="inline-flex items-center text-sm font-medium text-[#6B6B6B] transition hover:text-[#FF6C26]"
        >
          {copy.back}
        </Link>
      </section>

      <section className="mx-auto mt-4 max-w-5xl px-4 sm:px-6 lg:px-8">
        <article className="rounded-[32px] border border-[#F1D8C8] bg-gradient-to-br from-[#FFF8F3] via-[#FFF4ED] to-white p-6 shadow-[0_14px_40px_rgba(17,17,17,0.06)] sm:p-8 lg:p-10">
          <div className="inline-flex rounded-full border border-[#FFD8C2] bg-white px-4 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#FF6C26]">
            {copy.badge}
          </div>

          <h1 className="mt-5 text-3xl font-bold leading-tight text-[#111111] sm:text-4xl lg:text-5xl">
            {title}
          </h1>

          {summary && (
            <div className="mt-8 rounded-3xl border border-[#ECE3DC] bg-white p-5 shadow-sm sm:p-6">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#B56A42]">
                {copy.summaryTitle}
              </div>

              <p className="mt-3 text-base leading-8 text-[#5C5C5C] sm:text-lg">
                {summary}
              </p>
            </div>
          )}

          {body.length > 0 && (
            <div className="mt-8 rounded-3xl border border-[#ECE3DC] bg-white p-5 shadow-sm sm:p-6">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#B56A42]">
                {copy.contentTitle}
              </div>

              <div className="mt-4 space-y-5">
                {body.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-sm leading-8 text-[#5C5C5C] sm:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 rounded-3xl border border-[#F3DDD1] bg-[#FFF8F3] p-5 sm:p-6">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#B56A42]">
              {copy.source}
            </div>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#6B6B6B]">
              {copy.note}
            </p>

            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex rounded-2xl bg-[#FF6C26] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#E85E1B]"
            >
              {copy.openSource}
            </a>
          </div>
        </article>
      </section>
    </main>
  );
}
