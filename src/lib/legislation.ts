import { prisma } from "@/lib/prisma";
import type {
  LegislationCategory,
  LegislationDocument,
  LocalizedText,
  SiteLocale,
} from "@/types/legislation";

export const siteLocales: SiteLocale[] = ["ru", "uz", "en"];

export function normalizeLocale(input?: string): SiteLocale {
  const value = (input || "ru").toLowerCase();

  if (value === "ru" || value === "uz" || value === "en") {
    return value;
  }

  return "ru";
}

export function pickLocalizedText(value: LocalizedText, locale: SiteLocale) {
  return value[locale] || value.ru || value.uz || value.en;
}

function formatDate(date: Date | null | undefined) {
  if (!date) return "";
  return date.toISOString().slice(0, 10);
}

function mapLegislationDocument(doc: {
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
  publishedAt: Date;
  updatedAt: Date;
  category: string;
}): LegislationDocument {
  return {
    slug: doc.slug,
    title: {
      ru: doc.titleRu,
      uz: doc.titleUz,
      en: doc.titleEn,
    },
    summary: {
      ru: doc.summaryRu,
      uz: doc.summaryUz,
      en: doc.summaryEn,
    },
    body: doc.bodyRu.map((ru, index) => ({
      ru,
      uz: doc.bodyUz[index] || "",
      en: doc.bodyEn[index] || "",
    })),
    sourceUrl: doc.sourceUrl,
    sourceLabel: {
      ru: doc.sourceLabelRu,
      uz: doc.sourceLabelUz,
      en: doc.sourceLabelEn,
    },
    publishedAt: formatDate(doc.publishedAt),
    updatedAt: formatDate(doc.updatedAt),
    category: doc.category as LegislationCategory,
  };
}

export async function getAllLegislation(): Promise<LegislationDocument[]> {
  const documents = await prisma.legislationDocument.findMany({
    orderBy: {
      publishedAt: "desc",
    },
  });

  return documents.map(mapLegislationDocument);
}

export async function getLatestLegislation(
  limit = 3
): Promise<LegislationDocument[]> {
  const documents = await prisma.legislationDocument.findMany({
    orderBy: {
      publishedAt: "desc",
    },
    take: limit,
  });

  return documents.map(mapLegislationDocument);
}

export async function getLegislationBySlug(slug: string) {
  const document = await prisma.legislationDocument.findUnique({
    where: { slug },
  });

  if (!document) return undefined;

  return mapLegislationDocument(document);
}
