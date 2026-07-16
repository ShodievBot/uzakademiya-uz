import Link from 'next/link';
import {notFound} from 'next/navigation';
import {usefulPages} from '@/data/useful-pages';
import {usefulSources} from '@/data/useful-sources';

type Locale = 'ru' | 'uz' | 'en';

function normalizeLocale(locale: string): Locale {
  if (locale === 'ru' || locale === 'uz' || locale === 'en') return locale;
  return 'ru';
}

function getText(
  value: {ru: string; uz: string; en: string} | undefined,
  locale: Locale
) {
  if (!value) return '';
  return value[locale] || value.ru || value.uz || value.en;
}

function looksLikeUrl(text: string) {
  return /^https?:\/\//i.test(text.trim());
}

function getDictionary(locale: Locale) {
  if (locale === 'uz') {
    return {
      back: '← Ro‘yxatga qaytish',
      badge: 'Foydali material',
      summary: 'Qisqacha',
      content: 'Asosiy material',
      sources: 'Manbalar',
      officialSources: 'Rasmiy va foydali manbalar',
      openSource: 'Manbani ochish',
      publishTitle: 'Maqola chop etish bo‘yicha yordam kerakmi?',
      publishText:
        'Jurnal tanlash, talablarni tushunish va maqola yuborish bo‘yicha biz bilan bog‘laning.',
      publishButton: 'Kontaktlarga o‘tish',
      contactsButton: 'Bog‘lanish',
      materialInfo: 'Material haqida',
      sections: 'Bo‘limlar',
      references: 'Manbalar soni',
      note: 'Ushbu bo‘lim ma’lumot uchun xizmat qiladi. Yakuniy tekshiruvni doimo rasmiy manbalar orqali bajaring.',
      sourceBadge: 'Manba',
      readTime: 'O‘qish uchun qulay material'
    };
  }

  if (locale === 'en') {
    return {
      back: '← Back to list',
      badge: 'Useful material',
      summary: 'Overview',
      content: 'Main content',
      sources: 'Sources',
      officialSources: 'Official and useful sources',
      openSource: 'Open source',
      publishTitle: 'Need help with article publication?',
      publishText:
        'Contact us for help with journal selection, requirements, and article submission.',
      publishButton: 'Go to contacts',
      contactsButton: 'Contact us',
      materialInfo: 'About this material',
      sections: 'Sections',
      references: 'Sources count',
      note: 'This section is for reference purposes. Always verify final requirements using official sources.',
      sourceBadge: 'Source',
      readTime: 'Reference reading material'
    };
  }

  return {
    back: '← Назад к списку',
    badge: 'Полезный материал',
    summary: 'Кратко',
    content: 'Основной материал',
    sources: 'Источники',
    officialSources: 'Официальные и полезные источники',
    openSource: 'Открыть источник',
    publishTitle: 'Нужна помощь с публикацией статьи?',
    publishText:
      'Свяжитесь с нами по вопросам выбора журнала, требований и сопровождения подачи статьи.',
    publishButton: 'Перейти в контакты',
    contactsButton: 'Связаться',
    materialInfo: 'О материале',
    sections: 'Разделов',
    references: 'Источников',
    note: 'Этот раздел носит справочный характер. Финальную проверку всегда выполняйте по официальным источникам.',
    sourceBadge: 'Источник',
    readTime: 'Справочный материал'
  };
}

export async function generateStaticParams() {
  const locales = ['ru', 'uz', 'en'];

  return locales.flatMap((locale) =>
    usefulPages.map((page) => ({
      locale,
      slug: page.slug
    }))
  );
}

