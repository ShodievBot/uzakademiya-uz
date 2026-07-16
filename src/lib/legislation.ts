import {legislationDocuments} from '@/data/legislation';
import type {
  LegislationDocument,
  LocalizedText,
  SiteLocale
} from '@/types/legislation';

export const siteLocales: SiteLocale[] = ['ru', 'uz', 'en'];

export function normalizeLocale(input?: string): SiteLocale {
  const value = (input || 'ru').toLowerCase();

  if (value === 'ru' || value === 'uz' || value === 'en') {
    return value;
  }

  return 'ru';
}

export function pickLocalizedText(
  value: LocalizedText,
  locale: SiteLocale
) {
  return value[locale] || value.ru || value.uz || value.en;
}

export function getAllLegislation(): LegislationDocument[] {
  return [...legislationDocuments].sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getLatestLegislation(limit = 3): LegislationDocument[] {
  return getAllLegislation().slice(0, limit);
}

export function getLegislationBySlug(slug: string) {
  return legislationDocuments.find((item) => item.slug === slug);
}
