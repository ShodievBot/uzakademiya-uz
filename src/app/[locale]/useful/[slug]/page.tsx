import Link from 'next/link';
import {notFound} from 'next/navigation';
import {
  getUsefulPageBySlug,
  normalizeLocale,
  pickLocale,
  pickLocaleArray
} from '@/lib/useful';

type Locale = 'ru' | 'uz' | 'en';

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
      materialInfo: 'Material haqida',
      sections: 'Bo‘limlar',
      references: 'Manbalar soni',
      note:
        'Ushbu bo‘lim ma’lumot uchun xizmat qiladi. Yakuniy tekshiruvni doimo rasmiy manbalar orqali bajaring.',
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
      materialInfo: 'About this material',
      sections: 'Sections',
      references: 'Sources count',
      note:
        'This section is for reference purposes. Always verify final requirements using official sources.',
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
    materialInfo: 'О материале',
    sections: 'Разделов',
    references: 'Источников',
    note:
      'Этот раздел носит справочный характер. Финальную проверку всегда выполняйте по официальным источникам.',
    sourceBadge: 'Источник',
    readTime: 'Справочный материал'
  };
}

function ParagraphBlock({text}: {text: string}) {
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
  const locale = normalizeLocale(rawLocale) as Locale;
  const t = getDictionary(locale);

  const page = await getUsefulPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const title = pickLocale(page.fullTitle || page.title, locale);
  const summary = pickLocale(page.shortText || page.cardText, locale);

  return (
    <main className="pb-16">
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}/useful`}
          className="inline-flex items-center text-sm font-medium text-[#6B6B6B] transition hover:text-[#FF6C26]"
        >
          {t.back}
        </Link>
      </section>

      <section className="mx-auto mt-4 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <article className="rounded-[32px] border border-[#F1D8C8] bg-gradient-to-br from-[#FFF8F3] via-[#FFF4ED] to-white p-6 shadow-[0_14px_40px_rgba(17,17,17,0.06)] sm:p-8 lg:p-10">
              <div className="inline-flex rounded-full border border-[#FFD8C2] bg-white px-4 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#FF6C26]">
                {t.badge}
              </div>

              <h1 className="mt-5 text-3xl font-bold leading-tight text-[#111111] sm:text-4xl lg:text-5xl">
                {title}
              </h1>

              {summary && (
                <section className="mt-8 rounded-3xl border border-[#ECE3DC] bg-white p-5 shadow-sm sm:p-6">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#B56A42]">
                    {t.summary}
                  </div>

                  <p className="mt-3 text-sm leading-8 text-[#5C5C5C] sm:text-base">
                    {summary}
                  </p>
                </section>
              )}

              {page.blocks.length > 0 && (
                <section className="mt-8 rounded-3xl border border-[#ECE3DC] bg-white p-5 shadow-sm sm:p-6">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#B56A42]">
                    {t.content}
                  </div>

                  <div className="mt-5 space-y-8">
                    {page.blocks.map((block, index) => {
                      const titleText = pickLocale(block.title, locale);
                      const text = pickLocale(block.text, locale);
                      const items = pickLocaleArray(block.items, locale);

                      return (
                        <div key={index} className="space-y-4">
                          {titleText ? (
                            <h2 className="text-xl font-bold text-[#111111]">
                              {titleText}
                            </h2>
                          ) : null}

                          {block.type === 'paragraph' && text ? (
                            <ParagraphBlock text={text} />
                          ) : null}

                          {block.type === 'list' && items.length > 0 ? (
                            <ul className="space-y-3">
                              {items.map((item, itemIndex) => (
                                <li
                                  key={itemIndex}
                                  className="flex gap-3 text-sm leading-7 text-[#5C5C5C] sm:text-base"
                                >
                                  <span className="mt-2 h-2 w-2 rounded-full bg-[#FF6C26]" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {page.sources.length > 0 && (
                <section className="mt-8 rounded-3xl border border-[#F3DDD1] bg-[#FFF8F3] p-5 sm:p-6">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#B56A42]">
                    {t.officialSources}
                  </div>

                  <div className="mt-5 grid gap-4">
                    {page.sources.map((source) => (
                      <article
                        key={source.id}
                        className="rounded-2xl border border-[#ECE3DC] bg-white p-5 shadow-sm"
                      >
                        <div className="inline-flex rounded-full bg-[#FFF4ED] px-3 py-1 text-xs font-semibold text-[#B85A2B]">
                          {t.sourceBadge}
                        </div>

                        <h3 className="mt-4 text-lg font-bold text-[#111111]">
                          {pickLocale(source.title, locale)}
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
            </article>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <section className="rounded-3xl border border-[#ECE3DC] bg-white p-6 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B56A42]">
                {t.materialInfo}
              </div>

              <h3 className="mt-3 text-2xl font-bold text-[#111111]">
                {pickLocale(page.shortTitle || page.title, locale)}
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#5C5C5C]">
                {t.readTime}
              </p>

              <div className="mt-5 space-y-3 text-sm leading-7 text-[#5C5C5C]">
                <div>
                  <span className="font-semibold text-[#111111]">
                    {t.sections}:
                  </span>{' '}
                  {page.blocks.length}
                </div>
                <div>
                  <span className="font-semibold text-[#111111]">
                    {t.references}:
                  </span>{' '}
                  {page.sources.length}
                </div>
              </div>
            </section>

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
                {t.sources}
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
