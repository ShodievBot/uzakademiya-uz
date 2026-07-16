import Link from 'next/link';
import {notFound} from 'next/navigation';
import {
  getLegislationBySlug,
  normalizeLocale,
  pickLocalizedText
} from '@/lib/legislation';

type Props = {
  params: Promise<{locale: string; slug: string}>;
};

function getCopy(locale: string) {
  if (locale === 'uz') {
    return {
      back: '← Qonunchilik bo‘limiga qaytish',
      source: 'Rasmiy manba',
      openSource: 'Rasmiy manbani ochish'
    };
  }

  if (locale === 'en') {
    return {
      back: '← Back to legislation',
      source: 'Official source',
      openSource: 'Open official source'
    };
  }

  return {
    back: '← Назад к законодательству',
    source: 'Официальный источник',
    openSource: 'Открыть официальный источник'
  };
}

export default async function LegislationDetailPage({params}: Props) {
  const {locale: rawLocale, slug} = await params;
  const locale = normalizeLocale(rawLocale);
  const copy = getCopy(locale);
  const document = getLegislationBySlug(slug);

  if (!document) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href={`/${locale}/legislation`}
        className="inline-block text-sm text-[#9fc4ff] transition hover:text-white"
      >
        {copy.back}
      </Link>

      <article className="mt-6 rounded-[28px] border border-white/10 bg-[#0b1730]/90 p-6 shadow-2xl shadow-black/20 sm:p-8">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {pickLocalizedText(document.title, locale)}
        </h1>

        <p className="mt-4 text-base leading-8 text-[#c9d7f0]">
          {pickLocalizedText(document.summary, locale)}
        </p>

        <div className="mt-8 space-y-5">
          {document.body.map((paragraph, index) => (
            <p key={index} className="text-sm leading-8 text-[#dce7ff] sm:text-base">
              {pickLocalizedText(paragraph, locale)}
            </p>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-[#12264a] p-5">
          <div className="text-xs uppercase tracking-[0.16em] text-[#7fb3ff]">
            {copy.source}
          </div>

          <a
            href={document.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex rounded-xl bg-[#7fb3ff] px-4 py-2 text-sm font-semibold text-[#081120] transition hover:bg-[#9fc4ff]"
          >
            {copy.openSource}
          </a>
        </div>
      </article>
    </main>
  );
}
