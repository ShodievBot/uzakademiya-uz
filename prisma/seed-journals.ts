import {loadEnvConfig} from '@next/env';

loadEnvConfig(process.cwd());

type ImportedJournal = {
  id: string;
  slug: string;
  sourceType: string;
  titles: {
    original: string;
    ru?: string | null;
    uz?: string | null;
    en?: string | null;
    former?: string | null;
  };
  publisher?: string | null;
  identifiers?: {
    issn?: string | null;
    eissn?: string | null;
  };
  indexing?: {
    isScopusIndexed?: boolean | null;
    scopusCoverage?: string | null;
    isOakRecommended?: boolean | null;
  };
  subjectAreas?: Array<{
    group?: string | null;
    name?: string | null;
  }>;
  metrics?: {
    citescore2025?: number | null;
    citescoreTracker2026?: number | null;
  };
  rankings?: Array<{
    group?: string | null;
    category?: string | null;
    percentile?: number | null;
    quartile?: 'Q1' | 'Q2' | 'Q3' | 'Q4' | null;
  }>;
  assets?: {
    website?: string | null;
  };
  content?: {
    shortDescriptionRu?: string | null;
    shortDescriptionUz?: string | null;
    shortDescriptionEn?: string | null;
  };
  review?: {
    verificationStatus?: 'verified' | 'partially_verified' | 'needs_manual_review' | null;
  };
  status?: {
    isPublished?: boolean | null;
  };
};

type ImportedPayload = {
  version: number;
  source: string;
  updatedAt: string;
  journals: ImportedJournal[];
};

function pickBestRanking(rankings: ImportedJournal['rankings']) {
  if (!rankings || rankings.length === 0) {
    return null;
  }

  return [...rankings].sort((a, b) => {
    const percentileA = a.percentile ?? -1;
    const percentileB = b.percentile ?? -1;

    if (percentileB !== percentileA) {
      return percentileB - percentileA;
    }

    const quartileOrder = {Q1: 4, Q2: 3, Q3: 2, Q4: 1} as const;
    const qa = a.quartile ? quartileOrder[a.quartile] : 0;
    const qb = b.quartile ? quartileOrder[b.quartile] : 0;

    return qb - qa;
  })[0];
}

function uniqueStrings(values: Array<string | null | undefined>) {
  return [
    ...new Set(
      values
        .filter((value): value is string => Boolean(value?.trim()))
        .map((value) => value.trim())
    )
  ];
}

async function main() {
  const {prisma} = await import('../src/lib/prisma');
  const {Quartile, VerificationStatus} = await import('@prisma/client');
  const importedData =
    (await import('../src/data/journals.master.json')).default as ImportedPayload;

  const verificationStatusMap = {
    verified: VerificationStatus.VERIFIED,
    partially_verified: VerificationStatus.PARTIALLY_VERIFIED,
    needs_manual_review: VerificationStatus.NEEDS_MANUAL_REVIEW
  } as const;

  const quartileMap = {
    Q1: Quartile.Q1,
    Q2: Quartile.Q2,
    Q3: Quartile.Q3,
    Q4: Quartile.Q4
  } as const;

  try {
    await prisma.scopusContent.deleteMany();
    await prisma.journal.deleteMany();

    const publishedItems = importedData.journals.filter(
      (item) => item.status?.isPublished !== false
    );

    for (const item of publishedItems) {
      const bestRanking = pickBestRanking(item.rankings);

      const subjectAreas = uniqueStrings(
        (item.subjectAreas || []).map((entry) => entry.name || null)
      );

      const categories = uniqueStrings([
        ...(item.rankings || []).map((entry) => entry.category || null),
        ...(item.subjectAreas || []).map((entry) => entry.group || null)
      ]);

      const shortDescription =
        item.content?.shortDescriptionRu ||
        item.content?.shortDescriptionEn ||
        item.content?.shortDescriptionUz ||
        item.titles.original;

      await prisma.journal.create({
        data: {
          slug: item.slug,
          title: item.titles.en || item.titles.original,
          titleRu: item.titles.ru || item.titles.original,
          titleUz: item.titles.uz || item.titles.original,
          shortDescription,
          publisher: item.publisher || 'Unknown publisher',
          website: item.assets?.website || '#',
          coverImage: null,
          issn: item.identifiers?.issn ?? null,
          eissn: item.identifiers?.eissn ?? null,
          country: null,
          languages: [],
          subjectAreas,
          categories,
          isScopusIndexed: Boolean(item.indexing?.isScopusIndexed),
          isOakRecommended: Boolean(item.indexing?.isOakRecommended),
          scopusCoverageYears: item.indexing?.scopusCoverage ?? null,
          citescore2025: item.metrics?.citescore2025 ?? null,
          citescore2026: item.metrics?.citescoreTracker2026 ?? null,
          percentile: bestRanking?.percentile ?? null,
          quartile: bestRanking?.quartile
            ? quartileMap[bestRanking.quartile]
            : null,
          verificationStatus: item.review?.verificationStatus
            ? verificationStatusMap[item.review.verificationStatus]
            : null,
          telegramUrl: null,
          submissionUrl: null,
          scopusContent: {
            create: []
          }
        }
      });
    }

    console.log(`Seed completed:
- Source file journals: ${importedData.journals.length}
- Imported published journals: ${publishedItems.length}`);
  } finally {
    const {prisma} = await import('../src/lib/prisma');
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
