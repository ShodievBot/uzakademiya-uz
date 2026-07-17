import {prisma} from '@/lib/prisma';
import type {
  LegislationDocument,
  LocalizedText,
  SiteLocale
} from '@/types/legislation';

export const siteLocales: SiteLocale[] = ['ru', 'uz', 'en'];

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

export async function getAllLegislation(): Promise<LegislationDocument[]> {
  const documents = await prisma.legislationDocument.findMany({
    orderBy: {
      publishedAt: 'desc'
    }
  });

  return documents.map(mapDocumentFromDb);
}

export async function getLatestLegislation(
  limit = 3
): Promise<LegislationDocument[]> {
  const documents = await prisma.legislationDocument.findMany({
    orderBy: {
      publishedAt: 'desc'
    },
    take: limit
  });

  return documents.map(mapDocumentFromDb);
}

export async function getLegislationBySlug(
  slug: string
): Promise<LegislationDocument | null> {
  const document = await prisma.legislationDocument.findUnique({
    where: {slug}
  });

  if (!document) return null;

  return mapDocumentFromDb(document);
}

export async function getLegislationSlugs(): Promise<string[]> {
  const documents = await prisma.legislationDocument.findMany({
    select: {
      slug: true
    },
    orderBy: {
      publishedAt: 'desc'
    }
  });

  return documents.map((item) => item.slug);
}
