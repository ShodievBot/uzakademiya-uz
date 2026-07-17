export type MasterRanking = {
  group: string;
  category: string;
  rank: number;
  total: number;
  percentile: number;
  quartile: 'Q1' | 'Q2' | 'Q3' | 'Q4' | null;
  raw: string;
};

export type MasterSubjectArea = {
  group: string;
  name: string;
};

export type MasterJournal = {
  id: string;
  slug: string;
  sourceType: 'journal' | 'conference_proceedings';
  titles: {
    original: string;
    ru: string | null;
    uz: string | null;
    en: string | null;
    former: string | null;
  };
  publisher: string | null;
  identifiers: {
    issn: string | null;
    eissn: string | null;
  };
  access: {
    label: string | null;
    isOpenAccess: boolean | null;
  };
  indexing: {
    isScopusIndexed: boolean;
    scopusCoverage: string | null;
    isOakRecommended: boolean | null;
  };
  subjectAreas: MasterSubjectArea[];
  metrics: {
    citescore2025: number | null;
    sjr2025: number | null;
    snip2025: number | null;
    citescoreTracker2026: number | null;
    citations2022_2025: number | null;
    documents2022_2025: number | null;
    currentCitations2026: number | null;
    currentDocuments2026: number | null;
  };
  rankings: MasterRanking[];
  presentation?: {
    featured?: boolean;
    country?: string | null;
    languages?: string[];
    coverImage?: string | null;
  };
  assets: {
    website: string | null;
    screenshotUrl: string | null;
  };
  content: {
    shortDescriptionRu: string | null;
    shortDescriptionUz: string | null;
    shortDescriptionEn: string | null;
  };
  review: {
    notes: string | null;
    verificationStatus: 'verified' | 'partially_verified' | 'needs_review' | 'needs_manual_review' | null;
    dataIssues: string[];
  };
  status: {
    isPublished: boolean;
  };
};

export type MasterJournalFile = {
  version: number;
  source: string;
  updatedAt: string;
  journals: MasterJournal[];
};
