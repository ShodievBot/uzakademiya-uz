import { usefulPages } from "@/data/useful-pages";
import type { LocalizedText, SiteLocale } from "@/types/useful-page";

export const siteLocales: SiteLocale[] = ["ru", "uz", "en"];

export function normalizeLocale(input?: string): SiteLocale {
  const value = (input || "ru").toLowerCase();

  if (value === "ru" || value === "uz" || value === "en") {
    return value;
  }

  return "ru";
}

export function getUsefulPages() {
  return usefulPages;
}

export function getUsefulPageBySlug(slug: string) {
  return usefulPages.find((page) => page.slug === slug);
}

export function pickLocale(
  value: LocalizedText | undefined,
  locale: SiteLocale
) {
  if (!value) return "";
  return value[locale] || value.ru || value.uz || value.en || "";
}

export function pickLocaleArray(
  values: LocalizedText[] | undefined,
  locale: SiteLocale
) {
  if (!values) return [];
  return values.map((item) => pickLocale(item, locale));
}
