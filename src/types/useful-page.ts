export type SiteLocale = 'ru' | 'uz' | 'en';

export type LocalizedText = {
  ru: string;
  uz: string;
  en: string;
};

export type UsefulSource = {
  id: string;
  title: LocalizedText;
  url: string;
};

export type UsefulBlock = {
  type: 'paragraph' | 'list';
  title?: LocalizedText;
  text?: LocalizedText;
  items?: LocalizedText[];
};

export type UsefulPage = {
  slug: string;
  title: LocalizedText;
  cardText: LocalizedText;
  shortTitle?: LocalizedText;
  shortText?: LocalizedText;
  fullTitle?: LocalizedText;
  blocks: UsefulBlock[];
  sourceIds: string[];
};
