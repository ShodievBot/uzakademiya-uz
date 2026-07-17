import type { Journal } from '@/types/journal';
import type { MasterJournal, MasterRanking } from '@/types/journal-master';

function normalizeCountry(value?: string | null) {
  if (!value || value === 'publisher_country') return null;
  return value;
}

function normalizeLanguages(value?: string[]) {
  if (!Array.isArray(value)) return [];
  return value.filter((item) => item && item !== 'publication_languages');
}

function getBestRanking(rankings: MasterRanking[]) {
  if (!rankings?.length) return null;

  return [...rankings].sort((a, b) => {
    if ((b.percentile ?? -1) !== (a.percentile ?? -1)) {
      return (b.percentile ?? -1) - (a.percentile ?? -1);
    }

    return (a.rank ?? Number.MAX_SAFE_INTEGER) - (b.rank ?? Number.MAX_SAFE_INTEGER);
  })[0];
}

function mapVerificationStatus(
  value?: string | null
): Journal['verificationStatus'] {
  if (value === 'verified') return 'verified';
  if (value === 'partially_verified') return 'partially_verified';
  if (value === 'needs_manual_review') return 'needs_manual_review';
  if (value === 'needs_review') return 'needs_manual_review';
  return undefined;
}

function unique(values: (string | null | undefined)[]) {
  return [...new Set(values.filter(Boolean) as string[])];
}

export function adaptMasterJournal(item: MasterJournal): Journal {
  const bestRanking = getBestRanking(item.rankings ?? []);

  return {
    id: item.id,
    slug: item.slug,

    title: item.titles.en || item.titles.original || item.titles.ru || item.titles.uz || '',
    titleRu: item.titles.ru || item.titles.original || item.titles.en || '',
    titleUz: item.titles.uz || item.titles.original || item.titles.en || '',

    shortDescription:
      item.content.shortDescriptionRu ||
      item.content.shortDescriptionEn ||
      item.content.shortDescriptionUz ||
      '',

    publisher: item.publisher || '',
    website: item.assets.website || '',
    coverImage: item.presentation?.coverImage || null,

    issn: item.identifiers.issn,
    eissn: item.identifiers.eissn,

    country: normalizeCountry(item.presentation?.country),
    languages: normalizeLanguages(item.presentation?.languages),

    subjectAreas: unique(item.subjectAreas?.map((x) => x.name)),
    categories: unique(item.rankings?.map((x) => x.category)),

    isScopusIndexed: item.indexing.isScopusIndexed,
    isOakRecommended: item.indexing.isOakRecommended ?? false,

    scopusCoverageYears: item.indexing.scopusCoverage,

    citescore2025: item.metrics.citescore2025,
    citescore2026: item.metrics.citescoreTracker2026,

    percentile: bestRanking?.percentile ?? null,
    quartile: bestRanking?.quartile ?? null,

    scopusContent: [],

    verificationStatus: mapVerificationStatus(item.review?.verificationStatus),

    telegramUrl: null,
    submissionUrl: null
  };
}