function ParagraphBlock({
  text
}: {
  text: string;
}) {
  if (looksLikeUrl(text)) {
    return (
      <a
        href={text}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex break-all rounded-2xl border border-[#FFD8C2] bg-[#FFF8F3] px-4 py-3 text-sm font-medium text-[#D05A1A] transition hover:bg-[#FFF1E8]"
      >
        {text}
      </a>
    );
  }

  return <p className="text-sm leading-8 text-[#5C5C5C] sm:text-base">{text}</p>;
}

export default async function UsefulDetailPage({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale: rawLocale, slug} = await params;
  const locale = normalizeLocale(rawLocale);
  const t = getDictionary(locale);

  const page = usefulPages.find((item) => item.slug === slug);

  if (!page) {
    notFound();
  }

  const pageSources = usefulSources.filter((source) =>
    page.sourceIds.includes(source.id)
  );

  return (
    <main className="pb-16">
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}/useful`}
          className="inline-block text-sm font-medium text-[#8A6A56] transition hover:text-[#D05A1A]"
        >
          {t.back}
        </Link>
      </section>

      <section className="mx-auto mt-5 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-[#F1D8C8] bg-gradient-to-br from-[#FFF8F3] via-[#FFF4ED] to-white p-8 shadow-[0_10px_30px_rgba(17,17,17,0.06)] sm:p-10 lg:p-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-4xl">
              <div className="inline-flex rounded-full border border-[#FFD8C2] bg-white px-4 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#FF6C26]">
                {t.badge}
              </div>

              <h1 className="mt-5 text-4xl font-bold leading-tight text-[#111111] sm:text-5xl">
                {getText(page.title, locale)}
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-[#5C5C5C] sm:text-lg">
                {getText(page.shortText, locale)}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/contacts`}
                  className="inline-flex rounded-2xl bg-[#FF6C26] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#E85E1B]"
                >
                  {t.contactsButton}
                </Link>

                <Link
                  href={`/${locale}/useful`}
                  className="inline-flex rounded-2xl border border-[#ECE3DC] bg-white px-6 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#FFF8F3]"
                >
                  {t.back.replace('← ', '')}
                </Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:w-[320px] lg:grid-cols-1">
              <div className="rounded-3xl border border-[#ECE3DC] bg-white p-5 shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B85A2B]">
                  {t.materialInfo}
                </div>
                <div className="mt-3 text-sm leading-7 text-[#5C5C5C]">
                  {t.readTime}
                </div>
              </div>

              <div className="rounded-3xl border border-[#ECE3DC] bg-white p-5 shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B85A2B]">
                  {t.sections}
                </div>
                <div className="mt-3 text-2xl font-bold text-[#111111]">
                  {page.blocks.length}
                </div>
              </div>

              <div className="rounded-3xl border border-[#ECE3DC] bg-white p-5 shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B85A2B]">
                  {t.references}
                </div>
                <div className="mt-3 text-2xl font-bold text-[#111111]">
                  {pageSources.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6">
            <article className="rounded-3xl border border-[#ECE3DC] bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-4 inline-flex rounded-full bg-[#FFF4ED] px-3 py-1 text-xs font-semibold text-[#B85A2B]">
                {t.summary}
              </div>

              <p className="text-base leading-8 text-[#5C5C5C]">
                {getText(page.shortText, locale)}
              </p>
            </article>

            <div className="rounded-3xl border border-[#ECE3DC] bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-6 inline-flex rounded-full bg-[#FFF8F3] px-3 py-1 text-xs font-semibold text-[#B85A2B]">
                {t.content}
              </div>

              <div className="space-y-5">
                {page.blocks.map((block, index) => (
                  <section
                    key={index}
                    className="rounded-3xl border border-[#F3E5DB] bg-[#FFFCFA] p-5"
                  >
                    {block.title ? (
                      <h2 className="mb-3 text-xl font-bold text-[#111111]">
                        {getText(block.title, locale)}
                      </h2>
                    ) : null}

                    {block.type === 'paragraph' && block.text ? (
                      <ParagraphBlock text={getText(block.text, locale)} />
                    ) : null}

                    {block.type === 'list' && block.items ? (
                      <ul className="space-y-3">
                        {block.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-3">
                            <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#FF6C26]" />
                            <span className="text-sm leading-7 text-[#5C5C5C] sm:text-base">
                              {getText(item, locale)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                ))}
              </div>
            </div>

            {pageSources.length > 0 && (
              <section className="rounded-3xl border border-[#ECE3DC] bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-6 inline-flex rounded-full bg-[#FFF4ED] px-3 py-1 text-xs font-semibold text-[#B85A2B]">
                  {t.sources}
                </div>

                <h2 className="text-2xl font-bold text-[#111111]">
                  {t.officialSources}
                </h2>

                <div className="mt-6 grid gap-4">
                  {pageSources.map((source) => (
                    <article
                      key={source.id}
                      className="rounded-3xl border border-[#F3E5DB] bg-[#FFFCFA] p-5"
                    >
                      <div className="inline-flex rounded-full bg-[#FFF1E8] px-3 py-1 text-xs font-semibold text-[#D05A1A]">
                        {t.sourceBadge}
                      </div>

                      <h3 className="mt-4 text-lg font-bold leading-7 text-[#111111]">
                        {getText(source.title, locale)}
                      </h3>

                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex rounded-2xl bg-[#FF6C26] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#E85E1B]"
                      >
                        {t.openSource}
                      </a>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <section className="rounded-3xl border border-[#ECE3DC] bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#111111]">
                {t.publishTitle}
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#5C5C5C]">
                {t.publishText}
              </p>

              <Link
                href={`/${locale}/contacts`}
                className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-[#FF6C26] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#E85E1B]"
              >
                {t.publishButton}
              </Link>
            </section>

            <section className="rounded-3xl border border-[#ECE3DC] bg-[#FFF8F3] p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#111111]">
                {t.materialInfo}
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#5C5C5C]">
                {t.note}
              </p>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}
