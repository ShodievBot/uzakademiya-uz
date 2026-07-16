import Link from 'next/link';
import {
  getAllLegislation,
  normalizeLocale,
  pickLocalizedText
} from '@/lib/legislation';

type Props = {
  params: Promise<{locale: string}>;
};

function withLocale(locale: string, href: string) {
  if (href === '/') return `/${locale}`;
  return `/${locale}${href}`;
}

function getContent(locale: string) {
  if (locale === 'uz') {
    return {
      badge: 'Rasmiy manbalar',
      title: 'Qonunchilik va rasmiy hujjatlar',
      description:
        'Ilmiy faoliyat, attestatsiya, maqola chop etish talablari va rasmiy manbalar bo‘yicha asosiy hujjatlar ro‘yxati.',
      open: 'Batafsil ochish',
      source: 'Rasmiy manba',
      published: 'E’lon qilingan sana',
      updated: 'Yangilangan sana',
      noteTitle: 'Muhim eslatma',
      noteText:
        'Hujjatlarning dolzarb tahririni va yakuniy talablarni doimo rasmiy davlat yoki vakolatli manbalar orqali tekshiring.',
      contactCta: 'Kontaktlarga o‘tish'
    };
  }

  if (locale === 'en') {
    return {
      badge: 'Official sources',
      title: 'Legislation and official documents',
      description:
        'A structured list of key documents related to scientific activity, attestation, publication requirements, and official reference sources.',
      open: 'Open details',
      source: 'Official source',
      published: 'Published',
      updated: 'Updated',
      noteTitle: 'Important note',
      noteText:
        'Always verify the latest version of documents and final requirements using official state or authorized sources.',
      contactCta: 'Go to contacts'
    };
  }

  return {
    badge: 'Официальные источники',
    title: 'Законодательство и официальные документы',
    description:
      'Структурированный список основных документов по научной деятельности, аттестации, публикационным требованиям и официальным источникам.',
    open: 'Открыть подробнее',
    source: 'Официальный источник',
    published: 'Дата публикации',
    updated: 'Дата обновления',
    noteTitle: 'Важное примечание',
    noteText:
      'Финальную проверку актуальности документов и требований всегда выполняйте по официальным государственным или уполномоченным источникам.',
    contactCta: 'Перейти в контакты'
  };
}

export default async function LocalizedLegislationPage({params}: Props) {
  const {locale: rawLocale} = await params;
  const locale = normalizeLocale(rawLocale);
  const t = getContent(locale);
  const documents = getAllLegislation();

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
        <div className="grid gap-6">
          {documents.map((doc) => (
            <article
              key={doc.slug}
              className="rounded-3xl border border-[#ECE3DC] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-8"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 flex-1">
                  <h2 className="text-2xl font-bold leading-tight text-[#111111] sm:text-3xl">
                    {pickLocalizedText(doc.title, locale)}
                  </h2>

                  <p className="mt-4 max-w-3xl text-sm leading-7 text-[#5C5C5C] sm:text-base">
                    {pickLocalizedText(doc.summary, locale)}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3 text-xs font-semibold">
                    <span className="inline-flex rounded-full bg-[#FFF4ED] px-3 py-1 text-[#B85A2B]">
                      {t.published}: {doc.publishedAt}
                    </span>

                    <span className="inline-flex rounded-full bg-[#FFF8F3] px-3 py-1 text-[#8A6A56]">
                      {t.updated}: {doc.updatedAt}
                    </span>

                    <span className="inline-flex rounded-full bg-[#FFF1E8] px-3 py-1 text-[#D05A1A]">
                      {t.source}
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0">
                  <Link
                    href={withLocale(locale, `/legislation/${doc.slug}`)}
                    className="inline-flex rounded-2xl bg-[#FF6C26] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#E85E1B]"
                  >
                    {t.open}
                  </Link>
                </div>
              </div>
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
            {t.contactCta}
          </Link>
        </div>
      </section>
    </main>
  );
}
