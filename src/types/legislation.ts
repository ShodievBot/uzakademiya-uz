export type SiteLocale = 'ru' | 'uz' | 'en';

export type LocalizedText = {
  ru: string;
  uz: string;
  en: string;
};

export type LegislationCategory =
  | 'science'
  | 'attestation'
  | 'ethics';

export type LegislationDocument = {
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  body: LocalizedText[];
  sourceUrl: string;
  sourceLabel: LocalizedText;
  publishedAt: string;
  updatedAt?: string;
  category: LegislationCategory;
};
