import {prisma} from '@/lib/prisma';
import type {
  LocalizedText,
  SiteLocale,
  UsefulBlock as UiUsefulBlock,
  UsefulPage as UiUsefulPage,
  UsefulSource as UiUsefulSource
} from '@/types/useful-page';

export const siteLocales: SiteLocale[] = ['ru', 'uz', 'en'];

export type UsefulPageCard = Pick<
  UiUsefulPage,
  'slug' | 'title' | 'cardText' | 'shortTitle' | 'shortText' | 'fullTitle'
>;

export type UsefulPageDetail = Omit<UiUsefulPage, 'sourceIds'> & {
  sources: UiUsefulSource[];
};

export function normalizeLocale(input?: string): SiteLocale {
  const value = (input || 'ru').toLowerCase();

  if (value === 'ru' || value === 'uz' || value === 'en') {
    return value;
  }

  return 'ru';
}

export function pickLocale(
  value: LocalizedText | undefined,
  locale: SiteLocale
) {
  if (!value) return '';
  return value[locale] || value.ru || value.uz || value.en || '';
}

export function pickLocaleArray(
  values: LocalizedText[] | undefined,
  locale: SiteLocale
) {
  if (!values) return [];
  return values.map((item) => pickLocale(item, locale)).filter(Boolean);
}

function mapRequiredText(
  ru: string,
  uz: string,
  en: string
): LocalizedText {
  return {ru, uz, en};
}

function mapOptionalText(
  ru?: string | null,
  uz?: string | null,
  en?: string | null
): LocalizedText | undefined {
  if (!ru && !uz && !en) return undefined;

  return {
    ru: ru ?? '',
    uz: uz ?? '',
    en: en ?? ''
  };
}

function mapBlock(block: {
  type: 'PARAGRAPH' | 'LIST';
  titleRu: string | null;
  titleUz: string | null;
  titleEn: string | null;
  textRu: string | null;
  textUz: string | null;
  textEn: string | null;
  itemsRu: string[];
  itemsUz: string[];
  itemsEn: string[];
}): UiUsefulBlock {
  const maxItemsLength = Math.max(
    block.itemsRu.length,
    block.itemsUz.length,
    block.itemsEn.length
  );

  const items =
    maxItemsLength > 0
      ? Array.from({length: maxItemsLength}, (_, index) => ({
          ru: block.itemsRu[index] || '',
          uz: block.itemsUz[index] || '',
          en: block.itemsEn[index] || ''
        }))
      : undefined;

  return {
    type: block.type === 'PARAGRAPH' ? 'paragraph' : 'list',
    title: mapOptionalText(block.titleRu, block.titleUz, block.titleEn),
    text: mapOptionalText(block.textRu, block.textUz, block.textEn),
    items
  };
}

function mapSource(source: {
  sourceKey: string;
  titleRu: string;
  titleUz: string;
  titleEn: string;
  url: string;
}): UiUsefulSource {
  return {
    id: source.sourceKey,
    title: mapRequiredText(source.titleRu, source.titleUz, source.titleEn),
    url: source.url
  };
}

export async function getUsefulPages(): Promise<UsefulPageCard[]> {
  const pages = await prisma.usefulPage.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  return pages.map((page) => ({
    slug: page.slug,
    title: mapRequiredText(page.titleRu, page.titleUz, page.titleEn),
    cardText: mapRequiredText(page.cardTextRu, page.cardTextUz, page.cardTextEn),
    shortTitle: mapOptionalText(
      page.shortTitleRu,
      page.shortTitleUz,
      page.shortTitleEn
    ),
    shortText: mapOptionalText(
      page.shortTextRu,
      page.shortTextUz,
      page.shortTextEn
    ),
    fullTitle: mapOptionalText(
      page.fullTitleRu,
      page.fullTitleUz,
      page.fullTitleEn
    )
  }));
}

export async function getUsefulPageBySlug(
  slug: string
): Promise<UsefulPageDetail | undefined> {
  const normalizedSlug = decodeURIComponent(slug).trim();

  const page = await prisma.usefulPage.findUnique({
    where: {
      slug: normalizedSlug
    },
    include: {
      blocks: {
        orderBy: {
          sortOrder: 'asc'
        }
      },
      sources: {
        include: {
          source: true
        }
      }
    }
  });

  if (!page) {
    return undefined;
  }

  return {
    slug: page.slug,
    title: mapRequiredText(page.titleRu, page.titleUz, page.titleEn),
    cardText: mapRequiredText(page.cardTextRu, page.cardTextUz, page.cardTextEn),
    shortTitle: mapOptionalText(
      page.shortTitleRu,
      page.shortTitleUz,
      page.shortTitleEn
    ),
    shortText: mapOptionalText(
      page.shortTextRu,
      page.shortTextUz,
      page.shortTextEn
    ),
    fullTitle: mapOptionalText(
      page.fullTitleRu,
      page.fullTitleUz,
      page.fullTitleEn
    ),
    blocks: page.blocks.map(mapBlock),
    sources: page.sources.map((item) => mapSource(item.source))
  };
}

export async function getUsefulPageSlugs(): Promise<string[]> {
  const pages = await prisma.usefulPage.findMany({
    select: {
      slug: true
    }
  });

  return pages.map((page) => page.slug);
}
