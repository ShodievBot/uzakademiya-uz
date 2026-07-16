import Link from "next/link";
import {
  getUsefulPages,
  normalizeLocale,
  pickLocale,
  siteLocales,
} from "@/lib/useful";
import type { SiteLocale } from "@/types/useful-page";

const dictionary: Record<
  SiteLocale,
  {
    badge: string;
    title: string;
    description: string;
    open: string;
  }
> = {
  ru: {
    badge: "ПОЛЕЗНЫЕ МАТЕРИАЛЫ",
    title: "Материалы для авторов и исследователей",
    description:
      "Справочные материалы по ORCID, DOI, Scopus, OAK, антиплагиату, рецензированию, выбору журнала и публикационному процессу.",
    open: "Открыть",
  },
  uz: {
    badge: "FOYDALI MATERIALLAR",
    title: "Mualliflar va tadqiqotchilar uchun materiallar",
    description:
      "ORCID, DOI, Scopus, OAK, antiplagiat, taqriz, jurnal tanlash va nashr jarayoni bo‘yicha foydali ma’lumotlar.",
    open: "Ochish",
  },
  en: {
    badge: "USEFUL MATERIALS",
    title: "Resources for authors and researchers",
    description:
      "Reference materials on ORCID, DOI, Scopus, OAK, plagiarism checks, peer review, journal selection, and publication workflows.",
    open: "Open",
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return siteLocales.map((locale) => ({ locale }));
}

export default async function UsefulListPage({
  params,
}: {
  params: Promise<{ locale: string }> | { locale: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const locale = normalizeLocale(resolvedParams.locale);

  const t = dictionary[locale];
  const pages = getUsefulPages();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-3 inline-flex rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700">
          {t.badge}
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {t.title}
        </h1>

        <p className="mt-3 max-w-3xl text-slate-600">{t.description}</p>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pages.map((page) => (
          <article
            key={page.slug}
            className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <h2 className="text-xl font-semibold text-slate-900">
              {pickLocale(page.title, locale)}
            </h2>

            <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
              {pickLocale(page.cardText, locale)}
            </p>

            <Link
              href={`/${locale}/useful/${page.slug}`}
              className="mt-5 inline-flex w-fit rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              {t.open}
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
