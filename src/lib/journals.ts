import { prisma } from "@/lib/prisma";
import { getQuartileFromPercentile } from "@/lib/scopus";
import type { Journal as UiJournal } from "@/types/journal";
import type { VerificationStatus } from "@prisma/client";

type JournalFilters = {
  q?: string;
  scopus?: string;
  oak?: string;
  subject?: string;
  quartile?: string;
};

function mapVerificationStatus(
  status: VerificationStatus | null | undefined
): UiJournal["verificationStatus"] {
  if (status === "VERIFIED") return "verified";
  if (status === "PARTIALLY_VERIFIED") return "partially_verified";
  if (status === "NEEDS_MANUAL_REVIEW") return "needs_manual_review";
  return undefined;
}

function mapJournal(journal: {
  id: string;
  slug: string;
  title: string;
  titleRu: string;
  titleUz: string;
  shortDescription: string;
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
  quartile: "Q1" | "Q2" | "Q3" | "Q4" | null;
  verificationStatus: VerificationStatus | null;
  telegramUrl: string | null;
  submissionUrl: string | null;
  scopusContent: { year: number; documentsCount: number }[];
}): UiJournal {
  return {
    id: journal.id,
    slug: journal.slug,
    title: journal.title,
    titleRu: journal.titleRu,
    titleUz: journal.titleUz,
    shortDescription: journal.shortDescription,
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
    quartile:
      journal.quartile ?? getQuartileFromPercentile(journal.percentile),
    scopusContent: journal.scopusContent,
    verificationStatus: mapVerificationStatus(journal.verificationStatus),
    telegramUrl: journal.telegramUrl,
    submissionUrl: journal.submissionUrl,
  };
}

export async function getAllJournals() {
  const journals = await prisma.journal.findMany({
    include: {
      scopusContent: {
        orderBy: { year: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return journals.map(mapJournal);
}

export async function getJournalBySlug(slug: string) {
  const normalizedSlug = decodeURIComponent(slug).trim().toLowerCase();

  const journal = await prisma.journal.findFirst({
    where: {
      slug: {
        equals: normalizedSlug,
        mode: "insensitive",
      },
    },
    include: {
      scopusContent: {
        orderBy: { year: "asc" },
      },
    },
  });

  if (!journal) return undefined;

  return mapJournal(journal);
}

export async function getFilteredJournals(filters: JournalFilters) {
  const { q, scopus, oak, subject, quartile } = filters;
  const journals = await getAllJournals();

  return journals.filter((journal) => {
    const matchesQuery =
      !q ||
      journal.title.toLowerCase().includes(q.toLowerCase()) ||
      journal.titleRu.toLowerCase().includes(q.toLowerCase()) ||
      journal.titleUz.toLowerCase().includes(q.toLowerCase()) ||
      journal.publisher.toLowerCase().includes(q.toLowerCase());

    const matchesScopus =
      !scopus ||
      (scopus === "yes" && journal.isScopusIndexed) ||
      (scopus === "no" && !journal.isScopusIndexed);

    const matchesOak =
      !oak ||
      (oak === "yes" && journal.isOakRecommended) ||
      (oak === "no" && !journal.isOakRecommended);

    const matchesSubject =
      !subject ||
      journal.subjectAreas?.some((item) =>
        item.toLowerCase().includes(subject.toLowerCase())
      );

    const matchesQuartile =
      !quartile || journal.quartile?.toLowerCase() === quartile.toLowerCase();

    return (
      matchesQuery &&
      matchesScopus &&
      matchesOak &&
      matchesSubject &&
      matchesQuartile
    );
  });
}

export async function getUniqueSubjects() {
  const journals = await getAllJournals();
  const allSubjects = journals.flatMap((journal) => journal.subjectAreas || []);
  return [...new Set(allSubjects)].sort();
}
