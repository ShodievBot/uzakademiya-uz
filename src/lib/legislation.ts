import {unstable_cache} from 'next/cache';
import {prisma} from '@/lib/prisma';
import type {
  LegislationDocument,
  LocalizedText,
  SiteLocale
} from '@/types/legislation';

export const siteLocales: SiteLocale[] = ['ru', 'uz', 'en'];

const LEGISLATION_CACHE_TAG = 'legislation';

function lt(ru = '', uz = '', en = ''): LocalizedText {
  return {ru, uz, en};
}

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

function mapBody(
  ru: string[],
  uz: string[],
  en: string[]
): LocalizedText[] {
  const maxLength = Math.max(ru.length, uz.length, en.length);

  return Array.from({length: maxLength}, (_, index) =>
    lt(ru[index] || '', uz[index] || '', en[index] || '')
  );
}

function mapDocumentFromDb(doc: {
  slug: string;
  titleRu: string;
  titleUz: string;
  titleEn: string;
  summaryRu: string;
  summaryUz: string;
  summaryEn: string;
  bodyRu: string[];
  bodyUz: string[];
  bodyEn: string[];
  sourceUrl: string;
  sourceLabelRu: string;
  sourceLabelUz: string;
  sourceLabelEn: string;
  category: string;
  publishedAt: Date;
  updatedAt: Date;
}): LegislationDocument {
  return {
    slug: doc.slug,
    title: lt(doc.titleRu, doc.titleUz, doc.titleEn),
    summary: lt(doc.summaryRu, doc.summaryUz, doc.summaryEn),
    body: mapBody(doc.bodyRu, doc.bodyUz, doc.bodyEn),
    sourceUrl: doc.sourceUrl,
    sourceLabel: lt(doc.sourceLabelRu, doc.sourceLabelUz, doc.sourceLabelEn),
    publishedAt: doc.publishedAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
    category: doc.category as LegislationDocument['category']
  };
}

export const getAllLegislation = unstable_cache(
  async (): Promise<LegislationDocument[]> => {
    const documents = await prisma.legislationDocument.findMany({
      orderBy: {publishedAt: 'desc'}
    });
    return documents.map(mapDocumentFromDb);
  },
  ['legislation:all'],
  {tags: [LEGISLATION_CACHE_TAG], revalidate: 600}
);

export const getLatestLegislation = unstable_cache(
  async (limit = 3): Promise<LegislationDocument[]> => {
    const documents = await prisma.legislationDocument.findMany({
      orderBy: {publishedAt: 'desc'},
      take: limit
    });
    return documents.map(mapDocumentFromDb);
  },
  ['legislation:latest'],
  {tags: [LEGISLATION_CACHE_TAG], revalidate: 600}
);

const legislationBySlugCache = unstable_cache(
  async (slug: string): Promise<LegislationDocument | null> => {
    const document = await prisma.legislationDocument.findUnique({where: {slug}});
    if (!document) return null;
    return mapDocumentFromDb(document);
  },
  ['legislation:by-slug'],
  {tags: [LEGISLATION_CACHE_TAG], revalidate: 600}
);

export function getLegislationBySlug(
  slug: string
): Promise<LegislationDocument | null> {
  return legislationBySlugCache(slug);
}

export const getLegislationSlugs = unstable_cache(
  async (): Promise<string[]> => {
    const documents = await prisma.legislationDocument.findMany({
      select: {slug: true},
      orderBy: {publishedAt: 'desc'}
    });
    return documents.map((item) => item.slug);
  },
  ['legislation:slugs'],
  {tags: [LEGISLATION_CACHE_TAG], revalidate: 3600}
);

export type LegislationEditorInput = {
  title: LocalizedText;
  summary: LocalizedText;
  body: LocalizedText[];
  sourceUrl: string;
  sourceLabel: LocalizedText;
  category: LegislationDocument['category'];
  publishedAt: string;
};

function trimLocalizedText(value: LocalizedText): LocalizedText {
  return {
    ru: value.ru.trim(),
    uz: value.uz.trim(),
    en: value.en.trim()
  };
}

export async function updateLegislationDocumentContent(
  slug: string,
  input: LegislationEditorInput
): Promise<LegislationDocument> {
  const publishedAt = new Date(input.publishedAt);

  if (Number.isNaN(publishedAt.getTime())) {
    throw new Error('Published date must be a valid ISO date.');
  }

  await prisma.legislationDocument.update({
    where: {slug},
    data: {
      titleRu: input.title.ru.trim(),
      titleUz: input.title.uz.trim(),
      titleEn: input.title.en.trim(),

      summaryRu: input.summary.ru.trim(),
      summaryUz: input.summary.uz.trim(),
      summaryEn: input.summary.en.trim(),

      bodyRu: input.body.map((item) => item.ru.trim()),
      bodyUz: input.body.map((item) => item.uz.trim()),
      bodyEn: input.body.map((item) => item.en.trim()),

      sourceUrl: input.sourceUrl.trim(),

      sourceLabelRu: input.sourceLabel.ru.trim(),
      sourceLabelUz: input.sourceLabel.uz.trim(),
      sourceLabelEn: input.sourceLabel.en.trim(),

      category: input.category,
      publishedAt,
      updatedAt: new Date()
    }
  });

  const saved = await getLegislationBySlug(slug);

  if (!saved) {
    throw new Error('Failed to load updated legislation document.');
  }

  return saved;
}

