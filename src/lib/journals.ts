import {
  Quartile,
  type Prisma,
  type VerificationStatus as PrismaVerificationStatus
} from '@prisma/client';
import {prisma} from '@/lib/prisma';
import {getQuartileFromPercentile} from '@/lib/scopus';
import type {Journal} from '@/types/journal';

type JournalFilters = {
  q?: string;
  scopus?: string;
  oak?: string;
  subject?: string;
  quartile?: string;
};

function mapVerificationStatus(
  value: PrismaVerificationStatus | null
): Journal['verificationStatus'] {
  if (value === 'VERIFIED') return 'verified';
  if (value === 'PARTIALLY_VERIFIED') return 'partially_verified';
  if (value === 'NEEDS_MANUAL_REVIEW') return 'needs_manual_review';
  return undefined;
}

function mapJournalFromDb(journal: {
  id: string;
  slug: string;
  title: string;
  titleRu: string;
  titleUz: string;
  shortDescription: string;
  shortDescriptionRu: string | null;
  shortDescriptionUz: string | null;
  shortDescriptionEn: string | null;
  publisher: string;
  website: string;
  coverImage: string | null;
  issn: string | null;
  eissn: string | null;
  country: string | null;
  languages: string[];
  subjectAreas: string[];
  categories: string[];
  isScopusIndexed: boolean;
  isOakRecommended: boolean;
  scopusCoverageYears: string | null;
  citescore2025: number | null;
  citescore2026: number | null;
  percentile: number | null;
  quartile: Quartile | null;
  verificationStatus: PrismaVerificationStatus | null;
  telegramUrl: string | null;
  submissionUrl: string | null;
  scopusContent: Array<{
    year: number;
    documentsCount: number;
  }>;
}): Journal {
  return {
    id: journal.id,
    slug: journal.slug,
    title: journal.title,
    titleRu: journal.titleRu,
    titleUz: journal.titleUz,
    shortDescription: journal.shortDescription,
    shortDescriptionRu: journal.shortDescriptionRu ?? '',
    shortDescriptionUz: journal.shortDescriptionUz ?? '',
    shortDescriptionEn: journal.shortDescriptionEn ?? '',
    publisher: journal.publisher,
    website: journal.website,
    coverImage: journal.coverImage,
    issn: journal.issn,
    eissn: journal.eissn,
    country: journal.country,
    languages: journal.languages,
    subjectAreas: journal.subjectAreas,
    categories: journal.categories,
    isScopusIndexed: journal.isScopusIndexed,
    isOakRecommended: journal.isOakRecommended,
    scopusCoverageYears: journal.scopusCoverageYears,
    citescore2025: journal.citescore2025,
    citescore2026: journal.citescore2026,
    percentile: journal.percentile,
    quartile: journal.quartile ?? getQuartileFromPercentile(journal.percentile),
    scopusContent: journal.scopusContent,
    verificationStatus: mapVerificationStatus(journal.verificationStatus),
    telegramUrl: journal.telegramUrl,
    submissionUrl: journal.submissionUrl
  };
}

export async function getAllJournals(): Promise<Journal[]> {
  const journals = await prisma.journal.findMany({
    orderBy: {
      createdAt: 'asc'
    },
    include: {
      scopusContent: {
        orderBy: {
          year: 'asc'
        }
      }
    }
  });

  return journals.map(mapJournalFromDb);
}

export async function getJournalBySlug(slug: string): Promise<Journal | null> {
  const normalizedSlug = decodeURIComponent(slug).trim().toLowerCase();

  const journal = await prisma.journal.findFirst({
    where: {
      slug: {
        equals: normalizedSlug,
        mode: 'insensitive'
      }
    },
    include: {
      scopusContent: {
        orderBy: {
          year: 'asc'
        }
      }
    }
  });

  if (!journal) return null;

  return mapJournalFromDb(journal);
}

export async function getFilteredJournals(
  filters: JournalFilters
): Promise<Journal[]> {
  const {q, scopus, oak, subject, quartile} = filters;

  const where: Prisma.JournalWhereInput = {};

  if (q?.trim()) {
    const query = q.trim();

    where.OR = [
      {title: {contains: query, mode: 'insensitive'}},
      {titleRu: {contains: query, mode: 'insensitive'}},
      {titleUz: {contains: query, mode: 'insensitive'}},
      {publisher: {contains: query, mode: 'insensitive'}},
      {shortDescription: {contains: query, mode: 'insensitive'}},
      {shortDescriptionRu: {contains: query, mode: 'insensitive'}},
      {shortDescriptionUz: {contains: query, mode: 'insensitive'}},
      {shortDescriptionEn: {contains: query, mode: 'insensitive'}}
    ];
  }

  if (scopus === 'yes') {
    where.isScopusIndexed = true;
  } else if (scopus === 'no') {
    where.isScopusIndexed = false;
  }

  if (oak === 'yes') {
    where.isOakRecommended = true;
  } else if (oak === 'no') {
    where.isOakRecommended = false;
  }

  if (subject?.trim()) {
    where.subjectAreas = {
      has: subject.trim()
    };
  }

  if (quartile?.trim()) {
    const normalizedQuartile = quartile.trim().toUpperCase();

    if (
      normalizedQuartile === 'Q1' ||
      normalizedQuartile === 'Q2' ||
      normalizedQuartile === 'Q3' ||
      normalizedQuartile === 'Q4'
    ) {
      where.quartile = normalizedQuartile as Quartile;
    }
  }

  const journals = await prisma.journal.findMany({
    where,
    orderBy: {
      createdAt: 'asc'
    },
    include: {
      scopusContent: {
        orderBy: {
          year: 'asc'
        }
      }
    }
  });

  return journals.map(mapJournalFromDb);
}

export async function getUniqueSubjects(): Promise<string[]> {
  const journals = await prisma.journal.findMany({
    select: {
      subjectAreas: true
    }
  });

  const allSubjects = journals.flatMap((journal) => journal.subjectAreas || []);
  return [...new Set(allSubjects)].sort((a, b) => a.localeCompare(b));
}

export function getJournalShortDescriptionByLocale(
  journal: Pick<
    Journal,
    | 'shortDescription'
    | 'shortDescriptionRu'
    | 'shortDescriptionUz'
    | 'shortDescriptionEn'
  >,
  locale: string
) {
  if (locale === 'uz') {
    return (
      journal.shortDescriptionUz ||
      journal.shortDescriptionEn ||
      journal.shortDescriptionRu ||
      journal.shortDescription ||
      '—'
    );
  }

  if (locale === 'en') {
    return (
      journal.shortDescriptionEn ||
      journal.shortDescriptionRu ||
      journal.shortDescriptionUz ||
      journal.shortDescription ||
      '—'
    );
  }

  return (
    journal.shortDescriptionRu ||
    journal.shortDescriptionEn ||
    journal.shortDescriptionUz ||
    journal.shortDescription ||
    '—'
  );
}
