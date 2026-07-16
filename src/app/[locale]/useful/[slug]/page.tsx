import Link from "next/link";
import { notFound } from "next/navigation";
import { usefulPages } from "@/data/useful-pages";
import { usefulSources } from "@/data/useful-sources";

type Locale = "ru" | "uz" | "en";

function normalizeLocale(locale: string): Locale {
  if (locale === "ru" || locale === "en") return locale;
  return "uz";
}

function getText(
  value: { ru: string; uz: string; en: string },
  locale: Locale
) {
  return value[locale] || value.uz;
}

export async function generateStaticParams() {
  const locales = ["ru", "uz", "en"];

  return locales.flatMap((locale) =>
    usefulPages.map((page) => ({
      locale,
      slug: page.slug,
    }))
  );
}

export default async function UsefulDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = normalizeLocale(rawLocale);

  const page = usefulPages.find((item) => item.slug === slug);

  if (!page) {
    notFound();
  }

  const pageSources = usefulSources.filter((source) =>
    page.sourceIds.includes(source.id)
  );

  const backLabel =
    locale === "ru"
      ? "← Назад к списку"
      : locale === "en"
      ? "← Back to list"
      : "← Ro‘yxatga qaytish";

  const shortLabel =
    locale === "ru"
      ? "Кратко"
      : locale === "en"
      ? "Briefly"
      : "Qisqacha";

  const sourcesLabel =
    locale === "ru"
      ? "Источники"
      : locale === "en"
      ? "Sources"
      : "Manbalar";

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <Link
        href={`/${locale}/useful`}
        className="mb-6 inline-block text-sm text-gray-600 hover:text-black"
      >
        {backLabel}
      </Link>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <h1 className="mb-6 text-3xl font-bold">
          {getText(page.title, locale)}
        </h1>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold">{shortLabel}</h2>
          <p className="leading-8 text-gray-700">
            {getText(page.shortText, locale)}
          </p>
        </section>

        <div className="space-y-6">
          {page.blocks.map((block, index) => (
            <section key={index}>
              {"title" in block && block.title ? (
                <h3 className="mb-3 text-lg font-semibold">
                  {getText(block.title, locale)}
                </h3>
              ) : null}

              {block.type === "paragraph" && "text" in block ? (
                <p className="leading-8 text-gray-700">
                  {getText(block.text, locale)}
                </p>
              ) : null}

              {block.type === "list" && "items" in block ? (
                <ul className="list-disc space-y-2 pl-6 text-gray-700">
                  {block.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{getText(item, locale)}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        {pageSources.length > 0 && (
          <section className="mt-10 border-t pt-6">
            <h2 className="mb-4 text-xl font-semibold">{sourcesLabel}</h2>
            <ul className="space-y-3">
              {pageSources.map((source) => (
                <li key={source.id}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    {getText(source.title, locale)}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
