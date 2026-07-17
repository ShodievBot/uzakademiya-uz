export type ScopusContentItem = {
  year: number;
  documentsCount: number;
};

export type Journal = {
  id: string;
  slug: string;
  title: string;
  titleRu: string;
  titleUz: string;
  shortDescription: string;
  shortDescriptionRu?: string | null;
  shortDescriptionUz?: string | null;
  shortDescriptionEn?: string | null;
  publisher: string;
  website: string;
  coverImage?: string | null;

  issn?: string | null;
  eissn?: string | null;

  country?: string | null;
  languages?: string[];

  subjectAreas?: string[];
  categories?: string[];

  isScopusIndexed: boolean;
  isOakRecommended: boolean;

  scopusCoverageYears?: string | null;
  citescore2025?: number | null;
  citescore2026?: number | null;
  percentile?: number | null;
  quartile?: "Q1" | "Q2" | "Q3" | "Q4" | null;

  scopusContent?: ScopusContentItem[];

  verificationStatus?: "verified" | "partially_verified" | "needs_manual_review";

  telegramUrl?: string | null;
  submissionUrl?: string | null;
};
